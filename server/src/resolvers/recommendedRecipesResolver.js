'use strict';

const flattenResponse = require('../utils/flattenResponse');
const recommendedRecipes = require('../models/recommendedRecipes');

async function recommendedRecipeResolver({ client, args: { pagination } }) {
  try {
    const recipes = await recommendedRecipes({ client, pagination });
    console.log(recipes);
    return recipes;
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = recommendedRecipeResolver;
