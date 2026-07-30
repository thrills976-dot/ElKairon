const fs = require('fs');
let code = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

code = code.replace(
  '<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] md:w-[1200px] md:h-[1200px] bg-white/70 blur-[180px] rounded-full pointer-events-none" />',
  `<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] md:w-[1200px] md:h-[1200px] bg-white/80 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-white blur-[120px] rounded-full pointer-events-none" />`
);

fs.writeFileSync('src/components/home/Hero.tsx', code);
