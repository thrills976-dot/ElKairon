import { motion } from 'motion/react';
import { Target, Lightbulb, Clock, Globe } from 'lucide-react';

export function WhyElKairon() {
  const features = [
    {
      title: "Right Talent (426+ Passed)",
      description: "We focus on meaningful matches, not volume. Every candidate is rigorously screened, tested & verified.",
      icon: <Target className="text-teal-400" size={26} />,
      bg: "bg-teal-950/80 border border-teal-500/30",
      accent: "hover:border-teal-400"
    },
    {
      title: "Right Opportunity",
      description: "We connect candidates with verified tier-1 employers offering competitive salaries and relocation packages.",
      icon: <Lightbulb className="text-gold-400" size={26} />,
      bg: "bg-gold-950/80 border border-gold-500/30",
      accent: "hover:border-gold-400"
    },
    {
      title: "Kairos Precision Timing",
      description: "Because the best opportunity is the one that arrives at the exact right moment in your career trajectory.",
      icon: <Clock className="text-sky-400" size={26} />,
      bg: "bg-sky-950/80 border border-sky-500/30",
      accent: "hover:border-sky-400"
    },
    {
      title: "Global Connection",
      description: "We bridge talent and employers across borders, ensuring seamless international transitions & legal visa clearance.",
      icon: <Globe className="text-teal-400" size={26} />,
      bg: "bg-teal-950/80 border border-teal-500/30",
      accent: "hover:border-teal-400"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#064266] via-[#043350] to-navy-950 text-white relative overflow-hidden border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-3 block">
            The ElKairon Difference
          </span>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white italic drop-shadow-md">
            More Than Recruitment. A True International Partnership.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              whileHover={{ 
                scale: 1.04, 
                y: -6,
                boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.5)"
              }}
              className={`bg-navy-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/15 shadow-xl transition-all duration-300 ${feature.accent} group cursor-default`}
            >
              <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-2.5 group-hover:text-gold-300 transition-colors">
                {feature.title}
              </h4>
              <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
