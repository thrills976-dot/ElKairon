import { PreVettedCandidate, ComplianceDocument, EmployerMessage } from '../types/recruitment';

export const PRE_VETTED_CANDIDATES: PreVettedCandidate[] = [
  // Healthcare Sector
  {
    id: 'cand-hc-1',
    name: 'Dr. Amina Benali',
    title: 'Senior ICU & Critical Care Nurse Specialist',
    sector: 'Healthcare',
    subSector: 'Intensive Care / Hospital Ward',
    location: 'Tunis, Tunisia',
    targetRelocation: 'Germany (Berlin / Munich / Frankfurt)',
    experienceYears: 6,
    germanLevel: 'B2 Certified (Telc Deutsch Pflege)',
    englishLevel: 'C1 Fluent',
    education: "Bachelor of Science in Nursing - Université de Tunis El Manar",
    credentialsStatus: 'Anerkennung (Full Recognition in Progress - Defizitbescheid completed)',
    fastTrackEligible: true,
    availability: 'Immediate (14-Day Fast-Track Ready)',
    avatar: 'https://images.unsplash.com/photo-1594824813682-1e967a14ecb3?auto=format&fit=crop&q=80&w=300',
    skills: ['Intensive Care (ICU)', 'Mechanical Ventilation', 'Patient Monitoring', 'Medication Administration', 'Emergency Triage', 'BLS / ACLS Certified'],
    bio: 'Dedicated critical care nurse with 6 years of acute hospital ward experience. Fully prepared for German hospital integration with verified Telc B2 Pflege certification and apostilled transcripts.',
    rating: 4.9,
    salaryExpectation: '€3,400 - €4,200 / month',
    visaStatus: '§ 81a Accelerated Skilled Worker Eligible',
    documentsReady: ['B2 Telc Certificate', 'Nursing Diploma Apostille', 'Police Clearance', 'Health Certificate (Infektionsschutzgesetz)', 'Curriculum Vitae (Europass)'],
    badge: 'Pre-Vetted & Language Tested'
  },
  {
    id: 'cand-hc-2',
    name: 'Samuel Kiprop',
    title: 'Geriatric Care & Rehabilitation Nurse',
    sector: 'Healthcare',
    subSector: 'Elderly Care / Rehabilitation',
    location: 'Nairobi, Kenya',
    targetRelocation: 'Germany (Hamburg / NRW)',
    experienceYears: 4,
    germanLevel: 'B1 (B2 Exam Scheduled next month)',
    englishLevel: 'Fluent Native',
    education: 'Diploma in Nursing & Palliative Care - Kenya Medical Training College',
    credentialsStatus: 'Defizitbescheid Acquired (Adaptation Course Approved)',
    fastTrackEligible: true,
    availability: '30 Days',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    skills: ['Elderly Care', 'Rehabilitation Therapy', 'Wound Management', 'Dementia Care', 'Medication Administration'],
    bio: 'Patient-centric nurse specializing in rehabilitation and senior care facilities. High empathy, excellent stamina, and completed 400+ clinical hours in emergency and palliative wards.',
    rating: 4.8,
    salaryExpectation: '€3,000 - €3,600 / month',
    visaStatus: 'Defizitbescheid Adaptation Visa Ready',
    documentsReady: ['KMTC Nursing Diploma', 'B1 Certificate (Goethe)', 'Clinical Logbook', 'Clearance Certificate'],
    badge: 'Pre-Screened Talent'
  },
  {
    id: 'cand-hc-3',
    name: 'Maria Santos',
    title: 'Surgical Theatre & OR Nurse Specialist',
    sector: 'Healthcare',
    subSector: 'Surgical Services',
    location: 'Manila, Philippines',
    targetRelocation: 'Germany / UAE',
    experienceYears: 7,
    germanLevel: 'B2 Certified (Goethe-Zertifikat B2)',
    englishLevel: 'Native / Fluent',
    education: 'Bachelor of Science in Nursing - University of Santo Tomas',
    credentialsStatus: 'Full Equivalence Recognition Approved (Urkunde Vorbereitung)',
    fastTrackEligible: true,
    availability: 'Immediate (Fast-Track Visa)',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    skills: ['Operating Room (OR)', 'Sterile Protocols', 'Surgical Instrument Handling', 'Post-Op Recovery', 'Laparoscopic Surgery Prep'],
    bio: 'Experienced OR scrub nurse with over 1,500 successful surgical operations supported. Full German equivalence document secured with ElKairon legal support.',
    rating: 5.0,
    salaryExpectation: '€3,600 - €4,500 / month',
    visaStatus: 'Fast-Track § 18b Urkunde Ready',
    documentsReady: ['B2 Goethe Certificate', 'Philippine PRC Board License', 'Defizitbescheid Exemption', 'Apostilled Passport'],
    badge: 'Fast-Track Gold Candidate'
  },

  // Construction & Engineering Sector
  {
    id: 'cand-cs-1',
    name: 'Marko Petrovic',
    title: 'Certified Master Electrician & Industrial Automation Tech',
    sector: 'Construction',
    subSector: 'Electrical & Automation',
    location: 'Belgrade, Serbia',
    targetRelocation: 'Germany (Stuttgart / Munich / Frankfurt)',
    experienceYears: 8,
    germanLevel: 'B1 Conversational (Technical German Pro)',
    englishLevel: 'Intermediate',
    education: 'Electrical Engineering & Installation Meister Diploma',
    credentialsStatus: 'IHK FOSA Full Recognition Verified (Gleichwertigkeitsbescheid)',
    fastTrackEligible: true,
    availability: 'Immediate',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    skills: ['Industrial Switchboards', 'VDE 0100 Safety Standards', 'PLC Programming (Siemens S7)', 'Cable Routing & Diagnostics', 'Solar PV Installation'],
    bio: 'Skilled electrical technician certified to German DIN VDE standards. Extensive experience in commercial construction, smart grid installation, and building automation.',
    rating: 4.9,
    salaryExpectation: '€3,800 - €4,600 / month',
    visaStatus: '§ 18a Skilled Trades Fast-Track Ready',
    documentsReady: ['IHK FOSA Equivalence', 'Meister Craft Diploma', 'German VDE Safety Cert', 'Clean Driving License (Class B & BE)'],
    badge: 'IHK FOSA Recognized'
  },
  {
    id: 'cand-cs-2',
    name: 'Tariq Mansoor',
    title: 'HVAC & Renewable Heat Pump Installation Specialist',
    sector: 'Construction',
    subSector: 'HVAC & Plumbing (SHK)',
    location: 'Cairo, Egypt',
    targetRelocation: 'Germany (Cologne / Dusseldorf)',
    experienceYears: 5,
    germanLevel: 'A2 (B1 in progress)',
    englishLevel: 'Fluent',
    education: 'Vocational Technical Certificate in Sanitary & Climate Systems (SHK)',
    credentialsStatus: 'Equivalence assessment submitted to Handwerkskammer',
    fastTrackEligible: true,
    availability: '30 Days',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300',
    skills: ['Heat Pump Installation (Wärmepumpen)', 'Pipe Fitting & Brazing', 'Ventilation Systems', 'Refrigerant Handling (F-Gas Certified)', 'Sanitary Plumbing'],
    bio: 'Modern HVAC installer specializing in energy-efficient heat pump conversions and residential hydronic heating systems. Fast learner with strong mechanical problem-solving.',
    rating: 4.7,
    salaryExpectation: '€3,200 - €3,900 / month',
    visaStatus: 'Opportunity Card (Chancenkarte) / § 18a Candidate',
    documentsReady: ['Technical SHK Diploma', 'F-Gas Refrigerant Certificate', 'Proof of Practical Hours', 'German A2 Goethe Certificate'],
    badge: 'Pre-Screened Talent'
  },
  {
    id: 'cand-cs-3',
    name: 'Bogdan Ionescu',
    title: 'Structural Civil Engineer & BIM Site Manager',
    sector: 'Construction',
    subSector: 'Structural Engineering & BIM',
    location: 'Bucharest, Romania',
    targetRelocation: 'Germany / Netherlands',
    experienceYears: 9,
    germanLevel: 'B2 Professional',
    englishLevel: 'C1 Fluent',
    education: "Master's in Structural & Civil Engineering - Technical University of Civil Engineering Bucharest",
    credentialsStatus: 'EU Qualified Engineer (Immediate Work Permit without visa hurdles)',
    fastTrackEligible: true,
    availability: 'Immediate (2 Weeks Notice)',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
    skills: ['BIM (Revit / Navisworks)', 'Structural Concrete & Steel Design', 'Eurocode 2 & Eurocode 3', 'Site Safety Management', 'Subcontractor Supervision'],
    bio: 'Senior site engineer who has supervised over €60M in commercial and industrial construction projects. Deep understanding of Eurocodes, crane safety, and structural inspections.',
    rating: 5.0,
    salaryExpectation: '€4,800 - €6,200 / month',
    visaStatus: 'EU Citizen / Direct Placement',
    documentsReady: ['Master of Civil Engineering', 'EU Chamber of Engineers ID', 'B2 Goethe Certificate', 'BIM Level 2 Certification'],
    badge: 'Fast-Track Gold Candidate'
  },

  // Hospitality & Culinary Sector
  {
    id: 'cand-hosp-1',
    name: 'Chef Alessandro Morini',
    title: 'Executive Sous Chef / Fine Dining Specialist',
    sector: 'Hospitality',
    subSector: 'Culinary & Gastronomy',
    location: 'Naples, Italy',
    targetRelocation: 'Germany (Bavaria / Berlin / Baden-Württemberg)',
    experienceYears: 10,
    germanLevel: 'B1 Working German',
    englishLevel: 'Fluent',
    education: 'Culinary Arts Degree - ALMA International Culinary School',
    credentialsStatus: 'EU Recognized Master Chef (Köche-Urkunde)',
    fastTrackEligible: true,
    availability: 'Immediate',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=300',
    skills: ['Fine Dining Operations', 'Menu Engineering', 'HACCP Food Safety Leadership', 'Cost Control & Food Waste Reduction', 'Kitchen Brigade Leadership'],
    bio: 'Award-winning culinary professional with background in Michelin-recommended restaurants and 5-star alpine luxury resorts. Expert in modern European gastronomy and kitchen profitability.',
    rating: 4.9,
    salaryExpectation: '€3,600 - €4,800 / month',
    visaStatus: 'EU Direct Placement / Fast-Track',
    documentsReady: ['Culinary Degree', 'HACCP Advanced Manager Cert', 'Tasting Portfolio', 'Recommendation Letters'],
    badge: 'Fast-Track Gold Candidate'
  },
  {
    id: 'cand-hosp-2',
    name: 'Fatima Zahra Alami',
    title: '5-Star Hotel Front Office & Guest Relations Manager',
    sector: 'Hospitality',
    subSector: 'Hotel Operations & Front Office',
    location: 'Marrakech, Morocco',
    targetRelocation: 'Germany / UAE',
    experienceYears: 6,
    germanLevel: 'B2 Certified (Telc Deutsch B2)',
    englishLevel: 'C1 Fluent',
    education: 'Bachelor in International Hospitality & Tourism Management - ISIT Tangier',
    credentialsStatus: 'Verified by ZAB (Zentralstelle für ausländisches Bildungswesen)',
    fastTrackEligible: true,
    availability: 'Immediate (14-Day Fast Track)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    skills: ['Opera Cloud PMS', 'VIP Guest Relations', 'Multi-Language Concierge', 'Revenue Management Support', 'Staff Training & Upselling'],
    bio: 'Trilingual hospitality specialist (German, English, French, Arabic) with a stellar record at luxury boutique hotels in Morocco and Dubai. Flawless guest satisfaction ratings.',
    rating: 4.9,
    salaryExpectation: '€3,100 - €3,800 / month',
    visaStatus: '§ 18b Skilled Worker Visa Pre-Approval',
    documentsReady: ['ZAB Statement of Comparability', 'Telc B2 Certificate', 'Opera PMS Certificate', 'Police Background Check'],
    badge: 'Pre-Vetted & Language Tested'
  },

  // Tech & Engineering Sector
  {
    id: 'cand-tech-1',
    name: 'Arjun Nair',
    title: 'Senior Cloud DevOps & Kubernetes Infrastructure Engineer',
    sector: 'Technology',
    subSector: 'Cloud & Infrastructure',
    location: 'Bangalore, India',
    targetRelocation: 'Germany (Berlin / Munich)',
    experienceYears: 7,
    germanLevel: 'A1 (Self-Studying A2)',
    englishLevel: 'C2 Native/Fluent',
    education: 'B.Tech in Computer Science - NIT Calicut',
    credentialsStatus: 'Anabin H+ University Status Verified (Blue Card Ready)',
    fastTrackEligible: true,
    availability: 'Immediate (Blue Card Fast-Track: 2 Weeks)',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    skills: ['AWS / GCP Cloud Architecture', 'Kubernetes (CKA Certified)', 'Terraform Infrastructure-as-Code', 'CI/CD Pipelines (GitHub Actions / GitLab)', 'Python / Go'],
    bio: 'Enterprise DevOps architect with 7+ years managing distributed high-throughput infrastructure. Full EU Blue Card salary eligibility and Anabin H+ certified degree.',
    rating: 5.0,
    salaryExpectation: '€5,800 - €7,500 / month',
    visaStatus: 'EU Blue Card Fast-Track (§ 18g AufenthG)',
    documentsReady: ['Anabin H+ Verification Report', 'CKA Certification', 'Degree Certificate Apostilled', 'Pre-Drafted Employment Contract Format'],
    badge: 'Fast-Track Blue Card'
  }
];

