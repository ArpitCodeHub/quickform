"use client";
import type React from 'react';
import type { Skill } from '@/types/resume';
import { FormField, ArraySection, generateId } from './form-helpers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SkillsFormProps {
  data: Skill[];
  onChange: (updatedData: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const handleAddItem = () => {
    onChange([...data, { id: generateId(), name: '', level: 'Intermediate' }]);
  };

  const handleChangeItem = (index: number, updatedItem: Skill) => {
    const newData = [...data];
    newData[index] = updatedItem;
    onChange(newData);
  };

  const handleRemoveItem = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const renderSkillItem = (
    item: Skill,
    index: number,
    onChangeItemCallback: (idx: number, updatedItm: Skill) => void
  ) => {
    const handleChange = (field: keyof Skill, value: string | Skill['level']) => {
      onChangeItemCallback(index, { ...item, [field]: value });
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <FormField
          id={`skill-name-${item.id}`}
          label="Skill Name"
          value={item.name}
          onChange={(val) => handleChange('name', val)}
          placeholder="e.g., JavaScript, Project Management"
        />
        <div className="space-y-2">
          <Label htmlFor={`skill-level-${item.id}`} className="font-medium">Proficiency (Optional)</Label>
          <Select
            value={item.level}
            onValueChange={(value: Skill['level']) => handleChange('level', value)}
          >
            <SelectTrigger id={`skill-level-${item.id}`}>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <ArraySection
      title="Skills"
      items={data}
      renderItem={renderSkillItem}
      onAddItem={handleAddItem}
      onChangeItem={handleChangeItem}
      onRemoveItem={handleRemoveItem}
      addText="Add Skill"
    />
  );
};

export default SkillsForm;
