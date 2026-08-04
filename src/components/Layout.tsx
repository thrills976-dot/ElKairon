import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogIn, Search } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/firebase';
import { PrivacyModal } from './PrivacyModal';
import { Toaster } from 'react-hot-toast';

interface LayoutProps {
  children: ReactNode;
  currentView: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees';
  onNavigate: (view: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleGlobalSearch = (e: any) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onNavigate('opportunities');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('globalSearch', { detail: searchQuery }));
    }, 100);
    setSearchQuery('');
  };

  const [authOpen, setAuthOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const handlePrivacyOpen = () => setPrivacyOpen(true);
    window.addEventListener('open-privacy', handlePrivacyOpen);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-privacy', handlePrivacyOpen);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappNumber = "+263774629109";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`;

  return (
    <div className="min-h-screen flex flex-col font-body relative">
      <Toaster position="top-center" />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 text-white ${
          isScrolled 
            ? 'bg-gradient-to-r from-[#0DA2E7] to-[#065A8C] py-4 border-b-4 border-gold-500 shadow-lg' 
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="relative flex items-center justify-center">
              <img 
                src="/ellogo.png" 
                alt="ElKairon Global Connect Logo" 
                className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
              />
              <div id="logo-fallback-icon" className="hidden w-12 h-12 rounded-full bg-teal-500 items-center justify-center border-2 border-gold-500 transition-transform group-hover:scale-105">
                <span className="font-display text-2xl font-bold italic text-gold-500">K</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] sm:text-lg md:text-xl font-bold tracking-tight uppercase leading-none whitespace-nowrap">
                ElKairon <span className="text-gold-500">Global Connect</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-teal-500 font-semibold mt-1 hidden sm:block">
                Right Moment. Right Career. Anywhere.
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <form onSubmit={handleGlobalSearch} className="relative flex items-center mr-2">
              <Search size={16} className="absolute left-3 text-teal-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..." 
                className="pl-9 pr-4 py-1.5 bg-white/10 border border-teal-500/30 rounded-full text-white placeholder:text-gray-300 focus:outline-none focus:border-gold-500 focus:bg-white/20 transition-all w-48 text-[10px]"
              />
            </form>
            <button onClick={() => handleScrollTo('hero')} className="hover:text-gold-500 transition-colors">Home</button>
            <button onClick={() => onNavigate('opportunities')} className="hover:text-gold-500 transition-colors">Opportunities</button>
            <button onClick={() => onNavigate('candidate-portal')} className="hover:text-gold-500 transition-colors">For Talent</button>
            <button onClick={() => onNavigate('employer-portal')} className="hover:text-gold-500 transition-colors">For Employers</button>
            <button onClick={() => onNavigate('fees')} className="hover:text-gold-500 transition-colors">Fees</button>
            <button onClick={() => onNavigate('about')} className="hover:text-gold-500 transition-colors">About</button>
            <button onClick={() => onNavigate('insights')} className="hover:text-gold-500 transition-colors">Insights</button>
            <LanguageSwitcher />
            {user ? (
              <div className="flex items-center gap-4 ml-2">
                <button 
                  onClick={() => onNavigate('candidate-portal')}
                  className="bg-teal-600 px-5 py-2 rounded-lg text-white hover:bg-teal-500 transition-colors shadow-md border border-teal-500"
                >
                  Portal
                </button>
                <button 
                  onClick={logout}
                  className="bg-red-50 text-red-600 px-5 py-2 rounded-lg hover:bg-red-100 transition-colors shadow-md border border-red-100"
                >
                  Logout
                </button>
              </div>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setAuthOpen(true)}
                className="bg-teal-600 px-5 py-2 rounded-lg text-white hover:bg-teal-500 transition-colors shadow-md ml-2 border border-teal-500"
              >
                Login / Register
              </motion.button>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden text-white hover:text-gold-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-40 bg-[#065A8C]/95 backdrop-blur-xl lg:hidden flex flex-col pt-24 px-8 pb-24 overflow-y-auto"
            >
              <div className="flex flex-col gap-6 flex-1 my-4">
              <form onSubmit={(e) => { handleGlobalSearch(e); setMobileMenuOpen(false); }} className="relative flex items-center mb-4">
                <Search size={20} className="absolute left-4 text-teal-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs by location, role..." 
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-teal-500/30 rounded-xl text-white placeholder:text-gray-300 focus:outline-none focus:border-gold-500 transition-all text-sm font-bold"
                />
              </form>
                <button onClick={() => { handleScrollTo('hero'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Home</button>
                <button onClick={() => { onNavigate('opportunities'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Opportunities</button>
                <button onClick={() => { onNavigate('candidate-portal'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">For Talent</button>
                <button onClick={() => { onNavigate('employer-portal'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">For Employers</button>
                <button onClick={() => { onNavigate('fees'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Fees</button>
                <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">About</button>
                <button onClick={() => { onNavigate('insights'); setMobileMenuOpen(false); }} className="text-left text-2xl font-display italic font-bold tracking-wider hover:text-gold-500 text-white">Insights</button>
                <LanguageSwitcher isMobile={true} />
              </div>
              <div className="mt-auto pb-12">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={() => { onNavigate('candidate-portal'); setMobileMenuOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg"
                    >
                      Portal
                    </button>
                    <button 
                      onClick={() => { logout(); setMobileMenuOpen(false); }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-50 text-red-600 rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { setAuthOpen(true); setMobileMenuOpen(false); }}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg"
                  >
                    <LogIn size={20} />
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-[#044c77] border-t border-white/10 mt-auto z-10 relative text-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand & Description */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img src="/ellogo.png" alt="ElKairon Global Connect Logo" className="h-10 w-auto" />
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Connecting talented professionals from Africa and the UAE with top-tier employers in Europe and other global destinations.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-600 transition-colors text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-600 transition-colors text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-600 transition-colors text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-teal-600 transition-colors text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-widest text-xs">Navigation</h4>
              <ul className="space-y-3">
                <li><button onClick={() => onNavigate('home')} className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Home</button></li>
                <li><button onClick={() => onNavigate('opportunities')} className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Opportunities</button></li>
                <li><button onClick={() => onNavigate('candidate-portal')} className="text-gray-300 hover:text-gold-400 transition-colors text-sm">For Talent</button></li>
                <li><button onClick={() => onNavigate('employer-portal')} className="text-gray-300 hover:text-gold-400 transition-colors text-sm">For Employers</button></li>
                <li><button onClick={() => onNavigate('fees')} className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Fees</button></li>
                <li><button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-gold-400 transition-colors text-sm">About Us</button></li>
                <li><button onClick={() => onNavigate('insights')} className="text-gray-300 hover:text-gold-400 transition-colors text-sm">Insights</button></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-widest text-xs">Services</h4>
              <ul className="space-y-3">
                <li className="text-gray-300 text-sm">International Recruitment</li>
                <li className="text-gray-300 text-sm">Visa & Work Permit Assistance</li>
                <li className="text-gray-300 text-sm">Relocation Support</li>
                <li className="text-gray-300 text-sm">Interview Preparation</li>
                <li className="text-gray-300 text-sm">Employer Matching</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white uppercase tracking-widest text-xs">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>1464 Mainway Meadows<br />CIPA Registered: 2026</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:hello@elkaironglobalconnect.com" className="hover:text-gold-400 transition-colors">hello@elkaironglobalconnect.com</a>
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <svg className="w-5 h-5 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+263774629109" className="hover:text-gold-400 transition-colors">+263 77 462 9109</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} ElKairon Global Connect. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-gray-400">
              <button onClick={() => setPrivacyOpen(true)} className="hover:text-white transition-colors uppercase font-bold tracking-widest">Privacy Policy</button>
              <button onClick={() => onNavigate('fees')} className="hover:text-white transition-colors uppercase font-bold tracking-widest">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="opacity-100">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
        <span className="absolute right-full mr-4 bg-white text-navy-900 px-3 py-1 rounded-md text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with us!
        </span>
      </a>
    </div>
  );
}
