import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function TwoJourneys({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  return (
    <section className="py-24 bg-[#065A8C] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-sm font-bold tracking-widest text-teal-200 uppercase mb-4">Your Path Forward</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white italic">
            Connecting global potential with global opportunity.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Talent */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 text-white p-12 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-100 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform" />
            
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                For Talent
              </span>
              <h4 className="text-3xl font-display font-bold text-white mb-4">Find Your Global Opportunity</h4>
              <p className="text-gray-100 mb-8 max-w-sm">
                Your skills can take you further. We identify ambitious professionals and match them with forward-thinking employers internationally.
              </p>
              
              <ul className="space-y-3 mb-10 text-sm text-gray-100">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Vetted international roles</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Interview & visa preparation</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500" /> Seamless relocation support</li>
              </ul>

              <button 
                onClick={() => onNavigate('candidate-portal')}
                className="inline-flex items-center gap-2 text-teal-300 font-bold uppercase tracking-widest text-sm group-hover:text-teal-100"
              >
                Find Your Opportunity <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* For Employers */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative bg-gradient-to-br from-[#0DA2E7] to-[#065A8C] p-12 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-900/30 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform" />
            
            <div className="relative z-10 text-white">
              <span className="inline-block px-3 py-1 bg-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                For Employers
              </span>
              <h4 className="text-3xl font-display font-bold text-white mb-4">Find Exceptional Talent</h4>
              <p className="text-gray-300 mb-8 max-w-sm">
                Exceptional talent shouldn't be limited by geography. Access carefully matched professionals ready to contribute, grow, and perform.
              </p>
              
              <ul className="space-y-3 mb-10 text-sm text-gray-300">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Pre-screened & verified professionals</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Managed recruitment process</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500" /> Cross-border compliance</li>
              </ul>

              <button 
                onClick={() => onNavigate('employer-portal')}
                className="inline-flex items-center gap-2 text-gold-400 font-bold uppercase tracking-widest text-sm group-hover:text-gold-300"
              >
                Find Global Talent <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
