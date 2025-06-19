
"use client";

import * as React from 'react';
import { useAppSettings } from '@/hooks/use-app-settings'; 

const AppFooter: React.FC = () => {
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);
  const { applyGlassmorphism } = useAppSettings(); 

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  if (currentYear === null) {
    return <footer className="py-8 text-center border-t border-border bg-card text-muted-foreground fixed bottom-0 left-0 right-0 z-40"><div className="container mx-auto px-4">&nbsp;</div></footer>;
  }

  return (
    <footer 
      className={`py-8 text-center border-t 
                  ${applyGlassmorphism ? 'glassmorphic-panel !bg-opacity-70' : 'bg-card'} 
                  text-muted-foreground fixed bottom-0 left-0 right-0 z-40`}
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
