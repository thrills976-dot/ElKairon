const fs = require('fs');
let code = fs.readFileSync('src/contexts/AuthContext.tsx', 'utf-8');

code = code.replace("import { doc, getDoc, setDoc } from 'firebase/firestore';", "import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';");
code = code.replace("createdAt: Date.now(),", "createdAt: serverTimestamp(),");
code = code.replace("updatedAt: Date.now()", "updatedAt: serverTimestamp()");

fs.writeFileSync('src/contexts/AuthContext.tsx', code);
