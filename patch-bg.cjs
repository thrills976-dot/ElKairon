const fs = require('fs');

const filesToPatch = [
  'src/components/home/TwoJourneys.tsx',
  'src/components/home/WhyElKairon.tsx',
  'src/components/home/WhyGermany.tsx',
  'src/components/home/FinalCTA.tsx',
  'src/components/home/Visas.tsx',
  'src/components/home/AboutStory.tsx',
  'src/components/home/HowItWorks.tsx',
  'src/components/home/Services.tsx',
  'src/components/home/GuaranteedBenefits.tsx',
];

filesToPatch.forEach(file => {
  let code = fs.readFileSync(file, 'utf-8');
  
  // Regex to match the div with backgroundImage
  // Example:
  // <div 
  //   className="..."
  //   style={{ backgroundImage: `url('${BACKGROUND_IMAGES.xyz}')` }}
  // />
  // We need to carefully replace it.
  
  // Since the structure varies, let's just do a string replacement on the known pattern.
  // Actually, we can use a simpler approach: replace the style={{ backgroundImage: `url('${var}')` }} with a child img.
  
  // A regex that finds <div className="..." style={{ backgroundImage: `url('${...}')` }} />
  // and turns it into:
  // <div className="... overflow-hidden">
  //   <img src={...} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
  // </div>
  
  const regex = /<div\s+className="([^"]*?)"\s+style=\{\{\s*backgroundImage:\s*`url\('\$\{([^}]+)\}'\)`\s*\}\}\s*\/>/g;
  
  code = code.replace(regex, (match, className, imgVar) => {
    return `<div className="${className} overflow-hidden">
        <img 
          src={${imgVar}} 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>`;
  });
  
  // There might be some with double quotes or slightly different formatting.
  // Let's do a fallback replace if any are missed.
  fs.writeFileSync(file, code);
});
