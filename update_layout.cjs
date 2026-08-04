const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Update LayoutProps interface
code = code.replace(
  "currentView: 'home' | 'candidate-portal' | 'employer-portal';",
  "currentView: 'home' | 'candidate-portal' | 'employer-portal' | 'fees';"
);
code = code.replace(
  "onNavigate: (view: 'home' | 'candidate-portal' | 'employer-portal') => void;",
  "onNavigate: (view: 'home' | 'candidate-portal' | 'employer-portal' | 'fees') => void;"
);

// Desktop nav
code = code.replace(
  "<button onClick={() => handleScrollTo('about')} className=\"hover:text-gold-500 transition-colors\">About</button>",
  "<button onClick={() => onNavigate('fees')} className=\"hover:text-gold-500 transition-colors\">Fees</button>\n            <button onClick={() => handleScrollTo('about')} className=\"hover:text-gold-500 transition-colors\">About</button>"
);

// I should check how the mobile nav is built. It might use the same buttons.
// Let's replace 'about' with 'fees' there too, assuming it's structured similarly.
code = code.replace(
  "<button onClick={() => { handleScrollTo('about'); setMobileMenuOpen(false); }} className=\"text-left w-full text-lg hover:text-teal-400\">About</button>",
  "<button onClick={() => { onNavigate('fees'); setMobileMenuOpen(false); }} className=\"text-left w-full text-lg hover:text-teal-400\">Fees</button>\n                  <button onClick={() => { handleScrollTo('about'); setMobileMenuOpen(false); }} className=\"text-left w-full text-lg hover:text-teal-400\">About</button>"
);

fs.writeFileSync('src/components/Layout.tsx', code);
