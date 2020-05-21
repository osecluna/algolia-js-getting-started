/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  'testingOLPRJ0J6QX',
  'd0c5363d8a374439c3b33b019ec613d1'
);

const search = instantsearch({
  indexName: 'bloblog-hub-01.blog-production-olly',
  searchClient,
});

const mediaHost = 'https://i1-qa.adis.ws';

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
<article>
  <h1>{{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}</h1>
  <p>Read time: {{readTime}} minutes.
  <p>Published: {{date}}</p>
  <a href="/{{deliveryKey}}"><img src="${mediaHost}/i/{{imagePath}}?w=190" alt="" style="width:190px;"></a>
  <p>{{#helpers.highlight}}{ "attribute": "description" }{{/helpers.highlight}}</p>
  <p>{{#helpers.highlight}}{ "attribute": "content" }{{/helpers.highlight}}</p>
</article>
`,
    },
  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  }),
  instantsearch.widgets.refinementList({
    container: '#tags-list',
    attribute: 'tags',
    searchable: true,
  }),
  instantsearch.widgets.refinementList({
    container: '#authors-list',
    attribute: 'authors.name',
  }),
  instantsearch.widgets.sortBy({
    container: '#sort-by',
    items: [
      { label: 'Default (most recent)', value: search.indexName },
      { label: 'Read time - ascending', value: 'bloblog-hub-01.blog-production-olly_sort-readTime-asc' }
    ],
  }),
]);

search.start();
