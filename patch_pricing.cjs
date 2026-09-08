const fs = require('fs');
const content = `
import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Info, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { BlurImage } from '../common/BlurImage';

const pricingData = [
  { country: 'NETHERLANDS', cost: 3000 },
  { country: 'FINLAND', cost: 3120 },
  { country: 'LUXEMBOURG', cost: 2760 },
  { country: 'NORWAY', cost: 2760 },
  { country: 'IRELAND', cost: 3000 },
  { country: 'ROMANIA', cost: 2400 },
  { country: 'CANADA', cost: 8400 },
  { country: 'ITALY', cost: 2880 },
  { country: 'GERMANY', cost: 2880 },
  { country: 'AUSTRALIA', cost: 8400 },
  { country: 'NEW ZEALAND', cost: 8400 }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-radial from-teal-900/30 to-transparent blur-3xl opacity-60"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-radial from-gold-900/20 to-transparent blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">
              Transparent, <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Milestone-Based</span> Payments
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We understand that relocating for work requires a significant financial commitment. To give you maximum security, you do not pay our full consultancy fee upfront. You only pay in stages, as your application progresses.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Context */}
            <div className="xl:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-400/40 text-gold-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <ShieldCheck size={14} />
                  <span>Work Permit Application Support</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6 leading-tight">
                  Why We Use Milestone Payments
                </h3>
                <p className="text-gray-300 mb-5 leading-relaxed text-sm sm:text-base">
                  You should never have to pay blindly. Our schedule ensures your payments are tied directly to documented progress in your recruitment and relocation journey.
                </p>
                <p className="text-gray-300 mb-5 leading-relaxed text-sm sm:text-base">
                  We keep only <strong className="text-gold-400 font-bold">10% at the start</strong> to open your case, initiate your file, and process basic documentation. After that, payments are triggered only when official proof is provided.
                </p>
              </div>

              {/* Step Roadmap */}
              <div className="bg-navy-900/90 border border-white/10 rounded-2xl p-6 shadow-inner">
                <h4 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-4 flex items-center gap-1.5">
                  <Lock size={14} />
                  <span>What You Pay at Each Stage</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div className="bg-navy-950 p-3 rounded-xl border border-gold-500/30 flex flex-col justify-center">
                    <span className="text-xs font-bold text-gold-400 mb-1">10% — File Initiation</span>
                    <span className="text-[10px] text-gray-400">Paid to open your file.</span>
                  </div>
                  <div className="bg-navy-950 p-3 rounded-xl border border-teal-500/30 flex flex-col justify-center">
                    <span className="text-xs font-bold text-teal-400 mb-1">20% — Offer Stage</span>
                    <span className="text-[10px] text-gray-400">Due upon proof of an employment offer.</span>
                  </div>
                  <div className="bg-navy-950 p-3 rounded-xl border border-white/10 flex flex-col justify-center">
                    <span className="text-xs font-bold text-white mb-1">30% — Work Permit Stage</span>
                    <span className="text-[10px] text-gray-400">Due upon documented permit progress.</span>
                  </div>
                  <div className="bg-navy-950 p-3 rounded-xl border border-white/10 flex flex-col justify-center">
                    <span className="text-xs font-bold text-white mb-1">40% — Visa Finalization</span>
                    <span className="text-[10px] text-gray-400">Due upon proof of the final visa stage.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pricing Table */}
            <div className="xl:col-span-7 space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-2xl border-l-4 border-teal-500 overflow-x-auto text-navy-950">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-bold">
                    <Info size={16} className="text-teal-600 shrink-0" />
                    <span>Payment Milestone Breakdown</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                    Why Prices Differ: Administrative complexity varies by destination
                  </span>
                </div>
                <table className="w-full text-left border-collapse min-w-[550px]">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-200">
                      <th className="py-3 px-2 font-display font-bold text-navy-950 text-xs sm:text-sm">Country</th>
                      <th className="py-3 px-2 font-display font-bold text-navy-950 text-xs sm:text-sm text-right">Total Cost</th>
                      <th className="py-3 px-2 font-bold text-[10px] text-gray-500 tracking-wider uppercase text-right">10% File</th>
                      <th className="py-3 px-2 font-bold text-[10px] text-gray-500 tracking-wider uppercase text-right">20% Offer</th>
                      <th className="py-3 px-2 font-bold text-[10px] text-gray-500 tracking-wider uppercase text-right">30% Permit</th>
                      <th className="py-3 px-2 font-bold text-[10px] text-gray-500 tracking-wider uppercase text-right">40% Visa</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pricingData.map((row, idx) => {
                      return (
                        <tr key={idx} className="hover:bg-gray-50/80 transition-colors text-navy-900">
                          <td className="py-2.5 px-2 font-bold text-xs sm:text-sm">
                            {row.country}
                          </td>
                          <td className="py-2.5 px-2 font-extrabold text-xs sm:text-sm text-gold-600 text-right">
                            \${row.cost.toLocaleString()}
                          </td>
                          <td className="py-2.5 px-2 text-xs font-bold text-right text-gray-600">
                            \${(row.cost * 0.1).toFixed(0)}
                          </td>
                          <td className="py-2.5 px-2 text-xs font-bold text-right text-teal-700">
                            \${(row.cost * 0.2).toFixed(0)}
                          </td>
                          <td className="py-2.5 px-2 text-xs font-bold text-right text-navy-800">
                            \${(row.cost * 0.3).toFixed(0)}
                          </td>
                          <td className="py-2.5 px-2 text-xs font-bold text-right text-navy-950">
                            \${(row.cost * 0.4).toFixed(0)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
            </div>
          </div>

          {/* Inclusions and Exclusions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-navy-900/60 border border-white/5 rounded-2xl p-6 sm:p-8">
              <h4 className="flex items-center gap-2 text-white font-bold mb-4">
                <CheckCircle className="text-teal-400" size={20} />
                What is Included?
              </h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span>ElKairon recruitment matching and employer coordination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span>Comprehensive CIPA file tracking.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span>Dedicated consultancy and administrative support for your application.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-navy-900/60 border border-white/5 rounded-2xl p-6 sm:p-8">
              <h4 className="flex items-center gap-2 text-white font-bold mb-4">
                <XCircle className="text-rose-400" size={20} />
                What is NOT Included?
              </h4>
              <p className="text-xs text-gray-400 mb-4 font-medium italic">
                Our consultancy fee does not cover mandatory third-party or government charges, including but not limited to:
              </p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>Government visa application and embassy fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>Medical examinations, biometrics, or translation services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>Airline flights, transportation, and accommodation.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-navy-800/80 border border-gold-500/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-6">
            <div className="w-10 h-10 rounded-full bg-gold-950/50 flex items-center justify-center shrink-0 border border-gold-500/30">
              <AlertTriangle className="text-gold-400" size={20} />
            </div>
            <div className="text-sm">
              <strong className="text-white block mb-1">Important Notice on Visas and Decisions</strong>
              <p className="text-gray-300 leading-relaxed">
                ElKairon provides expert consultancy to support your application. However, we do not issue visas or work permits. All final approvals, processing times, and permit durations are determined exclusively by the employers and government immigration authorities. Paying a consultancy milestone does not legally guarantee the approval of the next stage.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('src/components/home/Pricing.tsx', content);
console.log("Pricing.tsx updated successfully for maximum transparency.");
