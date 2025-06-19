
"use client";
import * as React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";
import { Sun, Moon, Settings, FileText, Download, RefreshCcw, Sparkles, Palette, Printer, LogOut } from "lucide-react"; // Added LogOut icon
import type { BaseTheme, ResumeTemplateKey } from '@/types/resume';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/use-auth'; // Import useAuth

interface AppControlsProps {
  baseTheme: BaseTheme;
  setBaseTheme: (theme: BaseTheme) => void;
  applyGlassmorphism: boolean;
  setApplyGlassmorphism: (apply: boolean) => void;
  resumeTemplate: ResumeTemplateKey;
  setResumeTemplate: (template: ResumeTemplateKey) => void;
  onExportHTML: () => void;
  onExportPDF: () => void;
  onResetData: () => void;
}

const AppControls: React.FC<AppControlsProps> = ({
  baseTheme,
  setBaseTheme,
  applyGlassmorphism,
  setApplyGlassmorphism,
  resumeTemplate,
  setResumeTemplate,
  onExportHTML,
  onExportPDF,
  onResetData,
}) => {
  const { toast } = useToast();
  const { user, signOut, loading: authLoading } = useAuth(); // Get user and signOut from useAuth

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all resume data? This action cannot be undone.")) {
      onResetData();
      toast({ title: "Data Reset", description: "Your resume data has been cleared." });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: "Signed Out", description: "You have been successfully signed out." });
  };
  
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="App Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={baseTheme} onValueChange={(value) => setBaseTheme(value as BaseTheme)}>
            <DropdownMenuRadioItem value="light" className="cursor-pointer">
              <Sun className="mr-2 h-4 w-4" /> Light Mode
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" className="cursor-pointer">
              <Moon className="mr-2 h-4 w-4" /> Dark Mode
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuCheckboxItem
            checked={applyGlassmorphism}
            onCheckedChange={setApplyGlassmorphism}
            className="cursor-pointer"
          >
            <Sparkles className="mr-2 h-4 w-4" /> Modern Style (Glass)
          </DropdownMenuCheckboxItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Resume Template</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={resumeTemplate} onValueChange={(value) => setResumeTemplate(value as ResumeTemplateKey)}>
            <DropdownMenuRadioItem value="classic" className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" /> Classic
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="modern" className="cursor-pointer">
              <Palette className="mr-2 h-4 w-4" /> Modern
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* These export buttons are now duplicated below the preview as per request, keeping them here as well for quick access */}
          <DropdownMenuItem onSelect={onExportHTML} className="cursor-pointer">
            <Download className="mr-2 h-4 w-4" /> Export as HTML
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={onExportPDF} className="cursor-pointer">
            <Printer className="mr-2 h-4 w-4" /> Export as PDF
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={handleResetData} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
            <RefreshCcw className="mr-2 h-4 w-4" /> Reset All Data
          </DropdownMenuItem>
          
          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleSignOut} disabled={authLoading} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AppControls;
