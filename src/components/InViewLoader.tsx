import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'motion/react';

interface InViewLoaderProps {
  children: React.ReactNode;
  height?: string;
}

export function InViewLoader({ children, height = '400px' }: InViewLoaderProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' } // Load slightly before it comes into view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isInView) {
    return <div ref={ref} style={{ height }} />;
  }

  return (
    <Suspense fallback={<div style={{ height }} className="flex items-center justify-center opacity-50"><div className="w-6 h-6 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" /></div>}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </Suspense>
  );
}
