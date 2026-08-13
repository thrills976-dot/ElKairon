import { BACKGROUND_IMAGES } from '../../data/imageMap';
import { motion } from 'motion/react';
import { 
  Building, 
  Bus, 
  HeartPulse, 
  Utensils, 
  CreditCard, 
  Plane, 
  CalendarCheck, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { LazyImage } from '../ui/LazyImage';

const benefits = [
  {
    title: "Accommodation",
    desc: "Company-provided or subsidized living quarters vetted for safety, comfort, and proximity to your workplace.",
    icon: Building,
    badge: "100% Covered",
    image: BACKGROUND_IMAGES.accommodationApartment
  },
  {
    title: "Transportation",
    desc: "Daily shuttle service or official transit allowance covering your commute to and from duty.",
    icon: Bus,
    badge: "Daily Transit",
    image: BACKGROUND_IMAGES.transportationBus
  },
  {
    title: "Medical Insurance",
    desc: "Comprehensive health and emergency insurance coverage under official host-nation labor standards.",
    icon: HeartPulse,
    badge: "Full Health",
    image: BACKGROUND_IMAGES.healthcareNursing
  },
  {
    title: "One-time meal during duty",
    desc: "Nutritious daily meal provided during shift hours at company facilities or designated cafeterias.",
    icon: Utensils,
    badge: "Every Shift",
    image: BACKGROUND_IMAGES.cafeteriaMeal
  },
  {
    title: "TRC (Temporary Residence Card) within 3 months",
    desc: "Fast-tracked legal resident status and identity issuance processed in coordination with local immigration authorities.",
    icon: CreditCard,
    badge: "3-Month Timeline",
    image: BACKGROUND_IMAGES.residenceCard
  },
  {
    title: "Airline Ticket",
    desc: "Sponsored air travel from your home country directly to your destination city upon visa approval.",
    icon: Plane,
    badge: "Relocation Flight",
    image: BACKGROUND_IMAGES.airlineFlight
  },
  {
    title: "Paid Annual Leave",
    desc: "Guaranteed yearly paid vacation days plus statutory public holidays as mandated by employment law.",
    icon: CalendarCheck,
    badge: "Statutory Law",
    image: BACKGROUND_IMAGES.paidAnnualLeave
  },
  {
    title: "Overtime (OT) as per company policy",
    desc: "Standard regulated working hours with premium overtime pay rates for any additional hours worked.",
    icon: Clock,
    badge: "Premium Pay",
    image: BACKGROUND_IMAGES.overtimeClock
  }
];

export function GuaranteedBenefits() {
  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-navy-950/80 via-[#041a2e] to-navy-950 text-white relative overflow-hidden border-t border-b border-white/10">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-950/80 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm"
          >
            <ShieldCheck size={14} className="text-teal-400" />
            <span>Your Guaranteed Package</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 tracking-tight"
          >
            Guaranteed Benefits <span className="text-gold-400 italic">Upon Success</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            If your application is successful, the company will be providing the following benefits with a standard 
            <span className="text-gold-300 font-semibold"> 2-year work permit</span> (processing time <span className="text-teal-300 font-semibold">60 to 90 days</span>).
          </motion.p>
        </div>

        {/* 8 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className=" rounded-2xl border border-white/10 hover:border-gold-400/60 transition-all duration-300 shadow-xl flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-gold-400 opacity-60 group-hover:opacity-100 transition-opacity z-20" />
                
                <LazyImage 
                  src={item.image} 
                  alt={item.title} 
                  containerClassName="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent pointer-events-none" />

                <div className="relative z-20 p-6 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-navy-800 border border-white/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-navy-950 transition-colors shadow-inner">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-400 bg-gold-950/60 border border-gold-500/30 px-2.5 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-gold-300 transition-colors flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                      <span>{item.title}</span>
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400 font-medium">
                    <span>Contract Guaranteed</span>
                    <span className="text-teal-400 font-bold">2-Yr Permit</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Verification Summary Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-navy-900 border border-gold-500/40 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-400/50 flex items-center justify-center text-gold-400 shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">Legally Binding Employment Contracts</h4>
              <p className="text-xs text-gray-300">All 8 benefits are codified in your official employer offer letter and verified host-nation labor contract.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider bg-teal-950/80 px-4 py-2 rounded-xl border border-teal-500/40">
              Standard 60–90 Days Processing
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
