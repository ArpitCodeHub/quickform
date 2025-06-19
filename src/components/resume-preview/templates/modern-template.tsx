"use client";
import * as React from 'react';
import type { ResumeData } from '@/types/resume';
import { Mail, Phone, Linkedin, Github, Globe, MapPin, CalendarDays, Briefcase, GraduationCap, Zap } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalDetails, experience, education, skills, customSections } = data;

  const ContactInfo: React.FC<{ icon: React.ElementType, text?: string, href?: string, srText: string }> = ({ icon: Icon, text, href, srText }) => {
    if (!text) return null;
    const content = <><Icon className="w-3.5 h-3.5 mr-1.5 text-primary" />{text}</>;
    return (
      <div className="flex items-center text-xs">
        {href ? <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-accent transition-colors" aria-label={`${srText}: ${text}`}>{content}</a> : content}
      </div>
    );
  };

  const Section: React.FC<{ title: string, icon: React.ElementType, children: React.ReactNode }> = ({ title, icon: Icon, children }) => (
    <section className="mb-5">
      <h2 className="flex items-center text-lg font-semibold text-primary mb-2 font-headline">
        <Icon className="w-5 h-5 mr-2" />
        {title}
      </h2>
      <div className="ml-7 space-y-3 text-sm">
        {children}
      </div>
    </section>
  );

  return (
    <div className="p-2 md:p-4 bg-white text-gray-700 font-body print:p-0 print:m-0 print:shadow-none print:border-none">
      {/* Header */}
      <header className="mb-6 p-4 bg-primary/10 rounded-lg">
        <h1 className="text-3xl font-bold text-primary font-headline">{personalDetails.fullName || "Your Name"}</h1>
        {personalDetails.jobTitle && <p className="text-lg text-accent font-medium font-headline">{personalDetails.jobTitle}</p>}
        
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-1.5 text-gray-600">
          {personalDetails.email && <ContactInfo icon={Mail} text={personalDetails.email} href={`mailto:${personalDetails.email}`} srText="Email"/>}
          {personalDetails.phone && <ContactInfo icon={Phone} text={personalDetails.phone} srText="Phone"/>}
          {personalDetails.address && <ContactInfo icon={MapPin} text={personalDetails.address} srText="Location" />}
          {personalDetails.linkedin && <ContactInfo icon={Linkedin} text="LinkedIn" href={personalDetails.linkedin} srText="LinkedIn"/>}
          {personalDetails.github && <ContactInfo icon={Github} text="GitHub" href={personalDetails.github} srText="Github"/>}
          {personalDetails.portfolio && <ContactInfo icon={Globe} text="Portfolio" href={personalDetails.portfolio} srText="Portfolio"/>}
        </div>
      </header>

      {/* Summary */}
      {personalDetails.summary && (
        <section className="mb-5 p-3 border-l-4 border-accent bg-accent/5 rounded-r-md">
           <h2 className="text-lg font-semibold text-accent mb-1 font-headline">
             Professional Summary
           </h2>
          <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-600">{personalDetails.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Work Experience" icon={Briefcase}>
          {experience.map((exp) => (
            <div key={exp.id} className="pb-2 border-b border-gray-200 last:border-b-0">
              <h3 className="text-base font-semibold text-gray-800">{exp.jobTitle || "Job Title"}</h3>
              <p className="text-sm font-medium text-primary">{exp.company || "Company Name"}</p>
              <p className="text-xs text-gray-500 mb-1 flex items-center">
                <CalendarDays className="w-3 h-3 mr-1"/> {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
              </p>
              <div className="text-xs leading-normal whitespace-pre-wrap text-gray-600">
                {exp.description}
              </div>
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education" icon={GraduationCap}>
          {education.map((edu) => (
            <div key={edu.id} className="pb-2 border-b border-gray-200 last:border-b-0">
              <h3 className="text-base font-semibold text-gray-800">{edu.degree || "Degree / Certificate"}</h3>
              <p className="text-sm font-medium text-primary">{edu.institution || "Institution Name"}</p>
              <p className="text-xs text-gray-500 mb-1 flex items-center">
                <CalendarDays className="w-3 h-3 mr-1"/> {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
              </p>
              {edu.details && <p className="text-xs leading-normal whitespace-pre-wrap text-gray-600">{edu.details}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills" icon={Zap}>
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <li key={skill.id} className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-md font-medium">
                {skill.name}{skill.level && <span className="text-primary/70"> ({skill.level.charAt(0)})</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}
      
      {/* Custom Sections */}
      {customSections && customSections.length > 0 && customSections.map((section) => (
        section.title && section.content && (
           <Section title={section.title} icon={Briefcase} key={section.id}> {/* Using Briefcase as a generic icon, can be changed */}
            <p className="text-xs leading-normal whitespace-pre-wrap text-gray-600">{section.content}</p>
          </Section>
        )
      ))}
    </div>
  );
};

export default ModernTemplate;
