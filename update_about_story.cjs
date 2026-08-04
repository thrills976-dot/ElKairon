const fs = require('fs');
let code = fs.readFileSync('src/components/home/AboutStory.tsx', 'utf-8');

code = code.replace('className="py-32 bg-white relative overflow-hidden"', 'className="py-32 bg-[#065A8C] relative overflow-hidden"');
code = code.replace('bg-gray-50', 'bg-[#0DA2E7]/20');
code = code.replace('text-gold-600', 'text-gold-400');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('text-teal-600', 'text-teal-300');
code = code.replace('text-gray-600', 'text-gray-200');
code = code.replace('text-gray-600', 'text-gray-200');
code = code.replace('bg-gray-200', 'bg-white/20');
code = code.replace('text-navy-800', 'text-white');

fs.writeFileSync('src/components/home/AboutStory.tsx', code);
