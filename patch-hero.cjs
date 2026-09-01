const fs = require('fs');
let code = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

const target = `      {/* Permanent Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-25 pointer-events-none bg-cover bg-center"
        style={{ backgroundImage: \`url('\${BACKGROUND_IMAGES.heroGlobalConnect}')\` }}
      />`;

const replacement = `      {/* Permanent Background Image Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
        <img 
          src={BACKGROUND_IMAGES.heroGlobalConnect} 
          alt="Global Connect" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/home/Hero.tsx', code);
