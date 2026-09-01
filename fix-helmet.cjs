const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');
code = code.replace(/helmet\(\{/g, `helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
    xFrameOptions: false,`);
fs.writeFileSync('server.ts', code);
