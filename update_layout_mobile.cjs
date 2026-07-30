const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

code = code.replace(
  '<span className="text-lg md:text-xl font-bold tracking-tight uppercase leading-none">\n                ElKairon <span className="text-gold-500">Global Connect</span>\n              </span>',
  '<span className="text-[13px] sm:text-lg md:text-xl font-bold tracking-tight uppercase leading-none whitespace-nowrap">\n                ElKairon <span className="text-gold-500">Global Connect</span>\n              </span>'
);

fs.writeFileSync('src/components/Layout.tsx', code);
