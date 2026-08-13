import { BACKGROUND_IMAGES } from '../../data/imageMap';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Briefcase, Building, CheckCircle } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';
import { LazyImage } from '../ui/LazyImage';

import { LazyImage } from '../ui/LazyImage';

export function TwoJourneys({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const glow1Y = useTransform(scrollYProgress, [0, 1], [-50, 80]);
  const glow2Y = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.97, 1, 0.98]);
  const bgParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} className="py-24 bg-navy-950 border-y border-white/10 relative overflow-hidden text-white">
      {/* Background Image Overlay from User Attachments with parallax */}
      <motion.div 
        style={{ y: bgParallax }}
        className="absolute inset-0 pointer-events-none transform-gpu origin-center"
      >
        <motion.div
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 0.1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-[120%] -top-[10%] relative bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: `url('/images/construction.jpg')` }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/95 to-navy-950 pointer-events-none" />

      {/* High-Performance Parallax background accents */}
      <motion.div 
        style={{ y: glow1Y }}
        className="absolute top-0 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none transform-gpu" 
      />
      <motion.div 
        style={{ y: glow2Y }}
        className="absolute bottom-0 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none transform-gpu" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-3 block">
            Your Path Forward
          </span>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white italic drop-shadow-md">
            Connecting global potential with global opportunity.
          </h3>
        </motion.div>

        <motion.div 
          style={{ scale: cardScale }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 transform-gpu"
        >
          {/* For Talent */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <SpringCard className="h-full">
              <div className="group relative bg-navy-950/95 backdrop-blur-md border border-white/15 hover:border-teal-400/80 text-white p-8 sm:p-12 rounded-3xl overflow-hidden shadow-2xl transition-all h-full flex flex-col justify-between cursor-pointer">
                <LazyImage 
                  src="/images/office-collaboration.jpg" 
                  alt="Office Collaboration" 
                  containerClassName="absolute inset-0 z-0 opacity-20" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950 via-navy-950/90 to-navy-950/80 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/15 rounded-bl-full group-hover:scale-125 transition-transform duration-500 pointer-events-none z-10" />
                
                <div className="relative z-20">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-teal-950 border border-teal-400/40 text-teal-300 text-xs font-black uppercase tracking-widest rounded-full mb-6 shadow-sm">
                    <Briefcase size={12} />
                    For Talent
                  </span>
                  <h4 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-teal-300 transition-colors">
                    Find Your Global Opportunity
                  </h4>
                  <p className="text-sky-100 mb-8 max-w-md leading-relaxed text-sm sm:text-base">
                    Your skills can take you further. We identify ambitious professionals and match them with forward-thinking employers internationally.
                  </p>
                  
                  <ul className="space-y-3 mb-10 text-sm text-sky-100 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle size={15} className="text-teal-400 shrink-0" />
                      <span>Vetted international roles with tier-1 sponsors</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle size={15} className="text-teal-400 shrink-0" />
                      <span>Interview coaching &amp; comprehensive visa preparation</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle size={15} className="text-teal-400 shrink-0" />
                      <span>Seamless relocation &amp; on-ground settlement support</span>
                    </li>
                  </ul>
                </div>

                <div className="relative z-20 pt-4 border-t border-white/10">
                  <motion.button 
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('candidate-portal')}
                    className="inline-flex items-center gap-2 text-teal-300 font-bold uppercase tracking-widest text-xs sm:text-sm group-hover:text-gold-300 transition-colors"
                  >
                    <span>Find Your Opportunity</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </SpringCard>
          </motion.div>

          {/* For Employers */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
          >
            <SpringCard className="h-full">
              <div className="group relative bg-navy-950/95 backdrop-blur-md border border-white/15 hover:border-gold-400/80 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-2xl transition-all h-full flex flex-col justify-between cursor-pointer">
                <LazyImage 
                  src="/images/open-for-business.jpg" 
                  alt="Open for business" 
                  containerClassName="absolute inset-0 z-0 opacity-20" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950 via-navy-950/90 to-navy-950/80 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/15 rounded-bl-full group-hover:scale-125 transition-transform duration-500 pointer-events-none z-10" />
                
                <div className="relative z-20 text-white">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-navy-900 border border-gold-400/40 text-gold-400 text-xs font-black uppercase tracking-widest rounded-full mb-6 shadow-sm">
                    <Building size={12} />
                    For Employers
                  </span>
                  <h4 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-gold-300 transition-colors">
                    Find Exceptional Talent
                  </h4>
                  <p className="text-sky-100 mb-8 max-w-md leading-relaxed text-sm sm:text-base">
                    Exceptional talent shouldn't be limited by geography. Access 426+ carefully matched professionals ready to contribute, grow, and perform.
                  </p>
                  
                  <ul className="space-y-3 mb-10 text-sm text-sky-100 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle size={15} className="text-gold-400 shrink-0" />
                      <span>Pre-screened &amp; tested professionals (426+ Passed)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle size={15} className="text-gold-400 shrink-0" />
                      <span>Managed recruitment process from end to end</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle size={15} className="text-gold-400 shrink-0" />
                      <span>Cross-border legal compliance &amp; work visa delivery</span>
                    </li>
                  </ul>
                </div>

                <div className="relative z-20 pt-4 border-t border-white/10">
                  <motion.button 
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('employer-portal')}
                    className="inline-flex items-center gap-2 text-gold-400 font-bold uppercase tracking-widest text-xs sm:text-sm group-hover:text-teal-300 transition-colors"
                  >
                    <span>Find Global Talent</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </SpringCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


