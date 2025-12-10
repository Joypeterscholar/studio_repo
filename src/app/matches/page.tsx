'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';
import { useUserById } from '@/firebase';

const matchesData = [
  { userId: '1', match: 100, distance: 1.3, location: 'HANOVER' },
  { userId: '2', match: 94, distance: 2, location: 'DORTMUND' },
  { userId: '3', match: 89, distance: 2.5, location: 'BERLIN' },
  { userId: '4', match: 80, distance: 2.5, location: 'MUNICH' },
  { userId: '5', match: 68, distance: 5, location: 'HAMBURG' },
  { userId: '6', match: 72, distance: 8, location: 'COLOGNE' },
];

const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

function MatchCard({ matchInfo }: { matchInfo: typeof matchesData[0] }) {
    const { data: user, loading } = useUserById(matchInfo.userId);

    if (loading || !user) {
        return (
            <div className="relative aspect-[3/4] rounded-3xl bg-muted animate-pulse"></div>
        );
    }
    
    const userImage = findImage(user.image.id);

    return (
        <Link href={`/user/${user.id}`} key={user.id}>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-lg group">
                <Image
                    src={userImage.imageUrl}
                    alt={user.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={userImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                <div className="absolute top-2 left-2 right-2">
                    <div className="bg-accent/80 text-accent-foreground text-xs font-bold py-1 px-3 rounded-full inline-block">
                        {matchInfo.match}% Match
                    </div>
                </div>
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="bg-black/30 backdrop-blur-sm rounded-full text-xs px-2 py-0.5 inline-block mb-1">
                        {matchInfo.distance} km away
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-lg truncate">{user.name}, {user.age}</p>
                        <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                    </div>
                    <p className="text-xs opacity-80 tracking-widest uppercase">{matchInfo.location}</p>
                </div>
            </div>
        </Link>
    )
}

export default function MatchesPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="flex flex-col bg-background min-h-full">
        <header className="flex items-center justify-between p-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-primary">Matches</h1>
          <div className="w-10"></div>
        </header>

        <div className="flex justify-center gap-8 my-4">
          <div className="text-center">
            <Button variant="outline" className="w-20 h-20 rounded-full border-4 border-primary/20 flex-col gap-1">
                <Heart className="w-8 h-8 text-primary/80 fill-primary/20" />
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">Likes <span className="font-semibold text-primary">32</span></p>
          </div>
          <div className="text-center">
            <Button variant="outline" className="w-20 h-20 rounded-full border-4 border-primary/20 flex-col gap-1">
                <MessageCircle className="w-8 h-8 text-primary/80" />
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">Connect <span className="font-semibold text-primary">15</span></p>
          </div>
        </div>

        <main className="px-4 pb-8">
            <h2 className="text-lg font-bold text-primary mb-4">
                Your Matches <span className="text-accent">{matchesData.length}</span>
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {matchesData.map(matchInfo => (
                   <MatchCard key={matchInfo.userId} matchInfo={matchInfo} />
                ))}
            </div>
        </main>
      </div>
    </AppLayout>
  );
}
