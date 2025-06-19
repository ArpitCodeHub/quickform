
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/hooks/use-auth'; // Added AuthProvider

export const metadata: Metadata = {
  title: 'ResumeForge',
  description: 'Craft your professional resume with AI-powered assistance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Ensure Poppins is the primary font loaded */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* PT Sans can be removed if Poppins is used everywhere, or kept as a fallback if needed */}
        {/* <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" /> */}
      </head>
      <body className="font-body antialiased"> {/* font-body will now be Poppins via tailwind.config.ts */}
        <AuthProvider> {/* Wrapped children with AuthProvider */}
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
