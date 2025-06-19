"use client";
import * as React from 'react';
import type { ResumeData, ResumeTemplateKey } from '@/types/resume';
import ClassicTemplate from './templates/classic-template';
import ModernTemplate from './templates/modern-template';
// Import other templates here:
// import CreativeTemplate from './templates/creative-template';

interface ResumePreviewProps {
  resumeData: ResumeData;
  templateKey: ResumeTemplateKey;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, templateKey }) => {
  const renderTemplate = () => {
    switch (templateKey) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      // case 'creative':
      //   return <CreativeTemplate data={resumeData} />;
      default:
        // Fallback to classic template if an unknown key is provided
        return <ClassicTemplate data={resumeData} />;
    }
  };

  return (
    // This outer div is for styling the container in the UI (e.g. scroll, aspect ratio)
    // The inner div with id="resume-preview-printable" is what gets printed/exported.
    <div 
      className="bg-gray-100 p-2 md:p-4 rounded-md h-full overflow-y-auto"
      style={{ aspectRatio: '8.5 / 11' }} // A4-like aspect ratio for preview
    >
      <div id="resume-preview-printable" className="bg-white text-black shadow-lg w-full h-full print:shadow-none print:border-none">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;
