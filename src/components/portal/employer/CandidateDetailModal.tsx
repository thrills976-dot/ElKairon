import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, CheckCircle2, Award, Star, MapPin, Globe, ShieldCheck, 
  FileText, Calendar, MessageSquare, Briefcase, Zap, Download, 
  ExternalLink, ArrowRight, UserCheck, Languages, GraduationCap 
} from 'lucide-react';
import { PreVettedCandidate } from '../../../types/recruitment';
import toast from 'react-hot-toast';

interface CandidateDetailModalProps {
  candidate: PreVettedCandidate | null;
  isOpen: boolean;
  onClose: () => void;
  onScheduleInterview: (candidate: PreVettedCandidate) => void;
  onSendMessage: (candidate: PreVettedCandidate) => void;
  onExtendOffer: (candidate: PreVettedCandidate) => void;
}

export function CandidateDetailModal({
  candidate,
  isOpen,
  onClose,
  onScheduleInterview,
  onSendMessage,
  onExtendOffer
}: CandidateDetailModalProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'compliance' | 'skills'>('overview');

  if (!isOpen || !candidate) return null;

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
        {/* Modal Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-navy-900 via-navy-800 to-teal-950 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-teal-400 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 p-1.5 bg-teal-500 text-white rounded-lg shadow-md">
                <ShieldCheck size={16} />
              </div>
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-teal-400/20 text-teal-300 border border-teal-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                  {candidate.sector}
                </span>
                {candidate.badge && (
                  <span className="px-3 py-0.5 rounded-full bg-gold-400/20 text-gold-300 border border-gold-400/30 text-[10px] font-extrabold uppercase tracking-wider">
                    ★ {candidate.badge}
                  </span>
                )}
                {candidate.fastTrackEligible && (
                  <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Zap size={10} /> § 81a Fast-Track Verified
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                {candidate.name}
              </h2>
              <p className="text-sm text-teal-200 font-medium">{candidate.title}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-300 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-teal-400" /> Currently: {candidate.location}
                </span>
                <span className="flex items-center gap-1">
                  <Globe size={14} className="text-gold-400" /> Relocation Target: {candidate.targetRelocation}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" /> {candidate.rating} / 5.0 ElKairon Score
                </span>
              </div>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex items-center gap-6 mt-6 border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setActiveSubTab('overview')}
              className={`pb-1 transition-colors relative ${
                activeSubTab === 'overview' ? 'text-teal-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Candidate Overview
              {activeSubTab === 'overview' && (
                <motion.div layoutId="candModalTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('compliance')}
              className={`pb-1 transition-colors relative ${
                activeSubTab === 'compliance' ? 'text-teal-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Legal & Fast-Track Dossier ({candidate.documentsReady.length} Files Ready)
              {activeSubTab === 'compliance' && (
                <motion.div layoutId="candModalTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('skills')}
              className={`pb-1 transition-colors relative ${
                activeSubTab === 'skills' ? 'text-teal-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Skills & Equivalency Matrix
              {activeSubTab === 'skills' && (
                <motion.div layoutId="candModalTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-400" />
              )}
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
          {activeSubTab === 'overview' && (
            <div className="space-y-6">
              {/* Executive Summary */}
              <div className="bg-teal-50/50 p-5 rounded-2xl border border-teal-100 space-y-2">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-teal-900 flex items-center gap-1.5">
                  <UserCheck size={16} className="text-teal-700" />
                  <span>ElKairon Assessment Center Profile</span>
                </h3>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{candidate.bio}</p>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Experience</div>
                  <div className="text-lg font-bold text-navy-900 mt-0.5">{candidate.experienceYears} Years</div>
                  <div className="text-[11px] text-teal-600 font-medium">Verified Records</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">German Level</div>
                  <div className="text-sm font-bold text-navy-900 mt-0.5">{candidate.germanLevel}</div>
                  <div className="text-[11px] text-emerald-600 font-medium">Certificate on file</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Availability</div>
                  <div className="text-sm font-bold text-navy-900 mt-0.5">{candidate.availability}</div>
                  <div className="text-[11px] text-teal-600 font-medium">Fast-Track Ready</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Target Salary</div>
                  <div className="text-sm font-bold text-navy-900 mt-0.5">{candidate.salaryExpectation}</div>
                  <div className="text-[11px] text-gray-500 font-medium">Standard Tariff</div>
                </div>
              </div>

              {/* Education & Licensure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 bg-white rounded-2xl border border-gray-200 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-2">
                    <GraduationCap size={16} className="text-teal-600" />
                    <span>Academic & Vocational Degree</span>
                  </h4>
                  <p className="text-sm font-bold text-navy-900">{candidate.education}</p>
                  <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 space-y-1">
                    <div className="font-semibold text-navy-900">Anabin / ZAB Equivalency:</div>
                    <p className="text-[11px] text-emerald-700 font-medium">✓ Verified equivalent to German Vocational / University standard.</p>
                  </div>
                </div>

                <div className="p-5 bg-white rounded-2xl border border-gray-200 space-y-3 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 flex items-center gap-2">
                    <Languages size={16} className="text-teal-600" />
                    <span>Language Verification Dossier</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">German Proficiency:</span>
                      <span className="font-bold text-navy-900">{candidate.germanLevel}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">English Proficiency:</span>
                      <span className="font-bold text-navy-900">{candidate.englishLevel}</span>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span className="text-gray-600 font-medium">Speaking & Clinical Mock Test:</span>
                      <span className="font-bold text-emerald-600">Passed (Grade 1.3)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'compliance' && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
                <ShieldCheck size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-900">
                    Pre-Approved for § 81a Accelerated Skilled Worker Procedure
                  </h4>
                  <p className="text-xs text-emerald-800 mt-1">
                    All foundational credentials have been translated, apostilled, and vetted by ElKairon legal counsel. 
                    Employer only needs to provide the signed employment contract to trigger direct embassy pre-approval within 14 business days.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Verified Documents Ready for Immediate Download
                </h4>
                <div className="divide-y divide-gray-100 border border-gray-200 rounded-2xl overflow-hidden bg-white">
                  {candidate.documentsReady.map((doc, idx) => (
                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                          <FileText size={18} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-navy-900">{doc}</div>
                          <div className="text-[10px] text-gray-500">Official Certified Translation & Apostille Verified</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => toast.success(`Downloading preview for ${doc}`)}
                        className="px-3 py-1.5 text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <Download size={14} /> Preview
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900 mb-3">
                  Verified Technical & Clinical Competencies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-xl bg-navy-50 text-navy-900 text-xs font-bold border border-navy-100 flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={14} className="text-teal-600" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900">
                  Equivalency Recognition Status
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  <span className="font-bold text-navy-900">Current Status:</span> {candidate.credentialsStatus}
                </p>
                <div className="text-xs text-teal-700 font-medium">
                  ✓ ElKairon handles all post-arrival registration, integration course enrollment, and local chamber formalities on behalf of the hiring company.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Bar */}
        <div className="p-5 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSendMessage(candidate)}
              className="px-4 py-2.5 bg-white border border-gray-300 hover:border-navy-900 text-navy-900 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
            >
              <MessageSquare size={15} />
              <span>Direct Message</span>
            </button>
            <button
              type="button"
              onClick={() => onScheduleInterview(candidate)}
              className="px-4 py-2.5 bg-teal-50 border border-teal-300 hover:bg-teal-100 text-teal-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <Calendar size={15} />
              <span>Schedule Fast-Track Interview</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onExtendOffer(candidate)}
            className="px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest flex items-center gap-2 transition-all shadow-md"
          >
            <span>Extend Employment Offer</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
