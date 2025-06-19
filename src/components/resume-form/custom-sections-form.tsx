
"use client";
import * as React from 'react';
import type { CustomSection as CustomSectionType } from '@/types/resume';
import { FormField, ArraySection, generateId } from './form-helpers';

interface CustomSectionsFormProps {
  data: CustomSectionType[];
  onChange: (updatedData: CustomSectionType[]) => void;
}

const CustomSectionsForm: React.FC<CustomSectionsFormProps> = ({ data, onChange }) => {
  const handleAddItem = () => {
    onChange([
      ...data,
      { id: generateId(), title: '', content: '' },
    ]);
  };

  const handleChangeItem = (index: number, updatedItem: CustomSectionType) => {
    const newData = [...data];
    newData[index] = updatedItem;
    onChange(newData);
  };

  const handleRemoveItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const renderCustomSectionItem = (
    item: CustomSectionType,
    index: number,
    onChangeItemCallback: (idx: number, updatedItm: CustomSectionType) => void
  ) => {
    const handleChange = (field: keyof CustomSectionType, value: string) => {
      onChangeItemCallback(index, { ...item, [field]: value });
    };

    return (
      <div className="space-y-4">
        <FormField
          id={`custom-title-${item.id}`}
          label="Section Title"
          value={item.title}
          onChange={(val) => handleChange('title', val)}
          placeholder="e.g., Projects, Certifications, Awards"
        />
        <FormField
          id={`custom-content-${item.id}`}
          label="Content"
          value={item.content}
          onChange={(val) => handleChange('content', val)}
          placeholder="Describe your achievements, projects, etc."
          isTextarea
          // Removed canEnhance and sectionIdentifier props
        />
      </div>
    );
  };

  return (
    <ArraySection
      title="Custom Sections"
      items={data}
      renderItem={renderCustomSectionItem}
      onAddItem={handleAddItem}
      onChangeItem={handleChangeItem}
      onRemoveItem={handleRemoveItem}
      addText="Add Custom Section"
    />
  );
};

export default CustomSectionsForm;
