const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

async function main() {
  try {
    let links = [];

    for (let i = 1; i <= 56; i++) {
      await getRecipePage(i, links);
    }

    for (let link in links) {
      fs.appendFile('recipeLinks.txt', `${links[link]}\n`, (e) => {
        if (e) throw e;
      });
    }
  }
  catch (e) {
    console.error(e);
  }
}

async function getRecipePage(i, links) {
  const res = await fetch(`https://pinchofyum.com/recipes?fwp_paged=${i}`);
  const text = await res.text();
  const $ = cheerio.load(text);

  $('.block-link').each((i, elem) => {
    links.push($(elem).attr('href'));
  })
}

main();