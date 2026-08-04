import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: 'candidate' | 'employer' | null;
  setRole: (role: 'candidate' | 'employer', profileData?: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, role: null, setRole: async () => {} });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<'candidate' | 'employer' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setRoleState(userDoc.data().role as 'candidate' | 'employer');
          } else {
            setRoleState(null); // Needs to pick role
          }
        } catch (error) {
          console.error(error);
          setRoleState(null);
        }
      } else {
        setRoleState(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setRole = async (newRole: 'candidate' | 'employer', profileData: any = {}) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        ...profileData,
        role: newRole,
        name: user.displayName || profileData.name || 'Unknown',
        email: user.email || profileData.email || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setRoleState(newRole);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'users');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
