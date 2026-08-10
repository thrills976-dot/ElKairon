import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db, googleProvider, formatAuthError, isDomainUnauthorized } from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { CandidateProfile, EmployerProfile } from '../types/recruitment';
import { computeRecruitmentScores, computePersonalityArchetype } from '../lib/aiRecruitmentEngine';
import toast from 'react-hot-toast';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: 'candidate' | 'employer' | null;
  candidateProfile: CandidateProfile | null;
  employerProfile: EmployerProfile | null;
  authError: string | null;
  isDomainWarningActive: boolean;
  clearAuthError: () => void;
  signInWithGoogle: () => Promise<User | null>;
  signInWithEmail: (email: string, pass: string) => Promise<User | null>;
  signUpWithEmail: (email: string, pass: string, name: string, selectedRole: 'candidate' | 'employer') => Promise<User | null>;
  sendPasswordReset: (email: string) => Promise<void>;
  setRole: (role: 'candidate' | 'employer', profileData?: any) => Promise<void>;
  updateCandidateProfile: (updates: Partial<CandidateProfile>) => Promise<void>;
  updateEmployerProfile: (updates: Partial<EmployerProfile>) => Promise<void>;
  logout: () => Promise<void>;
}

const DEFAULT_EMPTY_CANDIDATE: CandidateProfile = {
  role: 'candidate',
  name: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'South Africa',
  avatarUrl: '',
  dob: '',
  age: 0,
  gender: 'Prefer not to say',
  nationality: '',
  countryOfResidence: '',
  city: '',
  workAuthorization: 'Requires Visa Sponsorship',
  willingToRelocate: 'Yes, Europe & UK',
  passportAvailable: 'Valid Passport Available (Ready to Travel)',

  currentJobTitle: '',
  currentCompany: '',
  industry: 'Technology',
  department: '',
  careerLevel: 'Mid-Level',
  totalYearsOfExperience: '1-3 years',
  yearsOfExperience: '2 years',

  highestDegree: "Bachelor's Degree",
  institution: '',
  fieldOfStudy: '',
  graduationYear: '',
  gpa: '',

  skills: [],
  certifications: [],
  languages: [{ language: 'English', proficiency: 'Professional' }],

  preferredJobs: [],
  preferredIndustries: ['Technology'],
  preferredWorkStyle: 'Hybrid',
  employmentType: ['Permanent'],
  salaryExpectations: {
    minSalary: 4000,
    maxSalary: 7000,
    currency: 'EUR',
    period: 'Monthly'
  },
  availability: 'One Month',
  preferredLocations: ['United Kingdom', 'Germany', 'Netherlands', 'UAE'],

  documents: {
    cvName: '',
    coverLetterName: ''
  },

  skillsAssessment: {
    categoryRatings: {}
  },

  personalityStyle: {
    leadTeams: 3,
    workIndependently: 4,
    complexProblemSolving: 4,
    customerInteraction: 3,
    learnQuickly: 4,
    adaptToChange: 4,
    workUnderPressure: 3,
    archetype: 'Strategic International Talent'
  },

  careerGoals: {
    dreamJob: '',
    desiredCareerPath: '',
    industriesOfInterest: [],
    targetCompanies: [],
    longTermGoals: ''
  },

  matchingPreferences: {
    salaryImportance: 80,
    remoteWork: 70,
    careerGrowth: 90,
    workLifeBalance: 75,
    companyCulture: 80,
    learningOpportunities: 85,
    jobSecurity: 80,
    travelOpportunities: 60
  },

  profileStep: 1,
  profileCompleted: false
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
  candidateProfile: null,
  employerProfile: null,
  authError: null,
  isDomainWarningActive: false,
  clearAuthError: () => {},
  signInWithGoogle: async () => null,
  signInWithEmail: async () => null,
  signUpWithEmail: async () => null,
  sendPasswordReset: async () => {},
  setRole: async () => {},
  updateCandidateProfile: async () => {},
  updateEmployerProfile: async () => {},
  logout: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<'candidate' | 'employer' | null>(null);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isDomainWarningActive, setIsDomainWarningActive] = useState(false);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  // Fetch or construct profile document on user change
  const syncUserProfile = useCallback(async (currentUser: User) => {
    try {
      // 1. Fetch from 'users' collection
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDoc = await getDoc(userDocRef);
      
      let userRole: 'candidate' | 'employer' | null = null;
      let userData: any = {};

      if (userDoc.exists()) {
        userData = userDoc.data();
        userRole = (userData.role as 'candidate' | 'employer') || null;
      }

      if (userRole) {
        setRoleState(userRole);
      }

      // 2. Fetch specific role collection
      if (userRole === 'employer') {
        const empDoc = await getDoc(doc(db, 'employers', currentUser.uid));
        const empData = empDoc.exists() ? empDoc.data() : userData;
        const fullEmpProfile: EmployerProfile = {
          id: currentUser.uid,
          role: 'employer',
          name: empData.name || currentUser.displayName || 'Employer',
          email: currentUser.email || empData.email || '',
          company: empData.company || empData.companyName || 'Enterprise Partner',
          industry: empData.industry || 'Technology',
          size: empData.size || empData.companySize || '50-200',
          phone: empData.phone || empData.contactPhone || '',
          country: empData.country || empData.headquartersCountry || ''
        };
        setEmployerProfile(fullEmpProfile);
      } else if (userRole === 'candidate') {
        const candDoc = await getDoc(doc(db, 'candidates', currentUser.uid));
        const candData = candDoc.exists() ? candDoc.data() : userData;
        const fullCandidate: CandidateProfile = {
          ...DEFAULT_EMPTY_CANDIDATE,
          ...candData,
          id: currentUser.uid,
          role: 'candidate',
          email: currentUser.email || candData.email || '',
          name: candData.name || currentUser.displayName || 'Candidate'
        };
        fullCandidate.aiRecruitmentScore = computeRecruitmentScores(fullCandidate);
        setCandidateProfile(fullCandidate);
      } else {
        // Fallback: check candidates collection, then employers
        const candDoc = await getDoc(doc(db, 'candidates', currentUser.uid));
        if (candDoc.exists()) {
          const candData = candDoc.data();
          setRoleState('candidate');
          const fullCandidate: CandidateProfile = {
            ...DEFAULT_EMPTY_CANDIDATE,
            ...candData,
            id: currentUser.uid,
            role: 'candidate',
            email: currentUser.email || candData.email || '',
            name: candData.name || currentUser.displayName || 'Candidate'
          };
          fullCandidate.aiRecruitmentScore = computeRecruitmentScores(fullCandidate);
          setCandidateProfile(fullCandidate);
        } else {
          const empDoc = await getDoc(doc(db, 'employers', currentUser.uid));
          if (empDoc.exists()) {
            const empData = empDoc.data();
            setRoleState('employer');
            setEmployerProfile({
              id: currentUser.uid,
              role: 'employer',
              name: empData.name || currentUser.displayName || 'Employer',
              email: currentUser.email || empData.email || '',
              company: empData.company || empData.companyName || 'Enterprise Partner',
              industry: empData.industry || 'Technology',
              size: empData.size || '50-200'
            });
          } else {
            // New user without role yet — default to candidate
            setRoleState('candidate');
            const newCand: CandidateProfile = {
              ...DEFAULT_EMPTY_CANDIDATE,
              id: currentUser.uid,
              role: 'candidate',
              email: currentUser.email || '',
              name: currentUser.displayName || 'Candidate'
            };
            newCand.aiRecruitmentScore = computeRecruitmentScores(newCand);
            setCandidateProfile(newCand);
          }
        }
      }
    } catch (err: any) {
      console.warn('Profile synchronization notice:', err?.message || err);
    }
  }, []);

  useEffect(() => {
    // Clear legacy mock guest storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('elkairon_is_guest');
    }

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setRoleState(null);
        setCandidateProfile(null);
        setEmployerProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [syncUserProfile]);

  const signInWithGoogle = async (): Promise<User | null> => {
    setAuthError(null);
    setIsDomainWarningActive(false);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await syncUserProfile(result.user);
        toast.success(`Welcome back, ${result.user.displayName || result.user.email}!`);
        return result.user;
      }
      return null;
    } catch (error: any) {
      const formatted = formatAuthError(error);
      setAuthError(formatted);
      if (isDomainUnauthorized(error) || String(error?.message).includes('unauthorized-domain')) {
        setIsDomainWarningActive(true);
      } else {
        toast.error(formatted);
      }
      throw new Error(formatted);
    }
  };

  const signInWithEmail = async (email: string, pass: string): Promise<User | null> => {
    setAuthError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
      if (result.user) {
        await syncUserProfile(result.user);
        toast.success('Successfully authenticated.');
        return result.user;
      }
      return null;
    } catch (error: any) {
      const formatted = formatAuthError(error);
      setAuthError(formatted);
      toast.error(formatted);
      throw new Error(formatted);
    }
  };

  const signUpWithEmail = async (
    email: string, 
    pass: string, 
    name: string, 
    selectedRole: 'candidate' | 'employer'
  ): Promise<User | null> => {
    setAuthError(null);
    try {
      const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (result.user) {
        await setRole(selectedRole, {
          name: name.trim(),
          email: email.trim(),
          role: selectedRole
        });
        toast.success('Account successfully registered in ElKairon Global Placement Network!');
        return result.user;
      }
      return null;
    } catch (error: any) {
      const formatted = formatAuthError(error);
      setAuthError(formatted);
      toast.error(formatted);
      throw new Error(formatted);
    }
  };

  const sendPasswordReset = async (email: string): Promise<void> => {
    setAuthError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
      toast.success('Password reset instructions dispatched to your email.');
    } catch (error: any) {
      const formatted = formatAuthError(error);
      setAuthError(formatted);
      toast.error(formatted);
      throw new Error(formatted);
    }
  };

  const setRole = async (newRole: 'candidate' | 'employer', profileData: any = {}) => {
    setRoleState(newRole);

    const activeUid = user ? user.uid : `user-${Date.now()}`;
    const userDisplayName = profileData.name || profileData.fullName || profileData.contactName || user?.displayName || (newRole === 'candidate' ? 'Candidate' : 'Employer');
    const userEmail = profileData.email || profileData.contactEmail || user?.email || '';

    if (newRole === 'candidate') {
      const mergedProfile: CandidateProfile = {
        ...DEFAULT_EMPTY_CANDIDATE,
        ...profileData,
        id: activeUid,
        role: 'candidate',
        name: userDisplayName,
        email: userEmail
      };
      mergedProfile.aiRecruitmentScore = computeRecruitmentScores(mergedProfile);
      setCandidateProfile(mergedProfile);

      if (user) {
        try {
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
        } catch (err) {
          console.warn('Firestore candidate save notice:', err);
        }
      }
    } else {
      const empData: EmployerProfile = {
        id: activeUid,
        role: 'employer',
        name: userDisplayName,
        email: userEmail,
        company: profileData.company || profileData.companyName || 'Enterprise Partner',
        industry: profileData.industry || 'Technology',
        size: profileData.size || profileData.companySize || '50-200',
        phone: profileData.phone || profileData.contactPhone || '',
        country: profileData.country || profileData.headquartersCountry || ''
      };
      setEmployerProfile(empData);

      if (user) {
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
        } catch (err) {
          console.warn('Firestore employer save notice:', err);
        }
      }
    }
  };

  const updateCandidateProfile = async (updates: Partial<CandidateProfile>) => {
    setCandidateProfile(prev => {
      const updated: CandidateProfile = {
        ...(prev || DEFAULT_EMPTY_CANDIDATE),
        ...updates
      };
      updated.aiRecruitmentScore = computeRecruitmentScores(updated);
      if (updated.personalityStyle) {
        const { archetype } = computePersonalityArchetype(updated.personalityStyle as any);
        updated.personalityStyle.archetype = archetype;
      }
      return updated;
    });

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          ...updates,
          updatedAt: serverTimestamp()
        }, { merge: true });
        const candRef = doc(db, 'candidates', user.uid);
        await setDoc(candRef, {
          ...updates,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore updateCandidateProfile notice:', err);
      }
    }
  };

  const updateEmployerProfile = async (updates: Partial<EmployerProfile>) => {
    setEmployerProfile(prev => {
      const updated = { ...(prev as EmployerProfile), ...updates };
      return updated;
    });
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          ...updates,
          updatedAt: serverTimestamp()
        }, { merge: true });
        const empRef = doc(db, 'employers', user.uid);
        await setDoc(empRef, {
          ...updates,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore updateEmployerProfile notice:', err);
      }
    }
  };

  const logout = async () => {
    try {
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (e) {
      console.error('Sign out notice:', e);
    }
    setUser(null);
    setRoleState(null);
    setCandidateProfile(null);
    setEmployerProfile(null);
    toast.success('Signed out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        role,
        candidateProfile,
        employerProfile,
        authError,
        isDomainWarningActive,
        clearAuthError,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPasswordReset,
        setRole,
        updateCandidateProfile,
        updateEmployerProfile,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
