import { PlaneTakeoff, FileCheck, ShieldCheck, FileText } from 'lucide-react';
import { SpringCard } from '../common/SpringCard';

export function Visas() {
  const visaTypes = [
    {
      title: "EU Blue Card",
      description: "Fast-track work and residence permit for highly skilled non-EU citizens.",
      icon: ShieldCheck,
      details: ["University degree required", "Binding job offer", "Salary threshold applies"]
    },
    {
      title: "UAE Employment Visa",
      description: "Standard work visa sponsored by your employer in the UAE.",
      icon: FileCheck,
      details: ["Employer sponsored", "Medical fitness test", "Emirates ID processing"]
    },
    {
      title: "Job Seeker Visa",
      description: "Allows skilled professionals to enter countries like Germany to search for employment.",
      icon: PlaneTakeoff,
      details: ["Valid for 6 months", "Proof of funds required", "Degree recognition needed"]
    },
    {
      title: "Skilled Worker Visa (UK/Ireland)",
      description: "For professionals with a confirmed job offer from an approved employer.",
      icon: FileText,
      details: ["Certificate of sponsorship", "English proficiency", "Minimum salary threshold"]
    }
  ];

  return (
    <section id="visas" className="py-24 bg-navy-950/80 border-y border-white/10 relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-teal-500/5 skew-x-12 -translate-x-1/2 blur-2xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Global <span className="text-gold-400 italic">Visa Support</span>
          </h2>
          <p className="text-lg text-sky-100 max-w-2xl mx-auto">
            Navigating immigration can be complex. We provide end-to-end guidance for securing the right visa for your global career transition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visaTypes.map((visa, idx) => {
            const Icon = visa.icon;
            return (
              <SpringCard key={idx} className="h-full">
                <div className="bg-navy-900/90 border border-white/15 rounded-2xl p-8 shadow-2xl hover:border-teal-400/80 transition-all duration-300 relative overflow-hidden group h-full flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full blur-3xl group-hover:bg-gold-400/20 transition-colors" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-teal-500 text-navy-950 rounded-xl flex items-center justify-center mb-6 shadow-md font-bold group-hover:bg-gold-400 transition-colors">
                      <Icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">{visa.title}</h3>
                    <p className="text-sky-200 text-sm mb-6">{visa.description}</p>
                    
                    <ul className="space-y-3 pt-4 border-t border-white/10">
                      {visa.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2 text-xs text-sky-100 font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-1 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SpringCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

