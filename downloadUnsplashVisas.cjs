const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  { key: 'euBlueCard', id: '1544365558-35aa4afcf11f' },
  { key: 'uaeEmployment', id: '1554224155-8d04cb21cd6c' },
  { key: 'germanyOpportunity', id: '1436491865332-7a61a109cc05' },
  { key: 'ukSkilledWorker', id: '1588534510807-86dfb5ed5d5b' },
];

const imageMapPath = 'src/data/imageMap.ts';
let code = fs.readFileSync(imageMapPath, 'utf-8');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const { key, id } of downloads) {
    const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200`;
    const filename = `${id}.jpg`;
    const dest = path.join('public', 'images', filename);
    
    console.log(`Downloading ${key}...`);
    try {
      await download(url, dest);
      console.log(`Successfully downloaded ${filename}`);
      
      const regex = new RegExp(`${key}:\\s*'[^']+'`);
      if (regex.test(code)) {
        code = code.replace(regex, `${key}: '/images/${filename}'`);
      } else {
        console.log(`Could not find ${key} in imageMap.ts`);
      }
    } catch (err) {
      console.error(`Error downloading ${filename}:`, err.message);
    }
  }
  
  fs.writeFileSync(imageMapPath, code);
  console.log('imageMap.ts updated.');
}

run();
