const gis = require('g-i-s');

gis('seafood worker', (error, results) => {
    if (error) {
        console.error(error);
    } else {
        console.log(results.slice(0,3));
    }
});
