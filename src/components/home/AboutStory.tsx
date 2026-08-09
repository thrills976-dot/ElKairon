import { motion } from 'motion/react';
import { Sparkles, Sun } from 'lucide-react';

export function AboutStory() {
  return (
    <section className="py-32 bg-navy-900 border-t border-b border-white/10 relative overflow-hidden text-white">
      {/* GSAP Parallax Ambient Lighting */}
      <div 
        data-parallax-speed="0.8"
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        data-parallax-speed="0.5"
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[140px] pointer-events-none" 
      />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-navy-950 border border-gold-400/40 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
            <Sparkles size={12} />
            <span>Our Foundation</span>
          </div>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white italic mb-14 drop-shadow-md">
            The Meaning Behind ElKairon
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 mb-16">
            <div className="text-center p-6 bg-navy-950/60 rounded-3xl border border-teal-400/20 backdrop-blur-sm flex-1" data-parallax-speed="0.2">
              <div className="text-6xl font-display font-black text-teal-300 mb-2 drop-shadow-lg">EL</div>
              <p className="text-sky-100 font-medium text-sm sm:text-base">Represents God and<br/>His infinite ability.</p>
            </div>
            <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-gold-400/50 to-transparent" />
            <div className="text-center p-6 bg-navy-950/60 rounded-3xl border border-gold-400/20 backdrop-blur-sm flex-1" data-parallax-speed="0.2">
              <div className="text-6xl font-display font-black text-gold-400 mb-2 drop-shadow-lg">KAIRON</div>
              <p className="text-sky-100 font-medium text-sm sm:text-base">Inspired by Kairos—the opportune<br/>moment—and connected to family.</p>
            </div>
          </div>
          
          <div className="relative pt-8">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
            <p className="text-2xl md:text-3xl font-display italic text-white leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              "Because opportunity isn't only about finding the right door. It's about finding it at the right moment."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

