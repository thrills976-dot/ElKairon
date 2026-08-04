const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

if (!code.includes('Search')) {
  code = "import { Search } from 'lucide-react';\n" + code;
  fs.writeFileSync('src/components/Layout.tsx', code);
}
