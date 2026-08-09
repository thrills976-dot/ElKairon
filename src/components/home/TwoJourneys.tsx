import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Briefcase, Building } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';

export function TwoJourneys({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  return (
    <section className="py-24 bg-navy-950/80 border-y border-white/10 relative overflow-hidden text-white">
      {/* GSAP Parallax background accents */}
      <div 
        data-parallax-speed="0.5"
        className="absolute top-0 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        data-parallax-speed="0.7"
        className="absolute bottom-0 left-10 w-96 h-96 bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-3">Your Path Forward</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white italic drop-shadow-md">
            Connecting global potential with global opportunity.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Talent */}
          <SpringCard className="h-full">
            <div className="group relative bg-navy-900/90 backdrop-blur-md border border-white/15 hover:border-teal-400/80 text-white p-8 sm:p-12 rounded-3xl overflow-hidden shadow-2xl transition-all h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/15 rounded-bl-full group-hover:scale-125 transition-transform" />
              
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-teal-950 border border-teal-400/40 text-teal-300 text-xs font-black uppercase tracking-widest rounded-full mb-6">
                  <Briefcase size={12} />
                  For Talent
                </span>
                <h4 className="text-3xl font-display font-bold text-white mb-4">Find Your Global Opportunity</h4>
                <p className="text-sky-100 mb-8 max-w-md leading-relaxed text-sm sm:text-base">
                  Your skills can take you further. We identify ambitious professionals and match them with forward-thinking employers internationally.
                </p>
                
                <ul className="space-y-3 mb-10 text-sm text-sky-100 font-medium">
                  <li className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-teal-400" /> Vetted international roles</li>
                  <li className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-teal-400" /> Interview & visa preparation</li>
                  <li className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-teal-400" /> Seamless relocation support</li>
                </ul>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10">
                <button 
                  onClick={() => onNavigate('candidate-portal')}
                  className="inline-flex items-center gap-2 text-teal-300 font-bold uppercase tracking-widest text-xs sm:text-sm group-hover:text-gold-300 transition-colors"
                >
                  Find Your Opportunity <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </SpringCard>

          {/* For Employers */}
          <SpringCard className="h-full">
            <div className="group relative bg-navy-900/90 backdrop-blur-md border border-white/15 hover:border-gold-400/80 p-8 sm:p-12 rounded-3xl overflow-hidden shadow-2xl transition-all h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/15 rounded-bl-full group-hover:scale-125 transition-transform" />
              
              <div className="relative z-10 text-white">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-navy-950 border border-gold-400/40 text-gold-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
                  <Building size={12} />
                  For Employers
                </span>
                <h4 className="text-3xl font-display font-bold text-white mb-4">Find Exceptional Talent</h4>
                <p className="text-sky-100 mb-8 max-w-md leading-relaxed text-sm sm:text-base">
                  Exceptional talent shouldn't be limited by geography. Access carefully matched professionals ready to contribute, grow, and perform.
                </p>
                
                <ul className="space-y-3 mb-10 text-sm text-sky-100 font-medium">
                  <li className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-gold-400" /> Pre-screened & verified professionals</li>
                  <li className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-gold-400" /> Managed recruitment process</li>
                  <li className="flex items-center gap-2.5"><div className="w-2 h-2 rounded-full bg-gold-400" /> Cross-border compliance</li>
                </ul>
              </div>

              <div className="relative z-10 pt-4 border-t border-white/10">
                <button 
                  onClick={() => onNavigate('employer-portal')}
                  className="inline-flex items-center gap-2 text-gold-400 font-bold uppercase tracking-widest text-xs sm:text-sm group-hover:text-teal-300 transition-colors"
                >
                  Find Global Talent <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </SpringCard>
        </div>
      </div>
    </section>
  );
}

