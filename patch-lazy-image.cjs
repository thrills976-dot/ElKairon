const fs = require('fs');
let code = fs.readFileSync('src/components/ui/LazyImage.tsx', 'utf-8');
code = code.replace(/<img/g, `<img onError={(e) => { console.error('Image load error:', e.currentTarget.src); e.currentTarget.style.display = 'none'; }}`);
fs.writeFileSync('src/components/ui/LazyImage.tsx', code);
