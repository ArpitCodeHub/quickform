"use client";
import * as React from 'react';
import type { ResumeData } from '@/types/resume';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PersonalDetailsForm from './personal-details-form';
import ExperienceForm from './experience-form';
import EducationForm from './education-form';
import SkillsForm from './skills-form';
import CustomSectionsForm from './custom-sections-form'; // Import the new component
import { User, Briefcase, GraduationCap, Star, Edit3 } from 'lucide-react'; // Added Edit3 for custom sections

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: (updatedData: ResumeData | ((prev: ResumeData) => ResumeData)) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
  const handlePersonalDetailsChange = (updatedPersonalDetails: ResumeData['personalDetails']) => {
    setResumeData(prev => ({ ...prev, personalDetails: updatedPersonalDetails }));
  };

  const handleExperienceChange = (updatedExperience: ResumeData['experience']) => {
    setResumeData(prev => ({ ...prev, experience: updatedExperience }));
  };

  const handleEducationChange = (updatedEducation: ResumeData['education']) => {
    setResumeData(prev => ({ ...prev, education: updatedEducation }));
  };

  const handleSkillsChange = (updatedSkills: ResumeData['skills']) => {
    setResumeData(prev => ({ ...prev, skills: updatedSkills }));
  };

  const handleCustomSectionsChange = (updatedCustomSections: ResumeData['customSections']) => {
    setResumeData(prev => ({ ...prev, customSections: updatedCustomSections }));
  };

  return (
    <Accordion type="multiple" defaultValue={['personal-details']} className="w-full space-y-4">
      <AccordionItem value="personal-details" className="border-b-0 rounded-lg overflow-hidden shadow-sm bg-card">
        <AccordionTrigger className="px-6 py-4 text-lg font-headline hover:no-underline data-[state=open]:bg-primary/10">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" /> Personal Details
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 border-t border-border/50">
          <PersonalDetailsForm data={resumeData.personalDetails} onChange={handlePersonalDetailsChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="experience" className="border-b-0 rounded-lg overflow-hidden shadow-sm bg-card">
        <AccordionTrigger className="px-6 py-4 text-lg font-headline hover:no-underline data-[state=open]:bg-primary/10">
          <div className="flex items-center gap-3">
            <Briefcase className="h-5 w-5 text-primary" /> Work Experience
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 border-t border-border/50">
          <ExperienceForm data={resumeData.experience} onChange={handleExperienceChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="education" className="border-b-0 rounded-lg overflow-hidden shadow-sm bg-card">
        <AccordionTrigger className="px-6 py-4 text-lg font-headline hover:no-underline data-[state=open]:bg-primary/10">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-primary" /> Education
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 border-t border-border/50">
          <EducationForm data={resumeData.education} onChange={handleEducationChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="skills" className="border-b-0 rounded-lg overflow-hidden shadow-sm bg-card">
        <AccordionTrigger className="px-6 py-4 text-lg font-headline hover:no-underline data-[state=open]:bg-primary/10">
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-primary" /> Skills
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 border-t border-border/50">
          <SkillsForm data={resumeData.skills} onChange={handleSkillsChange} />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="custom-sections" className="border-b-0 rounded-lg overflow-hidden shadow-sm bg-card">
        <AccordionTrigger className="px-6 py-4 text-lg font-headline hover:no-underline data-[state=open]:bg-primary/10">
          <div className="flex items-center gap-3">
            <Edit3 className="h-5 w-5 text-primary" /> Custom Sections
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-4 border-t border-border/50">
          <CustomSectionsForm data={resumeData.customSections || []} onChange={handleCustomSectionsChange} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ResumeForm;
