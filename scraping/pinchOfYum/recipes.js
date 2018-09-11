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
    const promises = lines.slice(0, 100).map(line => getRecipe(line));
    const results = await Promise.all(promises);
    console.log(results);
  }
  catch (error) {
    console.error(error);
  }
}

const getRecipe = async (url) => {
  try {
    console.log(url);
    const res = await fetch(url);
    const text = await res.text();
    const $ = cheerio.load(text);
    let recipe = {};

    const header = $('.tasty-recipes-entry-header h2').text();
    // console.log(text);

    return {
      stuff: header
    };
  }
  catch (e) {
    console.error(e);
  }
}

// main();