import { motion } from 'motion/react';
import { Search, FileCheck, ShieldCheck, Plane } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "We identify ambitious professionals with the skills and potential global employers need.",
      icon: <Search size={28} />
    },
    {
      num: "02",
      title: "Prepare",
      desc: "We help candidates understand opportunities, requirements and international career expectations.",
      icon: <FileCheck size={28} />
    },
    {
      num: "03",
      title: "Connect",
      desc: "We match talent with employers based on skills, culture and opportunity—not simply availability.",
      icon: <ShieldCheck size={28} />
    },
    {
      num: "04",
      title: "Move Forward",
      desc: "We support the journey toward a successful international career, handling visas and logistics.",
      icon: <Plane size={28} />
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#0DA2E7] to-[#065A8C] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-900/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-900/20 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-widest text-gold-500 uppercase mb-4">How It Works</h2>
          <h3 className="text-4xl font-display font-bold italic mb-6">
            From African Potential to Global Opportunity
          </h3>
          <p className="text-gray-100">
            A structured, transparent process designed to create lasting international connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative"
            >
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-24 w-full h-px border-t-2 border-dashed border-white/20" />
              )}
              <div className="relative z-10 bg-white/10 backdrop-blur-md w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20 shadow-xl">
                {step.icon}
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center text-navy-900 text-xs font-bold">
                  {step.num}
                </div>
              </div>
              <h4 className="text-xl font-bold mb-3">{step.title}</h4>
              <p className="text-gray-100 text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
