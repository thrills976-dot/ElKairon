import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, PlaneTakeoff, ShieldCheck, Clock, Users, Building, Globe as GlobeIcon } from 'lucide-react';
import { useRef } from 'react';
import { Globe } from './Globe';

export function Hero({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <>
      <div id="hero" ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0DA2E7] to-[#065A8C] pt-20 border-b-4 border-gold-500">
        {/* Abstract Background Elements */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
          {/* 3D Globe Background */}
          <div className="absolute inset-0 w-full h-full opacity-100 flex items-center justify-center">
            {/* Fade white background glow behind the globe */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] md:w-[1200px] md:h-[1200px] bg-white/80 blur-[180px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-white blur-[120px] rounded-full pointer-events-none" />
            <Globe />
          </div>
          <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-teal-600 rounded-full blur-[120px] mix-blend-screen opacity-10 pointer-events-none" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full pb-20 pointer-events-none">
          
          {/* Text Content */}
          <div className="flex flex-col items-start gap-8 bg-black/10 backdrop-blur-[2px] border border-white/10 rounded-3xl p-8 md:p-10 max-w-2xl relative z-10 pointer-events-auto shadow-2xl">
            <div className="absolute inset-0 pointer-events-none" />
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3
                  }
                }
              }}
              className="relative z-10"
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-900/80 text-teal-300 text-xs font-bold tracking-widest uppercase border border-teal-700 mb-6 shadow-sm"
              >
                <ShieldCheck size={16} /> CIPA Registered & Govt Approved
              </motion.span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold italic text-white leading-[1.1] drop-shadow-lg ">
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
                  Right Moment.
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} className="text-gold-500">
                  Right Career.
                </motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
                  Anywhere.
                </motion.div>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              className="relative z-10 text-lg md:text-xl text-white max-w-xl font-medium leading-relaxed drop-shadow-md "
            >
              Connecting African talent with exceptional opportunities across the globe.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
              className="relative z-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('candidate-portal')}
                className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white rounded-lg font-bold shadow-md hover:bg-teal-500 uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                Find Your Opportunity <ArrowRight size={16} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('employer-portal')}
                className="w-full sm:w-auto px-6 py-3 bg-transparent border-2 border-gold-500 text-gold-500 rounded-lg font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-gold-500 hover:text-navy-900 transition-colors shadow-sm"
              >
                Hire Global Talent
              </motion.button>
            </motion.div>
          </div>

          {/* Feature Cards / Parallax Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full mt-12 lg:mt-0 hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[300px] md:max-w-md mx-auto pointer-events-none">
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -left-10 bg-navy-900 p-6 rounded-2xl border-l-4 border-gold-500 shadow-xl z-10"
              >
                <PlaneTakeoff className="text-gold-500 mb-3" size={32} />
                <h3 className="text-white font-display italic font-bold text-xl">Global Placements</h3>
                <p className="text-gray-300 text-sm mt-1">UAE & EU Focus</p>
              </motion.div>

              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -right-10 bg-teal-600 p-6 rounded-2xl border-t-4 border-gold-500 shadow-xl z-10"
              >
                <Clock className="text-gold-400 mb-3" size={32} />
                <h3 className="text-white font-display italic font-bold text-xl">Kairos Timing</h3>
                <p className="text-teal-50 text-sm mt-1">Fast-Track Hiring</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}