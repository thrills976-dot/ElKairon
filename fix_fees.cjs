const fs = require('fs');
let code = fs.readFileSync('src/components/FeesAndPayment.tsx', 'utf-8');
code = code.replace('title={row.country}', '');
fs.writeFileSync('src/components/FeesAndPayment.tsx', code);
