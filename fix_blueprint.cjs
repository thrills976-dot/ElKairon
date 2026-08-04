const fs = require('fs');
let code = fs.readFileSync('firebase-blueprint.json', 'utf-8');
code = code.replace(/"type": "number"/g, '"type": "timestamp"');
fs.writeFileSync('firebase-blueprint.json', code);
