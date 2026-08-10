import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { ServicesAndTerms } from './components/ServicesAndTerms';
import { Portal } from './components/portal';
import { JobOpportunitiesPage } from './components/pages/JobOpportunitiesPage';
import { AboutPage } from './components/pages/AboutPage';
import { InsightsPage } from './components/pages/InsightsPage';
import { ChatWidget } from './components/ChatWidget';

function GlobalLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing ElKairon Global Gateway...');

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800; // ms

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(calculatedProgress);

      if (calculatedProgress < 35) {
        setStatusMessage('Initializing ElKairon Global Gateway...');
      } else if (calculatedProgress < 75) {
        setStatusMessage('Syncing 426+ Verified Placements & Visa Corridors...');
      } else if (calculatedProgress < 100) {
        setStatusMessage('Securing ISO 27001 Talent Tunnel...');
      } else {
        setStatusMessage('Welcome to ElKairon Global Connect');
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(onComplete, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-navy-950 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/30 via-navy-950 to-navy-950" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[450px] h-[450px] bg-gradient-to-tr from-teal-500/20 to-gold-500/20 rounded-full blur-[100px] pointer-events-none"
      />
      
      <motion.div 
        initial={{ scale: 0.85, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center"
      >
        {/* 3D Orbiting Loader Rings Around Logo */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer Gold Orbit */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-gold-400/40 pointer-events-none"
          />

          {/* Inner Teal Orbit */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 sm:-inset-3 rounded-full border border-teal-400/30 border-t-teal-400 pointer-events-none"
          />

          {/* Floating Logo with Soft 3D Glow */}
          <motion.div
            animate={{
              y: [0, -6, 0]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative bg-navy-900/90 border border-white/10 p-4 rounded-3xl shadow-2xl backdrop-blur-md"
          >
            <img 
              src="/ellogo.png" 
              alt="ElKairon Global Connect Logo" 
              className="h-16 sm:h-20 w-auto object-contain block drop-shadow-md" 
            />
          </motion.div>
        </div>

        {/* Brand Label */}
        <h2 className="text-white font-display text-lg font-bold tracking-tight mb-1">
          ElKairon <span className="text-gold-400">Global Connect</span>
        </h2>
        <p className="text-teal-300 text-xs font-semibold tracking-wider uppercase mb-5">
          Right Moment. Right Career. Anywhere.
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-navy-900 border border-white/10 rounded-full h-2 p-0.5 overflow-hidden shadow-inner mb-3">
          <motion.div 
            className="h-full bg-gradient-to-r from-teal-400 via-sky-400 to-gold-400 rounded-full shadow-[0_0_12px_rgba(45,212,191,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Status Message and Percentage */}
        <div className="w-full flex items-center justify-between text-[11px] text-sky-200/80 font-mono">
          <span className="truncate pr-2">{statusMessage}</span>
          <span className="text-gold-400 font-bold shrink-0">{progress}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees' | 'services-terms'>('home');
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigate = (view: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees' | 'services-terms') => {
    setIsLoading(true);
    setCurrentView(view);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <GlobalLoader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <Layout currentView={currentView} onNavigate={handleNavigate}>
        {currentView === 'home' ? (
          <Home onNavigate={handleNavigate} />
        ) : currentView === 'opportunities' ? (
          <div className="pt-24 min-h-screen bg-gray-50"><JobOpportunitiesPage /></div>
        ) : currentView === 'about' ? (
          <div className="pt-24 min-h-screen"><AboutPage /></div>
        ) : currentView === 'insights' ? (
          <div className="pt-24 min-h-screen"><InsightsPage /></div>
        ) : currentView === 'fees' || currentView === 'services-terms' ? (
          <ServicesAndTerms />
        ) : (
          <Portal initialMode={currentView === 'candidate-portal' ? 'candidate' : 'employer'} />
        )}
      </Layout>
      
      {!isLoading && (
        <ChatWidget 
          context={currentView === 'home' ? 'home' : currentView === 'candidate-portal' ? 'candidate' : 'employer'} 
        />
      )}
    </>
  );
}

