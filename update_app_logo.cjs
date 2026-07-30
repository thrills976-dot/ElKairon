const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  /<img \n             src="\/logo\.png" \n             alt="ElKairon Global Connect Logo" \n             className={`h-24 w-auto object-contain \${logoError \? 'hidden' : 'block'}`}\n            onError={\(\) => setLogoError\(true\)}\n          \/>/,
  '<img \n             src="/logo.png" \n             alt="ElKairon Global Connect Logo" \n             className="h-24 w-auto object-contain"\n          />'
);

fs.writeFileSync('src/App.tsx', code);
