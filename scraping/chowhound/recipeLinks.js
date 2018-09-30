const NodePoolScraper = require('node-pool-scraper');
const fs = require('fs');

const scraper = new NodePoolScraper({
  max: 1, 
  min: 1,
  idleTimeoutMillis: 100000
});

async function getLink({ url, browser }) {
  try {
    const page = await browser.newPage();
    const status = await page.goto(url);

    if (!status.ok) {
      console.error(`Cannot open ${url}`);
      throw new Error();
    }

    const result = await page.evaluate(() => {
      let urls = [];
      let items = document.querySelectorAll('.freyja_box7 > a');

      items.forEach((item) => {
        try {
          urls.push(`${item.getAttribute('href')}`);
        }
        catch (e) {
          console.error(e);
        }
      });

      return urls;
    });

    for (let url of result) {
      fs.appendFile('recipeLinks.txt', `${url}\n`, (e) => {
        if (e) throw e;
      });
    }
  }
  catch (error) {
    console.error(error);
  }
}

// 252 pages total
// LEFT OFF AT 50
for (let i = 3; i <= 50; i++) {
  scraper.addTarget({
    url: `https://www.chowhound.com/recipes?page=${i}`,
    func: getLink
  });
}

scraper.clear();
