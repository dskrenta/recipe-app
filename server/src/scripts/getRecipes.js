'use strict';

const elasticsearch = require('elasticsearch');
const fs = require('fs');
const { promisify } = require('util');

const flattenResponse = require('../utils/flattenResponse');

const writeFileAsync = promisify(fs.writeFile);

const ES_ENDPOINT = 'https://search-recipe-app-index-da5mmsuw3zxwga4l4rxyrryvu4.us-west-1.es.amazonaws.com';
const INDEX = 'recipe-app-recipes-index';
const SIZE = 1000;
const FILENAME = 'recipes.txt';

const client = new elasticsearch.Client({
  host: ES_ENDPOINT,
  // log: 'trace'
});

async function main() {
  try {
    const res = await client.search({
      index: INDEX,
      type: 'recipe',
      size: SIZE,
      body: {
        query: {
          match_all: {}
        }
      }
    });

    const data = flattenResponse({ res, array: true, total: true });
    let recipes = '';
    for (let recipe of data.results) {
      recipes += `${recipe.title} ${recipe.servings ? `\ny: ${recipe.servings}` : '\ny: 0'} ${recipe.prepTime ? `\np: ${recipe.prepTime}` : '\np: 5'} \n${recipe.ingredients.map((elem, index) => !elem.startsWith('#') ? `i: ${elem} ${rand(1, 200)}\n` : '').join('')} \n`;
    }

    await writeFileAsync(FILENAME, recipes);
  }
  catch (error) {
    console.error(error);
  }
}

main();

function formatRecipe(recipe) {
  let recipeStr =
    recipe.title +
    '\n' +
    recipe.servings +
    recipe.prepTime ? `${recipe.prepTime}` : '' +
    '\n' +
    `${recipe.ingredients.map((elem, index) => (index < recipe.ingredients.length - 1) ? `i: ${elem}\n` : `i: ${elem} ${rand(1, 200)}`).join('')}` +
    '\n\n';
  return recipeStr;
}

function rand(
  min = 0,
  max = 1,
  int = true
) {
  if (int) {
    min = Math.ceil(min);
    max = Math.floor(max);
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
