const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

code = code.replace(
  '<div>hello@elkaironglobalconnect.com</div>',
  '<div>hello@elkaironglobalconnect.com</div>\n            <button onClick={() => setPrivacyOpen(true)} className="text-gray-500 hover:text-navy-900 transition-colors uppercase font-bold tracking-widest text-[10px]">Data Protection & Privacy</button>'
);

fs.writeFileSync('src/components/Layout.tsx', code);
