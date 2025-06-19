
"use client";
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react"; // Removed Sparkles, Loader2
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Removed useToast and enhanceResumeContent import
// Removed AiEnhanceableSection import

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  isTextarea?: boolean;
  // Removed canEnhance, sectionIdentifier, fieldKey
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  isTextarea = false,
  // Removed canEnhance, sectionIdentifier, fieldKey defaults
}) => {
  // Removed isEnhancing state and useToast hook
  // Removed handleEnhance function

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-medium">{label}</Label>
      <div className="flex items-start gap-2">
      {isTextarea ? (
        <Textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="flex-grow"
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-grow"
        />
      )}
      {/* Removed AI enhancement button */}
      </div>
    </div>
  );
};

interface ArraySectionProps<T extends { id: string }> {
  title: string;
  items: T[];
  renderItem: (item: T, index: number, onChange: (index: number, updatedItem: T) => void, onRemove: (index: number) => void) => React.ReactNode;
  onAddItem: () => void;
  onChangeItem: (index: number, updatedItem: T) => void;
  onRemoveItem: (index: number) => void;
  addText?: string;
}

export function ArraySection<T extends { id: string }>({
  title,
  items,
  renderItem,
  onAddItem,
  onChangeItem,
  onRemoveItem,
  addText = "Add Item",
}: ArraySectionProps<T>) {
  return (
    <Card className="shadow-sm border border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 && <p className="text-muted-foreground text-sm">No {title.toLowerCase()} added yet.</p>}
        {items.map((item, index) => (
          <div key={item.id} className="p-4 border border-border/30 rounded-md bg-muted/20 relative group">
            {renderItem(item, index, onChangeItem, onRemoveItem)}
             <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => onRemoveItem(index)}
                className="absolute top-2 right-2 text-destructive opacity-50 group-hover:opacity-100"
                aria-label={`Remove ${title} item`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
          </div>
        ))}
        <Button type="button" variant="outline" onClick={onAddItem} className="mt-2 w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> {addText || `Add ${titleSingular(title)}`}
        </Button>
      </CardContent>
    </Card>
  );
}

function titleSingular(title: string): string {
  if (title.endsWith('s')) {
    return title.slice(0, -1);
  }
  return title;
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
