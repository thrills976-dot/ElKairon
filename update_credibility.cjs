const fs = require('fs');
let code = fs.readFileSync('src/components/home/CredibilityStrip.tsx', 'utf-8');

code = code.replace('bg-navy-900 border-b border-navy-800', 'bg-[#044c77] border-b border-[#033b5c]');
code = code.replace('border-navy-800', 'border-white/10');
code = code.replace('text-navy-600', 'text-white/20');
code = code.replace('text-navy-600', 'text-white/20');
code = code.replace('text-gray-400', 'text-gray-200');
code = code.replace('text-gray-400', 'text-gray-200');
code = code.replace('text-gray-400', 'text-gray-200');
code = code.replace('text-gray-400', 'text-gray-200');
code = code.replace('bg-navy-800', 'bg-[#065A8C]');
code = code.replace('bg-navy-800', 'bg-[#065A8C]');
code = code.replace('bg-navy-800', 'bg-[#065A8C]');

fs.writeFileSync('src/components/home/CredibilityStrip.tsx', code);