export const INITIAL_COMPLIANCE_DOCUMENTS: ComplianceDocument[] = [
  {
    id: 'doc-1',
    title: 'Standard German Employment Contract (Bilingual DE/EN)',
    type: 'contract',
    category: 'Employment Contract',
    candidateName: 'Dr. Amina Benali',
    candidateId: 'cand-hc-1',
    jobTitle: 'Senior ICU Nurse Specialist',
    status: 'Verified by ElKairon Legal',
    uploadDate: '2026-08-01',
    fileSize: '420 KB',
    fileUrl: '#',
    description: 'Fully compliant with German TVöD healthcare salary scale, statutory probation, working time laws (ArbZG), and pension obligations.',
    isMandatoryForVisa: true
  },
  {
    id: 'doc-2',
    title: '§ 81a Fast-Track Skilled Worker Power of Attorney (Vollmacht)',
    type: 'work_permit',
    category: 'Immigration & Fast-Track',
    candidateName: 'Dr. Amina Benali',
    candidateId: 'cand-hc-1',
    jobTitle: 'Senior ICU Nurse Specialist',
    status: 'Approved by Ausländerbehörde',
    uploadDate: '2026-08-04',
    fileSize: '1.2 MB',
    fileUrl: '#',
    description: 'Official authorization letter allowing ElKairon Global Connect to act as employer agent for accelerated immigration procedure in Berlin.',
    isMandatoryForVisa: true
  },
  {
    id: 'doc-3',
    title: 'Professional Equivalence Defizitbescheid (Landesprüfungsamt)',
    type: 'certification',
    category: 'Licensure & Equivalence',
    candidateName: 'Dr. Amina Benali',
    candidateId: 'cand-hc-1',
    jobTitle: 'Senior ICU Nurse Specialist',
    status: 'Verified by ElKairon Legal',
    uploadDate: '2026-07-28',
    fileSize: '890 KB',
    fileUrl: '#',
    description: 'Definitive recognition certificate specifying the 120-hour adaptation module required for unconditional Approbation.',
    isMandatoryForVisa: true
  },
  {
    id: 'doc-4',
    title: 'Draft Master Electrician Employment Agreement',
    type: 'contract',
    category: 'Employment Contract',
    candidateName: 'Marko Petrovic',
    candidateId: 'cand-cs-1',
    jobTitle: 'Master Electrician',
    status: 'Pending Employer Signature',
    uploadDate: '2026-08-08',
    fileSize: '350 KB',
    fileUrl: '#',
    description: 'Drafted under German Construction Collective Bargaining tariff (Bundesrahmentarifvertrag Bau). Ready for digital signature.',
    isMandatoryForVisa: true
  },
  {
    id: 'doc-5',
    title: 'Federal Employment Agency Pre-Approval (Vorabzustimmung der BA)',
    type: 'visa_file',
    category: 'Work Authorization',
    candidateName: 'Fatima Zahra Alami',
    candidateId: 'cand-hosp-2',
    jobTitle: 'Front Office Manager',
    status: 'Approved by Ausländerbehörde',
    uploadDate: '2026-08-02',
    fileSize: '650 KB',
    fileUrl: '#',
    description: 'Official clearance from the Bundesagentur für Arbeit under § 39 AufenthG for direct visa issuance at German Consulate Casablanca.',
    isMandatoryForVisa: true
  }
];

