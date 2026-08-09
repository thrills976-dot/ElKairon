import { JobItem, RecommendedCourse, RecruiterProfileView } from '../types/recruitment';

export const INITIAL_JOBS: JobItem[] = [
  {
    id: 'j-cloud-architect',
    title: 'Cloud Solutions Architect (AWS / Azure)',
    company: 'NextGen Cloud Systems',
    location: 'Amsterdam, Netherlands (Hybrid / Visa Sponsored)',
    countries: ['Netherlands', 'Germany'],
    industry: 'Technology',
    salary: '€5,800 - €8,200 / month',
    minSalaryNum: 5800,
    maxSalaryNum: 8200,
    currency: 'EUR',
    type: 'Full-time',
    experience: 'Senior (5+ years)',
    skills: ['AWS', 'Azure', 'Terraform', 'Docker', 'Kubernetes', 'Python', 'DevOps CI/CD'],
    description: 'Leading European enterprise seeking an international Cloud Architect to design fault-tolerant hybrid cloud platforms. Full relocation and 30% tax ruling assistance provided.',
    visaSponsorship: true,
    workStyle: 'Hybrid',
    featured: true,
    hiringUrgency: 'High'
  },
  {
    id: 'j-sr-fullstack',
    title: 'Senior Full Stack Software Engineer (React / TypeScript / Node)',
    company: 'FinApex Global Digital',
    location: 'Dubai, UAE (On-site / Relocation Provided)',
    countries: ['UAE'],
    industry: 'Banking',
    salary: 'AED 24,000 - 32,000 / month (Tax-Free)',
    minSalaryNum: 24000,
    maxSalaryNum: 32000,
    currency: 'AED',
    type: 'Full-time',
    experience: 'Mid to Senior (3-6 years)',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker', 'PostgreSQL', 'FastAPI'],
    description: 'Tier-1 FinTech headquartered in DIFC Dubai hiring exceptional engineers to build ultra-low latency wealth management APIs and modern React frontends.',
    visaSponsorship: true,
    workStyle: 'On-site',
    featured: true,
    hiringUrgency: 'Immediate'
  },
  {
    id: 'j-network-sec',
    title: 'Network & Infrastructure Security Specialist (Cisco / Fortinet)',
    company: 'EuroTelecom Infrastructures',
    location: 'Dublin, Ireland (Hybrid / Work Permit Fast-Track)',
    countries: ['Ireland', 'United Kingdom'],
    industry: 'Telecommunications',
    salary: '€4,800 - €6,500 / month',
    minSalaryNum: 4800,
    maxSalaryNum: 6500,
    currency: 'EUR',
    type: 'Full-time',
    experience: 'Mid-Level (3+ years)',
    skills: ['Cisco CCNA', 'Networking', 'Routing & Switching', 'Fortinet', 'Wireshark', 'SIEM', 'Firewalls'],
    description: 'Deliver enterprise routing, switching, and firewall telemetry for major European telecom backbone networks.',
    visaSponsorship: true,
    workStyle: 'Hybrid',
    featured: true,
    hiringUrgency: 'High'
  },
  {
    id: 'j-cyber-analyst',
    title: 'Cybersecurity SOC Analyst (Splunk / SIEM / Threat Hunting)',
    company: 'Aegis Cyber Defense',
    location: 'Toronto, Canada (Relocation & LMIA Support)',
    countries: ['Canada'],
    industry: 'Technology',
    salary: 'CAD $6,200 - $8,500 / month',
    minSalaryNum: 6200,
    maxSalaryNum: 8500,
    currency: 'CAD',
    type: 'Full-time',
    experience: 'Mid-Level (2-5 years)',
    skills: ['SIEM', 'Splunk', 'Wireshark', 'Google Cybersecurity', 'CompTIA Security+', 'Python', 'Threat Analysis'],
    description: 'Monitor, detect, and neutralize high-level cyber security incidents across international financial networks.',
    visaSponsorship: true,
    workStyle: 'Hybrid',
    featured: true,
    hiringUrgency: 'High'
  },
  {
    id: 'j-registered-nurse',
    title: 'Registered Nurse / Clinical Care Specialist (DHA Licensure)',
    company: 'Al-Noor Premier Hospital Group',
    location: 'Abu Dhabi, UAE (Full Housing + Tax-Free Salary)',
    countries: ['UAE'],
    industry: 'Healthcare',
    salary: 'AED 16,000 - 22,000 / month (Tax-Free)',
    minSalaryNum: 16000,
    maxSalaryNum: 22000,
    currency: 'AED',
    type: 'Full-time',
    experience: 'Mid-Level (2+ years)',
    skills: ['Nursing', 'Patient Care', 'DHA Licensure', 'BLS/ACLS', 'Clinical Assessment', 'English'],
    description: 'Prestigious tertiary medical hospital offering full visa sponsorship, family flight allowance, and DHA license conversion support.',
    visaSponsorship: true,
    workStyle: 'On-site',
    featured: true,
    hiringUrgency: 'Immediate'
  },
  {
    id: 'j-devops-sre',
    title: 'DevOps & Site Reliability Engineer (Linux / Kubernetes / CI-CD)',
    company: 'Nordic ScaleTech',
    location: 'Helsinki, Finland (Hybrid / EU Blue Card)',
    countries: ['Finland', 'Germany'],
    industry: 'Technology',
    salary: '€4,900 - €6,800 / month',
    minSalaryNum: 4900,
    maxSalaryNum: 6800,
    currency: 'EUR',
    type: 'Full-time',
    experience: 'Senior (4+ years)',
    skills: ['Linux', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD Pipelines', 'Python'],
    description: 'Automate build pipelines and maintain 99.99% uptime for cloud-native microservice systems across Northern Europe.',
    visaSponsorship: true,
    workStyle: 'Hybrid',
    featured: false,
    hiringUrgency: 'Normal'
  },
  {
    id: 'j-data-scientist',
    title: 'AI / Data Scientist & ML Engineer',
    company: 'QuantGlobal Analytics',
    location: 'London, United Kingdom (Skilled Worker Visa)',
    countries: ['United Kingdom'],
    industry: 'Banking',
    salary: '£4,500 - £6,800 / month',
    minSalaryNum: 4500,
    maxSalaryNum: 6800,
    currency: 'GBP',
    type: 'Full-time',
    experience: 'Mid to Senior (3+ years)',
    skills: ['Python', 'Data Science', 'Machine Learning', 'SQL', 'FastAPI', 'Pandas', 'Cloud Architecture'],
    description: 'Build predictive statistical models and machine learning pipelines for international financial asset forecasting.',
    visaSponsorship: true,
    workStyle: 'Hybrid',
    featured: true,
    hiringUrgency: 'High'
  },
  {
    id: 'j-ui-ux-designer',
    title: 'Lead UI/UX Product Designer',
    company: 'Veloce Digital Design',
    location: 'Berlin, Germany (Hybrid / Visa Sponsored)',
    countries: ['Germany'],
    industry: 'Technology',
    salary: '€4,200 - €6,000 / month',
    minSalaryNum: 4200,
    maxSalaryNum: 6000,
    currency: 'EUR',
    type: 'Full-time',
    experience: 'Senior (4+ years)',
    skills: ['UI/UX Design', 'Figma', 'Design Systems', 'User Research', 'Prototyping', 'Product Strategy'],
    description: 'Design intuitive interfaces for B2B SaaS applications used by over 500,000 daily professionals across Europe.',
    visaSponsorship: true,
    workStyle: 'Hybrid',
    featured: false,
    hiringUrgency: 'Normal'
  },
  {
    id: 'j-mining-eng',
    title: 'Senior Mining & Extraction Project Engineer',
    company: 'Apex Resources International',
    location: 'Perth, Australia (TSS 482 Visa Sponsorship)',
    countries: ['Australia'],
    industry: 'Mining',
    salary: 'AUD $9,500 - $13,500 / month',
    minSalaryNum: 9500,
    maxSalaryNum: 13500,
    currency: 'AUD',
    type: 'Full-time',
    experience: 'Senior (6+ years)',
    skills: ['Mining Engineering', 'Project Management', 'PMP', 'Safety Compliance', 'Heavy Machinery Operations'],
    description: 'Lead critical mineral extraction and safety engineering for sustainable lithium and nickel operations in Western Australia.',
    visaSponsorship: true,
    workStyle: 'On-site',
    featured: true,
    hiringUrgency: 'High'
  },
  {
    id: 'j-it-admin',
    title: 'Enterprise Microsoft 365 & IT Systems Administrator',
    company: 'GlobalLogistics Group',
    location: 'Johannesburg, South Africa / Remote Southern Africa',
    countries: ['South Africa', 'Zimbabwe'],
    industry: 'Technology',
    salary: 'ZAR 45,000 - 65,000 / month',
    minSalaryNum: 45000,
    maxSalaryNum: 65000,
    currency: 'ZAR',
    type: 'Full-time',
    experience: 'Mid-Level (3+ years)',
    skills: ['Microsoft 365', 'Azure', 'Active Directory', 'ITIL', 'Linux', 'Helpdesk Leadership', 'Hardware'],
    description: 'Manage cross-border enterprise identity, Intune device enrollment, and zero-trust cloud access for 2,000+ staff.',
    visaSponsorship: false,
    workStyle: 'Hybrid',
    featured: false,
    hiringUrgency: 'Normal'
  }
];

export const RECOMMENDED_COURSES: RecommendedCourse[] = [
  {
    id: 'c-aws-solutions',
    title: 'AWS Certified Solutions Architect - Associate Accelerated',
    provider: 'ElKairon Tech Academy & AWS',
    skillAddressed: 'Cloud Architecture & AWS',
    potentialMatchBoost: 12,
    duration: '4 Weeks (Self-paced)',
    level: 'Intermediate'
  },
  {
    id: 'c-docker-k8s',
    title: 'Docker & Kubernetes Production Mastery',
    provider: 'Cloud Native Computing Foundation',
    skillAddressed: 'Kubernetes & Containerization',
    potentialMatchBoost: 9,
    duration: '3 Weeks',
    level: 'Advanced'
  },
  {
    id: 'c-siem-splunk',
    title: 'Splunk Enterprise SOC Analyst & Threat Hunting Bootcamp',
    provider: 'Splunk Academic Alliance',
    skillAddressed: 'SIEM & Threat Analysis',
    potentialMatchBoost: 11,
    duration: '5 Weeks',
    level: 'Intermediate'
  },
  {
    id: 'c-dha-nursing',
    title: 'DHA / UAE Prometric Licensing Conversion & OSCE Review',
    provider: 'Emirates Health Authority Accredited',
    skillAddressed: 'DHA Licensure & Middle East Clinical Protocols',
    potentialMatchBoost: 18,
    duration: '2 Weeks',
    level: 'Professional Licensure'
  },
  {
    id: 'c-react-ts',
    title: 'Advanced React 19, TypeScript & Distributed Microfrontends',
    provider: 'Global Engineering Guild',
    skillAddressed: 'TypeScript & Enterprise Frontend Architecture',
    potentialMatchBoost: 8,
    duration: '3 Weeks',
    level: 'Senior'
  }
];

export const MOCK_RECRUITER_VIEWS: RecruiterProfileView[] = [
  {
    id: 'rv-1',
    recruiterName: 'Elena Rostova',
    company: 'NextGen Cloud Systems (Amsterdam)',
    viewedAt: '2 hours ago',
    location: 'Netherlands',
    interestScore: 94
  },
  {
    id: 'rv-2',
    recruiterName: 'Tariq Al-Mansoor',
    company: 'FinApex Global Digital (Dubai)',
    viewedAt: '5 hours ago',
    location: 'UAE',
    interestScore: 91
  },
  {
    id: 'rv-3',
    recruiterName: 'Sarah O\'Connor',
    company: 'EuroTelecom Infrastructures (Dublin)',
    viewedAt: 'Yesterday',
    location: 'Ireland',
    interestScore: 88
  },
  {
    id: 'rv-4',
    recruiterName: 'Marcus Lindholm',
    company: 'Nordic ScaleTech (Helsinki)',
    viewedAt: '2 days ago',
    location: 'Finland',
    interestScore: 85
  }
];

export const POPULAR_SKILLS = [
  'Python', 'Java', 'React', 'TypeScript', 'Node.js', 'Cisco CCNA', 'Networking',
  'Routing & Switching', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Linux',
  'Microsoft 365', 'SIEM', 'Splunk', 'Wireshark', 'Google Cybersecurity',
  'CompTIA Security+', 'ITIL', 'PMP', 'CEH', 'Nursing', 'DHA Licensure',
  'Patient Care', 'FastAPI', 'PostgreSQL', 'Terraform', 'UI/UX Design',
  'Figma', 'Data Science', 'Machine Learning', 'SQL'
];

export const POPULAR_CERTIFICATIONS = [
  'Microsoft Azure Administrator (AZ-104)',
  'Cisco CCNA (200-301)',
  'AWS Solutions Architect Associate',
  'Google Cybersecurity Professional',
  'CompTIA Security+ (SY0-701)',
  'ITIL 4 Foundation',
  'Project Management Professional (PMP)',
  'Certified Ethical Hacker (CEH)',
  'DHA Registered Nurse License',
  'IELTS English Band 7.5+',
  'Certified Kubernetes Administrator (CKA)'
];

export const POPULAR_JOB_TITLES = [
  'Software Engineer',
  'Backend Developer',
  'Frontend Developer',
  'Full Stack Engineer',
  'DevOps Engineer',
  'Network Engineer',
  'Cybersecurity Analyst',
  'UI/UX Designer',
  'Cloud Engineer',
  'Data Scientist',
  'Systems Administrator',
  'Registered Nurse',
  'Healthcare Caregiver',
  'Project Manager',
  'Mining Engineer'
];

export const POPULAR_INDUSTRIES = [
  'Technology',
  'Banking & FinTech',
  'Healthcare',
  'Mining & Natural Resources',
  'Government & Public Sector',
  'Education & EdTech',
  'Telecommunications',
  'Manufacturing & Logistics',
  'Energy & Renewable Power'
];

export const TARGET_COUNTRIES = [
  'Canada',
  'United Kingdom',
  'UAE',
  'Germany',
  'Netherlands',
  'Ireland',
  'Finland',
  'Australia',
  'South Africa',
  'Zimbabwe',
  'USA'
];
