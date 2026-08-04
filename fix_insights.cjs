const fs = require('fs');
let code = fs.readFileSync('src/components/pages/InsightsPage.tsx', 'utf-8');

if (!code.includes('CandidateGuides')) {
  code = code.replace(
    "import { Testimonials } from '../home/Testimonials';",
    "import { Testimonials } from '../home/Testimonials';\nimport { CandidateGuides } from '../insights/CandidateGuides';"
  );
  
  code = code.replace(
    "<FAQ />",
    "<FAQ />\n      <CandidateGuides />"
  );
  
  fs.writeFileSync('src/components/pages/InsightsPage.tsx', code);
}
