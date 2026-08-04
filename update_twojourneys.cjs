const fs = require('fs');
let code = fs.readFileSync('src/components/home/TwoJourneys.tsx', 'utf-8');

code = code.replace(
  'bg-navy-900',
  'bg-gradient-to-br from-[#0DA2E7] to-[#065A8C]'
);

fs.writeFileSync('src/components/home/TwoJourneys.tsx', code);
