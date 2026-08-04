const fs = require('fs');
let code = fs.readFileSync('src/lib/firebase.ts', 'utf-8');

if (!code.includes('createUserWithEmailAndPassword')) {
  code = code.replace("signInWithPopup, signOut } from 'firebase/auth';", "signInWithPopup, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';");
  
  code += `
export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Email', error);
    throw error;
  }
};

export const registerWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Error registering with Email', error);
    throw error;
  }
};
`;
  fs.writeFileSync('src/lib/firebase.ts', code);
}
