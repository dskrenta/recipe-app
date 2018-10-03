'use strict';

const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');
const NodePoolScraper = require('node-pool-scraper');

const scraper = new NodePoolScraper({
  max: 1,
  min: 1,
  idleTimeoutMillis: 10000,
  headless: false,
  ignoreHTTPSErrors: true,
  timeout: 30000
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

/*
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
*/

async function grabRecipe({ url, browser }) {
  try {
    const page = await browser.newPage();
    const status = await page.goto(url, {
      waitUntil: 'domcontentloaded'
    });

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    let title = null;
    let rating = null;
    let image = null;
    let totalTime = null;
    let tags = null;
    let ingredients = null;
    let directions = null;
    let chef = null;
    let level = null;
    let servings = null;
    let provider = {
      siteUrl: 'https://www.foodnetwork.com/',
      recipeUrl: url,
      name: 'Food Network'
    };

    title = await page.evaluate(() => {
      return document.querySelector('span.o-AssetTitle__a-HeadlineText').textContent;
    });
  
    // Wait for dynamically loaded rating to load
    await page.waitFor(3000);

    rating = await page.evaluate(() => {
      const ratingElement = document.querySelector('span.gig-rating-stars');

      if (typeof(ratingElement) !== 'undefined' && ratingElement !== null) {
        return parseInt(ratingElement.getAttribute('title').match(/^\d+/)[0]);
      }
      return null;
    });

    level = await page.evaluate(() => {
      const newLevelElement = document.querySelector('span.o-RecipeInfo__a-Description');
      const oldLevelElement = document.querySelector('section.o-RecipeInfo.o-Level > dl > dd.o-RecipeInfo__a-Description');

      if (typeof(newLevelElement) !== 'undefined' && newLevelElement !== null) {
        const extractedText = newLevelElement.textContent;
        if (extractedText === 'Easy' || extractedText === 'Intermediate' || extractedText === 'Hard') {
          return extractedText;
        }
      }

      if (typeof(oldLevelElement) !== 'undefined' && oldLevelElement !== null) {
        return oldLevelElement.textContent.trim();
      }

      return null;
    });

    servings = await page.evaluate(() => {
      const newServingsElement = document.querySelector('ul.o-RecipeInfo__m-Yield > li > span.o-RecipeInfo__a-Description');
      const oldServingsElement = document.querySelector('section.o-RecipeInfo.o-Yield > dl > dd.o-RecipeInfo__a-Description');

      if (typeof(newServingsElement) !== 'undefined' && newServingsElement !== null) {
        const str = newServingsElement.textContent;
        const match = str.match(/\d+/);
        if (match !== null) {
          return parseInt(match[0]);
        }
      }

      if (typeof(oldServingsElement) !== 'undefined' && oldServingsElement !== null) {
        const str = oldServingsElement.textContent;
        const match = str.match(/\d+/);
        if (match !== null) {
          return parseInt(match[0]);
        }
      }

      return null;
    });

    image = await page.evaluate(() => {
      const oldImageElement = document.querySelector('img.o-AssetMultiMedia__a-Image')
      const newImageElement = document.querySelector('img.m-MediaBlock__a-Image.a-Image');

      if (typeof(oldImageElement) !== 'undefined' && oldImageElement !== null) {
        return `http:${oldImageElement.getAttribute('src')}`;
      }
      else if (typeof(newImageElement) !== 'undefined' && newImageElement !== null) {
        return `http:${newImageElement.getAttribute('src')}`;
      }
      return null;
    });

    totalTime = await page.evaluate(() => {
      let time;
      let times;

      const oldTimeElement = document.querySelector('dd.o-RecipeInfo__a-Description--Total');
      const newTimeElement = document.querySelector('span.o-RecipeInfo__a-Description.m-RecipeInfo__a-Description--Total')

      if (typeof(oldTimeElement) !== 'undefined' && oldTimeElement !== null) {
        times = oldTimeElement.textContent.match(/\d+/g).map(elem => parseInt(elem));
      }
      else if (typeof(newTimeElement) !== 'undefined' && newTimeElement !== null) {
        times = newTimeElement.textContent.match(/\d+/g).map(elem => parseInt(elem));
      }

      if (times.length > 1) {
        time = (times[0] * 60) + times[1];
      }
      else {
        time = times[0];
      } 
      return time;
    });

    tags = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a.o-Capsule__a-Tag.a-Tag')).map(node => node.textContent);
    });

    ingredients = await page.evaluate(() => {
      const newIngredientsIdentify = document.querySelector('p.o-Ingredients__a-Ingredient');
      if (typeof(newIngredientsIdentify) !== 'undefined' && newIngredientsIdentify !== null) {
        return Array.from(document.querySelector('div.o-Ingredients__m-Body').children).map(node => node.tagName === 'H6' ? `#${node.textContent.trim()}` : node.textContent.trim());
      }
      else {
        const ingredients = [];
        const ingredientsElement = document.querySelector('div.o-Ingredients__m-Body');

        if (typeof(ingredientsElement) !== 'undefined' && ingredientsElement !== null) {
          if (ingredientsElement.children.length > 0) {
            const elements = Array.from(ingredientsElement.children);
            for (let element of elements) {
              if (element.tagName === 'H6') {
                ingredients.push(`#${element.textContent.trim()}`);
              }
              else {
                if (element.children.length > 0) {
                  const subArrayIngredients = Array.from(element.children);
                  for (let item of subArrayIngredients) {
                    ingredients.push(item.textContent.trim());
                  }
                }
              }
            }
          }
        }

        return ingredients;

        /*
        const finalIngredients = [];
        const ingredientsElement = document.querySelector('div.o-Ingredients__m-Body');
        if (typeof(ingredientsElement) !== 'undefined' && ingredientsElement !== null) {
          if (ingredientsElement.children.length > 0) {
            Array.from(document.querySelector('div.o-Ingredients__m-Body').children).map(node => {
              node.tagName === 'H6' 
                ? `#${node.textContent.trim()}` 
                : Array.from(node.children).map(node => node.textContent.trim())
            }).forEach(ingredient => (typeof ingredient === 'string') ? finalIngredients.push(ingredient) : finalIngredients = [...finalIngredients, ...ingredient]);
            return finalIngredients;
          }
        }
        else {
          return [];
        }
        */
      }
    });

    directions = await page.evaluate(() => {
      const directionsElement = document.querySelector('div.o-Method__m-Body');
      const newElementIdentify = document.querySelector('li.o-Method__m-Step');
      if (typeof(directionsElement) !== 'undefined' && directionsElement !== null) {
        if (typeof(newElementIdentify) !== 'undefined' && newElementIdentify !== null) {
          return Array.from(document.querySelectorAll('li.o-Method__m-Step')).map(node => node.textContent.trim());
        }
        else {
          if (directionsElement.children.length > 0) {
            return Array.from(directionsElement.children).map(node => node.tagName === 'H4' ? `#${node.textContent.trim()}` : node.textContent.trim());
          }
          return [];
        }
      }
      return [];
    });

    chef = await page.evaluate(() => {
      let chef = {};

      const avatarElement = document.querySelector('img.o-Attribution__a-Image');
      const chefElement = document.querySelector('span.o-Attribution__a-Name > a');

      if (typeof(avatarElement) !== 'undefined' && avatarElement !== null) {
        chef.avatar = `http:${avatarElement.getAttribute('src')}`;
      }
      if (typeof(chefElement) !== 'undefined' && chefElement !== null) {
        chef.url = chefElement.getAttribute('href');
        chef.name = chefElement.textContent.replace('Recipe courtesy of ', '');
      }

      if (Object.keys(chef).length > 0) {
        return chef;
      }
      return null;
    });

    const recipe = {
      title,
      rating,
      image, 
      totalTime,
      tags,
      ingredients, 
      directions, 
      level,
      servings,
      provider, 
      chef
    };

    console.log(recipe);

    // const fileName = crypto.createHash('md5').update(data.provider.recipeUrl).digest('hex');
    // await appendFilePromise(`./recipes/${fileName}.json`, JSON.stringify(data));

    // console.log('Scraped: ', data.provider.recipeUrl);
  }
  catch (error) {
    console.error(error);
  }
}

scraper.addTarget({
  // url: 'https://www.foodnetwork.com/recipes/food-network-kitchen/zucchini-ricotta-salata-recipe-2105421',
  // url: 'https://www.foodnetwork.com/recipes/biscuits-and-gravy-orange-ginger-biscuits-with-scallion-pork-sausage-gravy-sesame-mustard-greens-and-soy-glazed-bacon-recipe-2040581',
  url: 'https://www.foodnetwork.com/recipes/party-sausage-pizza-rolls-2269307',
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
