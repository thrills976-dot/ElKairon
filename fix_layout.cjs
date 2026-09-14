const fs = require('fs');
let code = fs.readFileSync('src/components/Layout.tsx', 'utf-8');

const target = `export function Layout({ children, currentView, onNavigate }: LayoutProps) {`;
const replacement = `export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const [load3D, setLoad3D] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setLoad3D(true), 2500); // Delay heavy 3D background
    return () => clearTimeout(timer);
  }, []);
`;

code = code.replace(target, replacement);

const targetCanvas = `<Suspense fallback={null}><RecruitmentJourneyCanvas scrollProgress={scrollProgress} /></Suspense>`;
const replaceCanvas = `{load3D && <Suspense fallback={null}><RecruitmentJourneyCanvas scrollProgress={scrollProgress} /></Suspense>}`;

code = code.replace(targetCanvas, replaceCanvas);

fs.writeFileSync('src/components/Layout.tsx', code);
console.log('Fixed Layout.tsx 3D canvas loading');
