const fs = require('fs');

const ids = {
  heroGlobalConnect: '1512453979436-5a52c95f9022', // Office / Globe / Connect
  corporateHandshake: '1556761175-5973dc0f32b7', // Handshake / business
  berlinCityscape: '1560969184-10fe8719e047', // Berlin
  happyCandidate: '1573496359142-b8d87734a5a2', // Happy professional
  germanVisa: '1555899434-94d1368aa7af', // Passport
  constructionEngineering: '1503387762-592deb58ef4e', // Construction
  healthcareNursing: '1519494026892-80bbd2d6fd0d', // Hospital
  agricultureHarvest: '1500382017468-9049fed747ef', // Field / Tractor
  logisticsWarehouse: '1586528116311-ad8dd3c8310d', // Warehouse
  officeCollaboration: '1522071820081-009f0129c71c', // Collaboration
  openForBusiness: '1497366216548-37526070297c', // Modern office
  accommodationApartment: '1522708323590-d24dbb6b0267', // Apartment
  airlineFlight: '1436491865461-1cece12e378c', // Airplane wing
  cafeteriaMeal: '1490645935980-d144393bf649', // Healthy food
  centralEuropeHub: '1474487548417-72840c247305', // Train station
  crossBorderVisa: '1436491865461-1cece12e378c', // Airplane travel
  deployRelocate: '1436491865461-1cece12e378c', // Plane
  discoverTalent: '1521737604893-d14cc237f11d', // Interview / HR
  euBlueCard: '1555899434-94d1368aa7af', // Passport / Card
  germanyOpportunity: '1560969184-10fe8719e047', // Berlin
  hotelChef: '1577219491135-ce391730fb2c', // Kitchen / Chef
  kairosPrecision: '1495360010541-f48722b34f7d', // Clock / Time
  matchInterview: '1573164713619-24bf7efbf414', // Interview
  overtimeClock: '1495360010541-f48722b34f7d', // Clock
  paidAnnualLeave: '1507525428034-b723cf961d3e', // Beach / Vacation
  prepareAssess: '1516321318423-f06f85e504b3', // Person typing on laptop
  qualityOfLife: '1517457373958-b7bdd4587205', // Happy people city
  residenceCard: '1555899434-94d1368aa7af', // Passport document
  rigorousScreening: '1573164713619-24bf7efbf414', // Corporate HR
  seafoodProcessing: '1583511655857-d19b40a7a54e', // Food processing
  softwareDeveloper: '1555066931-4365d14bab8c', // Coding / Tech
  strongEconomy: '1486406146926-c627a92ad1ab', // City skyscrapers
  transportationBus: '1544620347-19de4f1e428c', // Modern bus
  truckDriver: '1601584115197-04ecc0da31d7', // Semi truck
  uaeEmployment: '1512453979436-5a52c95f9022', // Modern city
  ukSkilledWorker: '1513635269974-59f9d5efa320', // London
  universityCampus: '1541339185-c5ef6101c43f', // University
  workLifeBalance: '1517457373958-b7bdd4587205' // Relaxing
};

const getUrl = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200`;

let content = `
export const BACKGROUND_IMAGES = {
`;

for (const [key, id] of Object.entries(ids)) {
  content += `  ${key}: '${getUrl(id)}',\n`;
}

content += `
  // Fallbacks
  qualityHealthcare: '${getUrl(ids.healthcareNursing)}',
  registeredNurse: '${getUrl(ids.healthcareNursing)}',
  warehouseStaff: '${getUrl(ids.logisticsWarehouse)}',
  civilEngineer: '${getUrl(ids.constructionEngineering)}',
  financeSupervisor: '${getUrl(ids.corporateHandshake)}',
  constructionWorker: '${getUrl(ids.constructionEngineering)}',
  medicalInsurance: '${getUrl(ids.healthcareNursing)}',
};

export const SECTOR_IMAGE_CARDS = [
  {
    id: 'healthcare',
    title: 'Healthcare & Nursing',
    subtitle: 'Registered Nurses, Clinical Caregivers & Medical Technicians',
    image: '${getUrl(ids.healthcareNursing)}',
    description: 'Direct Fast-Track § 81a placement into German hospitals and clinical care facilities with B1/B2 German language support.',
  },
  {
    id: 'construction',
    title: 'Construction & Civil Engineering',
    subtitle: 'Structural Engineers, Electricians, Welders & Site Supervisors',
    image: '${getUrl(ids.constructionEngineering)}',
    description: 'High-rise structural steel assembly, electrical infrastructure, and architectural site management across Europe.',
  },
  {
    id: 'agriculture',
    title: 'Agri-Tech & Harvesting',
    subtitle: 'Modern Farm Machine Operators & Produce Logistics',
    image: '${getUrl(ids.agricultureHarvest)}',
    description: 'Large-scale agricultural operations, combine harvesting, fresh produce supply chains, and specialized farming.',
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    subtitle: 'Warehouse Operations, Transport & Heavy Delivery',
    image: '${getUrl(ids.logisticsWarehouse)}',
    description: 'Opportunities in distribution centers, freight forwarding, and international supply chain management.',
  },
  {
    id: 'corporate',
    title: 'IT, Finance & Enterprise Services',
    subtitle: 'Cloud Engineers, Analysts & Strategic Operations',
    image: '${getUrl(ids.corporateHandshake)}',
    description: 'Top-tier corporate placements in tech hubs, financial institutions, and international business enterprises.',
  },
];
`;

fs.writeFileSync('src/data/imageMap.ts', content);
console.log('imageMap.ts rewritten with Unsplash URLs.');
