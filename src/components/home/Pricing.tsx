import { motion } from 'motion/react';
import { ShieldCheck, Info } from 'lucide-react';
import { useState } from 'react';

const pricingData = [
  { country: "NETHERLANDS", cost: 3000 },
  { country: "FINLAND", cost: 3120 },
  { country: "LUXEMBOURG", cost: 2760 },
  { country: "NORWAY", cost: 2760 },
  { country: "IRELAND", cost: 3000 },
  { country: "ROMANIA", cost: 2400 },
  { country: "CANADA", cost: 8400 },
  { country: "ITALY", cost: 2880 },
  { country: "GERMANY", cost: 2880 },
  { country: "AUSTRALIA", cost: 8400 },
  { country: "NEW ZEALAND", cost: 8400 }
];

const benefits = [
  "Accommodation",
  "Transportation",
  "Medical Insurance",
  "One-time meal during duty",
  "TRC (Temporary Residence Card) within 3 months",
  "Airline Ticket",
  "Paid Annual Leave",
  "Overtime (OT) as per company policy"
];

export function Pricing() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Benefits Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-3">Your Package</h2>
          <h3 className="font-display text-4xl font-bold italic text-navy-900 mb-6">Guaranteed Benefits Upon Success</h3>
          <p className="text-gray-600 text-lg mb-8">
            If your application is successful, the company will be providing the following benefits with a standard 2-year work permit (processing time 60 to 90 days).
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-navy-800 flex items-center gap-2 shadow-sm"
              >
                <span className="text-teal-500">✅</span> {benefit}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Payment Terms Section */}
        <div className="bg-navy-900 p-8 md:p-12 rounded-2xl shadow-xl border-t-4 border-gold-500 mb-16 relative">
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 relative z-10">
            <div>
              <h4 className="text-white font-display text-2xl italic mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                Transparency Over Promises
                <span className="text-gold-500 text-[10px] uppercase font-body tracking-widest not-italic">2-Year Work Permits</span>
              </h4>
              <p className="text-navy-100 mb-6 leading-relaxed text-sm md:text-base">
                We understand, as a Recruitment Consultancy, that people prefer maximum security, and that's fair. That's exactly why we keep only 10% at the start just to initiate your file and cover basic documentation. This is the minimum commitment required to begin officially.
              </p>
              <p className="text-navy-100 mb-6 leading-relaxed text-sm md:text-base">
                After that, you are not paying blindly. Every next step is linked to real, verifiable progress. Even we don't take 40% upfront, because we want you to feel secure and move step by step with proof.
              </p>
              
              <div className="mt-8 relative pt-4 hidden sm:block">
                <div className="absolute h-0.5 bg-gold-500 w-full top-8 opacity-30"></div>
                <div className="flex justify-between relative z-10">
                  <div className="flex flex-col items-center gap-2 w-1/4">
                    <div className="w-8 h-8 rounded-full bg-gold-500 text-navy-900 font-bold flex items-center justify-center text-xs shadow-[0_0_15px_rgba(212,175,55,0.4)]">10%</div>
                    <span className="text-[9px] text-white text-center font-bold uppercase tracking-widest">Initial File</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-1/4">
                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-xs shadow-[0_0_15px_rgba(13,148,136,0.4)]">20%</div>
                    <span className="text-[9px] text-white text-center font-bold uppercase tracking-widest">Offer Letter</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-1/4">
                    <div className="w-8 h-8 rounded-full bg-navy-700 text-white font-bold flex items-center justify-center text-xs border border-navy-600">30%</div>
                    <span className="text-[9px] text-white text-center font-bold uppercase tracking-widest">Work Permit</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 w-1/4">
                    <div className="w-8 h-8 rounded-full bg-navy-700 text-white font-bold flex items-center justify-center text-xs border border-navy-600">40%</div>
                    <span className="text-[9px] text-white text-center font-bold uppercase tracking-widest">Visa Issued</span>
                  </div>
                </div>
                <p className="text-xs text-gold-500 mt-8 italic text-center font-display">"No fees blind—every payment is linked to real, verifiable progress."</p>
              </div>
            </div>

            {/* Pricing Table - Interactive Calculator */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl border-l-4 border-teal-500 overflow-x-auto text-navy-900">
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-500 font-medium px-4">
                <Info size={16} className="text-teal-600" />
                Payment Milestone Calculator (Hover to calculate)
              </div>
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-4 font-display italic font-bold text-navy-900 text-sm">Countries</th>
                    <th className="py-4 px-4 font-display italic font-bold text-navy-900 text-sm">Total Cost</th>
                    <th className="py-4 px-4 font-bold text-[10px] text-gray-500 tracking-widest uppercase">10% DOCS</th>
                    <th className="py-4 px-4 font-bold text-[10px] text-gray-500 tracking-widest uppercase">20% OFFER</th>
                    <th className="py-4 px-4 font-bold text-[10px] text-gray-500 tracking-widest uppercase">30% PERMIT</th>
                    <th className="py-4 px-4 font-bold text-[10px] text-gray-500 tracking-widest uppercase">40% VISA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pricingData.map((row, idx) => {
                    const isHovered = hoveredIdx === idx;
                    return (
                      <motion.tr 
                        key={idx}
                        onMouseEnter={() => setHoveredIdx(idx)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className={`transition-all duration-300 cursor-pointer ${
                          isHovered ? 'bg-teal-50 border-l-4 border-teal-500 transform scale-[1.01] shadow-sm relative z-10' : 'border-l-4 border-transparent hover:bg-gray-50'
                        }`}
                      >
                        <td className={`py-3 px-4 font-bold text-sm transition-colors ${isHovered ? 'text-teal-700' : 'text-navy-900'}`}>{row.country}</td>
                        <td className="py-3 px-4 font-bold text-sm text-gold-600">${row.cost}</td>
                        <td className={`py-3 px-4 text-sm font-bold transition-colors ${isHovered ? 'text-gold-600' : 'text-gray-400'}`}>
                          {isHovered ? `$${(row.cost * 0.1).toFixed(0)}` : '10%'}
                        </td>
                        <td className={`py-3 px-4 text-sm font-bold transition-colors ${isHovered ? 'text-teal-600' : 'text-gray-400'}`}>
                          {isHovered ? `$${(row.cost * 0.2).toFixed(0)}` : '20%'}
                        </td>
                        <td className={`py-3 px-4 text-sm font-bold transition-colors ${isHovered ? 'text-navy-700' : 'text-gray-400'}`}>
                          {isHovered ? `$${(row.cost * 0.3).toFixed(0)}` : '30%'}
                        </td>
                        <td className={`py-3 px-4 text-sm font-bold transition-colors ${isHovered ? 'text-navy-900' : 'text-gray-400'}`}>
                          {isHovered ? `$${(row.cost * 0.4).toFixed(0)}` : '40%'}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
