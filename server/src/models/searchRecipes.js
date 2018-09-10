'use strict';

const {
  INDICES: { 
    recipesIndex 
  }
} = require('../utils/constants');
const flattenResponse = require('../utils/flattenResponse');

async function searchRecipes({ client, query, pagination }) {
  try {
    const res = await client.search({
      index: recipesIndex,
      type: 'recipe',
      from: pagination.offset, 
      size: pagination.limit, 
      body: {
        query: {
          match: {
            title: query
          }
        }
      }
    });

    return flattenResponse({ res, array: true, total: true });
  } 
  catch (error) {
    console.error(error);
  }
}

module.exports = searchRecipes;