const fs = require('fs');

const publicImages = fs.readdirSync('public/images').filter(f => f.endsWith('.jpg'));

let mapCode = fs.readFileSync('src/data/imageMap.ts', 'utf-8');

// The keys in BACKGROUND_IMAGES match the prefix of the file name before the timestamp
const bgKeys = [
        "heroGlobalConnect", "corporateHandshake", "berlinCityscape", "happyCandidate", 
        "germanVisa", "constructionEngineering", "healthcareNursing", "agricultureHarvest", 
        "logisticsWarehouse", "officeCollaboration", "openForBusiness", "accommodationApartment", 
        "airlineFlight", "cafeteriaMeal", "centralEuropeHub", "crossBorderVisa", 
        "deployRelocate", "discoverTalent", "euBlueCard", "germanyOpportunity", 
        "hotelChef", "kairosPrecision", "matchInterview", "overtimeClock", 
        "paidAnnualLeave", "prepareAssess", "qualityOfLife", "residenceCard", 
        "rigorousScreening", "seafoodProcessing", "softwareDeveloper", "strongEconomy", 
        "transportationBus", "truckDriver", "uaeEmployment", "ukSkilledWorker", 
        "universityCampus", "workLifeBalance", "qualityHealthcare", "registeredNurse", 
        "warehouseStaff", "civilEngineer", "financeSupervisor", "constructionWorker", "medicalInsurance"
];

for (const key of bgKeys) {
    // create snake_case version for the filename prefix
    const snakeCase = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    // find a matching file
    const matchedFile = publicImages.find(f => f.startsWith(snakeCase + '_'));
    if (matchedFile) {
        // replace in mapCode
        const regex = new RegExp(`(${key}:\\s*)'[^']+'`, 'g');
        mapCode = mapCode.replace(regex, `$1'/images/${matchedFile}'`);
        
        // Also update SECTOR_IMAGE_CARDS if it matches one of the specific IDs
        if (key === 'healthcareNursing') {
            mapCode = mapCode.replace(/image:\s*'[^']+'(?=,\s*description:\s*'Direct Fast-Track)/, `image: '/images/${matchedFile}'`);
        } else if (key === 'constructionEngineering') {
            mapCode = mapCode.replace(/image:\s*'[^']+'(?=,\s*description:\s*'High-rise structural steel)/, `image: '/images/${matchedFile}'`);
        } else if (key === 'agricultureHarvest') {
            mapCode = mapCode.replace(/image:\s*'[^']+'(?=,\s*description:\s*'Large-scale agricultural)/, `image: '/images/${matchedFile}'`);
        } else if (key === 'logisticsWarehouse') {
            mapCode = mapCode.replace(/image:\s*'[^']+'(?=,\s*description:\s*'Opportunities in distribution)/, `image: '/images/${matchedFile}'`);
        } else if (key === 'financeSupervisor') { // Wait, the original code used financeSupervisor Unsplash link for corporate? Let's check
            // We'll replace it generally if needed, let's see.
        }
    }
}

// Ensure SECTOR_IMAGE_CARDS gets updated correctly by manual replace
// The corporate one uses the same image as financeSupervisor
const financeMatch = publicImages.find(f => f.startsWith('finance_supervisor_'));
if (financeMatch) {
    mapCode = mapCode.replace(/image:\s*'[^']+'(?=,\s*description:\s*'Top-tier corporate placements)/, `image: '/images/${financeMatch}'`);
} else {
    // If we didn't generate finance_supervisor, maybe we can use officeCollaboration
    const officeMatch = publicImages.find(f => f.startsWith('office_collaboration_'));
    if (officeMatch) {
        mapCode = mapCode.replace(/image:\s*'[^']+'(?=,\s*description:\s*'Top-tier corporate placements)/, `image: '/images/${officeMatch}'`);
    }
}

fs.writeFileSync('src/data/imageMap.ts', mapCode);
console.log("Updated imageMap.ts");
