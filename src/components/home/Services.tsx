import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Building2, Users, FileCheck, Stethoscope, HardHat, Coffee, Globe, ArrowUpRight } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';

const services = [
  {
    title: "Talent Sourcing",
    desc: "Pre-qualified candidate pools across Healthcare, Construction, Hospitality, Logistics, and Skilled Trades.",
    icon: Users,
    badge: "Verified Candidates",
  },
  {
    title: "Visa & Relocation Support",
    desc: "End-to-end support for work permits, contracts, flights, and government process guidance.",
    icon: FileCheck,
    badge: "Full Compliance",
  },
  {
    title: "Cultural Integration",
    desc: "Pre-departure briefings and on-ground assistance to ensure smooth transitions into new environments.",
    icon: Globe,
    badge: "On-Ground Network",
  }
];

const sectors = [
  { name: "Healthcare", icon: Stethoscope },
  { name: "Construction", icon: HardHat },
  { name: "Hospitality", icon: Coffee },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-navy-900/60 backdrop-blur-md border-y border-white/10 relative overflow-hidden">
      {/* Parallax background ambient glow */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute top-1/3 -right-20 w-80 h-80 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none transform-gpu"
      />
      <motion.div 
        style={{ y: yBackground }}
        className="absolute bottom-10 -left-20 w-80 h-80 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none transform-gpu"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold-400 font-bold tracking-widest uppercase text-xs mb-3 block">What We Do</span>
          <h3 className="font-display italic text-4xl font-bold text-white mb-6">Comprehensive Recruitment &amp; Relocation</h3>
          <p className="text-sky-100 text-lg leading-relaxed">
            We provide seamless end-to-end solutions for both global employers seeking talent and candidates looking for their next career move.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <SpringCard className="h-full">
                <div className="bg-navy-950/90 p-8 rounded-2xl border-t-4 border-gold-400 hover:border-teal-400 shadow-2xl transition-all h-full flex flex-col justify-between group border border-white/10">
                  <div>
                    <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-navy-950 text-gold-400 transition-all duration-300 shadow-md">
                      <service.icon size={28} className="group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="font-display text-xl font-bold italic text-white mb-3 group-hover:text-gold-300 transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sky-200 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-teal-300">
                    <span>{service.badge}</span>
                    <ArrowUpRight size={15} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-gold-400" />
                  </div>
                </div>
              </SpringCard>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 border-t border-white/10 pt-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="font-display italic text-2xl font-bold text-white mb-2">Key Sectors We Serve</h4>
              <p className="text-sky-200">Specialized talent pools ready for deployment.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {sectors.map((sector, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex items-center gap-2 bg-navy-950 px-5 py-3 rounded-full border border-white/15 shadow-sm text-gold-400 font-bold uppercase tracking-wider text-[10px] cursor-pointer hover:border-gold-400/60 transition-colors"
                >
                  <sector.icon size={16} className="text-teal-400" />
                  <span>{sector.name}</span>
                </motion.div>
              ))}
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-2 bg-gold-500 text-navy-950 px-5 py-3 rounded-full border border-gold-400 shadow-md font-bold uppercase tracking-wider text-[10px] cursor-pointer"
              >
                <span>+ Logistics &amp; Domestic</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


