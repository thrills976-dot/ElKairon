const fs = require('fs');
let code = fs.readFileSync('src/components/home/JobOpportunities.tsx', 'utf-8');

code = code.replace('text-gray-600', 'text-white/80'); // The paragraph under header
code = code.replace('text-navy-900', 'text-white'); // "Recommended Opportunities"
code = code.replace('className="bg-white border border-gray-100', 'className="bg-white/10 backdrop-blur-md border border-white/20');
code = code.replace('bg-white border border-gray-100', 'bg-white/10 backdrop-blur-md border border-white/20'); // replacing all occurrences
code = code.replace(/text-navy-900/g, 'text-white');
code = code.replace(/text-gray-600/g, 'text-gray-200');
code = code.replace(/text-gray-500/g, 'text-gray-300');
code = code.replace(/bg-gray-50/g, 'bg-white/5');
code = code.replace(/bg-gray-100/g, 'bg-white/10');
code = code.replace(/bg-white/g, 'bg-[#0DA2E7]/20');
code = code.replace(/border-gray-100/g, 'border-white/10');
code = code.replace(/border-gray-200/g, 'border-white/20');
code = code.replace(/border-gray-300/g, 'border-white/30');

fs.writeFileSync('src/components/home/JobOpportunities.tsx', code);
