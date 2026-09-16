const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf-8');
console.log('index.html contains css link:', indexHtml.includes('stylesheet'));

const mainTsx = fs.readFileSync('src/main.tsx', 'utf-8');
console.log('main.tsx imports index.css:', mainTsx.includes('import \'./index.css\''));

const indexCss = fs.readFileSync('src/index.css', 'utf-8');
console.log('index.css has tailwind directives:', indexCss.includes('@tailwind'));

