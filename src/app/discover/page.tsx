'use client';

import Image from 'next/image';
import {
  ChevronDown,
  MapPin,
  SlidersHorizontal,
  X,
  Heart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
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
import { useUser, useUsers, useUserById } from '@/firebase';

const newUsersIds = ['13', '14', '15'];
const mapUsersIds = ['1', '4', '2'];
const mapUsersPositions = [
  { top: '20%', left: '45%' },
  { top: '48%', left: '70%' },
  { top: '75%', left: '35%' },
];

const feedItems = [
  {
    id: 'feed-1',
    category: 'Travel',
    categoryIcon: '🏝️',
    backgroundImageId: 'feed-prague',
    question: 'If you could live anywhere in the world, where would you pick?',
    authorName: 'Miranda Kehlani',
    authorLocation: 'STUTTGART',
    authorImageId: 'user-7',
  },
  {
    id: 'feed-2',
    category: 'Casual Dating',
    categoryIcon: '😎',
    backgroundImageId: 'feed-couple',
    question: null,
    authorName: 'John & Jane',
    authorLocation: 'BERLIN',
    authorImageId: 'user-8',
  },
];


const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const UserCard = ({ user, distance }: { user: User; distance: number }) => {
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
      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
        NEW
      </div>
      <div className="absolute bottom-2 left-2 right-2 text-white">
        <p className="text-xs bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 inline-block">
          {distance} km away
        </p>
        <p className="font-bold truncate mt-1">
          {user.name}, {user.age}
        </p>
        <p className="text-xs uppercase tracking-wider">{user.location}</p>
      </div>
    </Link>
  );
};

export default function DiscoverPage() {
  const mapImage = findImage('map-background');
  const { data: loggedInUser } = useUser();

  const menuItems = [
    { label: 'Profile', href: '/profile' },
    { label: 'Search', href: '/search' },
    { label: 'Settings', href: '/settings' },
    { label: 'Messages', href: '/messages' },
  ];

  if (!loggedInUser) {
    return <div>Loading...</div>;
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
               {feedItems.map((item) => {
                const bgImage = findImage(item.backgroundImageId);
                return (
                  <div key={item.id} className="relative h-[65vh] rounded-3xl overflow-hidden shadow-lg">
                    <Image
                        src={bgImage.imageUrl}
                        alt={bgImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={bgImage.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        {item.question && <p className="text-xl font-bold leading-tight mb-4">{item.question}</p>}
                    </div>
                  </div>
                );
              })}
               <div className="flex justify-center items-center gap-4 py-4">
                  <Button variant="outline" size="icon" className="w-16 h-16 border-gray-300 text-gray-500 bg-white shadow-md">
                      <X className="w-8 h-8" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-14 h-14 border-purple-400 text-purple-500 bg-white shadow-md">
                      <StarIcon className="w-8 h-8 fill-current" />
                  </Button>
                  <Button variant="outline" size="icon" className="w-16 h-16 border-accent text-accent bg-white shadow-md">
                      <Heart className="w-8 h-8 fill-current" />
                  </Button>
              </div>
            </TabsContent>

            <TabsContent value="around-me" className="mt-6">
                <div className="relative">
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
                      if (!user) return null;
                      const userImage = findImage(user.image.id);
                      return (
                        <Link href={`/user/${user.id}`} key={userId}>
                          <Image
                            src={userImage.imageUrl}
                            alt={user.name}
                            width={48}
                            height={48}
                            className="absolute object-cover border-2 border-white"
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

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
)
