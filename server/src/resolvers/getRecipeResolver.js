'use strict';

const flattenResponse = require('../utils/flattenResponse');
const getRecipe = require('../models/getRecipe');

async function getRecipeResolver({ client, args: { id } }) {
  try {
    const recipe = await getRecipe({ client, id });
    return flattenResponse({ res: recipe });
  }
  catch (error) {
    console.error(error);
  }
}

module.exports = getRecipeResolver;
