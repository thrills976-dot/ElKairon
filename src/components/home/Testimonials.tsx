import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  const testimonials = [
    {
      text: "ElKairon helped me understand the opportunity, prepare for the rigorous German trade assessment, and ultimately relocate safely with my family.",
      author: "Kwame D.",
      role: "Logistics Coordinator & Dispatch Specialist",
      journey: "FROM GHANA → GERMANY",
      stars: 5
    },
    {
      text: "The clinical credentialing and visa support I received was exceptional. They handled the complex NHS paperwork so I could focus on patient care.",
      author: "Amara O.",
      role: "Registered Nurse & Ward Manager",
      journey: "FROM NIGERIA → UK",
      stars: 5
    },
    {
      text: "Finding a specialized enterprise IT role in Dubai felt daunting until ElKairon matched my skills perfectly with an employer who provided full relocation.",
      author: "Zanele M.",
      role: "Cloud & Systems Administrator",
      journey: "FROM SOUTH AFRICA → UAE",
      stars: 5
    },
    {
      text: "Their transparent process and constant updates made our European relocation seamless. The airport reception and apartment setup was fantastic.",
      author: "Youssef T.",
      role: "Senior Civil Engineer",
      journey: "FROM EGYPT → NETHERLANDS",
      stars: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#044c77] via-navy-900 to-navy-950 border-b border-white/10 overflow-hidden relative text-white">
      <motion.div 
        style={{ y: glowY }}
        className="absolute top-1/4 -right-20 w-96 h-96 bg-teal-400/10 rounded-full blur-[160px] pointer-events-none transform-gpu" 
      />
      <motion.div 
        style={{ y: glowY }}
        className="absolute bottom-10 -left-20 w-96 h-96 bg-gold-400/10 rounded-full blur-[160px] pointer-events-none transform-gpu" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-bold tracking-widest text-teal-300 uppercase mb-3 block">
              Success Stories
            </span>
            <h3 className="text-4xl sm:text-5xl font-display font-bold text-white italic drop-shadow-md">
              Real Careers. Real Crossings.
            </h3>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[320px] md:min-h-[260px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-navy-900/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
            >
              <div className="hidden md:flex shrink-0 w-20 h-20 rounded-2xl bg-navy-950 border border-white/15 items-center justify-center shadow-inner">
                <Quote className="text-gold-400" size={44} />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div className="inline-block px-3.5 py-1 bg-teal-950 border border-teal-400/40 text-teal-300 text-[10px] sm:text-xs font-black uppercase tracking-widest rounded-full self-center sm:self-start shadow-sm">
                    {testimonials[currentIndex].journey}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(testimonials[currentIndex].stars)].map((_, i) => (
                      <Star key={i} size={14} className="fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                </div>
                
                <p className="text-base sm:text-lg md:text-xl text-sky-100 font-medium leading-relaxed mb-6 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div>
                  <h4 className="font-bold text-white text-lg font-display">{testimonials[currentIndex].author}</h4>
                  <p className="text-xs sm:text-sm text-teal-300 font-semibold">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls with spring micro-interactions */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full bg-navy-900 border border-white/20 text-white flex items-center justify-center hover:bg-teal-600 hover:border-teal-400 transition-colors shadow-md"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'bg-gold-400 w-8 shadow-md' : 'bg-white/30 hover:bg-white/60 w-2.5'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full bg-navy-900 border border-white/20 text-white flex items-center justify-center hover:bg-teal-600 hover:border-teal-400 transition-colors shadow-md"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
