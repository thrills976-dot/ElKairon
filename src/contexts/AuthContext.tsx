import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { CandidateProfile, EmployerProfile } from '../types/recruitment';
import { computeRecruitmentScores, computePersonalityArchetype } from '../lib/aiRecruitmentEngine';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  role: 'candidate' | 'employer' | null;
  candidateProfile: CandidateProfile | null;
  employerProfile: EmployerProfile | null;
  isGuestUser: boolean;
  setRole: (role: 'candidate' | 'employer', profileData?: any) => Promise<void>;
  updateCandidateProfile: (updates: Partial<CandidateProfile>) => Promise<void>;
  updateEmployerProfile: (updates: Partial<EmployerProfile>) => Promise<void>;
  loginAsGuestCandidate: () => void;
  loginAsGuestEmployer: () => void;
  loginWithCustomEmail: (email: string, name?: string, chosenRole?: 'candidate' | 'employer') => void;
  logout: () => Promise<void>;
}

const DEFAULT_SAMPLE_CANDIDATE: CandidateProfile = {
  role: 'candidate',
  name: 'Blessing Mukamuri',
  firstName: 'Blessing',
  lastName: 'Mukamuri',
  email: 'blessing.mukamuri@talent.elkairon.com',
  phone: '+263 77 123 4567',
  country: 'Zimbabwe',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  dob: '1996-05-14',
  age: 29,
  gender: 'Female',
  nationality: 'Zimbabwean',
  countryOfResidence: 'Zimbabwe',
  city: 'Harare',
  workAuthorization: 'Requires Visa Sponsorship',
  willingToRelocate: 'Yes, Europe & UK',
  passportAvailable: 'Valid Passport Available (Ready to Travel)',

  currentJobTitle: 'Senior Cloud Systems & Network Engineer',
  currentCompany: 'AfriTelecom Solutions',
  industry: 'Technology',
  department: 'Cloud Infrastructure & SRE',
  careerLevel: 'Senior',
  totalYearsOfExperience: '5+ years',
  yearsOfExperience: '5 years',

  highestDegree: "Bachelor's Degree",
  institution: 'University of Zimbabwe',
  fieldOfStudy: 'Computer Science & Software Engineering',
  graduationYear: '2019',
  gpa: '3.8 / 4.0',

  skills: ['Python', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'Cisco CCNA', 'Networking', 'Routing & Switching', 'Linux', 'Terraform'],
  certifications: ['Microsoft Azure Administrator (AZ-104)', 'Cisco CCNA (200-301)', 'AWS Solutions Architect Associate'],
  languages: [
    { language: 'English', proficiency: 'Native' },
    { language: 'German', proficiency: 'Intermediate' },
    { language: 'Shona', proficiency: 'Native' }
  ],

  preferredJobs: ['Cloud Engineer', 'DevOps Engineer', 'Network Engineer', 'Backend Developer'],
  preferredIndustries: ['Technology', 'Banking & FinTech', 'Telecommunications'],
  preferredWorkStyle: 'Hybrid',
  employmentType: ['Permanent', 'Contract'],
  salaryExpectations: {
    minSalary: 5500,
    maxSalary: 8500,
    currency: 'EUR',
    period: 'Monthly'
  },
  availability: 'One Month',
  preferredLocations: ['Germany', 'Netherlands', 'United Kingdom', 'UAE', 'Canada'],

  documents: {
    cvName: 'Blessing_Mukamuri_Cloud_Architect_CV.pdf',
    coverLetterName: 'Blessing_CoverLetter_International.pdf'
  },

  skillsAssessment: {
    categoryRatings: {
      'Python': 4,
      'AWS': 5,
      'Azure': 4,
      'Docker & K8s': 4,
      'Cisco CCNA': 5,
      'SIEM / Security': 3
    }
  },

  personalityStyle: {
    leadTeams: 4,
    workIndependently: 5,
    complexProblemSolving: 5,
    customerInteraction: 4,
    learnQuickly: 5,
    adaptToChange: 5,
    workUnderPressure: 4,
    archetype: 'Strategic Engineering Leader'
  },

  careerGoals: {
    dreamJob: 'Principal Enterprise Cloud Architect & Relocation Lead',
    desiredCareerPath: 'Cloud Architecture -> VP of Infrastructure',
    industriesOfInterest: ['Technology', 'Global FinTech', 'Renewable Tech'],
    targetCompanies: ['NextGen Cloud Systems', 'FinApex', 'Booking.com', 'SAP'],
    longTermGoals: 'Lead international multi-region cloud migrations and mentor African tech professionals.'
  },

  matchingPreferences: {
    salaryImportance: 90,
    remoteWork: 80,
    careerGrowth: 95,
    workLifeBalance: 75,
    companyCulture: 85,
    learningOpportunities: 95,
    jobSecurity: 85,
    travelOpportunities: 50
  },

  profileStep: 7,
  profileCompleted: true
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  role: null,
  candidateProfile: null,
  employerProfile: null,
  isGuestUser: false,
  setRole: async () => {},
  updateCandidateProfile: async () => {},
  updateEmployerProfile: async () => {},
  loginAsGuestCandidate: () => {},
  loginAsGuestEmployer: () => {},
  loginWithCustomEmail: () => {},
  logout: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<'candidate' | 'employer' | null>(null);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile | null>(null);
  const [employerProfile, setEmployerProfile] = useState<EmployerProfile | null>(null);
  const [isGuestUser, setIsGuestUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize cached guest or persistent profile
  useEffect(() => {
    const savedRole = localStorage.getItem('elkairon_role') as 'candidate' | 'employer' | null;
    const savedCandidate = localStorage.getItem('elkairon_candidate_profile');
    const savedEmployer = localStorage.getItem('elkairon_employer_profile');

    if (savedCandidate) {
      try {
        const parsed = JSON.parse(savedCandidate);
        setCandidateProfile(parsed);
        if (!user && savedRole === 'candidate') {
          setIsGuestUser(true);
          setUser({
            uid: parsed.id || 'candidate-session',
            email: parsed.email || 'candidate@talent.elkairon.com',
            displayName: parsed.name || 'Accredited Candidate'
          } as any);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (savedEmployer) {
      try {
        const parsed = JSON.parse(savedEmployer);
        setEmployerProfile(parsed);
        if (!user && savedRole === 'employer') {
          setIsGuestUser(true);
          setUser({
            uid: parsed.id || 'employer-session',
            email: parsed.email || 'elena@nextgencloud.nl',
            displayName: parsed.name || 'Enterprise Recruiter'
          } as any);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (savedRole) {
      setRoleState(savedRole);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsGuestUser(false);
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            const userRole = data.role as 'candidate' | 'employer';
            setRoleState(userRole);
            localStorage.setItem('elkairon_role', userRole);

            if (userRole === 'candidate') {
              const fullProfile: CandidateProfile = {
                ...DEFAULT_SAMPLE_CANDIDATE,
                ...data,
                id: currentUser.uid,
                email: currentUser.email || data.email,
                name: data.name || currentUser.displayName || 'Candidate'
              };
              fullProfile.aiRecruitmentScore = computeRecruitmentScores(fullProfile);
              setCandidateProfile(fullProfile);
              localStorage.setItem('elkairon_candidate_profile', JSON.stringify(fullProfile));
            } else if (userRole === 'employer') {
              const empProfile: EmployerProfile = {
                id: currentUser.uid,
                role: 'employer',
                name: data.name || currentUser.displayName || 'Employer',
                email: currentUser.email || data.email,
                company: data.company || 'Enterprise Partner',
                industry: data.industry || 'Technology',
                size: data.size || '50-200'
              };
              setEmployerProfile(empProfile);
              localStorage.setItem('elkairon_employer_profile', JSON.stringify(empProfile));
            }
          }
        } catch (error) {
          // Gracefully fall back to cached local storage data if network is temporarily offline
          console.warn('Firestore user fetch notice (using cached local session):', error);
          const savedRole = localStorage.getItem('elkairon_role') as 'candidate' | 'employer' | null;
          const savedCandidate = localStorage.getItem('elkairon_candidate_profile');
          const savedEmployer = localStorage.getItem('elkairon_employer_profile');
          if (savedRole) setRoleState(savedRole);
          if (savedCandidate) {
            try { setCandidateProfile(JSON.parse(savedCandidate)); } catch {}
          }
          if (savedEmployer) {
            try { setEmployerProfile(JSON.parse(savedEmployer)); } catch {}
          }
        }
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setRole = async (newRole: 'candidate' | 'employer', profileData: any = {}) => {
    setRoleState(newRole);
    localStorage.setItem('elkairon_role', newRole);

    const activeUid = user ? user.uid : `user-${Date.now()}`;
    const userDisplayName = profileData.name || user?.displayName || (newRole === 'candidate' ? 'Candidate Applicant' : 'Global Enterprise Recruiter');
    const userEmail = profileData.email || user?.email || '';

    if (newRole === 'candidate') {
      const mergedProfile: CandidateProfile = {
        ...DEFAULT_SAMPLE_CANDIDATE,
        ...profileData,
        id: activeUid,
        role: 'candidate',
        name: userDisplayName,
        email: userEmail
      };
      mergedProfile.aiRecruitmentScore = computeRecruitmentScores(mergedProfile);
      setCandidateProfile(mergedProfile);
      localStorage.setItem('elkairon_candidate_profile', JSON.stringify(mergedProfile));

      if (user) {
        try {
          await setDoc(doc(db, 'candidates', user.uid), {
            ...mergedProfile,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (err) {
          console.warn('Firestore candidate save warning:', err);
        }
      }
    } else {
      const empData: EmployerProfile = {
        id: activeUid,
        role: 'employer',
        name: userDisplayName,
        email: userEmail,
        company: profileData.company || 'Global Tech Partners',
        industry: profileData.industry || 'Technology',
        size: profileData.size || '50-200'
      };
      setEmployerProfile(empData);
      localStorage.setItem('elkairon_employer_profile', JSON.stringify(empData));

      if (user) {
        try {
          await setDoc(doc(db, 'employers', user.uid), {
            ...empData,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (err) {
          console.warn('Firestore employer save warning:', err);
        }
      }
    }

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          ...profileData,
          role: newRole,
          name: userDisplayName,
          email: userEmail,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (error) {
        console.warn('Firestore setRole error:', error);
      }
    }
  };

  const updateCandidateProfile = async (updates: Partial<CandidateProfile>) => {
    setCandidateProfile(prev => {
      const updated: CandidateProfile = {
        ...(prev || DEFAULT_SAMPLE_CANDIDATE),
        ...updates
      };
      // Recalculate AI scores and personality archetype if relevant fields change
      updated.aiRecruitmentScore = computeRecruitmentScores(updated);
      if (updated.personalityStyle) {
        const { archetype } = computePersonalityArchetype(updated.personalityStyle as any);
        updated.personalityStyle.archetype = archetype;
      }
      localStorage.setItem('elkairon_candidate_profile', JSON.stringify(updated));
      return updated;
    });

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          ...updates,
          updatedAt: serverTimestamp()
        });
        const candRef = doc(db, 'candidates', user.uid);
        await setDoc(candRef, {
          ...updates,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore updateCandidateProfile error:', err);
      }
    }
  };

  const updateEmployerProfile = async (updates: Partial<EmployerProfile>) => {
    setEmployerProfile(prev => {
      const updated = { ...(prev as EmployerProfile), ...updates };
      localStorage.setItem('elkairon_employer_profile', JSON.stringify(updated));
      return updated;
    });
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          ...updates,
          updatedAt: serverTimestamp()
        });
        const empRef = doc(db, 'employers', user.uid);
        await setDoc(empRef, {
          ...updates,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('Firestore updateEmployerProfile error:', err);
      }
    }
  };

  const loginAsGuestCandidate = () => {
    setIsGuestUser(true);
    setRoleState('candidate');
    const profile = { ...DEFAULT_SAMPLE_CANDIDATE };
    profile.aiRecruitmentScore = computeRecruitmentScores(profile);
    setCandidateProfile(profile);
    setUser({
      uid: profile.id || 'candidate-guest-1',
      email: profile.email || 'blessing.mukamuri@talent.elkairon.com',
      displayName: profile.name || 'Blessing Mukamuri'
    } as any);
    localStorage.setItem('elkairon_role', 'candidate');
    localStorage.setItem('elkairon_candidate_profile', JSON.stringify(profile));
  };

  const loginAsGuestEmployer = () => {
    setIsGuestUser(true);
    setRoleState('employer');
    const profile: EmployerProfile = {
      id: 'guest-emp-1',
      role: 'employer',
      name: 'Elena Rostova',
      email: 'elena@nextgencloud.nl',
      company: 'NextGen Cloud Systems B.V.',
      industry: 'Technology',
      size: '250-500 employees',
      phone: '+31 20 555 0192',
      country: 'Netherlands'
    };
    setEmployerProfile(profile);
    setUser({
      uid: profile.id || 'employer-guest-1',
      email: profile.email || 'elena@nextgencloud.nl',
      displayName: 'Elena Rostova'
    } as any);
    localStorage.setItem('elkairon_role', 'employer');
    localStorage.setItem('elkairon_employer_profile', JSON.stringify(profile));
  };

  const loginWithCustomEmail = (customEmail: string, customName?: string, chosenRole: 'candidate' | 'employer' = 'candidate') => {
    setIsGuestUser(true);
    setRoleState(chosenRole);
    localStorage.setItem('elkairon_role', chosenRole);

    const displayName = customName || (customEmail ? customEmail.split('@')[0] : 'User');
    const newUid = `user-${Date.now()}`;

    setUser({
      uid: newUid,
      email: customEmail,
      displayName: displayName
    } as any);

    if (chosenRole === 'candidate') {
      const profile: CandidateProfile = {
        ...DEFAULT_SAMPLE_CANDIDATE,
        id: newUid,
        name: displayName,
        email: customEmail,
        firstName: displayName.split(' ')[0] || 'Candidate',
        lastName: displayName.split(' ').slice(1).join(' ') || 'User',
      };
      profile.aiRecruitmentScore = computeRecruitmentScores(profile);
      setCandidateProfile(profile);
      localStorage.setItem('elkairon_candidate_profile', JSON.stringify(profile));
    } else {
      const profile: EmployerProfile = {
        id: newUid,
        role: 'employer',
        name: displayName,
        email: customEmail,
        company: 'Global Enterprise Partner',
        industry: 'Technology',
        size: '100-500 employees'
      };
      setEmployerProfile(profile);
      localStorage.setItem('elkairon_employer_profile', JSON.stringify(profile));
    }
  };

  const logout = async () => {
    try {
      if (auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    setRoleState(null);
    setCandidateProfile(null);
    setEmployerProfile(null);
    setIsGuestUser(false);
    localStorage.removeItem('elkairon_role');
    localStorage.removeItem('elkairon_candidate_profile');
    localStorage.removeItem('elkairon_employer_profile');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        role,
        candidateProfile,
        employerProfile,
        isGuestUser,
        setRole,
        updateCandidateProfile,
        updateEmployerProfile,
        loginAsGuestCandidate,
        loginAsGuestEmployer,
        loginWithCustomEmail,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
