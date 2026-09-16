const fs = require('fs');
let code = fs.readFileSync('src/components/Home.tsx', 'utf-8');

// The scroll parallax watermarks and orbs positioned absolutely at e.g. top-[1200px] 
// might be causing overflow/scrolling issues if the body isn't tall enough yet due to lazy loading.
// Let's remove them from Home temporarily or move them inside the loaded sections.

// To be safe, remove the absolute positioned text watermarks and orbs that depend on fixed pixel heights,
// as the heights change dynamically with InViewLoader.

code = code.replace(/<div className="absolute top-\[\d+px\][^>]*>[\s\S]*?<\/div>/g, '');
code = code.replace(/<div \s*className="absolute top-\[\d+px\][^>]*data-parallax-glow[\s\S]*?\/>/g, '');

fs.writeFileSync('src/components/Home.tsx', code);
console.log('Fixed Home absolute elements');
