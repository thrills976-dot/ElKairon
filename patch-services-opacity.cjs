const fs = require('fs');
let code = fs.readFileSync('src/components/home/Services.tsx', 'utf-8');
code = code.replace('opacity-25', 'opacity-50');
code = code.replace('from-navy-950/90 via-navy-950/95 to-navy-950', 'from-navy-950/70 via-navy-950/80 to-navy-950/90');
fs.writeFileSync('src/components/home/Services.tsx', code);
