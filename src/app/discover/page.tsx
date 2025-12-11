
'use client';

import Image from 'next/image';
import {
  ChevronDown,
  MapPin,
  SlidersHorizontal,
  X,
  Heart,
  Star,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
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
import { type Post, type User } from '@/lib/data';
import { collection, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

export default function DiscoverPage() {
  const { data: loggedInUser, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { data: users, loading: usersLoading } = useUsers();

  const postsQuery = firestore ? query(collection(firestore, 'posts')) : null;
  const { data: feedItems, loading: postsLoading } = useCollection<Post>(postsQuery);
  
  const mapUsers = users.slice(0, 3);
  const mapUsersPositions = [
    { top: '20%', left: '45%' },
    { top: '48%', left: '70%' },
    { top: '75%', left: '35%' },
  ];

  const menuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Search', href: '/search' },
    { label: 'Settings', href: '/settings' },
    { label: 'Messages', href: '/messages' },
  ];

  if (userLoading) {
    return <AppLayout><div className="flex h-full items-center justify-center">Loading...</div></AppLayout>;
  }

  if (!loggedInUser) {
    return <AppLayout><div className="flex h-full items-center justify-center p-4">Please log in to discover. <Link href="/login" className="ml-2"><Button>Login</Button></Link></div></AppLayout>;
  }

  const loggedInUserImage = findImage(loggedInUser.image.id);

  const FeedSkeleton = () => (
    <div className="space-y-6">
        <div className="relative h-[65vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-lg bg-muted animate-pulse max-w-md mx-auto">
            <Skeleton className="w-full h-full" />
            <div className="absolute bottom-6 left-6 right-6">
                <Skeleton className="h-6 w-3/4 mb-4" />
            </div>
        </div>
         <div className="flex justify-center items-center gap-4 py-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <Skeleton className="w-14 h-14 rounded-full" />
            <Skeleton className="w-16 h-16 rounded-full" />
        </div>
    </div>
  );

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
               {postsLoading && <FeedSkeleton />}
               {!postsLoading && feedItems.length === 0 && (
                   <div className="flex flex-col items-center justify-center h-[60vh] text-center text-muted-foreground">
                        <Compass className="w-16 h-16 mb-4" />
                        <h3 className="text-lg font-semibold">Nothing to show</h3>
                        <p>There are no posts to show you right now.</p>
                   </div>
               )}
               {!postsLoading && feedItems.map((item, index) => {
                const bgImage = item.images.length > 0 ? findImage(item.images[0].id) : placeholderImages[0];
                return (
                  <div key={item.id}>
                    <div className="relative h-[65vh] md:h-[70vh] rounded-3xl overflow-hidden shadow-lg max-w-md mx-auto">
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
                     {index === feedItems.length - 1 && (
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
                     )}
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="around-me" className="mt-6">
                <div className="relative max-w-md mx-auto">
                  <Skeleton className="w-full h-[60vh] rounded-3xl" />
                  <Image
                    src={findImage('map-background').imageUrl}
                    alt={findImage('map-background').description}
                    fill
                    className="w-full h-auto rounded-3xl object-cover"
                    data-ai-hint={findImage('map-background').imageHint}
                  />
                  <div className="absolute inset-0">
                    {usersLoading && <div className="absolute inset-0 bg-muted/50 animate-pulse rounded-3xl" />}
                    {!usersLoading && mapUsers.map((user, index) => {
                      if (!user || !user.image) return null;
                      const position = mapUsersPositions[index];
                      const userImage = findImage(user.image.id);
                      return (
                        <Link href={`/user/${user.id}`} key={user.id}>
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
                  </div>
                </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AppLayout>
  );
}
