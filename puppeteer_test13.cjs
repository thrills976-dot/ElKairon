const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PROD PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PROD PAGE ERROR:', err.stack || err.toString()));
  
  try {
    await page.goto('http://localhost:3003', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(r => setTimeout(r, 4000));
    const html = await page.content();
    console.log('PROD HTML length:', html.length);
  } catch(e) {
    console.log('Error:', e.message);
  }
  
  await browser.close();
  process.exit(0);
})();
