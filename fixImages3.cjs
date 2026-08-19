const fs = require('fs');

const goodIds = [
  "1542744173-8e7e53415bb0", "1451187580459-43490279c0fa", "1517245386807-bb43f82c33c4",
  "1532094349884-543bc11b234d", "1454165804606-c3d57bc86b40", "1486406146926-c627a92ad1ab",
  "1453928582365-b6ad33cbcf64", "1501504905252-473c47e087f8", "1522202176988-66273c2fd55f",
  "1521791136064-7986c2920216", "1516549655169-df83a0774514", "1503387762-592deb58ef4e",
  "1497366216548-37526070297c", "1587825140708-dfaf72ae4b04", "1500382017468-9049fed747ef",
  "1519494026892-80bbd2d6fd0d", "1521737604893-d14cc237f11d", "1586528116311-ad8dd3c8310d",
  "1507525428034-b723cf961d3e", "1522708323590-d24dbb6b0267", "1573496359142-b8d87734a5a2",
  "1495360010541-f48722b34f7d", "1577219491135-ce391730fb2c", "1560969184-10fe8719e047",
  "1583511655857-d19b40a7a54e", "1601584115197-04ecc0da31d7", "1555899434-94d1368aa7af",
  "1555066931-4365d14bab8c", "1517457373958-b7bdd4587205"
];

// Define exactly what gets what, using the verified IDs.
const map = {
  heroGlobalConnect: '1451187580459-43490279c0fa', // globe
  corporateHandshake: '1453928582365-b6ad33cbcf64', // business handshake
  berlinCityscape: '1560969184-10fe8719e047', // berlin
  happyCandidate: '1573496359142-b8d87734a5a2', // happy candidate
  germanVisa: '1555899434-94d1368aa7af', // visa
  constructionEngineering: '1503387762-592deb58ef4e', // construction
  healthcareNursing: '1519494026892-80bbd2d6fd0d', // healthcare
  agricultureHarvest: '1500382017468-9049fed747ef', // agriculture
  logisticsWarehouse: '1586528116311-ad8dd3c8310d', // warehouse
  officeCollaboration: '1454165804606-c3d57bc86b40', // office
  openForBusiness: '1497366216548-37526070297c', // business
  accommodationApartment: '1522708323590-d24dbb6b0267', // apartment
  airlineFlight: '1522202176988-66273c2fd55f', // city / flight replacement
  cafeteriaMeal: '1532094349884-543bc11b234d', // lab / meal replacement
  centralEuropeHub: '1522202176988-66273c2fd55f', // city / hub
  crossBorderVisa: '1587825140708-dfaf72ae4b04', // legal document
  deployRelocate: '1486406146926-c627a92ad1ab', // city/economy
  discoverTalent: '1521737604893-d14cc237f11d', // handshake
  euBlueCard: '1587825140708-dfaf72ae4b04', // document
  germanyOpportunity: '1560969184-10fe8719e047', // berlin
  hotelChef: '1577219491135-ce391730fb2c', // chef
  kairosPrecision: '1495360010541-f48722b34f7d', // precision/clock
  matchInterview: '1501504905252-473c47e087f8', // coffee shop interview
  overtimeClock: '1495360010541-f48722b34f7d', // clock
  paidAnnualLeave: '1507525428034-b723cf961d3e', // leave/vacation
  prepareAssess: '1517245386807-bb43f82c33c4', // laptop / prepare
  qualityOfLife: '1517457373958-b7bdd4587205', // life/nature
  residenceCard: '1555899434-94d1368aa7af', // visa
  rigorousScreening: '1587825140708-dfaf72ae4b04', // screening/document
  seafoodProcessing: '1583511655857-d19b40a7a54e', // seafood
  softwareDeveloper: '1555066931-4365d14bab8c', // dev
  strongEconomy: '1486406146926-c627a92ad1ab', // economy
  transportationBus: '1601584115197-04ecc0da31d7', // truck / transport
  truckDriver: '1601584115197-04ecc0da31d7', // truck driver
  uaeEmployment: '1522202176988-66273c2fd55f', // city
  ukSkilledWorker: '1542744173-8e7e53415bb0', // business prof
  universityCampus: '1521791136064-7986c2920216', // campus/hands
  workLifeBalance: '1517457373958-b7bdd4587205', // work life balance
  qualityHealthcare: '1519494026892-80bbd2d6fd0d',
  registeredNurse: '1516549655169-df83a0774514', // doctor/nurse
  warehouseStaff: '1586528116311-ad8dd3c8310d',
  civilEngineer: '1503387762-592deb58ef4e',
  financeSupervisor: '1542744173-8e7e53415bb0', // business
  constructionWorker: '1503387762-592deb58ef4e',
  medicalInsurance: '1519494026892-80bbd2d6fd0d'
};

const mapEntries = Object.entries(map).map(([key, id]) => {
  return `  ${key}: 'https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200',`;
}).join('\n');

const newContent = `export const BACKGROUND_IMAGES = {\n${mapEntries}\n};\n\nexport const SECTOR_IMAGE_CARDS = [\n  {\n    id: 'healthcare',\n    title: 'Healthcare & Nursing',\n    subtitle: 'Registered Nurses, Clinical Caregivers & Medical Technicians',\n    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',\n    description: 'Direct Fast-Track § 81a placement into German hospitals and clinical care facilities with B1/B2 German language support.',\n  },\n  {\n    id: 'construction',\n    title: 'Construction & Civil Engineering',\n    subtitle: 'Structural Engineers, Electricians, Welders & Site Supervisors',\n    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',\n    description: 'High-rise structural steel assembly, electrical infrastructure, and architectural site management across Europe.',\n  },\n  {\n    id: 'agriculture',\n    title: 'Agri-Tech & Harvesting',\n    subtitle: 'Modern Farm Machine Operators & Produce Logistics',\n    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',\n    description: 'Large-scale agricultural operations, combine harvesting, fresh produce supply chains, and specialized farming.',\n  },\n  {\n    id: 'logistics',\n    title: 'Logistics & Supply Chain',\n    subtitle: 'Warehouse Operations, Transport & Heavy Delivery',\n    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',\n    description: 'Opportunities in distribution centers, freight forwarding, and international supply chain management.',\n  },\n  {\n    id: 'corporate',\n    title: 'IT, Finance & Enterprise Services',\n    subtitle: 'Cloud Engineers, Analysts & Strategic Operations',\n    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200',\n    description: 'Top-tier corporate placements in tech hubs, financial institutions, and international business enterprises.',\n  },\n];\n`;

fs.writeFileSync('src/data/imageMap.ts', newContent);
console.log("Written!");
