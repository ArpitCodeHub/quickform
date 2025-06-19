
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
  const [baseTheme, setBaseThemeState] = useState<BaseTheme>('dark'); // Changed default to 'dark'
  const [applyGlassmorphism, setApplyGlassmorphismState] = useState<boolean>(false);
  const [resumeTemplate, setResumeTemplateState] = useState<ResumeTemplateKey>('classic');
  const [resumeData, setResumeDataState] = useState<ResumeData>(() => {
    // Initialize with a deep copy of defaultResumeData to avoid potential mutation issues
    // localStorage will override this in the useEffect below if data exists
    return JSON.parse(JSON.stringify(defaultResumeData));
  });
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
          else setBaseThemeState('dark'); // Ensure default is dark if nothing in localStorage
          if (storedGlass) setApplyGlassmorphismState(storedGlass === 'true');
          if (storedTemplate) setResumeTemplateState(storedTemplate);
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            // Basic validation for parsedData
            if (parsedData && typeof parsedData === 'object' && parsedData.personalDetails) {
              setResumeDataState(parsedData);
            } else {
              // If data is invalid, remove it and stick to default
              localStorage.removeItem('rf-resumeData');
              setResumeDataState(JSON.parse(JSON.stringify(defaultResumeData)));
            }
          } else {
             // No stored data, ensure it's the default (already set by useState initialiser, but for clarity)
             setResumeDataState(JSON.parse(JSON.stringify(defaultResumeData)));
          }
        }
      } catch (error) {
        console.error("Error loading settings from localStorage:", error);
        // In case of error, ensure app falls back to defaults and removes potentially corrupt data
        localStorage.removeItem('rf-resumeData');
        if (isMounted) {
            setResumeDataState(JSON.parse(JSON.stringify(defaultResumeData)));
        }
      } finally {
        if (isMounted) {
            setIsLoading(false);
        }
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
      return updatedData;
    });
  }, []);
  
  // Effect to persist resumeData to localStorage when it changes and not loading
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('rf-resumeData', JSON.stringify(resumeData));
    }
  }, [resumeData, isLoading]);

  const resetResumeData = useCallback(() => {
    // Ensure a new object reference for defaultResumeData to trigger state update correctly
    setResumeDataState(JSON.parse(JSON.stringify(defaultResumeData)));
    // The useEffect above will handle persisting this reset state to localStorage
  }, []);

  return {
    baseTheme, setBaseTheme,
    applyGlassmorphism, setApplyGlassmorphism,
    resumeTemplate, setResumeTemplate,
    resumeData, setResumeData,
    isLoadingAppSettings: isLoading,
    resetResumeData,
  };
}
