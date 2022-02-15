import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

import {
  algoliaHelper,
  derivedHelpers,
  resultsByCategory,
  removeEventListeners,
} from 'utils/algolia-search';

import SearchLayout from './SearchLayout';

const Search = () => {
  const [results, setResults] = useState(resultsByCategory);
  const [isInstantSearch, setIsInstantSearch] = useState(true);

  const handleChange = (e) => {
    if (!isInstantSearch) {
      removeEventListeners();
      setIsInstantSearch(true);
    }

    const debounceInstantSearchResults = debounce(
      getInstantSearchResults,
      2000
    );
    debounceInstantSearchResults(e.target.value);
  };

  // Instant search results
  const getInstantSearchResults = useCallback((value = '') => {
    algoliaHelper.clearRefinements().setQuery(value).search();

    derivedHelpers.forEach((item) => {
      item.helper.on('result', (data) => {
        setResults((prevState) => ({ ...prevState, [item.category]: data }));
      });
    });
  }, []);

  // Paginated search results
  const loadMoreResults = (category) => {
    if (isInstantSearch) {
      removeEventListeners();
      setIsInstantSearch(false);
    }

    const page = results[category].page + 1;
    algoliaHelper.setPage(page).search();

    // Get category derived helper
    const categoryHelper = derivedHelpers.find(
      (item) => item.category === category
    );

    if (!categoryHelper) return;

    // Save paginated results
    categoryHelper.helper.once('result', (data) => {
      setResults((prevState) => ({
        ...prevState,
        [category]: {
          ...data,
          hits: [...prevState[category].hits, ...data.hits],
          page,
        },
      }));
    });
  };

  // Set up derived helpers for each category
  useEffect(() => {
    derivedHelpers.map((item) => {
      item.helper = algoliaHelper.derive((searchParams) =>
        searchParams
          .clearRefinements()
          .addDisjunctiveFacetRefinement('sectionName', item.facet)
      );
    });
  }, []);

  // Load initial search results
  useEffect(() => {
    const hasInitialisedHelpers = derivedHelpers.every((item) => item.helper);

    if (hasInitialisedHelpers) {
      getInstantSearchResults();
    }
  }, [getInstantSearchResults]);

  return (
    <SearchLayout
      results={results}
      handleChange={handleChange}
      loadMoreResults={loadMoreResults}
    />
  );
};

export default Search;
