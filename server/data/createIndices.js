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

async function createIndicies() {
  try {
    await client.indices.create({
      index: recipesIndex,
      body: {
        mappings: {
          recipe: {
            properties: {
              title: {type: 'keyword'},
              description: {type: 'text'},
              ingredients: {type: 'text'},
              directions: {type: 'text'},
              tags: {type: 'keyword'},
              image: {type: 'text', index: false},
              images: {type: 'text', index: false},
              url: {type: 'text'},
              nutrition: {type: 'nested'},
              prepTime: {type: 'float'},
              cookTime: {type: 'float'},
              totalTime: {type: 'float'},
              servings: {type: 'float'},
              cusine: {type: 'keyword'},
              course: {type: 'keyword'},
              review: {type: 'float'},
              chef: {type: 'object'},
              createdAt: {type: 'date'}
            }
          }
        }
      }
    });
  }
  catch (error) {
    console.error(error);
  }
}

createIndicies();