import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Briefcase, Globe, FileText, Upload, Sparkles, Star, 
  CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Cpu, 
  Compass, Award, Sliders, Zap, Check, AlertCircle, ChevronRight,
  TrendingUp, HelpCircle
} from 'lucide-react';
import toast from 'react-hot-toast';
import { 
  CandidateProfile, CareerLevel, WorkAuthorizationStatus, 
  RelocationPreference, PassportStatus, DegreeLevel, WorkStyle, 
  EmploymentType, AvailabilityStatus, LanguageProficiency 
} from '../../types/recruitment';
import { 
  POPULAR_SKILLS, POPULAR_CERTIFICATIONS, POPULAR_JOB_TITLES, 
  POPULAR_INDUSTRIES, TARGET_COUNTRIES 
} from '../../data/mockRecruitmentData';
import { 
  calculateAgeFromDob, computeRecruitmentScores, computePersonalityArchetype 
} from '../../lib/aiRecruitmentEngine';

interface CandidateRegistrationProps {
  initialProfile?: Partial<CandidateProfile> | null;
  onComplete?: (profile: CandidateProfile) => void;
  onSubmit?: (profile: CandidateProfile) => Promise<void> | void;
  onCancel?: () => void;
  onBack?: () => void;
}

export function CandidateRegistration({ 
  initialProfile, 
  onComplete, 
  onSubmit, 
  onCancel, 
  onBack 
}: CandidateRegistrationProps) {
  const handleFinish = (finalProfile: CandidateProfile) => {
    if (onSubmit) onSubmit(finalProfile);
    if (onComplete) onComplete(finalProfile);
  };
  const handleGoBack = () => {
    if (onBack) onBack();
    else if (onCancel) onCancel();
  };
  // Main Step: 1 = Create Account, 2 = Profile Builder, 3 = AI Skills Assessment, 4 = Personality & Work Style, 5 = Career Goals, 6 = Matching Preferences, 7 = Score Reveal
  const [currentStep, setCurrentStep] = useState<number>(initialProfile?.email ? 2 : 1);
  const [subSection, setSubSection] = useState<number>(1); // Sub-sections within Step 2 (1 to 8)

  // Step 1: Create Account Form
  const [accountForm, setAccountForm] = useState({
    fullName: initialProfile?.name || '',
    email: initialProfile?.email || '',
    password: '',
    confirmPassword: '',
    country: initialProfile?.country || 'Zimbabwe',
    phone: initialProfile?.phone || '+263 77 '
  });

  // Step 2: Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    avatarUrl: initialProfile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    firstName: initialProfile?.firstName || (initialProfile?.name ? initialProfile.name.split(' ')[0] : 'Blessing'),
    lastName: initialProfile?.lastName || (initialProfile?.name ? initialProfile.name.split(' ').slice(1).join(' ') : 'Mukamuri'),
    dob: initialProfile?.dob || '1996-05-14',
    gender: initialProfile?.gender || ('Female' as const),
    nationality: initialProfile?.nationality || 'Zimbabwean',
    countryOfResidence: initialProfile?.countryOfResidence || 'Zimbabwe',
    city: initialProfile?.city || 'Harare',
    workAuthorization: (initialProfile?.workAuthorization || 'Requires Visa Sponsorship') as WorkAuthorizationStatus,
    willingToRelocate: (initialProfile?.willingToRelocate || 'Yes, Europe & UK') as RelocationPreference,
    passportAvailable: (initialProfile?.passportAvailable || 'Valid Passport Available (Ready to Travel)') as PassportStatus
  });

  // Auto-calculated age
  const calculatedAge = useMemo(() => {
    return calculateAgeFromDob(personalInfo.dob) || 29;
  }, [personalInfo.dob]);

  // Step 2: Career Information
  const [careerInfo, setCareerInfo] = useState({
    currentJobTitle: initialProfile?.currentJobTitle || 'Senior Cloud Systems & Network Engineer',
    currentCompany: initialProfile?.currentCompany || 'AfriTelecom Solutions',
    industry: initialProfile?.industry || 'Technology',
    department: initialProfile?.department || 'Cloud Infrastructure & SRE',
    careerLevel: (initialProfile?.careerLevel || 'Senior') as CareerLevel,
    totalYearsOfExperience: initialProfile?.totalYearsOfExperience || '5+ years'
  });

  // Step 2: Education
  const [educationInfo, setEducationInfo] = useState({
    highestDegree: (initialProfile?.highestDegree || "Bachelor's Degree") as DegreeLevel,
    institution: initialProfile?.institution || 'University of Zimbabwe',
    graduationYear: initialProfile?.graduationYear || '2019',
    fieldOfStudy: initialProfile?.fieldOfStudy || 'Computer Science & Software Engineering',
    gpa: initialProfile?.gpa || '3.8 / 4.0'
  });

  // Step 2: Skills & Synonyms
  const [skillsList, setSkillsList] = useState<string[]>(
    initialProfile?.skills && initialProfile.skills.length > 0
      ? initialProfile.skills
      : ['Python', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Cisco CCNA', 'Networking', 'Routing & Switching', 'Linux']
  );
  const [skillSearch, setSkillSearch] = useState('');
  const [synonymSuggestions, setSynonymSuggestions] = useState<string[]>([]);
  const [loadingSynonyms, setLoadingSynonyms] = useState(false);

  // Step 2: Certifications
  const [certificationsList, setCertificationsList] = useState<string[]>(
    initialProfile?.certifications && initialProfile.certifications.length > 0
      ? initialProfile.certifications
      : ['Microsoft Azure Administrator (AZ-104)', 'Cisco CCNA (200-301)', 'AWS Solutions Architect Associate']
  );
  const [newCertInput, setNewCertInput] = useState('');

  // Step 2: Languages
  const [languagesList, setLanguagesList] = useState<{ language: string; proficiency: LanguageProficiency }[]>(
    initialProfile?.languages && initialProfile.languages.length > 0
      ? initialProfile.languages
      : [
          { language: 'English', proficiency: 'Native' },
          { language: 'German', proficiency: 'Intermediate' },
          { language: 'Shona', proficiency: 'Native' }
        ]
  );

  // Step 2: Preferences
  const [preferredJobs, setPreferredJobs] = useState<string[]>(
    initialProfile?.preferredJobs && initialProfile.preferredJobs.length > 0
      ? initialProfile.preferredJobs
      : ['Cloud Engineer', 'DevOps Engineer', 'Network Engineer', 'Backend Developer']
  );
  const [preferredIndustries, setPreferredIndustries] = useState<string[]>(
    initialProfile?.preferredIndustries && initialProfile.preferredIndustries.length > 0
      ? initialProfile.preferredIndustries
      : ['Technology', 'Banking & FinTech', 'Telecommunications']
  );
  const [preferredWorkStyle, setPreferredWorkStyle] = useState<WorkStyle>(
    initialProfile?.preferredWorkStyle || 'Hybrid'
  );
  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>(
    initialProfile?.employmentType && initialProfile.employmentType.length > 0
      ? initialProfile.employmentType
      : ['Permanent', 'Contract']
  );
  const [salaryExpectations, setSalaryExpectations] = useState({
    minSalary: initialProfile?.salaryExpectations?.minSalary || 5500,
    maxSalary: initialProfile?.salaryExpectations?.maxSalary || 8500,
    currency: initialProfile?.salaryExpectations?.currency || 'EUR'
  });
  const [availability, setAvailability] = useState<AvailabilityStatus>(
    initialProfile?.availability || 'One Month'
  );
  const [preferredLocations, setPreferredLocations] = useState<string[]>(
    initialProfile?.preferredLocations && initialProfile.preferredLocations.length > 0
      ? initialProfile.preferredLocations
      : ['Germany', 'Netherlands', 'United Kingdom', 'UAE', 'Canada']
  );

  // Step 2: Resume / Documents
  const [uploadedResume, setUploadedResume] = useState<{ cvName: string; coverLetterName: string }>({
    cvName: initialProfile?.documents?.cvName || 'Blessing_Mukamuri_Cloud_CV.pdf',
    coverLetterName: initialProfile?.documents?.coverLetterName || 'Blessing_CoverLetter_Europe.pdf'
  });

  // Step 3: AI Skills Assessment (1-5 Stars)
  const [skillsAssessment, setSkillsAssessment] = useState<Record<string, number>>({
    'Python': 4,
    'Java': 3,
    'React': 4,
    'Cisco CCNA': 5,
    'Mikrotik': 4,
    'Fortinet': 3,
    'SIEM': 4,
    'Splunk': 4,
    'Wireshark': 5,
    'AWS / Cloud': 5,
    'Docker & K8s': 4
  });

  // Step 4: AI Personality & Work Style (1-5 Likert scale)
  const [personalityRatings, setPersonalityRatings] = useState({
    leadTeams: 4,
    workIndependently: 5,
    complexProblemSolving: 5,
    customerInteraction: 4,
    learnQuickly: 5,
    adaptToChange: 5,
    workUnderPressure: 4
  });

  // Step 5: AI Career Goals
  const [careerGoals, setCareerGoals] = useState({
    dreamJob: initialProfile?.careerGoals?.dreamJob || 'Principal Enterprise Cloud Architect & Relocation Lead',
    desiredCareerPath: initialProfile?.careerGoals?.desiredCareerPath || 'Cloud Architecture -> VP of Global Infrastructure',
    industriesOfInterest: initialProfile?.careerGoals?.industriesOfInterest || ['Technology', 'FinTech', 'Renewable Energy'],
    targetCompanies: initialProfile?.careerGoals?.targetCompanies || ['NextGen Cloud Systems', 'FinApex', 'Booking.com', 'SAP'],
    longTermGoals: initialProfile?.careerGoals?.longTermGoals || 'Lead multi-region European cloud infrastructure deployments and mentor emerging African engineers.'
  });

  // Step 6: AI Matching Preferences (Sliders 0-100%)
  const [matchingPreferences, setMatchingPreferences] = useState({
    salaryImportance: 90,
    remoteWork: 80,
    careerGrowth: 95,
    workLifeBalance: 75,
    companyCulture: 85,
    learningOpportunities: 95,
    jobSecurity: 85,
    travelOpportunities: 50
  });

  // Check synonym endpoint when skill search changes
  const checkSynonyms = async (query: string) => {
    if (!query || query.length < 3) {
      setSynonymSuggestions([]);
      return;
    }
    setLoadingSynonyms(true);
    try {
      const res = await fetch('/api/ai/skill-synonyms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill: query })
      });
      if (res.ok) {
        const data = await res.json();
        setSynonymSuggestions(data.synonyms || []);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoadingSynonyms(false);
    }
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !skillsList.includes(skill)) {
      setSkillsList([...skillsList, skill]);
      setSkillSearch('');
      setSynonymSuggestions([]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  const handleAddCert = (cert: string) => {
    if (cert && !certificationsList.includes(cert)) {
      setCertificationsList([...certificationsList, cert]);
      setNewCertInput('');
    }
  };

  const handleToggleJob = (jobTitle: string) => {
    if (preferredJobs.includes(jobTitle)) {
      setPreferredJobs(preferredJobs.filter(j => j !== jobTitle));
    } else {
      setPreferredJobs([...preferredJobs, jobTitle]);
    }
  };

  const handleToggleIndustry = (ind: string) => {
    if (preferredIndustries.includes(ind)) {
      setPreferredIndustries(preferredIndustries.filter(i => i !== ind));
    } else {
      setPreferredIndustries([...preferredIndustries, ind]);
    }
  };

  const handleToggleLocation = (loc: string) => {
    if (preferredLocations.includes(loc)) {
      setPreferredLocations(preferredLocations.filter(l => l !== loc));
    } else {
      setPreferredLocations([...preferredLocations, loc]);
    }
  };

  // Compile final profile
  const assembleFullProfile = (): CandidateProfile => {
    const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || accountForm.fullName || 'Candidate';
    const computedScore = computeRecruitmentScores({
      name: fullName,
      email: accountForm.email,
      phone: accountForm.phone,
      dob: personalInfo.dob,
      age: calculatedAge,
      countryOfResidence: personalInfo.countryOfResidence,
      workAuthorization: personalInfo.workAuthorization,
      willingToRelocate: personalInfo.willingToRelocate,
      passportAvailable: personalInfo.passportAvailable,
      currentJobTitle: careerInfo.currentJobTitle,
      industry: careerInfo.industry,
      careerLevel: careerInfo.careerLevel,
      totalYearsOfExperience: careerInfo.totalYearsOfExperience,
      highestDegree: educationInfo.highestDegree,
      institution: educationInfo.institution,
      skills: skillsList,
      certifications: certificationsList,
      languages: languagesList,
      preferredLocations,
      cvName: uploadedResume.cvName,
      skillsAssessment: { categoryRatings: skillsAssessment }
    });

    const { archetype } = computePersonalityArchetype(personalityRatings);

    return {
      role: 'candidate',
      name: fullName,
      email: accountForm.email || 'candidate@talent.elkairon.com',
      phone: accountForm.phone,
      country: accountForm.country,
      avatarUrl: personalInfo.avatarUrl,
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      dob: personalInfo.dob,
      age: calculatedAge,
      gender: personalInfo.gender,
      nationality: personalInfo.nationality,
      countryOfResidence: personalInfo.countryOfResidence,
      city: personalInfo.city,
      workAuthorization: personalInfo.workAuthorization,
      willingToRelocate: personalInfo.willingToRelocate,
      passportAvailable: personalInfo.passportAvailable,

      currentJobTitle: careerInfo.currentJobTitle,
      currentCompany: careerInfo.currentCompany,
      industry: careerInfo.industry,
      department: careerInfo.department,
      careerLevel: careerInfo.careerLevel,
      totalYearsOfExperience: careerInfo.totalYearsOfExperience,
      yearsOfExperience: careerInfo.totalYearsOfExperience,

      highestDegree: educationInfo.highestDegree,
      institution: educationInfo.institution,
      graduationYear: educationInfo.graduationYear,
      fieldOfStudy: educationInfo.fieldOfStudy,
      gpa: educationInfo.gpa,

      skills: skillsList,
      certifications: certificationsList,
      languages: languagesList,

      preferredJobs,
      preferredIndustries,
      preferredWorkStyle,
      employmentType: employmentTypes,
      salaryExpectations: {
        minSalary: salaryExpectations.minSalary,
        maxSalary: salaryExpectations.maxSalary,
        currency: salaryExpectations.currency,
        period: 'Monthly'
      },
      availability,
      preferredLocations,

      documents: uploadedResume,
      cvName: uploadedResume.cvName,
      coverLetterUrl: uploadedResume.coverLetterName,

      skillsAssessment: {
        categoryRatings: skillsAssessment
      },

      personalityStyle: {
        ...personalityRatings,
        archetype
      },

      careerGoals,
      matchingPreferences,
      aiRecruitmentScore: computedScore,
      profileCompleted: true,
      profileStep: 7
    };
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!accountForm.fullName || !accountForm.email) {
        toast.error('Please enter your full name and email address');
        return;
      }
      toast.success('Account created! Now complete your professional profile.');
      setCurrentStep(2);
      setSubSection(1);
    } else if (currentStep === 2) {
      if (subSection < 8) {
        setSubSection(subSection + 1);
      } else {
        toast.success('Profile saved! Moving to AI Skills Assessment.');
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      toast.success('Skills assessed! Moving to AI Personality & Work Style.');
      setCurrentStep(4);
    } else if (currentStep === 4) {
      toast.success('Work style recorded! Setting AI Career Goals.');
      setCurrentStep(5);
    } else if (currentStep === 5) {
      toast.success('Career goals saved! Calibrating matching preferences.');
      setCurrentStep(6);
    } else if (currentStep === 6) {
      toast.success('Calibrating AI Recruitment Score...');
      setCurrentStep(7);
    } else if (currentStep === 7) {
      const fullProfile = assembleFullProfile();
      handleFinish(fullProfile);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 2) {
      if (subSection > 1) {
        setSubSection(subSection - 1);
      } else {
        setCurrentStep(1);
      }
    } else if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Compute live scores for Step 7 display
  const liveScores = useMemo(() => {
    return computeRecruitmentScores({
      name: `${personalInfo.firstName} ${personalInfo.lastName}`,
      email: accountForm.email,
      phone: accountForm.phone,
      dob: personalInfo.dob,
      age: calculatedAge,
      countryOfResidence: personalInfo.countryOfResidence,
      workAuthorization: personalInfo.workAuthorization,
      willingToRelocate: personalInfo.willingToRelocate,
      passportAvailable: personalInfo.passportAvailable,
      currentJobTitle: careerInfo.currentJobTitle,
      industry: careerInfo.industry,
      careerLevel: careerInfo.careerLevel,
      totalYearsOfExperience: careerInfo.totalYearsOfExperience,
      highestDegree: educationInfo.highestDegree,
      institution: educationInfo.institution,
      skills: skillsList,
      certifications: certificationsList,
      languages: languagesList,
      preferredLocations,
      cvName: uploadedResume.cvName,
      skillsAssessment: { categoryRatings: skillsAssessment }
    });
  }, [personalInfo, accountForm, calculatedAge, careerInfo, educationInfo, skillsList, certificationsList, languagesList, preferredLocations, uploadedResume, skillsAssessment]);

  return (
    <div id="ai-registration-flow" className="w-full max-w-5xl mx-auto py-6 px-4">
      {/* Top Breadcrumb / Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          <span>AI Onboarding & Matching Setup</span>
          <span>Step {currentStep} of 7: {
            currentStep === 1 ? 'Create Account' :
            currentStep === 2 ? `Profile (${subSection}/8)` :
            currentStep === 3 ? 'AI Skills Assessment' :
            currentStep === 4 ? 'AI Personality & Style' :
            currentStep === 5 ? 'AI Career Goals' :
            currentStep === 6 ? 'Matching Priorities' : 'AI Recruitment Score'
          }</span>
        </div>
        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex">
          {[1, 2, 3, 4, 5, 6, 7].map((s) => {
            const isCompleted = currentStep > s;
            const isCurrent = currentStep === s;
            return (
              <div 
                key={s} 
                className={`h-full flex-1 border-r border-white/40 transition-all duration-300 ${
                  isCompleted ? 'bg-teal-600' : isCurrent ? 'bg-gold-500' : 'bg-gray-200'
                }`} 
              />
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* STEP 1: CREATE ACCOUNT */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
            <div className="max-w-xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4 text-teal-600" />
                Step 1: Create Account
              </div>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                Join ElKairon AI Talent Network
              </h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Provide your core credentials to start. Our AI will immediately begin building your cross-border career matching matrix.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={accountForm.fullName}
                    onChange={e => setAccountForm({ ...accountForm, fullName: e.target.value })}
                    placeholder="e.g. Blessing Mukamuri"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={accountForm.email}
                    onChange={e => setAccountForm({ ...accountForm, email: e.target.value })}
                    placeholder="e.g. blessing@talent.elkairon.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={accountForm.password}
                      onChange={e => setAccountForm({ ...accountForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="password"
                      value={accountForm.confirmPassword}
                      onChange={e => setAccountForm({ ...accountForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-gray-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                      Country <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={accountForm.country}
                      onChange={e => setAccountForm({ ...accountForm, country: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-gray-900 bg-white"
                    >
                      <option value="Zimbabwe">Zimbabwe</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Botswana">Botswana</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Other">Other Global</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={accountForm.phone}
                      onChange={e => setAccountForm({ ...accountForm, phone: e.target.value })}
                      placeholder="+263 77 123 4567"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-gray-900"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  id="create-account-btn"
                  onClick={handleNextStep}
                  className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Sign Up & Build Profile</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-gray-500">
                  <span>🔒 256-bit encrypted data protection</span>
                  <button 
                    type="button"
                    onClick={() => {
                      setAccountForm({
                        fullName: 'Blessing Mukamuri',
                        email: 'blessing@talent.elkairon.com',
                        password: 'password123',
                        confirmPassword: 'password123',
                        country: 'Zimbabwe',
                        phone: '+263 77 123 4567'
                      });
                      toast.success('Preloaded with high-qualification candidate sample');
                    }}
                    className="text-teal-600 hover:underline font-semibold"
                  >
                    Auto-fill Sample Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: COMPLETE YOUR PROFESSIONAL PROFILE */}
        {currentStep === 2 && (
          <div className="p-6 md:p-10">
            {/* Step 2 Sub-Nav tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-gray-100 no-scrollbar">
              {[
                { id: 1, label: '1. Personal' },
                { id: 2, label: '2. Career' },
                { id: 3, label: '3. Education' },
                { id: 4, label: '4. Skills' },
                { id: 5, label: '5. Certifications' },
                { id: 6, label: '6. Languages' },
                { id: 7, label: '7. Preferences' },
                { id: 8, label: '8. Resume' },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSubSection(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    subSection === tab.id
                      ? 'bg-navy-900 text-white shadow-md'
                      : subSection > tab.id
                      ? 'bg-teal-50 text-teal-800'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* 2.1 Personal Information */}
              {subSection === 1 && (
                <motion.div key="sub-1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-display font-bold text-navy-900">Personal Information</h3>
                    <p className="text-sm text-gray-500">Provide legal identification and relocation feasibility details.</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-gray-50 rounded-2xl">
                    <img
                      src={personalInfo.avatarUrl}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full object-cover border-2 border-teal-600 shadow-md"
                    />
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-sm font-bold text-navy-900 mb-1">Profile Photo</p>
                      <p className="text-xs text-gray-500 mb-3">AI uses verified photos to confirm candidate presence during virtual recruiter screenings.</p>
                      <div className="flex gap-2 justify-center md:justify-start">
                        <button
                          type="button"
                          onClick={() => {
                            setPersonalInfo({
                              ...personalInfo,
                              avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80'
                            });
                          }}
                          className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-teal-600"
                        >
                          Photo 1 (Male)
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPersonalInfo({
                              ...personalInfo,
                              avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
                            });
                          }}
                          className="px-3 py-1.5 text-xs font-semibold bg-white border border-gray-200 rounded-lg hover:border-teal-600"
                        >
                          Photo 2 (Female)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">First Name</label>
                      <input
                        type="text"
                        value={personalInfo.firstName}
                        onChange={e => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        value={personalInfo.lastName}
                        onChange={e => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Date of Birth</label>
                      <input
                        type="date"
                        value={personalInfo.dob}
                        onChange={e => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                        Age (Auto-Calculated)
                      </label>
                      <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-bold flex items-center justify-between">
                        <span>{calculatedAge} Years Old</span>
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Gender</label>
                      <select
                        value={personalInfo.gender}
                        onChange={e => setPersonalInfo({ ...personalInfo, gender: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900 bg-white"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Nationality</label>
                      <input
                        type="text"
                        value={personalInfo.nationality}
                        onChange={e => setPersonalInfo({ ...personalInfo, nationality: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Country of Residence</label>
                      <input
                        type="text"
                        value={personalInfo.countryOfResidence}
                        onChange={e => setPersonalInfo({ ...personalInfo, countryOfResidence: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">City</label>
                      <input
                        type="text"
                        value={personalInfo.city}
                        onChange={e => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Work Authorization</label>
                      <select
                        value={personalInfo.workAuthorization}
                        onChange={e => setPersonalInfo({ ...personalInfo, workAuthorization: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900 bg-white"
                      >
                        <option value="Requires Visa Sponsorship">Requires Visa Sponsorship</option>
                        <option value="Valid Work Permit">Valid Work Permit</option>
                        <option value="Permanent Resident">Permanent Resident</option>
                        <option value="Citizen">Citizen</option>
                        <option value="Student / Graduate Visa">Student / Graduate Visa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Willing to Relocate</label>
                      <select
                        value={personalInfo.willingToRelocate}
                        onChange={e => setPersonalInfo({ ...personalInfo, willingToRelocate: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900 bg-white"
                      >
                        <option value="Yes, Anywhere">Yes, Anywhere Globally</option>
                        <option value="Yes, Europe & UK">Yes, Europe & UK</option>
                        <option value="Yes, UAE & Middle East">Yes, UAE & Middle East</option>
                        <option value="Yes, North America">Yes, North America</option>
                        <option value="Remote Only">Remote Only</option>
                        <option value="No Relocation">No Relocation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Passport Available</label>
                      <select
                        value={personalInfo.passportAvailable}
                        onChange={e => setPersonalInfo({ ...personalInfo, passportAvailable: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900 bg-white"
                      >
                        <option value="Valid Passport Available (Ready to Travel)">Valid Passport (Ready)</option>
                        <option value="Passport in Renewal / Processing">In Renewal / Processing</option>
                        <option value="No Passport Currently">No Passport Currently</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2.2 Career Information */}
              {subSection === 2 && (
                <motion.div key="sub-2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-display font-bold text-navy-900">Career Information</h3>
                    <p className="text-sm text-gray-500">Your current role seniority and domain trajectory.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Current Job Title</label>
                      <input
                        type="text"
                        value={careerInfo.currentJobTitle}
                        onChange={e => setCareerInfo({ ...careerInfo, currentJobTitle: e.target.value })}
                        placeholder="e.g. Senior Cloud Systems Engineer"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Current Company</label>
                      <input
                        type="text"
                        value={careerInfo.currentCompany}
                        onChange={e => setCareerInfo({ ...careerInfo, currentCompany: e.target.value })}
                        placeholder="e.g. AfriTelecom Solutions"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Industry</label>
                      <select
                        value={careerInfo.industry}
                        onChange={e => setCareerInfo({ ...careerInfo, industry: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900 bg-white"
                      >
                        {POPULAR_INDUSTRIES.map(ind => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Department</label>
                      <input
                        type="text"
                        value={careerInfo.department}
                        onChange={e => setCareerInfo({ ...careerInfo, department: e.target.value })}
                        placeholder="e.g. Cloud & Network Engineering"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Career Level</label>
                      <select
                        value={careerInfo.careerLevel}
                        onChange={e => setCareerInfo({ ...careerInfo, careerLevel: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900 bg-white"
                      >
                        <option value="Entry Level">Entry Level</option>
                        <option value="Junior">Junior</option>
                        <option value="Mid-Level">Mid-Level</option>
                        <option value="Senior">Senior</option>
                        <option value="Manager">Manager</option>
                        <option value="Director">Director</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Total Years of Experience</label>
                      <select
                        value={careerInfo.totalYearsOfExperience}
                        onChange={e => setCareerInfo({ ...careerInfo, totalYearsOfExperience: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900 bg-white"
                      >
                        <option value="0-1 years">0-1 years (Graduate)</option>
                        <option value="2-3 years">2-3 years</option>
                        <option value="4-5 years">4-5 years</option>
                        <option value="5+ years">5+ years</option>
                        <option value="8+ years">8+ years</option>
                        <option value="12+ years">12+ years</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2.3 Education */}
              {subSection === 3 && (
                <motion.div key="sub-3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-display font-bold text-navy-900">Education & Qualifications</h3>
                    <p className="text-sm text-gray-500">Degree levels help calculate EU Blue Card & UAE Green Visa eligibility.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Highest Qualification</label>
                      <select
                        value={educationInfo.highestDegree}
                        onChange={e => setEducationInfo({ ...educationInfo, highestDegree: e.target.value as any })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900 bg-white"
                      >
                        <option value="High School Diploma">High School Diploma</option>
                        <option value="Vocational / Technical Diploma">Vocational / Technical Diploma</option>
                        <option value="Associate's Degree">Associate's Degree</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="Doctorate / PhD">Doctorate / PhD</option>
                        <option value="Professional License / Certification">Professional License / Certification</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Institution</label>
                      <input
                        type="text"
                        value={educationInfo.institution}
                        onChange={e => setEducationInfo({ ...educationInfo, institution: e.target.value })}
                        placeholder="e.g. University of Zimbabwe"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Field of Study</label>
                      <input
                        type="text"
                        value={educationInfo.fieldOfStudy}
                        onChange={e => setEducationInfo({ ...educationInfo, fieldOfStudy: e.target.value })}
                        placeholder="e.g. Computer Science"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Graduation Year</label>
                      <input
                        type="text"
                        value={educationInfo.graduationYear}
                        onChange={e => setEducationInfo({ ...educationInfo, graduationYear: e.target.value })}
                        placeholder="e.g. 2019"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">GPA / Honours (Optional)</label>
                      <input
                        type="text"
                        value={educationInfo.gpa}
                        onChange={e => setEducationInfo({ ...educationInfo, gpa: e.target.value })}
                        placeholder="e.g. First Class Honours / 3.8 GPA"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2.4 Skills & Synonym Assistant */}
              {subSection === 4 && (
                <motion.div key="sub-4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-display font-bold text-navy-900">Skills & AI Synonym Matcher</h3>
                    <p className="text-sm text-gray-500">
                      Add your core technical chips. The AI will automatically recognize parent skills & synonyms (e.g., Cisco CCNA → Networking, Routing, Switching).
                    </p>
                  </div>

                  {/* Search and Add Chip */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={skillSearch}
                        onChange={e => {
                          setSkillSearch(e.target.value);
                          checkSynonyms(e.target.value);
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill(skillSearch.trim());
                          }
                        }}
                        placeholder="Search skill (e.g. Python, Cisco, React, AWS, Docker)..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                      />
                      {loadingSynonyms && (
                        <div className="absolute right-3 top-3.5 text-xs text-teal-600 font-semibold animate-pulse">
                          AI analyzing...
                        </div>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddSkill(skillSearch.trim())}
                      className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm"
                    >
                      + Add Chip
                    </button>
                  </div>

                  {/* AI Synonym Suggestions Banner */}
                  {synonymSuggestions.length > 0 && (
                    <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl">
                      <div className="flex items-center gap-2 text-xs font-bold text-teal-900 uppercase tracking-wider mb-2">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        AI Recognized Synonyms & Specializations
                      </div>
                      <p className="text-xs text-teal-800 mb-3">
                        Recruiters also search for these related disciplines. Click to add them as skill chips:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {synonymSuggestions.map(syn => (
                          <button
                            key={syn}
                            type="button"
                            onClick={() => handleAddSkill(syn)}
                            className="px-3 py-1.5 bg-white text-teal-900 hover:bg-teal-600 hover:text-white text-xs font-semibold rounded-lg border border-teal-300 transition-colors flex items-center gap-1"
                          >
                            <span>+ {syn}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Active Selected Skills Chips */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-3">
                      Your Selected Skill Chips ({skillsList.length})
                    </label>
                    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 min-h-[90px]">
                      {skillsList.map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-navy-900 text-white text-xs font-semibold shadow-sm"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-gray-400 hover:text-rose-300 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Click Common Recommendations */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Popular High-Demand Suggestions:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {POPULAR_SKILLS.slice(0, 14).map(skill => (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleAddSkill(skill)}
                          disabled={skillsList.includes(skill)}
                          className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
                            skillsList.includes(skill)
                              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-teal-600 hover:text-teal-700'
                          }`}
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2.5 Certifications */}
              {subSection === 5 && (
                <motion.div key="sub-5" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-display font-bold text-navy-900">Certifications & Accreditations</h3>
                    <p className="text-sm text-gray-500">Global credentials verified by ElKairon AI directly multiply recruiter outreach.</p>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCertInput}
                      onChange={e => setNewCertInput(e.target.value)}
                      placeholder="e.g. AWS Solutions Architect, Cisco CCNA, PMP, DHA..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddCert(newCertInput.trim())}
                      className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm whitespace-nowrap"
                    >
                      + Add Cert
                    </button>
                  </div>

                  {/* Selected Certs */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                      Active Certifications ({certificationsList.length})
                    </label>
                    <div className="space-y-2">
                      {certificationsList.map(cert => (
                        <div key={cert} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-gold-500" />
                            <span className="text-sm font-semibold text-navy-900">{cert}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCertificationsList(certificationsList.filter(c => c !== cert))}
                            className="text-xs text-rose-600 font-semibold hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Add Recommendations */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Recommended Global Certifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_CERTIFICATIONS.map(cert => (
                        <button
                          key={cert}
                          type="button"
                          onClick={() => handleAddCert(cert)}
                          disabled={certificationsList.includes(cert)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                            certificationsList.includes(cert)
                              ? 'bg-gray-100 text-gray-400 border-gray-200'
                              : 'bg-white text-navy-900 border-gray-200 hover:border-gold-500'
                          }`}
                        >
                          + {cert}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2.6 Languages */}
              {subSection === 6 && (
                <motion.div key="sub-6" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-display font-bold text-navy-900">Languages & Fluency</h3>
                    <p className="text-sm text-gray-500">Specify proficiency for multilingual international teams.</p>
                  </div>

                  <div className="space-y-3">
                    {languagesList.map((lang, index) => (
                      <div key={index} className="flex flex-col md:flex-row items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            value={lang.language}
                            onChange={e => {
                              const updated = [...languagesList];
                              updated[index].language = e.target.value;
                              setLanguagesList(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-navy-900"
                            placeholder="Language (e.g. English, German)"
                          />
                        </div>
                        <div className="w-full md:w-56">
                          <select
                            value={lang.proficiency}
                            onChange={e => {
                              const updated = [...languagesList];
                              updated[index].proficiency = e.target.value as LanguageProficiency;
                              setLanguagesList(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white text-gray-900"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Professional">Professional</option>
                            <option value="Native">Native</option>
                          </select>
                        </div>
                        <button
                          type="button"
                          onClick={() => setLanguagesList(languagesList.filter((_, i) => i !== index))}
                          className="text-xs text-rose-600 font-semibold px-2 py-1"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setLanguagesList([...languagesList, { language: 'French', proficiency: 'Intermediate' }])}
                    className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:border-teal-600 hover:text-teal-700 transition-colors"
                  >
                    + Add Another Language
                  </button>
                </motion.div>
              )}

              {/* 2.7 Preferences */}
              {subSection === 7 && (
                <motion.div key="sub-7" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-display font-bold text-navy-900">Career & Work Preferences</h3>
                    <p className="text-sm text-gray-500">Configure target titles, salary ranges, work style, and destinations.</p>
                  </div>

                  {/* Preferred Jobs */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                      Preferred Job Roles (Multiple Selection)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_JOB_TITLES.map(title => {
                        const isSelected = preferredJobs.includes(title);
                        return (
                          <button
                            key={title}
                            type="button"
                            onClick={() => handleToggleJob(title)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-teal-600'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{title}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred Industries */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                      Preferred Industries (Multiple Selection)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_INDUSTRIES.map(ind => {
                        const isSelected = preferredIndustries.includes(ind);
                        return (
                          <button
                            key={ind}
                            type="button"
                            onClick={() => handleToggleIndustry(ind)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-navy-900'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{ind}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Work Style & Availability */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Work Style</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Remote', 'Hybrid', 'On-site'] as WorkStyle[]).map(style => (
                          <button
                            key={style}
                            type="button"
                            onClick={() => setPreferredWorkStyle(style)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                              preferredWorkStyle === style
                                ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-teal-600'
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Availability</label>
                      <select
                        value={availability}
                        onChange={e => setAvailability(e.target.value as any)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900 bg-white"
                      >
                        <option value="Immediately">Immediately (Ready to Start)</option>
                        <option value="Two Weeks">Two Weeks</option>
                        <option value="One Month">One Month</option>
                        <option value="Three Months">Three Months</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary Expectations */}
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-3">
                      Monthly Salary Expectations
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-xs text-gray-500 mb-1 block">Currency</span>
                        <select
                          value={salaryExpectations.currency}
                          onChange={e => setSalaryExpectations({ ...salaryExpectations, currency: e.target.value })}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white font-bold text-navy-900"
                        >
                          <option value="EUR">EUR (€)</option>
                          <option value="AED">AED (Dirhams - Tax Free)</option>
                          <option value="GBP">GBP (£)</option>
                          <option value="CAD">CAD ($)</option>
                          <option value="USD">USD ($)</option>
                          <option value="AUD">AUD ($)</option>
                          <option value="ZAR">ZAR (Rands)</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 mb-1 block">Minimum Salary</span>
                        <input
                          type="number"
                          value={salaryExpectations.minSalary}
                          onChange={e => setSalaryExpectations({ ...salaryExpectations, minSalary: Number(e.target.value) })}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-900 font-semibold"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 mb-1 block">Target Maximum</span>
                        <input
                          type="number"
                          value={salaryExpectations.maxSalary}
                          onChange={e => setSalaryExpectations({ ...salaryExpectations, maxSalary: Number(e.target.value) })}
                          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-gray-900 font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Target Preferred Countries */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                      Preferred Target Destinations (Multiple Selection)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {TARGET_COUNTRIES.map(country => {
                        const isSelected = preferredLocations.includes(country);
                        return (
                          <button
                            key={country}
                            type="button"
                            onClick={() => handleToggleLocation(country)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-gold-500 text-navy-900 border-gold-500 font-bold shadow-sm'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gold-500'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{country}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2.8 Resume Upload */}
              {subSection === 8 && (
                <motion.div key="sub-8" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                  <div className="border-b border-gray-100 pb-4">
                    <h3 className="text-2xl font-display font-bold text-navy-900">Documents & Portfolio</h3>
                    <p className="text-sm text-gray-500">Upload your CV, Cover Letter, and Certifications for automated ATS optimization.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* CV Upload */}
                    <div className="p-6 border-2 border-dashed border-teal-300 bg-teal-50/40 rounded-2xl text-center">
                      <FileText className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                      <p className="text-sm font-bold text-navy-900 mb-1">Resume / CV Document</p>
                      <p className="text-xs text-teal-800 font-medium mb-4">{uploadedResume.cvName}</p>
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Upload Updated CV</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploadedResume({ ...uploadedResume, cvName: file.name });
                              toast.success(`Loaded ${file.name}`);
                            }
                          }}
                        />
                      </label>
                    </div>

                    {/* Cover Letter Upload */}
                    <div className="p-6 border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl text-center">
                      <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-sm font-bold text-navy-900 mb-1">Cover Letter (Optional)</p>
                      <p className="text-xs text-gray-600 font-medium mb-4">{uploadedResume.coverLetterName}</p>
                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:border-navy-900 text-navy-900 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Upload Cover Letter</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploadedResume({ ...uploadedResume, coverLetterName: file.name });
                              toast.success(`Loaded ${file.name}`);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="p-4 bg-navy-900 text-white rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-gold-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gold-400">ElKairon AI ATS Parser</p>
                        <p className="text-xs text-gray-300">Your documents will be parsed in real-time to generate keyword optimization tips.</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-teal-400 px-3 py-1 bg-white/10 rounded-lg">
                      Ready for Scan
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom Controls for Step 2 */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                id="save-profile-step-btn"
                onClick={handleNextStep}
                className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 group transition-all"
              >
                <span>{subSection < 8 ? 'Save & Continue' : 'Finish Profile → AI Skills Assessment'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: AI SKILLS ASSESSMENT */}
        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
                <Cpu className="w-4 h-4 text-teal-600" />
                Step 3: AI Skills Assessment
              </div>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                Rate Your Skill Confidence
              </h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Rather than relying solely on your résumé text, the AI evaluates your self-assessed depth across key domains to calibrate match accuracy with global hiring standards.
              </p>

              <div className="space-y-6 mb-8">
                {/* Programming Domain */}
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    Programming & Software Architecture
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Python', 'Java', 'React'].map(skill => (
                      <div key={skill} className="bg-white p-3.5 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-navy-900">{skill}</span>
                          <span className="text-xs text-gold-600 font-bold">{skillsAssessment[skill] || 3}/5</span>
                        </div>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setSkillsAssessment({ ...skillsAssessment, [skill]: star })}
                              className="text-lg focus:outline-none transition-transform hover:scale-125"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= (skillsAssessment[skill] || 3)
                                    ? 'text-gold-500 fill-gold-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Networking Domain */}
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    Networking & Telecommunications
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Cisco CCNA', 'Mikrotik', 'Fortinet'].map(skill => (
                      <div key={skill} className="bg-white p-3.5 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-navy-900">{skill}</span>
                          <span className="text-xs text-gold-600 font-bold">{skillsAssessment[skill] || 4}/5</span>
                        </div>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setSkillsAssessment({ ...skillsAssessment, [skill]: star })}
                              className="text-lg focus:outline-none transition-transform hover:scale-125"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= (skillsAssessment[skill] || 4)
                                    ? 'text-gold-500 fill-gold-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cybersecurity & Cloud Domain */}
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    Cybersecurity & Cloud Infrastructure
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['SIEM', 'Splunk', 'Wireshark'].map(skill => (
                      <div key={skill} className="bg-white p-3.5 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-navy-900">{skill}</span>
                          <span className="text-xs text-gold-600 font-bold">{skillsAssessment[skill] || 4}/5</span>
                        </div>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setSkillsAssessment({ ...skillsAssessment, [skill]: star })}
                              className="text-lg focus:outline-none transition-transform hover:scale-125"
                            >
                              <Star
                                className={`w-5 h-5 ${
                                  star <= (skillsAssessment[skill] || 4)
                                    ? 'text-gold-500 fill-gold-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider"
                >
                  ← Back to Profile
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <span>Continue to Personality Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: AI PERSONALITY & WORK STYLE */}
        {currentStep === 4 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
                <Compass className="w-4 h-4 text-teal-600" />
                Step 4: AI Personality & Work Style
              </div>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                Work Style & Behavioral Fit
              </h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Rate each statement from 1 (Strongly Disagree) to 5 (Strongly Agree). This determines your organizational archetype and culture match.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { key: 'leadTeams', text: 'I enjoy leading teams and orchestrating collaborative projects.' },
                  { key: 'workIndependently', text: 'I prefer working independently with high autonomy and deep focus.' },
                  { key: 'complexProblemSolving', text: 'I like solving complex, ambiguous problems from first principles.' },
                  { key: 'customerInteraction', text: 'I enjoy interacting directly with clients, stakeholders, and end users.' },
                  { key: 'learnQuickly', text: 'I learn new programming frameworks, tooling, and workflows quickly.' },
                  { key: 'adaptToChange', text: 'I adapt easily to sudden project changes, international timezones, and evolving requirements.' },
                  { key: 'workUnderPressure', text: 'I work well under pressure and maintain composure during critical deployment incidents.' },
                ].map((item) => {
                  const currentValue = (personalityRatings as any)[item.key] || 3;
                  return (
                    <div key={item.key} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                      <p className="text-sm font-semibold text-navy-900 flex-1">{item.text}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-medium">1</span>
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setPersonalityRatings({ ...personalityRatings, [item.key]: val })}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                              currentValue === val
                                ? 'bg-navy-900 text-white shadow-md scale-110'
                                : 'bg-white text-gray-700 border border-gray-200 hover:border-navy-900'
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                        <span className="text-xs text-gray-500 font-medium">5</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dynamic Archetype Preview */}
              <div className="p-5 bg-teal-50/60 border border-teal-200 rounded-2xl mb-8 flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-teal-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-teal-900 uppercase tracking-wider">AI Work Archetype Detected:</p>
                  <p className="text-base font-bold text-navy-900">
                    {computePersonalityArchetype(personalityRatings).archetype}
                  </p>
                  <p className="text-xs text-teal-800">
                    {computePersonalityArchetype(personalityRatings).summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <span>Continue to AI Career Goals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 5: AI CAREER GOALS */}
        {currentStep === 5 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                Step 5: AI Career Goals
              </div>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                Define Your Trajectory
              </h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                ElKairon AI maps not just what you do today, but where you want to be in 3–5 years across Europe, UAE, and North America.
              </p>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                    Dream Job Title
                  </label>
                  <input
                    type="text"
                    value={careerGoals.dreamJob}
                    onChange={e => setCareerGoals({ ...careerGoals, dreamJob: e.target.value })}
                    placeholder="e.g. Principal Cloud Infrastructure Architect & VP of Engineering"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                    Desired Career Path Progression
                  </label>
                  <input
                    type="text"
                    value={careerGoals.desiredCareerPath}
                    onChange={e => setCareerGoals({ ...careerGoals, desiredCareerPath: e.target.value })}
                    placeholder="e.g. Senior DevOps -> Lead Cloud Architect -> Global CTO"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                    Target Companies You'd Like to Work For
                  </label>
                  <input
                    type="text"
                    value={careerGoals.targetCompanies.join(', ')}
                    onChange={e => setCareerGoals({ ...careerGoals, targetCompanies: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                    placeholder="e.g. NextGen Cloud Systems, FinApex, Booking.com, SAP, ASML"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                    Long-Term Professional Vision
                  </label>
                  <textarea
                    rows={3}
                    value={careerGoals.longTermGoals}
                    onChange={e => setCareerGoals({ ...careerGoals, longTermGoals: e.target.value })}
                    placeholder="Describe your cross-border career ambitions, leadership goals, or research pursuits..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-gray-900"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <span>Continue to Matching Priorities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 6: AI MATCHING PREFERENCES */}
        {currentStep === 6 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sliders className="w-4 h-4 text-teal-600" />
                Step 6: AI Matching Preferences
              </div>
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                Calibrate Your Priorities
              </h2>
              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Use interactive sliders instead of binary checkboxes so the AI algorithm accurately weights tradeoffs between compensation, remote work, learning, and job security.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  { key: 'salaryImportance', label: 'Salary Importance', color: 'bg-teal-600' },
                  { key: 'remoteWork', label: 'Remote Work Flexibility', color: 'bg-navy-900' },
                  { key: 'careerGrowth', label: 'Career Growth & Upward Mobility', color: 'bg-teal-600' },
                  { key: 'workLifeBalance', label: 'Work-Life Balance', color: 'bg-navy-900' },
                  { key: 'companyCulture', label: 'Company Culture & Values', color: 'bg-teal-600' },
                  { key: 'learningOpportunities', label: 'Learning & Certification Support', color: 'bg-gold-500' },
                  { key: 'jobSecurity', label: 'Job Security & Permanent Tenancy', color: 'bg-navy-900' },
                  { key: 'travelOpportunities', label: 'International Travel Opportunities', color: 'bg-teal-600' },
                ].map((pref) => {
                  const val = (matchingPreferences as any)[pref.key] || 80;
                  return (
                    <div key={pref.key} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-navy-900">{pref.label}</span>
                        <span className="text-sm font-extrabold text-teal-700 bg-white px-2.5 py-0.5 rounded-lg border border-gray-200">
                          {val}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={val}
                        onChange={e => setMatchingPreferences({ ...matchingPreferences, [pref.key]: Number(e.target.value) })}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  id="calculate-ai-score-btn"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-900 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Recruitment Score</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 7: AI RECRUITMENT SCORE REVEAL */}
        {currentStep === 7 && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                AI Profile Verification Complete
              </div>

              <h2 className="text-4xl font-display font-bold text-navy-900 mb-3">
                Your AI Recruitment Score
              </h2>
              <p className="text-gray-600 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
                Congratulations, {personalInfo.firstName}! Your profile is fully calibrated and live across European, UAE, and Canadian employer networks.
              </p>

              {/* Score Display Gauges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-left">
                {/* Profile Completion */}
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Profile Completion</p>
                  <p className="text-3xl font-extrabold text-navy-900 mb-2">{liveScores.profileCompletion}%</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: `${liveScores.profileCompletion}%` }} />
                  </div>
                </div>

                {/* AI Match Readiness */}
                <div className="p-5 bg-teal-50/70 rounded-2xl border border-teal-100">
                  <p className="text-xs text-teal-800 font-bold uppercase tracking-wider mb-1">AI Match Readiness</p>
                  <p className="text-3xl font-extrabold text-teal-900 mb-2">{liveScores.aiMatchReadiness}%</p>
                  <div className="w-full bg-teal-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full rounded-full" style={{ width: `${liveScores.aiMatchReadiness}%` }} />
                  </div>
                </div>

                {/* Resume Quality */}
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Resume Quality</p>
                  <p className="text-3xl font-extrabold text-navy-900 mb-2">{liveScores.resumeQuality}%</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-gold-500 h-full rounded-full" style={{ width: `${liveScores.resumeQuality}%` }} />
                  </div>
                </div>

                {/* Recruiter Visibility */}
                <div className="p-5 bg-navy-900 text-white rounded-2xl">
                  <p className="text-xs text-gray-300 font-bold uppercase tracking-wider mb-1">Recruiter Visibility</p>
                  <p className="text-2xl font-extrabold text-gold-400 mb-1">{liveScores.recruiterVisibility}</p>
                  <p className="text-[11px] text-gray-300">Top 5% Talent Tier</p>
                </div>
              </div>

              {/* Archetype & Matching Highlights Box */}
              <div className="p-6 bg-gradient-to-r from-navy-900 to-navy-800 text-white rounded-3xl text-left mb-10 shadow-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Award className="w-7 h-7 text-gold-400" />
                    <div>
                      <p className="text-xs font-bold text-gold-400 uppercase tracking-wider">Candidate Archetype</p>
                      <p className="text-lg font-bold">{computePersonalityArchetype(personalityRatings).archetype}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/10 rounded-xl text-xs font-semibold text-teal-300">
                      🌍 {preferredLocations.join(' • ')}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Your skill profile in <strong>{skillsList.slice(0, 5).join(', ')}</strong> with <strong>{careerInfo.totalYearsOfExperience}</strong> experience has matched multiple international roles with visa sponsorship and relocation support.
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                id="enter-dashboard-btn"
                onClick={handleNextStep}
                className="w-full md:w-auto px-12 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all inline-flex items-center justify-center gap-3 group"
              >
                <span>Launch AI Candidate Dashboard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface EmployerRegistrationProps {
  onBack?: () => void;
  onCancel?: () => void;
  onSubmit?: (data: any) => Promise<void> | void;
  onComplete?: (data: any) => void;
}

export function EmployerRegistration({ onBack, onCancel, onSubmit, onComplete }: EmployerRegistrationProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'Technology',
    website: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    headquartersCountry: 'Netherlands',
    headquartersCity: 'Amsterdam',
    companySize: '50-250 employees',
    hiringCountries: ['United Kingdom', 'Germany', 'Netherlands', 'UAE'],
    openRolesCount: '3-10 roles',
    visaSponsorshipProvided: true,
    relocationAssistanceProvided: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactEmail) {
      toast.error('Please enter your company name and contact email');
      return;
    }
    toast.success('Employer profile created successfully!');
    if (onSubmit) onSubmit({ role: 'employer', ...formData });
    if (onComplete) onComplete({ role: 'employer', ...formData });
  };

  const handleReturn = () => {
    if (onBack) onBack();
    else if (onCancel) onCancel();
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Employer Onboarding</span>
          <h2 className="text-2xl font-bold text-navy-900 mt-1">Register as an Employer</h2>
          <p className="text-xs text-gray-500">Access pre-vetted international candidates and post sponsored vacancies.</p>
        </div>
        <button
          type="button"
          onClick={handleReturn}
          className="text-xs font-bold text-gray-500 hover:text-navy-900 uppercase tracking-wider"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Company Name *</label>
          <input
            type="text"
            required
            value={formData.companyName}
            onChange={e => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="e.g. NextGen Cloud Systems BV"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Industry</label>
            <select
              value={formData.industry}
              onChange={e => setFormData({ ...formData, industry: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
            >
              <option value="Technology">Technology & Cloud</option>
              <option value="Healthcare">Healthcare & Nursing</option>
              <option value="Finance">Banking & FinTech</option>
              <option value="Engineering">Civil & Industrial Engineering</option>
              <option value="Hospitality">Hospitality & Global Tourism</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Headquarters Country</label>
            <select
              value={formData.headquartersCountry}
              onChange={e => setFormData({ ...formData, headquartersCountry: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
            >
              <option value="Netherlands">Netherlands</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="UAE">United Arab Emirates (Dubai / Abu Dhabi)</option>
              <option value="Canada">Canada</option>
              <option value="South Africa">South Africa</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Contact Person *</label>
            <input
              type="text"
              required
              value={formData.contactName}
              onChange={e => setFormData({ ...formData, contactName: e.target.value })}
              placeholder="e.g. Sarah Jenkins (Head of Talent)"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Work Email *</label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="talent@company.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
            />
          </div>
        </div>

        <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-3">
          <input
            type="checkbox"
            id="visa-sponsorship"
            checked={formData.visaSponsorshipProvided}
            onChange={e => setFormData({ ...formData, visaSponsorshipProvided: e.target.checked })}
            className="w-4 h-4 text-teal-600 rounded"
          />
          <label htmlFor="visa-sponsorship" className="text-xs font-bold text-teal-900">
            Our company provides work visa sponsorship and relocation support for qualified candidates
          </label>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={handleReturn}
            className="px-6 py-3 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wider hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg"
          >
            Complete Employer Registration
          </button>
        </div>
      </form>
    </div>
  );
}

