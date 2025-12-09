'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SearchPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center p-4 border-b">
        <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex-grow text-center">
            <h1 className="text-xl font-bold text-primary">Search</h1>
        </div>
        <div className="w-10"></div>
      </header>
      <main className="p-4 space-y-6">
        <div className="relative">
          <Input
            placeholder="Search by Gender, age, location, interests"
            className="h-12 px-4 rounded-lg border-2 border-border focus-visible:ring-primary"
          />
        </div>
        <div>
            <h3 className="text-sm text-muted-foreground font-medium mb-2">Interests</h3>
            <div className="bg-muted p-3 rounded-lg">
                <p className="text-foreground">Female</p>
            </div>
        </div>
        <div>
            <h3 className="text-sm text-muted-foreground font-medium mb-2">Experience</h3>
            {/* Experience suggestions can be added here */}
        </div>
      </main>
    </div>
  );
}
