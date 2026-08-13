import { motion } from 'motion/react';
import { useGsapParallax } from '../hooks/useGsapParallax';
import { Hero } from './home/Hero';
import { CredibilityStrip } from './home/CredibilityStrip';
import { Services } from './home/Services';
import { HowItWorks } from './home/HowItWorks';
import { KeyMetrics } from './home/KeyMetrics';
import { Visas } from './home/Visas';
import { WhyGermany } from './home/WhyGermany';
import { TwoJourneys } from './home/TwoJourneys';
import { JobOpportunities } from './home/JobOpportunities';
import { GuaranteedBenefits } from './home/GuaranteedBenefits';
import { Pricing } from './home/Pricing';
import { Testimonials } from './home/Testimonials';
import { Impact } from './home/Impact';
import { About } from './home/About';
import { AboutStory } from './home/AboutStory';
import { WhyElKairon } from './home/WhyElKairon';
import { FAQ } from './home/FAQ';
import { ContactMap } from './home/ContactMap';
import { NewsletterSignup } from './home/NewsletterSignup';
import { FinalCTA } from './home/FinalCTA';

interface HomeProps {
  onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void;
}

const sectionAnimation = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: "easeOut" as const }
};

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
    </div>
  );
}


