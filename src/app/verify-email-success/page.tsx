'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';

export default function VerifyEmailSuccessPage() {
    const successImage = placeholderImages.find(p => p.id === 'verify-email-success');
  
    return (
    <div className="flex min-h-screen flex-col items-center justify-between bg-background p-8">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold text-primary" style={{fontFamily: 'Alegreya, serif'}}>
            Email verification successful
        </h1>
        <p className="mt-2 text-muted-foreground">
            Your email has been successfully verified.
        </p>
        
        {successImage && (
            <div className="mt-16 mb-8">
                <Image
                    src={successImage.imageUrl}
                    alt={successImage.description}
                    width={250}
                    height={250}
                    data-ai-hint={successImage.imageHint}
                    className="object-contain"
                />
            </div>
        )}
      </div>

      <div className="w-full max-w-sm pb-4">
        <Link href="/interests" passHref>
            <Button className="w-full" size="lg">
                Continue
            </Button>
        </Link>
      </div>
    </div>
  );
}
