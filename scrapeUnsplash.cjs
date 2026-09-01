const puppeteer = require('puppeteer');

async function scrapeCategory(query) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(`https://unsplash.com/s/photos/${query}`);
  await page.waitForSelector('a[href^="/photos/"]');
  const ids = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href^="/photos/"]'));
    return links.map(a => a.getAttribute('href').replace('/photos/', ''))
                .filter(id => id && id.includes('-'));
  });
  await browser.close();
  return ids[0]; // return the first one
}

async function run() {
  const categories = ['meal', 'bus', 'doctor', 'id-card', 'airplane'];
  for (const cat of categories) {
    try {
      const id = await scrapeCategory(cat);
      console.log(`${cat}: ${id}`);
    } catch (e) {
      console.log(`${cat}: error ${e.message}`);
    }
  }
}
run();
