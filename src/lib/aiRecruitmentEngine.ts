import { CandidateProfile, JobItem, MatchedJobResult, AIRecruitmentScore } from '../types/recruitment';

export function calculateAgeFromDob(dobString?: string): number | undefined {
  if (!dobString) return undefined;
  const birth = new Date(dobString);
  if (isNaN(birth.getTime())) return undefined;
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 0 ? age : undefined;
}

export function computeRecruitmentScores(profile: Partial<CandidateProfile>): AIRecruitmentScore {
  // 1. Profile Completion (0 - 100)
  let completionPoints = 0;
  const totalPoints = 14;

  if (profile.name || (profile.firstName && profile.lastName)) completionPoints += 1;
  if (profile.email) completionPoints += 1;
  if (profile.phone) completionPoints += 1;
  if (profile.dob || profile.age) completionPoints += 1;
  if (profile.countryOfResidence || profile.country) completionPoints += 1;
  if (profile.workAuthorization) completionPoints += 1;
  if (profile.currentJobTitle || profile.industry) completionPoints += 1;
  if (profile.careerLevel || profile.totalYearsOfExperience) completionPoints += 1;
  if (profile.highestDegree || profile.institution) completionPoints += 1;
  if (profile.skills && profile.skills.length >= 3) completionPoints += 1;
  if (profile.certifications && profile.certifications.length >= 1) completionPoints += 1;
  if (profile.languages && profile.languages.length >= 1) completionPoints += 1;
  if (profile.preferredLocations && profile.preferredLocations.length >= 1) completionPoints += 1;
  if (profile.cvUrl || profile.cvName) completionPoints += 1;

  const profileCompletion = Math.min(100, Math.max(35, Math.round((completionPoints / totalPoints) * 100)));

  // 2. AI Match Readiness (0 - 100)
  let readiness = 60;
  if (profile.skills && profile.skills.length >= 4) readiness += 15;
  if (profile.certifications && profile.certifications.length >= 1) readiness += 10;
  if (profile.willingToRelocate && profile.willingToRelocate !== 'No Relocation') readiness += 8;
  if (profile.passportAvailable?.includes('Valid Passport')) readiness += 7;
  const aiMatchReadiness = Math.min(99, Math.max(50, readiness));

  // 3. Resume Quality (0 - 100)
  let resumeQuality = 75;
  if (profile.cvUrl || profile.cvName) resumeQuality += 12;
  if (profile.skillsAssessment && Object.keys(profile.skillsAssessment.categoryRatings).length > 0) resumeQuality += 7;
  const finalResumeQuality = Math.min(98, resumeQuality);

  // 4. Skills Confidence (0 - 100)
  let skillsConf = 70;
  if (profile.skillsAssessment) {
    const ratings = Object.values(profile.skillsAssessment.categoryRatings);
    if (ratings.length > 0) {
      const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
      skillsConf = Math.round((avg / 5) * 40 + 55);
    }
  }
  const skillsConfidence = Math.min(98, Math.max(65, skillsConf));

  // 5. Recruiter Visibility
  let recruiterVisibility: AIRecruitmentScore['recruiterVisibility'] = 'Good';
  if (profileCompletion >= 85 && aiMatchReadiness >= 88) {
    recruiterVisibility = 'Excellent';
  } else if (profileCompletion >= 70 && aiMatchReadiness >= 75) {
    recruiterVisibility = 'Very High';
  } else if (profileCompletion >= 50) {
    recruiterVisibility = 'High';
  }

  return {
    profileCompletion,
    aiMatchReadiness,
    resumeQuality: finalResumeQuality,
    skillsConfidence,
    recruiterVisibility
  };
}

