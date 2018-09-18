'use strict';

const fs = require('fs');
const Scraper = require('./index.js');

const scraper = new Scraper({
  max: 1, 
  min: 1,
  puppeteerArgs: [
    '--disable-dev-shm-usage'
  ]
});

scraper.addTarget({
  url: 'http://engine.presearch.org',
  func: async ({ url, browser }) => {
    try {
      const page = await browser.newPage();
      const status = await page.goto(url);

      if (!status.ok) {
        console.error(`Cannot open ${url}`);
        throw new Error();
      }

      const content = await page.content();

      fs.writeFile('test.txt', content, (err) => {
        if (err) throw err;
        console.log('success');
      });

      console.log(content);
    }
    catch (error) {
      console.error(error);
    }
  }
})