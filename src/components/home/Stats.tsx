import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { Users, Globe2, Building2 } from 'lucide-react';

function Counter({ from, to, suffix = "", duration = 2 }: { from: number, to: number, suffix?: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(from, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.5
  });
  
  const display = useTransform(spring, (current) => Math.round(current));
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (inView) {
      spring.set(to);
    }
  }, [inView, spring, to]);

  useEffect(() => {
    const unsubscribe = display.on("change", (v) => {
      if (v === to) {
        setIsDone(true);
      }
    });
    return () => unsubscribe();
  }, [display, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      <span className="text-3xl font-normal ml-1">{isDone ? suffix : ""}</span>
    </span>
  );
}

export function Stats() {
  return (
    <div className="bg-navy-900 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#122A45] rounded-3xl p-10 flex flex-col items-center text-center justify-center border border-white/5 shadow-xl"
        >
          <Users size={48} className="text-teal-400 mb-6" />
          <h3 className="text-5xl font-display font-bold text-white mb-3">
            <Counter from={0} to={456} suffix="+" />
          </h3>
          <p className="text-xs uppercase tracking-widest text-white/80 font-bold">Successful Placements</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-[#122A45] rounded-3xl p-10 flex flex-col items-center text-center justify-center border border-white/5 shadow-xl"
        >
          <Globe2 size={48} className="text-gold-500 mb-6" />
          <h3 className="text-5xl font-display font-bold text-white mb-3">
            <Counter from={0} to={15} suffix="+" />
          </h3>
          <p className="text-xs uppercase tracking-widest text-white/80 font-bold">Global Destinations</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[#122A45] rounded-3xl p-10 flex flex-col items-center text-center justify-center border border-white/5 shadow-xl"
        >
          <Building2 size={48} className="text-teal-400 mb-6" />
          <h3 className="text-5xl font-display font-bold text-white mb-3">
            <Counter from={0} to={45} suffix="+" />
          </h3>
          <p className="text-xs uppercase tracking-widest text-white/80 font-bold">Partner Employers</p>
        </motion.div>

      </div>
    </div>
  );
}
