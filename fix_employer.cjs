const fs = require('fs');
let code = fs.readFileSync('src/components/portal/EmployerDashboard.tsx', 'utf-8');

code = code.replace("import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot } from 'firebase/firestore';", "import { collection, addDoc, query, where, getDocs, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';");

fs.writeFileSync('src/components/portal/EmployerDashboard.tsx', code);
