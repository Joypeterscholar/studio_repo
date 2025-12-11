'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { useCollection, useUserById } from '@/firebase';
import { type Connection, type User } from '@/lib/data';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useUser as useLoggedInUser } from '@/firebase';

const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const ConnectionRequestRow = ({ connection }: { connection: Connection }) => {
    const { data: user, loading } = useUserById(connection.fromUserId);

    if (loading || !user) {
        return <div className="h-14 my-2 bg-muted rounded-lg animate-pulse" />;
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
                    <p className="text-sm text-muted-foreground">Wants to connect</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-primary/20 text-primary/80">
                    Ignore
                </Button>
                <Button variant="outline" size="sm" className="border-primary text-primary">
                    Accept
                </Button>
            </div>
        </div>
    )
}

const ConnectionRow = ({ connection }: { connection: Connection }) => {
    const { data: loggedInUser } = useLoggedInUser();
    // Determine the other user's ID
    const otherUserId = loggedInUser?.id === connection.fromUserId ? connection.toUserId : connection.fromUserId;
    const { data: user, loading } = useUserById(otherUserId);

    if (loading || !user) {
        return <div className="h-14 my-2 bg-muted rounded-lg animate-pulse" />;
    }
    const image = findImage(user.image.id);
    const status = connection.status.charAt(0).toUpperCase() + connection.status.slice(1);

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
                    <p className="text-sm text-muted-foreground">{status}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-primary/20 text-primary/80">
                    Disconnect
                </Button>
                <Link href={`/messages/${user.id}`}>
                    <Button variant="outline" size="sm" className="border-primary text-primary">
                        Message
                    </Button>
                </Link>
            </div>
        </div>
    )
}


export default function ConnectionsPage() {
    const router = useRouter();
    const firestore = useFirestore();
    const { data: loggedInUser } = useLoggedInUser();

    const connectRequestsQuery = firestore && loggedInUser ? query(collection(firestore, 'connections'), where('toUserId', '==', loggedInUser.id), where('status', '==', 'requested')) : null;
    const { data: connectRequests, loading: requestsLoading } = useCollection<Connection>(connectRequestsQuery);
    
    const connectionsQuery = firestore && loggedInUser ? query(collection(firestore, 'connections'), where('userIds', 'array-contains', loggedInUser.id), where('status', '==', 'connected')) : null;
    const { data: connections, loading: connectionsLoading } = useCollection<Connection>(connectionsQuery);

    return (
        <AppLayout>
            <div className="flex flex-col min-h-full bg-background text-foreground">
                <header className="flex items-center p-4">
                    <Button onClick={() => router.back()} variant="ghost" size="icon" className="border">
                        <ChevronLeft className="h-6 w-6 text-primary" />
                    </Button>
                    <div className="flex-grow text-center">
                        <h1 className="text-xl font-bold text-primary">Connect Requests</h1>
                    </div>
                    <div className="w-10"></div>
                </header>

                <main className="flex-grow px-4">
                    <div className="divide-y divide-border">
                        {requestsLoading && Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 my-2 bg-muted rounded-lg animate-pulse" />)}
                        {!requestsLoading && connectRequests.map((request) => (
                           <ConnectionRequestRow key={request.id} connection={request} />
                        ))}
                    </div>
                    {connectRequests.length > 3 && (
                        <div className="text-center py-4">
                            <Button variant="link" className="text-primary">
                                See more
                            </Button>
                        </div>
                    )}

                    <div className="mt-8">
                         <h2 className="text-xl font-bold text-primary mb-2">Connections</h2>
                         <div className="divide-y divide-border">
                            {connectionsLoading && Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 my-2 bg-muted rounded-lg animate-pulse" />)}
                            {!connectionsLoading && connections.map((connection) => (
                               <ConnectionRow key={connection.id} connection={connection} />
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </AppLayout>
    );
}
