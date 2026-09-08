const fs = require('fs');
let code = fs.readFileSync('src/components/portal/CandidateDashboard.tsx', 'utf8');

const oldImports = `import { 
  INITIAL_JOBS, RECOMMENDED_COURSES, MOCK_RECRUITER_VIEWS, 
  POPULAR_SKILLS, TARGET_COUNTRIES 
} from '../../data/mockRecruitmentData';`;

const newImports = `import { 
  RECOMMENDED_COURSES, MOCK_RECRUITER_VIEWS, 
  POPULAR_SKILLS, TARGET_COUNTRIES 
} from '../../data/mockRecruitmentData';`;

code = code.replace(oldImports, newImports);
fs.writeFileSync('src/components/portal/CandidateDashboard.tsx', code);
console.log("Candidate dashboard imports patched.");
