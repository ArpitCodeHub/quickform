
export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface ExperienceEntry {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string; 
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  details?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: Skill[];
  customSections: CustomSection[];
}

export type ResumeSectionKey = keyof ResumeData;

// Removed AiEnhanceableSection type

export type BaseTheme = 'light' | 'dark';
export type ResumeTemplateKey = 'classic' | 'modern' | 'creative';
