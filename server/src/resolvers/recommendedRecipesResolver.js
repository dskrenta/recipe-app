'use strict';

const recommendedRecipes = require('../models/recommendedRecipes');

async function recommendedRecipeResolver({ client, args: { pagination } }) {
  try {
    const recipes = await recommendedRecipes({ client, pagination });
    return recipes;
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = recommendedRecipeResolver;
