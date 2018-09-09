'use strict';

const generateResolver = require('../utils/generateResolver');
const getRecipeResolver = require('./getRecipeResolver');
const searchRecipesResolver = require('./searchRecipesResolver');
const recommendedRecipesResolver = require('./recommendedRecipesResolver');

const resolvers = {
  Query: {
    getRecipe: generateResolver(getRecipeResolver),
    searchRecipes: generateResolver(searchRecipesResolver),
    recommendedRecipes: generateResolver(recommendedRecipesResolver)
  }
};

module.exports = resolvers;