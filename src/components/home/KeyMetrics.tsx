import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import { Users, Globe, Building2 } from 'lucide-react';

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
          setCount(Math.floor(end * progress));
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
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold italic text-navy-900">
      {count}{suffix}
    </span>
  );
}

export function KeyMetrics() {
  const metrics = [
    {
      icon: Users,
      value: 1500,
      suffix: "+",
      label: "Candidates Placed",
      description: "Successfully placed in Europe and the UAE"
    },
    {
      icon: Building2,
      value: 200,
      suffix: "+",
      label: "Global Partners",
      description: "Trusted employers across various sectors"
    },
    {
      icon: Globe,
      value: 12,
      suffix: "",
      label: "Countries Covered",
      description: "Spanning multiple continents"
    }
  ];

  return (
    <section className="py-20 bg-gold-500/10 border-y border-gold-500/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-navy-900 flex items-center justify-center text-gold-500 mb-6 shadow-xl">
                  <Icon size={32} />
                </div>
                <div className="mb-2">
                  <Counter end={metric.value} suffix={metric.suffix} />
                </div>
                <h4 className="text-xl font-bold uppercase tracking-wider text-navy-900 mb-2">{metric.label}</h4>
                <p className="text-gray-600 max-w-xs">{metric.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
