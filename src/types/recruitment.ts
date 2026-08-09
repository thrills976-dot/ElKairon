export type CareerLevel = 
  | 'Entry Level'
  | 'Junior'
  | 'Mid-Level'
  | 'Senior'
  | 'Manager'
  | 'Director'
  | 'Executive';

export type WorkAuthorizationStatus = 
  | 'Citizen'
  | 'Permanent Resident'
  | 'Valid Work Permit'
  | 'Requires Visa Sponsorship'
  | 'Student / Graduate Visa';

export type RelocationPreference = 
  | 'Yes, Anywhere'
  | 'Yes, UAE & Middle East'
  | 'Yes, Europe & UK'
  | 'Yes, North America'
  | 'Remote Only'
  | 'No Relocation';

export type PassportStatus = 
  | 'Valid Passport Available (Ready to Travel)'
  | 'Passport in Renewal / Processing'
  | 'No Passport Currently';

export type DegreeLevel = 
  | 'High School Diploma'
  | 'Vocational / Technical Diploma'
  | "Associate's Degree"
  | "Bachelor's Degree"
  | "Master's Degree"
  | 'Doctorate / PhD'
  | 'Professional License / Certification';

export type WorkStyle = 'On-site' | 'Hybrid' | 'Remote' | 'Flexible / Any';

export type EmploymentType = 
  | 'Permanent'
  | 'Contract'
  | 'Internship'
  | 'Graduate Programme'
  | 'Freelance'
  | 'Temporary';

export type AvailabilityStatus = 
  | 'Immediately'
  | 'Two Weeks'
  | 'One Month'
  | 'Three Months';

export type LanguageProficiency = 'Beginner' | 'Intermediate' | 'Professional' | 'Native';

export interface LanguageEntry {
  language: string;
  proficiency: LanguageProficiency;
}

export interface EducationEntry {
  highestQualification: string;
  institution: string;
  graduationYear: string;
  fieldOfStudy: string;
  gpa?: string;
}

export interface SalaryExpectations {
  minSalary: number;
  maxSalary: number;
  currency: string;
  period?: 'Monthly' | 'Annual';
}

export interface DocumentUploads {
  cvUrl?: string;
  cvName?: string;
  coverLetterUrl?: string;
  coverLetterName?: string;
  certificatesUrl?: string;
  certificatesName?: string;
  portfolioUrl?: string;
  portfolioName?: string;
}

export interface AISkillsAssessment {
  categoryRatings: Record<string, number>; // e.g. { "Python": 4, "React": 5, "Cisco": 5, "SIEM": 3 }
  testedSkillsScore?: number;
  verifiedBadges?: string[];
}

export interface AIPersonalityWorkStyle {
  leadTeams: number; // 1-5
  workIndependently: number;
  complexProblemSolving: number;
  customerInteraction: number;
  learnQuickly: number;
  adaptToChange: number;
  workUnderPressure: number;
  archetype?: string;
  strengthsDescription?: string;
}

export interface AICareerGoals {
  dreamJob: string;
  desiredCareerPath: string;
  industriesOfInterest: string[];
  targetCompanies: string[];
  longTermGoals: string;
}

export interface AIMatchingPreferences {
  salaryImportance: number; // 0 - 100
  remoteWork: number;
  careerGrowth: number;
  workLifeBalance: number;
  companyCulture: number;
  learningOpportunities: number;
  jobSecurity: number;
  travelOpportunities: number;
}

export interface AIRecruitmentScore {
  profileCompletion: number; // e.g. 82%
  aiMatchReadiness: number; // e.g. 92%
  resumeQuality: number; // e.g. 88%
  skillsConfidence: number; // e.g. 91%
  recruiterVisibility: 'Excellent' | 'Very High' | 'High' | 'Good' | 'Fair';
}

export interface CandidateProfile {
  // Step 1: Create Account Essentials
  id?: string;
  role: 'candidate';
  name: string;
  email: string;
  phone?: string;
  country?: string;

  // Step 2: Personal Information
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Non-Binary' | 'Prefer not to say';
  nationality?: string;
  countryOfResidence?: string;
  city?: string;
  workAuthorization?: WorkAuthorizationStatus;
  willingToRelocate?: RelocationPreference;
  passportAvailable?: PassportStatus;

  // Career Information
  currentJobTitle?: string;
  currentCompany?: string;
  industry?: string;
  department?: string;
  careerLevel?: CareerLevel;
  totalYearsOfExperience?: string;
  yearsOfExperience?: string;

  // Education
  education?: EducationEntry;
  highestDegree?: DegreeLevel;
  institution?: string;
  graduationYear?: string;
  fieldOfStudy?: string;
  gpa?: string;

  // Skills & Synonyms
  skills: string[];
  skillChips?: string[];
  certifications: string[];
  languages: LanguageEntry[];

  // Preferences
  preferredJobs: string[];
  preferredIndustries: string[];
  preferredWorkStyle?: WorkStyle;
  employmentType?: EmploymentType[];
  salaryExpectations?: SalaryExpectations;
  availability?: AvailabilityStatus;
  preferredLocations: string[];

  // Documents
  documents?: DocumentUploads;
  cvUrl?: string;
  cvName?: string;
  coverLetterUrl?: string;

  // AI Modules
  skillsAssessment?: AISkillsAssessment;
  personalityStyle?: AIPersonalityWorkStyle;
  careerGoals?: AICareerGoals;
  matchingPreferences?: AIMatchingPreferences;
  aiRecruitmentScore?: AIRecruitmentScore;

  // Metadata
  profileStep?: number;
  profileCompleted?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface EmployerProfile {
  id?: string;
  role: 'employer';
  name: string;
  email: string;
  company: string;
  industry: string;
  size: string;
  phone?: string;
  country?: string;
  website?: string;
  description?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface JobItem {
  id: string;
  employerId?: string;
  title: string;
  company?: string;
  location: string;
  countries?: string[];
  industry: string;
  salary: string;
  minSalaryNum?: number;
  maxSalaryNum?: number;
  currency?: string;
  type: string;
  experience: string;
  skills: string[];
  description: string;
  visaSponsorship?: boolean;
  workStyle?: WorkStyle;
  featured?: boolean;
  status?: 'active' | 'closed';
  hiringUrgency?: 'High' | 'Normal' | 'Immediate';
  createdAt?: any;
  updatedAt?: any;
}

export interface MatchedJobResult extends JobItem {
  matchPercentage: number;
  matchScoreBreakdown: {
    skillsMatch: number;
    experienceMatch: number;
    locationMatch: number;
    salaryMatch: number;
    cultureMatch: number;
  };
  matchedSkills: string[];
  missingSkills: string[];
  aiReasoning: string;
}

export interface JobApplication {
  id?: string;
  candidateId: string;
  jobId: string;
  employerId?: string;
  jobTitle?: string;
  companyName?: string;
  location?: string;
  salary?: string;
  status: 'pending' | 'reviewed' | 'interview' | 'accepted' | 'rejected';
  stage?: 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Final Offer';
  matchScore?: number;
  appliedAt?: string;
  interviewDate?: string;
  notes?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface RecruiterProfileView {
  id: string;
  recruiterName: string;
  company: string;
  companyLogo?: string;
  viewedAt: string;
  location: string;
  interestScore: number;
}

export interface RecommendedCourse {
  id: string;
  title: string;
  provider: string;
  skillAddressed: string;
  potentialMatchBoost: number; // e.g. +8% match
  duration: string;
  level: string;
  enrolled?: boolean;
}
