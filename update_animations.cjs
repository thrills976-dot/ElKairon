const fs = require('fs');

// FAQ.tsx
let faqCode = fs.readFileSync('src/components/home/FAQ.tsx', 'utf-8');
faqCode = faqCode.replace(
  '<div className="space-y-4">',
  '<motion.div \n          initial="hidden"\n          whileInView="visible"\n          viewport={{ once: true, margin: "-50px" }}\n          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}\n          className="space-y-4"\n        >'
);
faqCode = faqCode.replace(
  /className={`border rounded-2xl overflow-hidden/g,
  'variants={{ hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } } }}\n                className={`border rounded-2xl overflow-hidden'
);
faqCode = faqCode.replace(
  /<\/div>(\s*<div className="mt-12 text-center">)/g,
  '</motion.div>$1'
);
fs.writeFileSync('src/components/home/FAQ.tsx', faqCode);

// Services.tsx
let servicesCode = fs.readFileSync('src/components/home/Services.tsx', 'utf-8');
servicesCode = servicesCode.replace(
  '<div className="grid grid-cols-1 md:grid-cols-3 gap-8">',
  '<motion.div \n          initial="hidden"\n          whileInView="visible"\n          viewport={{ once: true, margin: "-50px" }}\n          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}\n          className="grid grid-cols-1 md:grid-cols-3 gap-8"\n        >'
);
servicesCode = servicesCode.replace(
  /className="bg-white p-8 rounded-2xl border-t-4 border-transparent hover:border-gold-500 shadow-lg transition-all group"/g,
  'variants={{ hidden: { opacity: 0, y: 30, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100 } } }}\n              className="bg-white p-8 rounded-2xl border-t-4 border-transparent hover:border-gold-500 shadow-lg transition-all group"'
);
servicesCode = servicesCode.replace(
  /<\/div>\n(\s*<div className="mt-20 border-t border-gray-200 pt-16">)/g,
  '</motion.div>\n$1'
);
fs.writeFileSync('src/components/home/Services.tsx', servicesCode);
