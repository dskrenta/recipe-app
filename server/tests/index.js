'use strict'

const elasticsearch = require('elasticsearch');

const {
  INDICES: {
    recipesIndex
  },
  ES_ENDPOINT
} = require('../src/utils/constants');

const getRecipe = require('../src/models/getRecipe');
const recommendedRecipes = require('../src/models/recommendedRecipes');
const searchRecipes = require('../src/models/searchRecipes');

const client = new elasticsearch.Client({
  host: ES_ENDPOINT,
  log: 'trace'
});

async function main() {
  try {
    // const recipe = getRecipe({ client, id: '' });
    const recommendedRecipesResults = await recommendedRecipes({ client, pagination: { offset: 0, limit: 10 } });
    console.log(recommendedRecipesResults);
  }
  catch (error) {
    console.error(error);
  }
}

main();
