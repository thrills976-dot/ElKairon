import { motion } from 'motion/react';
import { CheckSquare } from 'lucide-react';

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

export function GuaranteedBenefits() {
  return (
    <div className="py-24 bg-white text-navy-900 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold italic mb-6">
            Guaranteed Benefits<br/>Upon Success
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            If your application is successful, the company will be providing the following benefits with a standard 2-year work permit (processing time 60 to 90 days).
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm rounded-full px-6 py-4"
            >
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center shrink-0">
                <CheckSquare size={16} className="text-white" />
              </div>
              <span className="font-bold text-sm md:text-base text-navy-900">
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
