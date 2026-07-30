import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, Settings, Database, Key, Trash2 } from 'lucide-react';

export function PrivacyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const steps = [
    {
      icon: FileText,
      title: "Read Policies",
      desc: "Review the Terms of Service and Data Use Policy before signing up to understand how my content is shared or re-used."
    },
    {
      icon: Settings,
      title: "Adjust Privacy Settings",
      desc: "Immediately change default settings to restrict who can see my profile and content."
    },
    {
      icon: Database,
      title: "Limit Data",
      desc: "Provide only mandatory information and avoid uploading sensitive personal files."
    },
    {
      icon: Key,
      title: "Secure Accounts",
      desc: "Use a strong, unique password and enable Multi-Factor Authentication (MFA)."
    },
    {
      icon: Trash2,
      title: "Manage Content",
      desc: "Regularly review account activity and request data deletion when closing accounts."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-navy-900/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
          >
            <div className="sticky top-0 bg-white/95 backdrop-blur z-10 border-b border-gray-100 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-display italic font-bold text-navy-900">
                  Data Protection & Privacy
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-navy-900 transition-colors bg-gray-50 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8">
              <p className="text-gray-600 mb-8 text-lg font-medium leading-relaxed">
                We take your privacy seriously. To protect yourself and your data, here are the steps you can take:
              </p>

              <div className="space-y-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center text-gold-500">
                      <step.icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-6 bg-teal-50 rounded-xl border border-teal-100 text-center">
                <p className="text-teal-800 text-sm font-medium">
                  By continuing to use ElKairon Global Connect, you acknowledge these practices and agree to our comprehensive Privacy Policy.
                </p>
                <button 
                  onClick={onClose}
                  className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-teal-700 transition-colors"
                >
                  I Understand
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
