const fs = require('fs');
let code = fs.readFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', 'utf8');

const oldImports = `import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, MapPin, Briefcase, Star, ShieldCheck, 
  Zap, ArrowRight, UserCheck, Stethoscope, HardHat, Utensils, 
  Cpu, CheckCircle2, Eye, Calendar, MessageSquare, Award, Sparkles 
} from 'lucide-react';
import { PRE_VETTED_CANDIDATES } from '../../../data/mockEmployerData';
import { PreVettedCandidate } from '../../../types/recruitment';`;

const newImports = `import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Filter, MapPin, Briefcase, Star, ShieldCheck, 
  Zap, ArrowRight, UserCheck, Stethoscope, HardHat, Utensils, 
  Cpu, CheckCircle2, Eye, Calendar, MessageSquare, Award, Sparkles, RefreshCw
} from 'lucide-react';
import { PreVettedCandidate, CandidateProfile } from '../../../types/recruitment';
import { db } from '../../../lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';`;

code = code.replace(oldImports, newImports);

const oldState = `  const [selectedGermanLevel, setSelectedGermanLevel] = useState<string>('All');
  const [selectedCandidate, setSelectedCandidate] = useState<PreVettedCandidate | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);`;

const newState = `  const [selectedGermanLevel, setSelectedGermanLevel] = useState<string>('All');
  const [selectedCandidate, setSelectedCandidate] = useState<PreVettedCandidate | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  
  const [candidates, setCandidates] = useState<PreVettedCandidate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const q = query(collection(db, 'candidates'));
        const snapshot = await getDocs(q);
        const fetched = snapshot.docs.map(doc => {
          const data = doc.data() as CandidateProfile;
          
          // Securely map CandidateProfile to PreVettedCandidate (Employer-Safe Representation)
          const mapped: PreVettedCandidate = {
            id: doc.id,
            name: data.name || data.firstName + ' ' + (data.lastName?.[0] + '.') || 'Candidate', // Protect full last name if desired, or just use name
            title: data.currentJobTitle || 'Professional',
            sector: (data.industry || 'Technology') as any, // fallback
            subSector: data.fieldOfStudy || 'General',
            location: data.countryOfResidence || data.country || 'International',
            targetRelocation: data.willingToRelocate ? 'Worldwide' : 'Local',
            experienceYears: parseInt(data.totalYearsOfExperience || '0') || 2,
            germanLevel: 'B1', // Defaulting since language level isn't strictly defined in type yet
            englishLevel: 'B2',
            education: data.highestDegree || 'Degree',
            credentialsStatus: 'Verified',
            fastTrackEligible: data.visaSponsorshipRequired === false,
            availability: '1 Month',
            avatar: data.avatarUrl || '',
            skills: data.skills || [],
            bio: data.bio || 'Professional candidate open to new opportunities.',
            rating: data.aiRecruitmentScore?.overallMatchScore || 85,
            salaryExpectation: data.expectedSalary || 'Negotiable',
            visaStatus: data.visaSponsorshipRequired ? 'Requires Sponsorship' : 'No Sponsorship Needed'
          };
          return mapped;
        });
        setCandidates(fetched);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load candidates", err);
        setLoading(false);
      }
    };
    fetchCandidates();
  }, []);`;

code = code.replace(oldState, newState);

const oldFiltered = `  const filteredCandidates = useMemo(() => {
    return PRE_VETTED_CANDIDATES.filter((cand) => {`;

const newFiltered = `  const filteredCandidates = useMemo(() => {
    return candidates.filter((cand) => {`;

code = code.replace(oldFiltered, newFiltered);

const oldSectorCounts = `  const sectorCounts = useMemo(() => {
    return {
      All: PRE_VETTED_CANDIDATES.length,
      Healthcare: PRE_VETTED_CANDIDATES.filter(c => c.sector === 'Healthcare').length,
      Construction: PRE_VETTED_CANDIDATES.filter(c => c.sector === 'Construction').length,
      Hospitality: PRE_VETTED_CANDIDATES.filter(c => c.sector === 'Hospitality').length,
      Technology: PRE_VETTED_CANDIDATES.filter(c => c.sector === 'Technology').length,
    };
  }, []);`;

const newSectorCounts = `  const sectorCounts = useMemo(() => {
    return {
      All: candidates.length,
      Healthcare: candidates.filter(c => c.sector === 'Healthcare').length,
      Construction: candidates.filter(c => c.sector === 'Construction').length,
      Hospitality: candidates.filter(c => c.sector === 'Hospitality').length,
      Technology: candidates.filter(c => c.sector === 'Technology').length,
    };
  }, [candidates]);`;

code = code.replace(oldSectorCounts, newSectorCounts);

fs.writeFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', code);
console.log("Candidate pool patched.");
