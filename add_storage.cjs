const fs = require('fs');
let code = fs.readFileSync('src/lib/firebase.ts', 'utf-8');

if (!code.includes('getStorage')) {
  code = code.replace("import { getFirestore", "import { getStorage } from 'firebase/storage';\nimport { getFirestore");
  code = code.replace("export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);", "export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);\nexport const storage = getStorage(app);");
  fs.writeFileSync('src/lib/firebase.ts', code);
}
