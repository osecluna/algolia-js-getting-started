/* global algoliasearch instantsearch */

// update with your Application ID and Search API Key
const searchClient = algoliasearch('myApplicationID', 'mySearchAPIKey');

// update with your index name
const search = instantsearch({
  indexName: 'myIndexName',
  searchClient,
});

// change mediaHost to your VSE for use with staging /preview environments
const mediaHost = 'https://i8.adis.ws';

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
  // Add item(s) for each sort option
  instantsearch.widgets.sortBy({
    container: '#sort-by',
    items: [
      { label: 'Sort by - Default', value: search.indexName },
      // Update with your replica index name
      {
        label: 'My sort label',
        value: 'myReplicaIndexName',
      },
    ],
  }),
]);

search.start();
