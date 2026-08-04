const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf-8');

code = code.replace(/is number/g, 'is timestamp');
code = code.replace(/request.time.toMillis\(\)/g, 'request.time');

fs.writeFileSync('firestore.rules', code);
