import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Lightbulb, Clock, Globe } from 'lucide-react';
import { BACKGROUND_IMAGES } from '../../data/imageMap';
import { LazyImage } from '../ui/LazyImage';


export function WhyElKairon() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const bgParallax = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const features = [
    {
      title: "Rigorous Screening & 426+ Passed",
      description: "100% technical assessment, background verification & English proficiency checks via global verification standards.",
      icon: <Target className="text-teal-400" size={26} />,
      bg: "bg-teal-950/80 border border-teal-500/30",
      accent: "hover:border-teal-400",
      image: BACKGROUND_IMAGES.rigorousScreening
    },
    {
      title: "Cross-Border Visa Sponsorship",
      description: "Certified work permit corridors into UK, Germany, EU & UAE. Fast-tracked Opportunity Card & EU Blue Card processing.",
      icon: <Globe className="text-gold-400" size={26} />,
      bg: "bg-gold-950/80 border border-gold-500/30",
      accent: "hover:border-gold-400",
      image: BACKGROUND_IMAGES.crossBorderVisa
    },
    {
      title: "Kairos Precision Deployment",
      description: "Matching the right candidate in the opportune career window. Rapid placement pipelines for critical shortage occupations.",
      icon: <Clock className="text-sky-400" size={26} />,
      bg: "bg-sky-950/80 border border-sky-500/30",
      accent: "hover:border-sky-400",
      image: BACKGROUND_IMAGES.kairosPrecision
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-navy-950 text-white relative overflow-hidden border-y border-white/10">
      {/* Background Image Overlay with Parallax and Blur Load */}
      <motion.div 
        style={{ y: bgParallax }}
        className="absolute inset-0 pointer-events-none transform-gpu origin-center"
      >
        <motion.div
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          whileInView={{ filter: 'blur(0px)', opacity: 0.15 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-[120%] -top-[10%] relative bg-cover bg-center mix-blend-luminosity"
          style={{ backgroundImage: `url('${BACKGROUND_IMAGES.germanVisa}')` }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950/80 via-[#043350]/90 to-[#064266]/80 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-3 block">
            The ElKairon Difference
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white italic drop-shadow-md">
            More Than Recruitment. A True International Partnership.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              whileHover={{ 
                scale: 1.04, 
                y: -6,
                boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.5)"
              }}
              className={`relative  backdrop-blur-md rounded-2xl border border-white/15 shadow-xl transition-all duration-300 ${feature.accent} group cursor-default overflow-hidden flex flex-col`}
            >
              <LazyImage 
                src={feature.image} 
                alt={feature.title} 
                containerClassName="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent pointer-events-none" />
              
              <div className="relative z-20 p-8 flex-grow flex flex-col">
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2.5 group-hover:text-gold-300 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
