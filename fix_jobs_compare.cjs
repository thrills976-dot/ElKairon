const fs = require('fs');
let code = fs.readFileSync('src/components/home/JobOpportunities.tsx', 'utf-8');

if (!code.includes('showCompareModal')) {
  // 1. Imports
  code = code.replace(
    "import { MapPin, Briefcase, Filter, Search, ArrowRight, ChevronDown, Check } from 'lucide-react';",
    "import { MapPin, Briefcase, Filter, Search, ArrowRight, ChevronDown, Check, Columns, X } from 'lucide-react';\nimport { useEffect } from 'react';"
  );
  
  // 2. States
  const componentStart = 'export function JobOpportunities() {';
  const componentState = `export function JobOpportunities() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  
  useEffect(() => {
    const handleGlobalSearch = (e: any) => {
      if (e.detail) {
        setSearchQuery(e.detail);
      }
    };
    window.addEventListener('globalSearch', handleGlobalSearch);
    return () => window.removeEventListener('globalSearch', handleGlobalSearch);
  }, []);
  
  const toggleCompare = (jobId: string) => {
    setSelectedJobs(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };
`;
  code = code.replace(componentStart, componentState);
  
  // 3. Card Title and Checkbox
  const titleRegex = /<h3 className="font-display text-2xl font-bold text-navy-900 mb-2">\s*{job.title}\s*<\/h3>/g;
  code = code.replace(titleRegex, `<div className="flex justify-between items-start">
                  <h3 className="font-display text-2xl font-bold text-navy-900 mb-2">
                    {job.title}
                  </h3>
                  <button 
                    onClick={() => toggleCompare(job.id)}
                    className={\`shrink-0 w-8 h-8 rounded-lg border-2 transition-colors flex items-center justify-center \${selectedJobs.includes(job.id) ? 'bg-teal-500 border-teal-500 text-white' : 'border-gray-200 text-gray-400 hover:border-teal-500'}\`}
                    title="Compare"
                  >
                    <Check size={16} className={selectedJobs.includes(job.id) ? 'opacity-100' : 'opacity-0'} />
                  </button>
                </div>`);
                
  // 4. Compare Modal & Floating Bar
  const floatingBar = `
      {/* Floating Compare Bar */}
      <AnimatePresence>
        {selectedJobs.length > 0 && !showCompareModal && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-navy-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6"
          >
            <span className="font-bold text-sm uppercase tracking-widest">{selectedJobs.length} Jobs Selected</span>
            <div className="flex items-center gap-3">
              {selectedJobs.length > 1 && (
                <button 
                  onClick={() => setShowCompareModal(true)}
                  className="bg-teal-600 hover:bg-teal-500 transition-colors px-4 py-2 rounded-full font-bold uppercase tracking-widest text-xs flex items-center gap-2"
                >
                  <Columns size={14} /> Compare
                </button>
              )}
              <button 
                onClick={() => setSelectedJobs([])}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-navy-900/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-display text-2xl font-bold text-navy-900 italic">Compare Opportunities</h3>
                <button 
                  onClick={() => setShowCompareModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>
              
              <div className="p-6 overflow-auto flex-1">
                <div className="flex gap-6 min-w-max">
                  {selectedJobs.map(jobId => {
                    const job = JOBS.find(j => j.id === jobId);
                    if (!job) return null;
                    return (
                      <div key={job.id} className="w-80 border border-gray-200 rounded-2xl p-6 relative">
                        <button 
                          onClick={() => toggleCompare(job.id)}
                          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>
                        <h4 className="font-bold text-navy-900 text-lg mb-4 pr-6">{job.title}</h4>
                        
                        <div className="space-y-4 text-sm text-gray-600">
                          <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Industry</span>
                            {job.industry}
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Locations</span>
                            {job.countries.join(', ')}
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Salary</span>
                            {job.salary}
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Experience</span>
                            {job.experience}
                          </div>
                          <div>
                            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Key Skills</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {job.skills.map(skill => (
                                <span key={skill} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <a 
                          href={\`https://wa.me/\${whatsappNumber}?text=I am interested in the \${job.title} position.\`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-6 w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-teal-700 transition-colors"
                        >
                          Apply Now
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
`;
  const returnStatementEnd = '    </section>\n  );';
  code = code.replace(returnStatementEnd, floatingBar + '\n' + returnStatementEnd);
  
  fs.writeFileSync('src/components/home/JobOpportunities.tsx', code);
}
