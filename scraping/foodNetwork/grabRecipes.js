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

    const navigationPromise = page.waitForNavigation();

    await page.click('a.o-Announcements__a-Button.o-Announcements__a-Button--Primary');

    await navigationPromise;

    const data = await page.evaluate(() => {
      const titleElement = document.querySelector('span.o-AssetTitle__a-HeadlineText');
      const ratingElement = document.querySelector('span.gig-rating-stars');
      const levelElement = document.querySelector('span.o-RecipeInfo__a-Description');
      const servingsElement = document.querySelector('ul.o-RecipeInfo__m-Yield > li > span.o-RecipeInfo__a-Description');
      const timeElement = document.querySelector('span.o-RecipeInfo__a-Description.m-RecipeInfo__a-Description--Total');
      const ingredientsElement = document.querySelector('div.o-Ingredients__m-Body');

      // const title = document.querySelector('span.o-AssetTitle__a-HeadlineText').textContent;
      // const rating = parseInt(document.querySelector('span.gig-rating-stars').getAttribute('title').match(/^\d+/g)[0]);
      // const level = document.querySelector('span.o-RecipeInfo__a-Description').textContent.toLowerCase();
      // const servings = parseInt(document.querySelector('ul.o-RecipeInfo__m-Yield > li > span.o-RecipeInfo__a-Description').textContent.match(/\d+/g)[0]);

      const tags = Array.from(document.querySelectorAll('a.o-Capsule__a-Tag.a-Tag')).map(node => node.textContent);

      let title = null;
      let rating = null;
      let level = null;
      let servings = null;

      if (typeof(titleElement) !== 'undefined' && titleElement !== null) title = title.textContent;
      if (typeof(ratingElement) !== 'undefined' && ratingElement !== null) rating = parseInt(ratingElement.getAttribute('title').match(/^\d+/g)[0]);
      if (typeof(levelElement) !== 'undefined' && levelElement !== null) level = levelElement.textContent.toLowerCase();
      if (typeof(servingsElement) !== 'undefined' && servingsElement !== null) servings = parseInt(servingsElement.textContent.match(/\d+/g)[0]);

      const imageElement = document.querySelector('img.m-MediaBlock__a-Image.a-Image');
      let image;
      if (imageElement.length > 0) {
        image = `http:${imageElement.getAttribute('src')}`;
      }

      let totalTime;

      if (typeof(timeElement) !== 'undefined' && timeElement !== null) {
        const times = timeElement.textContent.match(/\d+/g).map(elem => parseInt(elem));
        if (times.length > 1) {
          totalTime = (times[0] * 60) + times[1];
        }
        else {
          times = times[0];
        }
      }

      let directions = [];
      Array.from(document.querySelector('div.o-Method__m-Body').children).map(node => node.tagName === 'H4' ? `#${node.textContent.trim()}` : Array.from(node.children).map(node => node.textContent.trim())).forEach(direction => (typeof direction === 'string') ? directions.push(direction) : directions = [...directions, ...direction]);
      // const ingredients = Array.from(document.querySelector('div.o-Ingredients__m-Body').children).map(node => node.tagName === 'H6' ? `#${node.textContent.trim()}` : node.textContent);
      let ingredients = [];
      // handle no ingredients
      if (ingredientsElement.children > 0) {
      // if (typeof(ingredientsElement) !== 'undefined' && ingredients !== null && ingredientsElement.length > 0) {
        // ingredients = Array.from(ingredientsElement.children).map(node => node.tagName === 'H6' ? `#${node.textContent.trim()}` : node.textContent);
      }

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

    console.log('Scraped: ', data.provider.recipeUrl);
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
