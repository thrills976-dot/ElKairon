const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await new Promise(r => setTimeout(r, 2000));
  
  const html = await page.content();
  const matches = [...html.matchAll(/<[^>]+style="[^"]*opacity:\s*0[^"]*"[^>]*>(.*?)<\//g)];
  console.log('Opacity 0 elements:');
  for (let i = 0; i < Math.min(10, matches.length); i++) {
    console.log(matches[i][1].substring(0, 100));
  }
  
  await browser.close();
})();
