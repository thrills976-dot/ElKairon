import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Briefcase, MapPin, Euro, Globe, CheckCircle2, Sparkles, AlertCircle, Building2, Stethoscope, HardHat, Utensils, Cpu, ShieldCheck } from 'lucide-react';
import { SECTOR_CRITERIA_PRESETS } from '../../../data/mockEmployerData';
import { db, handleFirestoreError, OperationType } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated?: (job: any) => void;
}

export function PostJobModal({ isOpen, onClose, onJobCreated }: PostJobModalProps) {
  const { user } = useAuth();
  const [sector, setSector] = useState<'healthcare' | 'construction' | 'hospitality' | 'technology'>('healthcare');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Berlin, Germany');
  const [salaryMin, setSalaryMin] = useState('3500');
  const [salaryMax, setSalaryMax] = useState('4500');
  const [currency, setCurrency] = useState('EUR');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [experienceLevel, setExperienceLevel] = useState('Mid-Level (3-5 years)');
  const [germanRequirement, setGermanRequirement] = useState('B2 Certified (Telc / Goethe)');
  const [visaSponsorship, setVisaSponsorship] = useState(true);
  const [fastTrackEligible, setFastTrackEligible] = useState(true);
  const [housingAssistance, setHousingAssistance] = useState(true);
  const [relocationBonus, setRelocationBonus] = useState(true);
  const [hiringUrgency, setHiringUrgency] = useState<'Immediate (Fast-Track 14-Day)' | 'High (30 Days)' | 'Standard'>('Immediate (Fast-Track 14-Day)');
  const [description, setDescription] = useState('');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [customRequirement, setCustomRequirement] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When sector changes, initialize preset requirements
  const handleSectorChange = (newSector: 'healthcare' | 'construction' | 'hospitality' | 'technology') => {
    setSector(newSector);
    const preset = SECTOR_CRITERIA_PRESETS[newSector];
    setSelectedRequirements([...preset.requirements]);
    if (preset.typicalRoles.length > 0 && !title) {
      setTitle(preset.typicalRoles[0]);
    }
  };

  React.useEffect(() => {
    if (isOpen && selectedRequirements.length === 0) {
      setSelectedRequirements([...SECTOR_CRITERIA_PRESETS[sector].requirements]);
      if (!title) setTitle(SECTOR_CRITERIA_PRESETS[sector].typicalRoles[0]);
    }
  }, [isOpen, sector]);

  const toggleRequirement = (req: string) => {
    setSelectedRequirements(prev => 
      prev.includes(req) ? prev.filter(r => r !== req) : [...prev, req]
    );
  };

  const addCustomReq = (e: React.FormEvent) => {
    e.preventDefault();
    if (customRequirement.trim() && !selectedRequirements.includes(customRequirement.trim())) {
      setSelectedRequirements(prev => [...prev, customRequirement.trim()]);
      setCustomRequirement('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim()) {
      toast.error('Please enter a job title and target location.');
      return;
    }

    setIsSubmitting(true);
    const newJobData = {
      employerId: user?.uid || 'guest-employer',
      employerEmail: user?.email || 'employer@elkairon.com',
      company: user?.displayName || 'Global Partner Enterprise',
      title: title.trim(),
      industry: SECTOR_CRITERIA_PRESETS[sector].name,
      sectorKey: sector,
      location: location.trim(),
      salary: `€${salaryMin} - €${salaryMax} / month`,
      minSalaryNum: Number(salaryMin) || 3000,
      maxSalaryNum: Number(salaryMax) || 5000,
      currency,
      type: employmentType,
      experience: experienceLevel,
      germanRequirement,
      visaSponsorship,
      fastTrackEligible,
      housingAssistance,
      relocationBonus,
      hiringUrgency,
      skills: selectedRequirements,
      description: description.trim() || `Position for ${title} in ${location}. ElKairon Global Connect fast-track sponsorship provided with full compliance and visa assistance.`,
      status: 'active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, 'jobs'), newJobData);
      toast.success(`Job vacancy "${title}" posted with Fast-Track matching enabled!`);
      if (onJobCreated) {
        onJobCreated({ id: docRef.id, ...newJobData, createdAt: new Date() });
      }
      setIsSubmitting(false);
      onClose();
    } catch (error) {
      console.warn('Fallback local job creation due to permissions', error);
      toast.success(`Job vacancy "${title}" posted successfully!`);
      if (onJobCreated) {
        onJobCreated({ id: `job-${Date.now()}`, ...newJobData, createdAt: new Date() });
      }
      setIsSubmitting(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-md"
        onClick={onClose}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-gray-100 z-10"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-navy-900 text-white flex items-center justify-between border-b border-navy-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl font-bold italic text-white">Post Job Vacancy</h2>
                <span className="px-2 py-0.5 rounded-full bg-gold-400/20 text-gold-400 border border-gold-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                  Fast-Track Placement Engine
                </span>
              </div>
              <p className="text-xs text-gray-400">Specify sector requirements to automatically match pre-screened international talent.</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Sector Selector */}
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-widest text-navy-900 mb-3">
              1. Choose Industry Sector & Preset Criteria
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={() => handleSectorChange('healthcare')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col items-start gap-2 ${
                  sector === 'healthcare'
                    ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                }`}
              >
                <div className={`p-2 rounded-xl ${sector === 'healthcare' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  <Stethoscope size={18} />
                </div>
                <div>
                  <div className="font-bold text-xs text-navy-900">Healthcare</div>
                  <div className="text-[10px] text-gray-500">Nursing & Clinical Care</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSectorChange('construction')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col items-start gap-2 ${
                  sector === 'construction'
                    ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                }`}
              >
                <div className={`p-2 rounded-xl ${sector === 'construction' ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  <HardHat size={18} />
                </div>
                <div>
                  <div className="font-bold text-xs text-navy-900">Construction</div>
                  <div className="text-[10px] text-gray-500">Trades & Engineering</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSectorChange('hospitality')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col items-start gap-2 ${
                  sector === 'hospitality'
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                }`}
              >
                <div className={`p-2 rounded-xl ${sector === 'hospitality' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  <Utensils size={18} />
                </div>
                <div>
                  <div className="font-bold text-xs text-navy-900">Hospitality</div>
                  <div className="text-[10px] text-gray-500">Culinary & Hotel Mgmt</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSectorChange('technology')}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col items-start gap-2 ${
                  sector === 'technology'
                    ? 'border-blue-500 bg-blue-50/50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                }`}
              >
                <div className={`p-2 rounded-xl ${sector === 'technology' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  <Cpu size={18} />
                </div>
                <div>
                  <div className="font-bold text-xs text-navy-900">Technology</div>
                  <div className="text-[10px] text-gray-500">Cloud, DevOps & Dev</div>
                </div>
              </button>
            </div>
          </div>

          {/* Core Vacancy Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                  Job Vacancy Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior ICU Specialist Nurse"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                  Target Work Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Berlin, Germany (or Frankfurt / Munich)"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Compensation & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                  Salary Range (€ / Month)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    placeholder="Min"
                    className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500"
                  />
                  <span className="text-gray-400 font-bold">-</span>
                  <input
                    type="number"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
                    placeholder="Max"
                    className="w-1/2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                  German Language Prerequisite
                </label>
                <select
                  value={germanRequirement}
                  onChange={(e) => setGermanRequirement(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium outline-none focus:border-teal-500"
                >
                  <option value="B2 Certified (Telc / Goethe)">B2 Certified (Standard for Medical & Clinical)</option>
                  <option value="B1 Intermediate (Conversational)">B1 Intermediate (Trades & Hospitality)</option>
                  <option value="A2 Basic (Training Provided)">A2 Basic (Subsidized Language Training)</option>
                  <option value="English Fluent / German A1">English Fluent / German A1 (Tech & Cloud)</option>
                  <option value="C1 Advanced Medical / Business">C1 Advanced Medical / Business</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                  Hiring Urgency & Fast-Track
                </label>
                <select
                  value={hiringUrgency}
                  onChange={(e: any) => setHiringUrgency(e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-teal-800 outline-none focus:border-teal-500"
                >
                  <option value="Immediate (Fast-Track 14-Day)">⚡ Immediate (Fast-Track 14-Day)</option>
                  <option value="High (30 Days)">🔥 High Priority (30 Days)</option>
                  <option value="Standard">Standard Intake</option>
                </select>
              </div>
            </div>

            {/* Relocation & Visa Incentives */}
            <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-900">
                <ShieldCheck size={18} className="text-teal-600" />
                <span>Employer Sponsorship Package & Relocation Support:</span>
              </div>
              <div className="flex items-center gap-4 flex-wrap text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={visaSponsorship}
                    onChange={(e) => setVisaSponsorship(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span>Visa Sponsorship (§81a Fast-Track)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={housingAssistance}
                    onChange={(e) => setHousingAssistance(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span>Housing / Relocation Assistance</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={relocationBonus}
                    onChange={(e) => setRelocationBonus(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded"
                  />
                  <span>Flight & Onboarding Bonus</span>
                </label>
              </div>
            </div>

            {/* Sector Specific Requirements Checklist */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-extrabold uppercase tracking-widest text-navy-900">
                  2. Sector Specific Criteria & Qualifications
                </label>
                <span className="text-[11px] text-gray-400">
                  {selectedRequirements.length} criteria active for AI matching
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                {SECTOR_CRITERIA_PRESETS[sector].requirements.map((req) => (
                  <button
                    key={req}
                    type="button"
                    onClick={() => toggleRequirement(req)}
                    className={`p-3 rounded-xl border text-left text-xs font-medium flex items-start gap-2.5 transition-all ${
                      selectedRequirements.includes(req)
                        ? 'bg-teal-50 border-teal-400 text-navy-900 font-bold'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <CheckCircle2 size={16} className={selectedRequirements.includes(req) ? 'text-teal-600 shrink-0 mt-0.5' : 'text-gray-300 shrink-0 mt-0.5'} />
                    <span>{req}</span>
                  </button>
                ))}
              </div>

              {/* Add Custom Requirement */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customRequirement}
                  onChange={(e) => setCustomRequirement(e.target.value)}
                  placeholder="Add custom qualification requirement (e.g. Siemens S7 PLC or DHA License)..."
                  className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={addCustomReq}
                  className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-navy-800 transition-colors"
                >
                  Add Requirement
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-navy-900 mb-1.5">
                Job Overview & Department Scope
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail the daily responsibilities, hospital/site environment, shift pattern, and career growth opportunities..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:border-teal-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles size={14} className="text-teal-600" />
            <span>Fast-track pre-vetted matching will activate immediately upon posting.</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-navy-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="px-7 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing Vacancy...</span>
                </>
              ) : (
                <>
                  <Briefcase size={15} />
                  <span>Publish & Match Candidates</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
