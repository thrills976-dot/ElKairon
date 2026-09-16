const fs = require('fs');

const serverTs = fs.readFileSync('server.ts', 'utf-8');
console.log('server.ts NODE_ENV check:', serverTs.includes("process.env.NODE_ENV !== 'production'"));

const startScript = fs.readFileSync('package.json', 'utf-8');
console.log('dev script:', JSON.parse(startScript).scripts.dev);
