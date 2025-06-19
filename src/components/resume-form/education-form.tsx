"use client";
import * as React from 'react';
import type { EducationEntry } from '@/types/resume';
import { FormField, ArraySection, generateId } from './form-helpers';

interface EducationFormProps {
  data: EducationEntry[];
  onChange: (updatedData: EducationEntry[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const handleAddItem = () => {
    onChange([
      ...data,
      { id: generateId(), degree: '', institution: '', startDate: '', endDate: '', details: '' },
    ]);
  };

  const handleChangeItem = (index: number, updatedItem: EducationEntry) => {
    const newData = [...data];
    newData[index] = updatedItem;
    onChange(newData);
  };

  const handleRemoveItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const renderEducationItem = (
    item: EducationEntry,
    index: number,
    onChangeItemCallback: (idx: number, updatedItm: EducationEntry) => void
  ) => {
    const handleChange = (field: keyof EducationEntry, value: string) => {
      onChangeItemCallback(index, { ...item, [field]: value });
    };

    return (
      <div className="space-y-4">
        <FormField
          id={`edu-degree-${item.id}`}
          label="Degree / Certificate"
          value={item.degree}
          onChange={(val) => handleChange('degree', val)}
          placeholder="e.g., B.S. in Computer Science"
        />
        <FormField
          id={`edu-institution-${item.id}`}
          label="Institution"
          value={item.institution}
          onChange={(val) => handleChange('institution', val)}
          placeholder="e.g., State University"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id={`edu-startDate-${item.id}`}
            label="Start Date"
            type="text"
            value={item.startDate}
            onChange={(val) => handleChange('startDate', val)}
            placeholder="e.g., Aug 2016"
          />
          <FormField
            id={`edu-endDate-${item.id}`}
            label="End Date / Expected"
            type="text"
            value={item.endDate}
            onChange={(val) => handleChange('endDate', val)}
            placeholder="e.g., May 2020 or Present"
          />
        </div>
        <FormField
          id={`edu-details-${item.id}`}
          label="Details (Optional)"
          value={item.details || ''}
          onChange={(val) => handleChange('details', val)}
          placeholder="e.g., GPA, Honors, Relevant Coursework"
          isTextarea
        />
      </div>
    );
  };

  return (
    <ArraySection
      title="Education"
      items={data}
      renderItem={renderEducationItem}
      onAddItem={handleAddItem}
      onChangeItem={handleChangeItem}
      onRemoveItem={handleRemoveItem}
      addText="Add Education"
    />
  );
};

export default EducationForm;
