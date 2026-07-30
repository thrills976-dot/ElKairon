import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ar', label: 'العربية' },
  { code: 'de', label: 'Deutsch' }
];

export function LanguageSwitcher({ isMobile = false }: { isMobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-navy-800">
        <span className="text-gray-400 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <Globe size={16} /> Language
        </span>
        <div className="flex flex-wrap gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setCurrentLang(lang);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                currentLang.code === lang.code 
                  ? 'bg-gold-500 text-navy-900' 
                  : 'bg-navy-800 text-white hover:bg-navy-700'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative ml-2" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white hover:text-gold-500 transition-colors p-2 rounded-full"
      >
        <Globe size={20} />
        <span className="text-xs font-bold uppercase tracking-widest hidden lg:block">{currentLang.code}</span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 flex flex-col py-2 z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setCurrentLang(lang);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-left text-sm font-bold transition-colors ${
                  currentLang.code === lang.code 
                    ? 'text-teal-600 bg-teal-50' 
                    : 'text-navy-900 hover:bg-gray-50'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
