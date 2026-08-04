const fs = require('fs');
let code = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

code = code.replace(
  'className="text-5xl md:text-6xl lg:text-7xl font-display font-bold italic text-white leading-[1.1] drop-shadow-lg"',
  'className="text-5xl md:text-6xl lg:text-7xl font-display font-bold italic text-white leading-[1.1] drop-shadow-lg mix-blend-difference"'
);

code = code.replace(
  'className="relative z-10 text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed drop-shadow-md"',
  'className="relative z-10 text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed drop-shadow-md mix-blend-difference"'
);

fs.writeFileSync('src/components/home/Hero.tsx', code);
