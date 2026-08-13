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
import { CandidateProfile, EmployerProfile, UserProfile } from '../types/recruitment';
import { computeRecruitmentScores, computePersonalityArchetype } from '../lib/aiRecruitmentEngine';
import { sanitizeText, sanitizeEmail, sanitizePhone, sanitizeStringArray } from '../lib/sanitization';
import toast from 'react-hot-toast';

export interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
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
  country: '',
  avatarUrl: '',
  dob: '',
  age: 0,
  nationality: '',
  countryOfResidence: '',
  city: '',
  workAuthorization: 'Requires Visa Sponsorship',
  willingToRelocate: 'Yes, Europe & UK',
  passportAvailable: 'Valid Passport Available (Ready to Travel)',

  currentJobTitle: '',
  currentCompany: '',
  industry: '',
  department: '',
  totalYearsOfExperience: '',
  yearsOfExperience: '',

  institution: '',
  fieldOfStudy: '',
  graduationYear: '',
  gpa: '',

  skills: [],
  certifications: [],
  languages: [{ language: 'English', proficiency: 'Professional' }],

  preferredJobs: [],
  preferredIndustries: [],
  preferredWorkStyle: 'Hybrid',
  employmentType: ['Permanent'],
  salaryExpectations: {
    minSalary: 0,
    maxSalary: 0,
    currency: 'EUR',
    period: 'Monthly'
  },
  availability: 'Immediately',
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
    archetype: 'International Talent'
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
  userProfile: null,
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [role, setRoleState] = useState<'candidate' | 'employer' | null>(null);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isDomainWarningActive, setIsDomainWarningActive] = useState(false);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  // Fetch or construct profile document on user change strictly from Firestore
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

      const activeUserProfile: UserProfile = {
        id: currentUser.uid,
        email: currentUser.email || userData.email || '',
        role: userRole || 'candidate',
        name: userData.name || currentUser.displayName || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        phone: userData.phone || '',
        country: userData.country || '',
        avatarUrl: userData.avatarUrl || currentUser.photoURL || '',
        company: userData.company || '',
        industry: userData.industry || '',
        size: userData.size || '',
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      };
      setUserProfile(activeUserProfile);

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
            // New user without role yet — keep role null so user can explicitly choose Candidate vs Employer
            setRoleState(null);
            setCandidateProfile(null);
            setEmployerProfile(null);
          }
        }
      }
    } catch (err: any) {
      console.warn('Profile synchronization notice:', err?.message || err);
      toast.error('Session data synchronization notice. Please verify network access.');
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
    const rawDisplayName = profileData.name || profileData.fullName || profileData.contactName || user?.displayName || (newRole === 'candidate' ? 'Candidate' : 'Employer');
    const userDisplayName = sanitizeText(rawDisplayName, 100);
    const userEmail = sanitizeEmail(profileData.email || profileData.contactEmail || user?.email || '');

    if (newRole === 'candidate') {
      const mergedProfile: CandidateProfile = {
        ...DEFAULT_EMPTY_CANDIDATE,
        ...profileData,
        id: activeUid,
        role: 'candidate',
        name: userDisplayName,
        email: userEmail
      };
      if (profileData.phone) mergedProfile.phone = sanitizePhone(profileData.phone);
      if (profileData.country) mergedProfile.country = sanitizeText(profileData.country, 100);
      if (profileData.skills) mergedProfile.skills = sanitizeStringArray(profileData.skills);

      mergedProfile.aiRecruitmentScore = computeRecruitmentScores(mergedProfile);
      setCandidateProfile(mergedProfile);

      const activeProfile: UserProfile = {
        id: activeUid,
        email: userEmail,
        role: 'candidate',
        name: userDisplayName,
        avatarUrl: mergedProfile.avatarUrl || user?.photoURL || ''
      };
      setUserProfile(activeProfile);

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
        company: sanitizeText(profileData.company || profileData.companyName || 'Enterprise Partner', 120),
        industry: sanitizeText(profileData.industry || 'Technology', 100),
        size: sanitizeText(profileData.size || profileData.companySize || '50-200', 50),
        phone: sanitizePhone(profileData.phone || profileData.contactPhone || ''),
        country: sanitizeText(profileData.country || profileData.headquartersCountry || '', 100)
      };
      setEmployerProfile(empData);

      const activeProfile: UserProfile = {
        id: activeUid,
        email: userEmail,
        role: 'employer',
        name: userDisplayName,
        company: empData.company,
        industry: empData.industry
      };
      setUserProfile(activeProfile);

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
    // Sanitize incoming candidate updates
    const sanitizedUpdates: Partial<CandidateProfile> = { ...updates };
    if (updates.name) sanitizedUpdates.name = sanitizeText(updates.name, 100);
    if (updates.firstName) sanitizedUpdates.firstName = sanitizeText(updates.firstName, 80);
    if (updates.lastName) sanitizedUpdates.lastName = sanitizeText(updates.lastName, 80);
    if (updates.email) sanitizedUpdates.email = sanitizeEmail(updates.email);
    if (updates.phone) sanitizedUpdates.phone = sanitizePhone(updates.phone);
    if (updates.city) sanitizedUpdates.city = sanitizeText(updates.city, 80);
    if (updates.currentJobTitle) sanitizedUpdates.currentJobTitle = sanitizeText(updates.currentJobTitle, 100);
    if (updates.currentCompany) sanitizedUpdates.currentCompany = sanitizeText(updates.currentCompany, 100);
    if (updates.institution) sanitizedUpdates.institution = sanitizeText(updates.institution, 120);
    if (updates.skills) sanitizedUpdates.skills = sanitizeStringArray(updates.skills);

    setCandidateProfile(prev => {
      const updated: CandidateProfile = {
        ...(prev || DEFAULT_EMPTY_CANDIDATE),
        ...sanitizedUpdates
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
          ...sanitizedUpdates,
          updatedAt: serverTimestamp()
        }, { merge: true });
        const candRef = doc(db, 'candidates', user.uid);
        await setDoc(candRef, {
          ...sanitizedUpdates,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore updateCandidateProfile notice:', err);
        toast.error('Could not save candidate updates to Firestore.');
      }
    }
  };

  const updateEmployerProfile = async (updates: Partial<EmployerProfile>) => {
    const sanitizedUpdates: Partial<EmployerProfile> = { ...updates };
    if (updates.name) sanitizedUpdates.name = sanitizeText(updates.name, 100);
    if (updates.company) sanitizedUpdates.company = sanitizeText(updates.company, 120);
    if (updates.industry) sanitizedUpdates.industry = sanitizeText(updates.industry, 100);
    if (updates.phone) sanitizedUpdates.phone = sanitizePhone(updates.phone);

    setEmployerProfile(prev => {
      const updated = { ...(prev as EmployerProfile), ...sanitizedUpdates };
      return updated;
    });
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          ...sanitizedUpdates,
          updatedAt: serverTimestamp()
        }, { merge: true });
        const empRef = doc(db, 'employers', user.uid);
        await setDoc(empRef, {
          ...sanitizedUpdates,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore updateEmployerProfile notice:', err);
        toast.error('Could not save employer updates to Firestore.');
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
    setUserProfile(null);
    setRoleState(null);
    setCandidateProfile(null);
    setEmployerProfile(null);
    toast.success('Signed out successfully.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
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
