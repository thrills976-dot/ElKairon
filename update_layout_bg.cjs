const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

code = code.replace(
  "isScrolled \n            ? 'bg-navy-900 py-4 border-b-4 border-gold-500 shadow-lg' \n            : 'bg-transparent py-6 border-b border-transparent'",
  "isScrolled \n            ? 'bg-gradient-to-r from-[#0DA2E7] to-[#065A8C] py-4 border-b-4 border-gold-500 shadow-lg' \n            : 'bg-transparent py-6 border-b border-transparent'"
);

code = code.replace(
  'className="fixed inset-0 z-40 bg-navy-900/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-8 pb-8"',
  'className="fixed inset-0 z-40 bg-[#065A8C]/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-8 pb-8"'
);

fs.writeFileSync('src/components/Layout.tsx', code);
