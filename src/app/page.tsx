
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
    buttonText: 'Find Your Match!',
  },
  {
    image: 'onboarding-2',
    title: 'Chat, Flirt, or Just Chill',
    description: 'Meet new people, spark real conversations, and build connections that go beyond swipes and small talk.',
    buttonText: 'Chat',
  },
  {
    image: 'onboarding-3',
    title: 'Make the First Move',
    description: 'Don’t be shy! Send a message and start a conversation.',
    buttonText: 'Make a Move',
  },
  {
    image: 'onboarding-5',
    title: 'Share the Love & Earn',
    description: 'Invite your friends and earn rewards for every successful referral. The more you share, the more you earn!',
    buttonText: 'Refer a Friend',
  },
  {
    image: 'onboarding-4',
    title: 'Safe & Secure',
    description: 'Your privacy is our priority. We keep your data safe.',
    buttonText: 'Get Started',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // For the final step, you might want to navigate to the main app
      // router.push('/discover');
    }
  };

  const handleSkip = () => {
    // router.push('/discover');
  };

  const step = onboardingSteps[currentStep];
  // Find the image, or use the first image in the list as a fallback.
  const image = placeholderImages.find(p => p.id === step.image) || placeholderImages[0];


  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <div className="h-1/3 bg-primary" style={{ borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px' }}>
      </div>

      <div className="flex-1 flex flex-col items-center justify-between p-8 text-center -mt-48 z-10">
        <div className="w-full max-w-sm h-64 relative">
          {image && (
            <div className="relative aspect-[4/3] w-full h-full">
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
        
        <div className="w-full mt-8">
          <h1 className="text-3xl font-bold font-headline text-primary">
            {step.title}
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xs mx-auto">
            {step.description}
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-6 mt-auto">
           <Button onClick={handleNext} className="w-full max-w-xs" size="lg">
            {step.buttonText}
          </Button>
          <div className="flex items-center justify-between w-full max-w-xs">
            <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">SKIP</Button>
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
            <Button variant="ghost" onClick={handleNext} className="text-muted-foreground">
              {currentStep === onboardingSteps.length - 1 ? 'DONE' : 'NEXT'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
