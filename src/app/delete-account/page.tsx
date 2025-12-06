'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';

export default function DeleteAccountPage() {
  const deleteIcon = placeholderImages.find((p) => p.id === 'delete-cross-icon');
  
  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background text-foreground p-4">
        <header className="flex items-center justify-between">
          <Link href="/settings" passHref>
            <Button variant="ghost" size="icon" className="rounded-full border w-10 h-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="w-10" />
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
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
            Are you sure you want to delete your account?
          </h1>
          <p className="text-muted-foreground max-w-xs mx-auto">
            This action is permanent and cannot be undone.
          </p>

          <div className="mt-12 w-full max-w-sm space-y-4">
            <Button variant="outline" className="w-full rounded-full" size="lg">
              Skip
            </Button>
            <Button variant="destructive" className="w-full rounded-full bg-red-500 hover:bg-red-600 text-white" size="lg">
              Delete Account
            </Button>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}