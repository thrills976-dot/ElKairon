import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Scale, 
  Globe, 
  Building2, 
  UserCheck, 
  AlertCircle, 
  Search,
  Download
} from 'lucide-react';

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  isAccepted?: boolean;
}

export function TermsAndConditionsModal({
  isOpen,
  onClose,
  onAccept,
  isAccepted = false
}: TermsAndConditionsModalProps) {
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  const sections = [
    {
      id: 'section-1',
      number: 'Article 1',
      title: 'Global Talent Representation & Verification',
      icon: UserCheck,
      content: [
        'ElKairon Global Connect acts as a certified cross-border recruitment and relocation consultancy connecting pre-qualified professionals from Southern Africa with verified employers across Europe, the Middle East, North America, and the Pacific.',
        'By creating an account, candidates authorize ElKairon Global Connect to audit credentials, diplomas, trade certificates, and professional references with original issuing bodies, academic institutions, and national examination boards.',
        'Candidates certify that all uploaded information—including curriculum vitae, years of experience, employment history, and statutory documents—is truthful, accurate, and up-to-date.'
      ]
    },
    {
      id: 'section-2',
      number: 'Article 2',
      title: 'Employer Obligations & Fair Labor Guarantees',
      icon: Building2,
      content: [
        'All participating international employers undergo strict verification and must comply with host-nation labor standards, including the provision of formal employment contracts, safe working conditions, and non-discriminatory workplace practices.',
        'Employers must sponsor legal work permits, provide statutory health insurance, and guarantee statutory minimum wage or prevailing industry award rates.',
        'Under ElKairon\'s 90-Day Placement Guarantee, if a recruited candidate does not pass probation due to verified role mismatch, ElKairon undertakes replacement sourcing without additional commission fees.'
      ]
    },
    {
      id: 'section-3',
      number: 'Article 3',
      title: '4-Stage Milestone Payment Architecture',
      icon: Scale,
      content: [
        'Stage 1 (10%): File initiation, CIPA qualification equivalence evaluation, and ATS CV formatting. This administrative fee covers initial dossier processing.',
        'Stage 2 (20%): Payable only upon receipt and acceptance of an official, verified written Employment Offer Letter from the host employer.',
        'Stage 3 (30%): Payable exclusively upon official approval and issuance of the host-nation Work Permit / Quota clearance by the relevant Ministry of Labor or Immigration Authority.',
        'Stage 4 (40%): Final disbursement payable solely upon passport visa stamping and receipt of authorized travel itinerary and entry documentation.',
        'Candidates are never required to pay full fees upfront; every installment is strictly conditioned upon verified documentary milestones.'
      ]
    },
    {
      id: 'section-4',
      number: 'Article 4',
      title: 'Data Protection & Cross-Border Privacy (GDPR / POPIA)',
      icon: Lock,
      content: [
        'Personal data—including contact records, identity passports, educational transcripts, and work history—is encrypted in transit and at rest using enterprise-grade security protocols.',
        'Data is processed strictly for the purpose of matching employment opportunities, processing visa applications, and fulfilling legal immigration requirements.',
        'Users maintain the right to inspect, update, or request the permanent deletion of their profile and uploaded documents at any time via the account settings portal.'
      ]
    },
    {
      id: 'section-5',
      number: 'Article 5',
      title: 'Zero Tolerance Anti-Fraud & Document Integrity',
      icon: ShieldCheck,
      content: [
        'The submission of fabricated qualifications, counterfeit trade certificates, or fraudulent reference letters results in immediate account termination and permanent blacklisting from international placement registries.',
        'ElKairon Global Connect cooperates with international immigration authorities to maintain the absolute integrity of legal relocation channels.'
      ]
    }
  ];

  const filteredSections = sections.filter(sec => {
    if (activeSection !== 'all' && sec.id !== activeSection) return false;
    if (!searchFilter.trim()) return true;
    const query = searchFilter.toLowerCase();
    return (
      sec.title.toLowerCase().includes(query) ||
      sec.content.some(c => c.toLowerCase().includes(query))
    );
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 40) {
      setHasScrolledToBottom(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="terms-modal-overlay"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-navy-950/85 backdrop-blur-md p-4 sm:p-6"
        >
          <motion.div
            id="terms-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-navy-950 text-white p-6 sm:p-8 flex items-center justify-between border-b-2 border-gold-500 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gold-500 text-navy-950 flex items-center justify-center shrink-0 shadow-lg">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold tracking-widest uppercase bg-navy-800 text-gold-400 px-2.5 py-0.5 rounded-full border border-gold-400/30">
                      Legal Compliance
                    </span>
                    <span className="text-[10px] font-bold text-teal-400">Effective 2025</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                    Terms & Conditions of Service
                  </h2>
                </div>
              </div>

              <button
                id="close-terms-modal-btn"
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Subheader Search & Filter Bar */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search terms & legal articles..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-navy-950 placeholder:text-slate-400 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setActiveSection('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    activeSection === 'all'
                      ? 'bg-navy-950 text-gold-400'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  All Articles
                </button>
                {sections.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      activeSection === s.id
                        ? 'bg-navy-950 text-gold-400'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {s.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div 
              onScroll={handleScroll}
              className="p-6 sm:p-8 overflow-y-auto space-y-8 text-navy-950 flex-1"
            >
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong className="font-bold">Mandatory Pre-Registration Disclosure:</strong> By proceeding with registration as a Candidate or Employer on ElKairon Global Connect, you acknowledge that you have carefully read, understood, and agreed to the statutory provisions outlined below.
                </div>
              </div>

              {filteredSections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <div 
                    key={sec.id}
                    id={sec.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4"
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center shrink-0 font-bold">
                        <Icon size={18} />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-700 block">
                          {sec.number}
                        </span>
                        <h3 className="font-display text-lg font-bold text-navy-950">
                          {sec.title}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      {sec.content.map((paragraph, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 size={16} className="text-teal-600 shrink-0 mt-1" />
                          <p className="text-xs text-slate-700 leading-relaxed font-normal">
                            {paragraph}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="bg-slate-100 rounded-2xl p-6 border border-slate-200 text-center">
                <h4 className="font-display font-bold text-navy-950 text-base mb-1">
                  Questions regarding legal terms or placement agreements?
                </h4>
                <p className="text-xs text-slate-600 mb-4">
                  Our compliance officers are available for certified document verification consultations.
                </p>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-700">
                  <ShieldCheck size={16} />
                  <span>Licensed under International Labor Standards & CIPA Quality Framework</span>
                </div>
              </div>
            </div>

            {/* Footer with Action Buttons */}
            <div className="bg-slate-50 p-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 size={16} className="text-teal-600" />
                <span>Verified Legal Document & Placement Agreement</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  id="close-terms-btn"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>

                {onAccept && (
                  <button
                    id="accept-terms-btn"
                    onClick={() => {
                      onAccept();
                      onClose();
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={16} />
                    <span>I Accept These Terms</span>
                  </button>
                )}
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
