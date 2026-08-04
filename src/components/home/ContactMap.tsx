import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Building } from 'lucide-react';

export function ContactMap() {
  return (
    <div className="py-24 bg-navy-900 text-white relative overflow-hidden" id="contact">
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1000 500" className="w-full h-full object-cover">
          <path d="M450,250 Q550,150 650,200 T750,100" fill="none" stroke="#0DA2E7" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M450,250 Q550,300 650,250 T800,200" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* UAE Node */}
          <circle cx="650" cy="200" r="6" fill="#0DA2E7" />
          {/* EU Node */}
          <circle cx="450" cy="150" r="8" fill="#D4AF37" />
          {/* Africa Node */}
          <circle cx="450" cy="300" r="8" fill="#0DA2E7" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-gold-400 text-xs font-bold tracking-widest uppercase border border-white/20 mb-6">
            <MapPin size={16} /> Global Presence
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold italic mb-6">
            Connecting Continents
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-md">
            We bridge the gap between emerging talent in Africa & the UAE and top opportunities across Europe.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-teal-400 shrink-0">
                <Building size={20} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Global Headquarters</h4>
                <p className="text-sm text-white/60">Dubai, UAE • Johannesburg, SA • Berlin, DE</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gold-400 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="font-bold mb-1">Email Us</h4>
                <p className="text-sm text-white/60">contact@elkaironglobal.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10"
        >
          <h3 className="text-2xl font-bold font-display italic mb-6">Send us a message</h3>
          <form className="space-y-4">
            <div>
              <input type="text" placeholder="Your Name" className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500" />
            </div>
            <div>
              <input type="email" placeholder="Your Email" className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500" />
            </div>
            <div>
              <textarea placeholder="How can we help you?" rows={4} className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500 resize-none"></textarea>
            </div>
            <button type="button" className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold uppercase tracking-widest text-sm py-4 rounded-xl transition-colors">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
