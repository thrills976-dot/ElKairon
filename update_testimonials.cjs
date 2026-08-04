const fs = require('fs');
let code = fs.readFileSync('src/components/home/Testimonials.tsx', 'utf-8');

code = code.replace('className="py-24 bg-gray-50 border-b border-gray-200"', 'className="py-24 bg-gradient-to-b from-[#044c77] to-[#065A8C] border-b border-white/10"');
code = code.replace('text-teal-600', 'text-teal-300');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('bg-white p-10 rounded-2xl border border-gray-100', 'bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20');
code = code.replace('bg-gray-100 text-navy-600', 'bg-[#065A8C] text-white');
code = code.replace('text-gray-600', 'text-gray-100');
code = code.replace('text-navy-900', 'text-white');
code = code.replace('text-gray-500', 'text-gray-300');

fs.writeFileSync('src/components/home/Testimonials.tsx', code);
