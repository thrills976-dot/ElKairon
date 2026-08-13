import { BACKGROUND_IMAGES } from '../../data/imageMap';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Briefcase, Filter, Search, ArrowRight, ChevronDown, Check } from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';

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
  image?: string;
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
    description: "Leading IT companies and tech firms in Ireland and the Netherlands are actively hiring skilled international professionals.",
    image: BACKGROUND_IMAGES.softwareDeveloper
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
    description: "Hospitals, clinics, and healthcare facilities across Canada and Europe are urgently hiring international healthcare workers.",
    image: BACKGROUND_IMAGES.healthcareNursing
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
    description: "Leading logistics and delivery companies are urgently hiring Truck Drivers and Bike Delivery Riders.",
    image: BACKGROUND_IMAGES.truckDriver
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
    description: "Fast processing work permits for warehouse workers, packing staff, loaders, and inventory assistants.",
    image: BACKGROUND_IMAGES.logisticsWarehouse
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
    description: "Urgent hiring for hotel industry: Chefs, Cooks, Assistant cooks, kitchen helpers, and waiters.",
    image: BACKGROUND_IMAGES.hotelChef
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
    description: "In-demand roles for engineers and technicians with stable career growth and strong future prospects.",
    image: BACKGROUND_IMAGES.centralEuropeHub
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
    description: "Norway seafood processing companies are urgently hiring workers for packing and factory operations.",
    image: BACKGROUND_IMAGES.seafoodProcessing
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
    description: "Diverse job opportunities in sectors like finance, retail, and manufacturing with average 40-hour work weeks.",
    image: BACKGROUND_IMAGES.corporateHandshake
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
    description: "Construction and maintenance workers wanted for immediate placement. Work permits processed in 4 to 5 weeks.",
    image: BACKGROUND_IMAGES.constructionEngineering
  }
];

// Extract unique skills, industries, and countries for filters
const allSkills = Array.from(new Set(JOBS.flatMap(j => j.skills))).sort();
const allIndustries = Array.from(new Set(JOBS.map(j => j.industry))).sort();
const allCountries = Array.from(new Set(JOBS.flatMap(j => j.countries))).sort();
const allExperienceLevels = Array.from(new Set(JOBS.map(j => j.experience))).sort();

