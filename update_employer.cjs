const fs = require('fs');
let code = fs.readFileSync('src/components/home/EmployerSection.tsx', 'utf-8');

code = code.replace(
  'aspect-[4/3] bg-navy-900',
  'aspect-[4/3] bg-[#065A8C]'
);

code = code.replace(
  'from-navy-900 to-teal-900',
  'from-[#0DA2E7] to-[#065A8C]'
);

code = code.replace(
  'bg-navy-900 text-white px-8 py-4',
  'bg-[#065A8C] text-white px-8 py-4'
);

code = code.replace(
  'hover:bg-navy-800',
  'hover:bg-[#054a74]'
);

fs.writeFileSync('src/components/home/EmployerSection.tsx', code);
