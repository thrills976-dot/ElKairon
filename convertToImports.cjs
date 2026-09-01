const fs = require('fs');

const mapCode = fs.readFileSync('src/data/imageMap.ts', 'utf-8');

// We want to extract all the `/images/X.jpg` strings, create imports for them, and replace the strings with the import variables.

let imports = '';
let newMapCode = mapCode;

const regex = /'\/images\/([^']+)\.jpg'/g;
let match;
const imported = {};

while ((match = regex.exec(mapCode)) !== null) {
  const filename = match[1];
  const varName = 'img_' + filename.replace(/[^a-zA-Z0-9]/g, '_');
  if (!imported[filename]) {
    imports += `import ${varName} from '../../public/images/${filename}.jpg';\n`;
    imported[filename] = varName;
  }
}

for (const [filename, varName] of Object.entries(imported)) {
  const replaceRegex = new RegExp(`'\\/images\\/${filename}\\.jpg'`, 'g');
  newMapCode = newMapCode.replace(replaceRegex, varName);
}

fs.writeFileSync('src/data/imageMap.ts', imports + '\n' + newMapCode);
console.log("Converted to imports");
