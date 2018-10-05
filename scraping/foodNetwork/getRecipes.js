'use strict';

const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');
const NodePoolScraper = require('node-pool-scraper');

const scraper = new NodePoolScraper({
  max: 1,
  min: 1,
  idleTimeoutMillis: 100000,
  headless: false,
  ignoreHTTPSErrors: true
});

function appendFilePromise(file, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(file, data, (err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve();
      }
    })
  });
}

async function grabRecipe({ url, browser }) {
  try {
    const page = await browser.newPage();
    const status = await page.goto(url);

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    // const fileName = crypto.createHash('md5').update(data.provider.recipeUrl).digest('hex');
    // await appendFilePromise(`./recipes/${fileName}.json`, JSON.stringify(data));

    // console.log('Scraped: ', data.provider.recipeUrl);
  }
  catch (error) {
    console.error(error);
  }
}

scraper.addTarget({
  url: 'http://www.foodnetwork.com/recipes/food-network-kitchen/zucchini-ricotta-salata-recipe-2105421',
  func: grabRecipe
});

/*
const rl = readline.createInterface({
  input: fs.createReadStream('foodNetworkRecipeUrls.txt'),
  crlfDelay: Infinity
});

rl.on('line', (url) => {
  console.log('Added: ', url);
  scraper.addTarget({
    url,
    func: grabRecipe
  });
});
*/
