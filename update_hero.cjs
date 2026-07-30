const fs = require('fs');
let code = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

code = code.replace(
  '<div ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy-900 pt-20 border-b-4 border-gold-500">',
  '<div id="hero" ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy-900 pt-20 border-b-4 border-gold-500">'
);

// Enhance UI overlay aesthetics (cleaner, premium)
// Instead of full replace, just replace some classes or maybe the left side text box.
const oldContent = `<div className="space-y-8 mt-12 md:mt-0 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight">
                Right <span className="text-gold-500 italic">Moment.</span><br />
                Right <span className="text-gold-500 italic">Career.</span><br />
                Anywhere.
              </h1>
              <p className="mt-6 text-xl text-teal-50 max-w-lg leading-relaxed">
                We bridge the gap between global employers and skilled talent, specializing in seamless placements across Germany, UAE, and the UK.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => onNavigate('candidate-portal')}
                className="group flex items-center justify-center gap-3 bg-teal-600 px-8 py-4 rounded-xl text-white font-bold uppercase tracking-widest hover:bg-teal-500 transition-all shadow-lg hover:shadow-teal-500/30"
              >
                <Users size={20} />
                Find a Job
              </button>
              <button 
                onClick={() => onNavigate('employer-portal')}
                className="group flex items-center justify-center gap-3 bg-transparent border-2 border-gold-500 px-8 py-4 rounded-xl text-gold-500 font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-navy-900 transition-all"
              >
                <Building size={20} />
                Hire Talent
              </button>
            </motion.div>
          </div>`;

const newContent = `<div className="space-y-8 mt-12 md:mt-0 pointer-events-auto p-8 rounded-3xl bg-navy-900/40 backdrop-blur-md border border-white/10 shadow-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
                <GlobeIcon size={14} className="text-gold-500" />
                Global Placements
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight">
                Right <span className="text-gold-500 italic">Moment.</span><br />
                Right <span className="text-gold-500 italic">Career.</span><br />
                Anywhere.
              </h1>
              <p className="mt-6 text-lg text-gray-300 max-w-lg leading-relaxed font-light">
                Bridging the gap between global employers and skilled talent. Seamless placements across Germany, UAE, and the UK.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => onNavigate('candidate-portal')}
                className="flex-1 flex items-center justify-center gap-3 bg-teal-600 px-8 py-4 rounded-xl text-white font-bold uppercase tracking-widest hover:bg-teal-500 transition-all shadow-lg hover:shadow-teal-500/30"
              >
                <Users size={20} />
                Find a Job
              </button>
              <button 
                onClick={() => onNavigate('employer-portal')}
                className="flex-1 flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border-2 border-gold-500 px-8 py-4 rounded-xl text-gold-500 font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-navy-900 transition-all"
              >
                <Building size={20} />
                Hire Talent
              </button>
            </motion.div>
          </div>`;

code = code.replace(oldContent, newContent);
fs.writeFileSync('src/components/home/Hero.tsx', code);
