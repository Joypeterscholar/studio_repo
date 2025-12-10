'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const locations = ['Oyo', 'Ogun', 'Oyo', 'Lagos', 'Abuja', 'Kano', 'Port Harcourt'];

export default function DiscoverFromPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center p-4 border-b">
        <Button onClick={() => router.back()} variant="ghost" size="icon" className="w-10 h-10">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="flex-grow text-center">
          <h1 className="text-xl font-bold text-primary">Discover from</h1>
        </div>
        <div className="w-10"></div>
      </header>
      <main className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search through locations"
            className="h-12 px-10 rounded-lg border-2 border-border focus-visible:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="space-y-2">
            {filteredLocations.map((location, index) => (
                <div key={index} className={`p-4 rounded-lg ${location === 'Ogun' ? 'bg-muted' : ''}`}>
                    <p className="text-foreground font-medium">{location}</p>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
