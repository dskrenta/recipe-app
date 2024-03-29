'use strict';

const { promisify } = require('util');
const fs = require('fs');
const elasticsearch = require('elasticsearch');

const {
  INDICES: {
    recipesIndex
  },
  ES_ENDPOINT
} = require('../../src/utils/constants');

const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

const client = new elasticsearch.Client({
  host: ES_ENDPOINT,
  log: 'trace'
});

const SOURCE_PATH = `${__dirname}/../../../../recipes/pinchOfYumRecipes`;

async function main() {
  try {
    const wikiFiles = await readDirAsync(SOURCE_PATH);
    const fileContentsPromise = wikiFiles.map(file => readFileAsync(`${SOURCE_PATH}/${file}`, 'utf-8'));
    const fileContents = await Promise.all(fileContentsPromise);
    const recipes = fileContents.map(fileContent => {
      const recipe = JSON.parse(fileContent);

      return {
        ...recipe,
        provider: {
          siteUrl: 'https://pinchofyum.com',
          recipeUrl: recipe.url,
          name: 'Pinch of Yum'
        },
        servings: 'servings' in recipe ? recipe.servings.match(/\d+/) ? parseInt(recipe.servings.match(/\d+/)[0]) : null : null,
        createdAt: new Date(),
      };
    });

    // console.log(recipes);

    for (let recipe of recipes) {
      const res = await client.index({
        index: recipesIndex,
        type: 'recipe',
        body: recipe
      });
    }

      /*
      if (res.created) {
        console.log(`Successfully indexed: ${recipe.url}`);
      }
      else {
        console.log(`Failed to index: ${recipe.url}`);
      }
      */
  }
  catch (error) {
    console.error(error);
  }
}

main();
