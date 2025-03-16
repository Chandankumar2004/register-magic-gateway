
export interface ResumeData {
  name: string;
  size: number;
  type: string;
  date: string;
}

export const saveResume = (resumeData: ResumeData): void => {
  try {
    localStorage.setItem('userResume', JSON.stringify(resumeData));
    console.log('Resume data saved successfully');
  } catch (error) {
    console.error('Error saving resume data:', error);
  }
};

export const getResume = (): ResumeData | null => {
  try {
    const resumeJSON = localStorage.getItem('userResume');
    if (!resumeJSON) return null;
    
    return JSON.parse(resumeJSON) as ResumeData;
  } catch (error) {
    console.error('Error retrieving resume data:', error);
    return null;
  }
};

export const hasUploadedResume = (): boolean => {
  return !!localStorage.getItem('userResume');
};

export const getMaxResumeSize = (): number => {
  return 10 * 1024 * 1024; // 10MB in bytes
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
};

export const deleteResume = (): void => {
  try {
    localStorage.removeItem('userResume');
    console.log('Resume data deleted successfully');
  } catch (error) {
    console.error('Error deleting resume data:', error);
  }
};
