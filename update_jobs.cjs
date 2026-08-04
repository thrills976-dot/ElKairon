const fs = require('fs');
let code = fs.readFileSync('src/components/home/JobOpportunities.tsx', 'utf-8');

code = code.replace('className="py-24 bg-white relative overflow-hidden"', 'className="py-24 bg-[#0DA2E7] relative overflow-hidden"');
code = code.replace('text-navy-900', 'text-white'); // "Smart Job Matching" -> wait, I replaced that in previous turn to "Featured Roles Across the Globe"
// Let's do selective replace.

fs.writeFileSync('src/components/home/JobOpportunities.tsx', code);
