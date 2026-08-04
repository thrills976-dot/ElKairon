import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, Mail, Lock } from 'lucide-react';
import { loginWithGoogle, loginWithEmail, registerWithEmail } from '../lib/firebase';
import toast from 'react-hot-toast';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Successfully logged in!');
      onClose();
    } catch (error) {
      toast.error('Failed to log in with Google');
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
        toast.success('Successfully logged in!');
      } else {
        await registerWithEmail(email, password);
        toast.success('Successfully registered!');
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
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
            
            <div className="p-10 text-center">
              <h2 className="text-3xl font-display italic font-bold text-navy-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-500 mb-8 text-sm">
                {isLogin ? 'Sign in to access your dashboard.' : 'Sign up to build your custom feed.'}
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="Email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 text-sm"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 text-sm"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-navy-900 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-navy-800 transition-colors shadow-md disabled:opacity-70"
                >
                  {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
                </button>
              </form>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-gray-200 flex-1" />
                <span className="text-xs text-gray-400 font-medium">OR</span>
                <div className="h-px bg-gray-200 flex-1" />
              </div>

              <button 
                onClick={handleGoogleLogin}
                type="button"
                className="w-full bg-white border border-gray-200 text-navy-900 py-3 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm mb-6"
              >
                <LogIn size={18} />
                Continue with Google
              </button>
              
              <div className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button" 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-teal-600 font-bold hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </div>

              <div className="mt-8 text-center text-[10px] text-gray-400 max-w-xs mx-auto">
                By signing in, you agree to our <button type="button" onClick={() => { onClose(); window.dispatchEvent(new CustomEvent("open-privacy")); }} className="underline hover:text-teal-600">Privacy Policy</button> and Terms of Service.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
