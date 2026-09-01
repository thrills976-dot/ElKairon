const { image_search } = require('duckduckgo-images-api');
const fs = require('fs');

async function searchImages(queries) {
    const results = {};
    for (const [key, q] of Object.entries(queries)) {
        try {
            console.log("Searching: " + q);
            const images = await image_search({ query: q, iterations: 1 });
            if (images && images.length > 0) {
                let selected = images[0].image;
                results[key] = selected;
                console.log(`${key}: ${selected}`);
            } else {
                results[key] = null;
            }
        } catch (e) {
            console.log(`Error: ${e.message}`);
        }
    }
    fs.writeFileSync('ddg_images.json', JSON.stringify(results, null, 2));
}

const queries = {
    seafoodProcessing: 'seafood processing factory worker',
    registeredNurse: 'registered nurse hospital',
    warehouseStaff: 'warehouse staff logistics forklift',
    civilEngineer: 'civil engineer site blueprint',
    financeSupervisor: 'finance supervisor office desk',
    medicalInsurance: 'health insurance document',
    hotelChef: 'chef cooking restaurant kitchen'
};

searchImages(queries);
