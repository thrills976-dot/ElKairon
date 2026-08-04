import { motion } from 'motion/react';
import { Quote, ArrowRight } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      text: "ElKairon helped me understand the opportunity, prepare for the process and ultimately take the next step in my international career.",
      author: "Kwame D.",
      role: "Logistics Coordinator",
      journey: "FROM GHANA → GERMANY"
    },
    {
      text: "The support I received during my relocation was exceptional. They handled the complexities, allowing me to focus on my new nursing role.",
      author: "Amara O.",
      role: "Registered Nurse",
      journey: "FROM NIGERIA → UK"
    },
    {
      text: "Finding a specialized IT role in the UAE felt daunting until ElKairon matched my skills perfectly with an employer who truly valued my experience.",
      author: "Zanele M.",
      role: "IT Support Specialist",
      journey: "FROM SOUTH AFRICA → UAE"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#044c77] to-[#065A8C] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-sm font-bold tracking-widest text-teal-300 uppercase mb-4">Success Stories</h2>
          <h3 className="text-4xl font-display font-bold text-white italic">
            Real Careers. Real Crossings.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20 shadow-sm relative"
            >
              <Quote className="text-gold-200 absolute top-8 right-8" size={48} />
              
              <div className="inline-block px-3 py-1 bg-[#065A8C] text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">
                {testimonial.journey}
              </div>
              
              <p className="text-gray-100 italic leading-relaxed mb-8 relative z-10">
                "{testimonial.text}"
              </p>
              
              <div>
                <h4 className="font-bold text-white">{testimonial.author}</h4>
                <p className="text-sm text-gray-300">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
