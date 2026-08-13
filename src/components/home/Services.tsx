import { BACKGROUND_IMAGES } from '../../data/imageMap';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Users, FileCheck, Stethoscope, HardHat, Coffee, Globe, ArrowUpRight, Sprout, Building2 } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';
import { LazyImage } from '../ui/LazyImage';
import { SECTOR_IMAGE_CARDS } from '../../data/imageMap';

import { LazyImage } from '../ui/LazyImage';

const services = [
  {
    title: "Talent Sourcing",
    desc: "Pre-qualified candidate pools across Healthcare, Construction, Agriculture, Hospitality, and Skilled Trades.",
    icon: Users,
    badge: "Verified Candidates",
    image: BACKGROUND_IMAGES.officeCollaboration
  },
  {
    title: "Visa & Relocation Support",
    desc: "End-to-end support for work permits, contracts, flights, and government process guidance.",
    icon: FileCheck,
    badge: "Full Compliance",
    image: BACKGROUND_IMAGES.corporateHandshake
  },
  {
    title: "Cultural Integration",
    desc: "Pre-departure briefings and on-ground assistance to ensure smooth transitions into new environments.",
    icon: Globe,
    badge: "On-Ground Network",
    image: BACKGROUND_IMAGES.happyCandidate
  }
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-navy-950 border-y border-white/10 relative overflow-hidden">
      {/* Background Image Overlay from User Attachments with Parallax and Gradient */}
      <motion.div 
        style={{ y: yParallax }}
        className="absolute inset-0 pointer-events-none transform-gpu origin-center"
      >
        <motion.div
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-[120%] -top-[10%] relative bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: `url('/images/corporate-handshake.jpg')` }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/85 to-navy-950 pointer-events-none" />

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
                <div className="relative  rounded-2xl border-t-4 border-gold-400 hover:border-teal-400 shadow-2xl transition-all h-full flex flex-col justify-between group border-x border-b border-white/10 overflow-hidden">
                  <LazyImage src={service.image} alt={service.title} containerClassName="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent pointer-events-none" />
                  
                  <div className="relative z-20 p-8 flex flex-col h-full">
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
                </div>
              </SpringCard>
            </motion.div>
          ))}
        </div>

        {/* Specialized Industry Sectors with Authentic Image Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 border-t border-white/10 pt-16"
        >
          <div className="mb-8 text-center md:text-left">
            <h4 className="font-display italic text-3xl font-bold text-white mb-2">Key Sectors We Serve</h4>
            <p className="text-sky-200 text-base">Verified, job-ready talent pipelines across specialized global industries.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SECTOR_IMAGE_CARDS.map((sector) => (
              <motion.div
                key={sector.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative rounded-2xl overflow-hidden border border-white/15 bg-navy-900 shadow-xl flex flex-col h-80 cursor-pointer"
              >
                {/* Image Background Layer with Blur Image */}
                <LazyImage src={sector.image} alt={sector.title} containerClassName="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-700" className="w-full h-full object-cover" />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/80 via-navy-950/75 to-transparent transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

                <div className="relative z-20 p-6 flex flex-col justify-end h-full">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gold-400 mb-1">
                    {sector.subtitle}
                  </span>
                  <h5 className="text-xl font-display font-bold text-white mb-2 group-hover:text-gold-300 transition-colors">
                    {sector.title}
                  </h5>
                  <p className="text-xs text-sky-100/90 leading-relaxed line-clamp-3">
                    {sector.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


