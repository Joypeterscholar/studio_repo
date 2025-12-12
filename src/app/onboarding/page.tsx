'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Logo from '@/components/layout/Logo';

export default function OnboardingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Bypassing login/signup and going directly to home for guest access.
      router.push('/home');
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-background">
       <header className="flex items-center justify-center p-6 pt-12 md:p-8">
        <Logo isLinqUp className="w-40 text-primary" />
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-headline leading-tight text-primary">
          Find your perfect match.
        </h1>
        <p className="mt-4 max-w-sm text-muted-foreground">
          You are entering as a guest.
        </p>
      </main>

      <footer
        className="p-6 md:p-8"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <p className="text-sm text-muted-foreground">Redirecting...</p>
      </footer>
    </div>
  );
}
