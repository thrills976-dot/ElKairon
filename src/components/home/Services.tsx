import { motion } from 'motion/react';
import { Building2, Users, FileCheck, Stethoscope, HardHat, Coffee, Globe } from 'lucide-react';

const services = [
  {
    title: "Talent Sourcing",
    desc: "Pre-qualified candidate pools across Healthcare, Construction, Hospitality, Logistics, and Skilled Trades.",
    icon: Users,
  },
  {
    title: "Visa & Relocation Support",
    desc: "End-to-end support for work permits, contracts, flights, and government process guidance.",
    icon: FileCheck,
  },
  {
    title: "Cultural Integration",
    desc: "Pre-departure briefings and on-ground assistance to ensure smooth transitions into new environments.",
    icon: Globe,
  }
];

const sectors = [
  { name: "Healthcare", icon: Stethoscope },
  { name: "Construction", icon: HardHat },
  { name: "Hospitality", icon: Coffee },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-3">What We Do</h2>
          <h3 className="font-display italic text-4xl font-bold text-navy-900 mb-6">Comprehensive Recruitment & Relocation</h3>
          <p className="text-gray-600 text-lg">
            We provide seamless end-to-end solutions for both global employers seeking talent and candidates looking for their next career move.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } } }}
              className="bg-white p-8 rounded-2xl border-t-4 border-transparent hover:border-gold-500 shadow-lg transition-all group"
            >
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-navy-900 group-hover:text-gold-500 text-teal-600 transition-colors">
                <service.icon size={28} />
              </div>
              <h4 className="font-display text-xl font-bold italic text-navy-900 mb-3">{service.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 border-t border-gray-200 pt-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="font-display italic text-2xl font-bold text-navy-900 mb-2">Key Sectors We Serve</h4>
              <p className="text-gray-500">Specialized talent pools ready for deployment.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {sectors.map((sector, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white px-5 py-3 rounded-full border border-gray-200 shadow-sm text-navy-900 font-bold uppercase tracking-wider text-[10px]">
                  <sector.icon size={16} className="text-teal-600" />
                  {sector.name}
                </div>
              ))}
              <div className="flex items-center gap-2 bg-navy-900 px-5 py-3 rounded-full border border-navy-800 shadow-sm text-white font-bold uppercase tracking-wider text-[10px]">
                + Logistics & Domestic
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
