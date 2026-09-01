const fs = require('fs');
let code = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');
code = code.replace('opacity-25', 'opacity-60');
code = code.replace('from-navy-950/80 via-navy-900/60 to-navy-950', 'from-navy-950/50 via-navy-900/40 to-navy-950/90');
fs.writeFileSync('src/components/home/Hero.tsx', code);
