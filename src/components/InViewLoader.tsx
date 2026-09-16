import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'motion/react';

interface InViewLoaderProps {
  children: React.ReactNode;
  height?: string;
}

export function InViewLoader({ children, height = 'min-h-[100px]' }: InViewLoaderProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the browser doesn't support IntersectionObserver, render immediately.
    if (!('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      // Huge root margin so it loads almost everything instantly anyway,
      // but still breaks up the initial synchronous render block
      { rootMargin: '2000px' } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!isInView) {
    return <div ref={ref} className={`w-full ${height}`} />;
  }

  return (
    <Suspense fallback={<div className={`flex items-center justify-center opacity-50 w-full ${height}`}><div className="w-6 h-6 rounded-full border-2 border-teal-400/30 border-t-teal-400 animate-spin" /></div>}>
      <motion.div
        initial={{ opacity: 1, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </Suspense>
  );
}
