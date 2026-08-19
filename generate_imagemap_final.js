const fs = require('fs');
const path = require('path');

const newImageMapContent = `
import heroGlobalConnect from '../assets/images/hero_global_connect_1787071744753.jpg';
import sectorHealthcare from '../assets/images/sector_healthcare_1787071757306.jpg';
import sectorConstruction from '../assets/images/sector_construction_1787071770537.jpg';
import sectorAgriculture from '../assets/images/sector_agriculture_1787071783603.jpg';
import sectorLogistics from '../assets/images/sector_logistics_1787071797441.jpg';
import sectorCorporate from '../assets/images/sector_corporate_1787071810370.jpg';
import happyCandidate from '../assets/images/happy_candidate_visa_1787071823220.jpg';
import berlinCityscape from '../assets/images/berlin_cityscape_1787071833455.jpg';

export const BACKGROUND_IMAGES = {
  // Generated Hero & General Backgrounds
  heroGlobalConnect: heroGlobalConnect,
  corporateHandshake: sectorCorporate,
  berlinCityscape: berlinCityscape,
  happyCandidate: happyCandidate,
  germanVisa: 'https://loremflickr.com/1200/800/passport,visa/all',

  // Generated Sector Backgrounds
  constructionEngineering: sectorConstruction,
  healthcareNursing: sectorHealthcare,
  agricultureHarvest: sectorAgriculture,
  logisticsWarehouse: sectorLogistics,
  
  // Collaboration & Business
  officeCollaboration: 'https://loremflickr.com/1200/800/office,collaboration/all',
  openForBusiness: 'https://loremflickr.com/1200/800/modern,office,building/all',

  // Specific Features / Workflows
  accommodationApartment: 'https://loremflickr.com/1200/800/apartment,livingroom/all',
  airlineFlight: 'https://loremflickr.com/1200/800/airport,flight/all',
  cafeteriaMeal: 'https://loremflickr.com/1200/800/healthy,lunch,meal/all',
  centralEuropeHub: 'https://loremflickr.com/1200/800/train,europe,landscape/all',
  crossBorderVisa: 'https://loremflickr.com/1200/800/passport,europe/all',
  deployRelocate: 'https://loremflickr.com/1200/800/airport,travel,relocation/all',
  discoverTalent: 'https://loremflickr.com/1200/800/business,recruitment/all',
  euBlueCard: 'https://loremflickr.com/1200/800/bluecard,europe/all',
  germanyOpportunity: 'https://loremflickr.com/1200/800/berlin,brandenburg/all',
  hotelChef: 'https://loremflickr.com/1200/800/chef,restaurant/all',
  kairosPrecision: 'https://loremflickr.com/1200/800/clock,precision,business/all',
  matchInterview: 'https://loremflickr.com/1200/800/job,interview/all',
  overtimeClock: 'https://loremflickr.com/1200/800/clock,business/all',
  paidAnnualLeave: 'https://loremflickr.com/1200/800/vacation,relax/all',
  prepareAssess: 'https://loremflickr.com/1200/800/exam,assessment,laptop/all',
  qualityOfLife: 'https://loremflickr.com/1200/800/happy,family,city/all',
  residenceCard: 'https://loremflickr.com/1200/800/idcard,document/all',
  rigorousScreening: 'https://loremflickr.com/1200/800/hr,interview/all',
  seafoodProcessing: 'https://loremflickr.com/1200/800/food,processing,factory/all',
  softwareDeveloper: 'https://loremflickr.com/1200/800/programmer,coding/all',
  strongEconomy: 'https://loremflickr.com/1200/800/frankfurt,skyline/all',
  transportationBus: 'https://loremflickr.com/1200/800/public,transit,bus/all',
  truckDriver: 'https://loremflickr.com/1200/800/truck,highway,logistics/all',
  uaeEmployment: 'https://loremflickr.com/1200/800/dubai,business/all',
  ukSkilledWorker: 'https://loremflickr.com/1200/800/london,business/all',
  universityCampus: 'https://loremflickr.com/1200/800/university,campus/all',
  workLifeBalance: 'https://loremflickr.com/1200/800/relax,park,bicycle/all',

  // Fallbacks
  qualityHealthcare: sectorHealthcare,
  registeredNurse: sectorHealthcare,
  warehouseStaff: sectorLogistics,
  civilEngineer: sectorConstruction,
  financeSupervisor: sectorCorporate,
  constructionWorker: sectorConstruction,
  medicalInsurance: sectorHealthcare,
};

export const SECTOR_IMAGE_CARDS = [
  {
    id: 'healthcare',
    title: 'Healthcare & Nursing',
    subtitle: 'Registered Nurses, Clinical Caregivers & Medical Technicians',
    image: sectorHealthcare,
    description: 'Direct Fast-Track § 81a placement into German hospitals and clinical care facilities with B1/B2 German language support.',
  },
  {
    id: 'construction',
    title: 'Construction & Civil Engineering',
    subtitle: 'Structural Engineers, Electricians, Welders & Site Supervisors',
    image: sectorConstruction,
    description: 'High-rise structural steel assembly, electrical infrastructure, and architectural site management across Europe.',
  },
  {
    id: 'agriculture',
    title: 'Agri-Tech & Harvesting',
    subtitle: 'Modern Farm Machine Operators & Produce Logistics',
    image: sectorAgriculture,
    description: 'Large-scale agricultural operations, combine harvesting, fresh produce supply chains, and specialized farming.',
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    subtitle: 'Warehouse Operations, Transport & Heavy Delivery',
    image: sectorLogistics,
    description: 'Opportunities in distribution centers, freight forwarding, and international supply chain management.',
  },
  {
    id: 'corporate',
    title: 'IT, Finance & Enterprise Services',
    subtitle: 'Cloud Engineers, Analysts & Strategic Operations',
    image: sectorCorporate,
    description: 'Top-tier corporate placements in tech hubs, financial institutions, and international business enterprises.',
  },
];
`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'imageMap.ts'), newImageMapContent);
console.log('imageMap.ts updated successfully with native and placeholder images.');
