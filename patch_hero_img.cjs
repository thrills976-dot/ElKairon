const fs = require('fs');
let code = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');
code = code.replace('<img \n          src={BACKGROUND_IMAGES.heroGlobalConnect}', '<img \n          src={BACKGROUND_IMAGES.heroGlobalConnect}\n          fetchPriority="high"\n          decoding="sync"\n          loading="eager"');
fs.writeFileSync('src/components/home/Hero.tsx', code);
