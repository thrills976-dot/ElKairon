const fs = require('fs');

const code = `import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Users, Globe, Building2 } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setCount(Math.min(Math.floor(end * progress), end));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-teal-600">
      {count}{suffix}
    </span>
  );
}

export function KeyMetrics() {
  const metrics = [
    {
      icon: Users,
      value: 15000,
      suffix: "+",
      label: "Talent Network",
      description: "Pre-screened professionals ready to deploy"
    },
    {
      icon: Building2,
      value: 200,
      suffix: "+",
      label: "Partner Companies",
      description: "Trusted employers across various sectors"
    },
    {
      icon: Globe,
      value: 3000,
      suffix: "+",
      label: "Jobs Filled",
      description: "Successful global career transitions"
    }
  ];

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <div className="mb-12">
              <h2 className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-3">Our Impact</h2>
              <h3 className="font-display italic text-4xl font-bold text-navy-900 mb-6">Proven Success & Trust</h3>
              <p className="text-gray-600 text-lg">
                We've been consistently matching top global talent with premium employers, expanding our network every year.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {metrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className="flex flex-col items-start"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mb-4">
                      <Icon size={24} />
                    </div>
                    <div className="mb-1">
                      <Counter end={metric.value} suffix={metric.suffix} />
                    </div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-navy-900 mb-1">{metric.label}</h4>
                    <p className="text-gray-500 text-xs">{metric.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-full min-h-[400px] flex"
          >
            <InteractiveMap />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
`;

fs.writeFileSync('src/components/home/KeyMetrics.tsx', code);
