const puppeteer = require('puppeteer');
const fs = require('fs');

const ids = ["1522202176988-66273c2fd55f","1532094349884-543bc11b234d","1586528116311-ad8dd3c8310d","1577219491135-ce391730fb2c","1501504905252-473c47e087f8","1521791136064-7986c2920216","1497366216548-37526070297c","1454165804606-c3d57bc86b40","1522071820081-009f0129c71c","1453928582365-b6ad33cbcf64","1555899434-94d1368aa7af","1507525428034-b723cf961d3e","1583511655857-d19b40a7a54e","1500382017468-9049fed747ef","1522708323590-d24dbb6b0267","1555066931-4365d14bab8c","1601584115197-04ecc0da31d7","1587825140708-dfaf72ae4b04","1516549655169-df83a0774514","1486406146926-c627a92ad1ab","1519494026892-80bbd2d6fd0d","1573496359142-b8d87734a5a2","1495360010541-f48722b34f7d","1451187580459-43490279c0fa","1542744173-8e7e53415bb0","1521737604893-d14cc237f11d","1503387762-592deb58ef4e","1517457373958-b7bdd4587205","1517245386807-bb43f82c33c4","1560969184-10fe8719e047"];

async function run() {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  for (const id of ids) {
    try {
      await page.goto(`https://unsplash.com/photos/${id}`, { waitUntil: 'domcontentloaded' });
      const title = await page.title();
      console.log(`${id}: ${title}`);
    } catch (e) {
      console.log(`${id}: Error`);
    }
  }
  
  await browser.close();
}

run();
