const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Add imports
code = code.replace(
  "import { LanguageSwitcher } from './LanguageSwitcher';",
  "import { LanguageSwitcher } from './LanguageSwitcher';\nimport { AuthModal } from './AuthModal';\nimport { Toaster } from 'react-hot-toast';"
);

// Add auth modal state
code = code.replace(
  "const [mobileMenuOpen, setMobileMenuOpen] = useState(false);",
  "const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [authOpen, setAuthOpen] = useState(false);"
);

// Add handleScrollTo
code = code.replace(
  "const whatsappNumber =",
  `const handleScrollTo = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappNumber =`
);

// Update Desktop Nav
const oldDesktopNav = `<nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <button 
              onClick={() => onNavigate('home')}
              className={\`hover:text-gold-500 transition-colors \${currentView === 'home' ? 'text-gold-500 border-b-2 border-gold-500 pb-1' : ''}\`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('candidate-portal')}
              className={\`hover:text-gold-500 transition-colors \${currentView === 'candidate-portal' ? 'text-gold-500 border-b-2 border-gold-500 pb-1' : ''}\`}
            >
              Candidates
            </button>
            <button 
              onClick={() => onNavigate('employer-portal')}
              className={\`hover:text-gold-500 transition-colors \${currentView === 'employer-portal' ? 'text-gold-500 border-b-2 border-gold-500 pb-1' : ''}\`}
            >
              Employers
            </button>
            <LanguageSwitcher />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('candidate-portal')}
              className="bg-teal-600 px-5 py-2 rounded-lg text-white hover:bg-teal-500 transition-colors shadow-md ml-2 border border-teal-500"
            >
              Login / Apply
            </motion.button>
          </nav>`;

const newDesktopNav = `<nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <button onClick={() => handleScrollTo('hero')} className="hover:text-gold-500 transition-colors">Home</button>
            <button onClick={() => handleScrollTo('visas')} className="hover:text-gold-500 transition-colors">Visas</button>
            <button onClick={() => handleScrollTo('services')} className="hover:text-gold-500 transition-colors">Services</button>
            <button onClick={() => handleScrollTo('jobs')} className="hover:text-gold-500 transition-colors">Jobs</button>
            <button onClick={() => handleScrollTo('partners')} className="hover:text-gold-500 transition-colors">Partners</button>
            <button onClick={() => handleScrollTo('about')} className="hover:text-gold-500 transition-colors">About Us</button>
            <button onClick={() => handleScrollTo('contact')} className="hover:text-gold-500 transition-colors">Contact Us</button>
            <LanguageSwitcher />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAuthOpen(true)}
              className="bg-teal-600 px-5 py-2 rounded-lg text-white hover:bg-teal-500 transition-colors shadow-md ml-2 border border-teal-500"
            >
              Login / Register
            </motion.button>
          </nav>`;

code = code.replace(oldDesktopNav, newDesktopNav);

// Update Mobile Nav
const oldMobileNav = `<div className="flex flex-col gap-8 flex-1">
                <button 
                  onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                  className={\`text-left text-2xl font-display italic font-bold tracking-wider \${currentView === 'home' ? 'text-gold-500' : 'text-white'}\`}
                >
                  Home
                </button>
                <button 
                  onClick={() => { onNavigate('candidate-portal'); setMobileMenuOpen(false); }}
                  className={\`text-left text-2xl font-display italic font-bold tracking-wider \${currentView === 'candidate-portal' ? 'text-gold-500' : 'text-white'}\`}
                >
                  Candidate Portal
                </button>
                <button 
                  onClick={() => { onNavigate('employer-portal'); setMobileMenuOpen(false); }}
                  className={\`text-left text-2xl font-display italic font-bold tracking-wider \${currentView === 'employer-portal' ? 'text-gold-500' : 'text-white'}\`}
                >
                  Employer Portal
                </button>
                <LanguageSwitcher isMobile={true} />
              </div>
              <div className="mt-auto pb-12">
                <button 
                  onClick={() => { onNavigate('candidate-portal'); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg"
                >
                  <LogIn size={20} />
                  Sign In
                </button>
              </div>`;

const newMobileNav = `<div className="flex flex-col gap-8 flex-1">
                <button onClick={() => { handleScrollTo('hero'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Home</button>
                <button onClick={() => { handleScrollTo('visas'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Visas</button>
                <button onClick={() => { handleScrollTo('services'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Services</button>
                <button onClick={() => { handleScrollTo('jobs'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Jobs</button>
                <button onClick={() => { handleScrollTo('partners'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Partners</button>
                <button onClick={() => { handleScrollTo('about'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">About Us</button>
                <button onClick={() => { handleScrollTo('contact'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Contact Us</button>
                <LanguageSwitcher isMobile={true} />
              </div>
              <div className="mt-auto pb-12">
                <button 
                  onClick={() => { setAuthOpen(true); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg"
                >
                  <LogIn size={20} />
                  Sign In
                </button>
              </div>`;

code = code.replace(oldMobileNav, newMobileNav);

// Update md:hidden to lg:hidden
code = code.replace('className="md:hidden text-white hover:text-gold-500 transition-colors"', 'className="lg:hidden text-white hover:text-gold-500 transition-colors"');
code = code.replace('className="fixed inset-0 z-40 bg-navy-900/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-8 pb-8"', 'className="fixed inset-0 z-40 bg-navy-900/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-8 pb-8"');

// Update footer with newsletter
const oldFooter = `<footer className="bg-white px-8 py-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 text-[10px] text-gray-500 font-medium gap-4 mt-auto z-10 pb-20 md:pb-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 uppercase tracking-widest text-center sm:text-left">
          <span>Headquarters: Africa</span>
          <span>CIPA Registered: 2026</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
          <span>hello@elkaironglobalconnect.com</span>
          <span className="text-navy-900 font-bold uppercase text-center sm:text-left">Follow our Placements on LinkedIn</span>
        </div>
      </footer>`;

const newFooter = `<footer id="contact" className="bg-white border-t border-gray-200 mt-auto z-10 relative">
        <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="font-display italic text-2xl font-bold text-navy-900 mb-2">Join our Career Updates</h4>
            <p className="text-gray-500 text-sm mb-4">Stay informed about new job postings and visa updates.</p>
            <form onSubmit={(e) => { e.preventDefault(); import('react-hot-toast').then(toast => toast.default.success('Successfully subscribed to Career Updates!')); (e.target as HTMLFormElement).reset(); }} className="flex w-full max-w-sm mx-auto md:mx-0">
              <input type="email" required placeholder="Enter your email" className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-teal-500" />
              <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded-r-lg font-bold uppercase tracking-widest text-xs hover:bg-teal-700 transition-colors">Subscribe</button>
            </form>
          </div>
          <div className="flex flex-col gap-4 text-[10px] text-gray-500 font-medium uppercase tracking-widest text-center md:text-right">
            <div>Headquarters: Africa | CIPA Registered: 2026</div>
            <div>hello@elkaironglobalconnect.com</div>
            <div className="text-navy-900 font-bold">Follow our Placements on LinkedIn</div>
          </div>
        </div>
      </footer>`;

code = code.replace(oldFooter, newFooter);

// Add Toaster and AuthModal
code = code.replace(
  '<div className="min-h-screen flex flex-col font-body relative">',
  `<div className="min-h-screen flex flex-col font-body relative">\n      <Toaster position="top-center" />\n      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />`
);

fs.writeFileSync('src/components/Layout.tsx', code);
