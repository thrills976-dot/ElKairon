import { motion } from 'motion/react';

export function AboutStory() {
  return (
    <section className="py-32 bg-[#065A8C] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0DA2E7]/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-bold tracking-widest text-gold-400 uppercase mb-4">Our Story</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white italic mb-12">
            The Meaning Behind ElKairon
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-16">
            <div className="text-center">
              <div className="text-5xl font-display font-bold text-teal-300 mb-2">EL</div>
              <p className="text-gray-200 font-medium">Represents God and<br/>His infinite ability.</p>
            </div>
            <div className="hidden md:block w-px h-24 bg-white/20" />
            <div className="text-center">
              <div className="text-5xl font-display font-bold text-gold-500 mb-2">KAIRON</div>
              <p className="text-gray-200 font-medium">Inspired by Kairos—the opportune<br/>moment—and connected to family.</p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 w-24 h-px bg-gold-300" />
            <p className="pt-12 text-2xl md:text-3xl font-display italic text-white leading-relaxed max-w-2xl mx-auto">
              "Because opportunity isn't only about finding the right door. It's about finding it at the right moment."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
