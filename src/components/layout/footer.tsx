
"use client";

import * as React from 'react';
import { useAppSettings } from '@/hooks/use-app-settings'; 

interface AppFooterProps {
  isPageScrolled?: boolean;
}

const AppFooter: React.FC<AppFooterProps> = ({ isPageScrolled }) => {
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);
  const { applyGlassmorphism } = useAppSettings(); 

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (currentYear === null) {
    return <footer className="py-8 text-center border-t border-border bg-card text-muted-foreground"><div className="container mx-auto px-4">&nbsp;</div></footer>;
  }

  const blurClass = isPageScrolled ? 'filter blur-sm' : 'filter-none';
  const transitionClass = 'transition-all duration-300 ease-in-out';

  return (
    <footer 
      className={`py-8 text-center border-t 
                  ${applyGlassmorphism ? 'glassmorphic-panel !bg-opacity-70' : 'bg-card'} 
                  text-muted-foreground
                  ${blurClass} ${transitionClass}`}
    >
      <div className="container mx-auto px-4">
        <p className="text-sm">
          © {currentYear} QuickForm. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Crafted with passion to simplify your document creation.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
