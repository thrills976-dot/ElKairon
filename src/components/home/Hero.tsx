import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, PlaneTakeoff, ShieldCheck, Clock, Globe as GlobeIcon, Building2, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Globe } from './Globe';
import { BACKGROUND_IMAGES } from '../../data/imageMap';

import { LazyImage } from '../ui/LazyImage';

export function Hero({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const bgGlowY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  return (
    <div id="hero" ref={containerRef} className="relative min-h-[94vh] flex items-center overflow-hidden bg-navy-900 pt-32 sm:pt-36 lg:pt-40 pb-20 border-b-4 border-gold-500">
      
      {/* Background ambient lighting with parallax scroll */}
      <motion.div 
        style={{ y: bgGlowY }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-white/20 rounded-full blur-[140px] pointer-events-none transform-gpu" 
      />
      <motion.div 
        style={{ y: bgGlowY }}
        className="absolute bottom-10 -right-10 w-[500px] h-[500px] bg-teal-300/40 rounded-full blur-[140px] pointer-events-none transform-gpu" 
      />

      {/* 3D GLOBE IN BACKGROUND (Directly behind the hero text) */}
      <div 
        id="hero-globe-element" 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto overflow-hidden"
      >
        <div className="w-full h-full flex items-center justify-center">
          <Globe />
        </div>
      </div>

      {/* Floating Status Badges - With perpetual gentle float and micro-interactions */}
      <motion.div 
        initial={{ opacity: 0, x: 30, y: 0 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          y: [0, -6, 0]
        }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.4 },
          x: { duration: 0.8, delay: 0.4 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.05, y: -8 }}
        className="absolute top-32 sm:top-36 right-4 sm:right-8 z-20 hidden md:flex items-center gap-2.5 bg-navy-950/90 backdrop-blur-md border border-gold-400/60 px-4 py-2.5 rounded-2xl shadow-2xl pointer-events-auto cursor-pointer transition-colors hover:border-gold-300"
        onClick={() => onNavigate('opportunities')}
      >
        <div className="w-8 h-8 rounded-xl bg-gold-400/20 flex items-center justify-center shrink-0 border border-gold-400/30">
          <PlaneTakeoff className="text-gold-400 w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-extrabold text-white leading-tight">Active Relocation Corridors</p>
          <p className="text-[10px] text-teal-300 font-semibold">🇦🇪 UAE • 🇩🇪 Germany • 🇬🇧 UK • 🇳🇱 EU</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -30, y: 0 }}
        animate={{ 
          opacity: 1, 
          x: 0,
          y: [0, 6, 0]
        }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.6 },
          x: { duration: 0.8, delay: 0.6 },
          y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }}
        whileHover={{ scale: 1.05, y: 4 }}
        className="absolute bottom-10 left-4 sm:left-8 z-20 hidden md:flex items-center gap-2.5 bg-navy-950/90 backdrop-blur-md border border-teal-400/60 px-4 py-2.5 rounded-2xl shadow-2xl pointer-events-auto cursor-pointer transition-colors hover:border-teal-300"
        onClick={() => onNavigate('candidate-portal')}
      >
        <div className="w-8 h-8 rounded-xl bg-teal-400/20 flex items-center justify-center shrink-0 border border-teal-400/30">
          <Clock className="text-teal-300 w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-extrabold text-white leading-tight">Kairos Precision Timing</p>
          <p className="text-[10px] text-sky-200 font-medium">Fast-Track Employer Placement</p>
        </div>
      </motion.div>

      {/* FOREGROUND HERO CONTENT CONTAINER */}
      <div id="hero-section-container" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center items-center pointer-events-none">
        <div id="hero-container" className="flex flex-col items-center justify-center w-full max-w-3xl">
          
          {/* HERO TEXT OVERLAY with smooth transform & scale parallax */}
          <motion.div 
            id="hero-text-overlay"
            style={{ y, opacity, scale }}
            className="flex flex-col items-center space-y-6 text-center relative z-10 w-full max-w-3xl pointer-events-auto py-4 transform-gpu"
          >
            {/* Header / Brand & Accreditation Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2.5"
            >
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-gold-300 font-display [text-shadow:_0_2px_8px_rgba(2,16,30,0.8)]">
                ElKairon Global Connect
              </span>
              <span className="hidden sm:inline text-white/40">•</span>
              <motion.div 
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-950/90 text-teal-300 text-[11px] sm:text-xs font-bold tracking-wide uppercase border border-teal-400/50 shadow-md backdrop-blur-md cursor-default"
              >
                <ShieldCheck size={14} className="text-teal-300 flex-shrink-0" />
                <span>CIPA Registered • Govt Approved Global Recruitment</span>
              </motion.div>
            </motion.div>

            {/* Display Headline with Staggered Entrance Reveal */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.14,
                    delayChildren: 0.1
                  }
                }
              }}
              className="space-y-1"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold italic text-white leading-[1.08] tracking-tight [text-shadow:_0_4px_20px_rgba(2,16,30,0.95)] drop-shadow-xl">
                <motion.div 
                  variants={{ 
                    hidden: { opacity: 0, y: 30, rotateX: 20 }, 
                    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } 
                  }}
                  className="transform-gpu"
                >
                  Right Moment.
                </motion.div>
                <motion.div 
                  variants={{ 
                    hidden: { opacity: 0, y: 30, rotateX: 20 }, 
                    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } 
                  }} 
                  className="text-gold-300 [text-shadow:_0_4px_20px_rgba(2,16,30,0.95)] transform-gpu"
                >
                  Right Career.
                </motion.div>
                <motion.div 
                  variants={{ 
                    hidden: { opacity: 0, y: 30, rotateX: 20 }, 
                    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } 
                  }}
                  className="transform-gpu"
                >
                  Anywhere.
                </motion.div>
              </h1>
            </motion.div>

            {/* Subtitle / Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-base sm:text-lg text-sky-50 max-w-2xl font-normal leading-relaxed [text-shadow:_0_2px_12px_rgba(2,16,30,0.95)]"
            >
              Connecting skilled African talent with exceptional employers across the UK, Germany, Netherlands, and UAE through verified visa sponsorship and end-to-end relocation support.
            </motion.p>

            {/* Action Buttons with High-Performance Micro-Interactions */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto pt-2"
            >
              <motion.button 
                whileHover={{ 
                  scale: 1.04, 
                  y: -2,
                  boxShadow: "0 20px 30px -10px rgba(13, 148, 136, 0.5)" 
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => onNavigate('candidate-portal')}
                className="px-7 py-3.5 bg-teal-600 hover:bg-navy-900 text-white rounded-xl font-bold shadow-xl uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors border border-teal-400/40 group transform-gpu"
              >
                <span>Find Your Opportunity</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </motion.button>

              <motion.button 
                whileHover={{ 
                  scale: 1.04, 
                  y: -2,
                  boxShadow: "0 20px 30px -10px rgba(251, 191, 36, 0.4)" 
                }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => onNavigate('employer-portal')}
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-navy-900 border-2 border-amber-300 rounded-xl font-extrabold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xl group transform-gpu"
              >
                <Building2 size={16} className="text-navy-900 group-hover:scale-110 transition-transform duration-300" />
                <span>Hire Global Talent</span>
              </motion.button>
            </motion.div>

            {/* Trust Markers Strip */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
              className="pt-5 border-t border-white/20 grid grid-cols-3 gap-6 w-full max-w-lg text-center"
            >
              <motion.div whileHover={{ scale: 1.06, y: -2 }} className="transition-transform cursor-default">
                <p className="text-xl sm:text-2xl font-extrabold text-gold-300 font-display [text-shadow:_0_2px_10px_rgba(2,16,30,0.9)]">100%</p>
                <p className="text-[11px] sm:text-xs text-sky-100 font-medium [text-shadow:_0_1px_8px_rgba(2,16,30,0.9)]">Visa Sponsorship</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06, y: -2 }} className="transition-transform cursor-default">
                <p className="text-xl sm:text-2xl font-extrabold text-teal-300 font-display [text-shadow:_0_2px_10px_rgba(2,16,30,0.9)]">426+</p>
                <p className="text-[11px] sm:text-xs text-sky-100 font-medium [text-shadow:_0_1px_8px_rgba(2,16,30,0.9)]">Talent Passed</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.06, y: -2 }} className="transition-transform cursor-default">
                <p className="text-xl sm:text-2xl font-extrabold text-white font-display [text-shadow:_0_2px_10px_rgba(2,16,30,0.9)]">98.4%</p>
                <p className="text-[11px] sm:text-xs text-sky-100 font-medium [text-shadow:_0_1px_8px_rgba(2,16,30,0.9)]">Success Rate</p>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Center Interaction Cue */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <span className="px-3.5 py-1.5 rounded-full bg-navy-950/90 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold text-sky-100 flex items-center gap-1.5 shadow-lg whitespace-nowrap">
          <GlobeIcon className="w-3.5 h-3.5 text-gold-400" />
          <span>Interactive 3D Earth in Background • Drag to Rotate</span>
        </span>
      </motion.div>

    </div>
  );
}
