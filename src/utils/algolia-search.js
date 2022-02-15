import algoliasearch from 'algoliasearch';
import algoliasearchHelper from 'algoliasearch-helper';

const applicationID = '';
const apiKey = '';
const indexName = 'site-search';
const client = algoliasearch(applicationID, apiKey);

export const algoliaHelper = algoliasearchHelper(client, indexName, {
  disjunctiveFacets: ['sectionName'],
  hitsPerPage: 4,
});

export const resultsByCategory = {
  courses: { hits: [], nbHits: 0, page: 0 },
  events: { hits: [], nbHits: 0, page: 0 },
  news: { hits: [], nbHits: 0, page: 0 },
};

export const derivedHelpers = [
  { category: 'courses', facet: 'Courses', helper: null },
  { category: 'events', facet: 'Events', helper: null },
  { category: 'news', facet: 'News', helper: null },
];

export const removeEventListeners = () => {
  derivedHelpers.forEach((item) => {
    item.helper.removeAllListeners('result');
  });
};
