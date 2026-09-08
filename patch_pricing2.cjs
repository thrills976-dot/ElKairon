const fs = require('fs');

const content = `
import { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Info, CheckCircle, XCircle, AlertTriangle, Scale, Target, FileText, Briefcase, FileCheck, Plane } from 'lucide-react';

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
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-400/40 text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck size={14} />
              <span>Work Permit Application Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">
              Transparent, <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Milestone-Based</span> Payments
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Relocating for work requires a significant financial commitment. To give you maximum security, you do not pay our full consultancy fee upfront. You only pay in stages, as your application progresses.
            </p>
          </div>

          {/* Top Section: Why Us & Table */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Why ElKairon & Cost Reality */}
            <div className="xl:col-span-4 flex flex-col gap-6">
              <div className="bg-navy-900/60 border border-gold-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Scale className="text-gold-400 shrink-0" size={20}/> 
                  The Reality of Our Pricing
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  International recruitment is highly regulated. Our fees reflect the real cost of legal compliance, verifying legitimate employers, secure data management, and dedicated case consultancy.
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We do not sell cheap "guarantees"—we provide professional representation that takes hundreds of hours of administrative labor per candidate.
                </p>
              </div>

              <div className="bg-navy-900/60 border border-teal-500/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Target className="text-teal-400 shrink-0" size={20}/> 
                  Why Choose ElKairon?
                </h3>
                <ul className="space-y-4 text-sm text-gray-300">
                  <li>
                    <strong className="text-white block mb-0.5">Transparency Over Promises</strong>
                    You are protected by our milestone structure. You only pay for the next stage when documented progress happens.
                  </li>
                  <li>
                    <strong className="text-white block mb-0.5">Verified Employers Only</strong>
                    We do not invent fake jobs. We work strictly with real employers within legal immigration frameworks.
                  </li>
                  <li>
                    <strong className="text-white block mb-0.5">Honesty</strong>
                    We tell you the truth about your chances, even if it is hard to hear, rather than selling false hope.
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Pricing Table */}
            <div className="xl:col-span-8">
              <div className="bg-white rounded-2xl p-6 shadow-2xl border-t-4 border-teal-500 overflow-x-auto text-navy-950">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 font-bold">
                    <Info size={16} className="text-teal-600 shrink-0" />
                    <span>Payment Milestone Breakdown</span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                    Administrative complexity varies by destination
                  </span>
                </div>
                <table className="w-full text-left border-collapse min-w-[550px]">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-200">
                      <th className="py-3 px-3 font-display font-bold text-navy-950 text-xs sm:text-sm">Country</th>
                      <th className="py-3 px-3 font-display font-bold text-navy-950 text-xs sm:text-sm text-right border-r border-gray-200">Total Cost</th>
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
                          <td className="py-2.5 px-3 font-bold text-xs sm:text-sm">
                            {row.country}
                          </td>
                          <td className="py-2.5 px-3 font-extrabold text-xs sm:text-sm text-gold-600 text-right border-r border-gray-100 bg-gray-50/30">
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

          {/* Detailed Breakdown of the 4 Stages */}
          <div className="pt-8 border-t border-white/10">
            <h3 className="text-3xl font-display font-bold text-white mb-2 text-center">The Milestone Journey Explained</h3>
            <p className="text-gray-400 text-center mb-10 text-sm max-w-2xl mx-auto">
              Exactly what happens at each stage of the process, and what you are paying for when a milestone is reached.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              
              {/* Stage 1 */}
              <div className="bg-navy-900/40 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-gold-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gold-950/50 flex items-center justify-center border border-gold-500/30 mb-4 text-gold-400 shrink-0">
                  <FileText size={22} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">10% — File Initiation</h4>
                <div className="h-0.5 w-8 bg-gold-500/50 mb-5"></div>
                <div className="space-y-4 text-sm flex-grow">
                  <div>
                    <strong className="text-gray-200 block mb-1">What is done:</strong>
                    <p className="text-gray-400 leading-relaxed">Document verification, formatting your profile to destination standards, and initial compliance checks.</p>
                  </div>
                  <div>
                    <strong className="text-gray-200 block mb-1">How it works:</strong>
                    <p className="text-gray-400 leading-relaxed">You upload your documents to our secure portal. Our consultants manually audit your credentials to ensure you meet the strict criteria required before presenting you to hiring partners.</p>
                  </div>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="bg-navy-900/40 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-teal-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-teal-950/50 flex items-center justify-center border border-teal-500/30 mb-4 text-teal-400 shrink-0">
                  <Briefcase size={22} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">20% — Offer Stage</h4>
                <div className="h-0.5 w-8 bg-teal-500/50 mb-5"></div>
                <div className="space-y-4 text-sm flex-grow">
                  <div>
                    <strong className="text-gray-200 block mb-1">What is done:</strong>
                    <p className="text-gray-400 leading-relaxed">Matching your profile with verified employers, arranging interviews, and contract negotiation.</p>
                  </div>
                  <div>
                    <strong className="text-gray-200 block mb-1">How it works:</strong>
                    <p className="text-gray-400 leading-relaxed">We advocate for you within our network. This payment is only triggered when you successfully pass employer interviews and receive an official, signed employment contract.</p>
                  </div>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="bg-navy-900/40 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-950/50 flex items-center justify-center border border-blue-500/30 mb-4 text-blue-400 shrink-0">
                  <FileCheck size={22} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">30% — Work Permit</h4>
                <div className="h-0.5 w-8 bg-blue-500/50 mb-5"></div>
                <div className="space-y-4 text-sm flex-grow">
                  <div>
                    <strong className="text-gray-200 block mb-1">What is done:</strong>
                    <p className="text-gray-400 leading-relaxed">Coordination of legal employer sponsorship and submission of work permit applications to the destination government.</p>
                  </div>
                  <div>
                    <strong className="text-gray-200 block mb-1">How it works:</strong>
                    <p className="text-gray-400 leading-relaxed">Our team and legal partners assist your new employer in filing the exact paperwork required. This is due upon official proof of application progress.</p>
                  </div>
                </div>
              </div>

              {/* Stage 4 */}
              <div className="bg-navy-900/40 border border-white/10 rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-purple-500/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-950/50 flex items-center justify-center border border-purple-500/30 mb-4 text-purple-400 shrink-0">
                  <Plane size={22} />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">40% — Visa Finalization</h4>
                <div className="h-0.5 w-8 bg-purple-500/50 mb-5"></div>
                <div className="space-y-4 text-sm flex-grow">
                  <div>
                    <strong className="text-gray-200 block mb-1">What is done:</strong>
                    <p className="text-gray-400 leading-relaxed">Embassy appointment preparation, final document checklists, and pre-departure briefings.</p>
                  </div>
                  <div>
                    <strong className="text-gray-200 block mb-1">How it works:</strong>
                    <p className="text-gray-400 leading-relaxed">We guide you through the final embassy requirements. You only pay this final milestone once the government has officially issued your visa.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Inclusions and Exclusions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/10">
            <div className="bg-navy-900/60 border border-white/5 rounded-2xl p-6 sm:p-8">
              <h4 className="flex items-center gap-2 text-white font-bold mb-4 text-lg">
                <CheckCircle className="text-teal-400" size={24} />
                What is Included in Our Fee?
              </h4>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span>ElKairon recruitment matching and employer coordination.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span>Comprehensive file tracking and administrative management.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span>Dedicated consultancy support throughout the entire application process.</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-navy-900/60 border border-white/5 rounded-2xl p-6 sm:p-8">
              <h4 className="flex items-center gap-2 text-white font-bold mb-4 text-lg">
                <XCircle className="text-rose-400" size={24} />
                What is NOT Included?
              </h4>
              <p className="text-xs text-gray-400 mb-4 font-medium italic">
                Our consultancy fee does not cover mandatory third-party or government charges, including but not limited to:
              </p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>Government visa application and embassy processing fees.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>Medical examinations, biometrics, or translation services.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>Airline flights, transportation, and accommodation.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="bg-navy-800/80 border border-gold-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <div className="w-12 h-12 rounded-full bg-gold-950/50 flex items-center justify-center shrink-0 border border-gold-500/30">
              <AlertTriangle className="text-gold-400" size={24} />
            </div>
            <div className="text-sm">
              <strong className="text-white block mb-2 text-base">Important Notice on Visas and Decisions</strong>
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
console.log("Pricing.tsx updated successfully with deep explanations.");
