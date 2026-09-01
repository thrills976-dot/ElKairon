const gis = require('g-i-s');
const fs = require('fs');

async function searchGis(query) {
    return new Promise((resolve, reject) => {
        gis({searchTerm: query, filterOutDomains: ['alamy.com', 'shutterstock.com', 'istockphoto.com']}, (error, results) => {
            if (error) {
                resolve(null);
            } else if (results && results.length > 0) {
                resolve(results[0].url);
            } else {
                resolve(null);
            }
        });
    });
}

async function run() {
    console.log(await searchGis('seafood processing worker high quality photography'));
}

run();
