const fs = require('fs');

let homeCode = fs.readFileSync('src/components/Home.tsx', 'utf-8');

homeCode = homeCode.replace(
  `import { Hero } from './home/Hero';`,
  `import { Hero } from './home/Hero';\nimport { InViewLoader } from './InViewLoader';`
);

const oldLazySection = `function LazySection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-48 flex items-center justify-center opacity-50"><div className="w-6 h-6 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" /></div>}>
      {children}
    </Suspense>
  );
}`;

homeCode = homeCode.replace(oldLazySection, '');

const sectionRegex = /<LazySection>([\s\S]*?)<\/LazySection>/;
const match = homeCode.match(sectionRegex);

if (match) {
  let content = match[1];
  
  // Replace <motion.div {...sectionAnimation}> <Component /> </motion.div> with <InViewLoader><Component /></InViewLoader>
  content = content.replace(/<motion\.div \{\.\.\.sectionAnimation\}>\s*<([A-Za-z0-9]+)([^>]*)>\s*<\/motion\.div>/g, '<InViewLoader><$1$2></InViewLoader>');
  
  homeCode = homeCode.replace(match[0], content);
}

// Remove sectionAnimation since it's now in InViewLoader
const sectionAnimationRegex = /const sectionAnimation = {[\s\S]*?};/;
homeCode = homeCode.replace(sectionAnimationRegex, '');

fs.writeFileSync('src/components/Home.tsx', homeCode);
console.log('Fixed Home.tsx with InViewLoader');
