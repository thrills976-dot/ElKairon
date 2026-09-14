const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

const target = `export default function App() {`;
const replacement = `export default function App() {
  const [showChat, setShowChat] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowChat(true), 3000); // Delay AI chat loading
    return () => clearTimeout(timer);
  }, []);
`;

code = code.replace(target, replacement);

const targetChat = `<Suspense fallback={null}>
        <ChatWidget 
          context={currentView === 'home' ? 'home' : currentView === 'candidate-portal' ? 'candidate' : 'employer'} 
        />
      </Suspense>`;

const replaceChat = `{showChat && (
        <Suspense fallback={null}>
          <ChatWidget 
            context={currentView === 'home' ? 'home' : currentView === 'candidate-portal' ? 'candidate' : 'employer'} 
          />
        </Suspense>
      )}`;

code = code.replace(targetChat, replaceChat);

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed App.tsx chat widget loading');
