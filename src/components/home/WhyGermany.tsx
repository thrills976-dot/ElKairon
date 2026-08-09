import { CheckCircle2, TrendingUp, HeartPulse, GraduationCap, Plane, MapPin } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';

const reasons = [
  { icon: TrendingUp, title: "Strong Economy", desc: "High demand for skilled workers in IT, engineering, healthcare, and business." },
  { icon: HeartPulse, title: "Quality Healthcare", desc: "Mandatory and accessible high-quality healthcare for all residents." },
  { icon: GraduationCap, title: "Education", desc: "Free or very low-cost education at public universities, even for international students." },
  { icon: CheckCircle2, title: "Work-Life Balance", desc: "20–30+ days paid vacation and robust employee protections." },
  { icon: MapPin, title: "Quality of Life", desc: "Clean, safe, organized environment with highly reliable public transport." },
  { icon: Plane, title: "Central Location", desc: "Located centrally in Europe making it easy and affordable to travel to neighboring countries." },
];

export function WhyGermany() {
  return (
    <section id="germany" className="py-24 bg-navy-900/90 text-white relative overflow-hidden border-y border-white/10">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/10 blur-[180px] rounded-full translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/3">
            <div className="sticky top-32">
              <div className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest mb-4 shadow-lg">
                Top Relocation Destination 🇩🇪
              </div>
              <h3 className="font-display italic text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">Why Relocate to Germany?</h3>
              <p className="text-sky-100 text-base leading-relaxed mb-8">
                Currently, our best bet is Germany. The visa success ratio and approval rates are exceptionally strong right now. Plus, family reunification is highly prioritized and very achievable.
              </p>
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason, idx) => (
                <SpringCard key={idx} className="h-full">
                  <div className="bg-navy-950/90 p-6 rounded-2xl border border-white/15 hover:border-gold-400 transition-colors shadow-2xl h-full flex flex-col justify-between group">
                    <div>
                      <reason.icon className="text-teal-400 mb-4 group-hover:text-gold-400 transition-colors" size={28} />
                      <h4 className="font-display text-xl font-bold mb-2 text-white group-hover:text-gold-300 transition-colors">{reason.title}</h4>
                      <p className="text-sm text-sky-200 leading-relaxed">{reason.desc}</p>
                    </div>
                  </div>
                </SpringCard>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

