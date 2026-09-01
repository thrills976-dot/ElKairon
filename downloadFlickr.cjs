const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const categories = {
  cafeteriaMeal: 'lunch,meal,restaurant,food',
  transportationBus: 'shuttle,bus,transportation',
  medicalInsurance: 'doctor,hospital,medical',
  residenceCard: 'passport,visa,document',
  airlineFlight: 'airplane,airport,flight',
  constructionEngineering: 'construction,builder',
  constructionWorker: 'construction,builder',
  agricultureHarvest: 'farm,agriculture,tractor',
  logisticsWarehouse: 'warehouse,logistics',
  warehouseStaff: 'warehouse,logistics',
  corporateHandshake: 'office,business,meeting',
  officeCollaboration: 'office,meeting,colleagues',
  healthcareNursing: 'nurse,hospital,medical',
  registeredNurse: 'nurse,hospital,medical'
};

const mapPath = 'src/data/imageMap.ts';
let code = fs.readFileSync(mapPath, 'utf-8');

for (const [key, tags] of Object.entries(categories)) {
  const filename = `${key}.jpg`;
  const dest = path.join('public', 'images', filename);
  console.log(`Downloading ${key}...`);
  try {
    execSync(`curl -s -L -o ${dest} "https://loremflickr.com/1200/800/${tags}/all"`);
    
    // Check if image is valid
    const fileOutput = execSync(`file ${dest}`).toString();
    if (fileOutput.includes('JPEG image data') || fileOutput.includes('PNG image data')) {
      console.log(`Success for ${key}`);
      // Replace in imageMap.ts
      // Find the line like:  cafeteriaMeal: '/images/photo-1453928582365-b6ad33cbcf64.jpg',
      const regex = new RegExp(`${key}:\\s*'[^']+'`);
      if (regex.test(code)) {
        code = code.replace(regex, `${key}: '/images/${filename}'`);
      } else {
        console.log(`Could not find ${key} in imageMap.ts`);
      }
    } else {
      console.log(`Failed format for ${key}`);
    }
  } catch (e) {
    console.log(`Error for ${key}: ${e.message}`);
  }
}

fs.writeFileSync(mapPath, code);
console.log('Done!');
