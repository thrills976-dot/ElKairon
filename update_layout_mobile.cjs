const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

code = code.replace(
  "<button onClick={() => { handleScrollTo('about'); setMobileMenuOpen(false); }} className=\"text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white\">About</button>",
  "<button onClick={() => { onNavigate('fees'); setMobileMenuOpen(false); }} className=\"text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white\">Fees</button>\n                <button onClick={() => { handleScrollTo('about'); setMobileMenuOpen(false); }} className=\"text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white\">About</button>"
);

fs.writeFileSync('src/components/Layout.tsx', code);
