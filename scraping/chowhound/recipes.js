const NodePoolScraper = require('node-pool-scraper');
const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');

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

async function getRecipe({ url, browser }) {
  try {
    const page = await browser.newPage();
    const status = await page.goto(url);
    let recipe = {};

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    const result = await page.evaluate(() => {
      let obj = {}
      const nutriButton = document.querySelector('.edaman_info_w');

      const title = document.querySelector('.fr_r_info h1').innerHTML;
      if (title) { obj.title = title; }
      
      const tags = Array.from(document.querySelectorAll('.freyja_fulltags .freyja_tag')).map(tag => tag.getAttribute('data-name'));
      if (tags) { obj.tags = tags; }

      const image = document.querySelector('.fr_objfitimg').getAttribute('src');
      if (image) { obj.image = image; }
      
      const serves = parseFloat(document.querySelector('.frr_serves').innerHTML);
      if (serves) { obj.servings = serves; }
      
      const rating = parseFloat((document.querySelector('.chow_rating_display > .viewport').offsetWidth * 5 / document.querySelector('.chow_rating_display > .lower_layer').offsetWidth).toFixed(1));
      if (rating) { obj.rating = rating; }
      
      const description = Array.from(document.querySelectorAll('.frr_summary > p')).map(node => node.innerText).join("\n");
      if (description) { obj.description = description; }
      
      const totalTime = document.querySelector('.frr_totaltime > time').innerText;
      if (totalTime) {
        let total = 0;
        const newTime = totalTime.split(',')[0];
        const times = newTime.match(/\d{1,2} [h|m]/g);
        for (let time of times) {
          if (time[time.length - 1] === 'h') {
            total += parseFloat(time.match(/\d{1,2}/) * 60);
          }
          else {
            total += parseFloat(time.match(/\d{1,2}/))
          }
        }
        obj.totalTime = total
      }

      let ingredients = [];
      const ingredientList = document.querySelector('.freyja_box81').children;
      if (ingredientList) {
        for (let item of ingredientList) {
          if (item.tagName === 'UL') {
            const lis = item.children;
            for (let child of lis) {
              ingredients.push(child.innerText);
            }
          }
          else if (item.tagName === 'H4') {
            ingredients.push(`#${item.innerText}`);
          }
        }
        obj.ingredients = ingredients;
      }

      let directions = [];
      const directionList = document.querySelector('.freyja_box82 > .frr_wrap').children;
      if (directionList) {
        for (let item of directionList) {
          if (item.tagName === 'OL') {
            const lis = item.children;
            for (let child of lis) {
              const newstr = child.innerText.substring(1);
              directions.push(newstr);
            }
          }
          else if (item.tagName === 'STRONG') {
            directions.push(`#${item.innerText}`);
          }
          else if (item.tagName === 'P') {
            directions.push(`#${item.innerText}`);
          }
        }
        obj.directions = directions;
      }

      obj.url = url;

      return obj;
    });

    recipe = result;
    console.log(recipe);

    /*
    if (recipe !== undefined) {
      fs.`recipes/${crypto.createHash('md5').update(url).digest("hex")}.json`, JSON.stringify(recipe), (e) => {if (e) throw e})
    } 
    */

    console.log(url, ': DONE');
  }
  catch (error) {
    console.error(error);
  }
}

async function main() {
  const scraper = new NodePoolScraper({
    max: 1, 
    min: 1,
    idleTimeoutMillis: 100000
  });

  for (let line of lines.slice(0, 1)) {
    scraper.addTarget({
      url: `https://www.chowhound.com/recipes/easy-bbq-baby-back-pork-ribs-30741`,
      func: getRecipe
    });
  }

  scraper.clear();
}

// ${line}