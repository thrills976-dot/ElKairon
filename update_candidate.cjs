const fs = require('fs');
let code = fs.readFileSync('src/components/portal/CandidateDashboard.tsx', 'utf-8');

// Add Lucide icons import
code = code.replace(
  "import { UploadCloud, FileText, CheckCircle, Clock, AlertCircle, ChevronRight, X } from 'lucide-react';",
  "import { UploadCloud, FileText, CheckCircle, Clock, AlertCircle, ChevronRight, X, Bell } from 'lucide-react';"
);

// Add the job alert state
code = code.replace(
  "const [showToast, setShowToast] = useState(false);",
  "const [showToast, setShowToast] = useState(false);\n  const [jobAlertSubscribed, setJobAlertSubscribed] = useState(false);"
);

const newCard = `
            {/* Information Card */}
            <div className="bg-navy-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl mb-6">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/20 blur-2xl rounded-full" />
              <div className="relative z-10 flex items-start gap-4">
                <AlertCircle className="text-gold-400 shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-display text-xl font-bold mb-2">Need Professional Career Advice?</h3>
                  <p className="text-navy-100 text-sm leading-relaxed mb-6">
                    Share your CV for professional career advice from our experts. If you don't have one, we will gladly assist in creating one to maximize your chances of success.
                  </p>
                  <button className="flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors">
                    Contact an Expert <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Job Alerts Form */}
            <div className="bg-teal-50 rounded-2xl p-8 border border-teal-100 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-teal-200/50 blur-2xl rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-md">
                    <Bell size={20} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-900">Job Match Alerts</h3>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  Subscribe to automated email alerts for new job postings that match your specific skills and job preferences.
                </p>
                
                {jobAlertSubscribed ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-xl border border-teal-200 text-center flex flex-col items-center gap-2"
                  >
                    <CheckCircle className="text-teal-500" size={32} />
                    <p className="text-navy-900 font-bold">You're Subscribed!</p>
                    <p className="text-xs text-gray-500">We'll email you when matching roles are posted.</p>
                  </motion.div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      import('react-hot-toast').then(toast => toast.default.success('Successfully subscribed to Job Alerts!'));
                      setJobAlertSubscribed(true);
                    }} 
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-navy-900 mb-1">Preferred Industry</label>
                        <select required className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                          <option value="">Select Industry</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="construction">Construction</option>
                          <option value="hospitality">Hospitality</option>
                          <option value="logistics">Logistics & Trades</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-navy-900 mb-1">Preferred Country</label>
                        <select required className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none">
                          <option value="">Select Country</option>
                          <option value="germany">Germany</option>
                          <option value="uk">United Kingdom</option>
                          <option value="uae">UAE</option>
                          <option value="europe">Other Europe</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-navy-900 mb-1">Keywords / Skills</label>
                      <input type="text" placeholder="e.g. Registered Nurse, Welders, Manager" className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 outline-none" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-navy-900 text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-navy-800 transition-colors shadow-lg">
                      Activate Alerts
                    </button>
                  </form>
                )}
              </div>
            </div>`;

code = code.replace(
  /{[\s\S]*\/\* Information Card \*\/[\s\S]*<div className="bg-navy-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">[\s\S]*<div className="absolute top-0 right-0 w-32 h-32 bg-gold-500\/20 blur-2xl rounded-full" \/>[\s\S]*<div className="relative z-10 flex items-start gap-4">[\s\S]*<AlertCircle className="text-gold-400 shrink-0 mt-1" size={24} \/>[\s\S]*<div>[\s\S]*<h3 className="font-display text-xl font-bold mb-2">Need Professional Career Advice\?<\/h3>[\s\S]*<p className="text-navy-100 text-sm leading-relaxed mb-6">[\s\S]*Share your CV for professional career advice from our experts. If you don't have one, we will gladly assist in creating one to maximize your chances of success.[\s\S]*<\/p>[\s\S]*<button className="flex items-center gap-2 text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors">[\s\S]*Contact an Expert <ChevronRight size={16} \/>[\s\S]*<\/button>[\s\S]*<\/div>[\s\S]*<\/div>[\s\S]*<\/div>/,
  newCard
);

fs.writeFileSync('src/components/portal/CandidateDashboard.tsx', code);
