import { Search, FileCheck, ShieldCheck, Plane } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';

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
    <section className="py-24 bg-navy-950/90 text-white relative overflow-hidden border-y border-white/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[160px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-3">How It Works</h2>
          <h3 className="text-4xl font-display font-bold italic mb-6 text-white drop-shadow-md">
            From African Potential to Global Opportunity
          </h3>
          <p className="text-sky-100 text-base">
            A structured, transparent process designed to create lasting international connections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <SpringCard key={idx} className="h-full">
              <div className="relative bg-navy-900/80 p-8 rounded-2xl border border-white/15 hover:border-gold-400/80 shadow-2xl transition-all h-full flex flex-col justify-between group overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/10 rounded-full blur-2xl group-hover:bg-gold-400/20 transition-all" />
                
                <div>
                  <div className="relative z-10 bg-navy-950 w-16 h-16 rounded-2xl flex items-center justify-center text-teal-300 mb-6 border border-white/20 shadow-xl group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors">
                    {step.icon}
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gold-400 text-navy-950 rounded-full flex items-center justify-center text-xs font-black shadow-md">
                      {step.num}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white group-hover:text-gold-300 transition-colors">{step.title}</h4>
                  <p className="text-sky-200 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-teal-300">
                  <span>Stage {step.num}</span>
                  <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                </div>
              </div>
            </SpringCard>
          ))}
        </div>
      </div>
    </section>
  );
}

