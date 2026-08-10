import { motion } from 'motion/react';
import { Globe2, ShieldCheck, Zap, Award, CheckCircle } from 'lucide-react';

export function CredibilityStrip() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#044c77] border-b border-[#033b5c] text-white py-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-32 bg-teal-400/10 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-8 mb-8"
        >
          <div className="text-xs sm:text-sm font-extrabold tracking-[0.2em] text-gold-400 uppercase flex items-center gap-3 sm:gap-6 mb-4 md:mb-0">
            <span className="hover:text-gold-300 transition-colors">United Kingdom</span>
            <span className="text-white/30">•</span>
            <span className="hover:text-gold-300 transition-colors">Germany</span>
            <span className="text-white/30">•</span>
            <span className="hover:text-gold-300 transition-colors">UAE</span>
            <span className="text-white/30">•</span>
            <span className="hover:text-gold-300 transition-colors">Africa</span>
          </div>
          <div className="text-xs text-sky-100 uppercase tracking-widest text-center md:text-right font-medium flex items-center gap-2">
            <CheckCircle size={14} className="text-teal-300 shrink-0" />
            <span>426+ Accredited Candidates Passed Assessment &amp; Deployed Globally</span>
          </div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
        >
          {[
            {
              icon: ShieldCheck,
              iconColor: "text-teal-300",
              title: "Rigorous Screening & 426+ Passed",
              desc: "100% technical assessment, background verification & English proficiency"
            },
            {
              icon: Globe2,
              iconColor: "text-gold-400",
              title: "Cross-Border Visa Sponsorship",
              desc: "Certified work permit corridors into UK, Germany, EU & UAE"
            },
            {
              icon: Zap,
              iconColor: "text-teal-300",
              title: "Kairos Precision Deployment",
              desc: "Matching the right candidate in the opportune career window"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  x: 4,
                  backgroundColor: "rgba(6, 90, 140, 0.6)"
                }}
                className="flex items-center gap-4 justify-center md:justify-start p-4 rounded-2xl border border-transparent hover:border-teal-400/30 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 bg-[#065A8C] rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:rotate-6 transition-transform">
                  <Icon size={24} className={item.iconColor} />
                </div>
                <div>
                  <h4 className="font-bold text-base sm:text-lg text-white leading-snug">{item.title}</h4>
                  <p className="text-sky-100 text-xs sm:text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
