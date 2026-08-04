const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

code = code.replace('className="bg-white border-t border-gray-200 mt-auto z-10 relative"', 'className="bg-[#044c77] border-t border-white/10 mt-auto z-10 relative text-white"');
code = code.replace('text-navy-900', 'text-white'); // "Join our Career Updates"
code = code.replace('text-gray-500', 'text-gray-300'); // "Stay informed"
code = code.replace('border-gray-300', 'border-white/20 bg-white/10 text-white placeholder-gray-300'); // input field
code = code.replace('text-gray-500', 'text-gray-300'); // container text
code = code.replace('text-gray-500 hover:text-navy-900', 'text-gray-400 hover:text-white');
code = code.replace('text-navy-900', 'text-white'); // Follow our Placements

fs.writeFileSync('src/components/Layout.tsx', code);
