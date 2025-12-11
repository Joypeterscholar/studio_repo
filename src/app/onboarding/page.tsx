
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const onboardingImages = [
  placeholderImages.find((p) => p.id === 'onboarding-1'),
  placeholderImages.find((p) => p.id === 'onboarding-2'),
  placeholderImages.find((p) => p.id === 'onboarding-3'),
  placeholderImages.find((p) => p.id === 'onboarding-4'),
  placeholderImages.find((p) => p.id === 'onboarding-5'),
].filter(Boolean) as any[];


export default function OnboardingPage() {
    const router = useRouter();

    // Temporarily skip login/signup and go to home.
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/home');
        }, 1000);
        return () => clearTimeout(timer);
    }, [router]);

  return (
    <div className="flex h-screen w-screen flex-col bg-primary text-primary-foreground">
      <header className="flex items-center justify-center pt-16">
        <Logo isLinqUp className="w-40" />
      </header>

      <main className="flex-grow flex flex-col justify-center">
        <div className="px-8 text-center mt-4">
            <h1 className="text-3xl font-headline">Find Your Perfect Match</h1>
            <p className="mt-2 opacity-80">
                Connecting you to the right people. Please wait...
            </p>
        </div>
      </main>

       <footer className="p-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
        <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-white/50"></div>
            <div className="h-4 w-4 rounded-full bg-white animate-loading-dots"></div>
            <div className="h-4 w-4 rounded-full bg-white/50"></div>
        </div>
      </footer>
    </div>
  );
}