export const INITIAL_EMPLOYER_MESSAGES: EmployerMessage[] = [
  {
    id: 'msg-1',
    candidateId: 'cand-hc-1',
    candidateName: 'Dr. Amina Benali',
    candidateAvatar: 'https://images.unsplash.com/photo-1594824813682-1e967a14ecb3?auto=format&fit=crop&q=80&w=300',
    subject: 'Interview Schedule Confirmation & B2 Certificate Dossier',
    lastMessage: 'Vielen Dank! I have reviewed the hospital shift schedule and I am ready for the technical video interview with the head of nursing this Thursday.',
    timestamp: 'Today at 10:45 AM',
    unread: true,
    messages: [
      {
        sender: 'employer',
        text: 'Hello Amina, we reviewed your Telc B2 Pflege credentials and ICU experience. We would like to schedule a 30-minute video interview with our clinical director.',
        time: 'Yesterday at 04:30 PM'
      },
      {
        sender: 'candidate',
        text: 'Vielen Dank! I have reviewed the hospital shift schedule and I am ready for the technical video interview with the head of nursing this Thursday at 14:00 CET.',
        time: 'Today at 10:45 AM'
      }
    ]
  },
  {
    id: 'msg-2',
    candidateId: 'cand-cs-1',
    candidateName: 'Marko Petrovic',
    candidateAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    subject: 'IHK FOSA Equivalency & Onboarding Relocation Package',
    lastMessage: 'Good afternoon, I have uploaded the signed IHK verification document. Looking forward to discussing the site allocation in Frankfurt.',
    timestamp: 'Yesterday at 03:15 PM',
    unread: false,
    messages: [
      {
        sender: 'employer',
        text: 'Hi Marko, our engineering team in Frankfurt was very impressed by your industrial switchboard background. Could you confirm your earliest start date?',
        time: '2 days ago'
      },
      {
        sender: 'candidate',
        text: 'Good afternoon, I have uploaded the signed IHK verification document. Looking forward to discussing the site allocation in Frankfurt. I can start within 14 days under the fast-track procedure!',
        time: 'Yesterday at 03:15 PM'
      }
    ]
  },
  {
    id: 'msg-3',
    candidateId: 'cand-tech-1',
    candidateName: 'Arjun Nair',
    candidateAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    subject: 'EU Blue Card § 18g Fast-Track Visa Submission',
    lastMessage: 'ElKairon immigration desk has confirmed the Vorabzustimmung file is uploaded to the portal.',
    timestamp: 'Aug 8, 2026',
    unread: false,
    messages: [
      {
        sender: 'candidate',
        text: 'Hello, I have accepted the digital contract offer and ElKairon immigration desk has confirmed the Vorabzustimmung file is uploaded to the portal.',
        time: 'Aug 8, 2026'
      }
    ]
  }
];

