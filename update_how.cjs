const fs = require('fs');
let code = fs.readFileSync('src/components/home/HowItWorks.tsx', 'utf-8');

code = code.replace('bg-navy-900', 'bg-gradient-to-br from-[#0DA2E7] to-[#065A8C]');
code = code.replace('bg-navy-800', 'bg-white/10 backdrop-blur-md');
code = code.replace('border-navy-700', 'border-white/20');
code = code.replace('border-navy-700', 'border-white/20');
code = code.replace('text-teal-400', 'text-white');
code = code.replace('text-gray-400', 'text-gray-100');
code = code.replace('text-gray-400', 'text-gray-100');

fs.writeFileSync('src/components/home/HowItWorks.tsx', code);
