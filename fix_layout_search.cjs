const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

if (!code.includes('globalSearch')) {
  // Add Search icon import
  code = code.replace(
    "import { Menu, X } from 'lucide-react';",
    "import { Menu, X, Search } from 'lucide-react';"
  );

  // Add search state
  code = code.replace(
    "const [mobileMenuOpen, setMobileMenuOpen] = useState(false);",
    "const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [searchQuery, setSearchQuery] = useState('');\n\n  const handleGlobalSearch = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (!searchQuery.trim()) return;\n    onNavigate('opportunities');\n    setTimeout(() => {\n      window.dispatchEvent(new CustomEvent('globalSearch', { detail: searchQuery }));\n    }, 100);\n    setSearchQuery('');\n  };\n"
  );

  // Add Search form in Desktop Nav
  const desktopNavStart = '<nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest">';
  const desktopNavSearch = `${desktopNavStart}
            <form onSubmit={handleGlobalSearch} className="relative flex items-center mr-2">
              <Search size={16} className="absolute left-3 text-teal-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..." 
                className="pl-9 pr-4 py-1.5 bg-white/10 border border-teal-500/30 rounded-full text-white placeholder:text-gray-300 focus:outline-none focus:border-gold-500 focus:bg-white/20 transition-all w-48 text-[10px]"
              />
            </form>`;
            
  code = code.replace(desktopNavStart, desktopNavSearch);
  
  // Add Search form in Mobile Nav
  const mobileNavStart = '<div className="flex flex-col gap-6 flex-1 my-4">';
  const mobileNavSearch = `${mobileNavStart}
              <form onSubmit={(e) => { handleGlobalSearch(e); setMobileMenuOpen(false); }} className="relative flex items-center mb-4">
                <Search size={20} className="absolute left-4 text-teal-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs by location, role..." 
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-teal-500/30 rounded-xl text-white placeholder:text-gray-300 focus:outline-none focus:border-gold-500 transition-all text-sm font-bold"
                />
              </form>`;
  
  code = code.replace(mobileNavStart, mobileNavSearch);
  
  fs.writeFileSync('src/components/Layout.tsx', code);
}
