'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';

export default function BlockUserPage() {
  const router = useRouter();
  const deleteIcon = placeholderImages.find((p) => p.id === 'delete-icon-2');
  
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="p-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full border w-10 h-10">
            <ChevronLeft className="h-6 w-6" />
          </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pb-16">
          {deleteIcon && (
              <Image
                  src={deleteIcon.imageUrl}
                  alt={deleteIcon.description}
                  width={150}
                  height={150}
                  className="mb-8"
                  data-ai-hint={deleteIcon.imageHint}
              />
          )}
        
        <h1 className="text-xl font-bold text-primary mb-2">
          Blocking this user will prevent further interaction.
        </h1>
        <p className="text-muted-foreground max-w-xs mx-auto">
          You can unblock them anytime in your settings.
        </p>

        <div className="mt-12 w-full max-w-sm space-y-4">
          <Button onClick={() => router.back()} variant="outline" className="w-full rounded-full" size="lg">
            Exit
          </Button>
          <Button variant="destructive" className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white" size="lg">
            Block User
          </Button>
        </div>
      </main>
    </div>
  );
}
