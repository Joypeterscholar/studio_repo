'use client';

import Image from 'next/image';
import {
  Bell,
  ThumbsUp,
  MessageCircle,
  Send,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/components/layout/AppLayout';
import Logo from '@/components/layout/Logo';
import { placeholderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { useUser } from '@/firebase';

const stories = [
  { id: 'selena', name: 'Selena', imageId: 'user-2' },
  { id: 'clara', name: 'Clara', imageId: 'user-1' },
  { id: 'fabian', name: 'Fabian', imageId: 'user-male-1' },
  { id: 'georgia', name: 'Georgia', imageId: 'user-3' },
  { id: 'ethan', name: 'Ethan', imageId: 'user-male-2' },
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

export default function HomePage() {
  const { data: loggedInUser } = useUser();
  const myStoryImage = loggedInUser ? findImage(loggedInUser.image.id) : null;


  return (
    <AppLayout>
      <div className="flex flex-col bg-background">
        <header className="flex items-center justify-between p-4 pt-6 md:p-6">
          <Logo isLinqUp className="w-28 text-primary" />
          <Button
            variant="ghost"
            size="icon"
            className="border w-10 h-10"
          >
            <Bell className="h-5 w-5" />
          </Button>
        </header>

        <div className="pl-4">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {myStoryImage && (
               <Link href="/story" className="flex-shrink-0 text-center w-20">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-pink-400 to-purple-400">
                    <Image
                      src={myStoryImage.imageUrl}
                      alt="My Story"
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-full h-full border-2 border-white"
                      data-ai-hint={myStoryImage.imageHint}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center border-2 border-white">
                    <Plus className="w-4 h-4 text-accent-foreground" />
                  </div>
                </div>
                <p className="text-xs mt-2 font-medium truncate">My Story</p>
              </Link>
            )}
            {stories.map((story) => {
              const image = findImage(story.imageId);
              return (
                <Link href="/story" key={story.id} className="flex-shrink-0 text-center w-20">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-pink-400 to-purple-400">
                      <Image
                        src={image.imageUrl}
                        alt={story.name}
                        width={80}
                        height={80}
                        className="rounded-full object-cover w-full h-full border-2 border-white"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  </div>
                  <p className="text-xs mt-2 font-medium truncate">{story.name}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <main className="px-4 py-4">
          <Tabs defaultValue="make-friends" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-primary/5 p-1 h-12">
              <TabsTrigger
                value="make-friends"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md text-primary/80"
              >
                Make Friends
              </TabsTrigger>
              <TabsTrigger
                value="search-partners"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-md text-primary/80"
              >
                Search Partners
              </TabsTrigger>
            </TabsList>
            <TabsContent value="make-friends" className="mt-6 space-y-6">
              {feedItems.map((item) => {
                const bgImage = findImage(item.backgroundImageId);
                const authorImage = findImage(item.authorImageId);
                return (
                  <Link href={`/post/${item.id}`} key={item.id} className="block">
                    <div className="relative h-[50vh] rounded-3xl overflow-hidden shadow-lg">
                      <Image
                        src={bgImage.imageUrl}
                        alt={bgImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={bgImage.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      <div className="absolute top-4 left-4">
                          <div className="flex items-center gap-2 rounded-full bg-black/30 text-white text-sm px-3 py-1.5 backdrop-blur-sm">
                              <span>{item.categoryIcon}</span>
                              <span>{item.category}</span>
                          </div>
                      </div>

                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                        <Button variant="ghost" size="icon" className="bg-black/30 h-12 w-12 text-white hover:bg-black/50">
                          <ThumbsUp />
                        </Button>
                        <Button variant="ghost" size="icon" className="bg-black/30 h-12 w-12 text-white hover:bg-black/50">
                          <MessageCircle />
                        </Button>
                        <Button variant="ghost" size="icon" className="bg-black/30 h-12 w-12 text-white hover:bg-black/50">
                          <Send />
                        </Button>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        {item.question && <p className="text-xl font-bold leading-tight mb-4">{item.question}</p>}
                        <div className="flex items-center gap-3">
                          <Image
                              src={authorImage.imageUrl}
                              alt={authorImage.description}
                              width={40}
                              height={40}
                              className="rounded-full object-cover border-2 border-white/80"
                              data-ai-hint={authorImage.imageHint}
                          />
                          <div>
                              <p className="font-semibold text-sm">{item.authorName}</p>
                              <p className="text-xs opacity-80 tracking-widest">{item.authorLocation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </TabsContent>
            <TabsContent value="search-partners">
              <div className="flex items-center justify-center h-48">
                <p>Partner search coming soon!</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AppLayout>
  );
}
