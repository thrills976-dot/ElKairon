import { motion, useInView, useAnimation } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Users, Building, Globe as GlobeIcon, Map } from 'lucide-react';

function Counter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeOutExpo * (to - from) + from));
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

export function Impact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  return (
    <section ref={containerRef} className="bg-navy-900 border-t-4 border-gold-500 relative z-20 py-24">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Our Global <span className="text-gold-500 italic">Impact</span>
          </h2>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto drop-shadow-md">
            We measure our success by the lives we change and the global businesses we empower through timely, precise talent matching.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: Users, 
              value: 1200, 
              suffix: '+', 
              label: "Successful Placements",
              color: "text-teal-400"
            },
            { 
              icon: GlobeIcon, 
              value: 15, 
              suffix: '+', 
              label: "Global Destinations",
              color: "text-gold-500"
            },
            { 
              icon: Building, 
              value: 45, 
              suffix: '+', 
              label: "Partner Employers",
              color: "text-teal-400"
            },
            { 
              icon: Map, 
              value: 3, 
              suffix: '', 
              label: "Active Continents",
              color: "text-gold-500"
            }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.2, type: "spring", stiffness: 100 }}
              className="bg-navy-800 border border-navy-700 p-8 rounded-2xl flex flex-col items-center justify-center text-center group hover:bg-navy-700 hover:border-gold-500 transition-colors"
            >
              <stat.icon className={`${stat.color} mb-6 group-hover:scale-110 transition-transform duration-500`} size={48} />
              <div className="flex items-baseline justify-center mb-2">
                <h4 className="text-5xl font-display font-bold text-white tabular-nums">
                  <Counter from={0} to={stat.value} duration={2.5} />
                </h4>
                <span className="text-4xl font-display font-bold text-white ml-1">{stat.suffix}</span>
              </div>
              <p className="text-gray-300 text-sm font-bold tracking-widest uppercase mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
