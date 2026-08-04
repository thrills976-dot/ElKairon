const fs = require('fs');

function fixFile(file) {
  let code = fs.readFileSync(file, 'utf-8');
  if (!code.includes('serverTimestamp')) {
    code = code.replace("import { doc, setDoc", "import { doc, setDoc, serverTimestamp");
    code = code.replace("import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';", "import { collection, addDoc, query, where, getDocs, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';");
    code = code.replace("import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';", "import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';");
  }
  code = code.replace(/createdAt: Date.now\(\),/g, "createdAt: serverTimestamp(),");
  code = code.replace(/updatedAt: Date.now\(\)/g, "updatedAt: serverTimestamp()");
  fs.writeFileSync(file, code);
}

fixFile('src/components/portal/CandidateDashboard.tsx');
fixFile('src/components/portal/EmployerDashboard.tsx');
