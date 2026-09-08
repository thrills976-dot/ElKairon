const fs = require('fs');
let content = fs.readFileSync('src/contexts/AuthContext.tsx', 'utf-8');

// 1. Add storage imports
const firestoreImportRegex = /import { doc, getDoc, setDoc, serverTimestamp } from 'firebase\/firestore';/;
content = content.replace(firestoreImportRegex, `import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';`);

// 2. Add storage upload logic in setRole for candidate
const setRoleRegex = /if \(profileData\.skills\) mergedProfile\.skills = sanitizeStringArray\(profileData\.skills\);/g;
const newSetRole = `if (profileData.skills) mergedProfile.skills = sanitizeStringArray(profileData.skills);

      if (profileData.cvFile) {
        try {
          const cvRef = ref(storage, \`candidates/\${activeUid}/documents/\${profileData.cvFile.name}\`);
          await uploadBytes(cvRef, profileData.cvFile);
          mergedProfile.cvUrl = await getDownloadURL(cvRef);
          mergedProfile.cvName = profileData.cvFile.name;
        } catch (err) {
          console.error("Failed to upload CV", err);
        }
      }
      if (profileData.coverLetterFile) {
        try {
          const clRef = ref(storage, \`candidates/\${activeUid}/documents/\${profileData.coverLetterFile.name}\`);
          await uploadBytes(clRef, profileData.coverLetterFile);
          mergedProfile.coverLetterUrl = await getDownloadURL(clRef);
          mergedProfile.coverLetterName = profileData.coverLetterFile.name;
        } catch (err) {
          console.error("Failed to upload Cover Letter", err);
        }
      }
`;

content = content.replace(setRoleRegex, newSetRole);

fs.writeFileSync('src/contexts/AuthContext.tsx', content);
console.log("Updated AuthContext.tsx for storage");
