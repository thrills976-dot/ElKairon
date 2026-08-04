const fs = require('fs');
let code = fs.readFileSync('src/components/home/WhyElKairon.tsx', 'utf-8');

code = code.replace('bg-gray-50 border-t border-gray-100', 'bg-gradient-to-br from-[#0DA2E7] to-[#065A8C]');
code = code.replace('text-teal-600', 'text-teal-200');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('bg-white p-8 rounded-2xl border border-gray-100', 'bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('text-gray-600', 'text-gray-100');
code = code.replace('text-gray-600', 'text-gray-100');
code = code.replace('text-gray-600', 'text-gray-100');
code = code.replace('text-gray-600', 'text-gray-100');
code = code.replace('text-gray-600', 'text-gray-100');

fs.writeFileSync('src/components/home/WhyElKairon.tsx', code);
