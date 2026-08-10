import { useState } from 'react';
import { CandidateDashboard } from './CandidateDashboard';
import { EmployerDashboard } from './EmployerDashboard';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, LogOut, Briefcase, User as UserIcon, Sparkles, CheckCircle2, ArrowRight, Key, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CandidateRegistration, EmployerRegistration } from './RegistrationForm';
import { AuthModal } from '../AuthModal';

export function Portal({ initialMode }: { initialMode?: "candidate" | "employer" }) {
  const { user, loading, role, setRole, loginAsGuestCandidate, loginAsGuestEmployer, logout } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer' | null>(initialMode || null);
  const [authOpen, setAuthOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  // If no user is logged in, show an inviting gateway with options to Sign In, Start 7-Step Registration, or Test Live Candidate Demo
  if (!user && !role) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 flex flex-col items-center justify-center">
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div
              key="gateway"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-3xl w-full border border-gray-100 space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI-Powered Global Recruitment Portal</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900">
                  Select Your Portal Gateway
                </h2>
                <p className="text-sm text-gray-500 max-w-lg mx-auto">
                  Experience intelligent AI candidate-job matching, ATS resume scoring, and direct international placements.
                </p>
              </div>

              {/* Instant 1-Click Demo Bar */}
              <div className="p-4 bg-gradient-to-r from-teal-50/80 via-white to-gold-50/80 rounded-2xl border border-teal-200/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-gold-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-navy-950">1-Click Live Interactive Demo</div>
                    <div className="text-[11px] text-gray-500">Explore complete dossiers, verified jobs & ATS tools instantly</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={loginAsGuestCandidate}
                    className="flex-1 sm:flex-initial px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <UserIcon size={13} />
                    <span>Candidate Demo</span>
                  </button>
                  <button
                    type="button"
                    onClick={loginAsGuestEmployer}
                    className="flex-1 sm:flex-initial px-3.5 py-2 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Briefcase size={13} className="text-gold-400" />
                    <span>Employer Demo</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Candidate Gateway Card */}
                <div className="p-6 md:p-8 border-2 border-teal-100 bg-gradient-to-b from-white to-teal-50/30 rounded-3xl hover:border-teal-500 transition-all flex flex-col justify-between space-y-6 shadow-sm">
                  <div className="space-y-3">
                    <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center shadow-md">
                      <UserIcon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900">I am a Candidate</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Complete our 7-step AI onboarding to unlock your AI match score, top 20 matched international jobs, and ATS resume optimizer.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('candidate')}
                      className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Start 7-Step AI Profile</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthOpen(true)}
                      className="w-full py-2.5 bg-white hover:bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <LogIn size={14} />
                      <span>Sign In to Candidate Portal</span>
                    </button>
                  </div>
                </div>

                {/* Employer Gateway Card */}
                <div className="p-6 md:p-8 border-2 border-gold-100 bg-gradient-to-b from-white to-gold-50/30 rounded-3xl hover:border-gold-500 transition-all flex flex-col justify-between space-y-6 shadow-sm">
                  <div className="space-y-3">
                    <div className="w-14 h-14 bg-navy-900 text-gold-400 rounded-2xl flex items-center justify-center shadow-md">
                      <Briefcase size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-navy-900">I am an Employer</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Post international vacancies, view pre-screened talent with verified AI readiness scores, and streamline visa sponsorship.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('employer')}
                      className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Register as Employer</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthOpen(true)}
                      className="w-full py-2.5 bg-white hover:bg-gray-50 text-navy-900 border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <LogIn size={14} />
                      <span>Sign In to Employer Portal</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-center border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-3">
                <span className="text-xs text-gray-500">Already have an existing registered account?</span>
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 underline uppercase tracking-wider flex items-center gap-1"
                >
                  <LogIn size={14} />
                  <span>Log In to Account</span>
                </button>
              </div>
            </motion.div>
          ) : selectedRole === 'candidate' ? (
            <CandidateRegistration
              onBack={() => setSelectedRole(null)}
              onSubmit={async (data) => {
                await setRole('candidate', data);
              }}
            />
          ) : (
            <EmployerRegistration
              onBack={() => setSelectedRole(null)}
              onSubmit={async (data) => {
                await setRole('employer', data);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // If role is not assigned yet in database for logged in user
  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 flex flex-col items-center justify-center py-12 px-4">
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div
              key="role-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl w-full border border-gray-100 space-y-6"
            >
              <h2 className="text-3xl font-display font-bold text-navy-900 text-center">Select Your Path</h2>
              <p className="text-gray-500 text-center text-sm">How would you like to use ElKairon Global Connect today?</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => setSelectedRole('candidate')}
                  className="p-8 border-2 border-gray-100 rounded-2xl hover:border-teal-500 hover:bg-teal-50/50 transition-all group flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserIcon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">I am a Candidate</h3>
                  <p className="text-xs text-gray-500">Find international jobs, complete AI matching, and optimize my CV.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('employer')}
                  className="p-8 border-2 border-gray-100 rounded-2xl hover:border-gold-500 hover:bg-gold-50/50 transition-all group flex flex-col items-center text-center space-y-3"
                >
                  <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900">I am an Employer</h3>
                  <p className="text-xs text-gray-500">Post jobs, access pre-screened talent, and manage global hiring.</p>
                </button>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex items-center gap-2 text-gray-500 hover:text-navy-900 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </motion.div>
          ) : selectedRole === 'candidate' ? (
            <CandidateRegistration
              onBack={() => setSelectedRole(null)}
              onSubmit={async (data) => {
                await setRole('candidate', data);
              }}
            />
          ) : (
            <EmployerRegistration
              onBack={() => setSelectedRole(null)}
              onSubmit={async (data) => {
                await setRole('employer', data);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Active User in Candidate Mode - Profile Editor Overlay
  if (role === 'candidate' && isEditingProfile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
        <CandidateRegistration
          onBack={() => setIsEditingProfile(false)}
          onSubmit={async (data) => {
            await setRole('candidate', data);
            setIsEditingProfile(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      {/* Top Session & Logout Navigation Bar */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-600">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span>Active Session: {user?.displayName || user?.email || 'Candidate'}</span>
          <span className="px-2 py-0.5 rounded bg-navy-900 text-white text-[10px] uppercase tracking-wider font-extrabold">
            {role}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {role === 'candidate' && (
            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="px-3 py-1.5 bg-white border border-gray-200 hover:border-teal-600 text-navy-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              Re-run 7-Step AI Profile
            </button>
          )}

          <button
            type="button"
            onClick={logout}
            className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            title="Log out of session"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {role === 'candidate' ? (
        <CandidateDashboard onOpenProfileEditor={() => setIsEditingProfile(true)} />
      ) : (
        <EmployerDashboard />
      )}
    </div>
  );
}
