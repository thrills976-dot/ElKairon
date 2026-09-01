const https = require('https');
const fs = require('fs');

async function resolveFlickr(keyword) {
  return new Promise((resolve, reject) => {
    https.get(`https://loremflickr.com/1200/800/${keyword}?lock=1`, (res) => {
      if (res.statusCode === 302 && res.headers.location) {
        resolve(`https://loremflickr.com${res.headers.location}`);
      } else {
        resolve(null);
      }
    }).on('error', reject);
  });
}

async function run() {
  const queries = {
    heroGlobalConnect: 'global,business,network',
    corporateHandshake: 'business,handshake',
    berlinCityscape: 'berlin,germany,city',
    happyCandidate: 'professional,worker,portrait',
    germanVisa: 'passport,visa,document',
    constructionEngineering: 'construction,engineer',
    healthcareNursing: 'nurse,hospital,patient',
    agricultureHarvest: 'agriculture,harvest,tractor',
    logisticsWarehouse: 'warehouse,worker,forklift',
    officeCollaboration: 'office,team,collaboration',
    openForBusiness: 'open,business,sign',
    accommodationApartment: 'modern,apartment,interior',
    airlineFlight: 'airplane,flying',
    cafeteriaMeal: 'cafeteria,food,lunch',
    centralEuropeHub: 'european,train,station',
    crossBorderVisa: 'passport,travel,documents',
    deployRelocate: 'moving,boxes,relocation',
    discoverTalent: 'job,interview,talent',
    euBlueCard: 'european,union,flag',
    germanyOpportunity: 'germany,flag,business',
    hotelChef: 'chef,cooking,restaurant',
    kairosPrecision: 'precision,clock,watch',
    matchInterview: 'job,interview,success',
    overtimeClock: 'office,clock,working',
    paidAnnualLeave: 'relaxing,vacation,beach',
    prepareAssess: 'taking,test,assessment',
    qualityOfLife: 'happy,family,park',
    residenceCard: 'id,card,document',
    rigorousScreening: 'magnifying,glass,document',
    seafoodProcessing: 'seafood,processing,worker',
    softwareDeveloper: 'software,developer,coding',
    strongEconomy: 'stock,market,graph',
    transportationBus: 'city,bus,transport',
    truckDriver: 'truck,driver,highway',
    uaeEmployment: 'dubai,city,skyline',
    ukSkilledWorker: 'london,city,big,ben',
    universityCampus: 'university,campus,students',
    workLifeBalance: 'work,life,balance,yoga',
    qualityHealthcare: 'hospital,doctor,patient',
    registeredNurse: 'registered,nurse,portrait',
    warehouseStaff: 'warehouse,staff,boxes',
    civilEngineer: 'civil,engineer,blueprint',
    financeSupervisor: 'finance,supervisor,office',
    constructionWorker: 'construction,worker,hardhat',
    medicalInsurance: 'health,insurance,document'
  };

  const results = {};
  for (const [key, q] of Object.entries(queries)) {
    try {
      const url = await resolveFlickr(q);
      results[key] = url;
      console.log(`${key}: ${url}`);
    } catch (e) {}
  }
  
  fs.writeFileSync('flickr_images.json', JSON.stringify(results, null, 2));
}

run();
