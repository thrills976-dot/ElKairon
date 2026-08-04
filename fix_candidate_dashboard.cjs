const fs = require('fs');
let code = fs.readFileSync('src/components/portal/CandidateDashboard.tsx', 'utf-8');

// 1. Progress timeline
const oldApplicationsRender = `                   applications.map(app => {
                     const job = jobs.find(j => j.id === app.jobId);
                     return (
                       <div key={app.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                         <div>
                           <h3 className="font-display text-lg font-bold text-navy-900 mb-1">{job ? job.title : 'Unknown Job'}</h3>
                           <p className="text-sm text-gray-500">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                         </div>
                         <div className="flex items-center gap-3">
                           <span className={\`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border \${
                             app.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                             app.status === 'reviewed' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                             app.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-100' :
                             'bg-red-50 text-red-700 border-red-100'
                           }\`}>
                             {app.status}
                           </span>
                         </div>
                       </div>
                     );
                   })`;

const newApplicationsRender = `                   applications.map(app => {
                     const job = jobs.find(j => j.id === app.jobId);
                     
                     // Timeline stages logic
                     const stages = ['Submitted', 'Under Review', 'Interview Scheduled', 'Final Offer'];
                     let currentStageIndex = 0;
                     if (app.status === 'pending') currentStageIndex = 0;
                     if (app.status === 'reviewed') currentStageIndex = 1;
                     if (app.status === 'interview') currentStageIndex = 2; // For demonstration
                     if (app.status === 'accepted') currentStageIndex = 3;
                     
                     return (
                       <div key={app.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-6">
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                           <div>
                             <h3 className="font-display text-lg font-bold text-navy-900 mb-1">{job ? job.title : 'Unknown Job'}</h3>
                             <p className="text-sm text-gray-500">Applied on {new Date(app.createdAt).toLocaleDateString()}</p>
                           </div>
                           <span className={\`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest border \${
                             app.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                             app.status === 'reviewed' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                             app.status === 'accepted' || app.status === 'interview' ? 'bg-green-50 text-green-700 border-green-100' :
                             'bg-red-50 text-red-700 border-red-100'
                           }\`}>
                             {app.status === 'interview' ? 'Interview Scheduled' : app.status}
                           </span>
                         </div>
                         
                         {/* Visual Progress Timeline */}
                         <div className="relative pt-4 pb-2">
                            <div className="absolute top-7 left-0 w-full h-1 bg-gray-100 rounded-full" />
                            <div 
                              className="absolute top-7 left-0 h-1 bg-teal-500 rounded-full transition-all duration-1000"
                              style={{ width: \`\${(currentStageIndex / (stages.length - 1)) * 100}%\` }}
                            />
                            <div className="relative flex justify-between">
                              {stages.map((stage, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 relative z-10 w-24">
                                  <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 transition-colors duration-500 \${
                                    idx <= currentStageIndex ? 'bg-teal-500 border-teal-500' : 'bg-white border-gray-200 text-transparent'
                                  }\`}>
                                    {idx <= currentStageIndex ? '✓' : ''}
                                  </div>
                                  <span className={\`text-center text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 \${
                                    idx <= currentStageIndex ? 'text-teal-700' : 'text-gray-400'
                                  }\`}>
                                    {stage}
                                  </span>
                                </div>
                              ))}
                            </div>
                         </div>
                       </div>
                     );
                   })`;

code = code.replace(oldApplicationsRender, newApplicationsRender);


// 2. Skill verification badges
const sidebarUploadRender = `              <div className="space-y-4">
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-teal-500 hover:bg-teal-50 transition-colors cursor-pointer group relative overflow-hidden">
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleUpload} disabled={uploading} />
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-3 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <span className="font-bold text-navy-900 text-sm mb-1">{uploading ? 'Uploading...' : 'Upload Resume / CV'}</span>
                  <span className="text-xs text-gray-500">PDF, DOCX up to 800KB</span>
                </label>
                
                {cvUploaded && (
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-teal-600 shadow-sm">
                        <CheckCircle size={16} />
                      </div>
                      <div>
                        <a href={cvUrl} target="_blank" rel="noreferrer" className="text-sm font-bold text-navy-900 hover:underline">{cvName || 'My CV'}</a>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Updated today</p>
                      </div>
                    </div>
                    <button className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors">Remove</button>
                  </div>
                )}
              </div>
            </div>`;

const skillVerificationRender = `
            {/* Skill Verification System */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-display text-xl font-bold text-navy-900 mb-2">Verified Skills</h3>
              <p className="text-gray-500 text-sm mb-6">Boost your profile visibility by certifying your top skills.</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold uppercase tracking-widest">
                  <CheckCircle size={12} /> IELTS English
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold uppercase tracking-widest">
                  <CheckCircle size={12} /> Nursing (DHA)
                </span>
              </div>
              
              <button 
                onClick={() => import('react-hot-toast').then(toast => toast.default.success('Verification request submitted.'))}
                className="w-full bg-white text-navy-900 border border-gray-200 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:border-teal-500 hover:text-teal-600 transition-colors"
              >
                + Add Certification
              </button>
            </div>
`;

code = code.replace(sidebarUploadRender, sidebarUploadRender + skillVerificationRender);

fs.writeFileSync('src/components/portal/CandidateDashboard.tsx', code);
