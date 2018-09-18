'use strict';

const EventEmitter = require('events');

const createPuppeteerPool = require('puppeteer-pool');

class Scraper {
  constructor({
    max, 
    min, 
    idleTimeoutMillis = 30000,
    puppeteerArgs = []
  }) {
    this.pool = createPuppeteerPool({
      max,
      min,
      idleTimeoutMillis,
      maxUses: 50,
      validator: () => Promise.resolve(true),
      testOnBorrow: true,
      puppeteerArgs
    });

    this.scraperEvents = new EventEmitter();

    this.main();
  }

  addTarget(payload) {
    this.scraperEvents.emit('addTarget', payload);
  }

  main() {
    this.scraperEvents.on('addTarget', ({ url, func }) => {
      this.pool.use(async (browser) => {
        await func({ url, browser });
      });
    });
  }

  clear() {
    this.pool.drain().then(() => {
      pool.clear();
      console.log('Pool cleared');
    })
  }
}

module.exports = Scraper;