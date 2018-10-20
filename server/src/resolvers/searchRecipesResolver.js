'use strict';

const flattenResponse = require('../utils/flattenResponse');
const searchRecipes = require('../models/searchRecipes');

async function searchRecipesResolver({ client, args: { query, pagination } }) {
  try {
    const recipes = await searchRecipes({ client, query, pagination });
    return recipes;
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = searchRecipesResolver;
