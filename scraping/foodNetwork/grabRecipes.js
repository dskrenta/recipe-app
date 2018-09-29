'use strict';

const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');
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
      const rating = parseInt(document.querySelector('span.gig-rating-stars').getAttribute('title').match(/^\d+/g)[0]);
      const level = document.querySelector('span.o-RecipeInfo__a-Description').textContent.toLowerCase();
      const servings = parseInt(document.querySelector('ul.o-RecipeInfo__m-Yield > li > span.o-RecipeInfo__a-Description').textContent.match(/\d+/g)[0]);
      const tags = Array.from(document.querySelectorAll('a.o-Capsule__a-Tag.a-Tag')).map(node => node.textContent);

      const imageSelector = document.querySelector('img.m-MediaBlock__a-Image.a-Image');
      let image;
      if (imageSelector.length > 0) {
        image = `http:${imageSelector.getAttribute('src')}`;
      }

      const times = document.querySelector('ul.o-RecipeInfo__m-Level').children[1].children[1].textContent.match(/\d+/g).map(elem => parseInt(elem));
      let totalTime;
      if (times.length > 1) {
        totalTime = (times[0] * 60) + times[1];
      }
      else {
        times = times[0];
      }

      let directions = [];
      Array.from(document.querySelector('div.o-Method__m-Body').children).map(node => node.tagName === 'H4' ? `#${node.textContent.trim()}` : Array.from(node.children).map(node => node.textContent.trim())).forEach(direction => (typeof direction === 'string') ? directions.push(direction) : directions = [...directions, ...direction]);
      const ingredients = Array.from(document.querySelector('div.o-Ingredients__m-Body').children).map(node => node.tagName === 'H6' ? `#${node.textContent.trim()}` : node.textContent);;

      return {
        title,
        image,
        rating,
        level,
        servings,
        totalTime,
        directions,
        ingredients,
        tags,
        provider: {
          siteUrl: 'https://www.foodnetwork.com/',
          recipeUrl: window.location.href,
          name: 'Food Network'
        }
      };
    });

    const fileName = crypto.createHash('md5').update(data.provider.recipeUrl).digest('hex');
    await appendFilePromise(`./recipes/${fileName}.json`, JSON.stringify(data));

    console.log(data.provider.recipeUrl);
  }
  catch (error) {
    console.error(error);
  }
}

scraper.addTarget({
  url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/bbq-duck-on-corn-cakes-recipe-2103370',
  func: grabRecipe
});

/*
const rl = readline.createInterface({
  input: fs.createReadStream('foodNetworkRecipeUrls.txt'),
  crlfDelay: Infinity
});

rl.on('line', (url) => {
  console.log(url);
  scraper.addTarget({
    url,
    func: grabRecipe
  });
});
*/
