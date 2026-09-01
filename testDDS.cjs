const { searchImages } = require('duck-duck-scrape');

async function test() {
    try {
        const results = await searchImages('seafood processing worker high quality photography');
        console.log(results.results.map(r => r.image).slice(0,3));
    } catch (e) {
        console.log("Error: " + e.message);
    }
}
test();
