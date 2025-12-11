'use client';

import Image from 'next/image';
import {
  ChevronDown,
  MapPin,
  SlidersHorizontal,
  X,
  Heart,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import type { User } from '@/lib/data';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser, useUsers, useUserById, useCollection } from '@/firebase';
import { type Post } from '@/lib/data';
import { collection, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

const mapUsersIds = ['1', '4', '2'];
const mapUsersPositions = [
  { top: '20%', left: '45%' },
  { top: '48%', left: '70%' },
  { top: '75%', left: '35%' },
];

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

export default function DiscoverPage() {
  const mapImage = findImage('map-background');
  const { data: loggedInUser, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const postsQuery = firestore ? query(collection(firestore, 'posts')) : null;
  const { data: feedItems, loading: postsLoading } = useCollection<Post>(postsQuery);

  const menuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Search', href: '/search' },
    { label: 'Settings', href: '/settings' },
    { label: 'Messages', href: '/messages' },
  ];

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (!loggedInUser) {
    // Or redirect to login
    return <div>Please log in.</div>;
  }

  const loggedInUserImage = findImage(loggedInUser.image.id);

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background text-foreground">
        <header className="p-4 flex items-center justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <button>
                <Image
                  src={loggedInUserImage.imageUrl}
                  alt="My Profile"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
                  data-ai-hint={loggedInUserImage.imageHint}
                />
              </button>
            </DialogTrigger>
            <DialogContent className="top-24 w-[90vw] max-w-xs rounded-2xl bg-white p-0 shadow-lg">
              <DialogHeader>
                <DialogTitle className="sr-only">Menu</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col text-base text-primary">
                {menuItems.map((item) => (
                  <DialogClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className="text-left p-4 border-b last:border-b-0"
                    >
                      {item.label}
                    </Link>
                  </DialogClose>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Link href="/discover-from">
            <div className="flex items-center gap-1 text-primary">
              <MapPin className="w-5 h-5" />
              <span className="font-bold">Lagos</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12"
              >
                <SlidersHorizontal className="w-6 h-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-[90vw] bg-white rounded-2xl p-4">
              <p>Filter options will be here.</p>
            </DialogContent>
          </Dialog>
        </header>

        <main className="flex-grow overflow-y-auto px-4">
          <Tabs defaultValue="for-you" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-primary/5 p-1 h-12">
              <TabsTrigger
                value="for-you"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md text-primary/80"
              >
                For you
              </TabsTrigger>
              <TabsTrigger
                value="around-me"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md text-primary/80"
              >
                Around me
              </TabsTrigger>
            </TabsList>

            <TabsContent value="for-you" className="mt-6 space-y-6">
               {postsLoading && <div className="relative h-[65vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-lg bg-muted animate-pulse" />}
               {!postsLoading && feedItems.map((item) => {
                const bgImage = item.images.length > 0 ? findImage(item.images[0].id) : placeholderImages[0];
                return (
                  <div key={item.id} className="relative h-[65vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-lg max-w-md mx-auto">
                    <Image
                        src={bgImage.imageUrl}
                        alt={bgImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={bgImage.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="text-xl font-bold leading-tight mb-4">{item.title}</p>
                    </div>
                  </div>
                );
              })}
               <div className="flex justify-center items-center gap-4 py-4">
                  <Button variant="outline" size="icon" className="w-16 h-16 border-gray-300 text-gray-500 bg-white shadow-md">
                      <X className="w-8 h-8" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-14 h-14 border-purple-400 text-purple-500 bg-white shadow-md">
                      <Star className="w-8 h-8 fill-current" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-16 h-16 border-accent text-accent bg-white shadow-md">
                      <Heart className="w-8 h-8 fill-current" />
                  </Button>
              </div>
            </TabsContent>

            <TabsContent value="around-me" className="mt-6">
                <div className="relative max-w-md mx-auto">
                  <Image
                    src={mapImage.imageUrl}
                    alt={mapImage.description}
                    width={600}
                    height={400}
                    className="w-full h-auto rounded-3xl object-cover"
                    data-ai-hint={mapImage.imageHint}
                  />
                  <div className="absolute inset-0">
                    {mapUsersIds.map((userId, index) => {
                      const { data: user } = useUserById(userId);
                      const position = mapUsersPositions[index];
                      if (!user || !user.image) return null;
                      const userImage = findImage(user.image.id);
                      return (
                        <Link href={`/user/${user.id}`} key={userId}>
                          <Image
                            src={userImage.imageUrl}
                            alt={user.name}
                            width={48}
                            height={48}
                            className="absolute object-cover border-2 border-white rounded-full"
                            style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
                            data-ai-hint={userImage.imageHint}
                          />
                        </Link>
                      );
                    })}

                    <Button
                      className="absolute bg-primary text-primary-foreground h-auto py-2 px-4"
                      style={{
                        top: '30%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <span className="text-xs mr-2">((•))</span> Connect with
                      Clara 👋
                    </Button>
                  </div>
                </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AppLayout>
  );
}
