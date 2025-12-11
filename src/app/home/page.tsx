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
import { useUser, useUsers, useCollection, useUserById } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, limit } from 'firebase/firestore';
import type { Post, User } from '@/lib/data';

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

export default function HomePage() {
  const { data: loggedInUser, loading: userLoading } = useUser();
  const { data: stories, loading: storiesLoading } = useUsers();
  const firestore = useFirestore();
  
  const postsQuery = firestore ? query(collection(firestore, 'posts'), limit(10)) : null;
  const { data: feedItems, loading: feedLoading } = useCollection<Post>(postsQuery);

  const myStoryImage = loggedInUser?.image ? findImage(loggedInUser.image.id) : null;


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

        <div className="pl-4 md:pl-6">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {userLoading && <div className="w-20 h-20 rounded-full bg-muted animate-pulse" />}
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
            {storiesLoading && Array.from({length: 5}).map((_, i) => <div key={i} className="w-20 h-20 rounded-full bg-muted animate-pulse" />)}
            {stories.map((story) => {
              if (!story.image) return null;
              const image = findImage(story.image.id);
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

        <main className="px-4 py-4 md:px-6">
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
              {feedLoading && Array.from({length: 2}).map((_, i) => <div key={i} className="h-[70vh] rounded-3xl bg-muted animate-pulse max-w-md mx-auto" />) }
              {feedItems.map((item) => {
                const bgImage = item.images.length > 0 ? findImage(item.images[0].id) : placeholderImages[0];
                const { data: author } = useUserById(item.authorId);
                if (!author || !author.image) return <div key={item.id} className="h-[70vh] rounded-3xl bg-muted animate-pulse max-w-md mx-auto" />;
                const authorImage = findImage(author.image.id);
                
                return (
                  <Link href={`/post/${item.id}`} key={item.id} className="block">
                    <div className="relative h-[70vh] rounded-3xl overflow-hidden shadow-lg max-w-md mx-auto">
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
                              {/* <span>{item.categoryIcon}</span> */}
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
                        <p className="text-xl font-bold leading-tight mb-4">{item.title}</p>
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
                              <p className="font-semibold text-sm">{author.name}</p>
                              <p className="text-xs opacity-80 tracking-widest">{author.location}</p>
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
