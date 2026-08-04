const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

code = code.replace(
  "import { AuthModal } from './AuthModal';",
  "import { AuthModal } from './AuthModal';\nimport { useAuth } from '../contexts/AuthContext';\nimport { logout } from '../lib/firebase';"
);

code = code.replace(
  "const [privacyOpen, setPrivacyOpen] = useState(false);",
  "const [privacyOpen, setPrivacyOpen] = useState(false);\n  const { user } = useAuth();"
);

code = code.replace(
  `<motion.button \n              whileHover={{ scale: 1.05 }}\n              whileTap={{ scale: 0.95 }}\n              onClick={() => setAuthOpen(true)}\n              className="bg-teal-600 px-5 py-2 rounded-lg text-white hover:bg-teal-500 transition-colors shadow-md ml-2 border border-teal-500"\n            >\n              Login / Register\n            </motion.button>`,
  `{user ? (\n              <div className="flex items-center gap-4 ml-2">\n                <button \n                  onClick={() => onNavigate('candidate-portal')}\n                  className="bg-teal-600 px-5 py-2 rounded-lg text-white hover:bg-teal-500 transition-colors shadow-md border border-teal-500"\n                >\n                  Portal\n                </button>\n                <button \n                  onClick={logout}\n                  className="bg-red-50 text-red-600 px-5 py-2 rounded-lg hover:bg-red-100 transition-colors shadow-md border border-red-100"\n                >\n                  Logout\n                </button>\n              </div>\n            ) : (\n              <motion.button \n                whileHover={{ scale: 1.05 }}\n                whileTap={{ scale: 0.95 }}\n                onClick={() => setAuthOpen(true)}\n                className="bg-teal-600 px-5 py-2 rounded-lg text-white hover:bg-teal-500 transition-colors shadow-md ml-2 border border-teal-500"\n              >\n                Login / Register\n              </motion.button>\n            )}`
);

code = code.replace(
  `<button \n                  onClick={() => { setAuthOpen(true); setMobileMenuOpen(false); }}\n                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg"\n                >\n                  <LogIn size={20} />\n                  Sign In\n                </button>`,
  `{user ? (\n                  <div className="flex flex-col gap-4">\n                    <button \n                      onClick={() => { onNavigate('candidate-portal'); setMobileMenuOpen(false); }}\n                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg"\n                    >\n                      Portal\n                    </button>\n                    <button \n                      onClick={() => { logout(); setMobileMenuOpen(false); }}\n                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-50 text-red-600 rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg"\n                    >\n                      Logout\n                    </button>\n                  </div>\n                ) : (\n                  <button \n                    onClick={() => { setAuthOpen(true); setMobileMenuOpen(false); }}\n                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-teal-600 text-white rounded-xl text-lg font-bold uppercase tracking-widest shadow-lg"\n                  >\n                    <LogIn size={20} />\n                    Sign In\n                  </button>\n                )}`
);

fs.writeFileSync('src/components/Layout.tsx', code);
