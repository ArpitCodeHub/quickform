
"use client";

import * as React from 'react';
import { useAppSettings } from '@/hooks/use-app-settings'; 

const AppFooter: React.FC = () => {
  const [currentYear, setCurrentYear] = React.useState<number | null>(null);
  const { applyGlassmorphism, baseTheme } = useAppSettings(); 

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // Return null or a placeholder if currentYear is not set to avoid hydration mismatch,
  // or if app settings are still loading (though useAppSettings manages its own loading state)
  if (currentYear === null) {
    return <footer className="py-8 text-center border-t border-border bg-card text-muted-foreground"><div className="container mx-auto px-4">&nbsp;</div></footer>;
  }

  return (
    <footer 
      className={`py-8 text-center border-t 
                  ${applyGlassmorphism ? 'glassmorphic-panel !bg-opacity-70' : 'bg-card'} 
                  text-muted-foreground`}
    >
      <div className="container mx-auto px-4">
        <p className="text-sm">
          © {currentYear} QuickForm. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Crafted with passion to simplify your document creation.
        </p>
        {/* Optional: Add links like Privacy Policy, Terms of Service */}
        {/* <div className="mt-2">
          <a href="/privacy" className="text-xs hover:text-primary transition-colors mx-2">Privacy Policy</a>
          <span className="text-xs">|</span>
          <a href="/terms" className="text-xs hover:text-primary transition-colors mx-2">Terms of Service</a>
        </div> */}
      </div>
    </footer>
  );
};

export default AppFooter;
