import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Users, FileCheck, Globe, ArrowUpRight, ChevronRight, ArrowRight } from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';
import { BACKGROUND_IMAGES, SECTOR_IMAGE_CARDS } from '../../data/imageMap';

const services = [
  {
    title: "Talent Sourcing",
    desc: "Pre-qualified candidate pools across Healthcare, Construction, Agriculture, Hospitality, and Skilled Trades.",
    details: "We leverage our expansive global network to source, vet, and pre-qualify top-tier professionals. Every candidate undergoes rigorous skill assessments and background checks to ensure they meet your exact organizational requirements.",
    icon: Users,
    badge: "Verified Candidates",
    image: '/images/talent-sourcing.jpg'
  },
  {
    title: "Visa & Relocation",
    desc: "End-to-end support for work permits, contracts, flights, and government process guidance.",
    details: "Navigating international immigration can be complex. Our dedicated legal and mobility teams handle all paperwork, embassy appointments, work permit applications, and flight logistics for a seamless transition.",
    icon: FileCheck,
    badge: "Full Compliance",
    image: '/images/visa-relocation.jpg'
  },
  {
    title: "Cultural Integration",
    desc: "Pre-departure briefings and on-ground assistance to ensure smooth transitions into new environments.",
    details: "Success abroad requires more than just job skills. We provide comprehensive language training, cultural workshops, and on-ground local support to help candidates integrate quickly and thrive in their new communities.",
    icon: Globe,
    badge: "On-Ground Network",
    image: '/images/cultural-integration.jpg'
  }
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], [-40, 60]);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-navy-950 relative overflow-hidden border-b border-white/10">
      {/* Permanent Section Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('${BACKGROUND_IMAGES.corporateHandshake}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/95 to-navy-950 pointer-events-none" />
      
      {/* Dark Theme Ambient Background Glows */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none transform-gpu"
      />
      <motion.div 
        style={{ y: yBackground }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none transform-gpu"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold-400 font-bold tracking-widest uppercase text-xs mb-3 block">What We Do</span>
          <h3 className="font-display italic text-4xl font-bold text-white mb-6">Comprehensive Recruitment & Relocation</h3>
          <p className="text-sky-100 text-lg leading-relaxed">
            We provide seamless end-to-end solutions for both global employers seeking talent and candidates looking for their next career move.
          </p>
        </motion.div>

        {/* Interactive Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative bg-navy-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 h-[420px] group border border-white/10 cursor-default">
                
                {/* Background Image (Always visible on dark theme, zooms out slightly on hover) */}
                <LazyImage 
                  src={service.image} 
                  alt={service.title} 
                  containerClassName="absolute inset-0 z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-700" 
                  className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700" 
                />
                {/* Dark Gradient Overlay to ensure text readability */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-navy-950/40 via-navy-950/10 to-navy-950/70 group-hover:from-navy-950/60 group-hover:via-navy-950/30 group-hover:to-navy-950/80 transition-colors duration-500 pointer-events-none" />

                {/* Content Layer */}
                <div className="absolute inset-0 z-20 p-8 flex flex-col">
                  
                  {/* Default State Container */}
                  <div className="transition-all duration-500 transform group-hover:-translate-y-8 group-hover:opacity-0 flex flex-col h-full">
                    <div className="w-16 h-16 bg-navy-900/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-white/10 text-gold-400">
                      <service.icon size={32} />
                    </div>
                    <h4 className="font-display text-2xl font-bold italic text-white mb-4 [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
                      {service.title}
                    </h4>
                    <p className="text-white leading-relaxed text-base font-medium [text-shadow:_0_1px_5px_rgba(0,0,0,0.8)]">
                      {service.desc}
                    </p>
                    
                    <div className="mt-auto flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider">
                      Hover to explore <ChevronRight size={16} />
                    </div>
                  </div>

                  {/* Hover State Container */}
                  <div className="absolute inset-0 p-8 transition-all duration-500 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex flex-col h-full pointer-events-none">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-teal-500/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg text-teal-300 border border-teal-500/30 shrink-0">
                        <service.icon size={24} />
                      </div>
                      <h4 className="font-display text-xl font-bold italic text-white">
                        {service.title}
                      </h4>
                    </div>
                    <p className="text-sky-100 leading-relaxed text-sm mb-6">
                      {service.details}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold text-gold-400 uppercase tracking-widest pointer-events-auto">
                      <span>{service.badge}</span>
                      <ArrowUpRight size={18} className="text-white hover:text-teal-300 transition-colors cursor-pointer" />
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Specialized Industry Sectors */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 border-t border-white/10 pt-16"
        >
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-end justify-between gap-6">
            <div>
              <span className="text-gold-400 font-bold tracking-widest uppercase text-xs mb-3 block">Global Reach</span>
              <h4 className="font-display italic text-3xl font-bold text-white mb-2">Key Sectors We Serve</h4>
              <p className="text-sky-100 text-base max-w-xl">Verified, job-ready talent pipelines across specialized global industries.</p>
            </div>
            <button className="px-6 py-3 bg-navy-900 border border-white/10 text-white rounded-xl font-bold text-sm shadow-sm hover:shadow-md hover:border-teal-400 hover:text-teal-300 transition-all flex items-center gap-2 group">
              View All Sectors <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SECTOR_IMAGE_CARDS.map((sector) => (
              <motion.div
                key={sector.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }}
                className="group relative rounded-3xl overflow-hidden bg-navy-900 shadow-md hover:shadow-xl flex flex-col h-[340px] cursor-pointer border border-white/10"
              >
                {/* Image Background */}
                <LazyImage 
                  src={sector.image} 
                  alt={sector.title} 
                  containerClassName="absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-700 opacity-100" 
                  className="w-full h-full object-cover" 
                />
                {/* Dark Gradient Overlay for text readability */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />
                
                {/* Content */}
                <div className="relative z-20 p-6 flex flex-col justify-end h-full">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="inline-block px-2.5 py-1 rounded-full bg-gold-400/20 border border-gold-400/30 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-gold-300 mb-3">
                      {sector.subtitle}
                    </span>
                    <h5 className="text-xl font-display font-bold text-white mb-2 group-hover:text-gold-300 [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)] transition-colors">
                      {sector.title}
                    </h5>
                    {/* Expandable Description */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      <p className="text-xs text-white leading-relaxed font-medium overflow-hidden [text-shadow:_0_1px_5px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {sector.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
