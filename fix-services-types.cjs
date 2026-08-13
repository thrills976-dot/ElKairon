const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet', 'src/components/home/Services.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace BlurImage with LazyImage usage
content = content.replace(
  /<BlurImage\s+src=\{service\.image\}\s+alt=\{service\.title\}\s+containerClassName="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500"\s+className="w-full h-full object-cover"\s+\/>/g,
  '<LazyImage src={service.image.src} placeholderSrc={service.image.placeholder} alt={service.title} containerClassName="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" className="w-full h-full object-cover" />'
);

content = content.replace(
  /<BlurImage\s+src=\{sector\.image\}\s+alt=\{sector\.title\}\s+containerClassName="absolute inset-0 z-0"\s+className="w-full h-full object-cover"\s+\/>/g,
  '<LazyImage src={sector.image.src} placeholderSrc={sector.image.placeholder} alt={sector.title} containerClassName="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-700" className="w-full h-full object-cover" />'
);

fs.writeFileSync(filePath, content);
console.log('Fixed types in Services.tsx');
