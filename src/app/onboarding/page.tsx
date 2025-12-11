'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';

export default function OnboardingPage() {
  return (
    <div className="flex h-screen w-screen flex-col bg-background">
      <header className="flex items-center justify-center p-6 pt-12 md:p-8">
        <Logo isLinqUp className="w-40 text-primary" />
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-headline leading-tight text-primary">
          Find your perfect match.
        </h1>
        <p className="mt-4 max-w-sm text-muted-foreground">
          Join our community to connect with people who share your interests and values.
        </p>
      </main>

      <footer
        className="p-6 md:p-8"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <div className="space-y-4 max-w-sm mx-auto">
          <Link href="/signup" passHref>
            <Button className="w-full" size="lg">
              Create Account
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button
              variant="secondary"
              className="w-full"
              size="lg"
            >
              Log In
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
