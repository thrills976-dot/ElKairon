const fs = require('fs');
let code = fs.readFileSync('src/components/home/EmployerSection.tsx', 'utf-8');

code = code.replace('className="py-24 bg-white border-b border-gray-100"', 'className="py-24 bg-[#044c77] border-b border-white/10"');
code = code.replace('text-teal-600', 'text-teal-300');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('text-gray-600', 'text-gray-200');
code = code.replace('text-teal-600', 'text-teal-300'); // for the check circles
code = code.replace('text-gray-700', 'text-gray-100');
code = code.replace('bg-[#065A8C]', 'bg-[#0DA2E7]');
code = code.replace('hover:bg-[#054a74]', 'hover:bg-[#0da2e7]');
code = code.replace('bg-[#065A8C]', 'bg-[#0DA2E7]');

fs.writeFileSync('src/components/home/EmployerSection.tsx', code);
