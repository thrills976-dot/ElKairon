const fs = require('fs');

let code = fs.readFileSync('src/components/Home.tsx', 'utf-8');
code = code.replace(/<InViewLoader>/g, '<InViewLoader height="min-h-[10px]">');
fs.writeFileSync('src/components/Home.tsx', code);

console.log("Updated InViewLoader heights");
