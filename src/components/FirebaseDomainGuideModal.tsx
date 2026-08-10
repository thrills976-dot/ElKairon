import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ExternalLink, Copy, Check, ShieldCheck, 
  AlertCircle, CheckCircle2, Globe, Key, Lock, Sparkles, RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import firebaseConfig from '../../firebase-applet-config.json';

interface FirebaseDomainGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FirebaseDomainGuideModal({ isOpen, onClose }: FirebaseDomainGuideModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testingStatus, setTestingStatus] = useState<string | null>(null);

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const projectId = firebaseConfig.projectId || 'pro-minutia-8t8c4';
  const consoleAuthSettingsUrl = `https://console.firebase.google.com/project/${projectId}/authentication/settings`;
  const consoleSignInMethodsUrl = `https://console.firebase.google.com/project/${projectId}/authentication/providers`;

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(label);
      toast.success(`Copied ${label}: ${text}`);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  const domainsToWhitelist = [
    { label: 'Current App Hostname (Live Preview)', value: currentHost, highlight: true },
    { label: 'Cloud Run Sandbox Domain', value: '*.run.app', highlight: false },
    { label: 'Firebase App Domain', value: firebaseConfig.authDomain || `${projectId}.firebaseapp.com`, highlight: false },
    { label: 'Local Development Host', value: 'localhost', highlight: false }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="firebase-domain-guide-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-navy-950/80 backdrop-blur-md p-4 overflow-y-auto"
        >
          <motion.div
            id="firebase-domain-guide-dialog"
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative border border-slate-200 my-8 text-navy-950"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-[#0A4D68] text-white p-6 sm:p-8 relative">
              <button
                id="close-firebase-guide-btn"
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Close guide"
              >
                <X size={20} />
              </button>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 text-xs font-bold border border-gold-400/40 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Production Firebase Authentication Guide</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
                Firebase Authorized Domains &amp; Auth Setup
              </h2>
              <p className="text-sky-100 text-xs sm:text-sm mt-1.5 leading-relaxed max-w-xl">
                To allow 1-click Google Sign-In and production-grade Email/Password authentication in this environment and custom domains, follow this quick 2-step setup in your Firebase Console.
              </p>
            </div>

            <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 text-sm">
              {/* Step 1: Add Authorized Domains */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-navy-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    1
                  </span>
                  <h3 className="font-bold text-navy-900 text-base">
                    Add Hostname to Authorized Domains
                  </h3>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Firebase Authentication strictly requires web hostnames to be allowlisted to prevent unauthorized cross-origin authentication requests.
                </p>

                <div className="space-y-2 pt-1">
                  {domainsToWhitelist.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs gap-3 transition-colors ${
                        item.highlight 
                          ? 'bg-amber-50/70 border-amber-300 text-amber-950 font-medium' 
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {item.label}
                        </div>
                        <div className="font-mono font-semibold truncate text-navy-950 select-all">
                          {item.value}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(item.value, item.label)}
                        className="shrink-0 px-3 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-[11px] flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        {copiedKey === item.label ? (
                          <>
                            <Check size={13} className="text-teal-300" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Copy Domain</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <a
                  href={consoleAuthSettingsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-900 bg-teal-50 border border-teal-200 px-4 py-2 rounded-xl transition-colors mt-2"
                >
                  <ExternalLink size={14} />
                  <span>Open Firebase Console &gt; Authentication Settings</span>
                </a>
              </div>

              {/* Step 2: Enable Providers */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-full bg-navy-900 text-white font-bold flex items-center justify-center text-xs shrink-0">
                    2
                  </span>
                  <h3 className="font-bold text-navy-900 text-base">
                    Enable Email/Password &amp; Google Sign-In Providers
                  </h3>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Ensure both <strong>Email/Password</strong> and <strong>Google</strong> providers are toggled to <em>Enabled</em> in your project.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Lock size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-navy-900">Email &amp; Password</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Fully enabled out-of-the-box. Candidate &amp; Employer accounts with auto-role binding.
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-teal-700 font-bold mt-1">
                        <CheckCircle2 size={12} /> Ready to Use
                      </span>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                      <Globe size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-navy-900">Google 1-Click OAuth</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Requires the domain above to be added to Firebase Authorized domains list.
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 font-bold mt-1">
                        <AlertCircle size={12} /> Requires Whitelist
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={consoleSignInMethodsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-navy-900 hover:text-navy-700 bg-white border border-slate-300 px-4 py-2 rounded-xl transition-colors mt-2"
                >
                  <ExternalLink size={14} />
                  <span>Open Firebase Sign-In Providers Configuration</span>
                </a>
              </div>

              {/* Technical Configuration Snapshot */}
              <div className="p-4 bg-navy-950 text-white rounded-2xl space-y-2 border border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold text-gold-400 flex items-center gap-1.5">
                    <Key size={13} />
                    Active Project Metadata
                  </span>
                  <span className="text-[10px] text-slate-400">Environment: Production</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                  <div>
                    <span className="text-slate-500 block">Project ID:</span>
                    <span className="text-teal-300 font-semibold">{projectId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Auth Domain:</span>
                    <span className="text-teal-300 font-semibold">{firebaseConfig.authDomain}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <CheckCircle2 size={15} className="text-teal-600 shrink-0" />
                <span>Email/Password authentication is active immediately</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md"
              >
                Done &amp; Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
