"use client";
import * as React from 'react';
import type { PersonalDetails } from '@/types/resume';
import { FormField } from './form-helpers';

interface PersonalDetailsFormProps {
  data: PersonalDetails;
  onChange: (updatedData: PersonalDetails) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalDetails, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <FormField
        id="fullName"
        label="Full Name"
        value={data.fullName}
        onChange={(val) => handleChange('fullName', val)}
        placeholder="e.g., Jane Doe"
      />
      <FormField
        id="jobTitle"
        label="Target Job Title"
        value={data.jobTitle}
        onChange={(val) => handleChange('jobTitle', val)}
        placeholder="e.g., Software Engineer"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="email"
          label="Email"
          type="email"
          value={data.email}
          onChange={(val) => handleChange('email', val)}
          placeholder="e.g., jane.doe@example.com"
        />
        <FormField
          id="phone"
          label="Phone Number"
          type="tel"
          value={data.phone}
          onChange={(val) => handleChange('phone', val)}
          placeholder="e.g., (123) 456-7890"
        />
      </div>
      <FormField
        id="address"
        label="Address / Location"
        value={data.address}
        onChange={(val) => handleChange('address', val)}
        placeholder="e.g., City, State"
      />
      <FormField
        id="summary"
        label="Professional Summary"
        value={data.summary}
        onChange={(val) => handleChange('summary', val)}
        placeholder="A brief overview of your skills and experience..."
        isTextarea
        canEnhance
        sectionIdentifier="summary"
      />
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
            id="linkedin"
            label="LinkedIn Profile URL (Optional)"
            value={data.linkedin || ''}
            onChange={(val) => handleChange('linkedin', val)}
            placeholder="e.g., linkedin.com/in/janedoe"
        />
        <FormField
            id="github"
            label="GitHub Profile URL (Optional)"
            value={data.github || ''}
            onChange={(val) => handleChange('github', val)}
            placeholder="e.g., github.com/janedoe"
        />
      </div>
      <FormField
          id="portfolio"
          label="Portfolio URL (Optional)"
          value={data.portfolio || ''}
          onChange={(val) => handleChange('portfolio', val)}
          placeholder="e.g., janedoe.com"
      />
    </div>
  );
};

export default PersonalDetailsForm;
