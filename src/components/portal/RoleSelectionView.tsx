import React from 'react';
import { motion } from 'motion/react';
import { User, Briefcase, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, LogIn, LogOut } from 'lucide-react';

interface RoleSelectionViewProps {
  onSelectRole: (role: 'candidate' | 'employer') => void;
  onOpenSignIn: (targetRole: 'candidate' | 'employer') => void;
  isAuthenticated?: boolean;
  currentUserEmail?: string;
  onLogout?: () => void;
}

export const RoleSelectionView: React.FC<RoleSelectionViewProps> = ({
  onSelectRole,
  onOpenSignIn,
  isAuthenticated = false,
  currentUserEmail,
  onLogout,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 space-y-8"
      >
        {/* Header Title & Context */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>ElKairon Global Placement Network</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-navy-900 tracking-tight">
            {isAuthenticated ? 'Select Your Account Type' : 'Choose Your Portal Role'}
          </h1>

          <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            {isAuthenticated
              ? `You are signed in as ${currentUserEmail || 'authenticated user'}. Please explicitly select your account role to access your dedicated dashboard.`
              : 'Please choose whether you are seeking international employment or hiring pre-screened global talent. Explicit selection prevents account misassignment.'}
          </p>
        </div>

        {/* Two Explicit Role Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Candidate Card */}
          <div className="p-6 md:p-8 border-2 border-teal-200 hover:border-teal-600 bg-gradient-to-b from-white via-teal-50/20 to-teal-50/50 rounded-3xl transition-all flex flex-col justify-between space-y-6 shadow-xs group">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <User size={28} />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold text-navy-900">
                    I am a Candidate
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-teal-100 text-teal-900 rounded-md">
                    Talent
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  International professionals and skilled specialists seeking career placement in Germany, the UK, Europe, and the UAE.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-teal-100/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 size={14} className="text-teal-600 shrink-0" />
                  <span>7-Step AI Profile & Skills Certification</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 size={14} className="text-teal-600 shrink-0" />
                  <span>AI-Matched Overseas Vacancies</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 size={14} className="text-teal-600 shrink-0" />
                  <span>Work Visa Sponsorship & Relocation Tracker</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                id="select-candidate-role-btn"
                onClick={() => onSelectRole('candidate')}
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>{isAuthenticated ? 'Proceed as Candidate' : 'Register as Candidate'}</span>
                <ArrowRight size={16} />
              </button>

              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={() => onOpenSignIn('candidate')}
                  className="w-full py-2.5 bg-white hover:bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <LogIn size={14} />
                  <span>Sign In as Candidate</span>
                </button>
              )}
            </div>
          </div>

          {/* Employer Card */}
          <div className="p-6 md:p-8 border-2 border-amber-200 hover:border-navy-900 bg-gradient-to-b from-white via-amber-50/20 to-amber-50/50 rounded-3xl transition-all flex flex-col justify-between space-y-6 shadow-xs group">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-navy-900 text-gold-400 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Briefcase size={28} />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-display font-bold text-navy-900">
                    I am an Employer
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-navy-900 rounded-md font-bold">
                    Enterprise
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Hospitals, engineering firms, hospitality groups, and enterprises seeking pre-screened, visa-ready international talent.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-amber-100/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 size={14} className="text-amber-600 shrink-0" />
                  <span>Access Pre-Screened Candidate Database</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 size={14} className="text-amber-600 shrink-0" />
                  <span>Post & Distribute International Jobs</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 size={14} className="text-amber-600 shrink-0" />
                  <span>§ 81a Fast-Track Visa & Document Vault</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                id="select-employer-role-btn"
                onClick={() => onSelectRole('employer')}
                className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                <span>{isAuthenticated ? 'Proceed as Employer' : 'Register as Employer'}</span>
                <ArrowRight size={16} />
              </button>

              {!isAuthenticated && (
                <button
                  type="button"
                  onClick={() => onOpenSignIn('employer')}
                  className="w-full py-2.5 bg-white hover:bg-gray-50 text-navy-900 border border-gray-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <LogIn size={14} />
                  <span>Sign In as Employer</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer info & Logout if authenticated */}
        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-teal-600 shrink-0" />
            <span>ISO 27001 Certified & GDPR Compliant International Portal</span>
          </div>

          {isAuthenticated && onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 uppercase tracking-wider text-[11px]"
            >
              <LogOut size={13} />
              <span>Sign Out of Account</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
