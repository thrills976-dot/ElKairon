const fs = require('fs');

const content = `import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Info, CheckCircle, XCircle, AlertTriangle, Scale, Target, FileText, Briefcase, FileCheck, Plane, ChevronDown } from 'lucide-react';

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

const faqs = [
  { q: "Do I pay the entire fee upfront?", a: "No. You only pay 10% to start. The remaining fee is divided into stages based on documented progress in your application." },
  { q: "What does the 10% payment cover?", a: "This initial payment corresponds to the documentation and onboarding stage. It covers file initiation, verification of your documents, and formatting your profile to meet destination standards." },
  { q: "What happens at the job-offer milestone?", a: "You pay the 20% milestone only when there is official documentary proof that an employer has made you a formal job offer." },
  { q: "What does the 30% work-permit milestone mean?", a: "This payment is due when there is documented evidence that your work permit application process has progressed with the government authorities." },
  { q: "What does the 40% visa milestone mean?", a: "This is the final payment. It is only due when there is official documentary proof that your visa has been issued by the destination country's embassy." },
  { q: "What does “proof-linked” mean?", a: "It means a milestone payment is only requested when we have genuine, recorded documentation (like a contract or a government receipt) proving that stage has been reached. We don't just arbitrarily change a status." },
  { q: "Does paying the fee guarantee a visa?", a: "No. Paying a consultancy fee does not guarantee a visa. Only the embassy or immigration authorities can make that decision." },
  { q: "Does paying the fee guarantee a work permit?", a: "No. Work permits are granted exclusively by the destination country's government, not by ElKairon." },
  { q: "Does “2-Year Work Permit” mean everyone gets a two-year permit?", a: "No. The duration of your work permit is determined entirely by the immigration authorities based on your specific job contract, eligibility, and country regulations. We provide support for eligible work-permit applications, but cannot guarantee a specific duration." },
  { q: "Are government or third-party fees included?", a: "No. Our fees cover ElKairon's consultancy and file tracking. Government visa application fees, embassy charges, medical exams, biometrics, and airline tickets are not included and must be paid by you directly." },
  { q: "What does “zero hidden surcharges” mean?", a: "It means ElKairon will not add undisclosed, secret consultancy charges to our listed service fee. You will only pay the listed milestone amounts for our services. However, mandatory third-party government fees are separate." },
  { q: "What happens if a milestone is not reached?", a: "If a specific milestone (like a job offer) is not reached, you do not pay for that milestone or any future milestones." },
  { q: "What evidence is associated with a milestone?", a: "Evidence may include uploaded identity documents, signed employment contracts, government application receipts, or stamped visa decisions recorded in your case file." },
  { q: "Who actually makes the final immigration decision?", a: "The destination country's government immigration authorities and embassies make all final, legal decisions regarding visas and work permits." }
];

export function Pricing() {
  const [selectedCountryIdx, setSelectedCountryIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const currentCountry = pricingData[selectedCountryIdx];
  const total = currentCountry.cost;
  
  const m1 = total * 0.1;
  const m2 = total * 0.2;
  const m3 = total * 0.3;
  const m4 = total * 0.4;

  return (
    <section id="pricing" className="py-24 bg-navy-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-radial from-teal-900/30 to-transparent blur-3xl opacity-60"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-radial from-gold-900/20 to-transparent blur-3xl opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-400/40 text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">
              <ShieldCheck size={14} />
              <span>Work Permit Application Support</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-white">
              Transparency <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Over Promises</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We divide your total consultancy service fee into four transparent, proof-linked milestones. You do not pay 100% upfront. You only pay for the next stage when documented evidence shows that stage has been reached.
            </p>
          </div>

          {/* Interactive Calculator */}
          <div className="bg-navy-900/40 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
              <div className="w-full md:w-auto">
                <label className="block text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">Select Destination Country</label>
                <div className="relative">
                  <select 
                    className="appearance-none bg-navy-950 border border-teal-500/30 text-white font-display text-xl sm:text-2xl font-bold py-3 pl-4 pr-12 rounded-xl w-full focus:outline-none focus:border-teal-400 transition-colors cursor-pointer"
                    value={selectedCountryIdx}
                    onChange={(e) => setSelectedCountryIdx(Number(e.target.value))}
                  >
                    {pricingData.map((data, idx) => (
                      <option key={data.country} value={idx}>{data.country}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-400 pointer-events-none" size={24} />
                </div>
              </div>
              
              <div className="text-center md:text-right bg-teal-950/30 border border-teal-500/20 rounded-2xl p-4 md:p-6 w-full md:w-auto">
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Total Program Fee</div>
                <div className="text-4xl md:text-5xl font-extrabold text-teal-300">
                  \${total.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* 10% */}
              <div className="bg-navy-950 border border-gold-500/20 rounded-2xl p-5 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gold-500/50"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-950/50 px-2 py-1 rounded">10%</span>
                  <FileText className="text-gold-500/50" size={24} />
                </div>
                <div className="text-2xl font-extrabold text-white mb-1">\${m1.toLocaleString()}</div>
                <h4 className="text-base font-bold text-gray-200 mb-3">Documentation</h4>
                <p className="text-xs text-gray-400 flex-grow mb-4">
                  This payment corresponds to the onboarding stage, initiating your file and formatting your profile.
                </p>
                <div className="bg-navy-900 p-3 rounded-xl border border-white/5">
                  <strong className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Evidence Required:</strong>
                  <span className="text-xs text-gray-300">Uploaded identification and verified profile data in your case record.</span>
                </div>
              </div>

              {/* 20% */}
              <div className="bg-navy-950 border border-teal-500/20 rounded-2xl p-5 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-teal-500/50"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-950/50 px-2 py-1 rounded">20%</span>
                  <Briefcase className="text-teal-500/50" size={24} />
                </div>
                <div className="text-2xl font-extrabold text-white mb-1">\${m2.toLocaleString()}</div>
                <h4 className="text-base font-bold text-gray-200 mb-3">Job Offer</h4>
                <p className="text-xs text-gray-400 flex-grow mb-4">
                  This payment corresponds to successfully matching with an employer and receiving an offer.
                </p>
                <div className="bg-navy-900 p-3 rounded-xl border border-white/5">
                  <strong className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Evidence Required:</strong>
                  <span className="text-xs text-gray-300">An official, signed employment contract from a verified employer.</span>
                </div>
              </div>

              {/* 30% */}
              <div className="bg-navy-950 border border-blue-500/20 rounded-2xl p-5 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/50 px-2 py-1 rounded">30%</span>
                  <FileCheck className="text-blue-500/50" size={24} />
                </div>
                <div className="text-2xl font-extrabold text-white mb-1">\${m3.toLocaleString()}</div>
                <h4 className="text-base font-bold text-gray-200 mb-3">Work Permit Stage</h4>
                <p className="text-xs text-gray-400 flex-grow mb-4">
                  This payment corresponds to the preparation and submission of your work permit application.
                </p>
                <div className="bg-navy-900 p-3 rounded-xl border border-white/5">
                  <strong className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Evidence Required:</strong>
                  <span className="text-xs text-gray-300">Government application receipts or sponsor documentation.</span>
                </div>
              </div>

              {/* 40% */}
              <div className="bg-navy-950 border border-purple-500/20 rounded-2xl p-5 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/50"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-950/50 px-2 py-1 rounded">40%</span>
                  <Plane className="text-purple-500/50" size={24} />
                </div>
                <div className="text-2xl font-extrabold text-white mb-1">\${m4.toLocaleString()}</div>
                <h4 className="text-base font-bold text-gray-200 mb-3">Visa Issued</h4>
                <p className="text-xs text-gray-400 flex-grow mb-4">
                  This payment corresponds to the finalization of your embassy visa process.
                </p>
                <div className="bg-navy-900 p-3 rounded-xl border border-white/5">
                  <strong className="block text-[10px] uppercase tracking-wider text-gray-500 mb-1">Evidence Required:</strong>
                  <span className="text-xs text-gray-300">A copy of the officially issued visa from the destination embassy.</span>
                </div>
              </div>

            </div>
          </div>

          {/* Clarity & Transparency Warnings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* What this does NOT mean */}
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-6 sm:p-8">
              <h4 className="flex items-center gap-2 text-rose-300 font-bold mb-4 text-lg">
                <AlertTriangle className="text-rose-400" size={24} />
                What Milestone Payments Do NOT Mean
              </h4>
              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                We believe in full transparency. Paying a consultancy fee or reaching a milestone does <strong className="text-white">not</strong> guarantee an outcome. Please understand that milestone payments do not mean:
              </p>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>Guaranteed visa approval.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>Guaranteed work permit approval or a specific 2-year duration.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>Guaranteed immigration decisions.</span>
                </li>
              </ul>
              <div className="mt-5 p-3 bg-rose-950/40 rounded-lg text-xs text-rose-200 border border-rose-500/20">
                Immigration and permit decisions are made exclusively by the relevant government authorities. ElKairon facilitates recruitment, coordination, and tracking, but we are not an immigration authority.
              </div>
            </div>

            {/* Inclusions and Exclusions */}
            <div className="bg-navy-900/60 border border-white/5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h4 className="flex items-center gap-2 text-white font-bold mb-4 text-lg">
                  <CheckCircle className="text-teal-400" size={24} />
                  What is Included in Our Listed Fee?
                </h4>
                <ul className="space-y-3 text-sm text-gray-300 mb-6">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span>ElKairon recruitment matching and employer coordination.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span>Assistance and processing support for CIPA files.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                    <span>"Zero Hidden Surcharges" — meaning we do not add secret ElKairon agency fees to our listed price.</span>
                  </li>
                </ul>
              </div>
              
              <div className="pt-5 border-t border-white/10">
                <h4 className="flex items-center gap-2 text-white font-bold mb-3 text-sm">
                  <XCircle className="text-gray-400" size={16} />
                  What is Separately Payable (Not Included)?
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  The listed fees do not include third-party costs. You must pay separately for: government visa application fees, embassy charges, medical examinations, biometrics, translation services, airline tickets, and accommodation.
                </p>
              </div>
            </div>

          </div>

          {/* Employer Perspective */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-navy-950 shadow-xl border-t-4 border-gold-500">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Briefcase className="text-gold-500" size={24} />
              For Employers: Understanding the Candidate Journey
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed max-w-4xl">
              ElKairon utilizes a candidate-facing, milestone-based fee structure. This ensures candidates only commit financially as they achieve documented stages in your recruitment pipeline. We do not represent ourselves as an immigration authority; rather, we coordinate the administrative tracking between your HR department, the candidate, and the relevant application frameworks. Every milestone recorded on our platform corresponds to verified evidence, giving you confidence in the integrity of the process.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="pt-8 border-t border-white/10">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-display font-bold text-white mb-2">Frequently Asked Questions</h3>
              <p className="text-gray-400 text-sm">Clear answers about fees, timelines, and immigration decisions.</p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-navy-900/40 border border-white/5 rounded-xl overflow-hidden transition-colors hover:bg-navy-900/60">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-bold text-gray-200 text-sm sm:text-base pr-4">{faq.q}</span>
                    <ChevronDown className={\`text-gray-500 transition-transform duration-300 shrink-0 \${openFaq === idx ? 'rotate-180' : ''}\`} size={20} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 pt-1 text-sm text-gray-400 leading-relaxed border-t border-white/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
`

fs.writeFileSync('src/components/home/Pricing.tsx', content);
console.log("Pricing section completely rewritten for legal safety and extreme clarity.");
