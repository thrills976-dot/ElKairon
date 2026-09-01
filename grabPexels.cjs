const https = require('https');

function grab(query) {
  return new Promise((resolve) => {
    https.get(`https://www.pexels.com/search/${query}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const matches = data.match(/src="([^"]*images\.pexels\.com\/photos\/[^"]*\.jpeg[^"]*)"/g);
        if (matches && matches.length > 0) {
          console.log(`Found for ${query}:`, matches[0].replace('src="', '').replace('"', ''));
          resolve(matches[0].replace('src="', '').replace('"', ''));
        } else {
          console.log(`No matches for ${query}`);
          resolve(null);
        }
      });
    });
  });
}

async function run() {
  await grab('meal');
  await grab('bus');
  await grab('hospital');
  await grab('id-card');
  await grab('airplane');
}
run();
