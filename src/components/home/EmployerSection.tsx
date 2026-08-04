import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function EmployerSection({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  const benefits = [
    "Talent sourcing from verified pools",
    "Candidate screening & cultural alignment",
    "Skills matching to exact requirements",
    "International recruitment support",
    "Candidate interview preparation",
    "Cross-border coordination & visa assistance"
  ];

  return (
    <section className="py-24 bg-[#044c77] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-[#0DA2E7]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0DA2E7] to-[#065A8C] opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                    <span className="text-gold-500 font-display font-bold text-3xl italic">K</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white italic leading-tight">
                    "Bridging the talent gap with precision, speed, and absolute compliance."
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-sm font-bold tracking-widest text-teal-300 uppercase mb-4">For Employers</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white italic mb-6 leading-tight">
              Global Talent.<br />Without the Global Hassle.
            </h3>
            <p className="text-gray-200 text-lg mb-8">
              Access carefully matched African professionals ready to contribute, grow and perform in international environments. We handle the complexities so you can focus on building your team.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-teal-300 shrink-0 mt-0.5" size={20} />
                  <span className="text-sm text-gray-100 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onNavigate('employer-portal')}
              className="bg-[#0DA2E7] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#0da2e7] transition-colors shadow-lg flex items-center gap-2 group"
            >
              Partner With ElKairon <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
