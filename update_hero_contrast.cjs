const fs = require('fs');
let code = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

code = code.replace(
  '<div className="flex flex-col items-start gap-8 bg-transparent p-8 md:p-10 max-w-2xl relative z-10 pointer-events-auto">\n            <div className="absolute inset-0 pointer-events-none" />',
  '<div className="flex flex-col items-start gap-8 bg-black/10 backdrop-blur-[2px] border border-white/10 rounded-3xl p-8 md:p-10 max-w-2xl relative z-10 pointer-events-auto shadow-2xl">\n            <div className="absolute inset-0 pointer-events-none" />'
);

code = code.replace(
  'text-gray-200 max-w-xl',
  'text-white max-w-xl font-medium'
);

fs.writeFileSync('src/components/home/Hero.tsx', code);
