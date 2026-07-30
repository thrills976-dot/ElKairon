import { motion, useScroll, useTransform } from 'motion/react';
import { Target, Compass, Award } from 'lucide-react';
import { useRef } from 'react';

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section ref={containerRef} className="py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Parallax */}
      <motion.div 
        style={{ y: y1, opacity: 0.03 }}
        className="absolute top-0 right-0 text-[30rem] font-display font-bold leading-none text-navy-900 pointer-events-none select-none z-0"
      >
        KAIROS
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            style={{ opacity, scale }}
            className="space-y-8 bg-white/80 backdrop-blur-md border-l-8 border-gold-500 p-10 shadow-2xl rounded-r-3xl relative"
          >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-r-3xl pointer-events-none">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 to-transparent opacity-50" />
            </div>
            
            <div>
              <h2 className="text-teal-600 font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
                <span className="w-8 h-px bg-teal-600"></span> Our Identity
              </h2>
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-[1.1]">
                More Than An Agency. <br/>
                <span className="italic font-light text-teal-600 block mt-2">We Deliver Moments.</span>
              </h3>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              The name combines <strong className="text-navy-900 font-bold">El</strong> (Divine Power), <strong className="text-navy-900 font-bold">Kairon / Kairos</strong> (the right, opportune moment), and <strong className="text-navy-900 font-bold">Global Connect</strong>. We believe timing matters. We don't just send CVs; we place people in the right moment.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Based in Africa, we operate to the B2B standards recruiters expect, with the human care candidates deserve.
            </p>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy-900 text-gold-500 shadow-xl cursor-pointer"
            >
              <Award size={32} />
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8"
          >
            {/* Mission */}
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
              variants={itemVariants} 
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-shadow duration-500 group"
            >
              <div className="w-14 h-14 bg-navy-900 text-gold-500 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-300">
                <Target size={28} />
              </div>
              <h4 className="font-display text-3xl font-bold text-navy-900 mb-4 italic">Mission</h4>
              <p className="text-gray-600 leading-relaxed">
                To ethically connect skilled, job-ready professionals with global opportunities at the right time, while providing employers with compliant, pre-vetted talent that reduces hiring risk and time.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              style={{ y: y2 }}
              variants={itemVariants} 
              className="bg-navy-900 p-8 rounded-3xl border-t-4 border-gold-500 shadow-2xl text-white relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600 rounded-bl-full opacity-10 group-hover:scale-150 transition-transform duration-700" />
              <div className="w-14 h-14 bg-teal-600 text-white rounded-2xl flex items-center justify-center mb-6 relative z-10 transform group-hover:-rotate-12 transition-transform duration-300">
                <Compass size={28} />
              </div>
              <h4 className="font-display text-3xl font-bold text-gold-500 mb-4 italic relative z-10">Vision</h4>
              <p className="text-teal-50 leading-relaxed relative z-10">
                To be the most trusted talent bridge between Africa and the world — known for integrity, speed, and life-changing placements.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
