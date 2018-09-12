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
    const promises = lines.slice(0, 1).map(line => getRecipe(line));
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
      const newRes = await fetch(`https://nutrifox.com/embed/label/${nutritionID}`)
      const newText = await newRes.text();
      const new$ = cheerio.load(newText);
      console.log(new$.html());

      new$('.label-nutrient').each(((i, item) => {
        console.log("NUTRIENT")
        switch (i) {
          case 0:
            recipe.nutrition.totalFat = parseFloat(new$(item).children('.label-nutrient-name i').text());
            recipe.nutrition.totalFatDailyValue = parseFloat(new$(item).children('.label-nutrient-percentage').text());
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
      }))
    }

    return recipe;
  }
  catch (e) {
    console.error(e);
  }
}

// main();