const fs = require('fs');
const path = require('path');

const file = fs.readFileSync('src/data/imageMap.ts', 'utf8');

// We need to replace all instances of '/images/filename.webp' 
// with an import at the top: import filename from '../../assets/images/filename.jpg'

const regex = /:\s*'\/images\/(.+)\.webp'/g;
let match;
let imports = '';
let newContent = file;

while ((match = regex.exec(file)) !== null) {
  const varName = match[1].replace(/_bg_|_1786.+|[-_]/g, function(str) {
    if (str.startsWith('_') || str.startsWith('-')) return '';
    return str;
  }); // simplistic, but let's just make a valid JS variable name
  const safeVarName = 'img_' + match[1].replace(/[^a-zA-Z0-9]/g, '');
  
  imports += `import ${safeVarName} from '../assets/images/${match[1]}.jpg';\n`;
  newContent = newContent.replace(match[0], `: ${safeVarName}`);
}

fs.writeFileSync('src/data/imageMap.ts', imports + '\n' + newContent);
console.log('imageMap.ts updated with direct imports!');
