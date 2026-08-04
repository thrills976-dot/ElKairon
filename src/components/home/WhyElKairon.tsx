import { motion } from 'motion/react';
import { Target, Lightbulb, Clock, Globe } from 'lucide-react';

export function WhyElKairon() {
  const features = [
    {
      title: "Right Talent",
      description: "We focus on meaningful matches, not volume. Every candidate is rigorously screened.",
      icon: <Target className="text-teal-200" size={24} />,
      bg: "bg-teal-50",
      border: "hover:border-teal-200"
    },
    {
      title: "Right Opportunity",
      description: "We connect candidates with opportunities aligned to their skills and long-term ambitions.",
      icon: <Lightbulb className="text-gold-600" size={24} />,
      bg: "bg-gold-50",
      border: "hover:border-gold-200"
    },
    {
      title: "Right Timing",
      description: "Because the best opportunity is often the one that arrives at the exact right moment.",
      icon: <Clock className="text-navy-600" size={24} />,
      bg: "bg-navy-50",
      border: "hover:border-navy-200"
    },
    {
      title: "Global Connection",
      description: "We bridge talent and employers across borders, ensuring seamless international transitions.",
      icon: <Globe className="text-teal-600" size={24} />,
      bg: "bg-teal-50",
      border: "hover:border-teal-200"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#0DA2E7] to-[#065A8C]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-teal-600 uppercase mb-4">The ElKairon Difference</h2>
          <h3 className="text-4xl font-display font-bold text-white italic">
            More than recruitment. A true international partnership.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-sm transition-all duration-300 ${feature.border}`}
            >
              <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{feature.title}</h4>
              <p className="text-sm text-gray-100 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
