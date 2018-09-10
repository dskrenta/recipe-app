'use strict';

const {
  INDICES: { 
    recipesIndex 
  }
} = require('../utils/constants');

async function getRecipe({ client, id }) {
  try {
    const res = await client.get({
      index: recipesIndex,
      type: 'recipe',
      id
    });

    return Object.assign({}, res._source, {id: res._id});
  } 
  catch (error) {
    if (error instanceof errors.NotFound) {
      return null;
    }
    else {
      console.error(error);
    }
  } 
}

module.exports = getRecipe;