import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function FinalCTA({ onNavigate }: { onNavigate: (v: 'home' | 'candidate-portal' | 'employer-portal') => void }) {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0DA2E7] to-[#065A8C] border-t-4 border-gold-500 relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center opacity-10" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white italic mb-6">
          Your next opportunity could be across the border.
        </h2>
        <p className="text-xl text-teal-400 mb-12 font-medium">
          Let's make the connection.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => onNavigate('candidate-portal')}
            className="w-full sm:w-auto bg-teal-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-teal-500 transition-colors shadow-lg flex items-center justify-center gap-2 group"
          >
            Start Your Journey <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => onNavigate('employer-portal')}
            className="w-full sm:w-auto bg-transparent border-2 border-gold-500 text-gold-500 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-gold-500 hover:text-[#065A8C] transition-colors flex items-center justify-center gap-2"
          >
            Hire Global Talent
          </button>
        </div>
      </div>
    </section>
  );
}
