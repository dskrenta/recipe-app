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
    const status = await page.goto(url, {
      waitUntil: 'domcontentloaded'
    });
    let recipe = {
      url
    };

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    const result = await page.evaluate(() => {
      let obj = {}

      const title = document.querySelector('.fr_r_info h1');
      if (title) { obj.title = title.innerHTML; }

      const tags = Array.from(document.querySelectorAll('.freyja_fulltags .freyja_tag')).map(tag => tag.getAttribute('data-name'));
      if (tags) { obj.tags = tags; }

      const image = document.querySelector('.fr_objfitimg');
      if (image) { obj.image = image.getAttribute('src'); }

      const serves = document.querySelector('.frr_serves');
      if (serves) { obj.servings = parseFloat(serves.innerHTML); }

      const rating = parseFloat((document.querySelector('.chow_rating_display > .viewport').offsetWidth * 5 / document.querySelector('.chow_rating_display > .lower_layer').offsetWidth).toFixed(1));
      if (rating) { obj.rating = rating; }

      const description = Array.from(document.querySelectorAll('.frr_summary > p')).map(node => node.innerText).join("\n");
      if (description) { obj.description = description; }

      const totalTime = document.querySelector('.frr_totaltime > time');
      if (totalTime) {
        let total = 0;
        const newTime = totalTime.innerText.split(',')[0];
        const times = newTime.match(/\d{1,2} [d|h|m|D|H|M]/g);
        for (let time of times) {
          if (time[time.length - 1] === 'h') {
            total += parseFloat(time.match(/\d{1,2}/) * 60);
          }
          else if (time[time.length - 1] === 'd') {
            total += parseFloat(time.match(/\d{1,2}/) * 60 * 24);
          }
          else {
            total += parseFloat(time.match(/\d{1,2}/))
          }
        }
        obj.totalTime = total
      }

      let ingredients = [];
      const ingredientList = document.querySelector('.freyja_box81');
      if (ingredientList) {
        for (let item of ingredientList.children) {
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
            if (item.children[0]) {
              if (item.children[0].tagName === 'STRONG') {
                directions.push(`#${item.innerText}`);
              }
            }
          }
        }
        obj.directions = directions;
      }

      const nutrition = {};
      const nutritionItems = document.querySelectorAll('.edaman_info_w > ul > li');
      if (nutritionItems) {
        for (let item of nutritionItems) {
          if (item.children.length === 3) {
            let text = item.children[0].innerText.replace(/(\s)\S/g, l => l.toUpperCase()).replace(/\s+/g, '');
            text = text.charAt(0).toLowerCase() + text.substring(1);
            const value = parseFloat(item.children[2].innerText);
            if (value) {
              nutrition[text] = value;
            }
          }
        }
        if (Object.keys(nutrition).length !== 0) {
          obj.nutrition = nutrition;
        }
      }

      const nutritionServing = document.querySelector('.edamam_br > strong');
      if (nutritionServing) {
        const servings = nutritionServing.innerText;
        obj.servings = parseFloat(servings.substring(1));
      }

      return obj;
    });

    recipe = result;

    if (recipe !== undefined) {
      await fs.writeFile(`recipes/${crypto.createHash('md5').update(url).digest("hex")}.json`, JSON.stringify(recipe), (e) => {if (e) throw e})
    }

    console.log(url, ': DONE');
  }
  catch (error) {
    console.error(error);
  }
}

async function main() {
  const scraper = new NodePoolScraper({
    max: 2,
    min: 1,
    idleTimeoutMillis: 50000,
    timeout: 50000
  });

  let i = 5000;

  for (let line of lines.slice(i)) {
    scraper.addTarget({
      url: `${line}`,
      func: getRecipe
    });
  }

  scraper.clear();
}

// ${line}
