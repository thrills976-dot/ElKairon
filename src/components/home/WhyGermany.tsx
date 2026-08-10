import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CheckCircle2, TrendingUp, HeartPulse, GraduationCap, Plane, MapPin, Sparkles } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';

const reasons = [
  { icon: TrendingUp, title: "Strong Economy", desc: "High demand for skilled workers in IT, engineering, healthcare, and business." },
  { icon: HeartPulse, title: "Quality Healthcare", desc: "Mandatory and accessible world-class healthcare system for all residents." },
  { icon: GraduationCap, title: "Tuition-Free Education", desc: "Free or low-cost education at top public universities, even for international dependents." },
  { icon: CheckCircle2, title: "Work-Life Balance", desc: "20–30+ days paid vacation, 38-hour average work weeks, and strict employee protections." },
  { icon: MapPin, title: "Quality of Life", desc: "Clean, safe, highly organized environment with punctual public transit and green infrastructure." },
  { icon: Plane, title: "Central European Hub", desc: "Located at the heart of Europe making travel across the Schengen zone effortless and borderless." },
];

export function WhyGermany() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section ref={sectionRef} id="germany" className="py-24 bg-navy-900/90 text-white relative overflow-hidden border-y border-white/10">
      <motion.div 
        style={{ y: glowY }}
        className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/10 blur-[180px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none transform-gpu" 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/3"
          >
            <div className="sticky top-32">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-4 shadow-lg cursor-default"
              >
                <span>Top Relocation Destination 🇩🇪</span>
              </motion.div>
              <h3 className="font-display italic text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg leading-tight">
                Why Relocate to Germany?
              </h3>
              <p className="text-sky-100 text-base leading-relaxed mb-8">
                Germany represents our highest-approval relocation corridor. The Opportunity Card (Chancenkarte) and Skilled Immigration Act provide fast-track paths for qualified African professionals and full family reunification rights.
              </p>
              
              <div className="p-4 rounded-2xl bg-navy-950/80 border border-teal-400/40 text-teal-300 text-xs font-semibold flex items-center gap-3">
                <Sparkles size={18} className="text-gold-400 shrink-0" />
                <span>Opportunity Card &amp; Work Visa approvals currently averaging 4–6 weeks.</span>
              </div>
            </div>
          </motion.div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full"
                >
                  <SpringCard className="h-full">
                    <div className="bg-navy-950/90 p-6 rounded-2xl border border-white/15 hover:border-gold-400 transition-all shadow-2xl h-full flex flex-col justify-between group cursor-default">
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center mb-4 group-hover:bg-gold-500 group-hover:text-navy-950 text-teal-400 transition-all duration-300 border border-white/10 shadow-md">
                          <reason.icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h4 className="font-display text-xl font-bold mb-2 text-white group-hover:text-gold-300 transition-colors">
                          {reason.title}
                        </h4>
                        <p className="text-sm text-sky-200 leading-relaxed">
                          {reason.desc}
                        </p>
                      </div>
                    </div>
                  </SpringCard>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

