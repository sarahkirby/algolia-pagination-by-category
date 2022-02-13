import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';

import {
  algoliaHelper,
  derivedHelpers,
  resultsByCategory,
  removeEventListeners,
} from 'utils/algolia-search';
import SearchLayout from './SearchLayout';

const Search = () => {
  const page = useRef(0);
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
  const loadMoreResults = () => {
    if (isInstantSearch) {
      setIsInstantSearch(false);
    }

    removeEventListeners();

    page.current = page.current + 1;
    algoliaHelper.setPage(page.current).search();

    // Save paginated results
    derivedHelpers.forEach((item) => {
      item.helper.on('result', (data) => {
        setResults((prevState) => ({
          ...prevState,
          [item.category]: {
            ...data,
            hits: [...prevState[item.category].hits, ...data.hits],
          },
        }));
      });
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
