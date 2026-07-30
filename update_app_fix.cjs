const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  '<img src="/logo.png" alt="ElKairon Global Connect Logo" className="h-24 w-auto object-contain block" />',
  '<img src="/logo.png" alt="ElKairon Global Connect Logo" className="h-24 w-auto object-contain block" />\n        </div>'
);

fs.writeFileSync('src/App.tsx', code);
