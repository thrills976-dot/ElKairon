import { motion } from 'motion/react';
import { Globe2, ShieldCheck, Zap } from 'lucide-react';

export function CredibilityStrip() {
  return (
    <div className="bg-[#044c77] border-b border-[#033b5c] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-8 mb-8">
          <div className="text-sm font-bold tracking-[0.2em] text-gold-500 uppercase flex gap-4 md:gap-8 mb-4 md:mb-0">
            <span>Europe</span>
            <span className="text-white/20">|</span>
            <span>Americas</span>
            <span className="text-white/20">|</span>
            <span>Africa</span>
          </div>
          <div className="text-xs text-gray-200 uppercase tracking-widest text-center md:text-right">
            Carefully matched. Professionally prepared. Globally connected.
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 bg-[#065A8C] rounded-full flex items-center justify-center text-teal-500">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg">Rigorous Screening</h4>
              <p className="text-gray-200 text-sm">Vetted professionals ready to perform</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 bg-[#065A8C] rounded-full flex items-center justify-center text-gold-500">
              <Globe2 size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg">Cross-Border Support</h4>
              <p className="text-gray-200 text-sm">End-to-end relocation assistance</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 bg-[#065A8C] rounded-full flex items-center justify-center text-teal-500">
              <Zap size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg">Rapid Matching</h4>
              <p className="text-gray-200 text-sm">Right talent, at the right moment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
