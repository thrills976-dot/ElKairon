import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      text: "ElKairon helped me understand the opportunity, prepare for the process and ultimately take the next step in my international career.",
      author: "Kwame D.",
      role: "Logistics Coordinator",
      journey: "FROM GHANA → GERMANY"
    },
    {
      text: "The support I received during my relocation was exceptional. They handled the complexities, allowing me to focus on my new nursing role.",
      author: "Amara O.",
      role: "Registered Nurse",
      journey: "FROM NIGERIA → UK"
    },
    {
      text: "Finding a specialized IT role in the UAE felt daunting until ElKairon matched my skills perfectly with an employer who truly valued my experience.",
      author: "Zanele M.",
      role: "IT Support Specialist",
      journey: "FROM SOUTH AFRICA → UAE"
    },
    {
      text: "Their transparent process and constant communication made moving to Canada a breeze. I am incredibly grateful.",
      author: "Youssef T.",
      role: "Civil Engineer",
      journey: "FROM EGYPT → CANADA"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 bg-gradient-to-b from-[#044c77] to-[#065A8C] border-b border-white/10 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-widest text-teal-300 uppercase mb-4">Success Stories</h2>
            <h3 className="text-4xl font-display font-bold text-white italic">
              Real Careers. Real Crossings.
            </h3>
          </motion.div>
        </div>

        <div className="relative max-w-4xl mx-auto h-[350px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-white/10 backdrop-blur-md p-10 md:p-12 rounded-3xl border border-white/20 shadow-xl flex flex-col md:flex-row items-center gap-8"
            >
              <div className="hidden md:flex shrink-0">
                <Quote className="text-gold-400" size={80} />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="inline-block px-3 py-1 bg-[#065A8C] text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                  {testimonials[currentIndex].journey}
                </div>
                
                <p className="text-lg md:text-xl text-white font-medium leading-relaxed mb-6">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div>
                  <h4 className="font-bold text-teal-300 text-lg">{testimonials[currentIndex].author}</h4>
                  <p className="text-sm text-gray-300">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'bg-gold-500 w-8' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
