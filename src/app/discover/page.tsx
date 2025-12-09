'use client';

import Image from 'next/image';
import { ChevronDown, MapPin, Search, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { getUserById, type User } from '@/lib/data';
import Link from 'next/link';

const newUsers = [
    { userId: '13', distance: 16 },
    { userId: '14', distance: 4.8 },
    { userId: '15', distance: 2.2 },
];

const mapUsers = [
    { userId: '1', top: '20%', left: '45%' },
    { userId: '4', top: '48%', left: '70%' },
    { userId: '2', top: '75%', left: '35%' },
];

const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const UserCard = ({ user, distance }: { user: User, distance: number }) => {
    const userImage = findImage(user.image.id);
    return (
        <Link href={`/user/${user.id}`} className="flex-shrink-0 w-40 relative">
            <Image
                src={userImage.imageUrl}
                alt={user.name}
                width={160}
                height={220}
                className="rounded-2xl object-cover w-full h-[220px]"
                data-ai-hint={userImage.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">NEW</div>
            <div className="absolute bottom-2 left-2 right-2 text-white">
                <p className="text-xs bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 inline-block">{distance} km away</p>
                <p className="font-bold truncate mt-1">{user.name}, {user.age}</p>
                <p className="text-xs uppercase tracking-wider">{user.location}</p>
            </div>
        </Link>
    );
};


export default function DiscoverPage() {
    const mapImage = findImage('map-background');

    return (
        <AppLayout>
            <div className="flex flex-col h-full bg-background text-foreground">
                <header className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-primary">
                        <MapPin className="w-5 h-5"/>
                        <span className="font-bold">Lagos</span>
                        <ChevronDown className="w-4 h-4"/>
                    </div>
                    <Link href="/search">
                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                            <Search className="w-6 h-6" />
                        </Button>
                    </Link>
                </header>

                <main className="flex-grow overflow-y-auto">
                    <div className="px-4">
                        <h1 className="text-3xl font-bold text-primary">Discover</h1>

                        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4 -mx-4 px-4">
                            {newUsers.map(({ userId, distance }) => {
                                const user = getUserById(userId);
                                if (!user) return null;
                                return <UserCard key={userId} user={user} distance={distance} />;
                            })}
                        </div>
                    </div>

                    <div className="px-4 mt-6">
                        <h2 className="text-2xl font-bold text-primary">Around me</h2>
                        <p className="text-muted-foreground">People with "<span className="text-accent">Music</span>" interest around you</p>
                    </div>

                    <div className="px-4 mt-4 relative">
                        <Image 
                            src={mapImage.imageUrl}
                            alt={mapImage.description}
                            width={600}
                            height={400}
                            className="w-full h-auto rounded-3xl object-cover"
                            data-ai-hint={mapImage.imageHint}
                        />
                         <div className="absolute inset-0">
                            {mapUsers.map(({ userId, top, left }) => {
                                const user = getUserById(userId);
                                if (!user) return null;
                                const userImage = findImage(user.image.id);
                                return (
                                    <Link href={`/user/${user.id}`} key={userId}>
                                        <Image
                                            src={userImage.imageUrl}
                                            alt={user.name}
                                            width={48}
                                            height={48}
                                            className="absolute rounded-full object-cover border-2 border-white"
                                            style={{ top, left, transform: 'translate(-50%, -50%)' }}
                                            data-ai-hint={userImage.imageHint}
                                        />
                                    </Link>
                                );
                            })}
                            
                            <Button className="absolute rounded-full bg-primary text-primary-foreground h-auto py-2 px-4" style={{ top: '30%', left: '50%', transform: 'translateX(-50%)' }}>
                                <span className="text-xs mr-2">((•))</span> Connect with Clara 👋
                            </Button>

                             <Button variant="outline" size="icon" className="absolute rounded-full bg-white w-12 h-12" style={{ bottom: '15%', right: '5%' }}>
                                <ZoomIn className="w-6 h-6 text-primary" />
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
