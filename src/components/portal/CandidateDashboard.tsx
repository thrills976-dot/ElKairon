import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { UploadCloud, FileText, CheckCircle, Clock, AlertCircle, ChevronRight, X, Bell } from 'lucide-react';
import { Toast } from '../ui/Toast';

const steps = [
  { id: 1, title: 'Profile Created', desc: 'Initial account setup completed.', status: 'completed' },
  { id: 2, title: 'Documents Uploaded', desc: 'CV and supporting documents submitted.', status: 'current' },
  { id: 3, title: 'Interview Preparation', desc: 'Coaching and skills alignment.', status: 'upcoming' },
  { id: 4, title: 'Offer Letter', desc: 'Official offer received from employer.', status: 'upcoming' },
  { id: 5, title: 'Work Permit', desc: 'Permit approved by authorities.', status: 'upcoming' },
  { id: 6, title: 'Visa Approved', desc: 'Final visa stamped.', status: 'upcoming' },
  { id: 7, title: 'Relocation', desc: 'Flights and accommodation ready.', status: 'upcoming' },
];

export function CandidateDashboard() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number }[]>([]);
  const [currentStep, setCurrentStep] = useState(2); // Start at step 2 (waiting for docs)
  const [showToast, setShowToast] = useState(false);
  const [jobAlertSubscribed, setJobAlertSubscribed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).map(f => ({ name: f.name, size: f.size }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    setShowToast(true);
    if (currentStep === 2) {
      // Simulate moving to next step after upload
      setTimeout(() => setCurrentStep(3), 1500);
    }
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24">
      <Toast 
        message="Documents successfully uploaded."
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold text-navy-900 mb-2">Welcome Back, Candidate</h1>
          <p className="text-gray-600">Track your application progress and manage your documents.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Progress Timeline */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-28">
              <h2 className="font-display text-xl font-bold text-navy-900 mb-6">Application Journey</h2>
              
              <div className="space-y-6">
                {steps.map((step, idx) => {
                  let status = 'upcoming';
                  if (step.id < currentStep) status = 'completed';
                  else if (step.id === currentStep) status = 'current';

                  return (
                    <div key={step.id} className="relative flex gap-4">
                      {/* Line connector */}
                      {idx !== steps.length - 1 && (
                        <div className={`absolute left-3.5 top-8 w-0.5 h-full -ml-[1px] ${
                          status === 'completed' ? 'bg-teal-500' : 'bg-gray-200'
                        }`} />
                      )}
                      
                      {/* Icon */}
                      <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 ${
                        status === 'completed' ? 'bg-teal-500 border-teal-500 text-white' :
                        status === 'current' ? 'bg-white border-gold-500 text-gold-500' :
                        'bg-white border-gray-300 text-gray-300'
                      }`}>
                        {status === 'completed' ? <CheckCircle size={14} /> : 
                         status === 'current' ? <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" /> :
                         <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />}
                      </div>

                      {/* Content */}
                      <div className="pb-4">
                        <h4 className={`font-semibold text-sm ${status === 'upcoming' ? 'text-gray-400' : 'text-navy-900'}`}>
                          {step.title}
                        </h4>
                        <p className={`text-xs mt-1 ${status === 'upcoming' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Document Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-navy-900 uppercase text-sm tracking-widest">Candidate Portal</h4>
                <div className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold">PORTAL ACTIVE</div>
              </div>

              <div className="space-y-6 flex-1 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300">
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="font-bold text-navy-900">Current Status:</span>
                    <span className="text-teal-600 font-bold uppercase tracking-widest">Vetting Phase</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-600 h-full w-[35%] transition-all"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                    <p className="text-[10px] uppercase text-teal-600 font-bold mb-2">Benefits Included</p>
                    <ul className="text-xs text-navy-900 space-y-2 font-medium">
                      <li>✅ Accommodation</li>
                      <li>✅ Medical Insurance</li>
                      <li>✅ Duty Meals</li>
                      <li>✅ Airline Ticket</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-gold-50/50 rounded-lg border border-gold-500 flex flex-col justify-center items-center gap-3">
                    <p className="text-xs text-center font-bold text-navy-900">Need a professional CV?</p>
                    <button className="bg-gold-500 text-white text-[10px] px-4 py-2 rounded-full font-bold uppercase tracking-tight hover:bg-gold-600 transition-colors">Help Me Create One</button>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <h2 className="font-display text-xl font-bold text-navy-900 mb-2">Document Center</h2>
                <p className="text-gray-500 text-sm mb-6">Upload missing documents (Passport, Certificates):</p>
                
                <form 
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onSubmit={(e) => e.preventDefault()}
                  className={`relative border-2 border-dotted rounded-xl p-10 text-center transition-colors cursor-pointer ${
                    dragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => inputRef.current?.click()}
                >
                  <input 
                    ref={inputRef}
                    type="file" 
                    multiple 
                    onChange={handleChange}
                    className="hidden" 
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-sm text-gray-500 font-medium">Drag and drop files here</span>
                  </div>
                </form>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-navy-900 uppercase tracking-wider mb-4">Uploaded Documents</h3>
                  <div className="space-y-4">
                    {uploadedFiles.map((file, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        key={idx}
                        className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm hover:border-teal-300 transition-colors group relative overflow-hidden"
                      >
                        {/* Interactive Status Background Fill */}
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-transparent w-[35%] opacity-50 z-0 transition-all duration-1000 ease-in-out" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-navy-900 text-gold-500 rounded-lg flex items-center justify-center shadow-md">
                              <FileText size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-navy-900 truncate max-w-[200px] sm:max-w-xs">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          
                          {/* Document Status Tracker */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-teal-500 text-white flex items-center justify-center mb-1"><CheckCircle size={10} /></div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700">Submitted</span>
                              </div>
                              <div className="w-6 h-px bg-teal-500 mb-3" />
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full border-2 border-teal-500 text-teal-500 flex items-center justify-center mb-1">
                                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-teal-700">In-Review</span>
                              </div>
                              <div className="w-6 h-px bg-gray-200 mb-3" />
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full border-2 border-gray-200 text-gray-300 flex items-center justify-center mb-1"></div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Verified</span>
                              </div>
                            </div>
                            
                            <button 
                              onClick={() => removeFile(idx)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 hover:bg-red-50 rounded-lg self-end sm:self-auto"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

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
            </div>

                    </div>

            {/* Privacy & Security Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 col-span-1 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-navy-900">Privacy & Data Management</h2>
                  <p className="text-gray-500 text-sm">Control your data as promised in our Data Protection policy.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border border-gray-100 rounded-xl bg-gray-50">
                  <h4 className="font-bold text-navy-900 mb-1">Profile Visibility</h4>
                  <p className="text-xs text-gray-500 mb-4">Restrict who can see your profile and uploaded documents.</p>
                  <select className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <option>Only Verified Employers</option>
                    <option>Public</option>
                    <option>Private (Hidden)</option>
                  </select>
                </div>
                
                <div className="p-5 border border-gray-100 rounded-xl bg-gray-50">
                  <h4 className="font-bold text-navy-900 mb-1">Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-500 mb-4">Enable MFA for an extra layer of account security.</p>
                  <button className="px-4 py-2 bg-navy-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-navy-800 transition-colors">
                    Enable MFA
                  </button>
                </div>
                
                <div className="p-5 border border-gray-100 rounded-xl bg-gray-50 md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-navy-900 mb-1">Delete Account & Data</h4>
                    <p className="text-xs text-gray-500 max-w-md">Permanently delete your account and all associated data (CVs, documents) from our servers.</p>
                  </div>
                  <button 
                    onClick={() => {
                      if(window.confirm('Are you sure you want to delete all your data? This action is irreversible.')) {
                        import('react-hot-toast').then(toast => toast.default.success('Data deletion request submitted.'));
                      }
                    }}
                    className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-100 transition-colors whitespace-nowrap"
                  >
                    Request Deletion
                  </button>
                </div>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
}
