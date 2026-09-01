const https = require('https');

function searchHtml(query) {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const regex = /images\.unsplash\.com\/photo-([a-zA-Z0-9\-]+)\?/g;
        let match;
        const matches = [];
        while ((match = regex.exec(data)) !== null) {
          matches.push(match[1]);
        }
        if (matches.length > 0) {
          resolve(matches[0]);
        } else {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

searchHtml('seafood-processing').then(id => console.log(id));
