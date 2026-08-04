import { useState, useEffect } from 'react';
import { CandidateDashboard } from './CandidateDashboard';
import { EmployerDashboard } from './EmployerDashboard';
import { useAuth } from '../../contexts/AuthContext';
import { loginWithGoogle, logout } from '../../lib/firebase';
import { LogIn, LogOut, Briefcase, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CandidateRegistration, EmployerRegistration } from './RegistrationForm';
import { AuthModal } from '../AuthModal';

export function Portal({ initialMode }: { initialMode?: "candidate" | "employer" }) {
  const { user, loading, role, setRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'candidate' | 'employer' | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
        <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h2 className="text-3xl font-display font-bold italic text-navy-900 mb-4">Welcome to Portal</h2>
          <p className="text-gray-500 mb-8">Please log in to access your dashboard.</p>
          <button 
            onClick={() => setAuthOpen(true)}
            className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-teal-700 transition-colors shadow-md"
          >
            <LogIn size={20} />
            Login / Register
          </button>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 flex flex-col items-center justify-center py-12">
        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div 
              key="role-select"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full"
            >
              <h2 className="text-3xl font-display font-bold italic text-navy-900 mb-2 text-center">Select Your Path</h2>
              <p className="text-gray-500 mb-8 text-center">How would you like to use ElKairon Global Connect?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setSelectedRole('candidate')}
                  className="p-8 border-2 border-gray-100 rounded-xl hover:border-teal-500 hover:bg-teal-50 transition-all group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UserIcon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">I am a Candidate</h3>
                  <p className="text-sm text-gray-500">I want to find international jobs and upload my CV.</p>
                </button>
                
                <button 
                  onClick={() => setSelectedRole('employer')}
                  className="p-8 border-2 border-gray-100 rounded-xl hover:border-gold-500 hover:bg-gold-50 transition-all group flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">I am an Employer</h3>
                  <p className="text-sm text-gray-500">I want to post jobs and hire global talent.</p>
                </button>
              </div>
              
              <button 
                onClick={logout}
                className="mt-8 mx-auto flex items-center gap-2 text-gray-500 hover:text-navy-900 text-sm font-bold uppercase tracking-widest transition-colors"
              >
                <LogOut size={16} /> Logout
              </button>
            </motion.div>
          ) : selectedRole === 'candidate' ? (
            <CandidateRegistration 
              key="candidate-form"
              onBack={() => setSelectedRole(null)} 
              onSubmit={async (data) => { await setRole('candidate', data); }} 
            />
          ) : (
            <EmployerRegistration 
              key="employer-form"
              onBack={() => setSelectedRole(null)} 
              onSubmit={async (data) => { await setRole('employer', data); }} 
            />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div className="fixed top-24 right-8 z-50 bg-white shadow-lg border border-gray-100 rounded-lg p-2 flex items-center gap-4">
         <span className="text-xs font-bold text-navy-900 ml-2">{user.displayName || user.email} ({role})</span>
         <button 
            onClick={logout}
            className="bg-red-50 text-red-600 p-2 rounded-md hover:bg-red-100 transition-colors"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
      </div>
      
      {role === 'candidate' ? <CandidateDashboard /> : <EmployerDashboard />}
    </div>
  );
}
