const fs = require('fs');

const file = fs.readFileSync('src/data/imageMap.ts', 'utf8');

const regex = /:\s*'\/images\/(.+)\.webp'/g;
let match;
let imports = '';
let newContent = file;

while ((match = regex.exec(file)) !== null) {
  const safeVarName = 'img_' + match[1].replace(/[^a-zA-Z0-9]/g, '');
  
  imports += `import ${safeVarName} from '../../assets/images/${match[1]}.jpg';\n`;
  newContent = newContent.replace(match[0], `: ${safeVarName}`);
}

fs.writeFileSync('src/data/imageMap.ts', imports + '\n' + newContent);
console.log('imageMap.ts updated with direct imports!');
