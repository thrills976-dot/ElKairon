const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Update view type
code = code.replace("useState<'home' | 'candidate-portal' | 'employer-portal'>('home')", "useState<'home' | 'candidate-portal' | 'employer-portal' | 'fees'>('home')");
code = code.replace("handleNavigate = (view: 'home' | 'candidate-portal' | 'employer-portal')", "handleNavigate = (view: 'home' | 'candidate-portal' | 'employer-portal' | 'fees')");

// Import FeesAndPayment
code = code.replace("import { Home } from './components/Home';", "import { Home } from './components/Home';\nimport { FeesAndPayment } from './components/FeesAndPayment';");

// Update rendering logic
const renderLogicOld = `{currentView === 'home' ? (
          <Home onNavigate={handleNavigate} />
        ) : (
          <Portal initialMode={currentView === 'candidate-portal' ? 'candidate' : 'employer'} />
        )}`;
const renderLogicNew = `{currentView === 'home' ? (
          <Home onNavigate={handleNavigate} />
        ) : currentView === 'fees' ? (
          <FeesAndPayment />
        ) : (
          <Portal initialMode={currentView === 'candidate-portal' ? 'candidate' : 'employer'} />
        )}`;
code = code.replace(renderLogicOld, renderLogicNew);

fs.writeFileSync('src/App.tsx', code);
