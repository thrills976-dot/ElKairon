const fs = require('fs');
let code = fs.readFileSync('src/components/portal/index.tsx', 'utf-8');
code = code.replace('export function Portal() {', 'export function Portal({ initialMode }: { initialMode?: "candidate" | "employer" }) {');
fs.writeFileSync('src/components/portal/index.tsx', code);
