import { motion } from 'motion/react';
import { PlaneTakeoff, FileCheck, ShieldCheck, FileText } from 'lucide-react';

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
    <section id="visas" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1/3 h-full bg-teal-50 skew-x-12 -translate-x-1/2 opacity-50 z-0" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-6 tracking-tight">
            Global <span className="text-teal-600 italic">Visa Support</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigating immigration can be complex. We provide end-to-end guidance for securing the right visa for your global career transition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visaTypes.map((visa, idx) => {
            const Icon = visa.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl group-hover:bg-teal-100 transition-colors" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-teal-600 text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{visa.title}</h3>
                  <p className="text-gray-600 text-sm mb-6">{visa.description}</p>
                  
                  <ul className="space-y-3">
                    {visa.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-gray-500 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
