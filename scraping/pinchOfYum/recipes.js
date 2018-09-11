const crypto = require('crypto');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const readline = require('readline');

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
    const promises = lines.slice(0, 5).map(line => getRecipe(line));
    const results = await Promise.all(promises);
    console.log(results);
  }
  catch (error) {
    console.error(error);
  }
}

const getRecipe = async (url) => {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const $ = cheerio.load(text);
    let recipe = {
      ingredients: [],
      directions: [],
      // nutrition: {}
    }

    recipe.title = $('.tasty-recipes-entry-header h2').text();
    recipe.description = $('.tasty-recipes-description p').text();
    $('.tasty-recipes-ingredients li').each((i, item) => {recipe.ingredients[i] = $(item).text()});
    $('.tasty-recipes-instructions li').each((i, item) => {recipe.directions[i] = $(item).text()});
    recipe.image = $('.tasty-recipes-image img').attr('src');
    recipe.servings = $('.tasty-recipes-yield').text();
    recipe.course = $('.tasty-recipes-category').text();
    recipe.cuisine = $('.tasty-recipes-cuisine').text();
    recipe.review = parseFloat($('.average').text());

    const prepTime = parseFloat($('.tasty-recipes-prep-time').text());
    const cookTime = parseFloat($('.tasty-recipes-cook-time').text());
    const totalTime = parseFloat($('.tasty-recipes-total-time').text());

    if (!isNaN(prepTime)) {
      recipe.prepTime = prepTime;
    }
    if (!isNaN(cookTime)) {
      recipe.cookTime = cookTime;
    }
    if (!isNaN(totalTime)) {
      recipe.totalTime = totalTime;
    }

    /*
    console.log($('iframe').attr('src'));
    // const newRes = await fetch();

    console.log($('.label-nutrient i').text());

    $('.label-nutrient').each(((i, item) => {
      console.log("NUTRIENT")
      switch (i) {
        case 0:
          recipe.nutrition.totalFat = parseFloat($(item).children('.label-nutrient-name i').text());
          recipe.nutrition.totalFatDailyValue = parseFloat($(item).children('.label-nutrient-percentage').text());
          break;
        case 1:
          recipe.nutrition.totalFat = parseFloat($(item).children('.label-nutrient-name i').text());
          recipe.nutrition.totalFatDailyValue = parseFloat($(item).children('.label-nutrient-percentage').text());
          break;
        case 2:
          recipe.nutrition.totalFat = parseFloat($(item).children('.label-nutrient-name i').text());
          recipe.nutrition.totalFatDailyValue = parseFloat($(item).children('.label-nutrient-percentage').text());
          break;
        case 3:
          recipe.nutrition.totalFat = parseFloat($(item).children('.label-nutrient-name i').text());
          recipe.nutrition.totalFatDailyValue = parseFloat($(item).children('.label-nutrient-percentage').text());
          break;
        case 4:
          recipe.nutrition.totalFat = parseFloat($(item).children('.label-nutrient-name i').text());
          recipe.nutrition.totalFatDailyValue = parseFloat($(item).children('.label-nutrient-percentage').text());
          break;
        case 5:
          recipe.nutrition.totalFat = parseFloat($(item).children('.label-nutrient-name i').text());
          recipe.nutrition.totalFatDailyValue = parseFloat($(item).children('.label-nutrient-percentage').text());
          break;
        case 6:
          recipe.nutrition.totalFat = parseFloat($(item).children('.label-nutrient-name i').text());
          recipe.nutrition.totalFatDailyValue = parseFloat($(item).children('.label-nutrient-percentage').text());
          break;
        case 7:
          recipe.nutrition.totalFat = parseFloat($(item).children('.label-nutrient-name i').text());
          recipe.nutrition.totalFatDailyValue = parseFloat($(item).children('.label-nutrient-percentage').text());
          break;
        default:
          break;
      }
    }))*/

    return recipe;
  }
  catch (e) {
    console.error(e);
  }
}

// main();