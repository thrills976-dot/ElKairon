import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Search, FileCheck, ShieldCheck, Plane } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxGlowY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "We identify ambitious professionals with the skills and potential global employers need through initial screening.",
      icon: <Search size={28} />
    },
    {
      num: "02",
      title: "Prepare & Assess",
      desc: "We help candidates master international trade assessments, technical vetting (426+ passed), and language standards.",
      icon: <FileCheck size={28} />
    },
    {
      num: "03",
      title: "Match & Interview",
      desc: "We match talent directly with verified tier-1 employers in the UK, Germany, and UAE with structured interview coaching.",
      icon: <ShieldCheck size={28} />
    },
    {
      num: "04",
      title: "Deploy & Relocate",
      desc: "We execute certified work visa clearance, flight logistics, and airport reception for a seamless transition.",
      icon: <Plane size={28} />
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-navy-950/90 text-white relative overflow-hidden border-y border-white/10">
      <motion.div 
        style={{ y: parallaxGlowY }}
        className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[160px] pointer-events-none transform-gpu" 
      />
      <motion.div 
        style={{ y: parallaxGlowY }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[160px] pointer-events-none transform-gpu" 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-3 block">
            How It Works
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold italic mb-6 text-white drop-shadow-md">
            From African Potential to Global Opportunity
          </h3>
          <p className="text-sky-100 text-base leading-relaxed">
            A structured, transparent process designed to create lasting international connections and 100% verified visa outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <SpringCard className="h-full">
                <div className="relative bg-navy-900/80 p-8 rounded-2xl border border-white/15 hover:border-gold-400/80 shadow-2xl transition-all h-full flex flex-col justify-between group overflow-hidden cursor-default">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/10 rounded-full blur-2xl group-hover:bg-gold-400/20 transition-all" />
                  
                  <div>
                    <div className="relative z-10 bg-navy-950 w-16 h-16 rounded-2xl flex items-center justify-center text-teal-300 mb-6 border border-white/20 shadow-xl group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300 group-hover:rotate-6">
                      {step.icon}
                      <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="absolute -top-3 -right-3 w-8 h-8 bg-gold-400 text-navy-950 rounded-full flex items-center justify-center text-xs font-black shadow-md"
                      >
                        {step.num}
                      </motion.div>
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-white group-hover:text-gold-300 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-sky-200 text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-teal-300">
                    <span>Stage {step.num}</span>
                    <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                  </div>
                </div>
              </SpringCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

