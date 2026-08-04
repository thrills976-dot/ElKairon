const fs = require('fs');
let code = fs.readFileSync('src/components/home/TwoJourneys.tsx', 'utf-8');

code = code.replace('className="py-24 bg-white relative overflow-hidden"', 'className="py-24 bg-[#065A8C] relative overflow-hidden"');
code = code.replace('text-teal-600', 'text-teal-200');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('bg-gray-50 border border-gray-100', 'bg-white/10 backdrop-blur-md border border-white/20 text-white');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('text-gray-600', 'text-gray-100');
code = code.replace('text-gray-600', 'text-gray-100');
code = code.replace('text-teal-600 font-bold uppercase tracking-widest text-sm group-hover:text-teal-700', 'text-teal-300 font-bold uppercase tracking-widest text-sm group-hover:text-teal-100');

fs.writeFileSync('src/components/home/TwoJourneys.tsx', code);
