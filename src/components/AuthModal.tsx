import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, Briefcase } from 'lucide-react';
import toast from 'react-hot-toast';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === 'login' ? 'Successfully logged in!' : 'Account created successfully!');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-navy-900 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="p-8">
              <h2 className="text-3xl font-display italic font-bold text-navy-900 mb-2">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                {mode === 'login' 
                  ? 'Sign in to access your dashboard and preferences.' 
                  : 'Join ElKairon Global to find your next opportunity.'}
              </p>

              {mode === 'register' && (
                <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
                  <button
                    type="button"
                    onClick={() => setRole('candidate')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${role === 'candidate' ? 'bg-white shadow-sm text-navy-900' : 'text-gray-500 hover:text-navy-900'}`}
                  >
                    Candidate
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('employer')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${role === 'employer' ? 'bg-white shadow-sm text-navy-900' : 'text-gray-500 hover:text-navy-900'}`}
                  >
                    Employer
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-1">Full Name / Company</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {role === 'candidate' ? <User size={18} className="text-gray-400" /> : <Briefcase size={18} className="text-gray-400" />}
                      </div>
                      <input type="text" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" placeholder={role === 'candidate' ? 'John Doe' : 'Acme Corp'} />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input type="email" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" placeholder="you@example.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-navy-900 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input type="password" required className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all" placeholder="••••••••" />
                  </div>
                </div>

                <button type="submit" className="w-full py-3 bg-teal-600 text-white rounded-lg font-bold uppercase tracking-widest hover:bg-teal-700 transition-colors shadow-lg">
                  {mode === 'login' ? 'Sign In' : 'Register'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                {mode === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setMode('register')} className="text-teal-600 font-bold hover:underline">Register</button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button type="button" onClick={() => setMode('login')} className="text-teal-600 font-bold hover:underline">Sign In</button>
                  </p>
                )}
              </div>
              
              <div className="mt-6 text-center text-[10px] text-gray-400 max-w-xs mx-auto">
                By signing in, you agree to our <button type="button" onClick={() => { onClose(); window.dispatchEvent(new CustomEvent("open-privacy")); }} className="underline hover:text-teal-600">Privacy Policy</button> and <a href="#privacy" onClick={() => onClose()} className="underline hover:text-teal-600">Terms of Service</a>.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
