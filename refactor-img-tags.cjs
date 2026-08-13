const fs = require('fs');
const path = require('path');

const filePath = path.join('/app/applet', 'src/components/home/Services.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /<img\s+src=\{sector\.image\}\s+alt=\{sector\.title\}\s+className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"\s+\/>/g,
  '<LazyImage src={sector.image.src} placeholderSrc={sector.image.placeholder} alt={sector.title} className="w-full h-full object-cover" containerClassName="w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700" />'
);

fs.writeFileSync(filePath, content);
console.log('Updated Services.tsx img tags');