export function JobOpportunities() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<string>('All');

  useEffect(() => {
    const handleGlobalSearch = (e: any) => {
      if (e.detail && typeof e.detail === 'string') {
        setSearchQuery(e.detail);
      }
    };
    window.addEventListener('globalSearch', handleGlobalSearch);
    return () => window.removeEventListener('globalSearch', handleGlobalSearch);
  }, []);

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
    <section className="py-24 bg-gradient-to-b from-[#065A8C] via-[#044c77] to-navy-950 relative overflow-hidden text-white" id="jobs">
      {/* Background parallax and ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-[140px] pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/10 rounded-full blur-[140px] pointer-events-none transform-gpu" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-3 block">
            Direct Global Placement
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight italic">
            Smart Job <span className="text-teal-300">Matching</span>
          </h2>
          <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto leading-relaxed">
            Don't just search for titles. Select your skills and preferences below, and our verified matching system will recommend the best international opportunities for you.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:w-1/4 flex flex-col gap-6"
          >
            <div className="bg-navy-900/90 backdrop-blur-md rounded-2xl p-6 text-white shadow-2xl border border-white/15 sticky top-24 z-30">
              {/* Search Bar */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-sky-200 mb-2">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-navy-950 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 transition-colors text-white placeholder-sky-200/50"
                  />
                  <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-300 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Filter size={20} className="text-gold-400" />
                <h3 className="font-display text-xl font-bold text-white">Preferences</h3>
              </div>
              
              {/* Country Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-sky-200 mb-2">Location</label>
                <div className="relative">
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full appearance-none bg-navy-950 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 transition-colors cursor-pointer text-white"
                  >
                    <option value="All">Anywhere</option>
                    {allCountries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-300 pointer-events-none" />
                </div>
              </div>

              {/* Industry Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-sky-200 mb-2">Industry</label>
                <div className="relative">
                  <select 
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full appearance-none bg-navy-950 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 transition-colors cursor-pointer text-white"
                  >
                    <option value="All">All Industries</option>
                    {allIndustries.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-300 pointer-events-none" />
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-sky-200 mb-2">Experience</label>
                <div className="relative">
                  <select 
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full appearance-none bg-navy-950 border border-white/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 transition-colors cursor-pointer text-white"
                  >
                    <option value="All">Any Experience Level</option>
                    {allExperienceLevels.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-300 pointer-events-none" />
                </div>
              </div>

              {/* Skills Filter */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-sky-200 mb-3">Your Skills</label>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map(skill => (
                    <motion.button
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSkill(skill)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all flex items-center gap-1 font-medium ${
                        selectedSkills.includes(skill) 
                          ? 'bg-teal-500 border-teal-400 text-navy-950 font-bold shadow-md' 
                          : 'border-white/20 text-sky-100 hover:border-teal-400/60 bg-navy-950/60'
                      }`}
                    >
                      {selectedSkills.includes(skill) && <Check size={12} />}
                      {skill}
                    </motion.button>
                  ))}
                </div>
                {selectedSkills.length > 0 && (
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSkills([])}
                    className="text-xs text-gold-400 hover:text-gold-300 mt-3 underline decoration-dotted underline-offset-2 font-semibold block"
                  >
                    Clear All Skills
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Job List */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>
                  {selectedSkills.length > 0 || selectedIndustry !== 'All' || selectedCountry !== 'All' || selectedExperience !== 'All' 
                    ? 'Recommended Opportunities' 
                    : 'Available Verified Opportunities'}
                </span>
                <span className="text-xs bg-teal-400/20 text-teal-300 px-2.5 py-0.5 rounded-full font-mono font-bold border border-teal-400/30">
                  {filteredJobs.length} Roles
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredJobs.map((job, idx) => {
                  const message = encodeURIComponent(`Hi, I am interested in the ${job.title} position in ${job.countries.join('/')}. Could you provide more details?`);
                  return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -10 }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ 
                      y: -6,
                      scale: 1.015,
                      boxShadow: "0 20px 30px -10px rgba(10, 77, 104, 0.4)" 
                    }}
                    key={job.id}
                    className="bg-navy-900/90 backdrop-blur-md border border-white/15 hover:border-teal-400/80 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group flex flex-col h-full relative cursor-default transform-gpu p-0"
                  >
                    {/* Top Image if provided */}
                    {job.image && (
                      <div className="w-full h-40 overflow-hidden relative">
                        <LazyImage src={job.image} alt={job.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent pointer-events-none" />
                      </div>
                    )}
                    
                    <div className="p-6 flex flex-col h-full flex-grow">
                      {/* Top badging */}
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-teal-950 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-400/40">
                          {job.industry}
                        </span>
                        <span className="text-xs font-semibold text-gold-300 bg-gold-950/60 px-2.5 py-1 rounded-full border border-gold-400/30">
                          {job.type}
                        </span>
                      </div>

                      <h4 className="font-display text-xl font-bold text-white mb-2 leading-tight group-hover:text-gold-300 transition-colors">
                        {job.title}
                      </h4>

                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-sky-100 mb-4">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={16} className="text-gold-400 shrink-0" />
                          <span className="font-medium">{job.countries.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase size={16} className="text-teal-400 shrink-0" />
                          <span className="font-bold text-teal-300">{job.salary}</span>
                        </div>
                      </div>

                      <p className="text-sm text-sky-100/90 mb-6 line-clamp-2 leading-relaxed">
                        {job.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/10">
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {job.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="text-[10px] font-bold uppercase tracking-wider bg-navy-950 text-sky-200 px-2.5 py-1 rounded border border-white/10">
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-950 text-sky-200 px-2.5 py-1 rounded border border-white/10">
                              +{job.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      
                      <motion.a
                        whileHover={{ 
                          scale: 1.03, 
                          boxShadow: "0 10px 20px -5px rgba(13, 148, 136, 0.4)" 
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${message}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-colors border border-teal-400/30 group-hover:border-teal-300 shadow-md transform-gpu"
                      >
                        <span>Apply via WhatsApp</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </motion.a>
                      </div>
                    </div>
                  </motion.div>
                )})}
              </AnimatePresence>

              {filteredJobs.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-full py-16 text-center bg-navy-900/80 rounded-2xl border border-dashed border-white/30 p-8"
                >
                  <Search className="mx-auto text-sky-300 mb-4" size={48} />
                  <h4 className="text-lg font-bold text-white mb-2">No matching jobs found</h4>
                  <p className="text-sky-200 text-sm max-w-md mx-auto mb-6">
                    Try adjusting your filters or clearing your skill selections to see more global opportunities.
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setSelectedSkills([]);
                      setSelectedCountry('All');
                      setSelectedIndustry('All');
                      setSelectedExperience('All');
                      setSearchQuery('');
                    }}
                    className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-sm shadow-md transition-colors"
                  >
                    Reset All Filters
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
