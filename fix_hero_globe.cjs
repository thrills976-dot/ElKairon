const fs = require('fs');

let heroCode = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

heroCode = heroCode.replace(
  `import React, { Suspense } from 'react';`,
  `import React, { Suspense, useState, useEffect } from 'react';`
);

// find where <Globe /> is, and we need to wrap it in a state that enables after mount
const globeUsage = `<Suspense fallback={<div className="w-full h-full bg-navy-950/80 animate-pulse rounded-full blur-3xl absolute inset-0" />}>
            <Globe />
          </Suspense>`;

const replacement = `{loadGlobe && (
            <Suspense fallback={<div className="w-full h-full bg-navy-950/80 animate-pulse rounded-full blur-3xl absolute inset-0" />}>
              <Globe />
            </Suspense>
          )}`;

heroCode = heroCode.replace(globeUsage, replacement);

const exportFunc = `export function Hero({ onNavigate }: HeroProps) {`;
const exportReplacement = `export function Hero({ onNavigate }: HeroProps) {
  const [loadGlobe, setLoadGlobe] = useState(false);
  useEffect(() => {
    // Delay globe initialization slightly to prioritize first paint
    const timer = setTimeout(() => setLoadGlobe(true), 1500);
    return () => clearTimeout(timer);
  }, []);
`;

heroCode = heroCode.replace(exportFunc, exportReplacement);

fs.writeFileSync('src/components/home/Hero.tsx', heroCode);
console.log('Fixed Hero.tsx globe loading');
