const fs = require('fs');
let code = fs.readFileSync('src/contexts/AuthContext.tsx', 'utf-8');

code = code.replace(
  "setRole: (role: 'candidate' | 'employer') => Promise<void>;",
  "setRole: (role: 'candidate' | 'employer', profileData?: any) => Promise<void>;"
);

code = code.replace(
  "const setRole = async (newRole: 'candidate' | 'employer') => {",
  "const setRole = async (newRole: 'candidate' | 'employer', profileData: any = {}) => {"
);

code = code.replace(
  "role: newRole,\n        name: user.displayName || 'Unknown',\n        email: user.email || '',\n        createdAt: serverTimestamp(),\n        updatedAt: serverTimestamp()",
  "...profileData,\n        role: newRole,\n        name: user.displayName || profileData.name || 'Unknown',\n        email: user.email || profileData.email || '',\n        createdAt: serverTimestamp(),\n        updatedAt: serverTimestamp()"
);

fs.writeFileSync('src/contexts/AuthContext.tsx', code);
