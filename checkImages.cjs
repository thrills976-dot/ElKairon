const fs = require('fs');

const tsFile = fs.readFileSync('src/data/imageMap.ts', 'utf-8');
const usedKeys = [];
const srcFiles = require('child_process').execSync('grep -h "BACKGROUND_IMAGES\." src/components/home/*.tsx').toString();

const regex = /BACKGROUND_IMAGES\.([a-zA-Z0-9_]+)/g;
let match;
while ((match = regex.exec(srcFiles)) !== null) {
  usedKeys.push(match[1]);
}

const uniqueUsedKeys = [...new Set(usedKeys)];

// Find what's actually defined
const definedMatch = /export const BACKGROUND_IMAGES = \{([^}]*)\};/s.exec(tsFile);
if (!definedMatch) {
  console.log("Could not parse BACKGROUND_IMAGES");
  process.exit(1);
}

const definedContent = definedMatch[1];
const definedKeys = [];
const definedRegex = /([a-zA-Z0-9_]+)\s*:/g;
while ((match = definedRegex.exec(definedContent)) !== null) {
  definedKeys.push(match[1]);
}

const missing = uniqueUsedKeys.filter(k => !definedKeys.includes(k));
console.log("Missing keys:", missing);

