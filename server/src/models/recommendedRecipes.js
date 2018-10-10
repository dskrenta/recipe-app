'use strict';

const {
  INDICES: {
    recipesIndex
  }
} = require('../utils/constants');
const flattenResponse = require('../utils/flattenResponse');

async function recommendedRecipes({ client, pagination }) {
  try {
    const res = await client.search({
      index: recipesIndex,
      type: 'recipe',
      from: pagination.offset,
      size: pagination.limit,
      body: {
        query: {
          function_score: {
            query: {
              match_all: {}
            },
            random_score: {
              seed: Math.random
            }
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

module.exports = recommendedRecipes;
