
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const onboardingImages = [
  placeholderImages.find((p) => p.id === 'onboarding-1'),
  placeholderImages.find((p) => p.id === 'onboarding-2'),
  placeholderImages.find((p) => p.id === 'onboarding-3'),
  placeholderImages.find((p) => p.id === 'onboarding-4'),
  placeholderImages.find((p) => p.id === 'onboarding-5'),
].filter(Boolean) as any[];


export default function OnboardingPage() {
  return (
    <div className="flex h-screen w-screen flex-col bg-primary text-primary-foreground">
      <header className="flex items-center justify-center pt-16">
        <Logo isLinqUp className="w-40" />
      </header>

      <main className="flex-grow flex flex-col justify-center">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1">
            {onboardingImages.map((image, index) => (
              <CarouselItem key={index} className="pl-1 basis-full">
                <div className="p-1">
                    <div className="relative aspect-square w-[90vw] max-w-[400px] mx-auto">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-contain"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="px-8 text-center mt-4">
            <h1 className="text-3xl font-headline">Find Your Perfect Match</h1>
            <p className="mt-2 opacity-80">
                Connect with people who share your interests and values. Explore profiles, chat, and build meaningful relationships.
            </p>
        </div>
      </main>

      <footer className="p-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/signup" passHref className="flex-1">
            <Button
              variant="secondary"
              size="lg"
              className="w-full bg-white text-primary hover:bg-white/90"
            >
              Create an account
            </Button>
          </Link>
          <Link href="/login" passHref className="flex-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white text-white hover:bg-white/10 hover:text-white"
            >
              Log In
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
