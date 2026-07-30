import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LogIn } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface LayoutProps {
  children: ReactNode;
  currentView: 'home' | 'candidate-portal' | 'employer-portal';
  onNavigate: (view: 'home' | 'candidate-portal' | 'employer-portal') => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappNumber = "+263774629109";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`;

  return (
    <div className="min-h-screen flex flex-col font-body relative">
      {/* Navbar */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 text-white ${
          isScrolled 
            ? 'bg-navy-900 py-4 border-b-4 border-gold-500 shadow-lg' 
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
                src="/logo.png" 
                alt="ElKairon Global Connect Logo" 
                className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = document.getElementById('logo-fallback-icon');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="logo-fallback-icon" className="hidden w-12 h-12 rounded-full bg-teal-500 items-center justify-center border-2 border-gold-500 transition-transform group-hover:scale-105">
                <span className="font-display text-2xl font-bold italic text-gold-500">K</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight uppercase leading-none">
                ElKairon <span className="text-gold-500">Global</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-teal-500 font-semibold mt-1 hidden sm:block">
                Right Moment. Right Career. Anywhere.
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">
            <button 
              onClick={() => onNavigate('home')}
              className={`hover:text-gold-500 transition-colors ${currentView === 'home' ? 'text-gold-500 border-b-2 border-gold-500 pb-1' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={() => onNavigate('candidate-portal')}
              className={`hover:text-gold-500 transition-colors ${currentView === 'candidate-portal' ? 'text-gold-500 border-b-2 border-gold-500 pb-1' : ''}`}
            >
              Candidates
            </button>
            <button 
              onClick={() => onNavigate('employer-portal')}
              className={`hover:text-gold-500 transition-colors ${currentView === 'employer-portal' ? 'text-gold-500 border-b-2 border-gold-500 pb-1' : ''}`}
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
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-gold-500 transition-colors"
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
              className="fixed inset-0 z-40 bg-navy-900/95 backdrop-blur-xl md:hidden flex flex-col pt-24 px-8 pb-8"
            >
              <div className="flex flex-col gap-8 flex-1">
                <button 
                  onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                  className={`text-left text-2xl font-display italic font-bold tracking-wider ${currentView === 'home' ? 'text-gold-500' : 'text-white'}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => { onNavigate('candidate-portal'); setMobileMenuOpen(false); }}
                  className={`text-left text-2xl font-display italic font-bold tracking-wider ${currentView === 'candidate-portal' ? 'text-gold-500' : 'text-white'}`}
                >
                  Candidate Portal
                </button>
                <button 
                  onClick={() => { onNavigate('employer-portal'); setMobileMenuOpen(false); }}
                  className={`text-left text-2xl font-display italic font-bold tracking-wider ${currentView === 'employer-portal' ? 'text-gold-500' : 'text-white'}`}
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
      <footer className="bg-white px-8 py-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 text-[10px] text-gray-500 font-medium gap-4 mt-auto z-10 pb-20 md:pb-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 uppercase tracking-widest text-center sm:text-left">
          <span>Headquarters: Africa</span>
          <span>CIPA Registered: 2026</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
          <span>hello@elkaironglobalconnect.com</span>
          <span className="text-navy-900 font-bold uppercase text-center sm:text-left">Follow our Placements on LinkedIn</span>
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
