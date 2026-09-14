const fs = require('fs');

let heroCode = fs.readFileSync('src/components/home/Hero.tsx', 'utf-8');

const targetFunc = `export function Hero({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {`;
const replacementFunc = `export function Hero({ onNavigate }: { onNavigate: (v: 'home' | 'opportunities' | 'about' | 'insights' | 'candidate-portal' | 'employer-portal' | 'fees') => void }) {
  const [loadGlobe, setLoadGlobe] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoadGlobe(true), 1500);
    return () => clearTimeout(timer);
  }, []);
`;

heroCode = heroCode.replace(targetFunc, replacementFunc);

fs.writeFileSync('src/components/home/Hero.tsx', heroCode);
console.log('Fixed Hero.tsx globe loading part 2');
