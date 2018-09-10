const elasticsearch = require('elasticsearch');

const {
  INDICES: {
    recipesIndex
  },
  ES_ENDPOINT
} = require('../src/utils/constants');

const client = new elasticsearch.Client({
  host: ES_ENDPOINT,
  log: 'trace'
});

async function deleteIndices() {
  try {
    await client.indices.delete({
      index: recipesIndex
    });
  }
  catch (error) {
    console.error(error);
  }
}

deleteIndices();