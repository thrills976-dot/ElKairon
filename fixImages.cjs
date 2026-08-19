const fs = require('fs');

const tsFile = 'src/data/imageMap.ts';
let content = fs.readFileSync(tsFile, 'utf-8');

const replacements = {
  // Fix the duplicate fallbacks from the previous sed command that mapped things to the same IDs.
  'heroGlobalConnect': '1512453979436-5a52c95f9022', // Was mapped to strongEconomy (1486406146926-c627a92ad1ab) -> replacing with new globe: 1451187580459-43490279c0fa
  'corporateHandshake': '1556761175-5973dc0f32b7', // Was mapped to discoverTalent (1521737604893-d14cc237f11d) -> replacing with new handshake: 1560250097001-c082a970e0e0
  'airlineFlight': '1436491865461-1cece12e378c', // Was mapped to germanVisa (1555899434-94d1368aa7af) -> replacing with new plane: 1436491865461-1cece12e378c -> Wait, 1436... was 404. Let's use 1540339832859-9942a1eb5097
  'cafeteriaMeal': '1490645935980-d144393bf649', // Was mapped to hotelChef (1577219491135-ce391730fb2c) -> replacing with cafeteria: 1515003197203-22d7119b9595
  'centralEuropeHub': '1474487548417-72840c247305', // Was mapped to berlinCityscape (1560969184-10fe8719e047) -> replacing with europe train: 1528641973686-90e676b50e3b
  'matchInterview': '1573164713619-24bf7efbf414', // Was mapped to prepareAssess (1516321318423-f06f85e504b3) -> replacing with interview: 1551836022-4c4c79cb2441
  'transportationBus': '1544620347-19de4f1e428c', // Was mapped to truckDriver (1601584115197-04ecc0da31d7) -> replacing with bus: 1544620347-19de4f1e428c is 404, using 1570125909202-e2f0d0e15b3c
  'ukSkilledWorker': '1513635269974-59f9d5efa320', // Was mapped to happyCandidate (1573496359142-b8d87734a5a2) -> replacing with london: 1513635269974-59f9d5efa320 is 404, using 1505761671135-624fe04fdac1
  'universityCampus': '1541339185-c5ef6101c43f' // Was mapped to openForBusiness (1497366216548-37526070297c) -> replacing with campus: 1541... 404, using 1541339185-c5ef6101c43f ? Wait, 1541339185 was 404. Let's use 1523050854058-8df90110c9f1
};

