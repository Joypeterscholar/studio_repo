'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import { getUserById, type User } from '@/lib/data';
import Link from 'next/link';

const likedByUsers = [
    { userId: '8', name: 'Alfredo Calzoni', imageId: 'user-male-1' },
    { userId: '2', name: 'Arlene McCoy', imageId: 'user-1' },
    { userId: '3', name: 'Robert Fox', imageId: 'user-male-2' },
    { userId: '7', name: 'Jerome Bell', imageId: 'user-7' },
    { userId: '4', name: 'Cody Fisher', imageId: 'user-4' },
    { userId: '6', name: 'Floyd Miles', imageId: 'user-11' },
];

const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

export default function LikesPage() {
    const router = useRouter();

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
                        {likedByUsers.map((user) => {
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
                                            <p className="text-sm text-muted-foreground">Liked your profile</p>
                                        </div>
                                    </div>
                                    <Link href={`/messages/${user.userId}`}>
                                        <Button variant="outline" className="rounded-full border-primary/50 text-primary">
                                            Message
                                        </Button>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <div className="text-center py-6">
                        <Button variant="link" className="text-primary">
                            See more
                        </Button>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
