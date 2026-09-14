const fs = require('fs');

const homeCode = `import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { useGsapParallax } from '../hooks/useGsapParallax';

// Critical components for initial load
import { Hero } from './home/Hero';
import { CredibilityStrip } from './home/CredibilityStrip';

// Lazy-loaded components for below-the-fold
const Services = React.lazy(() => import('./home/Services').then(m => ({ default: m.Services })));
const HowItWorks = React.lazy(() => import('./home/HowItWorks').then(m => ({ default: m.HowItWorks })));
const KeyMetrics = React.lazy(() => import('./home/KeyMetrics').then(m => ({ default: m.KeyMetrics })));
const Visas = React.lazy(() => import('./home/Visas').then(m => ({ default: m.Visas })));
const WhyGermany = React.lazy(() => import('./home/WhyGermany').then(m => ({ default: m.WhyGermany })));
const TwoJourneys = React.lazy(() => import('./home/TwoJourneys').then(m => ({ default: m.TwoJourneys })));
const JobOpportunities = React.lazy(() => import('./home/JobOpportunities').then(m => ({ default: m.JobOpportunities })));
const GuaranteedBenefits = React.lazy(() => import('./home/GuaranteedBenefits').then(m => ({ default: m.GuaranteedBenefits })));
const Pricing = React.lazy(() => import('./home/Pricing').then(m => ({ default: m.Pricing })));
const Testimonials = React.lazy(() => import('./home/Testimonials').then(m => ({ default: m.Testimonials })));
const Impact = React.lazy(() => import('./home/Impact').then(m => ({ default: m.Impact })));
const About = React.lazy(() => import('./home/About').then(m => ({ default: m.About })));
const AboutStory = React.lazy(() => import('./home/AboutStory').then(m => ({ default: m.AboutStory })));
const WhyElKairon = React.lazy(() => import('./home/WhyElKairon').then(m => ({ default: m.WhyElKairon })));
const FAQ = React.lazy(() => import('./home/FAQ').then(m => ({ default: m.FAQ })));
const ContactMap = React.lazy(() => import('./home/ContactMap').then(m => ({ default: m.ContactMap })));
const NewsletterSignup = React.lazy(() => import('./home/NewsletterSignup').then(m => ({ default: m.NewsletterSignup })));
const FinalCTA = React.lazy(() => import('./home/FinalCTA').then(m => ({ default: m.FinalCTA })));

interface HomeProps {
  onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void;
}

const sectionAnimation = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

function LazySection({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="h-48 flex items-center justify-center opacity-50"><div className="w-6 h-6 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" /></div>}>
      {children}
    </Suspense>
  );
}

export function Home({ onNavigate }: HomeProps) {
  const rootRef = useGsapParallax();

  return (
    <div ref={rootRef} className="w-full text-white bg-navy-950 overflow-x-hidden relative">
      {/* GSAP ScrollTrigger Cinematic Floating Watermarks */}
      <div className="absolute top-[800px] -left-10 text-[10vw] font-display font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap z-0" data-parallax-scroll-left>
        ELKAIRON GLOBAL CONNECT • OPPORTUNITY
      </div>
      <div className="absolute top-[2200px] -right-10 text-[10vw] font-display font-black text-gold-400/[0.025] select-none pointer-events-none whitespace-nowrap z-0" data-parallax-scroll-right>
        GERMANY • EUROPE • CAREERS • RELOCATION
      </div>
      <div className="absolute top-[4200px] -left-10 text-[11vw] font-display font-black text-teal-300/[0.02] select-none pointer-events-none whitespace-nowrap z-0" data-parallax-scroll-left>
        KAIROS • TIMING • TALENT MATCHING
      </div>

      {/* Floating Parallax Glow Orbs */}
      <div 
        className="absolute top-[1200px] left-[15%] w-72 h-72 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" 
        data-parallax-speed="0.4"
        data-parallax-glow
      />
      <div 
        className="absolute top-[2800px] right-[10%] w-96 h-96 bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" 
        data-parallax-speed="0.6"
        data-parallax-glow
      />
      <div 
        className="absolute top-[5000px] left-[8%] w-80 h-80 bg-teal-400/10 rounded-full blur-[150px] pointer-events-none" 
        data-parallax-speed="0.5"
        data-parallax-glow
      />

      <Hero onNavigate={onNavigate} />
      
      <motion.div {...sectionAnimation}>
        <CredibilityStrip />
      </motion.div>

      <LazySection>
        <motion.div {...sectionAnimation}>
          <Services />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <HowItWorks />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <KeyMetrics />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <Visas />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <WhyGermany />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <TwoJourneys onNavigate={onNavigate} />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <JobOpportunities />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <GuaranteedBenefits />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <Pricing />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <Testimonials />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <Impact />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <About />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <AboutStory />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <WhyElKairon />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <FAQ />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <ContactMap />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <NewsletterSignup />
        </motion.div>
        <motion.div {...sectionAnimation}>
          <FinalCTA onNavigate={onNavigate} />
        </motion.div>
      </LazySection>
    </div>
  );
}
`;

fs.writeFileSync('src/components/Home.tsx', homeCode);
console.log('Fixed Home.tsx');
