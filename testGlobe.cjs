const fs = require('fs');

const tsFile = fs.readFileSync('src/components/home/Globe.tsx', 'utf-8');

console.log(tsFile.indexOf('textGroup.rotation.y -= 0.012'));
console.log(tsFile.indexOf('textGroup.rotation.y -= '));

