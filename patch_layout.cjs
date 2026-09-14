const fs = require('fs');

let layoutCode = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

layoutCode = layoutCode.replace(
  `import { RecruitmentJourneyCanvas } from './3d/RecruitmentJourneyCanvas';`,
  `import React, { Suspense } from 'react';\nconst RecruitmentJourneyCanvas = React.lazy(() => import('./3d/RecruitmentJourneyCanvas').then(m => ({ default: m.RecruitmentJourneyCanvas })));`
);

layoutCode = layoutCode.replace(
  `<RecruitmentJourneyCanvas scrollProgress={scrollProgress} />`,
  `<Suspense fallback={null}><RecruitmentJourneyCanvas scrollProgress={scrollProgress} /></Suspense>`
);

fs.writeFileSync('src/components/Layout.tsx', layoutCode);
console.log('Fixed Layout.tsx');
