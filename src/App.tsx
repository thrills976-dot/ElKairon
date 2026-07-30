import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Portal } from './components/portal';
import { ChatWidget } from './components/ChatWidget';

function GlobalLoader({ onComplete }: { onComplete: () => void }) {
  
  
  useEffect(() => {
    // Extend loader slightly for a better effect
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-navy-900 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-navy-900 to-navy-900" />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative mb-8">
          <img src="/logo.png" alt="ElKairon Global Connect Logo" className="h-24 w-auto object-contain block" />
        </div>
          
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'candidate-portal' | 'employer-portal'>('home');
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigate = (view: 'home' | 'candidate-portal' | 'employer-portal') => {
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
