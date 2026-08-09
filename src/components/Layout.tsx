import React, { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Menu, 
  X, 
  LogIn, 
  Search, 
  Calendar, 
  Sparkles, 
  Globe, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight,
  Send,
  Building2,
  BookOpen
} from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AuthModal } from './AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { logout } from '../lib/firebase';
import { PrivacyModal } from './PrivacyModal';
import { ConsultationModal } from './ConsultationModal';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { RecruitmentJourneyCanvas } from './3d/RecruitmentJourneyCanvas';

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: ReactNode;
  currentView: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees' | 'services-terms';
  onNavigate: (view: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees' | 'services-terms') => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationType, setConsultationType] = useState<'candidate' | 'employer'>('candidate');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const { user } = useAuth();

  const handleGlobalSearch = (e: any) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onNavigate('opportunities');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('globalSearch', { detail: searchQuery }));
    }, 100);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    const handlePrivacyOpen = () => setPrivacyOpen(true);
    window.addEventListener('open-privacy', handlePrivacyOpen);
    const handleOpenConsultation = (e: any) => {
      if (e.detail?.type) {
        setConsultationType(e.detail.type);
      }
      setConsultationModalOpen(true);
    };
    window.addEventListener('open-consultation', handleOpenConsultation);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-privacy', handlePrivacyOpen);
      window.removeEventListener('open-consultation', handleOpenConsultation);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConsultModal = (type: 'candidate' | 'employer' = 'candidate') => {
    setConsultationType(type);
    setConsultationModalOpen(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    toast.success('Thank you for subscribing to ElKairon Global Relocation Bulletins!');
    setNewsletterEmail('');
  };

  const whatsappNumber = "+263774629109";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}`;

  return (
    <div className="min-h-screen flex flex-col font-body relative bg-navy-950 text-white overflow-x-hidden w-full max-w-full">
      {/* 3D Interactive Global Recruitment Background Canvas */}
      <RecruitmentJourneyCanvas scrollProgress={scrollProgress} />

      {/* Ambient Floating Motion Background Orbs across entire website */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 -left-32 w-80 sm:w-96 h-80 sm:h-96 bg-teal-500/10 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 -right-32 w-96 sm:w-[450px] h-96 sm:h-[450px] bg-gold-500/10 rounded-full blur-[160px]"
        />
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 left-1/4 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-navy-800/20 rounded-full blur-[180px]"
        />
      </div>

      <Toaster position="top-center" />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <ConsultationModal 
        isOpen={consultationModalOpen} 
        onClose={() => setConsultationModalOpen(false)} 
        defaultType={consultationType} 
      />

      {/* Top Banner (Full-Width Accreditation info) */}
      <div className="w-full bg-navy-950 border-b border-white/10 py-1.5 px-4 text-[11px] text-sky-200 hidden md:block z-10 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={13} className="text-gold-400 shrink-0" />
            <span>CIPA Registered • Govt Approved Global Recruitment • Reg: 2026/GBL-4821</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sky-200">Harare • London • Berlin • Dubai</span>
            <a href="tel:+263774629109" className="text-gold-300 hover:underline font-bold">+263 77 462 9109</a>
          </div>
        </div>
      </div>

      {/* Primary Solid Header (Crisp Midnight Navy) */}
      <header
        className={`sticky top-0 w-full z-50 transition-all duration-200 text-white bg-navy-950 ${
          isScrolled 
            ? 'border-b-2 border-gold-500 shadow-2xl py-2.5' 
            : 'border-b border-white/10 py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between w-full overflow-hidden">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group bg-navy-950 rounded-xl p-1 min-w-0"
            onClick={() => onNavigate('home')}
          >
            <div className="relative flex items-center justify-center bg-navy-950 rounded-lg p-0.5 shrink-0">
              <img 
                src="/ellogo.png" 
                alt="ElKairon Global Connect Logo" 
                className="h-9 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-base md:text-lg font-bold tracking-tight uppercase leading-none whitespace-nowrap text-white truncate">
                ElKairon <span className="text-gold-400">Global Connect</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-teal-300 font-bold mt-1 hidden sm:block truncate">
                Right Moment. Right Career. Anywhere.
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-bold uppercase tracking-wider">
            <button onClick={() => handleScrollTo('hero')} className="hover:text-gold-400 transition-colors">Home</button>
            <button onClick={() => onNavigate('opportunities')} className="hover:text-gold-400 transition-colors">Jobs</button>
            <button onClick={() => onNavigate('services-terms')} className="text-gold-400 hover:text-white transition-colors underline decoration-gold-400 underline-offset-4 font-extrabold">Services & Terms</button>
            <button onClick={() => handleScrollTo('how-it-works')} className="hover:text-gold-400 transition-colors">How It Works</button>
            <button onClick={() => handleScrollTo('visas')} className="hover:text-gold-400 transition-colors">Visas</button>
            <button onClick={() => handleScrollTo('germany')} className="hover:text-gold-400 transition-colors">Why Germany</button>
            <button onClick={() => handleScrollTo('pricing')} className="hover:text-gold-400 transition-colors">Pricing</button>
            <button onClick={() => onNavigate('about')} className="hover:text-gold-400 transition-colors">About</button>
            
            {/* Quick Search */}
            <form onSubmit={handleGlobalSearch} className="relative flex items-center">
              <Search size={14} className="absolute left-3 text-teal-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..." 
                className="pl-8 pr-3 py-1.5 bg-navy-900 border border-white/20 rounded-full text-white placeholder:text-sky-300 focus:outline-none focus:border-gold-400 w-32 focus:w-44 transition-all text-[11px]"
              />
            </form>

            <LanguageSwitcher />

            {/* Assessment / Consultation Action */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleOpenConsultModal('candidate')}
              className="bg-gold-500 hover:bg-gold-400 text-navy-950 px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5 border border-gold-400"
            >
              <Calendar size={14} className="text-navy-950" />
              <span>Assessment</span>
            </motion.button>

            {user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('candidate-portal')}
                  className="bg-teal-600 px-3.5 py-2 rounded-xl text-white hover:bg-teal-500 transition-colors shadow-md border border-teal-500 text-xs font-bold"
                >
                  Portal
                </button>
                <button 
                  onClick={logout}
                  className="bg-navy-900 text-sky-200 px-3 py-2 rounded-xl hover:text-red-400 transition-colors border border-white/10 text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setAuthOpen(true)}
                className="bg-navy-900 px-3.5 py-2 rounded-xl text-sky-100 hover:text-white transition-colors border border-white/15 text-xs font-bold"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Medium/Mobile Nav Button */}
          <div className="flex items-center gap-2 sm:gap-3 xl:hidden shrink-0">
            <button
              onClick={() => handleOpenConsultModal('candidate')}
              className="bg-gold-500 text-navy-950 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold uppercase shadow-md flex items-center gap-1 shrink-0"
            >
              <Calendar size={12} />
              <span>Consult</span>
            </button>
            <button 
              className="text-white hover:text-gold-400 transition-colors p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-navy-950 border-b border-white/15 px-4 sm:px-6 py-6 overflow-hidden"
            >
              <div className="flex flex-col gap-3.5 text-sm font-bold uppercase tracking-wider mb-6">
                <button onClick={() => { handleScrollTo('hero'); setMobileMenuOpen(false); }} className="text-left text-white hover:text-gold-400 py-1">Home</button>
                <button onClick={() => { onNavigate('opportunities'); setMobileMenuOpen(false); }} className="text-left text-white hover:text-gold-400 py-1">Job Opportunities</button>
                <button onClick={() => { onNavigate('services-terms'); setMobileMenuOpen(false); }} className="text-left text-gold-400 hover:text-white py-1 font-extrabold">Services & Terms</button>
                <button onClick={() => { handleScrollTo('how-it-works'); setMobileMenuOpen(false); }} className="text-left text-white hover:text-gold-400 py-1">How It Works</button>
                <button onClick={() => { handleScrollTo('visas'); setMobileMenuOpen(false); }} className="text-left text-white hover:text-gold-400 py-1">Visas</button>
                <button onClick={() => { handleScrollTo('germany'); setMobileMenuOpen(false); }} className="text-left text-white hover:text-gold-400 py-1">Why Germany</button>
                <button onClick={() => { handleScrollTo('pricing'); setMobileMenuOpen(false); }} className="text-left text-white hover:text-gold-400 py-1">Pricing & Benefits</button>
                <button onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }} className="text-left text-white hover:text-gold-400 py-1">About ElKairon</button>
              </div>

              {/* Mobile Quick Search */}
              <form onSubmit={(e) => { handleGlobalSearch(e); setMobileMenuOpen(false); }} className="relative mb-4 flex items-center">
                <Search size={14} className="absolute left-3 text-teal-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs..." 
                  className="w-full pl-8 pr-3 py-2 bg-navy-900 border border-white/20 rounded-xl text-white placeholder:text-sky-300 text-xs focus:outline-none focus:border-gold-400"
                />
              </form>

              <div className="space-y-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => { handleOpenConsultModal('candidate'); setMobileMenuOpen(false); }}
                  className="w-full py-3 bg-gold-500 text-navy-950 font-extrabold uppercase text-xs rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar size={15} />
                  <span>Book Consultation Call</span>
                </button>
                {user ? (
                  <button 
                    onClick={() => { onNavigate('candidate-portal'); setMobileMenuOpen(false); }}
                    className="w-full py-3 bg-teal-600 text-white font-bold uppercase text-xs rounded-xl"
                  >
                    Candidate Portal
                  </button>
                ) : (
                  <button 
                    onClick={() => { setAuthOpen(true); setMobileMenuOpen(false); }}
                    className="w-full py-3 bg-navy-900 border border-white/20 text-white font-bold uppercase text-xs rounded-xl"
                  >
                    Sign In / Register
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

      {/* Premium Solid Footer */}
      <footer className="bg-navy-950 border-t-2 border-gold-500/80 mt-auto z-10 relative text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
            
            {/* Col 1: Brand & CIPA */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-3">
                <img src="/ellogo.png" alt="ElKairon Global Connect Logo" className="h-12 w-auto" />
                <div>
                  <span className="font-bold text-lg text-white block">ElKairon Global Connect</span>
                  <span className="text-[10px] text-teal-300 font-bold uppercase tracking-widest">Govt Approved Global Recruitment</span>
                </div>
              </div>
              <p className="text-xs text-sky-100/90 leading-relaxed max-w-sm">
                Connecting skilled African talent with certified employers across the UK, Germany, Netherlands, Canada, and the UAE with 100% verified visa sponsorship and comprehensive relocation assistance.
              </p>
              
              <div className="p-3 bg-navy-900 border border-gold-500/30 rounded-xl space-y-1 text-xs">
                <span className="text-gold-400 font-bold block">Accreditation: CIPA Registered 2026</span>
                <span className="text-gray-300 text-[11px] block">UK Home Office Sponsor Standards • German FEG Skilled Mobility Partner</span>
              </div>
            </div>

            {/* Col 2: Global Destinations */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-gold-400 mb-4">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><button onClick={() => handleScrollTo('hero')} className="hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => onNavigate('opportunities')} className="hover:text-white transition-colors">Job Opportunities</button></li>
                <li><button onClick={() => handleScrollTo('services')} className="hover:text-white transition-colors">Recruitment Services</button></li>
                <li><button onClick={() => handleScrollTo('how-it-works')} className="hover:text-white transition-colors">How It Works</button></li>
                <li><button onClick={() => handleScrollTo('visas')} className="hover:text-white transition-colors">Visa & Work Permits</button></li>
                <li><button onClick={() => handleScrollTo('germany')} className="hover:text-white transition-colors">Why Relocate to Germany</button></li>
                <li><button onClick={() => handleScrollTo('pricing')} className="hover:text-white transition-colors">Guaranteed Benefits</button></li>
              </ul>
            </div>

            {/* Col 3: Resource & Transparency */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-gold-400 mb-4">Transparency</h4>
              <ul className="space-y-2 text-xs text-gray-300">
                <li><button onClick={() => onNavigate('fees')} className="hover:text-white transition-colors">Fee Structure & Milestones</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">About ElKairon Global</button></li>
                <li><button onClick={() => onNavigate('insights')} className="hover:text-white transition-colors">Relocation Insights & News</button></li>
                <li><button onClick={() => handleScrollTo('faq')} className="hover:text-white transition-colors">Frequently Asked Questions</button></li>
                <li><button onClick={() => handleScrollTo('contact')} className="hover:text-white transition-colors">Contact & Headquarters</button></li>
              </ul>
            </div>

            {/* Col 4: Verified Global Offices */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-gold-400 mb-4">Global Offices</h4>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Harare HQ:</strong>
                    <span>1464 Mainway Meadows</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">London Liaison:</strong>
                    <span>30 St Mary Axe, City of London</span>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <a href="tel:+263774629109" className="hover:text-gold-400 transition-colors font-bold text-white">
                    +263 77 462 9109
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <a href="mailto:hello@elkaironglobalconnect.com" className="hover:text-gold-400 transition-colors text-[11px]">
                    hello@elkaironglobalconnect.com
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Copyright & Legal */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} ElKairon Global Connect. All rights reserved. Registered under CIPA & international recruitment protocols.
            </p>
            <div className="flex items-center gap-6">
              <button onClick={() => setPrivacyOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => onNavigate('fees')} className="hover:text-white transition-colors">Terms & Fee Guarantees</button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline font-bold">
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
        </svg>
        <span className="absolute right-full mr-3 bg-navy-950 text-white border border-teal-400/50 px-3 py-1 rounded-lg text-xs font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Chat with an Advisor
        </span>
      </a>
    </div>
  );
}
