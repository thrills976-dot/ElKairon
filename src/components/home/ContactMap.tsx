import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Building, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export function ContactMap() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please complete all contact form fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      toast.success('Thank you! Your message has been routed to our global desk.');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setIsSent(false), 5000);
    }, 800);
  };

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
          className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl"
        >
          <h3 className="text-2xl font-bold font-display italic mb-6">Send us a message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name" 
                required
                className="w-full bg-navy-900/70 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500 transition-colors" 
              />
            </div>
            <div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email" 
                required
                className="w-full bg-navy-900/70 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500 transition-colors" 
              />
            </div>
            <div>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you with global recruitment or relocation?" 
                rows={4} 
                required
                className="w-full bg-navy-900/70 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-teal-500 resize-none transition-colors"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-extrabold uppercase tracking-widest text-xs py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-navy-900 border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : isSent ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Message Dispatched</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
