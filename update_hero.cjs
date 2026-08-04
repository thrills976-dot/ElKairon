const fs = require('fs');
let code = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

code = code.replace(
  `Bridging top <span className="text-teal-400 font-bold">global talent</span> with trusted employers in Europe and the UAE. We deliver moments that stick—with timing, skill, and compliance.`,
  `Connecting African talent with exceptional opportunities across the globe.`
);

code = code.replace(
  `<motion.button \n                whileHover={{ scale: 1.05 }}\n                whileTap={{ scale: 0.95 }}\n                onClick={() => onNavigate('candidate-portal')}\n                className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white rounded-lg font-bold shadow-md hover:bg-teal-500 uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-colors"\n              >\n                Start Application <ArrowRight size={16} />\n              </motion.button>\n              <motion.a \n                whileHover={{ scale: 1.05 }}\n                whileTap={{ scale: 0.95 }}\n                href="#pricing"\n                className="w-full sm:w-auto px-6 py-3 bg-transparent border-2 border-gold-500 text-gold-500 rounded-lg font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-gold-500 hover:text-navy-900 transition-colors shadow-sm"\n              >\n                View Process\n              </motion.a>`,
  `<motion.button \n                whileHover={{ scale: 1.05 }}\n                whileTap={{ scale: 0.95 }}\n                onClick={() => onNavigate('candidate-portal')}\n                className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white rounded-lg font-bold shadow-md hover:bg-teal-500 uppercase text-xs tracking-widest flex items-center justify-center gap-2 transition-colors"\n              >\n                Find Your Opportunity <ArrowRight size={16} />\n              </motion.button>\n              <motion.button \n                whileHover={{ scale: 1.05 }}\n                whileTap={{ scale: 0.95 }}\n                onClick={() => onNavigate('employer-portal')}\n                className="w-full sm:w-auto px-6 py-3 bg-transparent border-2 border-gold-500 text-gold-500 rounded-lg font-bold uppercase text-xs tracking-widest flex items-center justify-center gap-2 hover:bg-gold-500 hover:text-navy-900 transition-colors shadow-sm"\n              >\n                Hire Global Talent\n              </motion.button>`
);

fs.writeFileSync('src/components/home/Hero.tsx', code);