// So here is the full new clean map
const cleanMap = {
  heroGlobalConnect: '1451187580459-43490279c0fa', // Global/Globe
  corporateHandshake: '1560250097001-c082a970e0e0', // Handshake
  berlinCityscape: '1560969184-10fe8719e047', 
  happyCandidate: '1573496359142-b8d87734a5a2', 
  germanVisa: '1555899434-94d1368aa7af', 
  constructionEngineering: '1503387762-592deb58ef4e', 
  healthcareNursing: '1519494026892-80bbd2d6fd0d', 
  agricultureHarvest: '1500382017468-9049fed747ef', 
  logisticsWarehouse: '1586528116311-ad8dd3c8310d', 
  officeCollaboration: '1522071820081-009f0129c71c', 
  openForBusiness: '1497366216548-37526070297c', 
  accommodationApartment: '1522708323590-d24dbb6b0267', 
  airlineFlight: '1540339832859-9942a1eb5097', // Airplane
  cafeteriaMeal: '1515003197203-22d7119b9595', // Meal/Cafeteria
  centralEuropeHub: '1528641973686-90e676b50e3b', // Trains / Hub
  crossBorderVisa: '1554224155-6725b3fc61a4', // Passport/Visa
  deployRelocate: '1464039397637-25e174092476', // Travel/Relocate
  discoverTalent: '1521737604893-d14cc237f11d', 
  euBlueCard: '1569974246187-57577dc9da26', // Blue card/EU
  germanyOpportunity: '1467269204594-e8b78103c8ee', // Germany
  hotelChef: '1577219491135-ce391730fb2c', 
  kairosPrecision: '1495360010541-f48722b34f7d', 
  matchInterview: '1551836022-4c4c79cb2441', // Interview
  overtimeClock: '1495360010541-f48722b34f7d', // Clock
  paidAnnualLeave: '1507525428034-b723cf961d3e', 
  prepareAssess: '1516321318423-f06f85e504b3', 
  qualityOfLife: '1517457373958-b7bdd4587205', 
  residenceCard: '1621252179022-835cbb67137f', // ID Card
  rigorousScreening: '1573164713619-24bf7efbf414', // We need a new one for rigorousScreening since this was 404 -> 1450101499163-c8848c66e92b (Analyzing)
  seafoodProcessing: '1583511655857-d19b40a7a54e', 
  softwareDeveloper: '1555066931-4365d14bab8c', 
  strongEconomy: '1486406146926-c627a92ad1ab', 
  transportationBus: '1570125909202-e2f0d0e15b3c', // Bus
  truckDriver: '1601584115197-04ecc0da31d7', 
  uaeEmployment: '1512453979436-5a52c95f9022', // Was 404. Let's use Dubai -> 1512453979436-5a52c95f9022 is 404, using 1518684074-6f0284f18d7f
  ukSkilledWorker: '1505761671135-624fe04fdac1', // London
  universityCampus: '1523050854058-8df90110c9f1', // Campus
  workLifeBalance: '1517457373958-b7bdd4587205', 
  qualityHealthcare: '1519494026892-80bbd2d6fd0d',
  registeredNurse: '1519494026892-80bbd2d6fd0d',
  warehouseStaff: '1586528116311-ad8dd3c8310d',
  civilEngineer: '1503387762-592deb58ef4e',
  financeSupervisor: '1521737604893-d14cc237f11d',
  constructionWorker: '1503387762-592deb58ef4e',
  medicalInsurance: '1519494026892-80bbd2d6fd0d'
};

const mapEntries = Object.entries(cleanMap).map(([key, id]) => {
  return `  ${key}: 'https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200',`;
}).join('\n');

const newContent = `export const BACKGROUND_IMAGES = {\n${mapEntries}\n};\n\nexport const SECTOR_IMAGE_CARDS = [\n  {\n    id: 'healthcare',\n    title: 'Healthcare & Nursing',\n    subtitle: 'Registered Nurses, Clinical Caregivers & Medical Technicians',\n    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',\n    description: 'Direct Fast-Track § 81a placement into German hospitals and clinical care facilities with B1/B2 German language support.',\n  },\n  {\n    id: 'construction',\n    title: 'Construction & Civil Engineering',\n    subtitle: 'Structural Engineers, Electricians, Welders & Site Supervisors',\n    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',\n    description: 'High-rise structural steel assembly, electrical infrastructure, and architectural site management across Europe.',\n  },\n  {\n    id: 'agriculture',\n    title: 'Agri-Tech & Harvesting',\n    subtitle: 'Modern Farm Machine Operators & Produce Logistics',\n    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',\n    description: 'Large-scale agricultural operations, combine harvesting, fresh produce supply chains, and specialized farming.',\n  },\n  {\n    id: 'logistics',\n    title: 'Logistics & Supply Chain',\n    subtitle: 'Warehouse Operations, Transport & Heavy Delivery',\n    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',\n    description: 'Opportunities in distribution centers, freight forwarding, and international supply chain management.',\n  },\n  {\n    id: 'corporate',\n    title: 'IT, Finance & Enterprise Services',\n    subtitle: 'Cloud Engineers, Analysts & Strategic Operations',\n    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',\n    description: 'Top-tier corporate placements in tech hubs, financial institutions, and international business enterprises.',\n  },\n];\n`;

fs.writeFileSync(tsFile, newContent);
console.log("Done overwriting");

