const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await new Promise(r => setTimeout(r, 4000));
  
  const html = await page.content();
  console.log('Opacity 0 count:', (html.match(/opacity:\s*0/g) || []).length);
  console.log('HTML length:', html.length);
  
  await browser.close();
})();
