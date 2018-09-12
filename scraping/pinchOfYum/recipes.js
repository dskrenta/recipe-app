const crypto = require('crypto');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');
const puppeteer = require('puppeteer');

const rl = readline.createInterface({
  input: fs.createReadStream('recipeLinks.txt'),
  crflDdelay: Infinity
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  main();
})

async function main() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const promises = lines.slice(0, 1).map(line => getRecipe(line, page));
    const results = await Promise.all(promises);
    browser.close();
    console.log(results);
  }
  catch (error) {
    console.error(error);
  }
}

const getRecipe = async (url, page) => {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const $ = cheerio.load(text);
    let recipe = {
      ingredients: [],
      directions: [],
      url
    }

    recipe.title = $('.tasty-recipes-entry-header h2').text();
    $('.tasty-recipes-ingredients li').each((i, item) => {recipe.ingredients[i] = $(item).text()});
    $('.tasty-recipes-instructions li').each((i, item) => {recipe.directions[i] = $(item).text()});
    
    const description = $('.tasty-recipes-description p').text();
    const image = $('.tasty-recipes-image img').attr('src');
    const servings = $('.tasty-recipes-yield').text();
    const course = $('.tasty-recipes-category').text();
    const cuisine = $('.tasty-recipes-cuisine').text();
    const review = parseFloat($('.average').text());
    const prepHours = $('.tasty-recipes-prep-time').text().includes('hour');
    let prepTime = parseFloat($('.tasty-recipes-prep-time').text());
    const cookHours = $('.tasty-recipes-cook-time').text().includes('hour');
    let cookTime = parseFloat($('.tasty-recipes-cook-time').text());

    if (description !== '') {
      recipe.description = description;
    }
    if (image !== undefined && image !== '') {
      recipe.image = image;
    }
    if (servings !== '') {
      recipe.servings = servings;
    }
    if (course !== '') {
      recipe.course = course;
    }
    if (cuisine !== '') {
      recipe.cuisine = cuisine;
    }
    if (!isNaN(review)) {
      recipe.review = review;
    }
    if (!isNaN(prepTime)) {
      if (prepHours) {
        prepTime = prepTime * 60;
      }
      recipe.prepTime = prepTime;
      recipe.totalTime = prepTime;
    }
    if (!isNaN(cookTime)) {
      if (cookHours) {
        cookTime = cookTime * 60;
      }
      recipe.cookTime = cookTime;
      recipe.totalTime = recipe.totalTime + cookTime;
    }

    const nutritionID = $('.nutrifox-label').attr('data-recipe-id');

    if (nutritionID) {
      recipe.nutrition = {};
      await page.goto(`https://nutrifox.com/embed/label/${nutritionID}`);

      const result = await page.evaluate(() => {
        const nutrition = {};
        const items = document.querySelectorAll('.label-nutrient');
        const nutritionNames = [
          'totalFat',
          'cholestrol',
          'sodium',
          'carbohydrates',
          'sugars',
          'protein',
          'vitaminA',
          'vitaminC'
        ]
        const nutritionValues = [
          'totalFatDailyValue',
          'cholestrolDailyValue',
          'sodiumDailyValue',
          'carbohydratesDailyValue',
          'sugarsDailyValue',
          'proteinDailyValue',
          'vitaminADailyValue',
          'vitaminCDailyValue'
        ]
        
        items.forEach((item, i) => {
          nutrition[nutritionNames[i]] = parseFloat(item.querySelector('.label-nutrient-name i').innerHTML);
          if (item.querySelector('.label-nutrient-percentage')) {
            nutrition[nutritionValues[i]] = parseFloat(item.querySelector('.label-nutrient-percentage').innerHTML);
          }
        });
        
        return nutrition;
      });

      recipe.nutrition = result;
    }

    return recipe;
  }
  catch (e) {
    console.error(e);
  }
}