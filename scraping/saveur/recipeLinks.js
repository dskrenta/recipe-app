const puppeteer = require('puppeteer');
const fs = require('fs');

const main = async () => {
    try {
        let links = [];

        for (let i = 126; i <= 158; i++) {
            let results = await getLinks(i);
            for (let link in results) {
                fs.appendFile('recipeLinks.txt', `${results[link]}\n`, (e) => {if (e) throw e});
            }
            console.log(`Page ${i} done.`);
        }

        // links = [].concat.apply([], links);        
    }
    catch (e) {
        console.error(e);
    }
}

const getLinks = async (i) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.saveur.com/recipes-search?page=${i}`)

    const result = await page.evaluate(() => {
        let urls = [];
        let items = document.querySelectorAll('.result_title a');

        items.forEach((item) => {
            try {
                urls.push(`https://www.saveur.com${item.getAttribute('href')}`);
            }
            catch (e) {
                console.error(e);
            }
        });

        return urls;
    });

    browser.close();
    return result;
}

main();