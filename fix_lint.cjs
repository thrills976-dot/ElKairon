const fs = require('fs');
let codeLayout = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

// Fix Layout.tsx missing Search icon
if (!codeLayout.includes('Search,')) {
  codeLayout = codeLayout.replace(
    "import { Menu, X } from 'lucide-react';",
    "import { Menu, X, Search } from 'lucide-react';"
  );
  fs.writeFileSync('src/components/Layout.tsx', codeLayout);
}

// Fix React namespace errors globally
const { execSync } = require('child_process');
execSync(`find src -name "*.tsx" -exec sed -i 's/React.FormEvent/any/g' {} +`);

