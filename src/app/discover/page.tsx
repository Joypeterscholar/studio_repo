'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, SlidersHorizontal, Star, X, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { getUserById, loggedInUser } from '@/lib/data';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from '@/components/ui/dialog';
import Link from 'next/link';

const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const profiles = [
    { userId: '1' },
    { userId: '2' },
    { userId: '3' },
    { userId: '4' },
    { userId: '5' },
];

const menuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Search', href: '/discover' },
    { label: 'Settings', href: '/settings' },
    { label: 'Messages', href: '/messages' },
]

export default function DiscoverPage() {
    const [current, setCurrent] = useState(0);
    const loggedInUserImage = findImage(loggedInUser.image.id);

    const handleAction = () => {
        setCurrent(current + 1);
    };

    const currentUser = getUserById(profiles[current % profiles.length].userId);
    const nextUser = getUserById(profiles[(current + 1) % profiles.length].userId);
    
    if (!currentUser || !nextUser) {
        return <AppLayout><div>Loading...</div></AppLayout>;
    }

    const currentUserImage = findImage(currentUser.image.id);
    const nextUserImage = findImage(nextUser.image.id);

    return (
        <AppLayout>
            <div className="flex flex-col h-full bg-background text-foreground p-4">
                <header className="flex items-center justify-between">
                    <Dialog>
                        <DialogTrigger asChild>
                             <Image
                                src={loggedInUserImage.imageUrl}
                                alt={loggedInUser.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover cursor-pointer"
                                data-ai-hint={loggedInUserImage.imageHint}
                            />
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md w-[90vw] m-auto bg-white rounded-2xl p-0 top-24 translate-y-0">
                            <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
                                <DialogTitle className="sr-only">Menu</DialogTitle>
                                <span></span>
                                <DialogClose asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full h-auto w-auto p-0">
                                    <X className="w-5 h-5 text-muted-foreground" />
                                    </Button>
                                </DialogClose>
                            </DialogHeader>
                             <div className="flex flex-col text-base">
                                {menuItems.map((item) => {
                                const content = (
                                    <button
                                    key={item.label}
                                    className={'text-left p-4 border-b text-primary'}
                                    >
                                    {item.label}
                                    </button>
                                );
                                return <Link href={item.href} key={item.label}>{content}</Link>
                                })}
                            </div>
                        </DialogContent>
                    </Dialog>
                   
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                            <Heart className="w-6 h-6 text-primary" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
                            <SlidersHorizontal className="w-6 h-6 text-primary" />
                        </Button>
                    </div>
                </header>

                <Tabs defaultValue="search-partners" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2 rounded-full bg-muted p-1 h-12">
                        <TabsTrigger value="make-friends" className="rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
                            Make Friends
                        </TabsTrigger>
                        <TabsTrigger value="search-partners" className="rounded-full text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md">
                            Search Partners
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="search-partners" className="flex-grow flex flex-col justify-center items-center mt-4">
                        <div className="relative w-full h-[60vh] max-w-sm">
                            {/* Next Card */}
                             <div 
                                className="absolute top-0 w-full h-full p-4 bg-gray-200 rounded-3xl"
                                style={{ transform: 'scale(0.95)', zIndex: 1, top: '10px' }}
                            >
                                <Image
                                    src={nextUserImage.imageUrl}
                                    alt={nextUser.name}
                                    fill
                                    className="object-cover rounded-3xl"
                                    data-ai-hint={nextUserImage.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-2xl font-bold">{nextUser.name}, {nextUser.age}</h3>
                                    <p className="text-sm uppercase tracking-wider">{nextUser.location}</p>
                                </div>
                            </div>
                            
                            {/* Current Card */}
                            <div className="absolute top-0 w-full h-full p-4 bg-white rounded-3xl shadow-lg" style={{ zIndex: 2 }}>
                                <Image
                                    src={currentUserImage.imageUrl}
                                    alt={currentUser.name}
                                    fill
                                    className="object-cover rounded-3xl"
                                    data-ai-hint={currentUserImage.imageHint}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-3xl" />

                                <div className="absolute top-4 left-4 bg-black/40 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                                    16.8 km away
                                </div>

                                <div className="absolute top-4 right-4 flex flex-col gap-2 text-white">
                                    <Instagram className="w-6 h-6" />
                                    <Twitter className="w-6 h-6" />
                                </div>
                                
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-2xl font-bold">{currentUser.name}, {currentUser.age}</h3>
                                    <p className="text-sm uppercase tracking-wider">{currentUser.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-8 w-full max-w-sm">
                            <Button onClick={handleAction} variant="outline" size="icon" className="w-20 h-20 rounded-full bg-white border-muted shadow-md">
                                <X className="w-8 h-8 text-muted-foreground" />
                            </Button>
                            <Button onClick={handleAction} size="icon" className="w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-lg">
                                <Star className="w-8 h-8 fill-current" />
                            </Button>
                            <Button onClick={handleAction} size="icon" className="w-20 h-20 rounded-full bg-accent text-accent-foreground shadow-lg">
                                <Heart className="w-8 h-8 fill-current" />
                            </Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
