const fs = require('fs');
let code = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

code = code.replace(
  'bg-navy-900 pt-20 border-b-4 border-gold-500',
  'bg-gradient-to-br from-[#0DA2E7] to-[#065A8C] pt-20 border-b-4 border-gold-500'
);

code = code.replace(
  'mix-blend-difference',
  ''
);

code = code.replace(
  'mix-blend-difference',
  ''
);

fs.writeFileSync('src/components/home/Hero.tsx', code);
