const fs = require('fs');
let code = fs.readFileSync('src/contexts/AuthContext.tsx', 'utf8');

const oldCand = `        try {
          await setDoc(doc(db, 'candidates', user.uid), {
            ...mergedProfile,
            updatedAt: serverTimestamp()
          }, { merge: true });
          await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            role: 'candidate',
            name: userDisplayName,
            email: userEmail,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (err) {`;

const newCand = `        try {
          await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            role: 'candidate',
            name: userDisplayName,
            email: userEmail,
            updatedAt: serverTimestamp()
          }, { merge: true });
          await setDoc(doc(db, 'candidates', user.uid), {
            ...mergedProfile,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (err) {`;

code = code.replace(oldCand, newCand);

const oldEmp = `      if (user) {
        try {
          await setDoc(doc(db, 'employers', user.uid), {
            ...empData,
            ...profileData,
            updatedAt: serverTimestamp()
          }, { merge: true });
          await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            role: 'employer',
            name: userDisplayName,
            email: userEmail,
            company: empData.company,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (err) {`;

const newEmp = `      if (user) {
        try {
          await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            role: 'employer',
            name: userDisplayName,
            email: userEmail,
            company: empData.company,
            updatedAt: serverTimestamp()
          }, { merge: true });
          await setDoc(doc(db, 'employers', user.uid), {
            ...empData,
            ...profileData,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (err) {`;

code = code.replace(oldEmp, newEmp);

fs.writeFileSync('src/contexts/AuthContext.tsx', code);
console.log("Patched.");
