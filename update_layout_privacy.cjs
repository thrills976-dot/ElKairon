const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

code = code.replace(
  "import { AuthModal } from './AuthModal';",
  "import { AuthModal } from './AuthModal';\nimport { PrivacyModal } from './PrivacyModal';"
);

code = code.replace(
  "const [authOpen, setAuthOpen] = useState(false);",
  "const [authOpen, setAuthOpen] = useState(false);\n  const [privacyOpen, setPrivacyOpen] = useState(false);"
);

// AuthModal Privacy link click
code = code.replace(
  /<a href="#privacy" onClick={\(\) => onClose\(\)} className="underline hover:text-teal-600">Privacy Policy<\/a>/g,
  '<button type="button" onClick={() => { onClose(); window.dispatchEvent(new CustomEvent("open-privacy")); }} className="underline hover:text-teal-600">Privacy Policy</button>'
);

// Event listener for privacy modal
code = code.replace(
  "return () => window.removeEventListener('scroll', handleScroll);",
  "const handlePrivacyOpen = () => setPrivacyOpen(true);\n    window.addEventListener('open-privacy', handlePrivacyOpen);\n    return () => {\n      window.removeEventListener('scroll', handleScroll);\n      window.removeEventListener('open-privacy', handlePrivacyOpen);\n    };"
);

// Render PrivacyModal
code = code.replace(
  "<AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />",
  "<AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />\n      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />"
);

fs.writeFileSync('src/components/Layout.tsx', code);

let authCode = fs.readFileSync('src/components/AuthModal.tsx', 'utf-8');
authCode = authCode.replace(
  /<a href="#privacy" onClick={\(\) => onClose\(\)} className="underline hover:text-teal-600">Privacy Policy<\/a>/g,
  '<button type="button" onClick={() => { onClose(); window.dispatchEvent(new CustomEvent("open-privacy")); }} className="underline hover:text-teal-600">Privacy Policy</button>'
);
fs.writeFileSync('src/components/AuthModal.tsx', authCode);

