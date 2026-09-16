const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf-8');
console.log('root div exists:', indexHtml.includes('id="root"'));
console.log('main script exists:', indexHtml.includes('src="/src/main.tsx"'));

const mainTsx = fs.readFileSync('src/main.tsx', 'utf-8');
console.log('react mounts to root:', mainTsx.includes("document.getElementById('root')"));
console.log('App is rendered:', mainTsx.includes("<App />"));