export const SECTOR_CRITERIA_PRESETS = {
  healthcare: {
    name: 'Healthcare & Nursing',
    icon: 'Stethoscope',
    color: 'teal',
    typicalRoles: ['ICU Registered Nurse', 'Geriatric Care Specialist', 'Surgical Scrub Nurse', 'Physiotherapist', 'Medical Technologist'],
    certifications: ['Telc Deutsch B2 Pflege', 'Goethe-Zertifikat B2', 'Defizitbescheid (Adaptation Approved)', 'Full Approbation Equivalence', 'BLS / ACLS Certification'],
    requirements: [
      'Verified Nursing Diploma (Min. 3 Years Vocational or B.Sc.)',
      'German Language Minimum B1/B2 (Telc/Goethe)',
      'Clean Police Clearance & Immunization Record',
      'Defizitbescheid or Full Recognition Equivalence'
    ],
    fastTrackTimeline: '14 to 21 Days to Visa Pre-Approval'
  },
  construction: {
    name: 'Construction & Engineering',
    icon: 'HardHat',
    color: 'amber',
    typicalRoles: ['Master Electrician (Meister)', 'HVAC / Heat Pump Technician (SHK)', 'Structural BIM Engineer', 'Heavy Equipment Operator', 'Site Safety Manager'],
    certifications: ['IHK FOSA Full Recognition', 'DIN VDE 0100 Safety Cert', 'Eurocode Structural Cert', 'F-Gas Refrigerant License', 'SCC / VCA Safety Passport'],
    requirements: [
      'Completed Trade Apprenticeship / Vocational Qualification',
      'FOSA / HWK Equivalency Verification',
      'Technical German (A2 to B1 Recommended)',
      'EU Class B / C Driving License (Preferred)'
    ],
    fastTrackTimeline: '10 to 18 Days via IHK Fast-Track'
  },
  hospitality: {
    name: 'Hospitality & Gastronomy',
    icon: 'Utensils',
    color: 'emerald',
    typicalRoles: ['Executive Sous Chef', 'Hotel Front Office Manager', 'F&B Operations Supervisor', 'Head Sommelier', 'Pastry Chef (Pâtissier)'],
    certifications: ['HACCP Advanced Hygiene Manager', 'ZAB Degree Equivalence', 'Opera Cloud PMS Certification', 'Goethe German B2', 'WSET Level 2/3'],
    requirements: [
      'Min 3 Years in 4-Star / 5-Star or High-Volume Gastronomy',
      'Multilingual Proficiency (German B1/B2 + English)',
      'HACCP Health & Food Safety Certification',
      'Proven Hospitality Reference Portfolio'
    ],
    fastTrackTimeline: '14 Days Expedited Processing'
  },
  technology: {
    name: 'Technology & Cloud',
    icon: 'Cpu',
    color: 'blue',
    typicalRoles: ['Senior Cloud DevOps Engineer', 'Full Stack TypeScript Engineer', 'Cybersecurity SOC Lead', 'Data Engineer / ML', 'Solutions Architect'],
    certifications: ['Anabin H+ Degree Equivalence', 'AWS / Azure Solutions Architect', 'CKA Kubernetes Administrator', 'CISSP / Security+'],
    requirements: [
      'Degree in Computer Science / IT from Anabin H+ Recognized University',
      'Salary meets EU Blue Card (§18g) statutory threshold (€43,800+ or €41,041 for shortage occupations)',
      'Fluent English (C1/C2); German A1/A2 advantageous'
    ],
    fastTrackTimeline: '7 to 14 Days Direct Blue Card Pre-Approval'
  }
};
