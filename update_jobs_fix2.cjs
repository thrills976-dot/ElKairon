const fs = require('fs');
let code = fs.readFileSync('src/components/home/JobOpportunities.tsx', 'utf-8');

code = code.replace(
  /const filteredJobs = useMemo\(\(\) => \{[\s\S]*?return matchIndustry && matchCountry && matchExperience && matchSkills;\n    \}\);\n  \}, \[selectedSkills, selectedIndustry, selectedCountry, selectedExperience\]\);/,
  \`const filteredJobs = useMemo(() => {
    return JOBS.filter(job => {
      const matchSearch = searchQuery === '' || job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchIndustry = selectedIndustry === 'All' || job.industry === selectedIndustry;
      const matchCountry = selectedCountry === 'All' || job.countries.includes(selectedCountry);
      const matchExperience = selectedExperience === 'All' || job.experience === selectedExperience;
      const matchSkills = selectedSkills.length === 0 || selectedSkills.some(skill => job.skills.includes(skill));
      return matchSearch && matchIndustry && matchCountry && matchExperience && matchSkills;
    });
  }, [searchQuery, selectedSkills, selectedIndustry, selectedCountry, selectedExperience]);\`.replace(/\\\`/g, '\`')
);

fs.writeFileSync('src/components/home/JobOpportunities.tsx', code);
