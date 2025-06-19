"use client";
import * as React from 'react';
import type { ExperienceEntry } from '@/types/resume';
import { FormField, ArraySection, generateId } from './form-helpers';

interface ExperienceFormProps {
  data: ExperienceEntry[];
  onChange: (updatedData: ExperienceEntry[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const handleAddItem = () => {
    onChange([
      ...data,
      { id: generateId(), jobTitle: '', company: '', startDate: '', endDate: '', description: '' },
    ]);
  };

  const handleChangeItem = (index: number, updatedItem: ExperienceEntry) => {
    const newData = [...data];
    newData[index] = updatedItem;
    onChange(newData);
  };

  const handleRemoveItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const renderExperienceItem = (
    item: ExperienceEntry,
    index: number,
    onChangeItemCallback: (idx: number, updatedItm: ExperienceEntry) => void
  ) => {
    const handleChange = (field: keyof ExperienceEntry, value: string) => {
      onChangeItemCallback(index, { ...item, [field]: value });
    };

    return (
      <div className="space-y-4">
        <FormField
          id={`exp-jobTitle-${item.id}`}
          label="Job Title"
          value={item.jobTitle}
          onChange={(val) => handleChange('jobTitle', val)}
          placeholder="e.g., Senior Developer"
        />
        <FormField
          id={`exp-company-${item.id}`}
          label="Company"
          value={item.company}
          onChange={(val) => handleChange('company', val)}
          placeholder="e.g., Tech Solutions Inc."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id={`exp-startDate-${item.id}`}
            label="Start Date"
            type="text" 
            value={item.startDate}
            onChange={(val) => handleChange('startDate', val)}
            placeholder="e.g., Jan 2020 or 2020-01"
          />
          <FormField
            id={`exp-endDate-${item.id}`}
            label="End Date"
            type="text"
            value={item.endDate}
            onChange={(val) => handleChange('endDate', val)}
            placeholder="e.g., Dec 2022 or Present"
          />
        </div>
        <FormField
          id={`exp-description-${item.id}`}
          label="Description & Responsibilities"
          value={item.description}
          onChange={(val) => handleChange('description', val)}
          placeholder="Describe your role and achievements..."
          isTextarea
          canEnhance
          sectionIdentifier="experienceEntryDescription"
          fieldKey={item.jobTitle || `Experience ${index + 1}`}
        />
      </div>
    );
  };

  return (
    <ArraySection
      title="Work Experience"
      items={data}
      renderItem={renderExperienceItem}
      onAddItem={handleAddItem}
      onChangeItem={handleChangeItem}
      onRemoveItem={handleRemoveItem}
      addText="Add Experience"
    />
  );
};

export default ExperienceForm;
