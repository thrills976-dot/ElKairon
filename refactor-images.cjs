const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/components/home/TwoJourneys.tsx',
  'src/components/home/HowItWorks.tsx',
  'src/components/home/WhyElKairon.tsx',
  'src/components/home/Hero.tsx',
  'src/components/home/FinalCTA.tsx',
  'src/components/home/Services.tsx',
  'src/components/home/WhyGermany.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join('/app/applet', file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Add import LazyImage if not present
  if (!content.includes('LazyImage')) {
    content = content.replace(
      /import\s+.*?from\s+['"].*?['"];\n(?!import)/, 
      match => `${match}\nimport { LazyImage } from '../ui/LazyImage';\n`
    );
  }

  // Handle specific replacements
  if (file.includes('Hero.tsx')) {
    content = content.replace(
      /<div\s+className="absolute inset-0 bg-cover bg-center bg-no-repeat"\s+style=\{\{ backgroundImage: `url\('\$\{BACKGROUND_IMAGES\.heroGlobalConnect\}'\)` \}\}/g,
      '<LazyImage src={BACKGROUND_IMAGES.heroGlobalConnect.src} placeholderSrc={BACKGROUND_IMAGES.heroGlobalConnect.placeholder} alt="Global Connect Background" containerClassName="absolute inset-0 w-full h-full" className="w-full h-full object-cover" />\n        <div className="absolute inset-0"'
    );
  }
  
  if (file.includes('TwoJourneys.tsx')) {
    content = content.replace(
      /<div\s+className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-700"\s+style=\{\{ backgroundImage: `url\('\/images\/construction\.jpg'\)` \}\}/g,
      '<LazyImage src={BACKGROUND_IMAGES.constructionEngineering.src} placeholderSrc={BACKGROUND_IMAGES.constructionEngineering.placeholder} alt="Construction" containerClassName="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700" className="w-full h-full object-cover" />\n            <div className="absolute inset-0"'
    );
    if (!content.includes('BACKGROUND_IMAGES')) {
       content = "import { BACKGROUND_IMAGES } from '../../data/imageMap';\n" + content;
    }
  }

  if (file.includes('HowItWorks.tsx')) {
    content = content.replace(
      /<div\s+className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"\s+style=\{\{ backgroundImage: `url\('\$\{BACKGROUND_IMAGES\.happyCandidate\}'\)` \}\}/g,
      '<LazyImage src={BACKGROUND_IMAGES.happyCandidate.src} placeholderSrc={BACKGROUND_IMAGES.happyCandidate.placeholder} alt="Happy Candidate" containerClassName="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay" className="w-full h-full object-cover" />\n          <div className="absolute inset-0"'
    );
  }

  if (file.includes('WhyElKairon.tsx')) {
    content = content.replace(
      /<div\s+className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"\s+style=\{\{ backgroundImage: `url\('\$\{BACKGROUND_IMAGES\.germanVisa\}'\)` \}\}/g,
      '<LazyImage src={BACKGROUND_IMAGES.germanVisa.src} placeholderSrc={BACKGROUND_IMAGES.germanVisa.placeholder} alt="German Visa" containerClassName="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" className="w-full h-full object-cover" />\n          <div className="absolute inset-0"'
    );
  }

  if (file.includes('FinalCTA.tsx')) {
    content = content.replace(
      /<div\s+className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"\s+style=\{\{ backgroundImage: `url\('\$\{BACKGROUND_IMAGES\.openForBusiness\}'\)` \}\}/g,
      '<LazyImage src={BACKGROUND_IMAGES.openForBusiness.src} placeholderSrc={BACKGROUND_IMAGES.openForBusiness.placeholder} alt="Open for business" containerClassName="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay" className="w-full h-full object-cover" />\n          <div className="absolute inset-0"'
    );
  }

  if (file.includes('WhyGermany.tsx')) {
    content = content.replace(
      /<div\s+className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 mix-blend-luminosity grayscale"\s+style=\{\{ backgroundImage: `url\('\$\{BACKGROUND_IMAGES\.berlinCityscape\}'\)` \}\}/g,
      '<LazyImage src={BACKGROUND_IMAGES.berlinCityscape.src} placeholderSrc={BACKGROUND_IMAGES.berlinCityscape.placeholder} alt="Berlin Cityscape" containerClassName="absolute inset-0 w-full h-full opacity-25 mix-blend-luminosity grayscale" className="w-full h-full object-cover" />\n          <div className="absolute inset-0"'
    );
  }

  if (file.includes('Services.tsx')) {
    content = content.replace(
      /<div\s+className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-luminosity"\s+style=\{\{ backgroundImage: `url\('\/images\/corporate-handshake\.jpg'\)` \}\}/g,
      '<LazyImage src={BACKGROUND_IMAGES.corporateHandshake.src} placeholderSrc={BACKGROUND_IMAGES.corporateHandshake.placeholder} alt="Corporate Handshake" containerClassName="absolute inset-0 w-full h-full opacity-20 mix-blend-luminosity" className="w-full h-full object-cover" />\n          <div className="absolute inset-0"'
    );
    if (!content.includes('BACKGROUND_IMAGES')) {
       content = "import { BACKGROUND_IMAGES } from '../../data/imageMap';\n" + content;
    }
  }

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
