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

import germanVisaImg from '../assets/images/german_visa_1787071936912.jpg';
import rigorousScreeningImg from '../assets/images/rigorous_screening_1787071952354.jpg';
import euBlueCardImg from '../assets/images/eu_blue_card_1787071965176.jpg';
import centralEuropeHubImg from '../assets/images/central_europe_hub_1787071978333.jpg';
import qualityOfLifeImg from '../assets/images/quality_of_life_1787071991105.jpg';
import workLifeBalanceImg from '../assets/images/work_life_balance_1787072002394.jpg';
import strongEconomyImg from '../assets/images/strong_economy_1787072014642.jpg';
import discoverTalentImg from '../assets/images/discover_talent_1787072028448.jpg';

import uaeEmploymentImg from '../assets/images/uae_employment_1787072050465.jpg';
import germanyOpportunityImg from '../assets/images/germany_opportunity_1787072066068.jpg';
import ukSkilledWorkerImg from '../assets/images/uk_skilled_worker_1787072078433.jpg';
import hotelChefImg from '../assets/images/hotel_chef_1787072090541.jpg';
import softwareDeveloperImg from '../assets/images/software_developer_1787072106632.jpg';
import seafoodProcessingImg from '../assets/images/seafood_processing_1787072119021.jpg';
import crossBorderVisaImg from '../assets/images/cross_border_visa_1787072133001.jpg';
import kairosPrecisionImg from '../assets/images/kairos_precision_1787072146159.jpg';

export const BACKGROUND_IMAGES = {
  // Generated Hero & General Backgrounds
  heroGlobalConnect: heroGlobalConnect,
  corporateHandshake: sectorCorporate,
  berlinCityscape: berlinCityscape,
  happyCandidate: happyCandidate,
  germanVisa: germanVisaImg,

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
  centralEuropeHub: centralEuropeHubImg,
  crossBorderVisa: crossBorderVisaImg,
  deployRelocate: 'https://loremflickr.com/1200/800/airport,travel,relocation/all',
  discoverTalent: discoverTalentImg,
  euBlueCard: euBlueCardImg,
  germanyOpportunity: germanyOpportunityImg,
  hotelChef: hotelChefImg,
  kairosPrecision: kairosPrecisionImg,
  matchInterview: 'https://loremflickr.com/1200/800/job,interview/all',
  overtimeClock: 'https://loremflickr.com/1200/800/clock,business/all',
  paidAnnualLeave: 'https://loremflickr.com/1200/800/vacation,relax/all',
  prepareAssess: 'https://loremflickr.com/1200/800/exam,assessment,laptop/all',
  qualityOfLife: qualityOfLifeImg,
  residenceCard: 'https://loremflickr.com/1200/800/idcard,document/all',
  rigorousScreening: rigorousScreeningImg,
  seafoodProcessing: seafoodProcessingImg,
  softwareDeveloper: softwareDeveloperImg,
  strongEconomy: strongEconomyImg,
  transportationBus: 'https://loremflickr.com/1200/800/public,transit,bus/all',
  truckDriver: 'https://loremflickr.com/1200/800/truck,highway,logistics/all',
  uaeEmployment: uaeEmploymentImg,
  ukSkilledWorker: ukSkilledWorkerImg,
  universityCampus: 'https://loremflickr.com/1200/800/university,campus/all',
  workLifeBalance: workLifeBalanceImg,

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
console.log('imageMap.ts updated successfully with 24 native images.');
