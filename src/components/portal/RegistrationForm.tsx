import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Briefcase, Globe, FileText, Upload, Sparkles, Star, 
  CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Cpu, 
  Award, Sliders, Check, AlertCircle, Plus, Trash2, X,
  Building2, Phone, Mail, MapPin, Calendar, Lock, BookOpen
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
import { TermsAndConditionsModal } from '../TermsAndConditionsModal';
import { 
  validateEmailFormat, validatePasswordStrength, validatePhoneFormat,
  sanitizeText, sanitizeEmail, sanitizePhone, sanitizeStringArray
} from '../../lib/sanitization';
import { GenericAvatar } from '../common/GenericAvatar';

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

  // Main Step: 1 = Create Account & Terms, 2 = Professional Dossier (8 subsections), 3 = AI Skills Assessment, 4 = Personality & Work Style, 5 = Career Goals, 6 = Matching Preferences, 7 = Verification & Score Reveal
  const [currentStep, setCurrentStep] = useState<number>(initialProfile?.email ? 2 : 1);
  const [subSection, setSubSection] = useState<number>(1);
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  // Step 1: Real Account Registration Form
  const [accountForm, setAccountForm] = useState({
    fullName: initialProfile?.name || '',
    email: initialProfile?.email || '',
    password: '',
    confirmPassword: '',
    country: initialProfile?.country || 'South Africa',
    phone: initialProfile?.phone || '',
    acceptedTerms: false
  });

  // Step 2: Personal Information (Clean, authentic initial state)
  const [personalInfo, setPersonalInfo] = useState({
    avatarUrl: initialProfile?.avatarUrl || '',
    firstName: initialProfile?.firstName || (initialProfile?.name ? initialProfile.name.split(' ')[0] : ''),
    lastName: initialProfile?.lastName || (initialProfile?.name ? initialProfile.name.split(' ').slice(1).join(' ') : ''),
    dob: initialProfile?.dob || '',
    gender: (initialProfile?.gender || 'Prefer not to say') as 'Female' | 'Male' | 'Non-Binary' | 'Prefer not to say',
    nationality: initialProfile?.nationality || '',
    countryOfResidence: initialProfile?.countryOfResidence || initialProfile?.country || 'South Africa',
    city: initialProfile?.city || '',
    workAuthorization: (initialProfile?.workAuthorization || 'Requires Visa Sponsorship') as WorkAuthorizationStatus,
    willingToRelocate: (initialProfile?.willingToRelocate || 'Yes, Europe & UK') as RelocationPreference,
    passportAvailable: (initialProfile?.passportAvailable || 'Valid Passport Available (Ready to Travel)') as PassportStatus
  });

  // Auto-calculated age from real Date of Birth
  const calculatedAge = useMemo(() => {
    return calculateAgeFromDob(personalInfo.dob);
  }, [personalInfo.dob]);

  // Step 2: Career Information
  const [careerInfo, setCareerInfo] = useState({
    currentJobTitle: initialProfile?.currentJobTitle || '',
    currentCompany: initialProfile?.currentCompany || '',
    industry: initialProfile?.industry || 'Technology',
    department: initialProfile?.department || '',
    careerLevel: (initialProfile?.careerLevel || 'Mid-Level') as CareerLevel,
    totalYearsOfExperience: initialProfile?.totalYearsOfExperience || '3-5 years'
  });

  // Step 2: Education
  const [educationInfo, setEducationInfo] = useState({
    highestDegree: (initialProfile?.highestDegree || "Bachelor's Degree") as DegreeLevel,
    institution: initialProfile?.institution || '',
    graduationYear: initialProfile?.graduationYear || '',
    fieldOfStudy: initialProfile?.fieldOfStudy || '',
    gpa: initialProfile?.gpa || ''
  });

  // Step 2: Skills
  const [skillsList, setSkillsList] = useState<string[]>(
    initialProfile?.skills && initialProfile.skills.length > 0
      ? initialProfile.skills
      : []
  );
  const [skillInput, setSkillInput] = useState('');

  // Step 2: Certifications
  const [certificationsList, setCertificationsList] = useState<string[]>(
    initialProfile?.certifications && initialProfile.certifications.length > 0
      ? initialProfile.certifications
      : []
  );
  const [newCertInput, setNewCertInput] = useState('');

  // Step 2: Languages
  const [languagesList, setLanguagesList] = useState<{ language: string; proficiency: LanguageProficiency }[]>(
    initialProfile?.languages && initialProfile.languages.length > 0
      ? initialProfile.languages
      : [{ language: 'English', proficiency: 'Professional' }]
  );
  const [newLanguageName, setNewLanguageName] = useState('');
  const [newLanguageProf, setNewLanguageProf] = useState<LanguageProficiency>('Intermediate');

  // Step 2: Preferences
  const [preferredJobs, setPreferredJobs] = useState<string[]>(
    initialProfile?.preferredJobs && initialProfile.preferredJobs.length > 0
      ? initialProfile.preferredJobs
      : []
  );
  const [preferredJobInput, setPreferredJobInput] = useState('');

  const [preferredIndustries, setPreferredIndustries] = useState<string[]>(
    initialProfile?.preferredIndustries && initialProfile.preferredIndustries.length > 0
      ? initialProfile.preferredIndustries
      : ['Technology']
  );

  const [preferredWorkStyle, setPreferredWorkStyle] = useState<WorkStyle>(
    initialProfile?.preferredWorkStyle || 'Hybrid'
  );

  const [employmentTypes, setEmploymentTypes] = useState<EmploymentType[]>(
    initialProfile?.employmentType && initialProfile.employmentType.length > 0
      ? initialProfile.employmentType
      : ['Permanent']
  );

  const [salaryExpectations, setSalaryExpectations] = useState({
    minSalary: initialProfile?.salaryExpectations?.minSalary || 4500,
    maxSalary: initialProfile?.salaryExpectations?.maxSalary || 7500,
    currency: initialProfile?.salaryExpectations?.currency || 'EUR'
  });

  const [availability, setAvailability] = useState<AvailabilityStatus>(
    initialProfile?.availability || 'One Month'
  );

  const [preferredLocations, setPreferredLocations] = useState<string[]>(
    initialProfile?.preferredLocations && initialProfile.preferredLocations.length > 0
      ? initialProfile.preferredLocations
      : ['United Kingdom', 'Germany', 'Netherlands']
  );

  // Step 2: Resume / Documents (Real Upload State)
  const [uploadedResume, setUploadedResume] = useState<{ 
    cvName: string; 
    cvSize?: string;
    coverLetterName: string;
    coverLetterSize?: string;
  }>({
    cvName: initialProfile?.documents?.cvName || initialProfile?.cvName || '',
    coverLetterName: initialProfile?.documents?.coverLetterName || ''
  });

  // Step 3: AI Skills Confidence Ratings (dynamically initialized from candidate's real skills)
  const [skillsAssessment, setSkillsAssessment] = useState<Record<string, number>>({});

  // Sync candidate's chosen skills to assessment rating keys
  React.useEffect(() => {
    if (skillsList.length > 0) {
      setSkillsAssessment(prev => {
        const next = { ...prev };
        skillsList.forEach(s => {
          if (!next[s]) {
            next[s] = 4; // default confident score
          }
        });
        return next;
      });
    }
  }, [skillsList]);

  // Step 4: AI Personality & Work Style
  const [personalityRatings, setPersonalityRatings] = useState({
    leadTeams: 4,
    workIndependently: 5,
    complexProblemSolving: 4,
    customerInteraction: 4,
    learnQuickly: 5,
    adaptToChange: 5,
    workUnderPressure: 4
  });

  // Step 5: AI Career Aspirations
  const [careerGoals, setCareerGoals] = useState({
    dreamJob: initialProfile?.careerGoals?.dreamJob || '',
    desiredCareerPath: initialProfile?.careerGoals?.desiredCareerPath || '',
    industriesOfInterest: initialProfile?.careerGoals?.industriesOfInterest || ['Technology'],
    targetCompanies: initialProfile?.careerGoals?.targetCompanies || [],
    longTermGoals: initialProfile?.careerGoals?.longTermGoals || ''
  });

  // Step 6: AI Matching Preferences
  const [matchingPreferences, setMatchingPreferences] = useState({
    salaryImportance: 85,
    remoteWork: 70,
    careerGrowth: 95,
    workLifeBalance: 80,
    companyCulture: 85,
    learningOpportunities: 90,
    jobSecurity: 90,
    travelOpportunities: 60
  });

  // Handlers for dynamic lists
  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skillsList.includes(trimmed)) {
      setSkillsList([...skillsList, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  const handleAddCert = (cert: string) => {
    const trimmed = cert.trim();
    if (trimmed && !certificationsList.includes(trimmed)) {
      setCertificationsList([...certificationsList, trimmed]);
      setNewCertInput('');
    }
  };

  const handleRemoveCert = (certToRemove: string) => {
    setCertificationsList(certificationsList.filter(c => c !== certToRemove));
  };

  const handleAddLanguage = () => {
    if (!newLanguageName.trim()) return;
    if (languagesList.some(l => l.language.toLowerCase() === newLanguageName.trim().toLowerCase())) {
      toast.error('This language is already in your profile list.');
      return;
    }
    setLanguagesList([...languagesList, { language: newLanguageName.trim(), proficiency: newLanguageProf }]);
    setNewLanguageName('');
  };

  const handleRemoveLanguage = (langName: string) => {
    if (languagesList.length <= 1) {
      toast.error('At least one primary communication language is required.');
      return;
    }
    setLanguagesList(languagesList.filter(l => l.language !== langName));
  };

  const handleToggleJob = (jobTitle: string) => {
    if (preferredJobs.includes(jobTitle)) {
      setPreferredJobs(preferredJobs.filter(j => j !== jobTitle));
    } else {
      setPreferredJobs([...preferredJobs, jobTitle]);
    }
  };

  const handleToggleLocation = (loc: string) => {
    if (preferredLocations.includes(loc)) {
      if (preferredLocations.length <= 1) {
        toast.error('Please select at least one preferred destination country.');
        return;
      }
      setPreferredLocations(preferredLocations.filter(l => l !== loc));
    } else {
      setPreferredLocations([...preferredLocations, loc]);
    }
  };

  // Real File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'cv' | 'coverLetter') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 10MB)
    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      toast.error('File size exceeds 10MB limit. Please upload a smaller document.');
      return;
    }

    // Validate allowed format
    const validExtensions = ['.pdf', '.docx', '.doc', '.jpg', '.jpeg', '.png'];
    const fileNameLower = file.name.toLowerCase();
    const hasValidExt = validExtensions.some(ext => fileNameLower.endsWith(ext));
    if (!hasValidExt) {
      toast.error('Unsupported file format. Please upload PDF, DOCX, JPG, or PNG.');
      return;
    }

    const fileSizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    if (type === 'cv') {
      setUploadedResume(prev => ({ ...prev, cvName: file.name, cvSize: fileSizeFormatted }));
      toast.success(`Résumé uploaded: ${file.name} (${fileSizeFormatted})`);
    } else {
      setUploadedResume(prev => ({ ...prev, coverLetterName: file.name, coverLetterSize: fileSizeFormatted }));
      toast.success(`Document loaded: ${file.name}`);
    }
  };

  // Compile complete CandidateProfile object with strict sanitization
  const assembleFullProfile = (): CandidateProfile => {
    const rawFullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || accountForm.fullName.trim() || 'Accredited Candidate';
    const fullName = sanitizeText(rawFullName, 100);
    const sanitizedEmail = sanitizeEmail(accountForm.email);
    const sanitizedPhone = sanitizePhone(accountForm.phone);
    
    const computedScore = computeRecruitmentScores({
      name: fullName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      dob: personalInfo.dob,
      age: calculatedAge,
      countryOfResidence: sanitizeText(personalInfo.countryOfResidence, 60),
      workAuthorization: personalInfo.workAuthorization,
      willingToRelocate: personalInfo.willingToRelocate,
      passportAvailable: personalInfo.passportAvailable,
      currentJobTitle: sanitizeText(careerInfo.currentJobTitle, 100),
      industry: careerInfo.industry,
      careerLevel: careerInfo.careerLevel,
      totalYearsOfExperience: careerInfo.totalYearsOfExperience,
      highestDegree: educationInfo.highestDegree,
      institution: sanitizeText(educationInfo.institution, 100),
      skills: sanitizeStringArray(skillsList, 50, 40),
      certifications: sanitizeStringArray(certificationsList, 30, 80),
      languages: languagesList.map(l => ({ language: sanitizeText(l.language, 40), proficiency: l.proficiency })),
      preferredLocations: sanitizeStringArray(preferredLocations, 20, 60),
      cvName: sanitizeText(uploadedResume.cvName, 120),
      skillsAssessment: { categoryRatings: skillsAssessment }
    });

    const { archetype } = computePersonalityArchetype(personalityRatings);

    return {
      role: 'candidate',
      name: fullName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      country: sanitizeText(accountForm.country, 60),
      avatarUrl: sanitizeText(personalInfo.avatarUrl, 300),
      firstName: sanitizeText(personalInfo.firstName, 50),
      lastName: sanitizeText(personalInfo.lastName, 50),
      dob: personalInfo.dob,
      age: calculatedAge,
      gender: personalInfo.gender,
      nationality: sanitizeText(personalInfo.nationality, 60),
      countryOfResidence: sanitizeText(personalInfo.countryOfResidence, 60),
      city: sanitizeText(personalInfo.city, 60),
      workAuthorization: personalInfo.workAuthorization,
      willingToRelocate: personalInfo.willingToRelocate,
      passportAvailable: personalInfo.passportAvailable,

      currentJobTitle: sanitizeText(careerInfo.currentJobTitle, 100),
      currentCompany: sanitizeText(careerInfo.currentCompany, 100),
      industry: careerInfo.industry,
      department: sanitizeText(careerInfo.department, 80),
      careerLevel: careerInfo.careerLevel,
      totalYearsOfExperience: careerInfo.totalYearsOfExperience,
      yearsOfExperience: careerInfo.totalYearsOfExperience,

      highestDegree: educationInfo.highestDegree,
      institution: sanitizeText(educationInfo.institution, 100),
      graduationYear: sanitizeText(educationInfo.graduationYear, 10),
      fieldOfStudy: sanitizeText(educationInfo.fieldOfStudy, 100),
      gpa: sanitizeText(educationInfo.gpa, 20),

      skills: sanitizeStringArray(skillsList, 50, 40),
      certifications: sanitizeStringArray(certificationsList, 30, 80),
      languages: languagesList.map(l => ({ language: sanitizeText(l.language, 40), proficiency: l.proficiency })),

      preferredJobs: preferredJobs.length > 0 ? sanitizeStringArray(preferredJobs, 20, 80) : [careerInfo.currentJobTitle || 'Specialist'],
      preferredIndustries: sanitizeStringArray(preferredIndustries, 20, 60),
      preferredWorkStyle,
      employmentType: employmentTypes,
      salaryExpectations: {
        minSalary: Math.max(0, Number(salaryExpectations.minSalary) || 0),
        maxSalary: Math.max(0, Number(salaryExpectations.maxSalary) || 0),
        currency: salaryExpectations.currency,
        period: 'Monthly'
      },
      availability,
      preferredLocations: sanitizeStringArray(preferredLocations, 20, 60),

      documents: {
        ...uploadedResume,
        cvName: sanitizeText(uploadedResume.cvName, 120),
        coverLetterName: sanitizeText(uploadedResume.coverLetterName, 120)
      },
      cvName: sanitizeText(uploadedResume.cvName, 120),
      coverLetterUrl: sanitizeText(uploadedResume.coverLetterName, 120),

      skillsAssessment: {
        categoryRatings: skillsAssessment
      },

      personalityStyle: {
        ...personalityRatings,
        archetype
      },

      careerGoals: {
        dreamJob: sanitizeText(careerGoals.dreamJob, 100),
        desiredCareerPath: sanitizeText(careerGoals.desiredCareerPath, 200),
        industriesOfInterest: sanitizeStringArray(careerGoals.industriesOfInterest, 10, 60),
        targetCompanies: sanitizeStringArray(careerGoals.targetCompanies, 20, 80),
        longTermGoals: sanitizeText(careerGoals.longTermGoals, 500)
      },
      matchingPreferences,
      aiRecruitmentScore: computedScore,
      profileCompleted: true,
      profileStep: 7
    };
  };

  // Step Validation Logic
  const handleNextStep = () => {
    if (currentStep === 1) {
      // Step 1: Account Creation Validation
      const fullNameClean = sanitizeText(accountForm.fullName, 100);
      if (!fullNameClean || fullNameClean.split(/\s+/).length < 2) {
        toast.error('Please enter your full legal first and last name.');
        return;
      }

      const emailValidation = validateEmailFormat(accountForm.email);
      if (!emailValidation.isValid) {
        toast.error(emailValidation.error || 'Please provide a valid email address.');
        return;
      }

      const pwdValidation = validatePasswordStrength(accountForm.password);
      if (!pwdValidation.isValid) {
        toast.error(pwdValidation.error || 'Password must meet security requirements.');
        return;
      }

      if (accountForm.password !== accountForm.confirmPassword) {
        toast.error('Passwords do not match. Please re-enter.');
        return;
      }

      const phoneValidation = validatePhoneFormat(accountForm.phone);
      if (!phoneValidation.isValid) {
        toast.error(phoneValidation.error || 'Please enter a valid phone number.');
        return;
      }

      if (!accountForm.acceptedTerms) {
        toast.error('You must read and accept the Terms & Conditions to register.');
        return;
      }

      // Sync name into personal info
      const parts = fullNameClean.split(/\s+/);
      const fName = parts[0];
      const lName = parts.slice(1).join(' ');
      setPersonalInfo(prev => ({
        ...prev,
        firstName: prev.firstName || fName,
        lastName: prev.lastName || lName,
        countryOfResidence: prev.countryOfResidence || accountForm.country
      }));

      toast.success('Account credentials verified. Proceeding to Professional Dossier.');
      setCurrentStep(2);
      setSubSection(1);
    } 
    else if (currentStep === 2) {
      // Step 2 Subsection Validations
      if (subSection === 1) {
        // 2.1 Personal Information
        if (!personalInfo.firstName.trim() || !personalInfo.lastName.trim()) {
          toast.error('Please specify both first and last legal names.');
          return;
        }
        if (!personalInfo.dob) {
          toast.error('Please enter your date of birth.');
          return;
        }
        if (!calculatedAge || calculatedAge < 18) {
          toast.error('International work placement eligibility requires candidates to be at least 18 years of age.');
          return;
        }
        if (!personalInfo.nationality.trim()) {
          toast.error('Please provide your nationality as shown on your passport.');
          return;
        }
        if (!personalInfo.countryOfResidence.trim() || !personalInfo.city.trim()) {
          toast.error('Please enter your current country of residence and city.');
          return;
        }
        setSubSection(2);
      } 
      else if (subSection === 2) {
        // 2.2 Career Information
        if (!careerInfo.currentJobTitle.trim()) {
          toast.error('Please enter your current or most recent job title.');
          return;
        }
        if (!careerInfo.currentCompany.trim()) {
          toast.error('Please enter your current or previous employer.');
          return;
        }
        setSubSection(3);
      } 
      else if (subSection === 3) {
        // 2.3 Education
        if (!educationInfo.institution.trim()) {
          toast.error('Please enter the name of your university or educational institution.');
          return;
        }
        if (!educationInfo.fieldOfStudy.trim()) {
          toast.error('Please enter your major / field of study.');
          return;
        }
        if (!educationInfo.graduationYear.trim() || isNaN(Number(educationInfo.graduationYear.trim()))) {
          toast.error('Please enter a valid 4-digit graduation year.');
          return;
        }
        setSubSection(4);
      } 
      else if (subSection === 4) {
        // 2.4 Skills
        if (skillsList.length < 2) {
          toast.error('Please add or select at least 2 relevant professional skills.');
          return;
        }
        setSubSection(5);
      } 
      else if (subSection === 5) {
        // 2.5 Certifications (Optional)
        setSubSection(6);
      } 
      else if (subSection === 6) {
        // 2.6 Languages
        if (languagesList.length === 0) {
          toast.error('Please list at least one spoken/written language.');
          return;
        }
        setSubSection(7);
      } 
      else if (subSection === 7) {
        // 2.7 Preferences
        if (preferredLocations.length === 0) {
          toast.error('Please select at least one preferred destination country.');
          return;
        }
        setSubSection(8);
      } 
      else if (subSection === 8) {
        // 2.8 Resume Upload
        if (!uploadedResume.cvName) {
          toast.error('Please upload your CV / Résumé document (PDF, DOCX, JPG, PNG).');
          return;
        }
        toast.success('Dossier documents verified! Advancing to AI Skills Assessment.');
        setCurrentStep(3);
      }
    } 
    else if (currentStep === 3) {
      toast.success('Skills calibration complete! Moving to Personality & Work Style.');
      setCurrentStep(4);
    } 
    else if (currentStep === 4) {
      toast.success('Work style profile indexed! Defining Career Goals.');
      setCurrentStep(5);
    } 
    else if (currentStep === 5) {
      toast.success('Career goals saved! Calibrating Placement Priorities.');
      setCurrentStep(6);
    } 
    else if (currentStep === 6) {
      toast.success('AI Recruitment Engine calibrated! Generating placement dossier.');
      setCurrentStep(7);
    } 
    else if (currentStep === 7) {
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

  // Live Score calculations for display in Step 7
  const liveScores = useMemo(() => {
    const fullName = `${personalInfo.firstName} ${personalInfo.lastName}`.trim() || accountForm.fullName;
    return computeRecruitmentScores({
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
  }, [personalInfo, accountForm, calculatedAge, careerInfo, educationInfo, skillsList, certificationsList, languagesList, preferredLocations, uploadedResume, skillsAssessment]);

  return (
    <>
      <TermsAndConditionsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        onAccept={() => {
          setAccountForm(prev => ({ ...prev, acceptedTerms: true }));
          setTermsModalOpen(false);
          toast.success('Terms & Conditions confirmed.');
        }}
        isAccepted={accountForm.acceptedTerms}
      />

      <div id="candidate-registration-container" className="w-full max-w-5xl mx-auto py-6 px-4">
        {/* Top Step Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            <span>Verified Candidate Onboarding</span>
            <span className="font-bold text-navy-900">
              Step {currentStep} of 7: {
                currentStep === 1 ? 'Account & Legal Consent' :
                currentStep === 2 ? `Professional Dossier (${subSection}/8)` :
                currentStep === 3 ? 'AI Skills Assessment' :
                currentStep === 4 ? 'Personality & Work Style' :
                currentStep === 5 ? 'Career Goals' :
                currentStep === 6 ? 'Matching Priorities' : 'AI Accreditation & Score'
              }
            </span>
          </div>
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden flex shadow-inner">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => {
              const isCompleted = currentStep > s;
              const isCurrent = currentStep === s;
              return (
                <div 
                  key={s} 
                  className={`h-full flex-1 border-r border-white/40 transition-all duration-300 ${
                    isCompleted ? 'bg-teal-600' : isCurrent ? 'bg-amber-500' : 'bg-gray-200'
                  }`} 
                />
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* STEP 1: CREATE ACCOUNT & TERMS */}
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
              <div className="max-w-xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Step 1: Account Registration & Consent
                </div>
                <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                  Create Candidate Account
                </h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  Provide your genuine legal identity and contact records. All credentials undergo verification against issuing boards before international employer submission.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="reg-fullname-input"
                        type="text"
                        required
                        value={accountForm.fullName}
                        onChange={e => setAccountForm({ ...accountForm, fullName: e.target.value })}
                        placeholder="e.g. Tendai Ndlovu"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        id="reg-email-input"
                        type="email"
                        required
                        value={accountForm.email}
                        onChange={e => setAccountForm({ ...accountForm, email: e.target.value })}
                        placeholder="e.g. tendai.ndlovu@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                        Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          id="reg-password-input"
                          type="password"
                          required
                          value={accountForm.password}
                          onChange={e => setAccountForm({ ...accountForm, password: e.target.value })}
                          placeholder="Min. 6 characters"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                        Confirm Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          id="reg-confirm-password-input"
                          type="password"
                          required
                          value={accountForm.confirmPassword}
                          onChange={e => setAccountForm({ ...accountForm, confirmPassword: e.target.value })}
                          placeholder="Re-enter password"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                        Country of Origin / Citizenship <span className="text-rose-500">*</span>
                      </label>
                      <select
                        id="reg-country-select"
                        value={accountForm.country}
                        onChange={e => setAccountForm({ ...accountForm, country: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-sm text-gray-900 bg-white"
                      >
                        <option value="South Africa">South Africa (+27)</option>
                        <option value="Zimbabwe">Zimbabwe (+263)</option>
                        <option value="Namibia">Namibia (+264)</option>
                        <option value="Botswana">Botswana (+267)</option>
                        <option value="Zambia">Zambia (+260)</option>
                        <option value="Kenya">Kenya (+254)</option>
                        <option value="Nigeria">Nigeria (+234)</option>
                        <option value="Ghana">Ghana (+233)</option>
                        <option value="Uganda">Uganda (+256)</option>
                        <option value="United Kingdom">United Kingdom (+44)</option>
                        <option value="Other">Other Global</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                        WhatsApp / Contact Phone <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          id="reg-phone-input"
                          type="tel"
                          required
                          value={accountForm.phone}
                          onChange={e => setAccountForm({ ...accountForm, phone: e.target.value })}
                          placeholder="e.g. +27 82 123 4567"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mandatory Terms & Conditions Banner */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <input
                        id="reg-terms-checkbox"
                        type="checkbox"
                        checked={accountForm.acceptedTerms}
                        onChange={(e) => setAccountForm({ ...accountForm, acceptedTerms: e.target.checked })}
                        className="w-4 h-4 mt-1 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer"
                        required
                      />
                      <label htmlFor="reg-terms-checkbox" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
                        I hereby agree to the{' '}
                        <button
                          type="button"
                          onClick={() => setTermsModalOpen(true)}
                          className="font-bold text-teal-700 hover:underline"
                        >
                          Terms & Conditions of Service
                        </button>
                        , 4-stage milestone fee schedule, document authenticity verification protocols, and POPIA / GDPR Privacy Policy.
                      </label>
                    </div>

                    <button
                      type="button"
                      id="read-terms-modal-btn"
                      onClick={() => setTermsModalOpen(true)}
                      className="w-full text-xs font-bold uppercase tracking-wider text-navy-900 bg-white border border-slate-200 hover:border-gold-500 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <BookOpen size={14} className="text-gold-600" />
                      <span>Read Full Terms & Placement Agreement</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    {onBack && (
                      <button
                        type="button"
                        onClick={handleGoBack}
                        className="px-5 py-4 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      id="create-account-btn"
                      onClick={handleNextStep}
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group text-xs uppercase tracking-wider"
                    >
                      <span>Proceed to Professional Dossier</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="pt-2 text-center text-xs text-gray-400">
                    <span>🔒 Verified 256-bit encrypted data protection & ISO-27001 recruitment handling</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: COMPLETE PROFESSIONAL PROFILE (8 SUBSECTIONS) */}
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
                  { id: 8, label: '8. Resume & Docs' },
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Legal First Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="first-name-input"
                          type="text"
                          required
                          value={personalInfo.firstName}
                          onChange={e => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                          placeholder="e.g. Tendai"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Legal Last Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="last-name-input"
                          type="text"
                          required
                          value={personalInfo.lastName}
                          onChange={e => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                          placeholder="e.g. Ndlovu"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Date of Birth <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="dob-input"
                          type="date"
                          required
                          value={personalInfo.dob}
                          onChange={e => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Age (Auto-Verified)
                        </label>
                        <div className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-bold flex items-center justify-between text-sm">
                          <span>{calculatedAge !== undefined ? `${calculatedAge} Years Old` : 'Enter DOB above'}</span>
                          {calculatedAge !== undefined && calculatedAge >= 18 && (
                            <CheckCircle2 className="w-4 h-4 text-teal-600" />
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Gender</label>
                        <select
                          value={personalInfo.gender}
                          onChange={e => setPersonalInfo({ ...personalInfo, gender: e.target.value as any })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
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
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Passport Nationality <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="nationality-input"
                          type="text"
                          required
                          value={personalInfo.nationality}
                          onChange={e => setPersonalInfo({ ...personalInfo, nationality: e.target.value })}
                          placeholder="e.g. South African"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Country of Current Residence <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="country-residence-input"
                          type="text"
                          required
                          value={personalInfo.countryOfResidence}
                          onChange={e => setPersonalInfo({ ...personalInfo, countryOfResidence: e.target.value })}
                          placeholder="e.g. South Africa"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Current City <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="city-input"
                          type="text"
                          required
                          value={personalInfo.city}
                          onChange={e => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                          placeholder="e.g. Johannesburg"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Work Authorization</label>
                        <select
                          value={personalInfo.workAuthorization}
                          onChange={e => setPersonalInfo({ ...personalInfo, workAuthorization: e.target.value as any })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
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
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
                        >
                          <option value="Yes, Anywhere">Yes, Anywhere Globally</option>
                          <option value="Yes, Europe & UK">Yes, Europe & UK</option>
                          <option value="Yes, UAE & Middle East">Yes, UAE & Middle East</option>
                          <option value="Yes, North America">Yes, North America</option>
                          <option value="Remote Only">Remote Only</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Passport Readiness</label>
                        <select
                          value={personalInfo.passportAvailable}
                          onChange={e => setPersonalInfo({ ...personalInfo, passportAvailable: e.target.value as any })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
                        >
                          <option value="Valid Passport Available (Ready to Travel)">Valid Passport Available (Ready to Travel)</option>
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
                      <p className="text-sm text-gray-500">Your current role seniority, professional domain, and track record.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Current / Most Recent Job Title <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="job-title-input"
                          type="text"
                          required
                          value={careerInfo.currentJobTitle}
                          onChange={e => setCareerInfo({ ...careerInfo, currentJobTitle: e.target.value })}
                          placeholder="e.g. Senior Systems Engineer / Registered Nurse"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Current / Most Recent Employer <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="company-name-input"
                          type="text"
                          required
                          value={careerInfo.currentCompany}
                          onChange={e => setCareerInfo({ ...careerInfo, currentCompany: e.target.value })}
                          placeholder="e.g. Vodacom / Discovery Health"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Industry Sector</label>
                        <select
                          value={careerInfo.industry}
                          onChange={e => setCareerInfo({ ...careerInfo, industry: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
                        >
                          {POPULAR_INDUSTRIES.map(ind => (
                            <option key={ind} value={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Career Seniority</label>
                        <select
                          value={careerInfo.careerLevel}
                          onChange={e => setCareerInfo({ ...careerInfo, careerLevel: e.target.value as any })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
                        >
                          <option value="Entry-Level">Entry-Level (0-2 years)</option>
                          <option value="Mid-Level">Mid-Level (3-5 years)</option>
                          <option value="Senior">Senior (5-8 years)</option>
                          <option value="Lead">Lead / Principal (8+ years)</option>
                          <option value="Executive">Executive / Director</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Total Experience</label>
                        <select
                          value={careerInfo.totalYearsOfExperience}
                          onChange={e => setCareerInfo({ ...careerInfo, totalYearsOfExperience: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
                        >
                          <option value="1-2 years">1-2 years</option>
                          <option value="3-5 years">3-5 years</option>
                          <option value="5-8 years">5-8 years</option>
                          <option value="8-12 years">8-12 years</option>
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
                      <h3 className="text-2xl font-display font-bold text-navy-900">Education & Academic Background</h3>
                      <p className="text-sm text-gray-500">Degree details used for CIPA / NARIC qualification equivalence assessment.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Highest Qualification</label>
                        <select
                          value={educationInfo.highestDegree}
                          onChange={e => setEducationInfo({ ...educationInfo, highestDegree: e.target.value as any })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
                        >
                          <option value="High School">High School / Matric / O-Levels</option>
                          <option value="Vocational Certificate">Vocational / Trade Certificate</option>
                          <option value="Diploma">National Diploma</option>
                          <option value="Associate Degree">Associate Degree</option>
                          <option value="Bachelor's Degree">Bachelor's Degree</option>
                          <option value="Honours Degree">Honours Degree</option>
                          <option value="Master's Degree">Master's Degree</option>
                          <option value="Doctorate">Doctorate / PhD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Institution / University <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="institution-input"
                          type="text"
                          required
                          value={educationInfo.institution}
                          onChange={e => setEducationInfo({ ...educationInfo, institution: e.target.value })}
                          placeholder="e.g. University of Cape Town / Wits"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Field of Study / Major <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="field-study-input"
                          type="text"
                          required
                          value={educationInfo.fieldOfStudy}
                          onChange={e => setEducationInfo({ ...educationInfo, fieldOfStudy: e.target.value })}
                          placeholder="e.g. Information Technology / Nursing Science"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                          Graduation Year <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="grad-year-input"
                          type="text"
                          required
                          value={educationInfo.graduationYear}
                          onChange={e => setEducationInfo({ ...educationInfo, graduationYear: e.target.value })}
                          placeholder="e.g. 2021"
                          maxLength={4}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2.4 Skills */}
                {subSection === 4 && (
                  <motion.div key="sub-4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-2xl font-display font-bold text-navy-900">Core Professional & Technical Skills</h3>
                      <p className="text-sm text-gray-500">Select or type your primary tools, technologies, and clinical/technical proficiencies (minimum 2).</p>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={e => setSkillInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill(skillInput);
                          }
                        }}
                        placeholder="Type a skill and press Add (e.g. Python, Azure, Patient Care, PLC)"
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkill(skillInput)}
                        className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Plus size={16} />
                        <span>Add</span>
                      </button>
                    </div>

                    {/* Selected Skills Chips */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                        Your Selected Skills ({skillsList.length})
                      </p>
                      {skillsList.length === 0 ? (
                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                          Please select or enter at least 2 skills to enable international job matching.
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {skillsList.map(skill => (
                            <span
                              key={skill}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs font-bold"
                            >
                              <span>{skill}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSkill(skill)}
                                className="text-teal-500 hover:text-rose-600 transition-colors"
                              >
                                <X size={13} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Popular Suggested Skills */}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                        Suggested Skills for International Sponsorship
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_SKILLS.slice(0, 18).map(sk => {
                          const isSelected = skillsList.includes(sk);
                          return (
                            <button
                              key={sk}
                              type="button"
                              onClick={() => isSelected ? handleRemoveSkill(sk) : handleAddSkill(sk)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                isSelected
                                  ? 'bg-navy-900 text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                            >
                              {isSelected ? `✓ ${sk}` : `+ ${sk}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2.5 Certifications */}
                {subSection === 5 && (
                  <motion.div key="sub-5" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-2xl font-display font-bold text-navy-900">Accreditations & Certifications</h3>
                      <p className="text-sm text-gray-500">Optional: Add recognized industry certifications to boost your AI match ranking.</p>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCertInput}
                        onChange={e => setNewCertInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCert(newCertInput);
                          }
                        }}
                        placeholder="e.g. AWS Solutions Architect / CCNA / IELTS 7.5+"
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddCert(newCertInput)}
                        className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <Plus size={16} />
                        <span>Add</span>
                      </button>
                    </div>

                    {certificationsList.length > 0 && (
                      <div className="space-y-2">
                        {certificationsList.map(cert => (
                          <div key={cert} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm font-semibold text-navy-900">
                            <span>{cert}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveCert(cert)}
                              className="text-rose-500 hover:text-rose-700 p-1"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                        Popular Recognized Certifications
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_CERTIFICATIONS.slice(0, 8).map(cert => (
                          <button
                            key={cert}
                            type="button"
                            onClick={() => handleAddCert(cert)}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
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
                      <h3 className="text-2xl font-display font-bold text-navy-900">Language Proficiencies</h3>
                      <p className="text-sm text-gray-500">Specify languages for host-country workplace communication and visa criteria.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                      <div className="md:col-span-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Language</label>
                        <input
                          type="text"
                          value={newLanguageName}
                          onChange={e => setNewLanguageName(e.target.value)}
                          placeholder="e.g. English / German / French"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Proficiency Level</label>
                        <select
                          value={newLanguageProf}
                          onChange={e => setNewLanguageProf(e.target.value as any)}
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
                        >
                          <option value="Basic">Basic</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Native">Native / Bilingual</option>
                        </select>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={handleAddLanguage}
                          className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Plus size={15} />
                          <span>Add Language</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      {languagesList.map(item => (
                        <div key={item.language} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                          <div>
                            <span className="font-bold text-navy-900 text-sm">{item.language}</span>
                            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                              {item.proficiency}
                            </span>
                          </div>
                          {languagesList.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveLanguage(item.language)}
                              className="text-gray-400 hover:text-rose-600 p-1 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 2.7 Preferences */}
                {subSection === 7 && (
                  <motion.div key="sub-7" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-2xl font-display font-bold text-navy-900">Relocation & Role Preferences</h3>
                      <p className="text-sm text-gray-500">Destination countries, compensation expectations, and work environment preferences.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-2">
                        Preferred Destination Countries <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TARGET_COUNTRIES.map(country => {
                          const isSelected = preferredLocations.includes(country);
                          return (
                            <button
                              key={country}
                              type="button"
                              onClick={() => handleToggleLocation(country)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                                isSelected
                                  ? 'bg-teal-600 border-teal-600 text-white shadow-xs'
                                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              {isSelected ? `✓ ${country}` : country}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Work Style</label>
                        <select
                          value={preferredWorkStyle}
                          onChange={e => setPreferredWorkStyle(e.target.value as any)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
                        >
                          <option value="On-site">On-site (Relocation to Employer City)</option>
                          <option value="Hybrid">Hybrid (On-site + Remote)</option>
                          <option value="Remote">Remote</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">Availability / Notice Period</label>
                        <select
                          value={availability}
                          onChange={e => setAvailability(e.target.value as any)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900 bg-white"
                        >
                          <option value="Immediate">Immediate</option>
                          <option value="Two Weeks">2 Weeks Notice</option>
                          <option value="One Month">1 Month Notice</option>
                          <option value="Two Months">2 Months Notice</option>
                          <option value="Three Months">3 Months Notice</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2.8 Resume Upload */}
                {subSection === 8 && (
                  <motion.div key="sub-8" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-2xl font-display font-bold text-navy-900">Upload Authentic Résumé & Dossier Documents</h3>
                      <p className="text-sm text-gray-500">Upload your verified Curriculum Vitae for AI parsing and recruiter qualification validation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Primary CV Upload */}
                      <div className={`p-6 border-2 border-dashed rounded-2xl text-center transition-all ${
                        uploadedResume.cvName ? 'border-teal-500 bg-teal-50/20' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                      }`}>
                        <FileText className={`w-12 h-12 mx-auto mb-3 ${uploadedResume.cvName ? 'text-teal-600' : 'text-gray-400'}`} />
                        <p className="text-sm font-bold text-navy-900 mb-1">
                          Curriculum Vitae (CV / Résumé) <span className="text-rose-500">*</span>
                        </p>
                        <p className="text-xs text-gray-500 mb-3">PDF, DOCX, JPG, PNG (Max 10MB)</p>

                        {uploadedResume.cvName ? (
                          <div className="mb-4 p-3 bg-white border border-teal-200 rounded-xl flex items-center justify-between text-left">
                            <div className="truncate mr-2">
                              <p className="text-xs font-bold text-navy-900 truncate">{uploadedResume.cvName}</p>
                              <p className="text-[11px] text-gray-500">{uploadedResume.cvSize || 'Document Verified'}</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                          </div>
                        ) : null}

                        <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-sm transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>{uploadedResume.cvName ? 'Replace Résumé' : 'Upload Résumé'}</span>
                          <input
                            id="cv-file-upload"
                            type="file"
                            accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={e => handleFileUpload(e, 'cv')}
                          />
                        </label>
                      </div>

                      {/* Optional Cover Letter */}
                      <div className="p-6 border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-2xl text-center transition-all">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm font-bold text-navy-900 mb-1">Cover Letter or Trade Certificates (Optional)</p>
                        <p className="text-xs text-gray-500 mb-3">PDF, DOCX, JPG, PNG (Max 10MB)</p>

                        {uploadedResume.coverLetterName ? (
                          <div className="mb-4 p-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between text-left">
                            <div className="truncate mr-2">
                              <p className="text-xs font-bold text-navy-900 truncate">{uploadedResume.coverLetterName}</p>
                              <p className="text-[11px] text-gray-500">{uploadedResume.coverLetterSize || 'Document Attached'}</p>
                            </div>
                            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                          </div>
                        ) : null}

                        <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 hover:border-navy-900 text-navy-900 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors">
                          <Upload className="w-4 h-4" />
                          <span>{uploadedResume.coverLetterName ? 'Replace Document' : 'Upload Document'}</span>
                          <input
                            id="coverletter-file-upload"
                            type="file"
                            accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
                            className="hidden"
                            onChange={e => handleFileUpload(e, 'coverLetter')}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-navy-900 text-white rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-amber-400">AI ATS Dossier Engine</p>
                          <p className="text-xs text-gray-300">Your documents will be parsed and formatted for direct European and UAE employer compliance.</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-teal-400 px-3 py-1 bg-white/10 rounded-lg">
                        {uploadedResume.cvName ? 'Ready for Calibration' : 'Awaiting Document'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Controls for Step 2 */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  id="profile-step-prev-btn"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  id="profile-step-next-btn"
                  onClick={handleNextStep}
                  className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 group transition-all"
                >
                  <span>{subSection < 8 ? 'Save & Continue' : 'Finish Dossier → AI Skills Assessment'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: AI SKILLS ASSESSMENT */}
          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
                  <Cpu className="w-4 h-4 text-teal-600" />
                  Step 3: AI Skills Confidence Assessment
                </div>
                <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                  Rate Your Competency Depth
                </h2>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  Calibrate your self-assessed depth across your active skills. This informs the matching model of your core strengths for international employer shortlisting.
                </p>

                <div className="space-y-4 mb-8">
                  {skillsList.map(skill => (
                    <div key={skill} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-sm font-bold text-navy-900">{skill}</span>
                        <p className="text-xs text-gray-500">
                          {(skillsAssessment[skill] || 4) === 5 ? 'Expert / Master Lead' :
                           (skillsAssessment[skill] || 4) === 4 ? 'Highly Proficient (Independent Delivery)' :
                           (skillsAssessment[skill] || 4) === 3 ? 'Competent (Working Knowledge)' :
                           (skillsAssessment[skill] || 4) === 2 ? 'Developing / Basic' : 'Foundation'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setSkillsAssessment({ ...skillsAssessment, [skill]: star })}
                            className="p-1 focus:outline-none transition-transform hover:scale-125"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= (skillsAssessment[skill] || 4)
                                  ? 'text-amber-500 fill-amber-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider"
                  >
                    ← Back to Dossier
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
                  >
                    <span>Proceed to Personality & Style</span>
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  Step 4: AI Personality & Cross-Cultural Style
                </div>
                <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                  Work Environment & Delivery Style
                </h2>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  International employers evaluate cultural adaptability, team dynamics, and problem-solving autonomy.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { key: 'workIndependently', label: 'Autonomy & Independent Delivery', desc: 'Ability to deliver complex tasks without constant oversight' },
                    { key: 'complexProblemSolving', label: 'Analytical Problem Solving', desc: 'Navigating ambiguous challenges and systemic hurdles' },
                    { key: 'adaptToChange', label: 'Adaptability to New Environments', desc: 'Thriving in diverse global workspaces and shifting requirements' },
                    { key: 'learnQuickly', label: 'Speed of Learning New Toolsets', desc: 'Rapid assimilation of host-company workflows and stacks' },
                    { key: 'leadTeams', label: 'Leadership & Mentorship Willingness', desc: 'Guiding junior team members and project stakeholders' }
                  ].map(item => (
                    <div key={item.key} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-navy-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            type="button"
                            onClick={() => setPersonalityRatings({ ...personalityRatings, [item.key]: rating })}
                            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                              (personalityRatings as any)[item.key] === rating
                                ? 'bg-navy-900 text-white shadow-xs scale-105'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
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
                    <span>Proceed to Career Goals</span>
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
                  <Award className="w-4 h-4 text-teal-600" />
                  Step 5: AI Career Aspirations
                </div>
                <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                  Target Trajectory & Aspirations
                </h2>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  Define your intended cross-border career advancement path over the next 3 to 5 years.
                </p>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                      Target International Dream Role
                    </label>
                    <input
                      type="text"
                      value={careerGoals.dreamJob}
                      onChange={e => setCareerGoals({ ...careerGoals, dreamJob: e.target.value })}
                      placeholder="e.g. Lead Enterprise Cloud Architect / Clinical Nursing Supervisor"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                      Desired Long-Term Milestone Notes
                    </label>
                    <textarea
                      rows={3}
                      value={careerGoals.longTermGoals}
                      onChange={e => setCareerGoals({ ...careerGoals, longTermGoals: e.target.value })}
                      placeholder="e.g. Lead international multi-region projects, achieve host-country chartered engineering status..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-600 text-sm text-gray-900"
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
                    <span>Proceed to Priorities</span>
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
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
                  <Sliders className="w-4 h-4 text-teal-600" />
                  Step 6: AI Placement Priorities
                </div>
                <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
                  Calibrate Matching Priorities
                </h2>
                <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                  Adjust what matters most in your international placement offer.
                </p>

                <div className="space-y-6 mb-8">
                  {[
                    { key: 'salaryImportance', label: 'Compensation & Package Value' },
                    { key: 'careerGrowth', label: 'Promotion & Skill Upskilling Growth' },
                    { key: 'jobSecurity', label: 'Permanent Visa & Long-Term Residency Sponsorship' },
                    { key: 'workLifeBalance', label: 'Work-Life Balance & Annual Leave Provisions' }
                  ].map(item => (
                    <div key={item.key} className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-navy-900 uppercase tracking-wider">{item.label}</span>
                        <span className="text-xs font-bold text-teal-700">{(matchingPreferences as any)[item.key]}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        step="5"
                        value={(matchingPreferences as any)[item.key]}
                        onChange={e => setMatchingPreferences({ ...matchingPreferences, [item.key]: Number(e.target.value) })}
                        className="w-full accent-teal-600 cursor-pointer"
                      />
                    </div>
                  ))}
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
                    id="calibrate-score-btn"
                    onClick={handleNextStep}
                    className="px-8 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Calculate AI Recruitment Score</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 7: AI RECRUITMENT SCORE REVEAL & ACCREDITATION */}
          {currentStep === 7 && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-6 border border-teal-200">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Candidate Dossier Verified & Calibrated
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-3">
                  Your AI Recruitment Score
                </h2>
                <p className="text-gray-600 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
                  Congratulations, {personalInfo.firstName || accountForm.fullName}! Your accredited dossier is active and ready for shortlisting across European, UAE, and Canadian employer networks.
                </p>

                {/* Score Gauges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-left">
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Dossier Quality</p>
                    <p className="text-3xl font-extrabold text-navy-900 mb-2">{liveScores.profileCompletion}%</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-600 h-full rounded-full" style={{ width: `${liveScores.profileCompletion}%` }} />
                    </div>
                  </div>

                  <div className="p-5 bg-teal-50/70 rounded-2xl border border-teal-100">
                    <p className="text-xs text-teal-800 font-bold uppercase tracking-wider mb-1">Match Readiness</p>
                    <p className="text-3xl font-extrabold text-teal-900 mb-2">{liveScores.aiMatchReadiness}%</p>
                    <div className="w-full bg-teal-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-teal-600 h-full rounded-full" style={{ width: `${liveScores.aiMatchReadiness}%` }} />
                    </div>
                  </div>

                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">ATS Optimization</p>
                    <p className="text-3xl font-extrabold text-navy-900 mb-2">{liveScores.resumeQuality}%</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${liveScores.resumeQuality}%` }} />
                    </div>
                  </div>

                  <div className="p-5 bg-navy-900 text-white rounded-2xl">
                    <p className="text-xs text-gray-300 font-bold uppercase tracking-wider mb-1">Visibility Tier</p>
                    <p className="text-2xl font-extrabold text-amber-400 mb-1">{liveScores.recruiterVisibility}</p>
                    <p className="text-[11px] text-gray-300">Verified Talent Pool</p>
                  </div>
                </div>

                {/* Final Launch Button */}
                <button
                  type="button"
                  id="launch-candidate-dashboard-btn"
                  onClick={handleNextStep}
                  className="w-full md:w-auto px-12 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all inline-flex items-center justify-center gap-3 group"
                >
                  <span>Launch Candidate Dashboard & View Matches</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

// ----------------------------------------------------
// EMPLOYER REGISTRATION COMPONENT
// ----------------------------------------------------
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
    headquartersCity: '',
    companySize: '50-250 employees',
    hiringCountries: ['United Kingdom', 'Germany', 'Netherlands', 'UAE'],
    openRolesCount: '1-5 roles',
    visaSponsorshipProvided: true,
    relocationAssistanceProvided: true,
    acceptedTerms: false
  });
  const [termsModalOpen, setTermsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const companyNameClean = sanitizeText(formData.companyName, 100);
    if (!companyNameClean) {
      toast.error('Please enter your legal company name.');
      return;
    }

    const contactNameClean = sanitizeText(formData.contactName, 80);
    if (!contactNameClean) {
      toast.error('Please enter the primary contact person name.');
      return;
    }

    const emailValidation = validateEmailFormat(formData.contactEmail);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.error || 'Please enter a valid official corporate work email.');
      return;
    }

    const phoneValidation = validatePhoneFormat(formData.contactPhone);
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.error || 'Please provide a valid direct contact telephone number.');
      return;
    }

    const cityClean = sanitizeText(formData.headquartersCity, 60);
    if (!cityClean) {
      toast.error('Please enter your headquarters city.');
      return;
    }

    if (!formData.acceptedTerms) {
      toast.error('Please read and accept the Employer Terms & Labor Standards Agreement.');
      return;
    }

    const sanitizedEmployerData = {
      role: 'employer' as const,
      companyName: companyNameClean,
      industry: formData.industry,
      website: sanitizeText(formData.website, 120),
      contactName: contactNameClean,
      contactEmail: sanitizeEmail(formData.contactEmail),
      contactPhone: sanitizePhone(formData.contactPhone),
      headquartersCountry: sanitizeText(formData.headquartersCountry, 60),
      headquartersCity: cityClean,
      companySize: formData.companySize,
      hiringCountries: sanitizeStringArray(formData.hiringCountries, 20, 60),
      openRolesCount: formData.openRolesCount,
      visaSponsorshipProvided: Boolean(formData.visaSponsorshipProvided),
      relocationAssistanceProvided: Boolean(formData.relocationAssistanceProvided),
      acceptedTerms: true
    };

    toast.success('Corporate employer registration completed!');
    if (onSubmit) onSubmit(sanitizedEmployerData);
    if (onComplete) onComplete(sanitizedEmployerData);
  };

  const handleReturn = () => {
    if (onBack) onBack();
    else if (onCancel) onCancel();
  };

  return (
    <>
      <TermsAndConditionsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        onAccept={() => {
          setFormData(prev => ({ ...prev, acceptedTerms: true }));
          setTermsModalOpen(false);
          toast.success('Employer Terms & Placement Agreement confirmed.');
        }}
        isAccepted={formData.acceptedTerms}
      />

      <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Enterprise Talent Gateway</span>
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
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Company / Organization Legal Name <span className="text-rose-500">*</span>
            </label>
            <input
              id="emp-company-name-input"
              type="text"
              required
              value={formData.companyName}
              onChange={e => setFormData({ ...formData, companyName: e.target.value })}
              placeholder="e.g. NextGen Cloud Systems B.V."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Industry Sector</label>
              <select
                value={formData.industry}
                onChange={e => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
              >
                {POPULAR_INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
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
                <option value="Ireland">Ireland</option>
                <option value="South Africa">South Africa</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Headquarters City <span className="text-rose-500">*</span>
              </label>
              <input
                id="emp-city-input"
                type="text"
                required
                value={formData.headquartersCity}
                onChange={e => setFormData({ ...formData, headquartersCity: e.target.value })}
                placeholder="e.g. Amsterdam / London"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">Company Size</label>
              <select
                value={formData.companySize}
                onChange={e => setFormData({ ...formData, companySize: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
              >
                <option value="1-50 employees">1-50 employees</option>
                <option value="50-250 employees">50-250 employees</option>
                <option value="250-1000 employees">250-1000 employees</option>
                <option value="1000+ employees">1000+ Enterprise</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Primary Contact Person <span className="text-rose-500">*</span>
              </label>
              <input
                id="emp-contact-name-input"
                type="text"
                required
                value={formData.contactName}
                onChange={e => setFormData({ ...formData, contactName: e.target.value })}
                placeholder="e.g. Elena Rostova (Head of Talent)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
                Corporate Work Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="emp-contact-email-input"
                type="email"
                required
                value={formData.contactEmail}
                onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="elena@company.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1">
              Direct Telephone Number <span className="text-rose-500">*</span>
            </label>
            <input
              id="emp-contact-phone-input"
              type="tel"
              required
              value={formData.contactPhone}
              onChange={e => setFormData({ ...formData, contactPhone: e.target.value })}
              placeholder="e.g. +31 20 555 0192"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
            />
          </div>

          <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 flex items-center gap-3">
            <input
              type="checkbox"
              id="emp-visa-sponsorship"
              checked={formData.visaSponsorshipProvided}
              onChange={e => setFormData({ ...formData, visaSponsorshipProvided: e.target.checked })}
              className="w-4 h-4 text-teal-600 rounded"
            />
            <label htmlFor="emp-visa-sponsorship" className="text-xs font-bold text-teal-900 cursor-pointer">
              Our organization provides work visa sponsorship and statutory relocation support for qualifying international candidates.
            </label>
          </div>

          {/* Mandatory Employer Terms Check */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex items-start gap-3">
              <input
                id="emp-terms-checkbox"
                type="checkbox"
                checked={formData.acceptedTerms}
                onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                className="w-4 h-4 mt-0.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500 cursor-pointer"
                required
              />
              <label htmlFor="emp-terms-checkbox" className="text-xs text-slate-700 leading-relaxed cursor-pointer select-none">
                We agree to the{' '}
                <button
                  type="button"
                  onClick={() => setTermsModalOpen(true)}
                  className="font-bold text-teal-700 hover:underline"
                >
                  Employer Placement Terms
                </button>
                , fair labor standards guarantees, and 90-day probation replacement policy.
              </label>
            </div>

            <button
              type="button"
              onClick={() => setTermsModalOpen(true)}
              className="w-full text-xs font-bold uppercase tracking-wider text-navy-900 bg-white border border-slate-200 hover:border-gold-500 py-2 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <BookOpen size={13} className="text-gold-600" />
              <span>Read Full Employer Terms & Fair Labor Policy</span>
            </button>
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
              id="complete-emp-registration-btn"
              className="px-8 py-3.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg transition-colors"
            >
              Complete Employer Registration
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
