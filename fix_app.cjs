const fs = require('fs');

const appTsx = `import React, { useState, Suspense } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { motion, AnimatePresence } from 'motion/react';

// Lazy loaded heavy components
const ServicesAndTerms = React.lazy(() => import('./components/ServicesAndTerms').then(m => ({ default: m.ServicesAndTerms })));
const Portal = React.lazy(() => import('./components/portal').then(m => ({ default: m.Portal })));
const JobOpportunitiesPage = React.lazy(() => import('./components/pages/JobOpportunitiesPage').then(m => ({ default: m.JobOpportunitiesPage })));
const AboutPage = React.lazy(() => import('./components/pages/AboutPage').then(m => ({ default: m.AboutPage })));
const InsightsPage = React.lazy(() => import('./components/pages/InsightsPage').then(m => ({ default: m.InsightsPage })));
const ChatWidget = React.lazy(() => import('./components/ChatWidget').then(m => ({ default: m.ChatWidget })));

// A real suspense fallback loader
function MinimalLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" />
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees' | 'services-terms'>('home');

  const handleNavigate = (view: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees' | 'services-terms') => {
    window.scrollTo(0, 0);
    setCurrentView(view);
  };

  return (
    <>
      <Layout currentView={currentView} onNavigate={handleNavigate}>
        <Suspense fallback={<MinimalLoader />}>
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
        </Suspense>
      </Layout>
      
      <Suspense fallback={null}>
        <ChatWidget 
          context={currentView === 'home' ? 'home' : currentView === 'candidate-portal' ? 'candidate' : 'employer'} 
        />
      </Suspense>
    </>
  );
}
`;

fs.writeFileSync('src/App.tsx', appTsx);
console.log('Fixed App.tsx');
