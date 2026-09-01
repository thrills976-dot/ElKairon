const fs = require('fs');
let code = fs.readFileSync('src/components/ui/LazyImage.tsx', 'utf-8');
code = code.replace(/decoding="async"/g, 'decoding="async"\n        referrerPolicy="no-referrer"');
fs.writeFileSync('src/components/ui/LazyImage.tsx', code);
