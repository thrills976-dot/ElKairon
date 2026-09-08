const fs = require('fs');
let code = fs.readFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', 'utf8');

const target = `          const mapped: PreVettedCandidate = {
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
          };`;

const replacement = `          const mapped: PreVettedCandidate = {
            id: doc.id,
            name: data.name || (data.firstName && data.lastName ? data.firstName + ' ' + data.lastName[0] + '.' : 'Candidate'), // Protect full last name
            title: data.currentJobTitle || 'Professional',
            sector: (data.industry || 'Technology') as any,
            subSector: data.fieldOfStudy || 'General',
            location: data.countryOfResidence || data.country || 'International',
            targetRelocation: data.willingToRelocate ? 'Worldwide' : 'Local',
            experienceYears: parseInt(data.totalYearsOfExperience || data.yearsOfExperience || '0') || 2,
            germanLevel: 'B1', // Default
            englishLevel: 'B2', // Default
            education: data.highestDegree || 'Degree',
            credentialsStatus: 'Verified',
            fastTrackEligible: data.workAuthorization === 'EU Citizen', // Safe mapping
            availability: '1 Month',
            avatar: data.avatarUrl || '',
            skills: data.skills || [],
            bio: 'Professional candidate actively open to new opportunities.', // Fallback string
            rating: data.aiRecruitmentScore?.aiMatchReadiness || 85,
            salaryExpectation: 'Negotiable', // Fallback string
            visaStatus: data.workAuthorization !== 'EU Citizen' ? 'Requires Sponsorship' : 'No Sponsorship Needed',
            documentsReady: true // Required by PreVettedCandidate
          };`;

code = code.replace(target, replacement);
fs.writeFileSync('src/components/portal/employer/CandidatePoolBrowser.tsx', code);
