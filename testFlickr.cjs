const https = require('https');

https.get('https://loremflickr.com/1200/800/seafood,market?lock=1', (res) => {
  console.log(res.statusCode);
  console.log(res.headers.location);
});
