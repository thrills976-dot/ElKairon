const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const categories = {
  euBlueCard: 'passport,europe',
  uaeEmployment: 'visa,stamp',
  germanyOpportunity: 'passport,document',
  ukSkilledWorker: 'immigration,passport'
};

const mapPath = 'src/data/imageMap.ts';
let code = fs.readFileSync(mapPath, 'utf-8');

for (const [key, tags] of Object.entries(categories)) {
  const filename = `${key}.jpg`;
  const dest = path.join('public', 'images', filename);
  console.log(`Downloading ${key}...`);
  try {
    execSync(`curl -s -L -o ${dest} "https://loremflickr.com/1200/800/${tags}/all"`);
    
    // Check if image is valid
    const fileOutput = execSync(`file ${dest}`).toString();
    if (fileOutput.includes('JPEG image data') || fileOutput.includes('PNG image data')) {
      console.log(`Success for ${key}`);
      const regex = new RegExp(`${key}:\\s*'[^']+'`);
      if (regex.test(code)) {
        code = code.replace(regex, `${key}: '/images/${filename}'`);
      } else {
        console.log(`Could not find ${key} in imageMap.ts`);
      }
    } else {
      console.log(`Failed format for ${key}`);
    }
  } catch (e) {
    console.log(`Error for ${key}: ${e.message}`);
  }
}

fs.writeFileSync(mapPath, code);
console.log('Done!');
