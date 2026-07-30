import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is the typical processing time for a work permit?",
    answer: "The standard processing time for most European and UAE work permits is between 60 to 90 days from the moment your initial file is submitted and the 10% commitment fee is processed."
  },
  {
    question: "Do I need to pay the entire fee upfront?",
    answer: "No, you do not pay blindly. We require a 10% initial commitment to start the file and cover basic documentation. The rest is divided into milestones: 20% on Offer Letter, 30% on Work Permit approval, and the final 40% when your Visa is issued."
  },
  {
    question: "Which countries do you place candidates in?",
    answer: "We primarily place skilled talent in Germany, the UAE, the UK, and other select European destinations across Healthcare, Construction, Hospitality, and Logistics sectors."
  },
  {
    question: "Are flights and accommodation included?",
    answer: "This depends entirely on the employer's package. Many of our premium healthcare and hospitality partners offer flight tickets and 1-3 months of initial accommodation, but it is evaluated on a case-by-case basis."
  },
  {
    question: "What happens if my visa is denied?",
    answer: "If your visa is denied due to an error on our part or the employer's, the milestone payments (excluding the non-refundable 10% admin fee) are protected. However, if denial is due to fraudulent documents provided by the candidate, no refunds are issued."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h2 className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-3">Questions & Answers</h2>
          <h3 className="font-display text-4xl font-bold italic text-navy-900 mb-6">Frequently Asked Questions</h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find quick answers to common queries about our recruitment process, relocation timelines, and payment structures.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'border-teal-500 bg-teal-50/30' : 'border-gray-200 bg-white hover:border-teal-300'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold text-lg pr-8 transition-colors ${isOpen ? 'text-teal-700' : 'text-navy-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-teal-100/50 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Still have questions? <a href="#contact" className="text-teal-600 font-bold hover:underline">Chat with our Assistant</a>
          </p>
        </div>

      </div>
    </section>
  );
}
