
"use client";
import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { useAppSettings } from '@/hooks/use-app-settings';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import ResumeForm from '@/components/resume-form/resume-form';
import ResumePreview from '@/components/resume-preview/resume-preview';
import AppControls from '@/components/app-controls';
import { Loader2, Download, Printer } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import TestimonialsSection from '@/components/testimonials';
import AppFooter from '@/components/layout/footer';

export default function ResumeForgePage() {
  const {
    baseTheme, setBaseTheme,
    applyGlassmorphism, setApplyGlassmorphism,
    resumeTemplate, setResumeTemplate,
    resumeData, setResumeData,
    isLoadingAppSettings,
    resetResumeData,
  } = useAppSettings();

  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (isMounted && !authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (testimonialsRef.current) {
        const scrollY = window.scrollY;
        const parallaxFactor = 0.8; 
        const transformValue = scrollY * (1 - parallaxFactor);
        // Ensure the element is not translated beyond its natural position upwards initially
        testimonialsRef.current.style.transform = `translateY(${Math.min(0, transformValue * 0.5)}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMounted]); 

  const handleExportHTML = () => {
    const previewNode = document.getElementById('resume-preview-printable');
    if (!previewNode) {
      toast({ variant: "destructive", title: "Export Failed", description: "Preview content not found." });
      return;
    }
    const previewContent = previewNode.innerHTML;
    
    let styles = "";
    const sheets = Array.from(document.styleSheets);
    sheets.forEach(sheet => {
      try {
        if (sheet.href && (sheet.href.startsWith(window.location.origin) || !sheet.href.startsWith('http'))) {
          Array.from(sheet.cssRules).forEach(rule => styles += rule.cssText);
        } else if (!sheet.href) { 
          Array.from(sheet.cssRules).forEach(rule => styles += rule.cssText);
        }
      } catch (e) {
        // console.warn("Could not read CSS rules from stylesheet:", sheet.href, e);
      }
    });

    const fontLinks = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    `;
    
    const fullHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${resumeData.personalDetails.fullName ? resumeData.personalDetails.fullName + ' - Document' : 'My Document'}</title>
      ${fontLinks}
      <style>
        body { margin: 20px; font-family: 'Poppins', sans-serif; background-color: #fff; color: #000; } 
        ${styles}
        #resume-preview-printable { width: 100%; margin: 0; padding: 0; box-shadow: none; border: none; }
      </style>
    </head>
    <body>
      <div id="resume-preview-printable">
        ${previewContent}
      </div>
    </body></html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${(resumeData.personalDetails.fullName || 'document').replace(/\s+/g, '_').toLowerCase()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    toast({ title: "HTML Exported", description: "Your document has been downloaded as an HTML file." });
  };

  const handleExportPDF = () => {
    window.print();
    toast({ title: "Print to PDF", description: "Your browser's print dialog has been opened. Choose 'Save as PDF'." });
  };

  if (!isMounted || isLoadingAppSettings || authLoading || !user) { 
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="ml-4 text-xl font-semibold text-foreground font-headline">Loading Your Workspace...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-body">
      <header className={`p-4 shadow-md bg-card border-b border-border sticky top-0 z-50 ${applyGlassmorphism ? 'glassmorphic-panel !bg-card/80' : ''} transition-opacity duration-500 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-headline font-bold text-primary">QuickForm</h1>
          <AppControls
            baseTheme={baseTheme}
            setBaseTheme={setBaseTheme}
            applyGlassmorphism={applyGlassmorphism}
            setApplyGlassmorphism={setApplyGlassmorphism}
            resumeTemplate={resumeTemplate}
            setResumeTemplate={setResumeTemplate}
            onExportHTML={handleExportHTML}
            onExportPDF={handleExportPDF}
            onResetData={resetResumeData}
          />
        </div>
      </header>

      <div className="flex-grow flex flex-col"> {/* Removed pb-24 */}
        <main className={`container mx-auto p-4 transition-opacity duration-500 delay-100 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
            <section aria-labelledby="resume-form-heading" className="lg:col-span-7 xl:col-span-8 overflow-hidden rounded-lg">
              <div className={`bg-card p-4 sm:p-6 rounded-lg shadow-xl h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-primary/10 ${applyGlassmorphism ? 'glassmorphic-panel' : ''}`}>
                <h2 id="resume-form-heading" className="text-2xl font-headline font-semibold mb-6 text-primary">Craft Your Document</h2>
                <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
              </div>
            </section>
            
            <section aria-labelledby="resume-preview-heading" className="lg:col-span-5 xl:col-span-4 overflow-hidden rounded-lg flex flex-col">
              <div className={`bg-card p-2 sm:p-4 rounded-lg shadow-xl flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-primary/10 ${applyGlassmorphism ? 'glassmorphic-panel' : ''}`}>
                <h2 id="resume-preview-heading" className="text-2xl font-headline font-semibold mb-4 text-primary text-center">Live Preview</h2>
                <ResumePreview resumeData={resumeData} templateKey={resumeTemplate} />
              </div>
              <div className={`mt-4 p-4 bg-card rounded-lg shadow-md ${applyGlassmorphism ? 'glassmorphic-panel' : ''}`}>
                <h3 className="text-lg font-semibold mb-3 text-center text-primary">Download Your Document</h3>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={handleExportHTML} variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download HTML
                  </Button>
                  <Button onClick={handleExportPDF} variant="outline" className="flex-1">
                    <Printer className="mr-2 h-4 w-4" />
                    Save as PDF
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </main>
        
        <div ref={testimonialsRef} className="relative z-0"> 
          <TestimonialsSection />
        </div>
        
      </div>
      <AppFooter />
    </div>
  );
}

