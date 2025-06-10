
export interface ResumeProfile {
  skills: string[];
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  preferredRoles: string[];
  education: string[];
  yearsOfExperience: number;
}

export const analyzeResume = (resumeText: string): ResumeProfile => {
  const text = resumeText.toLowerCase();
  
  // Extract skills from common technology keywords
  const skillKeywords = [
    'react', 'angular', 'vue', 'javascript', 'typescript', 'node.js', 'python',
    'java', 'c#', 'php', 'ruby', 'go', 'swift', 'kotlin', 'flutter', 'react native',
    'html', 'css', 'sass', 'tailwind', 'bootstrap', 'jquery', 'redux', 'graphql',
    'rest api', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch',
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'github',
    'agile', 'scrum', 'devops', 'ci/cd', 'terraform', 'ansible', 'linux',
    'machine learning', 'ai', 'data science', 'tensorflow', 'pytorch', 'pandas',
    'figma', 'sketch', 'adobe', 'photoshop', 'illustrator', 'ui/ux', 'design',
    'project management', 'leadership', 'team lead', 'communication', 'problem solving'
  ];

  const skills = skillKeywords.filter(skill => text.includes(skill));

  // Determine experience level based on keywords and patterns
  let experienceLevel: 'entry' | 'mid' | 'senior' | 'executive' = 'entry';
  const seniorKeywords = ['senior', 'lead', 'principal', 'architect', 'manager'];
  const midKeywords = ['3 years', '4 years', '5 years', 'intermediate'];
  const executiveKeywords = ['director', 'vp', 'cto', 'ceo', 'executive'];

  if (executiveKeywords.some(keyword => text.includes(keyword))) {
    experienceLevel = 'executive';
  } else if (seniorKeywords.some(keyword => text.includes(keyword))) {
    experienceLevel = 'senior';
  } else if (midKeywords.some(keyword => text.includes(keyword))) {
    experienceLevel = 'mid';
  }

  // Extract years of experience
  const yearMatches = text.match(/(\d+)\s*years?\s*(of\s*)?experience/);
  const yearsOfExperience = yearMatches ? parseInt(yearMatches[1]) : 0;

  // Extract preferred roles
  const roleKeywords = [
    'frontend developer', 'backend developer', 'full stack developer',
    'mobile developer', 'ios developer', 'android developer',
    'data scientist', 'machine learning engineer', 'devops engineer',
    'ui/ux designer', 'product manager', 'project manager',
    'software engineer', 'web developer', 'qa engineer'
  ];

  const preferredRoles = roleKeywords.filter(role => text.includes(role));

  // Extract education
  const educationKeywords = [
    'bachelor', 'master', 'phd', 'doctorate', 'computer science',
    'engineering', 'information technology', 'software engineering'
  ];

  const education = educationKeywords.filter(edu => text.includes(edu));

  return {
    skills,
    experienceLevel,
    preferredRoles,
    education,
    yearsOfExperience
  };
};

export const getResumeProfile = (): ResumeProfile | null => {
  try {
    const resumeData = localStorage.getItem('userResume');
    if (!resumeData) return null;

    const parsed = JSON.parse(resumeData);
    // For demo purposes, we'll use a mock analysis
    // In a real app, you'd extract text from the uploaded file
    return {
      skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'],
      experienceLevel: 'mid',
      preferredRoles: ['Frontend Developer', 'Full Stack Developer'],
      education: ['Computer Science', 'Bachelor'],
      yearsOfExperience: 4
    };
  } catch (error) {
    console.error('Error getting resume profile:', error);
    return null;
  }
};
