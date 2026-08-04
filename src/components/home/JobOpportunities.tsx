import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Briefcase, Filter, Search, ArrowRight, ChevronDown, Check, Columns, X } from 'lucide-react';
import { useEffect } from 'react';

type Job = {
  id: string;
  title: string;
  countries: string[];
  industry: string;
  salary: string;
  type: string;
  experience: string;
  skills: string[];
  description: string;
};

const JOBS: Job[] = [
  {
    id: "j1",
    title: "Senior Software Developer",
    countries: ["Netherlands", "Ireland"],
    industry: "IT & Tech",
    salary: "€3,500 - €7,000 / month",
    type: "Full-time",
    experience: "Senior (5+ years)",
    skills: ["Programming", "Networking", "Systems", "English"],
    description: "Leading IT companies and tech firms in Ireland and the Netherlands are actively hiring skilled international professionals."
  },
  {
    id: "j2",
    title: "Registered Nurse & Caregiver",
    countries: ["Canada", "Germany", "Finland"],
    industry: "Healthcare",
    salary: "CAD $3,500 - $6,500 / month",
    type: "Full-time",
    experience: "Mid-level (2-5 years)",
    skills: ["Nursing", "Patient Care", "Healthcare Qualification", "English"],
    description: "Hospitals, clinics, and healthcare facilities across Canada and Europe are urgently hiring international healthcare workers."
  },
  {
    id: "j3",
    title: "Heavy Vehicle Truck Driver",
    countries: ["Norway", "Netherlands", "UK", "Denmark"],
    industry: "Transport & Logistics",
    salary: "NOK 35,000 - 55,000 / month",
    type: "Full-time",
    experience: "Entry-level (0-2 years)",
    skills: ["Driving License", "Logistics", "Physical Fitness"],
    description: "Leading logistics and delivery companies are urgently hiring Truck Drivers and Bike Delivery Riders."
  },
  {
    id: "j4",
    title: "Warehouse & Packing Staff",
    countries: ["Canada", "Hungary", "Poland", "Italy"],
    industry: "Logistics",
    salary: "CAD $2,800 - $4,200 / month",
    type: "Full-time",
    experience: "Entry-level (0-2 years)",
    skills: ["Inventory", "Physical Fitness", "Sorting", "Loading"],
    description: "Fast processing work permits for warehouse workers, packing staff, loaders, and inventory assistants."
  },
  {
    id: "j5",
    title: "Hotel Chef & Kitchen Staff",
    countries: ["UK", "Canada", "Switzerland"],
    industry: "Hospitality",
    salary: "Competitive + Overtime",
    type: "Full-time",
    experience: "Mid-level (2-5 years)",
    skills: ["Cooking", "Food Prep", "Hospitality", "English"],
    description: "Urgent hiring for hotel industry: Chefs, Cooks, Assistant cooks, kitchen helpers, and waiters."
  },
  {
    id: "j6",
    title: "Civil & Mechanical Engineer",
    countries: ["Germany", "Slovakia"],
    industry: "Engineering",
    salary: "€50,000 - €75,000 / year",
    type: "Full-time",
    experience: "Senior (5+ years)",
    skills: ["Engineering Degree", "Project Management", "AutoCAD"],
    description: "In-demand roles for engineers and technicians with stable career growth and strong future prospects."
  },
  {
    id: "j7",
    title: "Seafood Processing Worker",
    countries: ["Norway"],
    industry: "Manufacturing",
    salary: "Competitive + Benefits",
    type: "Full-time",
    experience: "Entry-level (0-2 years)",
    skills: ["Quality Check", "Packing", "Physical Fitness"],
    description: "Norway seafood processing companies are urgently hiring workers for packing and factory operations."
  },
  {
    id: "j8",
    title: "Finance Supervisor & Accountant",
    countries: ["Slovakia", "Luxembourg"],
    industry: "Finance",
    salary: "Up to €42,300 / year",
    type: "Full-time",
    experience: "Mid-level (2-5 years)",
    skills: ["Accounting", "Finance", "Management"],
    description: "Diverse job opportunities in sectors like finance, retail, and manufacturing with average 40-hour work weeks."
  },
  {
    id: "j9",
    title: "Construction Worker",
    countries: ["Switzerland", "Serbia", "Denmark"],
    industry: "Construction",
    salary: "€2,500 - €4,000 / month",
    type: "Full-time",
    experience: "Entry-level (0-2 years)",
    skills: ["Manual Labor", "Maintenance", "Physical Fitness"],
    description: "Construction and maintenance workers wanted for immediate placement. Work permits processed in 4 to 5 weeks."
  }
];

// Extract unique skills, industries, and countries for filters
const allSkills = Array.from(new Set(JOBS.flatMap(j => j.skills))).sort();
const allIndustries = Array.from(new Set(JOBS.map(j => j.industry))).sort();
const allCountries = Array.from(new Set(JOBS.flatMap(j => j.countries))).sort();
const allExperienceLevels = Array.from(new Set(JOBS.map(j => j.experience))).sort();

