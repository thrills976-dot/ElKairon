import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, CheckCircle, Clock, Calendar, ArrowRight, 
  FileCheck, ShieldCheck, Zap, Star, MapPin, ChevronRight, 
  Plus, MessageSquare, FileText, Check, Award, AlertCircle 
} from 'lucide-react';
import toast from 'react-hot-toast';

export interface PipelineCandidate {
  id: string;
  name: string;
  avatar: string;
  jobTitle: string;
  sector: string;
  stage: 'screening' | 'interview' | 'offer' | 'compliance' | 'placed';
  appliedDate: string;
  interviewDate?: string;
  matchScore: number;
  fastTrack: boolean;
  germanLevel: string;
  notes?: string;
}

const INITIAL_PIPELINE_CANDIDATES: PipelineCandidate[] = [
  {
    id: 'pipe-1',
    name: 'Dr. Amina Benali',
    avatar: 'https://images.unsplash.com/photo-1594824813682-1e967a14ecb3?auto=format&fit=crop&q=80&w=300',
    jobTitle: 'Senior ICU Specialist Nurse',
    sector: 'Healthcare',
    stage: 'interview',
    appliedDate: '2026-08-05',
    interviewDate: 'Thursday, 14:00 CET',
    matchScore: 98,
    fastTrack: true,
    germanLevel: 'B2 Certified',
    notes: 'Telc B2 verified. Video interview scheduled with Head of Clinical Nursing.'
  },
  {
    id: 'pipe-2',
    name: 'Marko Petrovic',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    jobTitle: 'Master Electrician',
    sector: 'Construction',
    stage: 'compliance',
    appliedDate: '2026-07-29',
    matchScore: 96,
    fastTrack: true,
    germanLevel: 'B1 Working',
    notes: 'Contract accepted. § 81a Power of Attorney submitted to Ausländerbehörde Frankfurt.'
  },
  {
    id: 'pipe-3',
    name: 'Fatima Zahra Alami',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    jobTitle: 'Front Office & Guest Relations Manager',
    sector: 'Hospitality',
    stage: 'compliance',
    appliedDate: '2026-08-01',
    matchScore: 94,
    fastTrack: true,
    germanLevel: 'B2 Certified',
    notes: 'Federal Employment Agency pre-approval (Vorabzustimmung) approved.'
  },
  {
    id: 'pipe-4',
    name: 'Arjun Nair',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300',
    jobTitle: 'Cloud DevOps Architect',
    sector: 'Technology',
    stage: 'placed',
    appliedDate: '2026-07-15',
    matchScore: 99,
    fastTrack: true,
    germanLevel: 'A1 (English C2)',
    notes: 'EU Blue Card § 18g issued! Relocation to Berlin completed.'
  },
  {
    id: 'pipe-5',
    name: 'Samuel Kiprop',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    jobTitle: 'Geriatric Care Specialist',
    sector: 'Healthcare',
    stage: 'screening',
    appliedDate: '2026-08-09',
    matchScore: 92,
    fastTrack: false,
    germanLevel: 'B1 Level',
    notes: 'Reviewing clinical logbook & Defizitbescheid adaptation curriculum.'
  },
  {
    id: 'pipe-6',
    name: 'Chef Alessandro Morini',
    avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=300',
    jobTitle: 'Executive Sous Chef',
    sector: 'Hospitality',
    stage: 'offer',
    appliedDate: '2026-08-03',
    matchScore: 97,
    fastTrack: true,
    germanLevel: 'B1 German',
    notes: 'Offer package sent including alpine resort housing allowance.'
  }
];

interface HiringPipelineProps {
  onScheduleInterview: (candidate: any) => void;
  onOpenCompliance: () => void;
  onSendMessage: (candidate: any) => void;
}

