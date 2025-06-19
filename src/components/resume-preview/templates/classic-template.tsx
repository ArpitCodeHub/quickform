"use client";
import * as React from 'react';
import type { ResumeData } from '@/types/resume';
import { Mail, Phone, Linkedin, Github, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, experience, education, skills, customSections } = data;

  const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-xl font-bold text-sky-700 border-b-2 border-sky-700 pb-1 mb-3 font-headline">{children}</h2>
  );

  const ContactIcon: React.FC<{ IconComponent: React.ElementType, text?: string, href?: string, srText: string }> = ({ IconComponent, text, href, srText }) => {
    if (!text) return null;
    const content = <><IconComponent className="w-4 h-4 mr-2 shrink-0" /> {text}</>;
    return (
      <div className="flex items-center text-sm text-gray-700">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-sky-600 transition-colors" aria-label={`${srText}: ${text}`}>
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    );
  };


  return (
    <div className="p-2 md:p-4 bg-white text-gray-800 font-body print:p-0 print:m-0 print:shadow-none print:border-none" style={{ fontFamily: "'PT Sans', sans-serif" }}>
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-sky-800 font-headline" style={{ fontFamily: "'Poppins', sans-serif" }}>{personalDetails.fullName || "Your Name"}</h1>
        {personalDetails.jobTitle && <p className="text-xl text-sky-600 font-headline" style={{ fontFamily: "'Poppins', sans-serif" }}>{personalDetails.jobTitle}</p>}
        <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {personalDetails.email && <ContactIcon IconComponent={Mail} text={personalDetails.email} href={`mailto:${personalDetails.email}`} srText="Email" />}
          {personalDetails.phone && <ContactIcon IconComponent={Phone} text={personalDetails.phone} srText="Phone" />}
          {personalDetails.address && <ContactIcon IconComponent={MapPin} text={personalDetails.address} srText="Location" />}
        </div>
        <div className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1">
          {personalDetails.linkedin && <ContactIcon IconComponent={Linkedin} text="LinkedIn" href={personalDetails.linkedin} srText="LinkedIn Profile" />}
          {personalDetails.github && <ContactIcon IconComponent={Github} text="GitHub" href={personalDetails.github} srText="GitHub Profile" />}
          {personalDetails.portfolio && <ContactIcon IconComponent={Globe} text="Portfolio" href={personalDetails.portfolio} srText="Portfolio Website" />}
        </div>
      </header>

      {/* Summary */}
      {personalDetails.summary && (
        <section className="mb-4">
          <SectionTitle>Summary</SectionTitle>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{personalDetails.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-3">
              <h3 className="text-lg font-semibold text-gray-700">{exp.jobTitle || "Job Title"}</h3>
              <p className="text-md font-medium text-sky-700">{exp.company || "Company Name"}</p>
              <p className="text-xs text-gray-500 mb-1">
                {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
              </p>
              <div className="text-sm leading-relaxed whitespace-pre-wrap ml-2 pl-2 border-l-2 border-gray-200">
                {exp.description}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Education</SectionTitle>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <h3 className="text-lg font-semibold text-gray-700">{edu.degree || "Degree / Certificate"}</h3>
              <p className="text-md font-medium text-sky-700">{edu.institution || "Institution Name"}</p>
              <p className="text-xs text-gray-500 mb-1">
                {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
              </p>
              {edu.details && <p className="text-sm leading-relaxed whitespace-pre-wrap">{edu.details}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <SectionTitle>Skills</SectionTitle>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill.id} className="bg-sky-100 text-sky-800 text-sm px-3 py-1 rounded-full">
                {skill.name}{skill.level && ` (${skill.level})`}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && customSections.map((section) => (
        section.title && section.content && (
          <section key={section.id} className="mb-4">
            <SectionTitle>{section.title}</SectionTitle>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{section.content}</p>
          </section>
        )
      ))}
    </div>
  );
};

export default ClassicTemplate;
