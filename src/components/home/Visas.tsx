import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PlaneTakeoff, FileCheck, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';

export function Visas() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxBgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const visaTypes = [
    {
      title: "EU Blue Card (Germany/EU)",
      description: "Fast-track work and residence permit for highly skilled professionals.",
      icon: ShieldCheck,
      details: ["Recognized degree required", "Binding employment contract", "Fast pathway to permanent residency"]
    },
    {
      title: "UAE Employment Visa",
      description: "Comprehensive corporate work visa sponsored directly by UAE employers.",
      icon: FileCheck,
      details: ["Employer sponsorship", "Medical fitness certification", "Emirates ID & residency clearance"]
    },
    {
      title: "Germany Opportunity Card",
      description: "Chancenkarte points-based permit to seek employment on-ground in Germany.",
      icon: PlaneTakeoff,
      details: ["Points system based on education", "Proof of livelihood funds", "Up to 1-year renewable validity"]
    },
    {
      title: "Skilled Worker Visa (UK/EU)",
      description: "Direct visa pathway for candidates holding certified sponsor certificates.",
      icon: FileText,
      details: ["Certificate of Sponsorship (CoS)", "English proficiency verification", "Full family settlement eligibility"]
    }
  ];

  return (
    <section ref={sectionRef} id="visas" className="py-24 bg-navy-950/80 border-y border-white/10 relative overflow-hidden text-white">
      <motion.div 
        style={{ y: parallaxBgY }}
        className="absolute top-0 left-0 w-1/3 h-full bg-teal-500/10 skew-x-12 -translate-x-1/2 blur-3xl pointer-events-none transform-gpu" 
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-3 block">
            Immigration &amp; Compliance
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight italic">
            Global <span className="text-gold-400">Visa Pathways</span>
          </h2>
          <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto leading-relaxed">
            Navigating immigration requires precision. We provide verified, end-to-end guidance for securing the legal visa required for your global career transition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visaTypes.map((visa, idx) => {
            const Icon = visa.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <SpringCard className="h-full">
                  <div className="bg-navy-900/90 border border-white/15 rounded-2xl p-8 shadow-2xl hover:border-teal-400/80 transition-all duration-300 relative overflow-hidden group h-full flex flex-col justify-between cursor-default">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full blur-3xl group-hover:bg-gold-400/20 transition-colors" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 bg-teal-500 text-navy-950 rounded-xl flex items-center justify-center mb-6 shadow-md font-bold group-hover:bg-gold-400 group-hover:rotate-6 transition-all duration-300">
                        <Icon size={28} />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">
                        {visa.title}
                      </h3>
                      <p className="text-sky-200 text-sm mb-6 leading-relaxed">
                        {visa.description}
                      </p>
                      
                      <ul className="space-y-3 pt-4 border-t border-white/10">
                        {visa.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2 text-xs text-sky-100 font-medium">
                            <CheckCircle size={14} className="text-gold-400 shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </SpringCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

