'use strict';

const fs = require('fs');
const readline = require('readline');
const NodePoolScraper = require('node-pool-scraper');

const scraper = new NodePoolScraper({
  max: 1,
  min: 1,
  idleTimeoutMillis: 100000
});

function appendFilePromise(file, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(file, data, (err) => {
      if (err) {
        reject(err)
      }
      else {
        resolve();
      }
    })
  });
}

const topPages = [
  'http://www.foodnetwork.com/recipes/recipes-a-z/123',
  'http://www.foodnetwork.com/recipes/recipes-a-z/a',
  'http://www.foodnetwork.com/recipes/recipes-a-z/b',
  'http://www.foodnetwork.com/recipes/recipes-a-z/c',
  'http://www.foodnetwork.com/recipes/recipes-a-z/d',
  'http://www.foodnetwork.com/recipes/recipes-a-z/e',
  'http://www.foodnetwork.com/recipes/recipes-a-z/f',
  'http://www.foodnetwork.com/recipes/recipes-a-z/g',
  'http://www.foodnetwork.com/recipes/recipes-a-z/h',
  'http://www.foodnetwork.com/recipes/recipes-a-z/i',
  'http://www.foodnetwork.com/recipes/recipes-a-z/j',
  'http://www.foodnetwork.com/recipes/recipes-a-z/k',
  'http://www.foodnetwork.com/recipes/recipes-a-z/l',
  'http://www.foodnetwork.com/recipes/recipes-a-z/m',
  'http://www.foodnetwork.com/recipes/recipes-a-z/n',
  'http://www.foodnetwork.com/recipes/recipes-a-z/o',
  'http://www.foodnetwork.com/recipes/recipes-a-z/p',
  'http://www.foodnetwork.com/recipes/recipes-a-z/q',
  'http://www.foodnetwork.com/recipes/recipes-a-z/r',
  'http://www.foodnetwork.com/recipes/recipes-a-z/s',
  'http://www.foodnetwork.com/recipes/recipes-a-z/t',
  'http://www.foodnetwork.com/recipes/recipes-a-z/u',
  'http://www.foodnetwork.com/recipes/recipes-a-z/v',
  'http://www.foodnetwork.com/recipes/recipes-a-z/w',
  'http://www.foodnetwork.com/recipes/recipes-a-z/xyz'
];

// const urlsToVist = []
// const recipeUrls = [];
// const recipes = [];

async function grabUrls({ url, browser }) {
  try {
    const page = await browser.newPage();
    const status = await page.goto(url);

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    console.log('here');

    const result = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.o-IndexPagination__a-ListItem > a')).map(node => node.getAttribute('href'));
    });

    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}

async function grabPaginatedPages({ url, browser }) {
  try {
    const page = await browser.newPage();
    const status = await page.goto(url);

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    const result = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a.o-Pagination__a-Button')).map(node => `http:${node.getAttribute('href')}`);
    });

    const limit = parseInt(result[result.length - 2].match(/\d+$/g)[0]);

    for (let i = 1; i < limit; i++) {
      await appendFilePromise('foodNetworkRecipePages.txt', `${url}/p/${i}\n`);
    }
  }
  catch (error) {
    console.error(error);
  }
}

async function grabRecipeUrls({ url, browser }) {
  try {
    const page = await browser.newPage();
    const status = await page.goto(url);

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    const result = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('li.m-PromoList__a-ListItem > a')).map(node => `http:${node.getAttribute('href')}`);
    });

    for (let url of result) {
      await appendFilePromise('foodNetworkRecipeUrls2.txt', `${url}\n`);
    }
  }
  catch (error) {
    console.error(error);
  }
}

/*
scraper.addTarget({
  url: 'https://www.foodnetwork.com/recipes/recipes-a-z/b',
  func: grabPaginatedPages
});
*/

/*
for (let url of topPages) {
  scraper.addTarget({
    url,
    func: grabPaginatedPages
  });
}
*/

/*
const rl = readline.createInterface({
  input: fs.createReadStream('foodNetworkRecipePages.txt'),
  crlfDelay: Infinity
});

rl.on('line', (url) => {
  console.log(url);
  scraper.addTarget({
    url,
    func: grabRecipeUrls
  });
});
*/

/*
scraper.addTarget({
  url: 'https://www.foodnetwork.com/recipes/recipes-a-z/b/p/1',
  func: grabRecipeUrls
});
*/

async function grabRecipe({ url, browser }) {
  try {
    const page = await browser.newPage();
    const status = await page.goto(url);

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    const data = await page.evaluate(() => {
      const title = document.querySelector('span.o-AssetTitle__a-HeadlineText').textContent;
      const rating = document.querySelector('span.gig-rating-stars ').getAttribute('title').match(/^\d/)[0];
      const totalTime = document.querySelector('dd.o-RecipeInfo__a-Description--Total').textContent;
      // const subValues = Array.from(document.querySelectorAll('dd.o-RecipeInfo__a-Description')).map(node => node.textContent);
      // const image = document.querySelector('img.o-AssetMultiMedia__a-Image').getAttribute('src');
      const tags = Array.from(document.querySelectorAll('a.o-Capsule__a-Tag')).map(node => node.textContent);

      /*
      const ingredients = Array.from(document.querySelector('div.o-Ingredients__m-Body').children).map(node => {
        if (node.nodeName === 'H6') {
          return `#${node.textContent}`;
        }
        if (node.nodeName === 'UL') {
          // return node.textContent;
          return Array.from(node.children).map(node => node.textContent);
        }
      });
      */

      const ingredients = [];
      const ingredElements = document.querySelector('div.o-Ingredients__m-Body').children;
      for (let i = 0; i < ingredElements.length; i++) {
        if (ingredElements[i].nodeName === 'H6') {
          ingredients.push(`#${ingredElements[i].textContent}`);
        }
        else if (ingredElements[i].nodeName === 'UL') {
          for (let j = 0; j < ingredElements[i].children.length; j++) {
            ingredients.push(ingredElements[i].children[j].textContent);
          }
        }
      }

      return {
        title,
        rating,
        totalTime,
        // image,
        tags,
        ingredients
      };
    });

    console.log(data);
  }
  catch (error) {
    console.error(error);
  }
}

scraper.addTarget({
  url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/bbq-duck-on-corn-cakes-recipe-2103370',
  func: grabRecipe
});
