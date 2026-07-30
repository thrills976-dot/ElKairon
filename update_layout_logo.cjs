const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

code = code.replace(
  '<img \n                src="/logo.png" \n                alt="ElKairon Global Connect Logo" \n                className="h-16 w-auto object-contain transition-transform group-hover:scale-105"\n                onError={(e) => {\n                  e.currentTarget.style.display = \'none\';\n                  const fallback = document.getElementById(\'logo-fallback-icon\');\n                  if (fallback) fallback.style.display = \'flex\';\n                }}\n              />',
  '<img \n                src="/logo.png" \n                alt="ElKairon Global Connect Logo" \n                className="h-16 w-auto object-contain transition-transform group-hover:scale-105"\n              />'
);

code = code.replace(
  /<div className="flex flex-col">[\s\S]*?<span className="text-xl font-bold tracking-tight uppercase leading-none">[\s\S]*?ElKairon <span className="text-gold-500">Global<\/span>[\s\S]*?<\/span>[\s\S]*?<span className="text-\[10px\] tracking-widest uppercase text-teal-500 font-semibold mt-1 hidden sm:block">[\s\S]*?Right Moment. Right Career. Anywhere.[\s\S]*?<\/span>[\s\S]*?<\/div>/,
  `<div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight uppercase leading-none">
                ElKairon <span className="text-gold-500">Global Connect</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-teal-500 font-semibold mt-1 hidden sm:block">
                Right Moment. Right Career. Anywhere.
              </span>
            </div>`
);

code = code.replace(
  '<div>Headquarters: Africa | CIPA Registered: 2026</div>',
  '<div>1464 Mainway Meadows | CIPA Registered: 2026</div>'
);

fs.writeFileSync('src/components/Layout.tsx', code);
