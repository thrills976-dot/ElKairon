import { motion } from 'motion/react';
import { CreditCard, FileCheck, Plane, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

const feeData = [
  { country: 'NETHERLANDS', cost: '3000$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'FINLAND', cost: '3120$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'LUXEMBOURG', cost: '2760$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'NORWAY', cost: '2760$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'IRELAND', cost: '3000$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'ROMANIA', cost: '2400$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'CANADA', cost: '8400$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'ITALY', cost: '2880$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'GERMANY', cost: '2880$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'AUSTRALIA', cost: '8400$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
  { country: 'NEW ZEALAND', cost: '8400$', docs: '10%', offer: '20%', permit: '30%', visa: '40%' },
];

export function FeesAndPayment() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0DA2E7] to-[#065A8C] pt-32 pb-24 relative overflow-hidden text-white">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-teal-200 text-xs font-bold tracking-widest uppercase border border-white/20 mb-6">
            <CreditCard size={16} /> Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold italic mb-6">
            Fees and Payment Terms
          </h1>
          <p className="text-lg text-white/80 leading-relaxed">
            The service fees ("Total Fee") and payment schedule will be outlined below. Both parties agree to follow the payment plan as mutually discussed and documented.
          </p>
        </motion.div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          {[
            { title: "With Documents", percent: "10%", icon: <FileCheck />, desc: "Initial document processing" },
            { title: "After Offer Letter", percent: "20%", icon: <CheckCircle2 />, desc: "Job offer secured" },
            { title: "After Work Permit", percent: "30%", icon: <ShieldCheck />, desc: "Permit approved" },
            { title: "After Visa", percent: "40%", icon: <Plane />, desc: "Visa stamped and ready" }
          ].map((milestone, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center shadow-lg"
            >
              <div className="w-12 h-12 mx-auto bg-white/20 rounded-full flex items-center justify-center text-teal-300 mb-4">
                {milestone.icon}
              </div>
              <div className="text-3xl font-display font-bold text-gold-400 mb-1">{milestone.percent}</div>
              <h3 className="font-bold text-sm uppercase tracking-wider mb-2">{milestone.title}</h3>
              <p className="text-xs text-white/70">{milestone.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Pricing Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy-900/40 text-xs uppercase tracking-widest text-gold-400">
                  <th className="p-6 border-b border-white/10 font-bold w-1/3">Countries</th>
                  <th className="p-6 border-b border-white/10 font-bold text-center">Total Cost</th>
                  <th className="p-6 border-b border-white/10 font-bold text-center whitespace-nowrap">With Documents</th>
                  <th className="p-6 border-b border-white/10 font-bold text-center whitespace-nowrap">After Offer Letter</th>
                  <th className="p-6 border-b border-white/10 font-bold text-center whitespace-nowrap">After Work Permit</th>
                  <th className="p-6 border-b border-white/10 font-bold text-center whitespace-nowrap">After Visa</th>
                </tr>
              </thead>
              <tbody>
                {feeData.map((row, idx) => (
                  <motion.tr 
                    key={row.country}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-6 font-bold text-sm tracking-widest">{row.country}</td>
                    <td className="p-6 text-center font-bold text-teal-300 bg-white/5 group-hover:bg-transparent transition-colors">{row.cost}</td>
                    <td className="p-6 text-center text-sm font-medium text-white/80">{row.docs}</td>
                    <td className="p-6 text-center text-sm font-medium text-white/80">{row.offer}</td>
                    <td className="p-6 text-center text-sm font-medium text-white/80">{row.permit}</td>
                    <td className="p-6 text-center text-sm font-medium text-white/80">{row.visa}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex items-start gap-4 bg-navy-900/30 p-6 rounded-2xl border border-white/10 max-w-3xl mx-auto"
        >
          <HelpCircle className="text-gold-400 shrink-0 mt-1" />
          <p className="text-sm text-white/80 leading-relaxed">
            <strong>Please Note:</strong> The payment schedule ensures that your financial commitment is tied directly to the progress of your application. The initial 10% covers document verification and administrative processing. Subsequent payments are only required upon successful completion of each major milestone.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
