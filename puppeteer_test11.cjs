const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PROD PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PROD PAGE ERROR:', err.stack || err.toString()));
  
  try {
    await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
  } catch(e) {}
  
  await browser.close();
  process.exit(0);
})();
