const https = require('https');

async function resolveFlickr(keyword) {
  return new Promise((resolve, reject) => {
    https.get(`https://loremflickr.com/1200/800/${keyword}?lock=1`, (res) => {
      if (res.statusCode === 302 && res.headers.location) {
        resolve(`https://loremflickr.com${res.headers.location}`);
      } else {
        resolve(null);
      }
    }).on('error', reject);
  });
}

resolveFlickr('seafood,worker').then(console.log);
