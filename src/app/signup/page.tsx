'use client';

import { Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GoogleIcon = () => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-6 w-6"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
);

const AppleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12.15,1.933a3.54,3.54,0,0,0-2.3,1.15,4,4,0,0,0-1.42,3A3.83,3.83,0,0,0,9,8.45a3.89,3.89,0,0,0,2.62,1.22,2.4,2.4,0,0,1,1,.22,2.39,2.39,0,0,1,.87,1,2.59,2.59,0,0,1,.34,1.25,4.5,4.5,0,0,0-1.7,1.87A5,5,0,0,0,11.39,16a4,4,0,0,0,1,2.5,3.33,3.33,0,0,0,2.37,1.22,3.13,3.13,0,0,0,2.51-1,4.38,4.38,0,0,0,1.26-2.88,8.23,8.23,0,0,1-2.28-1.5,4.64,4.64,0,0,1-1-1.75,2.43,2.43,0,0,1,1.72-2.8,2.53,2.53,0,0,1,1.1-.19,4.19,4.19,0,0,0-1.89-3.2,4.6,4.6,0,0,0-3.07-1.15Z" />
        <path d="M14.62,1.333a4.57,4.57,0,0,1,2,3.3,3.5,3.5,0,0,1-1.5,3.16,3.43,3.43,0,0,1-3.37.41,5,5,0,0,0,1.15-3.52A4.58,4.58,0,0,0,14.62,1.333Z" />
    </svg>
);


export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary" style={{fontFamily: 'Alegreya, serif'}}>Sign Up</h1>
          <p className="mt-2 text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-primary">
              Login Here
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input id="username" type="text" placeholder="Type something here..." className="pl-10 rounded-full h-12" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" placeholder="Type something here..." className="pl-10 rounded-full h-12" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type="password" placeholder="Type something here..." className="pl-10 rounded-full h-12" />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Sign Up
          </Button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-muted" />
          <span className="mx-4 text-sm text-muted-foreground">or continue with</span>
          <div className="flex-grow border-t border-muted" />
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start" size="lg">
            <GoogleIcon />
             <span className="flex-grow text-center">Login with Google</span>
          </Button>
          <Button variant="outline" className="w-full justify-start" size="lg">
            <AppleIcon />
            <span className="flex-grow text-center">Login with Apple</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
