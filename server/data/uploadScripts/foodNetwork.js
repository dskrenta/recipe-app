'use strict';

const { promisify } = require('util');
const fs = require('graceful-fs');
const elasticsearch = require('elasticsearch');

const readDirAsync = promisify(fs.readdir);
const readFileAsync = promisify(fs.readFile);

/*
const client = new elasticsearch.Client({
  // host: 'https://search-presearch-wiki-y54jqrsrtnje57wd5ogbpliuiy.us-west-1.es.amazonaws.com',
  host: 'http://localhost:9200',
  log: 'trace'
});
*/

const SOURCE_PATH = `${__dirname}/../../../scraping/foodNetwork/recipes`;

async function main() {
  try {
    const files = await readDirAsync(SOURCE_PATH);
    const fileContentsPromise = files.map(file => readFileAsync(`${SOURCE_PATH}/${file}`, 'utf-8'));
    const fileContents = await Promise.all(fileContentsPromise);
    
    for (let i = 0; i < fileContents.length; i++) {
      console.log(files[i]);
      JSON.parse(fileContents[i]);
    }

    /*
    const recipes = fileContents.map(fileContent => {
      // const recipe = JSON.parse(JSON.stringify(fileContent));
      // const recipe = JSON.parse(fileContent)
      // return recipe;
      return JSON.stringify(fileContent);
    });

    console.log(recipes);
    */

    /*
    for (let recipe of recipes) {
      const res = await client.index({
        index: 'recipe-app-recipes-index',
        type: 'recipe',
        body: recipe
      });
    }
    */
  }
  catch (error) {
    console.error(error);
  }
}

main();
