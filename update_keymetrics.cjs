const fs = require('fs');
let code = fs.readFileSync('src/components/home/KeyMetrics.tsx', 'utf-8');

// Add import
code = code.replace(
  "import { Users, Globe, Building2 } from 'lucide-react';",
  "import { Users, Globe, Building2 } from 'lucide-react';\nimport { InteractiveMap } from './InteractiveMap';"
);

// Replace motion.div with InteractiveMap
code = code.replace(
  /<motion\.div [\s\S]*?className="bg-navy-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-navy-800"[\s\S]*?>[\s\S]*?<\/motion\.div>/,
  '<InteractiveMap />'
);

fs.writeFileSync('src/components/home/KeyMetrics.tsx', code);
