"use client";
import { useState, useEffect, useCallback } from 'react';
import type { ResumeData, BaseTheme, ResumeTemplateKey, PersonalDetails, ExperienceEntry, EducationEntry, Skill, CustomSection } from '@/types/resume';

const defaultPersonalDetails: PersonalDetails = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  linkedin: '',
  github: '',
  portfolio: '',
};

export const defaultResumeData: ResumeData = {
  personalDetails: defaultPersonalDetails,
  experience: [],
  education: [],
  skills: [],
  customSections: [],
};

export function useAppSettings() {
  const [baseTheme, setBaseThemeState] = useState<BaseTheme>('light');
  const [applyGlassmorphism, setApplyGlassmorphismState] = useState<boolean>(false);
  const [resumeTemplate, setResumeTemplateState] = useState<ResumeTemplateKey>('classic');
  const [resumeData, setResumeDataState] = useState<ResumeData>(defaultResumeData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadSettings = () => {
      try {
        const storedBaseTheme = localStorage.getItem('rf-baseTheme') as BaseTheme | null;
        const storedGlass = localStorage.getItem('rf-applyGlassmorphism');
        const storedTemplate = localStorage.getItem('rf-resumeTemplate') as ResumeTemplateKey | null;
        const storedData = localStorage.getItem('rf-resumeData');

        if (isMounted) {
          if (storedBaseTheme) setBaseThemeState(storedBaseTheme);
          if (storedGlass) setApplyGlassmorphismState(storedGlass === 'true');
          if (storedTemplate) setResumeTemplateState(storedTemplate);
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (parsedData && typeof parsedData.personalDetails === 'object') {
              setResumeDataState(parsedData);
            } else {
              localStorage.removeItem('rf-resumeData');
            }
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error loading settings from localStorage:", error);
        if (isMounted) setIsLoading(false); // Still finish loading state even if error
      }
    };
    
    loadSettings();
    
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    localStorage.setItem('rf-baseTheme', baseTheme);
    localStorage.setItem('rf-applyGlassmorphism', String(applyGlassmorphism));
    localStorage.setItem('rf-resumeTemplate', resumeTemplate);

    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(baseTheme);
    if (applyGlassmorphism) {
      document.documentElement.classList.add('glassmorphism-active');
    } else {
      document.documentElement.classList.remove('glassmorphism-active');
    }
  }, [baseTheme, applyGlassmorphism, resumeTemplate, isLoading]);

  const setBaseTheme = useCallback((theme: BaseTheme) => {
    setBaseThemeState(theme);
  }, []);

  const setApplyGlassmorphism = useCallback((apply: boolean) => {
    setApplyGlassmorphismState(apply);
  }, []);

  const setResumeTemplate = useCallback((template: ResumeTemplateKey) => {
    setResumeTemplateState(template);
  }, []);

  const setResumeData = useCallback((newData: ResumeData | ((prevData: ResumeData) => ResumeData)) => {
    setResumeDataState(prevData => {
      const updatedData = typeof newData === 'function' ? newData(prevData) : newData;
      if (!isLoading) { // Only save if not in initial loading phase & after initial data has been set
        localStorage.setItem('rf-resumeData', JSON.stringify(updatedData));
      }
      return updatedData;
    });
  }, [isLoading]);
  
  const resetResumeData = useCallback(() => {
    setResumeData(defaultResumeData);
    localStorage.setItem('rf-resumeData', JSON.stringify(defaultResumeData)); // Ensure reset is persisted
  }, [setResumeData]);

  return {
    baseTheme, setBaseTheme,
    applyGlassmorphism, setApplyGlassmorphism,
    resumeTemplate, setResumeTemplate,
    resumeData, setResumeData,
    isLoadingAppSettings: isLoading,
    resetResumeData,
  };
}
