import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Amara O.",
    role: "Registered Nurse",
    location: "Berlin, Germany",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1baf8a?w=400&q=80",
    quote: "ElKairon made my transition to Germany seamless. From the language preparation to the final visa approval, they were there every step of the way. I'm now working in a top hospital.",
  },
  {
    id: 2,
    name: "Kwame D.",
    role: "Logistics Coordinator",
    location: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&q=80",
    quote: "I was skeptical about upfront fees, but their step-by-step payment structure gave me peace of mind. Within 3 months, I had my offer letter and visa for Dubai.",
  },
  {
    id: 3,
    name: "Zanele M.",
    role: "IT Support Specialist",
    location: "Amsterdam, Netherlands",
    image: "https://images.unsplash.com/photo-1580894732444-8ecbef79bd14?w=400&q=80",
    quote: "The EU market seemed impossible to crack from Africa. ElKairon Global Connect didn't just find me a job; they matched me with a company that values my skills.",
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-navy-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-gold-500 font-bold tracking-widest uppercase text-xs mb-3">Feedback</h2>
          <h3 className="font-display italic text-4xl font-bold text-white mb-6">What Our Candidates Say</h3>
          <p className="text-gray-400 text-lg">
            Real feedback from successful placements worldwide.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white/5 backdrop-blur-sm border border-gold-500/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-900 hidden md:block" />
              </div>
              
              <div className="w-full md:w-3/5 p-8 md:p-12 relative flex flex-col justify-center">
                <Quote className="text-gold-500 mb-6 opacity-80" size={40} />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-gold-500 fill-gold-500" size={16} />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed italic text-lg md:text-xl mb-8">
                  "{testimonials[currentIndex].quote}"
                </p>
                <div>
                  <h4 className="font-display text-2xl font-bold italic text-white mb-1">{testimonials[currentIndex].name}</h4>
                  <p className="text-gold-500 text-sm font-bold uppercase tracking-wider">
                    {testimonials[currentIndex].role} — {testimonials[currentIndex].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-6 mt-12">
            <button 
              onClick={prev} 
              className="w-12 h-12 rounded-full bg-white/10 border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next} 
              className="w-12 h-12 rounded-full bg-white/10 border border-gold-500/30 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-navy-900 transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
