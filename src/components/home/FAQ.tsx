import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is ElKairon Global Connect?",
    answer: "We are an international recruitment agency connecting talented professionals from Africa and the UAE with top-tier employers in Europe and other global destinations."
  },
  {
    question: "How long does the recruitment process take?",
    answer: "The timeline varies by country and employer, but typically the standard 2-year work permit processing time is between 60 to 90 days after a successful job offer."
  },
  {
    question: "What are the requirements for candidates?",
    answer: "Candidates must have a valid passport, relevant professional experience, and the necessary educational qualifications or certifications for their specific industry."
  },
  {
    question: "Do you assist with visas and work permits?",
    answer: "Yes, we provide end-to-end relocation assistance, including processing visas, work permits, and guiding you through temporary residence card applications."
  },
  {
    question: "What is the payment schedule for fees?",
    answer: "Our fees are transparent and tied to milestones: 10% with document processing, 20% after securing an offer letter, 30% after work permit approval, and 40% after the visa is stamped."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-24 bg-gray-50 text-navy-900 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold italic mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">
            Find answers to common queries about our process and services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-navy-900">{faq.question}</span>
                <ChevronDown 
                  className={`text-teal-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  size={20}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
