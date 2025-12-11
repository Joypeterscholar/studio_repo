
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import { useUserById, useCollection, useUser as useLoggedInUser } from '@/firebase';
import Link from 'next/link';
import { type Connection, type User } from '@/lib/data';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const LikedByUserRow = ({ connection }: { connection: Connection }) => {
    const { data: user, loading } = useUserById(connection.fromUserId);

    if (loading || !user || !user.image) {
        return <Skeleton className="h-20 my-2 w-full rounded-lg" />;
    }

    const image = findImage(user.image.id);

    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
                <Link href={`/user/${user.id}`}>
                    <Image
                        src={image.imageUrl}
                        alt={user.name}
                        width={56}
                        height={56}
                        className="rounded-full object-cover w-14 h-14"
                        data-ai-hint={image.imageHint}
                    />
                </Link>
                <div>
                    <h2 className="font-semibold text-primary">{user.name}</h2>
                    <p className="text-sm text-muted-foreground">Liked your profile</p>
                </div>
            </div>
            <Link href={`/messages/${user.id}`}>
                <Button variant="outline" className="rounded-full border-primary/50 text-primary">
                    Message
                </Button>
            </Link>
        </div>
    );
};

export default function LikesPage() {
    const router = useRouter();
    const firestore = useFirestore();
    const { data: loggedInUser } = useLoggedInUser();

    // Query for connections where the logged-in user is the recipient and status is 'liked'
    const likesQuery = firestore && loggedInUser ? query(collection(firestore, 'connections'), where('toUserId', '==', loggedInUser.id), where('status', '==', 'liked')) : null;
    const { data: likedByUsers, loading } = useCollection<Connection>(likesQuery);

    const LoadingSkeleton = () => (
        <>
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="w-14 h-14 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-9 w-24 rounded-full" />
                </div>
            ))}
        </>
    );

    return (
        <AppLayout>
            <div className="flex flex-col min-h-full bg-background text-foreground">
                <header className="flex items-center p-4">
                    <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10 border">
                        <ChevronLeft className="h-6 w-6 text-primary" />
                    </Button>
                    <div className="flex-grow text-center">
                        <h1 className="text-xl font-bold text-primary">Likes</h1>
                    </div>
                    <div className="w-10"></div>
                </header>

                <main className="flex-grow px-4">
                    <div className="divide-y divide-border">
                        {loading && <LoadingSkeleton />}
                        {!loading && likedByUsers.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-96 text-center text-muted-foreground">
                                <Heart className="w-16 h-16 mb-4" />
                                <h3 className="text-lg font-semibold">No Likes Yet</h3>
                                <p>People who like your profile will appear here.</p>
                            </div>
                        )}
                        {!loading && likedByUsers.map((connection) => (
                            <LikedByUserRow key={connection.id} connection={connection} />
                        ))}
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
