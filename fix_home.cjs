const fs = require('fs');
let code = fs.readFileSync('src/components/Home.tsx', 'utf-8');

code = code.replace(
  "import { FAQ } from './home/FAQ';",
  "import { FAQ } from './home/FAQ';\nimport { NewsletterSignup } from './home/NewsletterSignup';"
);

code = code.replace(
  "<FinalCTA onNavigate={onNavigate} />",
  "<NewsletterSignup />\n        <FinalCTA onNavigate={onNavigate} />"
);

fs.writeFileSync('src/components/Home.tsx', code);
