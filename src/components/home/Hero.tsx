import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, PlaneTakeoff, ShieldCheck, Clock, Globe as GlobeIcon, Building2 } from 'lucide-react';
import { useRef } from 'react';
import { Globe } from './Globe';

export function Hero({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);

  return (
    <div id="hero" ref={containerRef} className="relative min-h-[94vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0DA2E7] via-[#0878ab] to-[#043e62] pt-32 sm:pt-36 lg:pt-40 pb-20 border-b-4 border-gold-500">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-white/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-10 w-[500px] h-[500px] bg-[#033654]/60 rounded-full blur-[140px] pointer-events-none" />

      {/* 3D GLOBE IN BACKGROUND (Directly behind the hero text) */}
      <div 
        id="hero-globe-element" 
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto overflow-hidden"
      >
        <div className="w-full h-full max-w-5xl flex items-center justify-center">
          <Globe />
        </div>
      </div>

      {/* Floating Status Badges - Safely positioned below sticky header */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-32 sm:top-36 right-4 sm:right-8 z-20 hidden md:flex items-center gap-2 bg-navy-950/90 backdrop-blur-md border border-gold-400/60 px-3.5 py-2 rounded-2xl shadow-xl pointer-events-auto"
      >
        <PlaneTakeoff className="text-gold-400 w-4 h-4 flex-shrink-0" />
        <div className="text-left">
          <p className="text-[11px] font-bold text-white leading-tight">Active Relocation Corridors</p>
          <p className="text-[10px] text-teal-300 font-medium">🇦🇪 UAE • 🇩🇪 Germany • 🇬🇧 UK • 🇳🇱 EU</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-10 left-4 sm:left-8 z-20 hidden md:flex items-center gap-2 bg-navy-950/90 backdrop-blur-md border border-teal-400/60 px-3.5 py-2 rounded-2xl shadow-xl pointer-events-auto"
      >
        <Clock className="text-teal-300 w-4 h-4 flex-shrink-0" />
        <div className="text-left">
          <p className="text-[11px] font-bold text-white leading-tight">Kairos Precision Timing</p>
          <p className="text-[10px] text-gray-200 font-medium">Fast-Track Employer Placement</p>
        </div>
      </motion.div>

      {/* FOREGROUND HERO CONTENT CONTAINER (Positioned in front of the Globe) */}
      <div id="hero-section-container" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-center items-center pointer-events-none">
        <div id="hero-container" className="flex flex-col items-center justify-center w-full max-w-3xl">
          
          {/* HERO TEXT OVERLAY (Clean, high-contrast typography directly over globe background with NO glassmorphism) */}
          <motion.div 
            id="hero-text-overlay"
            style={{ y, opacity }}
            className="flex flex-col items-center space-y-6 text-center relative z-10 w-full max-w-3xl pointer-events-auto py-4"
          >
            {/* Header / Brand & Accreditation Badges */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-2.5"
            >
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-gold-300 font-display [text-shadow:_0_2px_8px_rgba(2,16,30,0.8)]">
                ElKairon Global Connect
              </span>
              <span className="hidden sm:inline text-white/40">•</span>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-navy-950 text-teal-300 text-[11px] sm:text-xs font-bold tracking-wide uppercase border border-teal-400/50 shadow-md">
                <ShieldCheck size={14} className="text-teal-300 flex-shrink-0" />
                <span>CIPA Registered • Govt Approved Global Recruitment</span>
              </div>
            </motion.div>

            {/* Display Headline */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="space-y-1"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold italic text-white leading-[1.08] tracking-tight [text-shadow:_0_4px_20px_rgba(2,16,30,0.95)] drop-shadow-xl">
                <motion.div variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}>
                  Right Moment.
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }} className="text-gold-300 [text-shadow:_0_4px_20px_rgba(2,16,30,0.95)]">
                  Right Career.
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } }}>
                  Anywhere.
                </motion.div>
              </h1>
            </motion.div>

            {/* Subtitle / Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
              className="text-base sm:text-lg text-sky-50 max-w-2xl font-normal leading-relaxed [text-shadow:_0_2px_12px_rgba(2,16,30,0.95)]"
            >
              Connecting skilled African talent with exceptional employers across the UK, Germany, Netherlands, and UAE through verified visa sponsorship and end-to-end relocation support.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 w-full sm:w-auto pt-2"
            >
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('candidate-portal')}
                className="px-7 py-3.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold shadow-xl uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all border border-teal-400/40"
              >
                <span>Find Your Opportunity</span>
                <ArrowRight size={16} />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('employer-portal')}
                className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-navy-900 border-2 border-amber-300 rounded-xl font-extrabold uppercase text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl"
              >
                <Building2 size={16} className="text-navy-900" />
                <span>Hire Global Talent</span>
              </motion.button>
            </motion.div>

            {/* Trust Markers Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="pt-5 border-t border-white/20 grid grid-cols-3 gap-6 w-full max-w-lg text-center"
            >
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-gold-300 font-display [text-shadow:_0_2px_10px_rgba(2,16,30,0.9)]">100%</p>
                <p className="text-[11px] sm:text-xs text-sky-100 font-medium [text-shadow:_0_1px_8px_rgba(2,16,30,0.9)]">Visa Sponsorship</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-teal-300 font-display [text-shadow:_0_2px_10px_rgba(2,16,30,0.9)]">1,200+</p>
                <p className="text-[11px] sm:text-xs text-sky-100 font-medium [text-shadow:_0_1px_8px_rgba(2,16,30,0.9)]">Talent Placed</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-white font-display [text-shadow:_0_2px_10px_rgba(2,16,30,0.9)]">98.4%</p>
                <p className="text-[11px] sm:text-xs text-sky-100 font-medium [text-shadow:_0_1px_8px_rgba(2,16,30,0.9)]">Success Rate</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom Center Interaction Cue */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="px-3.5 py-1.5 rounded-full bg-navy-950 border border-white/20 text-[10px] sm:text-xs font-semibold text-sky-100 flex items-center gap-1.5 shadow-lg whitespace-nowrap">
          <GlobeIcon className="w-3.5 h-3.5 text-gold-400" />
          <span>Interactive 3D Earth in Background • Drag to Rotate</span>
        </span>
      </div>

    </div>
  );
}
