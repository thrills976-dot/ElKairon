const fs = require('fs');
const https = require('https');

const tsFile = fs.readFileSync('src/data/imageMap.ts', 'utf-8');

const regex = /photo-([a-zA-Z0-9\-]+)\?/g;
let match;
const ids = new Set();
while ((match = regex.exec(tsFile)) !== null) {
  ids.add(match[1]);
}

console.log("Checking " + ids.size + " unique IDs...");

Array.from(ids).forEach(id => {
  const url = `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200`;
  https.request(url, { method: 'HEAD' }, (res) => {
    if (res.statusCode !== 200) {
      console.log(`404: ${id}`);
    }
  }).end();
});
