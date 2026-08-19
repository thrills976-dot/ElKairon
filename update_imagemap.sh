cat << 'INNER_EOF' > src/data/imageMap.ts
export const BACKGROUND_IMAGES = {
  // Hero & General Backgrounds
  heroGlobalConnect: '/images/hero-global-connect.jpg',
  corporateHandshake: '/images/visa-relocation.jpg',
  berlinCityscape: '/images/berlin-cityscape.jpg',
  happyCandidate: '/images/cultural-integration.jpg',
  germanVisa: '/images/german-visa.jpg',

  // Sector Backgrounds
  constructionEngineering: '/images/sector-construction.jpg',
  healthcareNursing: '/images/sector-healthcare.jpg',
  agricultureHarvest: '/images/sector-agriculture.jpg',
  logisticsWarehouse: '/images/sector-logistics.jpg',
  
  // Collaboration & Business
  officeCollaboration: '/images/talent-sourcing.jpg',
  openForBusiness: '/images/open-for-business.jpg',

  // New Additions
  accommodationApartment: '/images/accommodation.jpg',
  airlineFlight: '/images/airline-ticket.jpg',
  cafeteriaMeal: '/images/meal.jpg',
  centralEuropeHub: '/images/central-europe-hub.jpg',
  crossBorderVisa: '/images/cross-border-visa.jpg',
  deployRelocate: '/images/deploy-relocate.jpg',
  discoverTalent: '/images/discover.jpg',
  euBlueCard: '/images/eu-blue-card.jpg',
  germanyOpportunity: '/images/germany-opportunity.jpg',
  hotelChef: '/images/hotel-chef.jpg',
  kairosPrecision: '/images/kairos-precision.jpg',
  matchInterview: '/images/match-interview.jpg',
  overtimeClock: '/images/overtime.jpg',
  paidAnnualLeave: '/images/paid-annual-leave.jpg',
  prepareAssess: '/images/prepare-assess.jpg',
  qualityOfLife: '/images/quality-of-life.jpg',
  residenceCard: '/images/trc.jpg',
  rigorousScreening: '/images/rigorous-screening.jpg',
  seafoodProcessing: '/images/seafood-processing.jpg',
  softwareDeveloper: '/images/senior-software-developer.jpg',
  strongEconomy: '/images/strong-economy.jpg',
  transportationBus: '/images/transportation.jpg',
  truckDriver: '/images/truck-driver.jpg',
  uaeEmployment: '/images/uae-employment.jpg',
  ukSkilledWorker: '/images/uk-skilled-worker.jpg',
  universityCampus: '/images/tuition-free-education.jpg',
  workLifeBalance: '/images/work-life-balance.jpg',
};

export const SECTOR_IMAGE_CARDS = [
  {
    id: 'healthcare',
    title: 'Healthcare & Nursing',
    subtitle: 'Registered Nurses, Clinical Caregivers & Medical Technicians',
    image: '/images/sector-healthcare.jpg',
    description: 'Direct Fast-Track § 81a placement into German hospitals and clinical care facilities with B1/B2 German language support.',
  },
  {
    id: 'construction',
    title: 'Construction & Civil Engineering',
    subtitle: 'Structural Engineers, Electricians, Welders & Site Supervisors',
    image: '/images/sector-construction.jpg',
    description: 'High-rise structural steel assembly, electrical infrastructure, and architectural site management across Europe.',
  },
  {
    id: 'agriculture',
    title: 'Agri-Tech & Harvesting',
    subtitle: 'Modern Farm Machine Operators & Produce Logistics',
    image: '/images/sector-agriculture.jpg',
    description: 'Large-scale agricultural operations, combine harvesting, fresh produce supply chains, and specialized farming.',
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    subtitle: 'Warehouse Operations, Transport & Heavy Delivery',
    image: '/images/sector-logistics.jpg',
    description: 'Opportunities in distribution centers, freight forwarding, and international supply chain management.',
  },
  {
    id: 'corporate',
    title: 'IT, Finance & Enterprise Services',
    subtitle: 'Cloud Engineers, Analysts & Strategic Operations',
    image: '/images/sector-corporate.jpg',
    description: 'Top-tier corporate placements in tech hubs, financial institutions, and international business enterprises.',
  },
];
INNER_EOF
