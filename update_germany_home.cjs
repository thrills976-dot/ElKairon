const fs = require('fs');

let germanyCode = fs.readFileSync('src/components/home/WhyGermany.tsx', 'utf-8');
germanyCode = germanyCode.replace('id="visas"', 'id="germany"');
fs.writeFileSync('src/components/home/WhyGermany.tsx', germanyCode);

let homeCode = fs.readFileSync('src/components/Home.tsx', 'utf-8');
homeCode = homeCode.replace(
  "import { WhyGermany } from './home/WhyGermany';",
  "import { WhyGermany } from './home/WhyGermany';\nimport { Visas } from './home/Visas';"
);
homeCode = homeCode.replace(
  "<WhyGermany />",
  "<Visas />\n      <WhyGermany />"
);
fs.writeFileSync('src/components/Home.tsx', homeCode);

