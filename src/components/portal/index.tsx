import { useState } from 'react';
import { CandidateDashboard } from './CandidateDashboard';
import { EmployerDashboard } from './EmployerDashboard';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, LogOut, Briefcase, User as UserIcon, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CandidateRegistration, EmployerRegistration } from './RegistrationForm';
import { AuthModal } from '../AuthModal';

export function Portal({ initialMode }: { initialMode?: "candidate" | "employer" }) {
  const { user, loading, role, setRole, logout } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer' | null>(initialMode || null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<'candidate' | 'employer'>('candidate');
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const openAuthWithRole = (targetRole: 'candidate' | 'employer') => {
    setAuthDefaultRole(targetRole);
    setAuthOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"></div>
          <span className="text-xs font-semibold text-gray-500">Loading Secure Portal...</span>
        </div>
      </div>
    );
  }

  // If no user is logged in, show production gateway
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 flex flex-col items-center justify-center">
        <AuthModal 
          isOpen={authOpen} 
          onClose={() => setAuthOpen(false)} 
          defaultRole={authDefaultRole}
        />
        
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
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>AI-Powered Global Recruitment Portal</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900">
                  Select Your Portal Gateway
                </h2>
                <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
                  Accredited international talent placement, AI candidate-job matching, and direct cross-border employer hiring.
                </p>
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
                      Complete our comprehensive 7-step AI onboarding to unlock your verified placement score, top 20 matched international jobs, and ATS resume optimizer.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('candidate')}
                      className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    >
                      <span>Start 7-Step AI Profile</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuthWithRole('candidate')}
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
                      Post international vacancies, view pre-screened African and global talent with verified AI readiness scores, and manage work visa sponsorships.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('employer')}
                      className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    >
                      <span>Register as Employer</span>
                      <ArrowRight size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openAuthWithRole('employer')}
                      className="w-full py-2.5 bg-white hover:bg-gray-50 text-navy-900 border border-gray-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <LogIn size={14} />
                      <span>Sign In to Employer Portal</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 text-center border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={15} className="text-teal-600 shrink-0" />
                  <span>Licensed & Certified International Placement Network</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Already have an account?</span>
                  <button
                    type="button"
                    onClick={() => setAuthOpen(true)}
                    className="font-bold text-teal-700 hover:text-teal-800 underline uppercase tracking-wider flex items-center gap-1"
                  >
                    <LogIn size={13} />
                    <span>Log In</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : selectedRole === 'candidate' ? (
            <CandidateRegistration
              onBack={() => setSelectedRole(null)}
              onSubmit={async (data) => {
                await setRole('candidate', data);
                setSelectedRole(null);
              }}
            />
          ) : (
            <EmployerRegistration
              onBack={() => setSelectedRole(null)}
              onSubmit={async (data) => {
                await setRole('employer', data);
                setSelectedRole(null);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // If user is authenticated but hasn't selected a role yet
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
              <h2 className="text-3xl font-display font-bold text-navy-900 text-center">Complete Your Setup</h2>
              <p className="text-gray-500 text-center text-sm">Please select your account type to proceed:</p>

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
                setSelectedRole(null);
              }}
            />
          ) : (
            <EmployerRegistration
              onBack={() => setSelectedRole(null)}
              onSubmit={async (data) => {
                await setRole('employer', data);
                setSelectedRole(null);
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
          <span className="w-2 h-2 rounded-full bg-teal-500" />
          <span>Signed in as: <strong className="text-navy-950">{user?.displayName || user?.email || 'Authenticated User'}</strong></span>
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
              Update 7-Step AI Profile
            </button>
          )}

          <button
            type="button"
            onClick={logout}
            className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            title="Log out of account"
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
