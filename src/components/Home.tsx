import React, { Suspense } from 'react';
import { motion } from 'motion/react';
import { useGsapParallax } from '../hooks/useGsapParallax';

// Critical components for initial load
import { Hero } from './home/Hero';
import { InViewLoader } from './InViewLoader';
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





export function Home({ onNavigate }: HomeProps) {
  const rootRef = useGsapParallax();

  return (
    <div ref={rootRef} className="w-full text-white bg-navy-950 overflow-x-hidden relative">
      {/* GSAP ScrollTrigger Cinematic Floating Watermarks */}
      
      
      

      {/* Floating Parallax Glow Orbs */}
      
      
      

      <Hero onNavigate={onNavigate} />
      
      <div className="w-full relative">
        <CredibilityStrip />
      </div>

      
        <InViewLoader height="min-h-[10px]"><Services /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><HowItWorks /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><KeyMetrics /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><Visas /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><WhyGermany /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><TwoJourneys onNavigate={onNavigate} /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><JobOpportunities /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><GuaranteedBenefits /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><Pricing /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><Testimonials /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><Impact /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><About /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><AboutStory /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><WhyElKairon /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><FAQ /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><ContactMap /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><NewsletterSignup /></InViewLoader>
        <InViewLoader height="min-h-[10px]"><FinalCTA onNavigate={onNavigate} /></InViewLoader>
      
    </div>
  );
}
