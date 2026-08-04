import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      toast.success('Successfully subscribed to updates!');
      
      // Reset after a delay
      setTimeout(() => {
        setStatus('idle');
        setEmail('');
      }, 3000);
    }, 1500);
  };

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900 italic mb-4">
            Stay Ahead of the Curve
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
            Join our network of ambitious professionals and forward-thinking employers. Get the latest global opportunities and recruitment insights delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto relative">
            <div className="relative flex items-center shadow-lg rounded-2xl bg-white border border-gray-100 overflow-hidden">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                disabled={status !== 'idle'}
                className="flex-1 px-6 py-4 text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-transparent disabled:opacity-50"
                required
              />
              <AnimatePresence mode="wait">
                {status === 'idle' && (
                  <motion.button 
                    key="submit"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-navy-900 text-white px-6 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-teal-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Subscribe <Send size={14} />
                  </motion.button>
                )}
                {status === 'loading' && (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-2 top-2 bottom-2 px-6 flex items-center justify-center text-teal-600"
                  >
                    <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-2 top-2 bottom-2 bg-green-500 text-white px-6 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-sm"
                  >
                    Subscribed <CheckCircle size={14} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
          
          <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
