const https = require('https');
const fs = require('fs');

function searchWikiImage(query) {
    return new Promise((resolve, reject) => {
        const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&format=json`;
        https.get(url, { headers: { 'User-Agent': 'Node.js Bot/1.0 (thrills976@gmail.com)' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.query && json.query.pages) {
                        for (let pageId in json.query.pages) {
                            if (json.query.pages[pageId].imageinfo) {
                                const url = json.query.pages[pageId].imageinfo[0].url;
                                // try to find one that ends in jpg or png
                                if (url.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.jpeg') || url.toLowerCase().endsWith('.png')) {
                                    resolve(url);
                                    return;
                                }
                            }
                        }
                    }
                } catch(e) {}
                resolve(null);
            });
        }).on('error', reject);
    });
}

async function run() {
    const queries = {
        heroGlobalConnect: 'business network global',
        corporateHandshake: 'business handshake office',
        berlinCityscape: 'berlin skyline architecture',
        happyCandidate: 'professional office worker portrait',
        germanVisa: 'german visa passport',
        constructionEngineering: 'construction engineer site',
        healthcareNursing: 'nurse hospital caring',
        agricultureHarvest: 'tractor harvest farm',
        logisticsWarehouse: 'warehouse forklift logistics',
        officeCollaboration: 'team meeting office',
        openForBusiness: 'open for business sign',
        accommodationApartment: 'modern apartment interior bedroom',
        airlineFlight: 'commercial airplane flying',
        cafeteriaMeal: 'cafeteria food lunch',
        centralEuropeHub: 'europe train station',
        crossBorderVisa: 'passport travel document',
        deployRelocate: 'moving boxes relocation',
        discoverTalent: 'job interview office',
        euBlueCard: 'european union flag',
        germanyOpportunity: 'germany flag business',
        hotelChef: 'chef cooking restaurant kitchen',
        kairosPrecision: 'clock mechanism precision',
        matchInterview: 'job interview success',
        overtimeClock: 'office clock late',
        paidAnnualLeave: 'tropical beach vacation',
        prepareAssess: 'exam test paper',
        qualityOfLife: 'family park recreation',
        residenceCard: 'id card identity',
        rigorousScreening: 'magnifying glass document',
        seafoodProcessing: 'fish processing worker factory',
        softwareDeveloper: 'software developer coding monitor',
        strongEconomy: 'stock market graph',
        transportationBus: 'city bus public transport',
        truckDriver: 'truck driver highway',
        uaeEmployment: 'dubai skyline',
        ukSkilledWorker: 'london big ben city',
        universityCampus: 'university campus students',
        workLifeBalance: 'yoga office balance',
        qualityHealthcare: 'hospital doctor patient',
        registeredNurse: 'registered nurse portrait',
        warehouseStaff: 'warehouse worker boxes',
        civilEngineer: 'civil engineer blueprint',
        financeSupervisor: 'finance supervisor office',
        constructionWorker: 'construction worker hardhat',
        medicalInsurance: 'health insurance policy document'
    };

    const results = {};
    for (const [key, q] of Object.entries(queries)) {
        try {
            const url = await searchWikiImage(q);
            results[key] = url;
            console.log(`${key}: ${url}`);
        } catch (e) {
            console.log(`${key}: error`);
        }
        await new Promise(r => setTimeout(r, 500));
    }
    
    fs.writeFileSync('wiki_images.json', JSON.stringify(results, null, 2));
}

run();
