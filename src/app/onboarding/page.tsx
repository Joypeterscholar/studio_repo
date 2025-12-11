
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import { placeholderImages } from '@/lib/placeholder-images';

export default function OnboardingPage() {
  const bgImage = placeholderImages.find((p) => p.id === 'onboarding-hero');

  if (!bgImage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex h-screen w-screen flex-col text-primary-foreground">
      <Image
        src={bgImage.imageUrl}
        alt={bgImage.description}
        fill
        className="object-cover"
        data-ai-hint={bgImage.imageHint}
      />
      <div className="absolute inset-0 bg-black/40" />

      <header className="relative z-10 flex items-center justify-center pt-16">
        <Logo isLinqUp className="w-48" />
      </header>

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-8">
        <h1 className="text-4xl font-headline leading-tight">
          Find your perfect match.
        </h1>
        <p className="mt-4 max-w-sm opacity-80">
          Join our community to connect with people who share your interests and values.
        </p>
      </main>

       <footer className="relative z-10 p-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
        <div className="space-y-4">
          <Link href="/signup" passHref>
            <Button
              className="w-full bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              Create Account
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button
              variant="secondary"
              className="w-full bg-white/20 text-white hover:bg-white/30"
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
