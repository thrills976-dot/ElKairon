const fs = require('fs');
let code = fs.readFileSync('src/components/Home.tsx', 'utf-8');
code = code.replace(
  `      <div className="w-full relative">\n        <CredibilityStrip />\n      </motion.div>`,
  `      <div className="w-full relative">\n        <CredibilityStrip />\n      </div>`
);
fs.writeFileSync('src/components/Home.tsx', code);
