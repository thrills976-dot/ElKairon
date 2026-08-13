import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Building2, Users } from 'lucide-react';
import { BACKGROUND_IMAGES } from '../../data/imageMap';

import { LazyImage } from '../ui/LazyImage';

export function FinalCTA({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgImageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const glow1Y = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="py-32 bg-navy-950 border-t-4 border-gold-500 relative overflow-hidden text-center text-white">
      {/* Background Image Overlay with Parallax and Blur Load */}
      <motion.div 
        style={{ y: bgImageY }}
        className="absolute inset-0 pointer-events-none transform-gpu origin-center"
      >
        <motion.div
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-[120%] -top-[10%] relative bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: `url('${BACKGROUND_IMAGES.openForBusiness}')` }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/85 to-navy-950 pointer-events-none" />

      {/* Parallax Floating Glow Accents */}
      <motion.div 
        style={{ y: glow1Y }}
        className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[140px] pointer-events-none transform-gpu" 
      />
      <motion.div 
        style={{ y: glow2Y }}
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/15 rounded-full blur-[140px] pointer-events-none transform-gpu" 
      />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-400/40 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-xl"
        >
          <Sparkles size={14} className="text-gold-400" />
          <span>The Opportune Moment is Now</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-display font-bold text-white italic mb-6 leading-tight drop-shadow-lg"
        >
          Your next opportunity could be across the border.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-teal-300 mb-12 font-medium"
        >
          Let's make the connection.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              boxShadow: "0 0 35px rgba(212,175,55,0.6)" 
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => onNavigate('candidate-portal')}
            className="w-full sm:w-auto bg-gold-500 text-navy-950 hover:bg-gold-400 px-9 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2.5 group transform-gpu"
          >
            <Users size={16} />
            <span>Start Your Candidate Journey</span>
            <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.button>
          
          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              boxShadow: "0 10px 25px -5px rgba(13, 148, 136, 0.4)" 
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => onNavigate('employer-portal')}
            className="w-full sm:w-auto bg-navy-900 border-2 border-teal-400 text-teal-300 hover:bg-teal-400 hover:text-navy-950 px-9 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2.5 shadow-lg transform-gpu"
          >
            <Building2 size={16} />
            <span>Hire Verified Global Talent</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

