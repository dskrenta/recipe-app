'use strict';

const { promisify } = require('util');
const fs = require('graceful-fs');
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

const SOURCE_PATH = `${__dirname}/../../../../recipes/foodNetworkRecipes`;

async function main() {
  try {
    const files = await readDirAsync(SOURCE_PATH);
    const fileContentsPromise = files.map(file => readFileAsync(`${SOURCE_PATH}/${file}`, 'utf-8'));
    const fileContents = await Promise.all(fileContentsPromise);
    const recipes = fileContents.map(contents => {
      const parsedRecipe = JSON.parse(contents);
      return {
        ...parsedRecipe,
        image: parsedRecipe.image === 'http:data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' ? null : parsedRecipe.image,
        directions: parsedRecipe.directions.filter(direction => !direction.startsWith('Photograph by')),
        url: parsedRecipe.provider.recipeUrl,
        createdAt: new Date(),
        level: parsedRecipe.level ? parsedRecipe.level.toLowerCase() : null
      };
    })

    // console.log(recipes);

    for (let recipe of recipes) {
      const res = await client.index({
        index: recipesIndex,
        type: 'recipe',
        body: recipe
      });
    }
  }
  catch (error) {
    console.error(error);
  }
}

main();
