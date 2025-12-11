
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart, MessageCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';
import { useUserById, useCollection, useUser as useLoggedInUser } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { type Connection, type User } from '@/lib/data';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

function MatchCard({ connection }: { connection: Connection }) {
    const { data: loggedInUser } = useLoggedInUser();
    
    const otherUserId = useMemo(() => {
        if (!loggedInUser || !connection) return null;
        const otherId = (connection.userIds || []).find(id => id !== loggedInUser.id);
        return otherId;
    }, [loggedInUser, connection]);

    const { data: user, loading } = useUserById(otherUserId || '');

    if (loading || !user) {
        return (
            <div className="relative aspect-[3/4] rounded-3xl bg-muted animate-pulse">
                <Skeleton className="w-full h-full rounded-3xl" />
            </div>
        );
    }
    
    const userImage = user.image ? findImage(user.image.id) : placeholderImages[0];
    const matchPercentage = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    const distance = (Math.random() * 10).toFixed(1);


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
                        {matchPercentage}% Match
                    </div>
                </div>
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="bg-black/30 backdrop-blur-sm rounded-full text-xs px-2 py-0.5 inline-block mb-1">
                        {distance} km away
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="font-bold text-lg truncate">{user.name}, {user.age}</p>
                        {user.isOnline && <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs opacity-80 tracking-widest uppercase">{user.location}</p>
                </div>
            </div>
        </Link>
    )
}

export default function MatchesPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { data: loggedInUser } = useLoggedInUser();
  
  const connectionsQuery = firestore && loggedInUser ? query(collection(firestore, 'connections'), where('userIds', 'array-contains', loggedInUser.id), where('status', '==', 'connected')) : null;
  const { data: matches, loading } = useCollection<Connection>(connectionsQuery);

  const MatchSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({length: 6}).map((_, i) => <Skeleton key={i} className="relative aspect-[3/4] rounded-3xl" />)}
    </div>
  );

  return (
    <AppLayout>
      <div className="flex flex-col bg-background min-h-full">
        <header className="flex items-center justify-between p-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10 border">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-primary">Matches</h1>
          <div className="w-10"></div>
        </header>

        <div className="flex justify-center gap-8 my-4">
          <Link href="/likes" className="text-center">
            <Button variant="outline" className="w-20 h-20 rounded-full border-4 border-primary/20 flex-col gap-1">
                <Heart className="w-8 h-8 text-primary/80 fill-primary/20" />
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">Likes <span className="font-semibold text-primary">32</span></p>
          </Link>
          <Link href="/connections" className="text-center">
            <Button variant="outline" className="w-20 h-20 rounded-full border-4 border-primary/20 flex-col gap-1">
                <MessageCircle className="w-8 h-8 text-primary/80" />
            </Button>
            <p className="mt-2 text-sm text-muted-foreground">Connects <span className="font-semibold text-primary">15</span></p>
          </Link>
        </div>

        <main className="px-4 pb-8">
            <h2 className="text-lg font-bold text-primary mb-4">
                Your Matches <span className="text-accent">{!loading ? matches.length : ''}</span>
            </h2>

            {loading && <MatchSkeleton />}

            {!loading && matches.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                    <Users className="w-16 h-16 mb-4" />
                    <h3 className="text-lg font-semibold">No Matches Yet</h3>
                    <p>Start exploring and like profiles to find matches.</p>
                     <Link href="/discover" className="mt-4">
                        <Button>Discover People</Button>
                    </Link>
                </div>
            )}

            {!loading && matches.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {matches.map(connection => (
                        <MatchCard key={connection.id} connection={connection} />
                    ))}
                </div>
            )}
        </main>
      </div>
    </AppLayout>
  );
}
