import { useState } from 'react';
import { CandidateDashboard } from './CandidateDashboard';
import { EmployerDashboard } from './EmployerDashboard';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Briefcase, User as UserIcon, UserCog } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CandidateRegistration, EmployerRegistration } from './RegistrationForm';
import { AuthModal } from '../AuthModal';
import { RoleSelectionView } from './RoleSelectionView';
import { AuthErrorBoundary } from '../common/AuthErrorBoundary';
import { ProfileManagementModal } from './ProfileManagementModal';

export function Portal({ initialMode }: { initialMode?: "candidate" | "employer" }) {
  const { user, loading, role, setRole, logout } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer' | null>(initialMode || null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<'candidate' | 'employer'>('candidate');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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

  return (
    <AuthErrorBoundary fallbackMessage="Unable to load the portal dashboard. Please refresh your session or re-authenticate.">
      {/* If no user is logged in, show role selection gateway */}
      {!user ? (
        <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4 flex flex-col items-center justify-center">
          <AuthModal 
            isOpen={authOpen} 
            onClose={() => setAuthOpen(false)} 
            defaultRole={authDefaultRole}
          />
          
          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <RoleSelectionView
                key="gateway-role-select"
                isAuthenticated={false}
                onSelectRole={(chosenRole) => setSelectedRole(chosenRole)}
                onOpenSignIn={(targetRole) => openAuthWithRole(targetRole)}
              />
            ) : selectedRole === 'candidate' ? (
              <motion.div
                key="candidate-registration-flow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                <CandidateRegistration
                  onBack={() => setSelectedRole(null)}
                  onSubmit={async (data) => {
                    await setRole('candidate', data);
                    setSelectedRole(null);
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="employer-registration-flow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                <EmployerRegistration
                  onBack={() => setSelectedRole(null)}
                  onSubmit={async (data) => {
                    await setRole('employer', data);
                    setSelectedRole(null);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : !role ? (
        /* If user is authenticated but has not explicitly chosen a role yet */
        <div className="min-h-screen bg-gray-50 pt-28 flex flex-col items-center justify-center py-12 px-4">
          <AnimatePresence mode="wait">
            {!selectedRole ? (
              <RoleSelectionView
                key="auth-role-select"
                isAuthenticated={true}
                currentUserEmail={user.email || user.displayName || 'Authenticated User'}
                onSelectRole={async (chosenRole) => {
                  setSelectedRole(chosenRole);
                }}
                onOpenSignIn={() => {}}
                onLogout={logout}
              />
            ) : selectedRole === 'candidate' ? (
              <motion.div
                key="candidate-auth-onboarding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                <CandidateRegistration
                  onBack={() => setSelectedRole(null)}
                  onSubmit={async (data) => {
                    await setRole('candidate', data);
                    setSelectedRole(null);
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="employer-auth-onboarding"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                <EmployerRegistration
                  onBack={() => setSelectedRole(null)}
                  onSubmit={async (data) => {
                    await setRole('employer', data);
                    setSelectedRole(null);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : role === 'candidate' && isEditingProfile ? (
        /* Active Candidate Profile Editor */
        <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
          <CandidateRegistration
            onBack={() => setIsEditingProfile(false)}
            onSubmit={async (data) => {
              await setRole('candidate', data);
              setIsEditingProfile(false);
            }}
          />
        </div>
      ) : (
        /* Authenticated Active Dashboard */
        <div className="min-h-screen bg-gray-50 pt-24 pb-16">
          {/* Top Session & Role Management Bar */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 flex-wrap">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
              <span>Signed in as: <strong className="text-navy-950">{user?.displayName || user?.email || 'Authenticated User'}</strong></span>
              <span className="px-2.5 py-0.5 rounded-full bg-navy-900 text-white text-[10px] uppercase tracking-wider font-extrabold">
                {role === 'employer' ? '💼 Employer / Recruiter' : '👤 Candidate'}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Switch Role Button */}
              <button
                type="button"
                onClick={async () => {
                  const targetRole = role === 'candidate' ? 'employer' : 'candidate';
                  await setRole(targetRole);
                }}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-navy-900 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                title={`Switch view to ${role === 'candidate' ? 'Employer' : 'Candidate'} portal`}
              >
                {role === 'candidate' ? (
                  <>
                    <Briefcase size={13} className="text-teal-600" />
                    <span>Switch to Employer View</span>
                  </>
                ) : (
                  <>
                    <UserIcon size={13} className="text-teal-600" />
                    <span>Switch to Candidate View</span>
                  </>
                )}
              </button>

              {/* Manage Profile in Firestore Button */}
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                title="Manage profile and sanitize data in Firestore"
              >
                <UserCog size={13} className="text-teal-700" />
                <span>Manage Profile</span>
              </button>

              {role === 'candidate' && (
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(true)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-navy-900 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Edit 7-Step Wizard
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
            <CandidateDashboard onOpenProfileEditor={() => setIsProfileModalOpen(true)} />
          ) : (
            <EmployerDashboard />
          )}

          {/* Profile Management Modal with strict Firestore sanitization */}
          <ProfileManagementModal
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
          />
        </div>
      )}
    </AuthErrorBoundary>
  );
}
