import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Globe } from 'lucide-react';

export function FinalCTA({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  return (
    <section className="py-32 bg-navy-950 border-t-4 border-gold-500 relative overflow-hidden text-center text-white">
      {/* GSAP Parallax Background Image */}
      <div 
        data-parallax-image
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center opacity-15 pointer-events-none scale-105" 
      />

      {/* Parallax Floating Glow Accents */}
      <div 
        data-parallax-speed="0.4"
        className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        data-parallax-speed="0.7"
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/15 rounded-full blur-[140px] pointer-events-none" 
      />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-400/40 text-gold-400 text-xs font-bold uppercase tracking-widest mb-6 shadow-xl"
        >
          <Sparkles size={14} className="text-gold-400" />
          <span>The Opportune Moment is Now</span>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-display font-bold text-white italic mb-6 leading-tight drop-shadow-lg">
          Your next opportunity could be across the border.
        </h2>
        <p className="text-xl md:text-2xl text-teal-300 mb-12 font-medium">
          Let's make the connection.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => onNavigate('candidate-portal')}
            className="w-full sm:w-auto bg-gold-500 text-navy-950 hover:bg-gold-400 px-9 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 group transform hover:-translate-y-1"
          >
            Start Your Journey <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
          <button 
            onClick={() => onNavigate('employer-portal')}
            className="w-full sm:w-auto bg-navy-900 border-2 border-teal-400 text-teal-300 hover:bg-teal-400 hover:text-navy-950 px-9 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg transform hover:-translate-y-1"
          >
            Hire Global Talent
          </button>
        </div>
      </div>
    </section>
  );
}

