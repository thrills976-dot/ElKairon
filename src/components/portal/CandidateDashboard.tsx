import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Briefcase, MapPin, Search, Filter, CheckCircle2, 
  TrendingUp, Award, Calendar, Eye, FileText, ChevronRight, 
  Sliders, Star, DollarSign, Clock, ShieldCheck, ExternalLink,
  BookOpen, Building2, User, RefreshCw, Check, ArrowUpRight,
  AlertCircle, Upload, X, Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { 
  JobItem, MatchedJobResult, JobApplication, RecommendedCourse, 
  RecruiterProfileView, CandidateProfile 
} from '../../types/recruitment';
import { 
  INITIAL_JOBS, RECOMMENDED_COURSES, MOCK_RECRUITER_VIEWS, 
  POPULAR_SKILLS, TARGET_COUNTRIES 
} from '../../data/mockRecruitmentData';
import { 
  rankAndMatchJobs, computeRecruitmentScores, computePersonalityArchetype 
} from '../../lib/aiRecruitmentEngine';
import { db } from '../../lib/firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp } from 'firebase/firestore';

interface CandidateDashboardProps {
  onOpenProfileEditor?: () => void;
}

export function CandidateDashboard({ onOpenProfileEditor }: CandidateDashboardProps) {
  const { user, candidateProfile, updateCandidateProfile } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'matches' | 'skills_radar' | 'resume_ai' | 'salary_benchmark' | 'applications' | 'recruiter_activity' | 'profile_overview'
  >('matches');

  // Filter & Search states for Jobs
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('All');
  const [selectedWorkStyleFilter, setSelectedWorkStyleFilter] = useState<string>('All');
  const [selectedUrgencyFilter, setSelectedUrgencyFilter] = useState<string>('All');

  // Selected Job for Detailed AI Match Breakdown Modal
  const [selectedJobForModal, setSelectedJobForModal] = useState<MatchedJobResult | null>(null);
  const [loadingAiAnalysis, setLoadingAiAnalysis] = useState(false);
  const [detailedAiAnalysis, setDetailedAiAnalysis] = useState<any>(null);

  // Active User Applications state
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 'app-sample-1',
      candidateId: candidateProfile?.id || 'candidate-1',
      jobId: 'j-cloud-architect',
      jobTitle: 'Cloud Solutions Architect (AWS / Azure)',
      companyName: 'NextGen Cloud Systems',
      location: 'Amsterdam, Netherlands',
      salary: '€5,800 - €8,200 / mo',
      status: 'interview',
      stage: 'Interview Scheduled',
      matchScore: 96,
      appliedAt: '3 days ago',
      interviewDate: 'August 12, 2026 at 14:00 CET (Technical Panel)',
      notes: 'Initial profile screened. Technical architectural discussion confirmed with hiring director.'
    },
    {
      id: 'app-sample-2',
      candidateId: candidateProfile?.id || 'candidate-1',
      jobId: 'j-sr-fullstack',
      jobTitle: 'Senior Full Stack Software Engineer',
      companyName: 'FinApex Global Digital',
      location: 'Dubai, UAE',
      salary: 'AED 24,000 - 32,000 / mo',
      status: 'reviewed',
      stage: 'Under Review',
      matchScore: 92,
      appliedAt: '5 days ago',
      notes: 'Visa sponsorship verification in progress with Dubai DIFC HR.'
    }
  ]);

  // Recruiter Views State
  const [recruiterViews, setRecruiterViews] = useState<RecruiterProfileView[]>(MOCK_RECRUITER_VIEWS);

  // Recommended Courses State
  const [courses, setCourses] = useState<RecommendedCourse[]>(RECOMMENDED_COURSES);

  // Resume ATS Text review state
  const [resumeReviewText, setResumeReviewText] = useState(
    `${candidateProfile?.name || 'Blessing Mukamuri'} | Senior Cloud Systems Engineer\n` +
    `Skills: ${candidateProfile?.skills?.join(', ') || 'Python, AWS, Azure, Cisco CCNA, Docker, Linux'}\n` +
    `Education: ${candidateProfile?.highestDegree || "Bachelor's Degree"} in ${candidateProfile?.fieldOfStudy || 'Computer Science'}\n` +
    `Experience: 5+ years building and deploying scalable enterprise cloud systems.`
  );
  const [atsReviewResult, setAtsReviewResult] = useState<any>(null);
  const [loadingAts, setLoadingAts] = useState(false);

  // Sync Applications from Firestore if signed in
  useEffect(() => {
    if (!user) return;
    try {
      const q = query(collection(db, 'applications'), where('candidateId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as JobApplication));
          setApplications(prev => {
            const combined = [...fetched];
            // Keep unique
            const existingIds = new Set(fetched.map(f => f.jobId));
            prev.forEach(p => {
              if (!existingIds.has(p.jobId)) combined.push(p);
            });
            return combined;
          });
        }
      }, (err) => console.warn(err));
      return () => unsubscribe();
    } catch (e) {
      console.warn(e);
    }
  }, [user]);

  // Ranked Jobs calculation
  const rankedJobs = useMemo(() => {
    const matched = rankAndMatchJobs(INITIAL_JOBS, candidateProfile || {});
    return matched.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCountry = 
        selectedCountryFilter === 'All' ||
        job.countries?.some(c => c.toLowerCase() === selectedCountryFilter.toLowerCase()) ||
        job.location.toLowerCase().includes(selectedCountryFilter.toLowerCase());

      const matchesWorkStyle = 
        selectedWorkStyleFilter === 'All' ||
        job.workStyle?.toLowerCase() === selectedWorkStyleFilter.toLowerCase();

      const matchesUrgency = 
        selectedUrgencyFilter === 'All' ||
        job.hiringUrgency === selectedUrgencyFilter;

      return matchesSearch && matchesCountry && matchesWorkStyle && matchesUrgency;
    });
  }, [candidateProfile, searchQuery, selectedCountryFilter, selectedWorkStyleFilter, selectedUrgencyFilter]);

  // Handle Apply to Job
  const handleApplyToJob = async (job: MatchedJobResult) => {
    // Check if already applied
    const alreadyApplied = applications.some(a => a.jobId === job.id);
    if (alreadyApplied) {
      toast('You have already submitted an application for this role!', { icon: 'ℹ️' });
      return;
    }

    const newApp: JobApplication = {
      id: `app-${Date.now()}`,
      candidateId: user ? user.uid : 'candidate-1',
      jobId: job.id,
      employerId: job.employerId || 'emp-global',
      jobTitle: job.title,
      companyName: job.company || 'Enterprise Partner',
      location: job.location,
      salary: job.salary,
      status: 'pending',
      stage: 'Submitted',
      matchScore: job.matchPercentage,
      appliedAt: 'Just now',
      notes: `Applied with verified ${job.matchPercentage}% AI Match Readiness.`
    };

    setApplications([newApp, ...applications]);
    toast.success(`Application submitted to ${job.company || 'Employer'}! AI match score: ${job.matchPercentage}%`);

    if (user) {
      try {
        await addDoc(collection(db, 'applications'), {
          ...newApp,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } catch (e) {
        console.warn('Firestore app save fallback:', e);
      }
    }
  };

  // Trigger Detailed AI Match Analysis from backend
  const handleOpenAiAnalysis = async (job: MatchedJobResult) => {
    setSelectedJobForModal(job);
    setLoadingAiAnalysis(true);
    setDetailedAiAnalysis(null);

    try {
      const res = await fetch('/api/ai/match-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: candidateProfile,
          job: {
            title: job.title,
            company: job.company,
            location: job.location,
            industry: job.industry,
            skills: job.skills,
            experience: job.experience,
            description: job.description
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        setDetailedAiAnalysis(data);
      } else {
        throw new Error('AI analysis fallback');
      }
    } catch (e) {
      // Fallback
      setDetailedAiAnalysis({
        matchScore: job.matchPercentage,
        fitSummary: `Strong professional alignment with ${job.title} at ${job.company}. Your verified background in ${candidateProfile?.industry || 'Technology'} directly satisfies the position profile.`,
        keyStrengths: job.matchedSkills.length > 0 ? job.matchedSkills : ['Domain Mastery', 'Global Communication'],
        skillGaps: job.missingSkills.length > 0 ? job.missingSkills : ['Specialized Enterprise Modules'],
        recommendations: [
          'Highlight your international relocation readiness and verified English fluency.',
          'Emphasize tangible project outcomes and production deployments.'
        ],
        relocationFeasibility: candidateProfile?.willingToRelocate?.includes('Yes') ? 'High' : 'Moderate',
        visaPathwayRecommendation: 'Full Employer-Sponsored Work Visa with ElKairon document verification guarantee.'
      });
    } finally {
      setLoadingAiAnalysis(false);
    }
  };

  // Run ATS Resume Scan
  const handleRunAtsReview = async () => {
    setLoadingAts(true);
    try {
      const res = await fetch('/api/ai/resume-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: resumeReviewText,
          targetRole: candidateProfile?.preferredJobs?.[0] || candidateProfile?.currentJobTitle || 'Cloud Engineer'
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAtsReviewResult(data);
        toast.success('ATS Optimization complete!');
      }
    } catch (e) {
      toast.error('Could not complete ATS scan');
    } finally {
      setLoadingAts(false);
    }
  };

  const scores = candidateProfile?.aiRecruitmentScore || {
    profileCompletion: 88,
    aiMatchReadiness: 94,
    resumeQuality: 88,
    skillsConfidence: 91,
    recruiterVisibility: 'Excellent' as const
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-4 px-4 sm:px-6 space-y-6">
      {/* 1. TOP HEADER & AI METRICS BANNER */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          {/* Candidate Identity */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={candidateProfile?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                alt={candidateProfile?.name || 'Candidate'}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-2 border-teal-600 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold" title="AI Verified">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-navy-900">
                  {candidateProfile?.name || 'Blessing Mukamuri'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                  Verified Candidate
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-white text-xs font-bold">
                  {candidateProfile?.personalityStyle?.archetype || 'Strategic Engineering Leader'}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-600 mb-1">
                {candidateProfile?.currentJobTitle || 'Senior Cloud Systems & Network Engineer'} • {candidateProfile?.totalYearsOfExperience || '5+ years'} exp
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  {candidateProfile?.city || 'Harare'}, {candidateProfile?.countryOfResidence || 'Zimbabwe'}
                </span>
                <span>•</span>
                <span className="text-teal-700 font-medium">
                  ✈ Relocation: {candidateProfile?.willingToRelocate || 'Europe & UK'}
                </span>
                <span>•</span>
                <span className="text-navy-900 font-medium">
                  🛂 {candidateProfile?.passportAvailable || 'Passport Ready'}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            {onOpenProfileEditor && (
              <button
                type="button"
                onClick={onOpenProfileEditor}
                className="px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-navy-900 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
              >
                <Sliders className="w-4 h-4 text-teal-600" />
                <span>Edit Profile & Preferences</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                const refreshed = rankAndMatchJobs(INITIAL_JOBS, candidateProfile || {});
                toast.success(`AI re-matched ${refreshed.length} international roles`);
              }}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh Matches</span>
            </button>
          </div>
        </div>

        {/* Real-time AI Recruitment Scores Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-5">
          {/* Profile Completion */}
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Profile Completion</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-navy-900">{scores.profileCompletion}%</span>
              <span className="text-[10px] text-teal-600 font-bold">Optimal</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full" style={{ width: `${scores.profileCompletion}%` }} />
            </div>
          </div>

          {/* AI Match Readiness */}
          <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100">
            <p className="text-[11px] font-bold text-teal-900 uppercase tracking-wider mb-1">AI Match Readiness</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-teal-900">{scores.aiMatchReadiness}%</span>
              <span className="text-[10px] text-teal-700 font-bold">High Precision</span>
            </div>
            <div className="w-full bg-teal-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full" style={{ width: `${scores.aiMatchReadiness}%` }} />
            </div>
          </div>

          {/* Resume Quality */}
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">ATS Resume Quality</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-navy-900">{scores.resumeQuality}%</span>
              <span className="text-[10px] text-gold-600 font-bold">Grade A</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-gold-500 h-full rounded-full" style={{ width: `${scores.resumeQuality}%` }} />
            </div>
          </div>

          {/* Skills Confidence */}
          <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Skills Confidence</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-navy-900">{scores.skillsConfidence}%</span>
              <span className="text-[10px] text-teal-600 font-bold">11 Skills</span>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-teal-600 h-full rounded-full" style={{ width: `${scores.skillsConfidence}%` }} />
            </div>
          </div>

          {/* Recruiter Visibility */}
          <div className="p-3.5 bg-navy-900 text-white rounded-2xl flex flex-col justify-between">
            <p className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">Recruiter Visibility</p>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-xl font-extrabold text-gold-400">{scores.recruiterVisibility}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-teal-300 font-bold">Top 5%</span>
            </div>
            <p className="text-[10px] text-gray-300 mt-1">4 Active Employers Looking</p>
          </div>
        </div>
      </div>

      {/* 2. DASHBOARD MAIN TAB CONTROLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-gray-200">
        {[
          { id: 'matches', label: '🎯 AI Job Matches', count: rankedJobs.length },
          { id: 'skills_radar', label: '🔥 In-Demand Skills & Gap Radar', count: courses.length },
          { id: 'resume_ai', label: '📄 AI Resume Optimizer', highlight: true },
          { id: 'salary_benchmark', label: '💰 Global Salary Estimates' },
          { id: 'applications', label: '📊 Applications & Interviews', count: applications.length },
          { id: 'recruiter_activity', label: '⭐ Recruiter Activity', count: recruiterViews.length },
          { id: 'profile_overview', label: '👤 Profile & AI Calibrations' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-navy-900 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeTab === tab.id ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: 🎯 TOP MATCHING JOBS */}
      {activeTab === 'matches' && (
        <div className="space-y-6">
          {/* Search and Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search matching roles, technologies (e.g. AWS, Python, Cisco, React), companies..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-teal-600"
              />
            </div>

            {/* Country Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Country:</span>
              <select
                value={selectedCountryFilter}
                onChange={e => setSelectedCountryFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white text-navy-900 focus:outline-none"
              >
                <option value="All">All Preferred Countries</option>
                {TARGET_COUNTRIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Work Style Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-gray-500 whitespace-nowrap">Style:</span>
              <select
                value={selectedWorkStyleFilter}
                onChange={e => setSelectedWorkStyleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold bg-white text-navy-900 focus:outline-none"
              >
                <option value="All">All Styles</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>

          {/* Jobs List */}
          <div className="grid grid-cols-1 gap-4">
            {rankedJobs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-3xl border border-gray-100">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-navy-900">No jobs match your current search filters</h3>
                <p className="text-sm text-gray-500 mb-4">Try clearing filters or search query to see all 20 AI matched roles.</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedCountryFilter('All'); setSelectedWorkStyleFilter('All'); }}
                  className="px-4 py-2 bg-teal-600 text-white text-xs font-bold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              rankedJobs.map((job) => {
                const isApplied = applications.some(a => a.jobId === job.id);
                return (
                  <motion.div
                    key={job.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                  >
                    {/* Job Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        {/* Match Percentage Badge */}
                        <div className={`px-3 py-1 rounded-xl text-xs font-extrabold flex items-center gap-1.5 ${
                          job.matchPercentage >= 90
                            ? 'bg-teal-600 text-white shadow-sm'
                            : job.matchPercentage >= 80
                            ? 'bg-gold-500 text-navy-900'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{job.matchPercentage}% AI Match</span>
                        </div>

                        {job.visaSponsorship && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200">
                            🛂 Visa Sponsorship
                          </span>
                        )}
                        {job.workStyle && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-semibold">
                            {job.workStyle}
                          </span>
                        )}
                        {job.hiringUrgency === 'Immediate' && (
                          <span className="px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 text-[11px] font-bold">
                            🔥 Immediate Hire
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-navy-900 mb-1">{job.title}</h3>
                        <p className="text-sm font-semibold text-gray-600 flex items-center gap-2 flex-wrap">
                          <span className="text-navy-900">{job.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-gray-500">
                            <MapPin className="w-3.5 h-3.5 text-teal-600" />
                            {job.location}
                          </span>
                        </p>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Matched Skills Chips */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mr-1">Skills:</span>
                        {job.skills.map((skill) => {
                          const isCandidateSkill = candidateProfile?.skills?.some(cs => cs.toLowerCase().includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs.toLowerCase()));
                          return (
                            <span
                              key={skill}
                              className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                                isCandidateSkill
                                  ? 'bg-teal-50 text-teal-800 border border-teal-200 font-bold'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {isCandidateSkill ? '✓ ' : ''}{skill}
                            </span>
                          );
                        })}
                      </div>

                      {/* AI Reasoning Strip */}
                      <div className="p-2.5 bg-gray-50 rounded-xl text-xs text-gray-600 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-gold-500 flex-shrink-0" />
                        <span className="italic">{job.aiReasoning}</span>
                      </div>
                    </div>

                    {/* Salary and Action Side */}
                    <div className="flex flex-col items-start lg:items-end justify-between gap-4 lg:min-w-[200px] border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold lg:text-right">Estimated Salary</p>
                        <p className="text-base font-extrabold text-navy-900 lg:text-right">{job.salary}</p>
                      </div>

                      <div className="flex items-center gap-2 w-full lg:w-auto">
                        <button
                          type="button"
                          onClick={() => handleOpenAiAnalysis(job)}
                          className="flex-1 lg:flex-none px-3.5 py-2.5 bg-gray-100 hover:bg-gray-200 text-navy-900 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors"
                        >
                          <span>Match Breakdown</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApplyToJob(job)}
                          disabled={isApplied}
                          className={`flex-1 lg:flex-none px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 ${
                            isApplied
                              ? 'bg-teal-100 text-teal-800 cursor-not-allowed'
                              : 'bg-teal-600 hover:bg-teal-700 text-white'
                          }`}
                        >
                          {isApplied ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Applied</span>
                            </>
                          ) : (
                            <>
                              <span>1-Click Apply</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: 🔥 IN-DEMAND SKILLS & SKILL GAP RADAR */}
      {activeTab === 'skills_radar' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Employer Seeking Radar */}
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-navy-900">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold">Skills In Demand Now</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Aggregated from 1,200+ European & UAE employer requests over the past 30 days.
              </p>

              <div className="space-y-2.5">
                {[
                  { skill: 'AWS Cloud / Terraform', demand: 98, trend: '+24% hiring' },
                  { skill: 'Kubernetes & Docker', demand: 94, trend: '+18% hiring' },
                  { skill: 'Python / FastAPI Backend', demand: 91, trend: '+15% hiring' },
                  { skill: 'Cisco Routing & Fortinet', demand: 88, trend: '+12% hiring' },
                  { skill: 'DHA Nursing / Prometric', demand: 96, trend: '+30% hiring' },
                  { skill: 'SIEM & SOC Splunk', demand: 86, trend: '+20% hiring' },
                  { skill: 'TypeScript & Next.js', demand: 89, trend: '+14% hiring' },
                ].map((item) => (
                  <div key={item.skill} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-navy-900">{item.skill}</span>
                      <span className="text-teal-700 font-bold">{item.trend}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-teal-600 h-full rounded-full" style={{ width: `${item.demand}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gap Analysis & Course Recommendations */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gradient-to-r from-navy-900 to-teal-900 text-white p-6 rounded-3xl shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-6 h-6 text-gold-400" />
                  <h3 className="text-xl font-bold">Personalized Skill Gap Accelerator</h3>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Based on your target roles ({candidateProfile?.preferredJobs?.join(', ') || 'Cloud & DevOps Engineer'}), mastering these targeted certifications will elevate your profile match rate to <strong>98%+</strong>.
                </p>
                <div className="flex gap-3 flex-wrap text-xs">
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-teal-300 font-semibold">
                    Current Match Average: 92%
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-gold-500/20 text-gold-300 font-semibold">
                    Potential After Certification: 99%
                  </span>
                </div>
              </div>

              {/* Recommended Courses List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Recommended Certifications & Micro-Credentials
                </h4>

                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-bold border border-teal-200">
                          +{course.potentialMatchBoost}% Match Boost
                        </span>
                        <span className="text-xs text-gray-500 font-medium">{course.provider}</span>
                      </div>
                      <h4 className="text-base font-bold text-navy-900">{course.title}</h4>
                      <p className="text-xs text-gray-600">
                        Targets: <strong>{course.skillAddressed}</strong> • Duration: {course.duration} • Level: {course.level}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        toast.success(`Enrolled in ${course.title}! Added to your learning path.`);
                        setCourses(courses.map(c => c.id === course.id ? { ...c, enrolled: true } : c));
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                        course.enrolled
                          ? 'bg-teal-100 text-teal-800 cursor-default'
                          : 'bg-navy-900 hover:bg-navy-800 text-white shadow-sm'
                      }`}
                    >
                      {course.enrolled ? '✓ Enrolled' : 'Start Course'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 📄 AI RESUME OPTIMIZER & ATS REVIEW */}
      {activeTab === 'resume_ai' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-navy-900">AI ATS Resume Optimizer</h3>
                <p className="text-xs text-gray-500">
                  Audit your summary against European & UAE Applicant Tracking Systems (ATS) algorithms.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRunAtsReview}
                disabled={loadingAts}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2"
              >
                {loadingAts ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing ATS Impact...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Resume Audit</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Resume Text Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-900">
                  Candidate CV Text / Summary:
                </label>
                <textarea
                  rows={10}
                  value={resumeReviewText}
                  onChange={e => setResumeReviewText(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-gray-200 text-xs font-mono focus:outline-none focus:border-teal-600 bg-gray-50"
                />
              </div>

              {/* ATS Results View */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-navy-900">
                  AI Optimization Report:
                </label>

                {atsReviewResult ? (
                  <div className="space-y-4 p-5 bg-teal-50/50 rounded-2xl border border-teal-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-900">Calculated ATS Score</span>
                      <span className="text-2xl font-extrabold text-teal-900">{atsReviewResult.atsScore}%</span>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-navy-900 mb-1">Key Strengths:</p>
                      <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                        {atsReviewResult.strengths?.map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-rose-700 mb-1">Recommended Improvements:</p>
                      <ul className="text-xs text-gray-700 space-y-1 list-disc pl-4">
                        {atsReviewResult.improvements?.map((imp: string, i: number) => (
                          <li key={i}>{imp}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-navy-900 mb-1.5">Actionable Power Keywords to Insert:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {atsReviewResult.actionableKeywords?.map((kw: string) => (
                          <span key={kw} className="px-2.5 py-1 bg-white text-navy-900 text-[11px] font-bold rounded-lg border border-teal-200">
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-100">
                    <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-gray-700 mb-1">Ready for Automated ATS Review</p>
                    <p className="text-xs text-gray-500 mb-4">Click "Run AI Resume Audit" to get instant recruiter suggestions.</p>
                    <button
                      type="button"
                      onClick={handleRunAtsReview}
                      className="px-4 py-2 bg-navy-900 text-white rounded-xl text-xs font-bold"
                    >
                      Audit Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 💰 GLOBAL SALARY BENCHMARK & ESTIMATES */}
      {activeTab === 'salary_benchmark' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-display font-bold text-navy-900">
                Global Salary Estimates for {candidateProfile?.currentJobTitle || 'Cloud Systems Engineer'}
              </h3>
              <p className="text-xs text-gray-500">
                Live compensation averages across ElKairon placement destinations based on {candidateProfile?.totalYearsOfExperience || '5+ years'} experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  country: 'Netherlands / EU',
                  currency: '€6,200 - €8,500 / month',
                  perks: '30% Tax Ruling Eligibility • Full Relocation',
                  flag: '🇳🇱',
                  purchasingPower: 'Very High',
                  visa: 'EU Blue Card'
                },
                {
                  country: 'Dubai, UAE',
                  currency: 'AED 24,000 - 32,000 / month',
                  perks: '100% Tax-Free Income • Housing & Flight Allowance',
                  flag: '🇦🇪',
                  purchasingPower: 'Maximum',
                  visa: 'UAE Green / Employment Visa'
                },
                {
                  country: 'United Kingdom',
                  currency: '£4,800 - £6,900 / month',
                  perks: 'NHS Healthcare • Pension Contribution',
                  flag: '🇬🇧',
                  purchasingPower: 'High',
                  visa: 'Skilled Worker Visa'
                },
                {
                  country: 'Germany',
                  currency: '€5,500 - €7,800 / month',
                  perks: 'Opportunity Card & Fast-Track Settlement',
                  flag: '🇩🇪',
                  purchasingPower: 'Very High',
                  visa: 'Chancenkarte / Blue Card'
                },
                {
                  country: 'Canada',
                  currency: 'CAD $6,500 - $9,200 / month',
                  perks: 'LMIA Support • Direct PR Pathway',
                  flag: '🇨🇦',
                  purchasingPower: 'High',
                  visa: 'Global Talent Stream'
                },
                {
                  country: 'South Africa / SADC',
                  currency: 'ZAR 55,000 - 78,000 / month',
                  perks: 'Hybrid Flexibility • Regional Medical Aid',
                  flag: '🇿🇦',
                  purchasingPower: 'Solid Regional',
                  visa: 'Critical Skills Work Visa'
                }
              ].map((bench) => (
                <div key={bench.country} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2 hover:border-teal-500 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{bench.flag}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                      {bench.visa}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-navy-900">{bench.country}</h4>
                  <p className="text-lg font-extrabold text-teal-700">{bench.currency}</p>
                  <p className="text-xs text-gray-500">{bench.perks}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: 📊 APPLICATION STATUS TRACKER & INTERVIEWS */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-navy-900">Application Pipeline</h3>
                <p className="text-xs text-gray-500">Track interviews, employer feedback, and visa sponsorship milestones.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold">
                {applications.length} Active Submissions
              </span>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-base font-bold text-navy-900">{app.jobTitle}</h4>
                      <p className="text-xs text-gray-600 font-medium">
                        {app.companyName} • {app.location} • Applied {app.appliedAt}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider self-start md:self-auto ${
                      app.stage === 'Interview Scheduled'
                        ? 'bg-gold-500 text-navy-900 animate-pulse'
                        : app.stage === 'Under Review'
                        ? 'bg-teal-600 text-white'
                        : 'bg-navy-900 text-white'
                    }`}>
                      {app.stage}
                    </span>
                  </div>

                  {/* Stage Progress Visualizer */}
                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {['Submitted', 'Under Review', 'Interview', 'Final Offer'].map((stageName, idx) => {
                      const stages = ['Submitted', 'Under Review', 'Interview Scheduled', 'Final Offer'];
                      const currentIdx = stages.indexOf(app.stage || 'Submitted');
                      const isComplete = idx <= currentIdx;
                      return (
                        <div key={stageName} className="space-y-1">
                          <div className={`h-2 rounded-full ${isComplete ? 'bg-teal-600' : 'bg-gray-200'}`} />
                          <span className={`text-[10px] font-bold block text-center ${isComplete ? 'text-teal-900' : 'text-gray-400'}`}>
                            {stageName}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {app.interviewDate && (
                    <div className="p-3 bg-white rounded-xl border border-gold-300 flex items-center gap-3 text-xs text-navy-900">
                      <Calendar className="w-4 h-4 text-gold-600 flex-shrink-0" />
                      <div>
                        <span className="font-bold">Next Interview: </span>
                        <span>{app.interviewDate}</span>
                      </div>
                    </div>
                  )}

                  {app.notes && (
                    <p className="text-xs text-gray-500 italic">
                      Note: {app.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ⭐ RECRUITER ACTIVITY */}
      {activeTab === 'recruiter_activity' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-display font-bold text-navy-900">Recruiters Viewing Your Profile</h3>
              <p className="text-xs text-gray-500">
                Live notifications of verified employers screening your technical credentials.
              </p>
            </div>

            <div className="space-y-3">
              {recruiterViews.map((view) => (
                <div key={view.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy-900 text-white flex items-center justify-center font-bold text-sm">
                      {view.recruiterName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-900">{view.recruiterName}</p>
                      <p className="text-xs text-gray-600">{view.company} • {view.location}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                      {view.interestScore}% Interest Match
                    </span>
                    <p className="text-[11px] text-gray-400 mt-1">{view.viewedAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: 👤 FULL PROFILE OVERVIEW */}
      {activeTab === 'profile_overview' && (
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-2xl font-display font-bold text-navy-900">Candidate Profile & AI Calibrations</h3>
                <p className="text-xs text-gray-500">Your live matching attributes stored in the ElKairon database.</p>
              </div>
              {onOpenProfileEditor && (
                <button
                  type="button"
                  onClick={onOpenProfileEditor}
                  className="px-4 py-2 bg-teal-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal & Career */}
              <div className="p-5 bg-gray-50 rounded-2xl space-y-3 text-xs">
                <p className="font-bold text-navy-900 text-sm uppercase tracking-wider border-b pb-2">Core Identification</p>
                <p><strong>Full Name:</strong> {candidateProfile?.name}</p>
                <p><strong>Email:</strong> {candidateProfile?.email}</p>
                <p><strong>Phone:</strong> {candidateProfile?.phone}</p>
                <p><strong>Age:</strong> {candidateProfile?.age || 29} years old</p>
                <p><strong>Nationality:</strong> {candidateProfile?.nationality || 'Zimbabwean'}</p>
                <p><strong>Residence:</strong> {candidateProfile?.city}, {candidateProfile?.countryOfResidence}</p>
                <p><strong>Authorization:</strong> {candidateProfile?.workAuthorization}</p>
                <p><strong>Relocation:</strong> {candidateProfile?.willingToRelocate}</p>
                <p><strong>Passport:</strong> {candidateProfile?.passportAvailable}</p>
              </div>

              {/* Skills & Certs */}
              <div className="p-5 bg-gray-50 rounded-2xl space-y-3 text-xs">
                <p className="font-bold text-navy-900 text-sm uppercase tracking-wider border-b pb-2">Technical Mastery</p>
                <div>
                  <strong>Active Skill Chips:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {candidateProfile?.skills?.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-navy-900 text-white rounded text-[11px] font-semibold">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <strong>Certifications:</strong>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {candidateProfile?.certifications?.map(c => (
                      <span key={c} className="px-2 py-0.5 bg-teal-100 text-teal-900 rounded text-[11px] font-semibold">{c}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <strong>Preferred Roles:</strong>
                  <p className="mt-1">{candidateProfile?.preferredJobs?.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED AI MATCH ANALYSIS MODAL */}
      <AnimatePresence>
        {selectedJobForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl space-y-6"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-1 rounded-xl bg-teal-600 text-white font-extrabold text-xs">
                      {selectedJobForModal.matchPercentage}% Match
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">{selectedJobForModal.company}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-navy-900">{selectedJobForModal.title}</h3>
                  <p className="text-xs text-gray-500">{selectedJobForModal.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedJobForModal(null)}
                  className="p-2 text-gray-400 hover:text-navy-900 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Match Dimension Breakdown Bars */}
              <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-navy-900">AI Compatibility Dimensions</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500">Skills Match:</span>
                    <p className="font-extrabold text-teal-700 text-sm">{selectedJobForModal.matchScoreBreakdown.skillsMatch}%</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Experience Fit:</span>
                    <p className="font-extrabold text-navy-900 text-sm">{selectedJobForModal.matchScoreBreakdown.experienceMatch}%</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Location & Visa:</span>
                    <p className="font-extrabold text-teal-700 text-sm">{selectedJobForModal.matchScoreBreakdown.locationMatch}%</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Salary Alignment:</span>
                    <p className="font-extrabold text-navy-900 text-sm">{selectedJobForModal.matchScoreBreakdown.salaryMatch}%</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Culture & Work Style:</span>
                    <p className="font-extrabold text-navy-900 text-sm">{selectedJobForModal.matchScoreBreakdown.cultureMatch}%</p>
                  </div>
                </div>
              </div>

              {/* AI Fit Analysis Report */}
              {loadingAiAnalysis ? (
                <div className="py-8 text-center space-y-2">
                  <RefreshCw className="w-8 h-8 text-teal-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-gray-700">ElKairon AI is analyzing compatibility...</p>
                </div>
              ) : detailedAiAnalysis ? (
                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
                    <p className="font-bold text-teal-900 mb-1">Executive Fit Summary:</p>
                    <p className="text-teal-800 leading-relaxed">{detailedAiAnalysis.fitSummary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="font-bold text-teal-800 mb-1">Key Matching Strengths:</p>
                      <ul className="list-disc pl-4 space-y-1 text-gray-700">
                        {detailedAiAnalysis.keyStrengths?.map((s: string, i: number) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="font-bold text-gold-700 mb-1">Skill Gaps to Address:</p>
                      <ul className="list-disc pl-4 space-y-1 text-gray-700">
                        {detailedAiAnalysis.skillGaps?.map((g: string, i: number) => (
                          <li key={i}>{g}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-navy-900 text-white rounded-2xl">
                    <p className="font-bold text-gold-400 mb-1">Visa & Relocation Pathway:</p>
                    <p className="text-gray-300">{detailedAiAnalysis.visaPathwayRecommendation}</p>
                  </div>
                </div>
              ) : null}

              {/* Modal Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedJobForModal(null)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleApplyToJob(selectedJobForModal);
                    setSelectedJobForModal(null);
                  }}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1.5"
                >
                  <span>1-Click Apply Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
