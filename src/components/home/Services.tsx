import { motion } from 'motion/react';
import { Building2, Users, FileCheck, Stethoscope, HardHat, Coffee, Globe } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';

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
    <section id="services" className="py-24 bg-navy-900/60 backdrop-blur-md border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-gold-400 font-bold tracking-widest uppercase text-xs mb-3">What We Do</h2>
          <h3 className="font-display italic text-4xl font-bold text-white mb-6">Comprehensive Recruitment & Relocation</h3>
          <p className="text-sky-100 text-lg">
            We provide seamless end-to-end solutions for both global employers seeking talent and candidates looking for their next career move.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <SpringCard key={idx} className="h-full">
              <div className="bg-navy-950/90 p-8 rounded-2xl border-t-4 border-gold-400 hover:border-teal-400 shadow-2xl transition-all h-full flex flex-col justify-between group border border-white/10">
                <div>
                  <div className="w-14 h-14 bg-navy-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-navy-950 text-gold-400 transition-colors">
                    <service.icon size={28} />
                  </div>
                  <h4 className="font-display text-xl font-bold italic text-white mb-3">{service.title}</h4>
                  <p className="text-sky-200 text-sm leading-relaxed">{service.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 text-xs font-bold text-teal-300">
                  Guaranteed Process
                </div>
              </div>
            </SpringCard>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h4 className="font-display italic text-2xl font-bold text-white mb-2">Key Sectors We Serve</h4>
              <p className="text-sky-200">Specialized talent pools ready for deployment.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {sectors.map((sector, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-navy-950 px-5 py-3 rounded-full border border-white/15 shadow-sm text-gold-400 font-bold uppercase tracking-wider text-[10px]">
                  <sector.icon size={16} className="text-teal-400" />
                  {sector.name}
                </div>
              ))}
              <div className="flex items-center gap-2 bg-gold-500 text-navy-950 px-5 py-3 rounded-full border border-gold-400 shadow-sm font-bold uppercase tracking-wider text-[10px]">
                + Logistics & Domestic
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

