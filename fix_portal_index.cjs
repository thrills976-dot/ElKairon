const fs = require('fs');
let code = fs.readFileSync('src/components/portal/index.tsx', 'utf-8');
code = code.replace(/key="candidate-form"/g, '');
code = code.replace(/key="employer-form"/g, '');
fs.writeFileSync('src/components/portal/index.tsx', code);
