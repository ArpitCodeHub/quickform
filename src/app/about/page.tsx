
"use client";

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useAppSettings } from '@/hooks/use-app-settings';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sun, Moon, Info, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const { user, loading: authLoading } = useAuth();
  const { baseTheme, setBaseTheme, applyGlassmorphism, isLoadingAppSettings } = useAppSettings();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (isMounted && !authLoading && !user) {
      router.push('/auth');
    }
  }, [user, authLoading, router, isMounted]);

  const toggleTheme = () => {
    setBaseTheme(baseTheme === 'light' ? 'dark' : 'light');
  };

  if (!isMounted || authLoading || !user || isLoadingAppSettings || currentYear === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground font-body ${applyGlassmorphism ? 'glassmorphism-active' : ''}`}>
      <header className={`p-3 sm:p-4 shadow-md bg-card border-b border-border sticky top-0 z-50 ${applyGlassmorphism ? 'glassmorphic-panel !bg-card/80' : ''}`}>
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" passHref>
            <Button variant="outline" size="icon" aria-label="Back to Home">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
          <h1 className="text-xl sm:text-2xl font-headline font-bold text-primary">About QuickForm</h1>
          <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {baseTheme === 'light' ? <Moon className="h-4 w-4 sm:h-5 sm:w-5" /> : <Sun className="h-4 w-4 sm:h-5 sm:w-5" />}
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-3 sm:p-6 md:p-8">
        <Card className={`shadow-xl transition-all duration-300 ease-in-out ${applyGlassmorphism ? 'glassmorphic-panel' : ''}`}>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary flex items-center">
              <Info className="mr-2 sm:mr-3 h-6 w-6 sm:h-8 sm:w-8" /> Our Mission
            </CardTitle>
            <CardDescription className="text-md sm:text-lg">
              Empowering you to create professional documents, effortlessly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed">
            <p>
              Welcome to QuickForm! We believe that crafting high-quality, professional documents shouldn't be a daunting task. 
              Our platform is designed to simplify this process, providing you with intuitive tools to help you put your best foot forward.
            </p>
            <p>
              Whether you're building a resume, a cover letter, or any other professional document, QuickForm offers a seamless 
              experience from start to finish. With dynamic form builders, live previews, and a variety of customizable themes, 
              you have everything you need to create documents that stand out.
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-primary pt-3 sm:pt-4">What We Offer:</h3>
            <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 pl-2 sm:pl-4">
              <li><strong>Dynamic Form Builder:</strong> Easily input your information with our interactive forms.</li>
              <li><strong>Live Preview:</strong> See your document take shape in real-time.</li>
              <li><strong>Theme Selection:</strong> Choose from multiple templates to match your style.</li>
              <li><strong>Flexible Export Options:</strong> Download your documents in PDF or HTML format.</li>
              <li><strong>Secure & Private:</strong> Your data is saved locally in your browser for your privacy.</li>
            </ul>
            <p>
              QuickForm is built with modern technology, including Next.js, React, and Tailwind CSS, 
              ensuring a fast, responsive, and cutting-edge experience.
            </p>
            <p>
              Thank you for choosing QuickForm. We're excited to help you achieve your goals!
            </p>
          </CardContent>
        </Card>
      </main>

       <footer className={`p-3 sm:p-4 text-center text-xs sm:text-sm text-muted-foreground border-t border-border ${applyGlassmorphism ? 'glassmorphic-panel !bg-card/70' : 'bg-card'}`}>
        © {currentYear} QuickForm. All rights reserved.
      </footer>
    </div>
  );
}
