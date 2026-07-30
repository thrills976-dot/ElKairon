const fs = require('fs');
let code = fs.readFileSync('src/components/home/JobOpportunities.tsx', 'utf-8');

// add text search state
code = code.replace(
  "const [selectedCountry, setSelectedCountry] = useState<string>('All');",
  "const [selectedCountry, setSelectedCountry] = useState<string>('All');\n  const [searchQuery, setSearchQuery] = useState('');"
);

// update filtering logic to include searchQuery
code = code.replace(
  "const filteredJobs = useMemo(() => {",
  `const filteredJobs = useMemo(() => {`
);

// replace the useMemo block
code = code.replace(
  /const filteredJobs = useMemo\(\(\) => \{[\s\S]*?return matchCountry && matchIndustry && matchExperience && matchSkills;\n    \}\);\n  \}, \[selectedCountry, selectedIndustry, selectedExperience, selectedSkills\]\);/,
  `const filteredJobs = useMemo(() => {
    return JOBS.filter(job => {
      const matchSearch = searchQuery === '' || job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCountry = selectedCountry === 'All' || job.countries.includes(selectedCountry);
      const matchIndustry = selectedIndustry === 'All' || job.industry === selectedIndustry;
      const matchExperience = selectedExperience === 'All' || job.experience === selectedExperience;
      
      const matchSkills = selectedSkills.length === 0 || selectedSkills.every(skill => job.skills.includes(skill));
      
      return matchSearch && matchCountry && matchIndustry && matchExperience && matchSkills;
    });
  }, [searchQuery, selectedCountry, selectedIndustry, selectedExperience, selectedSkills]);`
);

// add the search input to UI
code = code.replace(
  '<div className="bg-navy-900 rounded-2xl p-6 text-white shadow-xl">',
  `<div className="bg-navy-900 rounded-2xl p-6 text-white shadow-xl sticky top-24 z-30">
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
              </div>`
);

// remove the Matches span
code = code.replace(
  /<span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">[\s\S]*?<\/span>/,
  ''
);

fs.writeFileSync('src/components/home/JobOpportunities.tsx', code);
