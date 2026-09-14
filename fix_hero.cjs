const fs = require('fs');

let heroCode = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

heroCode = heroCode.replace("import { Globe } from './Globe';", `import React, { Suspense } from 'react';\nconst Globe = React.lazy(() => import('./Globe').then(m => ({ default: m.Globe })));`);

heroCode = heroCode.replace("<Globe />", `<Suspense fallback={<div className="w-full h-full bg-navy-950/80 animate-pulse rounded-full blur-3xl absolute inset-0" />}>\n            <Globe />\n          </Suspense>`);

fs.writeFileSync('src/components/home/Hero.tsx', heroCode);
console.log('Fixed Hero.tsx');
