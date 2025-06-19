
"use client";

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Sun, Moon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from '@/hooks/use-app-settings';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, signIn, signUp, loading: authLoading, error: authError, clearError } = useAuth();
  const { baseTheme, setBaseTheme } = useAppSettings();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (user && !authLoading) {
      router.push('/');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (authError) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: authError.message || "An unknown error occurred.",
      });
      clearError(); // Clear error after showing toast
    }
  }, [authError, toast, clearError]);


  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await signIn(email, password);
    setIsSubmitting(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await signUp(email, password);
    setIsSubmitting(false);
  };

  const toggleTheme = () => {
    setBaseTheme(baseTheme === 'light' ? 'dark' : 'light');
  };

  if (authLoading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/30 via-background to-accent/30 p-4">
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
        <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
          {baseTheme === 'light' ? <Moon className="h-4 w-4 sm:h-5 sm:w-5" /> : <Sun className="h-4 w-4 sm:h-5 sm:w-5" />}
        </Button>
      </div>
      <Tabs defaultValue="login" className="w-full max-w-sm sm:max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="data-[state=active]:animate-in data-[state=active]:fade-in-90 duration-300">
          <Card className="shadow-2xl transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/30 dark:hover:shadow-primary/20">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-primary">Welcome Back!</CardTitle>
              <CardDescription className="text-sm">Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input 
                    id="login-email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input 
                    id="login-password" 
                    type="password" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="p-4 sm:p-6 pt-0">
                <Button type="submit" className="w-full" disabled={isSubmitting || authLoading}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Login
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup" className="data-[state=active]:animate-in data-[state=active]:fade-in-90 duration-300">
          <Card className="shadow-2xl transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/30 dark:hover:shadow-primary/20">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl font-bold text-primary">Create an Account</CardTitle>
              <CardDescription className="text-sm">Fill in the details to get started.</CardDescription>
            </CardHeader>
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="m@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    required 
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="p-4 sm:p-6 pt-0">
                <Button type="submit" className="w-full" disabled={isSubmitting || authLoading}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
