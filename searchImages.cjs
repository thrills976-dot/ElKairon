const https = require('https');

function search(topic) {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/napi/search/photos?query=${topic}&per_page=5`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const results = json.results.map(r => r.id);
          console.log(`Topic: ${topic} ->`, results);
          resolve(results);
        } catch (e) {
          console.log(`Failed for ${topic}: ${e.message}`);
          resolve([]);
        }
      });
    });
  });
}

async function run() {
  await search('meal');
  await search('bus');
  await search('doctor');
  await search('id-card');
  await search('airplane');
  await search('apartment');
  await search('construction');
  await search('agriculture');
  await search('warehouse');
  await search('office');
  await search('chef');
}
run();
