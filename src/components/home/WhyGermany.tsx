import { motion } from 'motion/react';
import { CheckCircle2, TrendingUp, HeartPulse, GraduationCap, Plane, MapPin } from 'lucide-react';

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
    <section id="germany" className="py-24 bg-teal-600 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-500/50 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="w-full md:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <div className="inline-flex items-center gap-2 bg-white text-teal-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                Best Bet: Germany 🇩🇪
              </div>
              <h3 className="font-display italic text-4xl md:text-5xl font-bold mb-6 text-gold-500">Why Relocate to Germany?</h3>
              <p className="text-teal-50 text-lg leading-relaxed mb-8">
                Currently, our best bet is Germany. The visa success ratio and approval rates are exceptionally strong right now. Plus, family reunification is highly prioritized and very achievable.
              </p>
            </motion.div>
          </div>

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-teal-700/50 backdrop-blur-sm p-6 rounded-2xl border border-teal-500 hover:border-gold-500/50 transition-colors"
                >
                  <reason.icon className="text-gold-400 mb-4" size={28} />
                  <h4 className="font-display text-xl font-bold mb-2">{reason.title}</h4>
                  <p className="text-sm text-teal-100 leading-relaxed">{reason.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
