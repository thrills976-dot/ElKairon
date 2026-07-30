const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  /const \[logoError, setLogoError\] = useState\(false\);/,
  ''
);

code = code.replace(
  /<img [\s\S]*?className={`h-24 w-auto object-contain \${logoError \? 'hidden' : 'block'}`}[\s\S]*?onError=\{\(\) => setLogoError\(true\)\}[\s\S]*?\/>/,
  '<img src="/logo.png" alt="ElKairon Global Connect Logo" className="h-24 w-auto object-contain block" />'
);

code = code.replace(/\{logoError && \([\s\S]*?<\/>\n        \)}/g, '');
code = code.replace(/\{logoError && \([\s\S]*?\}\)/g, ''); // just in case

fs.writeFileSync('src/App.tsx', code);
