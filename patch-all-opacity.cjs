const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/home/*.tsx');

files.forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  let original = code;
  
  // Replace all opacity-20, opacity-25, opacity-30 on background images to opacity-50 or opacity-60
  // Looking at the grep, they often have "bg-cover bg-center opacity-..."
  code = code.replace(/opacity-20 overflow-hidden/g, 'opacity-50 overflow-hidden');
  code = code.replace(/opacity-25 overflow-hidden/g, 'opacity-50 overflow-hidden');
  code = code.replace(/opacity-30 overflow-hidden/g, 'opacity-60 overflow-hidden');
  
  if (code !== original) {
    fs.writeFileSync(file, code);
  }
});