export function JobOpportunities() {
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

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const filteredJobs = useMemo(() => {
    return JOBS.filter(job => {
      const matchSearch = searchQuery === '' || job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchIndustry = selectedIndustry === 'All' || job.industry === selectedIndustry;
      const matchCountry = selectedCountry === 'All' || job.countries.includes(selectedCountry);
      const matchExperience = selectedExperience === 'All' || job.experience === selectedExperience;
      
      const matchSkills = selectedSkills.length === 0 || selectedSkills.some(skill => job.skills.includes(skill));

      return matchSearch && matchIndustry && matchCountry && matchExperience && matchSkills;
    });
  }, [searchQuery, selectedSkills, selectedIndustry, selectedCountry, selectedExperience]);

  const whatsappNumber = "+263774629109";

  return (
    <section className="py-24 bg-[#0DA2E7] relative overflow-hidden" id="jobs">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-teal-200 uppercase mb-4">Global Opportunities</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white italic mb-6">
            Featured Roles Across the Globe
          </h3>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Don't just search for titles. Select your skills and preferences below, and our advanced matching system will recommend the best global opportunities for you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 flex flex-col gap-6">
            <div className="bg-navy-900 rounded-2xl p-6 text-white shadow-xl sticky top-24 z-30">
              {/* Search Bar */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-navy-300 mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors"
                  />
                  <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 border-b border-navy-700 pb-4">
                <Filter size={20} className="text-gold-500" />
                <h3 className="font-display text-xl font-bold">Preferences</h3>
              </div>
              
              {/* Country Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-navy-300 mb-2">Location</label>
                <div className="relative">
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full appearance-none bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
                  >
                    <option value="All">Anywhere</option>
                    {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
                </div>
              </div>

              {/* Industry Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-navy-300 mb-2">Industry</label>
                <div className="relative">
                  <select 
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full appearance-none bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
                  >
                    <option value="All">All Industries</option>
                    {allIndustries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-navy-300 mb-2">Experience</label>
                <div className="relative">
                  <select 
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full appearance-none bg-navy-800 border border-navy-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-teal-500 transition-colors cursor-pointer"
                  >
                    <option value="All">Any Experience Level</option>
                    {allExperienceLevels.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none" />
                </div>
              </div>

              {/* Skills Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-navy-300 mb-3">Your Skills</label>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 ${
                        selectedSkills.includes(skill) 
                          ? 'bg-teal-600 border-teal-600 text-white' 
                          : 'border-navy-700 text-navy-200 hover:border-navy-500'
                      }`}
                    >
                      {selectedSkills.includes(skill) && <Check size={12} />}
                      {skill}
                    </button>
                  ))}
                </div>
                {selectedSkills.length > 0 && (
                  <button 
                    onClick={() => setSelectedSkills([])}
                    className="text-xs text-gold-500 hover:text-gold-400 mt-3 underline decoration-dotted underline-offset-2"
                  >
                    Clear Skills
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex justify-between items-end">
              <h3 className="text-xl font-bold text-white">
                {selectedSkills.length > 0 || selectedIndustry !== 'All' || selectedCountry !== 'All' || selectedExperience !== 'All' 
                  ? 'Recommended Opportunities' 
                  : 'Available Opportunities'}
              </h3>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map(job => {
                  const message = encodeURIComponent(`Hi, I am interested in the ${job.title} position in ${job.countries.join('/')}. Could you provide more details?`);
                  return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={job.id}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full relative"
                  >
                    {/* Top badging */}
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full border border-teal-100">
                        {job.industry}
                      </span>
                      <span className="text-xs font-bold text-navy-900 bg-white px-2 py-1 rounded border border-white/20">
                        {job.type}
                      </span>
                    </div>

                    <h4 className="font-display text-xl font-bold text-white mb-2 leading-tight group-hover:text-teal-300 transition-colors">
                      {job.title}
                    </h4>
                    
                    <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-200 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={16} className="text-gold-500" />
                        <span>{job.countries.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} className="text-gold-500" />
                        <span className="font-medium text-teal-300">{job.salary}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-200 mb-6 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/20">
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {job.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white px-2 py-1 rounded">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-navy-900 text-white flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm hover:bg-teal-600 transition-colors group-hover:shadow-md"
                      >
                        Apply via WhatsApp
                        <ArrowRight size={16} />
                      </motion.a>
                    </div>
                  </motion.div>
                )})}
              </AnimatePresence>

              {filteredJobs.length === 0 && (
                <div className="col-span-full py-12 text-center bg-white/5 rounded-2xl border border-dashed border-white/20">
                  <Search className="mx-auto text-gray-300 mb-4" size={48} />
                  <h4 className="text-lg font-bold text-white mb-2">No matching jobs found</h4>
                  <p className="text-gray-300 text-sm">Try adjusting your filters or clearing your skill selections to see more opportunities.</p>
                  <button 
                    onClick={() => {
                      setSelectedSkills([]);
                      setSelectedCountry('All');
                      setSelectedIndustry('All');
                      setSelectedExperience('All');
                    }}
                    className="mt-4 px-6 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-bold shadow-sm hover:bg-white/20"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

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
                          href={`https://wa.me/${whatsappNumber}?text=I am interested in the ${job.title} position.`}
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

    </section>
  );
}
