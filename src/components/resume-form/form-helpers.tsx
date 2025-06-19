
"use client";
import * as React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { enhanceResumeContent } from '@/ai/flows/enhance-resume-content';
import type { AiEnhanceableSection } from '@/types/resume';

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  isTextarea?: boolean;
  canEnhance?: boolean;
  sectionIdentifier?: AiEnhanceableSection; // e.g., 'summary', 'experienceEntryDescription'
  fieldKey?: string; // If part of a larger object for AI context
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  isTextarea = false,
  canEnhance = false,
  sectionIdentifier,
  fieldKey,
}) => {
  const [isEnhancing, setIsEnhancing] = React.useState(false);
  const { toast } = useToast();

  const handleEnhance = async () => {
    if (!value || !sectionIdentifier) {
      toast({ variant: "destructive", title: "Cannot Enhance", description: "Content is empty or section not specified." });
      return;
    }
    setIsEnhancing(true);
    try {
      const result = await enhanceResumeContent({
        section: sectionIdentifier + (fieldKey ? ` (${fieldKey})` : ''),
        content: value,
        desiredTone: "professional and impactful"
      });
      onChange(result.enhancedContent);
      toast({ title: "Content Enhanced!", description: "AI suggestions applied." });
    } catch (error) {
      console.error("AI Enhancement Error:", error);
      toast({ variant: "destructive", title: "Enhancement Failed", description: String(error) || "Could not enhance content." });
    } finally {
      setIsEnhancing(false);
    }
  };

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
      {canEnhance && (
        <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleEnhance}
            disabled={isEnhancing || !value}
            aria-label={`Enhance ${label} with AI`}
            className="shrink-0"
          >
            {isEnhancing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          </Button>
        )}
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
