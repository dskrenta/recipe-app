const NodePoolScraper = require('node-pool-scraper');

async function main() {
  const scraper = new NodePoolScraper({
    max: 10, 
    min: 1
  });
  
  let links = [];

  // Add scrape target
  for (let i = 1; i <= 2; i++) {
    await scraper.addTarget({
      url: `https://www.chowhound.com/recipes?page=${i}`,
      func: async ({ url, browser }) => {
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

          links.push(result)
          return result;
        }
        catch (error) {
          console.error(error);
        }
      }
    });
  }

  
  // Destroy the pool
  await scraper.clear();
  console.log(links);
}

main();