export function computePersonalityArchetype(personality?: Record<string, number>): { archetype: string; summary: string } {
  if (!personality) {
    return {
      archetype: 'Agile Collaborative Problem Solver',
      summary: 'Thrives in fast-paced international environments with high adaptability and independent execution.'
    };
  }

  const { leadTeams = 3, workIndependently = 4, complexProblemSolving = 4, customerInteraction = 3, adaptToChange = 4 } = personality;

  if (leadTeams >= 4 && complexProblemSolving >= 4) {
    return {
      archetype: 'Strategic Engineering Leader',
      summary: 'Excels at orchestrating complex technical initiatives, aligning team goals, and navigating high-stakes deadlines.'
    };
  } else if (complexProblemSolving >= 4 && workIndependently >= 4) {
    return {
      archetype: 'Deep Analytical Specialist',
      summary: 'Excels at autonomous architecture, root-cause troubleshooting, and high-precision systems mastery.'
    };
  } else if (customerInteraction >= 4 && adaptToChange >= 4) {
    return {
      archetype: 'Client-Centric Solutions Consultant',
      summary: 'Bridges technical depth with executive communication, ideal for customer-facing deployment and stakeholder management.'
    };
  }

  return {
    archetype: 'Adaptive Global Professional',
    summary: 'Versatile team player with strong cross-cultural resilience, rapid learning capability, and focus on delivering measurable impact.'
  };
}

export function rankAndMatchJobs(jobs: JobItem[], profile: Partial<CandidateProfile>): MatchedJobResult[] {
  const candidateSkills = (profile.skills || []).map(s => s.toLowerCase());
  const candidateTargetJobs = (profile.preferredJobs || []).map(j => j.toLowerCase());
  const candidateCountries = (profile.preferredLocations || []).map(c => c.toLowerCase());
  const candidateIndustry = (profile.industry || profile.preferredIndustries?.[0] || '').toLowerCase();

  return jobs.map(job => {
    const jobSkills = job.skills.map(s => s.toLowerCase());
    const matchedSkills = job.skills.filter(s => 
      candidateSkills.some(cs => cs.includes(s.toLowerCase()) || s.toLowerCase().includes(cs))
    );
    const missingSkills = job.skills.filter(s => 
      !candidateSkills.some(cs => cs.includes(s.toLowerCase()) || s.toLowerCase().includes(cs))
    );

    // Skills match score (0 - 100)
    let skillsMatch = jobSkills.length > 0 ? Math.round((matchedSkills.length / jobSkills.length) * 100) : 75;
    skillsMatch = Math.min(100, Math.max(40, skillsMatch));

    // Experience match
    let experienceMatch = 85;
    if (profile.careerLevel && job.experience.toLowerCase().includes(profile.careerLevel.toLowerCase().replace(' level', ''))) {
      experienceMatch = 95;
    }

    // Location / Visa match
    let locationMatch = 70;
    const countryHit = job.countries?.some(c => candidateCountries.some(cc => cc.includes(c.toLowerCase()) || c.toLowerCase().includes(cc)));
    if (countryHit || (profile.willingToRelocate && profile.willingToRelocate.includes('Anywhere'))) {
      locationMatch = 98;
    } else if (job.visaSponsorship) {
      locationMatch = 90;
    }

    // Salary match
    let salaryMatch = 88;
    if (profile.salaryExpectations && profile.salaryExpectations.minSalary > 0 && job.minSalaryNum) {
      if (job.minSalaryNum >= profile.salaryExpectations.minSalary * 0.8) {
        salaryMatch = 95;
      }
    }

    // Culture match
    const cultureMatch = 90;

    // Overall weighted score
    const matchPercentage = Math.min(99, Math.round(
      (skillsMatch * 0.40) +
      (experienceMatch * 0.20) +
      (locationMatch * 0.20) +
      (salaryMatch * 0.10) +
      (cultureMatch * 0.10)
    ));

    let aiReasoning = `Strong alignment in ${job.industry} with ${matchedSkills.length} verified technical skills. Relocation support is available.`;
    if (matchPercentage >= 90) {
      aiReasoning = `Top Tier Recommendation: Your skills in ${matchedSkills.slice(0, 3).join(', ') || 'this field'} directly fulfill the requirements. High visa approval probability.`;
    } else if (matchPercentage >= 80) {
      aiReasoning = `High Match: Solid qualification fit. Bridging gaps in ${missingSkills.slice(0, 2).join(', ') || 'specialized toolsets'} will bring this to 95%+.`;
    }

    return {
      ...job,
      matchPercentage,
      matchScoreBreakdown: {
        skillsMatch,
        experienceMatch,
        locationMatch,
        salaryMatch,
        cultureMatch
      },
      matchedSkills,
      missingSkills,
      aiReasoning
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}
