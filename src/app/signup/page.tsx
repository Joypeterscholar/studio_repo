'use client';

import { Mail, Lock, User } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.42 9.88V15.5H7.9v-3h2.52V10.2c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.22.19 2.22.19v2.5h-1.28c-1.24 0-1.63.77-1.63 1.56V12.5h2.78l-.45 3H13.4v6.38A10.03 10.03 0 0 0 22 12z" />
  </svg>
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
            Don't have account?{' '}
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
              <Input id="username" type="text" placeholder="Type something here..." className="pl-10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" placeholder="Type something here..." className="pl-10" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type="password" placeholder="Type something here..." className="pl-10" />
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
          <Button variant="outline" className="w-full" size="lg">
            <GoogleIcon />
            Continue with Google
          </Button>
          <Button variant="outline" className="w-full" size="lg">
            <AppleIcon />
            Continue with Apple
          </Button>
        </div>
      </div>
    </div>
  );
}
