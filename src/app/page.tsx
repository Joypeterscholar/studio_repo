'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { placeholderImages } from '@/lib/placeholder-images';

const onboardingSteps = [
  {
    image: 'onboarding-1',
    title: 'Find Your Kind of Connection',
    description:
      "Whether you're looking for love, friendship, or meaningful connections, we've created a space that fits your vibe",
  },
  {
    image: 'onboarding-2',
    title: 'Discover People, Not Profiles',
    description: 'Our smart algorithm helps you find people you’ll actually click with.',
  },
  {
    image: 'onboarding-3',
    title: 'Make the First Move',
    description: 'Don’t be shy! Send a message and start a conversation.',
  },
    {
    image: 'onboarding-4',
    title: 'Safe & Secure',
    description: 'Your privacy is our priority. We keep your data safe.',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/discover');
    }
  };

  const handleSkip = () => {
    router.push('/discover');
  };
  
  const step = onboardingSteps[currentStep];
  const image = placeholderImages.find(p => p.id === step.image);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="h-1/3 bg-primary" style={{ borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px' }}>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between p-8 text-center -mt-32 z-10">
        <div className="w-full max-w-sm">
            {image && (
            <div className="relative aspect-[4/3] w-full">
                <Image
                src={image.imageUrl}
                alt={step.title}
                data-ai-hint={image.imageHint}
                fill
                className="object-contain"
                priority
                />
            </div>
            )}
        </div>
        
        <div className="w-full">
          <h1 className="text-3xl font-bold font-headline text-primary">
            {step.title}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xs mx-auto">
            {step.description}
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-6">
            <Button onClick={handleNext} className="w-full max-w-xs" size="lg">
                Find Your Match!
            </Button>
            <div className="flex items-center justify-between w-full max-w-xs">
                <Button variant="ghost" onClick={handleSkip}>SKIP</Button>
                <div className="flex gap-2">
                {onboardingSteps.map((_, index) => (
                    <div
                    key={index}
                    className={cn(
                        'h-2 w-2 rounded-full transition-all',
                        currentStep === index ? 'w-4 bg-primary' : 'bg-muted'
                    )}
                    />
                ))}
                </div>
                <Button variant="ghost" onClick={handleNext}>
                {currentStep === onboardingSteps.length - 1 ? 'DONE' : 'NEXT'}
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