export function HiringPipeline({ onScheduleInterview, onOpenCompliance, onSendMessage }: HiringPipelineProps) {
  const [candidates, setCandidates] = useState<PipelineCandidate[]>(INITIAL_PIPELINE_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<PipelineCandidate | null>(null);

  const moveCandidate = (id: string, nextStage: PipelineCandidate['stage']) => {
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, stage: nextStage } : c));
    toast.success(`Candidate advanced to ${getStageTitle(nextStage)}`);
  };

  const getStageTitle = (stage: PipelineCandidate['stage']) => {
    switch (stage) {
      case 'screening': return '1. Screening & Pre-Vet';
      case 'interview': return '2. Interview Scheduled';
      case 'offer': return '3. Offer Extended';
      case 'compliance': return '4. Compliance & Visa (§81a)';
      case 'placed': return '5. Placed & Relocated';
    }
  };

  const stages: { key: PipelineCandidate['stage']; title: string; color: string; desc: string }[] = [
    { key: 'screening', title: 'Screening & Pre-Vet', color: 'border-blue-500', desc: 'Credential verification' },
    { key: 'interview', title: 'Interviewing', color: 'border-teal-500', desc: 'Technical & clinical calls' },
    { key: 'offer', title: 'Offer Extended', color: 'border-amber-500', desc: 'Contract negotiations' },
    { key: 'compliance', title: 'Compliance & Visa', color: 'border-purple-500', desc: '§81a fast-track processing' },
    { key: 'placed', title: 'Fast-Track Placed', color: 'border-emerald-500', desc: 'Relocated & active' },
  ];

  return (
    <div className="space-y-6">
      {/* Pipeline Summary Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-3xl border border-gray-100 shadow-sm gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-navy-900 font-display">Active Candidate Progress Pipeline</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
              {candidates.length} In Progress
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Track candidates step-by-step from initial pre-screening to final work authorization and on-site relocation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenCompliance}
            className="px-4 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <FileCheck size={16} />
            <span>Compliance Documents</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageCandidates = candidates.filter(c => c.stage === stage.key);
          return (
            <div
              key={stage.key}
              className="bg-gray-50/70 rounded-3xl p-4 border border-gray-200 flex flex-col min-h-[480px]"
            >
              {/* Stage Header */}
              <div className="pb-3 mb-3 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-navy-900">
                    {stage.title}
                  </h3>
                  <div className="text-[10px] text-gray-400 font-medium">{stage.desc}</div>
                </div>
                <span className="w-6 h-6 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center">
                  {stageCandidates.length}
                </span>
              </div>

              {/* Stage Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {stageCandidates.map((c) => (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-teal-500 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-100"
                        />
                        <div>
                          <div className="font-bold text-xs text-navy-900">{c.name}</div>
                          <div className="text-[10px] text-gray-500 truncate max-w-[130px]">{c.jobTitle}</div>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-teal-50 text-teal-800 border border-teal-100">
                        {c.matchScore}%
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-gray-100 text-gray-700">
                        {c.germanLevel}
                      </span>
                      {c.fastTrack && (
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-800 flex items-center gap-0.5">
                          <Zap size={9} /> §81a
                        </span>
                      )}
                    </div>

                    {c.interviewDate && (
                      <div className="p-2 bg-teal-50/70 rounded-lg text-[10px] text-teal-900 flex items-center gap-1.5 font-medium">
                        <Calendar size={12} className="text-teal-600 shrink-0" />
                        <span className="truncate">{c.interviewDate}</span>
                      </div>
                    )}

                    {c.notes && (
                      <p className="text-[10px] text-gray-500 italic bg-gray-50 p-2 rounded-lg border border-gray-100">
                        "{c.notes}"
                      </p>
                    )}

                    {/* Progress Control Actions */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-1">
                      <button
                        type="button"
                        onClick={() => onSendMessage(c)}
                        className="p-1.5 text-gray-400 hover:text-navy-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Send Message"
                      >
                        <MessageSquare size={13} />
                      </button>

                      {stage.key === 'screening' && (
                        <button
                          type="button"
                          onClick={() => {
                            onScheduleInterview(c);
                            moveCandidate(c.id, 'interview');
                          }}
                          className="px-2.5 py-1 bg-teal-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-teal-700 transition-colors flex items-center gap-1"
                        >
                          <span>Invite</span>
                          <ChevronRight size={12} />
                        </button>
                      )}

                      {stage.key === 'interview' && (
                        <button
                          type="button"
                          onClick={() => moveCandidate(c.id, 'offer')}
                          className="px-2.5 py-1 bg-amber-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-amber-700 transition-colors flex items-center gap-1"
                        >
                          <span>Make Offer</span>
                          <ChevronRight size={12} />
                        </button>
                      )}

                      {stage.key === 'offer' && (
                        <button
                          type="button"
                          onClick={() => moveCandidate(c.id, 'compliance')}
                          className="px-2.5 py-1 bg-purple-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-purple-700 transition-colors flex items-center gap-1"
                        >
                          <span>Trigger §81a</span>
                          <ChevronRight size={12} />
                        </button>
                      )}

                      {stage.key === 'compliance' && (
                        <button
                          type="button"
                          onClick={() => moveCandidate(c.id, 'placed')}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors flex items-center gap-1"
                        >
                          <span>Confirm Placed</span>
                          <Check size={12} />
                        </button>
                      )}

                      {stage.key === 'placed' && (
                        <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle size={12} /> Active
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}

                {stageCandidates.length === 0 && (
                  <div className="h-32 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-center p-4">
                    <span className="text-xs text-gray-400">No candidates in this stage</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
