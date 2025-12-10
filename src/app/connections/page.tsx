'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useUserById } from '@/firebase';

const connectRequests = [
    { userId: '8', name: 'Alfredo Calzoni', imageId: 'user-male-1' },
    { userId: '1', name: 'Wade Warren', imageId: 'user-2' },
    { userId: '7', name: 'Jenny Wilson', imageId: 'user-7' },
];

const connections = [
    { userId: '8', name: 'Alfredo Calzoni', imageId: 'user-male-1', status: 'Friend' },
    { userId: '2', name: 'Bessie Cooper', imageId: 'user-1', status: 'Partner' },
    { userId: '6', name: 'Floyd Miles', imageId: 'user-11', status: 'Friend' },
];


const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

export default function ConnectionsPage() {
    const router = useRouter();

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
                        {connectRequests.map((user) => {
                            const image = findImage(user.imageId);
                            return (
                                <div key={user.userId} className="flex items-center justify-between py-4">
                                    <div className="flex items-center gap-4">
                                        <Link href={`/user/${user.userId}`}>
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
                            );
                        })}
                    </div>
                    <div className="text-center py-4">
                        <Button variant="link" className="text-primary">
                            See more
                        </Button>
                    </div>

                    <div className="mt-8">
                         <h2 className="text-xl font-bold text-primary mb-2">Connections</h2>
                         <div className="divide-y divide-border">
                            {connections.map((user) => {
                                const image = findImage(user.imageId);
                                return (
                                    <div key={user.userId} className="flex items-center justify-between py-4">
                                        <div className="flex items-center gap-4">
                                            <Link href={`/user/${user.userId}`}>
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
                                                <p className="text-sm text-muted-foreground">{user.status}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" className="border-primary/20 text-primary/80">
                                                Disconnect
                                            </Button>
                                            <Link href={`/messages/${user.userId}`}>
                                                <Button variant="outline" size="sm" className="border-primary text-primary">
                                                    Message
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </main>
            </div>
        </AppLayout>
    );
}
