import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Globe2, 
  DollarSign, 
  Award, 
  Languages, 
  Check, 
  AlertCircle, 
  Save, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Trash2,
  Lock,
  FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { 
  validateEmailFormat, 
  validatePhoneFormat, 
  sanitizeText, 
  sanitizeEmail, 
  sanitizePhone, 
  sanitizeStringArray,
  sanitizeUrl,
  FIELD_LIMITS 
} from '../../lib/sanitization';
import { computeRecruitmentScores } from '../../lib/aiRecruitmentEngine';
import { GenericAvatar } from '../common/GenericAvatar';
import { CandidateProfile, EmployerProfile, LanguageProficiency } from '../../types/recruitment';

interface ProfileManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SKILL_SUGGESTIONS = [
  'Intensive Care (ICU)', 'Mechanical Ventilation', 'Patient Triage',
  'TypeScript', 'React', 'Node.js', 'Python', 'AWS Cloud', 'Docker',
  'Electrical Engineering', 'HVAC Systems', 'Mechatronics', 'CNC Machining',
  'Hotel Operations', 'Culinary Arts', 'Supply Chain Logistics'
];

export function ProfileManagementModal({ isOpen, onClose }: ProfileManagementModalProps) {
  const { user, role, candidateProfile, employerProfile, updateCandidateProfile, updateEmployerProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'skills' | 'preferences'>('personal');
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Form State for Candidate
  const [candidateForm, setCandidateForm] = useState<Partial<CandidateProfile>>({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    avatarUrl: '',
    currentJobTitle: '',
    currentCompany: '',
    industry: 'Healthcare',
    careerLevel: 'Mid-Level',
    totalYearsOfExperience: '3',
    yearsOfExperience: '3',
    highestDegree: "Bachelor's Degree",
    fieldOfStudy: '',
    institution: '',
    skills: [],
    languages: [{ language: 'English', proficiency: 'Professional' }],
    preferredWorkStyle: 'Hybrid',
    salaryExpectations: { minSalary: 3000, maxSalary: 4500, currency: 'EUR', period: 'Monthly' },
    preferredLocations: ['Germany'],
    careerGoals: {
      dreamJob: 'Healthcare Specialist',
      desiredCareerPath: 'Global Placement',
      industriesOfInterest: ['Healthcare'],
      targetCompanies: [],
      longTermGoals: ''
    }
  });

  // Form State for Employer
  const [employerForm, setEmployerForm] = useState<Partial<EmployerProfile> & {
    website?: string;
    headquartersCountry?: string;
    headquartersCity?: string;
    openRolesCount?: number;
    visaSponsorshipProvided?: boolean;
    relocationAssistanceProvided?: boolean;
    hiringCountries?: string[];
    bio?: string;
  }>({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Healthcare',
    size: '50-200',
    country: 'Germany',
    website: 'https://',
    headquartersCountry: 'Germany',
    headquartersCity: 'Berlin',
    openRolesCount: 5,
    visaSponsorshipProvided: true,
    relocationAssistanceProvided: true,
    hiringCountries: ['Tunisia', 'Kenya', 'Morocco', 'Ghana', 'Nigeria'],
    bio: ''
  });

  // New Skill Input state
  const [newSkillInput, setNewSkillInput] = useState('');
  // New Language Input state
  const [newLangName, setNewLangName] = useState('');
  const [newLangProf, setNewLangProf] = useState<LanguageProficiency>('Professional');

  // Load existing profile values whenever modal opens or profiles change
  useEffect(() => {
    if (!isOpen) return;

    if (role === 'candidate' && candidateProfile) {
      setCandidateForm({
        name: candidateProfile.name || user?.displayName || '',
        email: candidateProfile.email || user?.email || '',
        phone: candidateProfile.phone || '',
        city: candidateProfile.city || '',
        country: candidateProfile.country || 'Tunisia',
        avatarUrl: candidateProfile.avatarUrl || user?.photoURL || '',
        currentJobTitle: candidateProfile.currentJobTitle || 'Specialist',
        currentCompany: candidateProfile.currentCompany || '',
        industry: candidateProfile.industry || 'Healthcare',
        careerLevel: candidateProfile.careerLevel || 'Mid-Level',
        totalYearsOfExperience: candidateProfile.totalYearsOfExperience ? String(candidateProfile.totalYearsOfExperience) : '3',
        yearsOfExperience: candidateProfile.yearsOfExperience ? String(candidateProfile.yearsOfExperience) : '3',
        highestDegree: candidateProfile.highestDegree || "Bachelor's Degree",
        fieldOfStudy: candidateProfile.fieldOfStudy || '',
        institution: candidateProfile.institution || '',
        skills: Array.isArray(candidateProfile.skills) ? [...candidateProfile.skills] : [],
        languages: Array.isArray(candidateProfile.languages) && candidateProfile.languages.length > 0 
          ? [...candidateProfile.languages] 
          : [{ language: 'English', proficiency: 'Professional' }],
        preferredWorkStyle: candidateProfile.preferredWorkStyle || 'Hybrid',
        salaryExpectations: candidateProfile.salaryExpectations || { minSalary: 3000, maxSalary: 4500, currency: 'EUR', period: 'Monthly' },
        preferredLocations: Array.isArray(candidateProfile.preferredLocations) ? [...candidateProfile.preferredLocations] : ['Germany'],
        careerGoals: candidateProfile.careerGoals || {
          dreamJob: 'Healthcare Specialist',
          desiredCareerPath: 'Global Placement',
          industriesOfInterest: ['Healthcare'],
          targetCompanies: [],
          longTermGoals: ''
        }
      });
    } else if (role === 'employer' && employerProfile) {
      setEmployerForm({
        name: employerProfile.name || user?.displayName || '',
        email: employerProfile.email || user?.email || '',
        phone: employerProfile.phone || '',
        company: employerProfile.company || '',
        industry: employerProfile.industry || 'Technology',
        size: employerProfile.size || '50-200',
        country: employerProfile.country || 'Germany',
        website: (employerProfile as any).website || 'https://',
        headquartersCountry: (employerProfile as any).headquartersCountry || employerProfile.country || 'Germany',
        headquartersCity: (employerProfile as any).headquartersCity || 'Berlin',
        openRolesCount: (employerProfile as any).openRolesCount || 5,
        visaSponsorshipProvided: (employerProfile as any).visaSponsorshipProvided ?? true,
        relocationAssistanceProvided: (employerProfile as any).relocationAssistanceProvided ?? true,
        hiringCountries: (employerProfile as any).hiringCountries || ['Tunisia', 'Kenya', 'Morocco', 'Ghana', 'Nigeria'],
        bio: (employerProfile as any).bio || ''
      });
    }
    setHasUnsavedChanges(false);
    setValidationErrors({});
  }, [isOpen, role, candidateProfile, employerProfile, user]);

  if (!isOpen) return null;

  // Add a new skill with sanitization
  const handleAddSkill = (skillToAdd: string) => {
    const cleaned = sanitizeText(skillToAdd, 40);
    if (!cleaned) return;

    if (role === 'candidate') {
      const currentSkills = candidateForm.skills || [];
      if (currentSkills.some(s => s.toLowerCase() === cleaned.toLowerCase())) {
        toast.error('Skill is already added.');
        return;
      }
      if (currentSkills.length >= FIELD_LIMITS.MAX_TAGS) {
        toast.error(`Maximum limit of ${FIELD_LIMITS.MAX_TAGS} skills reached.`);
        return;
      }
      setCandidateForm(prev => ({
        ...prev,
        skills: [...(prev.skills || []), cleaned]
      }));
      setNewSkillInput('');
      setHasUnsavedChanges(true);
    }
  };

  // Remove a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    if (role === 'candidate') {
      setCandidateForm(prev => ({
        ...prev,
        skills: (prev.skills || []).filter(s => s !== skillToRemove)
      }));
      setHasUnsavedChanges(true);
    }
  };

  // Add Language
  const handleAddLanguage = () => {
    const cleaned = sanitizeText(newLangName, 40);
    if (!cleaned) return;

    if (role === 'candidate') {
      const current = candidateForm.languages || [];
      if (current.some(l => l.language.toLowerCase() === cleaned.toLowerCase())) {
        toast.error('Language is already present in your list.');
        return;
      }
      setCandidateForm(prev => ({
        ...prev,
        languages: [...(prev.languages || []), { language: cleaned, proficiency: newLangProf }]
      }));
      setNewLangName('');
      setHasUnsavedChanges(true);
    }
  };

  // Remove Language
  const handleRemoveLanguage = (langToRemove: string) => {
    if (role === 'candidate') {
      setCandidateForm(prev => ({
        ...prev,
        languages: (prev.languages || []).filter(l => l.language !== langToRemove)
      }));
      setHasUnsavedChanges(true);
    }
  };

  // Validation & Sanitization before save
  const validateAndSanitize = () => {
    const errors: Record<string, string> = {};

    if (role === 'candidate') {
      const nameClean = sanitizeText(candidateForm.name, FIELD_LIMITS.SHORT_TEXT);
      if (!nameClean || nameClean.split(/\s+/).length < 2) {
        errors.name = 'Please provide both first and last legal names.';
      }

      const emailVal = validateEmailFormat(candidateForm.email || '');
      if (!emailVal.isValid) {
        errors.email = emailVal.error || 'Invalid email address.';
      }

      const phoneVal = validatePhoneFormat(candidateForm.phone || '');
      if (!phoneVal.isValid) {
        errors.phone = phoneVal.error || 'Invalid telephone number format.';
      }

      if (!candidateForm.currentJobTitle?.trim()) {
        errors.currentJobTitle = 'Job title is required.';
      }
    } else {
      // Employer Validation
      const companyClean = sanitizeText(employerForm.company, FIELD_LIMITS.SHORT_TEXT);
      if (!companyClean) {
        errors.company = 'Company name is required.';
      }

      const contactNameClean = sanitizeText(employerForm.name, FIELD_LIMITS.SHORT_TEXT);
      if (!contactNameClean) {
        errors.name = 'Primary contact person name is required.';
      }

      const emailVal = validateEmailFormat(employerForm.email || '');
      if (!emailVal.isValid) {
        errors.email = emailVal.error || 'Invalid work email format.';
      }

      const phoneVal = validatePhoneFormat(employerForm.phone || '');
      if (!phoneVal.isValid) {
        errors.phone = phoneVal.error || 'Invalid telephone number format.';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Secure Profile Save to Firestore
  const handleSaveProfile = async () => {
    if (!validateAndSanitize()) {
      toast.error('Please resolve the validation errors before saving.');
      return;
    }

    if (!user) {
      toast.error('You must be signed in to persist changes.');
      return;
    }

    setSaving(true);
    const targetUserId = user.uid;

    try {
      if (role === 'candidate') {
        const sanitizedCandidateData: Partial<CandidateProfile> = {
          name: sanitizeText(candidateForm.name, FIELD_LIMITS.SHORT_TEXT),
          email: sanitizeEmail(candidateForm.email),
          phone: sanitizePhone(candidateForm.phone),
          city: sanitizeText(candidateForm.city, 60),
          country: sanitizeText(candidateForm.country, 60),
          avatarUrl: sanitizeText(candidateForm.avatarUrl, 300),
          currentJobTitle: sanitizeText(candidateForm.currentJobTitle, 100),
          currentCompany: sanitizeText(candidateForm.currentCompany, 100),
          industry: candidateForm.industry,
          careerLevel: candidateForm.careerLevel,
          totalYearsOfExperience: String(candidateForm.totalYearsOfExperience || '0'),
          yearsOfExperience: String(candidateForm.totalYearsOfExperience || '0'),
          highestDegree: candidateForm.highestDegree,
          fieldOfStudy: sanitizeText(candidateForm.fieldOfStudy, 100),
          institution: sanitizeText(candidateForm.institution, 100),
          skills: sanitizeStringArray(candidateForm.skills, FIELD_LIMITS.MAX_TAGS, 40),
          languages: (candidateForm.languages || []).map(l => ({
            language: sanitizeText(l.language, 40),
            proficiency: l.proficiency
          })),
          preferredWorkStyle: candidateForm.preferredWorkStyle,
          salaryExpectations: {
            minSalary: Math.max(0, Number(candidateForm.salaryExpectations?.minSalary) || 0),
            maxSalary: Math.max(0, Number(candidateForm.salaryExpectations?.maxSalary) || 0),
            currency: candidateForm.salaryExpectations?.currency || 'EUR',
            period: 'Monthly'
          },
          preferredLocations: sanitizeStringArray(candidateForm.preferredLocations, 15, 60),
          careerGoals: {
            dreamJob: sanitizeText(candidateForm.careerGoals?.dreamJob, 100) || 'Healthcare Specialist',
            desiredCareerPath: sanitizeText(candidateForm.careerGoals?.desiredCareerPath, 100) || 'Global Placement',
            industriesOfInterest: sanitizeStringArray(candidateForm.careerGoals?.industriesOfInterest || ['Healthcare'], 5, 50),
            targetCompanies: sanitizeStringArray(candidateForm.careerGoals?.targetCompanies || [], 5, 50),
            longTermGoals: sanitizeText(candidateForm.careerGoals?.longTermGoals, FIELD_LIMITS.LONG_TEXT)
          }
        };

        // Recompute AI recruitment readiness scores
        const mergedForScore = { ...candidateProfile, ...sanitizedCandidateData };
        sanitizedCandidateData.aiRecruitmentScore = computeRecruitmentScores(mergedForScore);

        // 1. Update React Context state
        await updateCandidateProfile(sanitizedCandidateData);

        // 2. Direct Firestore Persistence with handleFirestoreError protection
        const candRef = doc(db, 'candidates', targetUserId);
        const userRef = doc(db, 'users', targetUserId);
        
        await setDoc(candRef, {
          ...sanitizedCandidateData,
          updatedAt: serverTimestamp()
        }, { merge: true });

        await setDoc(userRef, {
          name: sanitizedCandidateData.name,
          email: sanitizedCandidateData.email,
          phone: sanitizedCandidateData.phone,
          country: sanitizedCandidateData.country,
          avatarUrl: sanitizedCandidateData.avatarUrl,
          updatedAt: serverTimestamp()
        }, { merge: true });

        toast.success('Candidate dossier successfully saved to Firestore!');
      } else {
        // Employer Update
        const sanitizedEmployerData: Partial<EmployerProfile> & any = {
          role: 'employer',
          name: sanitizeText(employerForm.name, FIELD_LIMITS.SHORT_TEXT),
          email: sanitizeEmail(employerForm.email),
          phone: sanitizePhone(employerForm.phone),
          company: sanitizeText(employerForm.company, FIELD_LIMITS.SHORT_TEXT),
          industry: sanitizeText(employerForm.industry, 100),
          size: employerForm.size || '50-200',
          country: sanitizeText(employerForm.country || employerForm.headquartersCountry, 60),
          headquartersCountry: sanitizeText(employerForm.headquartersCountry, 60),
          headquartersCity: sanitizeText(employerForm.headquartersCity, 60),
          website: sanitizeUrl(employerForm.website),
          openRolesCount: Math.max(1, Number(employerForm.openRolesCount) || 1),
          visaSponsorshipProvided: Boolean(employerForm.visaSponsorshipProvided),
          relocationAssistanceProvided: Boolean(employerForm.relocationAssistanceProvided),
          hiringCountries: sanitizeStringArray(employerForm.hiringCountries, 15, 60),
          bio: sanitizeText(employerForm.bio, FIELD_LIMITS.LONG_TEXT)
        };

        // 1. Update React Context
        await updateEmployerProfile(sanitizedEmployerData);

        // 2. Direct Firestore Persistence
        const empRef = doc(db, 'employers', targetUserId);
        const userRef = doc(db, 'users', targetUserId);

        await setDoc(empRef, {
          ...sanitizedEmployerData,
          updatedAt: serverTimestamp()
        }, { merge: true });

        await setDoc(userRef, {
          name: sanitizedEmployerData.name,
          email: sanitizedEmployerData.email,
          phone: sanitizedEmployerData.phone,
          company: sanitizedEmployerData.company,
          industry: sanitizedEmployerData.industry,
          updatedAt: serverTimestamp()
        }, { merge: true });

        toast.success('Corporate employer profile successfully updated!');
      }

      setHasUnsavedChanges(false);
      onClose();
    } catch (err: any) {
      console.error('Profile saving error:', err);
      handleFirestoreError(err, OperationType.UPDATE, `${role === 'candidate' ? 'candidates' : 'employers'}/${targetUserId}`);
      toast.error('Failed to update profile. Please verify network authorization.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-gray-100 overflow-hidden my-8 flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-teal-950 text-white p-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-4">
            <GenericAvatar
              src={role === 'candidate' ? candidateForm.avatarUrl : undefined}
              name={role === 'candidate' ? (candidateForm.name || 'Candidate') : (employerForm.company || employerForm.name || 'Employer')}
              role={role || 'candidate'}
              size="md"
              className="w-12 h-12 rounded-2xl border border-teal-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                  {role === 'employer' ? 'Corporate Profile Manager' : 'Candidate Career Dossier'}
                </span>
                <span className="text-gray-400 text-xs flex items-center gap-1">
                  <ShieldCheck size={13} className="text-teal-400" />
                  <span>Firestore Encrypted ABAC</span>
                </span>
              </div>
              <h2 className="text-xl font-bold font-display text-white mt-0.5">
                {role === 'employer' ? 'Manage Employer Profile' : 'Update Placement Profile'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-gray-50 border-b border-gray-200 px-6 py-2 shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'personal', label: 'Identity & Contact', icon: User },
            { id: 'professional', label: role === 'candidate' ? 'Career & Education' : 'Company & Operations', icon: Briefcase },
            { id: 'skills', label: role === 'candidate' ? 'Skills & Languages' : 'Hiring Preferences', icon: Award },
            { id: 'preferences', label: role === 'candidate' ? 'Salary & Goals' : 'Mission & Benefits', icon: DollarSign }
          ].map(tab => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-navy-900 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-200/70 hover:text-navy-950'
                }`}
              >
                <Icon size={14} className={isCurrent ? 'text-teal-400' : 'text-gray-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: IDENTITY & CONTACT */}
          {activeTab === 'personal' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Legal Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 flex items-center justify-between">
                    <span>{role === 'candidate' ? 'Legal Full Name' : 'Primary Contact Person'} *</span>
                    {validationErrors.name && <span className="text-rose-600 text-[11px] font-semibold">{validationErrors.name}</span>}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={role === 'candidate' ? (candidateForm.name || '') : (employerForm.name || '')}
                      onChange={e => {
                        const val = e.target.value;
                        if (role === 'candidate') {
                          setCandidateForm(p => ({ ...p, name: val }));
                        } else {
                          setEmployerForm(p => ({ ...p, name: val }));
                        }
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. Dr. Amina Benali"
                      maxLength={FIELD_LIMITS.SHORT_TEXT}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none ${
                        validationErrors.name ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200 focus:border-teal-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 flex items-center justify-between">
                    <span>Email Address *</span>
                    {validationErrors.email && <span className="text-rose-600 text-[11px] font-semibold">{validationErrors.email}</span>}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      value={role === 'candidate' ? (candidateForm.email || '') : (employerForm.email || '')}
                      onChange={e => {
                        const val = e.target.value;
                        if (role === 'candidate') {
                          setCandidateForm(p => ({ ...p, email: val }));
                        } else {
                          setEmployerForm(p => ({ ...p, email: val }));
                        }
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. amina.benali@hospital.org"
                      maxLength={FIELD_LIMITS.EMAIL}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none ${
                        validationErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200 focus:border-teal-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900 flex items-center justify-between">
                    <span>Telephone (with Country Code) *</span>
                    {validationErrors.phone && <span className="text-rose-600 text-[11px] font-semibold">{validationErrors.phone}</span>}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      value={role === 'candidate' ? (candidateForm.phone || '') : (employerForm.phone || '')}
                      onChange={e => {
                        const val = e.target.value;
                        if (role === 'candidate') {
                          setCandidateForm(p => ({ ...p, phone: val }));
                        } else {
                          setEmployerForm(p => ({ ...p, phone: val }));
                        }
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. +216 71 234 567"
                      maxLength={FIELD_LIMITS.PHONE}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none ${
                        validationErrors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200 focus:border-teal-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Country of Residence / Headquarters */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900">
                    {role === 'candidate' ? 'Country of Residence' : 'Headquarters Country'}
                  </label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={role === 'candidate' ? (candidateForm.country || '') : (employerForm.country || '')}
                      onChange={e => {
                        const val = e.target.value;
                        if (role === 'candidate') {
                          setCandidateForm(p => ({ ...p, country: val }));
                        } else {
                          setEmployerForm(p => ({ ...p, country: val }));
                        }
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. Tunisia, Germany, Kenya, Ghana"
                      maxLength={60}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900">City / Municipality</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={role === 'candidate' ? (candidateForm.city || '') : (employerForm.headquartersCity || '')}
                      onChange={e => {
                        const val = e.target.value;
                        if (role === 'candidate') {
                          setCandidateForm(p => ({ ...p, city: val }));
                        } else {
                          setEmployerForm(p => ({ ...p, headquartersCity: val }));
                        }
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. Tunis, Berlin, Nairobi"
                      maxLength={60}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                {/* Avatar / Logo URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy-900">
                    {role === 'candidate' ? 'Profile Avatar Image URL' : 'Corporate Website URL'}
                  </label>
                  <input
                    type="url"
                    value={role === 'candidate' ? (candidateForm.avatarUrl || '') : (employerForm.website || '')}
                    onChange={e => {
                      const val = e.target.value;
                      if (role === 'candidate') {
                        setCandidateForm(p => ({ ...p, avatarUrl: val }));
                      } else {
                        setEmployerForm(p => ({ ...p, website: val }));
                      }
                      setHasUnsavedChanges(true);
                    }}
                    placeholder="https://..."
                    maxLength={300}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROFESSIONAL / CORPORATE DETAILS */}
          {activeTab === 'professional' && (
            <div className="space-y-5">
              {role === 'candidate' ? (
                /* Candidate Career & Education Form */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Job Title */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 flex items-center justify-between">
                      <span>Current Job Title *</span>
                      {validationErrors.currentJobTitle && <span className="text-rose-600 text-[11px] font-semibold">{validationErrors.currentJobTitle}</span>}
                    </label>
                    <input
                      type="text"
                      value={candidateForm.currentJobTitle || ''}
                      onChange={e => {
                        setCandidateForm(p => ({ ...p, currentJobTitle: e.target.value }));
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. ICU Nurse Specialist / DevOps Engineer"
                      maxLength={100}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  {/* Current Employer */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900">Current Employer / Hospital</label>
                    <input
                      type="text"
                      value={candidateForm.currentCompany || ''}
                      onChange={e => {
                        setCandidateForm(p => ({ ...p, currentCompany: e.target.value }));
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. Centre Hospitalier Universitaire"
                      maxLength={100}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  {/* Industry */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900">Primary Industry Sector</label>
                    <select
                      value={candidateForm.industry || 'Healthcare'}
                      onChange={e => {
                        setCandidateForm(p => ({ ...p, industry: e.target.value }));
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
                    >
                      <option value="Healthcare">Healthcare & Nursing</option>
                      <option value="IT & Cloud Software">IT & Software Engineering</option>
                      <option value="Engineering & Construction">Engineering & Skilled Trades</option>
                      <option value="Hospitality & Gastronomy">Hospitality & Culinary</option>
                      <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                    </select>
                  </div>

                  {/* Years of Experience */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900">Total Years of Experience</label>
                    <input
                      type="number"
                      min={0}
                      max={40}
                      value={candidateForm.totalYearsOfExperience ?? '3'}
                      onChange={e => {
                        const val = e.target.value;
                        setCandidateForm(p => ({ ...p, totalYearsOfExperience: val, yearsOfExperience: val }));
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  {/* Highest Degree */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900">Highest Academic Qualification</label>
                    <select
                      value={candidateForm.highestDegree || "Bachelor's Degree"}
                      onChange={e => {
                        setCandidateForm(p => ({ ...p, highestDegree: e.target.value as any }));
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
                    >
                      <option value="Vocational Diploma">Vocational / Technical Diploma</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="Doctorate (PhD)">Doctorate (PhD / MD)</option>
                    </select>
                  </div>

                  {/* Field of Study */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900">Major / Field of Study</label>
                    <input
                      type="text"
                      value={candidateForm.fieldOfStudy || ''}
                      onChange={e => {
                        setCandidateForm(p => ({ ...p, fieldOfStudy: e.target.value }));
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. Nursing Science, Computer Science"
                      maxLength={100}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  {/* Academic Institution */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="text-xs font-bold text-navy-900">Graduating University / College</label>
                    <input
                      type="text"
                      value={candidateForm.institution || ''}
                      onChange={e => {
                        setCandidateForm(p => ({ ...p, institution: e.target.value }));
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. Université de Tunis El Manar"
                      maxLength={100}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>
                </div>
              ) : (
                /* Employer Corporate Profile Form */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 flex items-center justify-between">
                      <span>Legal Enterprise / Clinic Name *</span>
                      {validationErrors.company && <span className="text-rose-600 text-[11px] font-semibold">{validationErrors.company}</span>}
                    </label>
                    <input
                      type="text"
                      value={employerForm.company || ''}
                      onChange={e => {
                        setEmployerForm(p => ({ ...p, company: e.target.value }));
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="e.g. Charité Universitätsmedizin Berlin"
                      maxLength={FIELD_LIMITS.SHORT_TEXT}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  {/* Industry */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900">Industry Sector</label>
                    <select
                      value={employerForm.industry || 'Healthcare'}
                      onChange={e => {
                        setEmployerForm(p => ({ ...p, industry: e.target.value }));
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
                    >
                      <option value="Healthcare">Healthcare & Hospital Networks</option>
                      <option value="Technology">Technology & Cloud Software</option>
                      <option value="Engineering & Construction">Engineering & Construction</option>
                      <option value="Hospitality">Hospitality & Tourism</option>
                      <option value="Logistics">Supply Chain & Freight</option>
                    </select>
                  </div>

                  {/* Company Size */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900">Enterprise Size</label>
                    <select
                      value={employerForm.size || '50-200'}
                      onChange={e => {
                        setEmployerForm(p => ({ ...p, size: e.target.value }));
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
                    >
                      <option value="1-10">1-10 Employees (Startup / Practice)</option>
                      <option value="10-50">10-50 Employees</option>
                      <option value="50-200">50-200 Employees (Mid-Market)</option>
                      <option value="200-1000">200-1,000 Employees (Large Enterprise)</option>
                      <option value="1000+">1,000+ Employees (Global Network)</option>
                    </select>
                  </div>

                  {/* Open Roles Estimate */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900">Estimated Open Vacancies</label>
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={employerForm.openRolesCount ?? 5}
                      onChange={e => {
                        setEmployerForm(p => ({ ...p, openRolesCount: Number(e.target.value) || 1 }));
                        setHasUnsavedChanges(true);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  {/* Sponsorship & Relocation Checkboxes */}
                  <div className="space-y-3 md:col-span-2 pt-2">
                    <label className="flex items-center gap-2.5 text-xs text-navy-900 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={employerForm.visaSponsorshipProvided ?? true}
                        onChange={e => {
                          setEmployerForm(p => ({ ...p, visaSponsorshipProvided: e.target.checked }));
                          setHasUnsavedChanges(true);
                        }}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
                      />
                      <span>Provide § 81a Fast-Track Visa Sponsorship for qualified international candidates</span>
                    </label>

                    <label className="flex items-center gap-2.5 text-xs text-navy-900 font-semibold cursor-pointer">
                      <input
                        type="checkbox"
                        checked={employerForm.relocationAssistanceProvided ?? true}
                        onChange={e => {
                          setEmployerForm(p => ({ ...p, relocationAssistanceProvided: e.target.checked }));
                          setHasUnsavedChanges(true);
                        }}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 w-4 h-4"
                      />
                      <span>Provide relocation allowance and temporary housing assistance in Germany</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SKILLS, LANGUAGES & HIRING PREFERENCES */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {role === 'candidate' ? (
                <>
                  {/* Skills Management */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-navy-900 flex items-center justify-between">
                      <span>Verified Skills & Clinical / Technical Proficiencies</span>
                      <span className="text-[11px] text-gray-500">{(candidateForm.skills || []).length} / {FIELD_LIMITS.MAX_TAGS}</span>
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkillInput}
                        onChange={e => setNewSkillInput(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill(newSkillInput);
                          }
                        }}
                        placeholder="Type skill (e.g. Critical Care ICU, Docker, Python) and press Enter"
                        maxLength={40}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-teal-600"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddSkill(newSkillInput)}
                        className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                      >
                        <Plus size={14} />
                        <span>Add</span>
                      </button>
                    </div>

                    {/* Skill Tags List */}
                    <div className="flex flex-wrap gap-2 pt-1 min-h-[50px] p-3 bg-gray-50 rounded-2xl border border-gray-100">
                      {(candidateForm.skills || []).length === 0 ? (
                        <span className="text-xs text-gray-400 italic">No skills added yet. Add your core specializations above.</span>
                      ) : (
                        (candidateForm.skills || []).map(skill => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-teal-200 text-navy-900 text-xs font-semibold shadow-xs"
                          >
                            <span>{skill}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-gray-400 hover:text-rose-600 transition-colors"
                            >
                              <X size={13} />
                            </button>
                          </span>
                        ))
                      )}
                    </div>

                    {/* Popular Suggestions */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Quick Suggestions:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_SKILL_SUGGESTIONS.map(sug => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => handleAddSkill(sug)}
                            className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-teal-50 hover:text-teal-800 text-[11px] text-gray-600 font-medium transition-colors"
                          >
                            + {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Languages Management */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <label className="text-xs font-bold text-navy-900">Language Proficiencies</label>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={newLangName}
                        onChange={e => setNewLangName(e.target.value)}
                        placeholder="Language (e.g. German, French, Arabic)"
                        maxLength={40}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-teal-600"
                      />
                      <select
                        value={newLangProf}
                        onChange={e => setNewLangProf(e.target.value as LanguageProficiency)}
                        className="px-3 py-2.5 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none"
                      >
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent (C1/C2)</option>
                        <option value="Professional">Professional (B2)</option>
                        <option value="Intermediate">Intermediate (B1)</option>
                        <option value="Elementary">Elementary (A1/A2)</option>
                      </select>
                      <button
                        type="button"
                        onClick={handleAddLanguage}
                        className="px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <Plus size={14} />
                        <span>Add Language</span>
                      </button>
                    </div>

                    <div className="space-y-2 pt-1">
                      {(candidateForm.languages || []).map((lang, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 text-xs shadow-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Languages size={14} className="text-teal-600" />
                            <span className="font-bold text-navy-900">{lang.language}</span>
                            <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-bold">
                              {lang.proficiency}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveLanguage(lang.language)}
                            className="text-gray-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Employer Sourcing Hubs */
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-navy-900">Target Talent Sourcing Countries</h4>
                    <p className="text-xs text-gray-500">Select candidate origins for targeted pre-vetted talent matching.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {['Tunisia', 'Morocco', 'Egypt', 'Kenya', 'Uganda', 'Ghana', 'Nigeria', 'South Africa', 'Philippines', 'India'].map(cntry => {
                      const isSelected = (employerForm.hiringCountries || []).includes(cntry);
                      return (
                        <button
                          key={cntry}
                          type="button"
                          onClick={() => {
                            const curr = employerForm.hiringCountries || [];
                            const updated = isSelected ? curr.filter(c => c !== cntry) : [...curr, cntry];
                            setEmployerForm(p => ({ ...p, hiringCountries: updated }));
                            setHasUnsavedChanges(true);
                          }}
                          className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-teal-50 border-teal-500 text-teal-900'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>{cntry}</span>
                          {isSelected && <Check size={14} className="text-teal-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PREFERENCES & MISSION BIO */}
          {activeTab === 'preferences' && (
            <div className="space-y-5">
              {role === 'candidate' ? (
                <>
                  {/* Candidate Work Style & Salary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-900">Preferred Work Style</label>
                      <select
                        value={candidateForm.preferredWorkStyle || 'Hybrid'}
                        onChange={e => {
                          setCandidateForm(p => ({ ...p, preferredWorkStyle: e.target.value as any }));
                          setHasUnsavedChanges(true);
                        }}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-teal-600"
                      >
                        <option value="On-site">On-site (Hospital / Clinic / Facility)</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Remote">Remote</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-navy-900">Minimum Monthly Salary Expectation (EUR)</label>
                      <div className="relative">
                        <DollarSign className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                        <input
                          type="number"
                          step={100}
                          min={1000}
                          max={20000}
                          value={candidateForm.salaryExpectations?.minSalary ?? 3200}
                          onChange={e => {
                            const val = Number(e.target.value) || 0;
                            setCandidateForm(p => ({
                              ...p,
                              salaryExpectations: { ...(p.salaryExpectations || { currency: 'EUR', period: 'Monthly', maxSalary: 4500 }), minSalary: val }
                            }));
                            setHasUnsavedChanges(true);
                          }}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Career Goals / Professional Bio */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 flex items-center justify-between">
                      <span>Career Statement & Long-Term Relocation Goals</span>
                      <span className="text-[11px] text-gray-400">
                        {(candidateForm.careerGoals?.longTermGoals || '').length} / {FIELD_LIMITS.LONG_TEXT}
                      </span>
                    </label>
                    <textarea
                      rows={4}
                      value={candidateForm.careerGoals?.longTermGoals || ''}
                      onChange={e => {
                        const val = e.target.value;
                        setCandidateForm(p => ({
                          ...p,
                          careerGoals: {
                            dreamJob: p.careerGoals?.dreamJob || 'Healthcare Specialist',
                            desiredCareerPath: p.careerGoals?.desiredCareerPath || 'Global Placement',
                            industriesOfInterest: p.careerGoals?.industriesOfInterest || ['Healthcare'],
                            targetCompanies: p.careerGoals?.targetCompanies || [],
                            longTermGoals: val
                          }
                        }));
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="Briefly state your relocation readiness, preferred clinical wards, and language exam timelines..."
                      maxLength={FIELD_LIMITS.LONG_TEXT}
                      className="w-full p-4 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-teal-600 leading-relaxed"
                    />
                  </div>
                </>
              ) : (
                /* Employer Bio / Recruitment Mission */
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-navy-900 flex items-center justify-between">
                      <span>Company Overview & International Candidate Value Proposition</span>
                      <span className="text-[11px] text-gray-400">
                        {(employerForm.bio || '').length} / {FIELD_LIMITS.LONG_TEXT}
                      </span>
                    </label>
                    <textarea
                      rows={5}
                      value={employerForm.bio || ''}
                      onChange={e => {
                        setEmployerForm(p => ({ ...p, bio: e.target.value }));
                        setHasUnsavedChanges(true);
                      }}
                      placeholder="Describe your clinic/enterprise culture, integration support, language coaching programs, and German workplace environment..."
                      maxLength={FIELD_LIMITS.LONG_TEXT}
                      className="w-full p-4 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-teal-600 leading-relaxed"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-5 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            {hasUnsavedChanges ? (
              <span className="text-amber-600 font-bold flex items-center gap-1">
                <AlertCircle size={14} /> Unsaved changes in progress
              </span>
            ) : (
              <span className="text-teal-700 font-semibold flex items-center gap-1">
                <Check size={14} /> Profile in sync with Firestore
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors w-full sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={saving}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50"
            >
              {saving ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Encrypting & Saving...</span>
                </>
              ) : (
                <>
                  <Save size={14} />
                  <span>Save to Firestore</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
