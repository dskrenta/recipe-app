'use strict'

const elasticsearch = require('elasticsearch');

const {
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
    const recipe = await getRecipe({ client, id: 'GzM0b2YB6ZvqHrriZQlP' });
    console.log(recipe);

    const recommendedRecipesResults = await recommendedRecipes({ client, pagination: { offset: 0, limit: 10 } });
    console.log(recommendedRecipesResults);

    const searchResults = await searchRecipes({ client, pagination: { offset: 0, limit: 10 }, query: 'meatloaf' });
    console.log(searchResults);
  }
  catch (error) {
    console.error(error);
  }
}

main();
