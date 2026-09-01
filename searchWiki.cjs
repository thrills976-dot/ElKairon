const https = require('https');

function searchWikiImage(query) {
    return new Promise((resolve, reject) => {
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&format=json`;
        https.get(url, { headers: { 'User-Agent': 'Node.js Bot' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.query && json.query.pages) {
                        for (let pageId in json.query.pages) {
                            if (json.query.pages[pageId].imageinfo) {
                                resolve(json.query.pages[pageId].imageinfo[0].url);
                                return;
                            }
                        }
                    }
                } catch(e) {}
                resolve(null);
            });
        }).on('error', reject);
    });
}

searchWikiImage('fish processing worker').then(console.log);
