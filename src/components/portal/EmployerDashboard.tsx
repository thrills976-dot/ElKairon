import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, MapPin, Briefcase, Mail, CheckCircle, 
  Clock, Users, Building, Plus, X, Calendar, Check, ArrowRight, 
  Eye, Phone, Award, ShieldCheck, Zap, Sparkles, MessageSquare, 
  FileCheck, FileText, ChevronRight, UserCheck, TrendingUp, Settings, UserCog
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

import { CandidatePoolBrowser } from './employer/CandidatePoolBrowser';
import { HiringPipeline } from './employer/HiringPipeline';
import { ComplianceDocumentVault } from './employer/ComplianceDocumentVault';
import { EmployerMessagingView } from './employer/EmployerMessagingView';
import { EmployerAnalyticsCharts } from './employer/EmployerAnalyticsCharts';
import { ProfileManagementModal } from './ProfileManagementModal';
import { PostJobModal } from './employer/PostJobModal';
import { ScheduleInterviewModal } from './employer/ScheduleInterviewModal';
import { ExtendOfferModal } from './employer/ExtendOfferModal';
import { PreVettedCandidate } from '../../types/recruitment';

export function EmployerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'candidates' | 'pipeline' | 'analytics' | 'jobs' | 'applications' | 'compliance' | 'messages'>('candidates');
  const [isPostingJob, setIsPostingJob] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  
  // Modals for interview scheduling & offer extension
  const [interviewModalOpen, setInterviewModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [selectedCandidateForAction, setSelectedCandidateForAction] = useState<any>(null);

  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [appFilter, setAppFilter] = useState<string>('All');

  const formatDate = (dateVal: any) => {
    if (!dateVal) return 'Recently';
    if (typeof dateVal === 'string') return dateVal;
    if (typeof dateVal === 'number') return new Date(dateVal).toLocaleDateString();
    if (dateVal?.toDate && typeof dateVal.toDate === 'function') {
      return dateVal.toDate().toLocaleDateString();
    }
    if (dateVal?.seconds) {
      return new Date(dateVal.seconds * 1000).toLocaleDateString();
    }
    return 'Recently';
  };

  useEffect(() => {
    if (!user) return;
    
    // Fetch Jobs
    const qJobs = query(
      collection(db, 'jobs'), 
      where('employerId', '==', user.uid),
    );
    
    const unsubscribeJobs = onSnapshot(qJobs, (snapshot) => {
      const jobsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Safe timestamp sorting
      jobsData.sort((a: any, b: any) => {
        const timeA = a.createdAt?.seconds ? a.createdAt.seconds * 1000 : (new Date(a.createdAt || 0).getTime() || 0);
        const timeB = b.createdAt?.seconds ? b.createdAt.seconds * 1000 : (new Date(b.createdAt || 0).getTime() || 0);
        return timeB - timeA;
      });
      setJobs(jobsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'jobs');
      setLoading(false);
    });
    
    // Fetch Applications
    const qApps = query(
      collection(db, 'applications'),
      where('employerId', '==', user.uid)
    );
    
    const unsubscribeApps = onSnapshot(qApps, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(appsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'applications');
    });

    return () => {
      unsubscribeJobs();
      unsubscribeApps();
    };
  }, [user]);

  const handleUpdateApplicationStatus = async (appId: string, newStage: string, newStatus: string) => {
    try {
      const appRef = doc(db, 'applications', appId);
      await updateDoc(appRef, {
        stage: newStage,
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, stage: newStage, status: newStatus } : a));
      toast.success(`Application updated to: ${newStage}`);
    } catch (e) {
      console.warn('Fallback updating local application status', e);
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, stage: newStage, status: newStatus } : a));
      toast.success(`Application updated to: ${newStage}`);
    }
  };

  const filteredApplications = applications.filter(app => {
    if (appFilter === 'All') return true;
    return app.stage === appFilter || app.status === appFilter;
  });

  const handleOpenInterview = (candidate: any) => {
    setSelectedCandidateForAction(candidate);
    setInterviewModalOpen(true);
  };

  const handleOpenOffer = (candidate: any) => {
    setSelectedCandidateForAction(candidate);
    setOfferModalOpen(true);
  };

  const handleOpenMessage = (candidate: any) => {
    setActiveTab('messages');
    toast.success(`Connected to messaging thread for ${candidate.name || candidate}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-8">
        {/* Header with Title and Actions */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-teal-600" />
                <span>ElKairon Global Connect Employer Portal</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-gold-50 text-gold-700 border border-gold-200 text-[10px] font-bold">
                ⚡ § 81a Fast-Track Enabled
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-navy-900">
              International Recruitment & Compliance Portal
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1 max-w-2xl">
              Source pre-qualified talent across Healthcare, Construction, Hospitality, and Tech with accelerated German visa sponsorship (§ 81a) and verified credential equivalence.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button 
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="bg-white text-navy-900 border border-gray-200 px-4 py-3 rounded-2xl font-bold uppercase text-xs tracking-wider flex items-center gap-2 hover:bg-gray-50 transition-all shadow-xs"
              title="Manage employer corporate profile in Firestore"
            >
              <UserCog size={15} className="text-teal-600" />
              <span>Company Profile</span>
            </button>

            <button 
              type="button"
              onClick={() => setActiveTab('analytics')}
              className="bg-teal-50 text-teal-800 border border-teal-200 px-4 py-3 rounded-2xl font-bold uppercase text-xs tracking-wider flex items-center gap-2 hover:bg-teal-100 transition-all shadow-sm"
            >
              <TrendingUp size={15} className="text-teal-600" />
              <span>Analytics & Metrics</span>
            </button>

            <button 
              type="button"
              onClick={() => setIsPostingJob(true)}
              className="bg-navy-900 text-white px-5 py-3 rounded-2xl font-extrabold uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-navy-800 transition-all shadow-md"
            >
              <Plus size={16} />
              <span>Post Job Vacancy</span>
            </button>
          </div>
        </div>

        {/* Top 4 Performance & Pool Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border-t-4 border-teal-500 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Pre-Vetted Pool</span>
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <UserCheck size={16} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-navy-900">500+</h3>
            <p className="text-[11px] text-teal-600 font-semibold">100% Background & Language Verified</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border-t-4 border-gold-500 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Fast-Track Turnaround</span>
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap size={16} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-navy-900">14 Days</h3>
            <p className="text-[11px] text-amber-600 font-semibold">§ 81a Accelerated Embassy Priority</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border-t-4 border-blue-500 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">My Active Jobs</span>
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Briefcase size={16} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-navy-900">{jobs.filter(j => j.status === 'active').length}</h3>
            <p className="text-[11px] text-blue-600 font-semibold">{applications.length} direct applications</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border-t-4 border-emerald-500 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Compliance Approval</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-navy-900">99.4%</h3>
            <p className="text-[11px] text-emerald-600 font-semibold">Legal Equivalence & Work Permit</p>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm">
          {[
            { id: 'candidates', label: 'Pre-Vetted Candidate Pool', icon: UserCheck, count: '500+' },
            { id: 'pipeline', label: 'Hiring Progress Pipeline', icon: Zap, count: '6 In-Flight' },
            { id: 'analytics', label: 'Candidate Growth & Placement Analytics', icon: TrendingUp, count: 'Live Recharts' },
            { id: 'jobs', label: 'My Posted Vacancies', icon: Briefcase, count: jobs.length },
            { id: 'applications', label: 'Job Applications', icon: Users, count: applications.length },
            { id: 'compliance', label: 'Compliance & Legal Vault', icon: FileCheck, count: '100% Ready' },
            { id: 'messages', label: 'Communications & Messages', icon: MessageSquare, count: '3 Active' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 rounded-xl font-extrabold uppercase tracking-wider text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-navy-900 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-navy-900'
                }`}
              >
                <Icon size={15} className={isCurrent ? 'text-teal-400' : 'text-gray-400'} />
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  isCurrent ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Pre-Vetted Candidate Pool Browser */}
        {activeTab === 'candidates' && (
          <CandidatePoolBrowser
            onScheduleInterview={handleOpenInterview}
            onSendMessage={handleOpenMessage}
            onExtendOffer={handleOpenOffer}
          />
        )}

        {/* Tab 2: Candidate Hiring Pipeline (Kanban Board) */}
        {activeTab === 'pipeline' && (
          <HiringPipeline
            onScheduleInterview={handleOpenInterview}
            onOpenCompliance={() => setActiveTab('compliance')}
            onSendMessage={handleOpenMessage}
          />
        )}

        {/* Tab: Real-Time Recharts Candidate Growth & Placement Analytics */}
        {activeTab === 'analytics' && (
          <EmployerAnalyticsCharts />
        )}

        {/* Tab 3: My Posted Vacancies */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-navy-900 text-base">Active Job Postings</h3>
                <p className="text-xs text-gray-500">Live positions matched against ElKairon international talent pools.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPostingJob(true)}
                className="px-5 py-2.5 bg-teal-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-teal-700 transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Plus size={15} />
                <span>Post New Vacancy</span>
              </button>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-gray-500">Loading your vacancies...</div>
              ) : jobs.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 mb-4">
                    <Briefcase size={28} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-900 mb-1">No Jobs Posted Yet</h3>
                  <p className="text-xs text-gray-500 mb-6 max-w-sm">
                    Post your requirements for Healthcare, Construction, Hospitality, or Tech to automatically receive pre-qualified candidates.
                  </p>
                  <button 
                    type="button"
                    onClick={() => setIsPostingJob(true)}
                    className="bg-navy-900 text-white px-6 py-2.5 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-navy-800 transition-colors shadow-md"
                  >
                    Post a Vacancy
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {jobs.map((job: any) => (
                    <div key={job.id} className="p-6 hover:bg-gray-50/80 transition-colors">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-lg text-navy-900">{job.title}</h4>
                            <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${
                              job.status === 'active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {job.status}
                            </span>
                            {job.fastTrackEligible && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
                                <Zap size={10} /> Fast-Track §81a
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1 text-navy-900 font-semibold"><MapPin size={13} className="text-gray-500" /> {job.location}</span>
                            <span className="flex items-center gap-1"><Briefcase size={13} className="text-gray-500" /> {job.industry}</span>
                            {job.salary && <span className="font-bold text-teal-800">{job.salary}</span>}
                            <span>Posted: {formatDate(job.createdAt)}</span>
                          </div>

                          {job.skills && job.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {job.skills.slice(0, 4).map((s: string, i: number) => (
                                <span key={i} className="px-2 py-0.5 bg-gray-100 text-[10px] font-semibold text-gray-800 rounded-md border border-gray-200">
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm self-end md:self-center">
                          <div className="text-center px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                            <div className="font-bold text-navy-900 text-lg">
                              {applications.filter(a => a.jobId === job.id).length}
                            </div>
                            <div className="text-gray-600 text-[10px] uppercase font-bold tracking-widest">Applicants</div>
                          </div>

                          <button 
                            type="button"
                            onClick={() => setActiveTab('applications')}
                            className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold transition-colors"
                          >
                            View Applicants
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Tab 4: Direct Applications Received */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-extrabold text-navy-900 uppercase tracking-wider">Application Stage:</span>
                {['All', 'Submitted', 'Under Review', 'Interview Scheduled', 'Final Offer'].map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setAppFilter(stage)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      appFilter === stage ? 'bg-navy-900 text-white shadow-sm' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-gray-600">
                Showing {filteredApplications.length} candidate applications
              </span>
            </div>

            {filteredApplications.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center text-gray-600">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-navy-900 mb-1">No Applications in this Filter</h3>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  When international talent applies to your active jobs, they will appear here with pre-calculated match scores.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredApplications.map((app) => (
                  <div key={app.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-teal-500 transition-all">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <h4 className="font-bold text-navy-900 text-base">{app.jobTitle}</h4>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                          {app.stage || 'Submitted'}
                        </span>
                        {app.matchScore && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            ★ {app.matchScore}% Match
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        Applicant: <strong className="text-navy-900">{app.candidateName || `ID: ${app.candidateId?.slice(0, 10)}...`}</strong> • Applied: {formatDate(app.appliedAt || app.createdAt)} • {app.location || 'International Relocation'}
                      </p>
                      {app.notes && (
                        <p className="text-xs text-gray-600 italic bg-gray-50 p-2.5 rounded-xl border border-gray-100 max-w-xl">
                          "{app.notes}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleUpdateApplicationStatus(app.id, 'Under Review', 'reviewing')}
                        className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold hover:bg-gray-50 text-navy-900"
                      >
                        Review
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateApplicationStatus(app.id, 'Interview Scheduled', 'interview');
                          handleOpenInterview({ name: app.candidateName || 'Applicant', title: app.jobTitle });
                        }}
                        className="px-3.5 py-2 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold hover:bg-teal-100"
                      >
                        Schedule Interview
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleUpdateApplicationStatus(app.id, 'Final Offer', 'accepted');
                          handleOpenOffer({ name: app.candidateName || 'Applicant', title: app.jobTitle, id: app.candidateId });
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-sm"
                      >
                        Extend Offer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Compliance & Legal Document Vault */}
        {activeTab === 'compliance' && (
          <ComplianceDocumentVault />
        )}

        {/* Tab 6: Communications & Messages Desk */}
        {activeTab === 'messages' && (
          <EmployerMessagingView 
            onScheduleInterview={(name) => handleOpenInterview({ name, title: 'Candidate' })}
            onOpenCompliance={() => setActiveTab('compliance')}
          />
        )}
      </div>
      
      {/* Post Job Modal with Sector Presets & Fast-Track */}
      <PostJobModal
        isOpen={isPostingJob}
        onClose={() => setIsPostingJob(false)}
        onJobCreated={(newJob) => {
          setJobs(prev => [newJob, ...prev]);
          setActiveTab('jobs');
        }}
      />

      {/* Schedule Interview Modal */}
      <ScheduleInterviewModal
        isOpen={interviewModalOpen}
        onClose={() => setInterviewModalOpen(false)}
        candidateName={selectedCandidateForAction?.name || 'Selected Candidate'}
        candidateTitle={selectedCandidateForAction?.title || 'Specialist'}
      />

      {/* Extend Offer Modal */}
      <ExtendOfferModal
        isOpen={offerModalOpen}
        onClose={() => setOfferModalOpen(false)}
        candidateName={selectedCandidateForAction?.name || 'Selected Candidate'}
        candidateTitle={selectedCandidateForAction?.title || 'Specialist'}
        candidateId={selectedCandidateForAction?.id || 'cand-1'}
      />

      {/* Corporate Employer Profile Management Modal */}
      <ProfileManagementModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
}
