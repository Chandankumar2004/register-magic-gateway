
import { ResumeProfile } from './resumeAnalysis';

export interface JobMatch {
  jobId: number;
  matchScore: number;
  matchReasons: string[];
  skillMatches: string[];
  experienceMatch: boolean;
}

export const calculateJobMatch = (job: any, profile: ResumeProfile): JobMatch => {
  let matchScore = 0;
  const matchReasons: string[] = [];
  const skillMatches: string[] = [];

  // Skills matching (40% of total score)
  if (job.skills && profile.skills) {
    const jobSkills = job.skills.map((skill: string) => skill.toLowerCase());
    const profileSkills = profile.skills.map(skill => skill.toLowerCase());
    
    const commonSkills = jobSkills.filter((skill: string) => 
      profileSkills.some(pSkill => pSkill.includes(skill) || skill.includes(pSkill))
    );
    
    skillMatches.push(...commonSkills);
    const skillMatchRatio = commonSkills.length / Math.max(jobSkills.length, 1);
    matchScore += skillMatchRatio * 40;

    if (commonSkills.length > 0) {
      matchReasons.push(`${commonSkills.length} matching skills: ${commonSkills.slice(0, 3).join(', ')}`);
    }
  }

  // Experience level matching (25% of total score)
  const experienceMatch = checkExperienceMatch(job, profile);
  if (experienceMatch) {
    matchScore += 25;
    matchReasons.push('Experience level matches job requirements');
  }

  // Role preference matching (20% of total score)
  if (profile.preferredRoles.length > 0) {
    const roleMatch = profile.preferredRoles.some(role => 
      job.title.toLowerCase().includes(role.toLowerCase().replace(' developer', '').replace(' engineer', ''))
    );
    if (roleMatch) {
      matchScore += 20;
      matchReasons.push('Job title matches your preferred roles');
    }
  }

  // Salary expectation (10% of total score)
  if (job.salary) {
    matchScore += 10; // Assuming salary is always acceptable for demo
    matchReasons.push('Salary range is competitive');
  }

  // Location preference (5% of total score)
  if (job.location === 'Remote' || job.location.includes('Remote')) {
    matchScore += 5;
    matchReasons.push('Remote work available');
  }

  return {
    jobId: job.id,
    matchScore: Math.round(matchScore),
    matchReasons,
    skillMatches,
    experienceMatch
  };
};

const checkExperienceMatch = (job: any, profile: ResumeProfile): boolean => {
  const jobTitle = job.title.toLowerCase();
  
  // Extract experience requirements from job title
  if (jobTitle.includes('senior') || jobTitle.includes('lead')) {
    return profile.experienceLevel === 'senior' || profile.experienceLevel === 'executive';
  }
  
  if (jobTitle.includes('junior') || jobTitle.includes('entry')) {
    return profile.experienceLevel === 'entry';
  }
  
  // Mid-level positions
  return profile.experienceLevel === 'mid' || profile.experienceLevel === 'senior';
};

export const getMatchedJobs = (jobs: any[], profile: ResumeProfile, minScore: number = 30) => {
  return jobs
    .map(job => ({
      ...job,
      match: calculateJobMatch(job, profile)
    }))
    .filter(job => job.match.matchScore >= minScore)
    .sort((a, b) => b.match.matchScore - a.match.matchScore);
};
