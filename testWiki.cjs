const https = require('https');

function getWikiImage(title) {
    return new Promise((resolve, reject) => {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${encodeURIComponent(title)}&pithumbsize=1200&format=json`;
        https.get(url, { headers: { 'User-Agent': 'Node.js Bot' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const json = JSON.parse(data);
                const pages = json.query.pages;
                for (let pageId in pages) {
                    if (pages[pageId].thumbnail) {
                        resolve(pages[pageId].thumbnail.source);
                        return;
                    }
                }
                resolve(null);
            });
        }).on('error', reject);
    });
}

getWikiImage('Fish_processing').then(console.log);
