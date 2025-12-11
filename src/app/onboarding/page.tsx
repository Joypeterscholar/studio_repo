
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { EmblaCarouselType } from 'embla-carousel-react';

const onboardingImages = [
  placeholderImages.find((p) => p.id === 'onboarding-1'),
  placeholderImages.find((p) => p.id === 'onboarding-2'),
  placeholderImages.find((p) => p.id === 'onboarding-3'),
  placeholderImages.find((p) => p.id === 'onboarding-4'),
  placeholderImages.find((p) => p.id === 'onboarding-5'),
].filter(Boolean) as any[];

const onboardingSteps = [
    {
        title: "Find Your Perfect Match",
        description: "Connecting you to the right people, building meaningful relationships.",
    },
    {
        title: "Chat and Connect",
        description: "Engage in conversations that matter and find your special someone.",
    },
    {
        title: "Safe and Secure",
        description: "Your privacy is our priority. Date with confidence and peace of mind.",
    },
    {
        title: "Discover People Nearby",
        description: "Find and connect with people in your area with our location-based search.",
    },
    {
        title: "Earn as You Connect",
        description: "Get rewarded for referrals and engagement within the community.",
    }
]


export default function OnboardingPage() {
    const [api, setApi] = useState<EmblaCarouselType>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) {
          return
        }
    
        setCurrent(api.selectedScrollSnap())
    
        const onSelect = () => {
          setCurrent(api.selectedScrollSnap())
        }
    
        api.on("select", onSelect)
    
        return () => {
          api.off("select", onSelect)
        }
    }, [api])

  return (
    <div className="flex h-screen w-screen flex-col bg-primary text-primary-foreground">
      <header className="flex items-center justify-center pt-16">
        <Logo isLinqUp className="w-40" />
      </header>

      <main className="flex-grow flex flex-col justify-end">
        <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
                {onboardingImages.map((image, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                width={500}
                                height={500}
                                className="w-full h-auto aspect-square object-contain"
                                data-ai-hint={image.imageHint}
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
        <div className="px-8 text-center mt-4">
            <h1 className="text-3xl font-headline">{onboardingSteps[current]?.title}</h1>
            <p className="mt-2 opacity-80 h-10">
                {onboardingSteps[current]?.description}
            </p>
        </div>
      </main>

       <footer className="p-8" style={{ paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))' }}>
        <div className="flex justify-center gap-2 mb-8">
            {onboardingImages.map((_, index) => (
            <div
                key={index}
                className={cn(
                    'h-2 w-2 rounded-full transition-all',
                    index === current ? 'w-4 bg-white' : 'bg-white/50'
                )}
            />
            ))}
        </div>
        <div className="space-y-4">
          <Link href="/signup" passHref>
            <Button
              variant="secondary"
              className="w-full bg-white text-primary hover:bg-white/90"
              size="lg"
            >
              Sign up with email
            </Button>
          </Link>
          <Link href="/login" passHref>
            <Button
              variant="link"
              className="w-full text-white"
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
