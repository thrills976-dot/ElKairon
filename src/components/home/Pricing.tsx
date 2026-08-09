import { motion } from 'motion/react';
import { ShieldCheck, Info, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import { useState } from 'react';

const pricingData = [
  { country: "NETHERLANDS", cost: 3000, region: "Europe / Schengen", timeline: "60-90 Days" },
  { country: "FINLAND", cost: 3120, region: "Nordic Europe", timeline: "60-90 Days" },
  { country: "LUXEMBOURG", cost: 2760, region: "Western Europe", timeline: "60-90 Days" },
  { country: "NORWAY", cost: 2760, region: "Nordic Europe", timeline: "60-90 Days" },
  { country: "IRELAND", cost: 3000, region: "Critical Skills", timeline: "60-90 Days" },
  { country: "ROMANIA", cost: 2400, region: "Eastern Europe", timeline: "45-60 Days" },
  { country: "CANADA", cost: 8400, region: "North America", timeline: "90-120 Days" },
  { country: "ITALY", cost: 2880, region: "Southern Europe", timeline: "60-90 Days" },
  { country: "GERMANY", cost: 2880, region: "Chancenkarte / FEG", timeline: "60-90 Days" },
  { country: "AUSTRALIA", cost: 8400, region: "Pacific Hub", timeline: "90-120 Days" },
  { country: "NEW ZEALAND", cost: 8400, region: "Pacific Hub", timeline: "90-120 Days" }
];

export function Pricing() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="pricing" className="py-24 bg-white text-navy-950 relative overflow-hidden">
      {/* Background Subtle Geometry */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-navy-50/70 -skew-x-6 translate-x-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Payment Terms Section */}
        <div className="bg-navy-950 p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl border-t-4 border-gold-500 mb-16 relative overflow-hidden text-white">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 relative z-10 items-start">
            
            {/* Left Column: Transparency Philosophy */}
            <div className="xl:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-400/40 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <ShieldCheck size={14} />
                  <span>2-Year Work Permits</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-display font-bold italic text-white mb-6 leading-tight">
                  Transparency <span className="text-gold-400">Over Promises</span>
                </h3>

                <p className="text-gray-300 mb-5 leading-relaxed text-sm sm:text-base">
                  We understand, as a Recruitment Consultancy, that candidates prefer maximum security, and that's fair. That's exactly why we keep only <strong className="text-gold-400 font-bold">10% at the start</strong> just to initiate your file and cover basic documentation. This is the minimum commitment required to begin officially.
                </p>

                <p className="text-gray-300 mb-8 leading-relaxed text-sm sm:text-base">
                  After that, you are not paying blindly. Every next step is linked to <strong className="text-teal-300 font-bold">real, verifiable progress</strong>. Even we don't take 40% upfront, because we want you to feel secure and move step by step with proof.
                </p>
              </div>

              {/* Step Roadmap */}
              <div className="bg-navy-900/90 border border-white/10 rounded-2xl p-6 shadow-inner">
                <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4 flex items-center gap-1.5">
                  <Lock size={14} />
                  <span>Proof-Linked Milestone Schedule</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="bg-navy-950 p-3 rounded-xl border border-gold-500/30 flex flex-col items-center">
                    <span className="text-xs font-bold text-gold-400 mb-1">10%</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Initial File</span>
                  </div>
                  <div className="bg-navy-950 p-3 rounded-xl border border-teal-500/30 flex flex-col items-center">
                    <span className="text-xs font-bold text-teal-400 mb-1">20%</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Offer Letter</span>
                  </div>
                  <div className="bg-navy-950 p-3 rounded-xl border border-white/10 flex flex-col items-center">
                    <span className="text-xs font-bold text-white mb-1">30%</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Work Permit</span>
                  </div>
                  <div className="bg-navy-950 p-3 rounded-xl border border-white/10 flex flex-col items-center">
                    <span className="text-xs font-bold text-white mb-1">40%</span>
                    <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Visa Issued</span>
                  </div>
                </div>

                <p className="text-[11px] text-gold-300 mt-4 italic text-center font-display">
                  "No blind fees — every payment is triggered only upon official documentary proof."
                </p>
              </div>
            </div>

            {/* Right Column: Pricing Table & Milestone Calculator */}
            <div className="xl:col-span-7 bg-white rounded-2xl p-6 shadow-2xl border-l-4 border-teal-500 overflow-x-auto text-navy-950">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-bold">
                  <Info size={16} className="text-teal-600 shrink-0" />
                  <span>Payment Milestone Calculator (Hover to calculate)</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                  Total & Milestones
                </span>
              </div>

              <table className="w-full text-left border-collapse min-w-[550px]">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200">
                    <th className="py-3 px-3.5 font-display font-bold text-navy-950 text-xs sm:text-sm">Country</th>
                    <th className="py-3 px-3.5 font-display font-bold text-navy-950 text-xs sm:text-sm">Total Cost</th>
                    <th className="py-3 px-3 font-bold text-[10px] text-gray-500 tracking-wider uppercase text-center">10% DOCS</th>
                    <th className="py-3 px-3 font-bold text-[10px] text-gray-500 tracking-wider uppercase text-center">20% OFFER</th>
                    <th className="py-3 px-3 font-bold text-[10px] text-gray-500 tracking-wider uppercase text-center">30% PERMIT</th>
                    <th className="py-3 px-3 font-bold text-[10px] text-gray-500 tracking-wider uppercase text-center">40% VISA</th>
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
                        className={`transition-all duration-200 cursor-pointer ${
                          isHovered 
                            ? 'bg-teal-50/90 font-medium text-navy-950 shadow-sm' 
                            : 'hover:bg-gray-50/80 text-navy-900'
                        }`}
                      >
                        <td className="py-2.5 px-3.5 font-bold text-xs sm:text-sm flex items-center gap-1.5">
                          <span className={isHovered ? 'text-teal-700' : 'text-navy-950'}>{row.country}</span>
                        </td>
                        <td className="py-2.5 px-3.5 font-extrabold text-xs sm:text-sm text-gold-600 whitespace-nowrap">
                          ${row.cost.toLocaleString()}
                        </td>
                        <td className={`py-2.5 px-3 text-xs font-bold text-center transition-colors ${isHovered ? 'text-gold-700 bg-gold-50/60 rounded' : 'text-gray-500'}`}>
                          {isHovered ? `$${(row.cost * 0.1).toFixed(0)}` : '10%'}
                        </td>
                        <td className={`py-2.5 px-3 text-xs font-bold text-center transition-colors ${isHovered ? 'text-teal-700 bg-teal-100/60 rounded' : 'text-gray-500'}`}>
                          {isHovered ? `$${(row.cost * 0.2).toFixed(0)}` : '20%'}
                        </td>
                        <td className={`py-2.5 px-3 text-xs font-bold text-center transition-colors ${isHovered ? 'text-navy-900 bg-gray-100/80 rounded' : 'text-gray-500'}`}>
                          {isHovered ? `$${(row.cost * 0.3).toFixed(0)}` : '30%'}
                        </td>
                        <td className={`py-2.5 px-3 text-xs font-bold text-center transition-colors ${isHovered ? 'text-navy-950 bg-gray-200/80 rounded' : 'text-gray-500'}`}>
                          {isHovered ? `$${(row.cost * 0.4).toFixed(0)}` : '40%'}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
                <span>All fees include full CIPA file tracking & visa processing</span>
                <span className="font-bold text-navy-950">Zero Hidden Surcharges</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

