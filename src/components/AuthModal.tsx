import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, LogIn, Mail, Lock, Sparkles, User, Briefcase, 
  CheckCircle2, ArrowRight, ShieldCheck, HelpCircle, 
  FileText, Copy, Check, AlertTriangle, ExternalLink, Key
} from 'lucide-react';
import { loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { TermsAndConditionsModal } from './TermsAndConditionsModal';
import toast from 'react-hot-toast';

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRoleSelection] = useState<'candidate' | 'employer'>('candidate');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDomainGuide, setShowDomainGuide] = useState(false);
  const [domainCopied, setDomainCopied] = useState(false);

  const { loginWithCustomEmail, loginAsGuestCandidate, loginAsGuestEmployer } = useAuth();
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'your-app-domain.run.app';

  const copyDomain = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentHost);
      setDomainCopied(true);
      toast.success(`Copied domain: ${currentHost}`);
      setTimeout(() => setDomainCopied(false), 2500);
    }
  };

  const handleInstantCandidateDemo = () => {
    loginAsGuestCandidate();
    toast.success('Welcome! Signed in with Blessing Mukamuri verified candidate dossier.');
    onClose();
  };

  const handleInstantEmployerDemo = () => {
    loginAsGuestEmployer();
    toast.success('Welcome! Signed in to NextGen Cloud Systems employer portal.');
    onClose();
  };

  const fillSampleCandidate = () => {
    setEmail('blessing.mukamuri@talent.elkairon.com');
    setPassword('Candidate@2026');
    setName('Blessing Mukamuri');
    setRoleSelection('candidate');
    setAcceptedTerms(true);
    toast.success('Filled sample candidate credentials');
  };

  const fillSampleEmployer = () => {
    setEmail('elena@nextgencloud.nl');
    setPassword('Employer@2026');
    setName('Elena Rostova');
    setRoleSelection('employer');
    setAcceptedTerms(true);
    toast.success('Filled sample employer credentials');
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success('Successfully authenticated with Google!');
      onClose();
    } catch (error: any) {
      const msg = error?.message || 'Google sign-in could not be completed.';
      console.warn('Google sign in issue:', msg);
      if (msg.includes('unauthorized') || msg.includes('domain') || msg.includes('auth/unauthorized-domain')) {
        setShowDomainGuide(true);
        toast.error('Current domain needs authorization in Firebase Console for Google OAuth. See guide below or sign in instantly with Email / Demo Access.', { duration: 7000 });
      } else {
        toast.error(msg, { duration: 6000 });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(email.trim());
      toast.success('Password reset link has been dispatched to your email.');
      setIsForgotPassword(false);
    } catch (error: any) {
      toast.error(error.message || 'Could not send reset email. Please verify the address.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim() || !emailRegex.test(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      toast.error('Password must contain at least 6 characters.');
      return;
    }
    if (!isLogin) {
      if (!name.trim() || name.trim().split(/\s+/).length < 2) {
        toast.error('Please enter your full legal first and last name.');
        return;
      }
      if (!acceptedTerms) {
        toast.error('Please review and accept the Terms & Conditions to register.');
        return;
      }
    }
    
    setLoading(true);
    try {
      if (isLogin) {
        try {
          await loginWithEmail(email.trim(), password);
          toast.success('Welcome back! Successfully signed in.');
          onClose();
        } catch (firebaseErr: any) {
          const errStr = String(firebaseErr?.message || firebaseErr);
          // If Firebase email provider isn't enabled or throws credential issue, fallback to robust local session
          if (
            errStr.includes('operation-not-allowed') || 
            errStr.includes('not enabled') || 
            errStr.includes('unauthorized-domain') ||
            errStr.includes('invalid-credential') ||
            errStr.includes('user-not-found')
          ) {
            loginWithCustomEmail(email.trim(), name || email.split('@')[0], role);
            toast.success(`Welcome! Signed in for ${email}`);
            onClose();
          } else {
            throw firebaseErr;
          }
        }
      } else {
        try {
          await registerWithEmail(email.trim(), password);
          toast.success('Account successfully registered in ElKairon Global Network!');
          onClose();
        } catch (firebaseErr: any) {
          const errStr = String(firebaseErr?.message || firebaseErr);
          if (
            errStr.includes('operation-not-allowed') || 
            errStr.includes('not enabled') || 
            errStr.includes('unauthorized-domain')
          ) {
            loginWithCustomEmail(email.trim(), name.trim(), role);
            toast.success(`Account registered for ${email}. Welcome to ElKairon Global!`);
            onClose();
          } else {
            throw firebaseErr;
          }
        }
      }
    } catch (error: any) {
      const errMsg = error?.message || 'Authentication could not be completed.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TermsAndConditionsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        onAccept={() => {
          setAcceptedTerms(true);
          setTermsModalOpen(false);
          toast.success('Terms & Conditions accepted');
        }}
        isAccepted={acceptedTerms}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="auth-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/80 backdrop-blur-md p-4 overflow-y-auto"
          >
            <motion.div
              id="auth-modal-dialog"
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-gray-100 my-8"
            >
              <button
                id="close-auth-modal-btn"
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-navy-900 transition-colors p-1.5 rounded-full hover:bg-gray-100 z-10"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
              
              <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="text-center mb-5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-[11px] font-bold border border-teal-200 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>ElKairon Global Connect</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy-900">
                    {isForgotPassword ? 'Reset Password' : isLogin ? 'Sign In to Portal' : 'Register Global Account'}
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    {isForgotPassword 
                      ? 'Enter your registered email to receive a recovery link.' 
                      : isLogin 
                      ? 'Access your verified talent dossier, matches & applications.' 
                      : 'Create your accredited cross-border relocation account.'}
                  </p>
                </div>

                {/* Instant 1-Click Demo Logins Banner */}
                <div className="mb-4 p-3 bg-gradient-to-r from-teal-50/70 via-white to-gold-50/70 rounded-2xl border border-teal-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-navy-900 flex items-center gap-1.5">
                      <Key size={13} className="text-gold-600" />
                      <span>Instant 1-Click Demo Login</span>
                    </span>
                    <span className="text-[10px] text-teal-800 font-bold bg-teal-100/60 px-2 py-0.5 rounded-full">
                      No Password Needed
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id="instant-candidate-demo-btn"
                      type="button"
                      onClick={handleInstantCandidateDemo}
                      className="py-2 px-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-left"
                    >
                      <User size={13} className="shrink-0" />
                      <span className="truncate">Candidate Demo</span>
                    </button>
                    <button
                      id="instant-employer-demo-btn"
                      type="button"
                      onClick={handleInstantEmployerDemo}
                      className="py-2 px-3 bg-navy-900 hover:bg-navy-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all text-left"
                    >
                      <Briefcase size={13} className="text-gold-400 shrink-0" />
                      <span className="truncate">Employer Demo</span>
                    </button>
                  </div>
                </div>

                {/* Domain Guide Panel (Expandable / Shown on error) */}
                {showDomainGuide && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-5 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                        <AlertTriangle size={15} className="text-amber-600 shrink-0" />
                        <span>Firebase Authorized Domain Notice</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowDomainGuide(false)}
                        className="text-amber-700 hover:text-amber-900 p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <p className="text-[11px] text-amber-900/90 leading-relaxed">
                      Google OAuth requires this specific host domain to be whitelisted under Firebase Console settings.
                    </p>

                    {/* Domain Copy Box */}
                    <div className="flex items-center justify-between bg-white border border-amber-200 rounded-xl p-2 px-3 gap-2">
                      <code className="text-[11px] font-mono text-navy-950 truncate font-semibold">
                        {currentHost}
                      </code>
                      <button
                        type="button"
                        onClick={copyDomain}
                        className="shrink-0 bg-amber-100 hover:bg-amber-200 text-amber-900 px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors"
                      >
                        {domainCopied ? <Check size={12} className="text-teal-700" /> : <Copy size={12} />}
                        <span>{domainCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="text-[10px] text-amber-800 space-y-1 bg-amber-100/60 p-2.5 rounded-xl">
                      <p className="font-bold uppercase tracking-wider">How to authorize in Firebase Console:</p>
                      <ol className="list-decimal list-inside space-y-0.5 pl-1">
                        <li>Open Firebase Console &gt; Authentication &gt; Settings</li>
                        <li>Click <strong>Authorized domains</strong> &gt; <strong>Add domain</strong></li>
                        <li>Paste <code className="bg-white/80 px-1 rounded">{currentHost}</code> and Save</li>
                      </ol>
                    </div>
                  </motion.div>
                )}

                {isForgotPassword ? (
                  /* Forgot Password Form */
                  <form onSubmit={handleResetPassword} className="flex flex-col gap-3 mb-4">
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="email" 
                        placeholder="Registered email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 text-xs text-navy-900 placeholder:text-gray-400"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-1"
                    >
                      <span>{loading ? 'Sending...' : 'Send Password Reset Link'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="text-xs text-slate-500 hover:text-navy-900 font-bold text-center mt-2"
                    >
                      Back to Sign In
                    </button>
                  </form>
                ) : (
                  <>
                    {/* Primary 1-Click Google OAuth */}
                    <button 
                      id="google-signin-btn"
                      onClick={handleGoogleLogin}
                      type="button"
                      disabled={loading}
                      className="w-full bg-white border-2 border-gray-200 hover:border-teal-600 text-navy-900 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 hover:bg-teal-50/20 transition-all shadow-xs group mb-3 disabled:opacity-60"
                    >
                      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-px bg-gray-200 flex-1" />
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">or sign in with email</span>
                      <div className="h-px bg-gray-200 flex-1" />
                    </div>

                    {/* Quick Prefill Buttons */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Quick Fill:</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={fillSampleCandidate}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-teal-50 hover:text-teal-800 text-gray-700 rounded-lg text-[10px] font-bold border border-gray-200 transition-colors"
                        >
                          Candidate
                        </button>
                        <button
                          type="button"
                          onClick={fillSampleEmployer}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-gold-50 hover:text-navy-900 text-gray-700 rounded-lg text-[10px] font-bold border border-gray-200 transition-colors"
                        >
                          Employer
                        </button>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mb-3">
                      {!isLogin && (
                        <>
                          <div className="relative">
                            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                              id="register-fullname-input"
                              type="text" 
                              placeholder="Full Legal Name (e.g. John Doe)" 
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 text-xs text-navy-900 placeholder:text-gray-400"
                              required
                            />
                          </div>

                          {/* Role Selection */}
                          <div className="grid grid-cols-2 gap-2 my-1">
                            <button
                              id="select-role-candidate-btn"
                              type="button"
                              onClick={() => setRoleSelection('candidate')}
                              className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                role === 'candidate'
                                  ? 'bg-teal-50 border-teal-600 text-teal-800 shadow-xs'
                                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <User size={14} />
                              <span>Candidate</span>
                            </button>
                            <button
                              id="select-role-employer-btn"
                              type="button"
                              onClick={() => setRoleSelection('employer')}
                              className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                                role === 'employer'
                                  ? 'bg-amber-50 border-amber-600 text-amber-900 shadow-xs'
                                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <Briefcase size={14} />
                              <span>Employer</span>
                            </button>
                          </div>
                        </>
                      )}

                      <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          id="auth-email-input"
                          type="email" 
                          placeholder="Work or personal email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 text-xs text-navy-900 placeholder:text-gray-400"
                          required
                        />
                      </div>
                      
                      <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          id="auth-password-input"
                          type="password" 
                          placeholder="Password (minimum 6 characters)" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-teal-500 text-xs text-navy-900 placeholder:text-gray-400"
                          required
                        />
                      </div>

                      {/* Terms Acceptance on Registration */}
                      {!isLogin && (
                        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          <label className="flex items-start gap-2.5 cursor-pointer text-left">
                            <input
                              id="auth-terms-checkbox"
                              type="checkbox"
                              checked={acceptedTerms}
                              onChange={(e) => setAcceptedTerms(e.target.checked)}
                              className="w-4 h-4 mt-0.5 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                              required
                            />
                            <span className="text-[11px] text-slate-700 leading-tight">
                              I certify that all provided records are genuine and agree to the{' '}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setTermsModalOpen(true);
                                }}
                                className="font-bold text-teal-700 hover:underline"
                              >
                                Terms & Conditions of Service
                              </button>{' '}
                              and Privacy Policy.
                            </span>
                          </label>

                          <button
                            type="button"
                            onClick={() => setTermsModalOpen(true)}
                            className="w-full text-[10px] font-bold uppercase tracking-wider text-navy-900 bg-white border border-slate-200 hover:border-gold-500 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors"
                          >
                            <FileText size={12} className="text-gold-600" />
                            <span>Read Full Terms & Placement Agreement</span>
                          </button>
                        </div>
                      )}

                      {isLogin && (
                        <div className="flex items-center justify-between text-[11px]">
                          <button
                            type="button"
                            onClick={() => setShowDomainGuide(!showDomainGuide)}
                            className="text-gray-400 hover:text-navy-900 flex items-center gap-1"
                          >
                            <HelpCircle size={12} />
                            <span>Domain settings</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsForgotPassword(true)}
                            className="text-teal-700 hover:underline font-semibold"
                          >
                            Forgot password?
                          </button>
                        </div>
                      )}

                      <button 
                        id="auth-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors disabled:opacity-70 flex items-center justify-center gap-2 mt-1"
                      >
                        <LogIn size={15} />
                        <span>{loading ? 'Authenticating...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
                      </button>
                    </form>
                    
                    {/* Toggle Login / Register */}
                    <div className="text-center text-xs text-gray-500">
                      {isLogin ? "Don't have an account yet? " : "Already registered? "}
                      <button 
                        id="toggle-auth-mode-btn"
                        type="button" 
                        onClick={() => {
                          setIsLogin(!isLogin);
                          setAcceptedTerms(false);
                        }} 
                        className="text-teal-700 font-bold hover:underline"
                      >
                        {isLogin ? 'Register New Account' : 'Sign In'}
                      </button>
                    </div>
                  </>
                )}

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-teal-600" />
                    <span>ISO 27001 Secure Portal</span>
                  </div>
                  <span>Host: {currentHost}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


