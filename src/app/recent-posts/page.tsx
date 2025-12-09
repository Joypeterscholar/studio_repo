'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import AppLayout from '@/components/layout/AppLayout';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const posts: any[] = [
  // {
  //   id: '1',
  //   title: 'Exploring Indiana in the midst of whatever',
  //   preview: 'What about that new jacket i...',
  //   date: '04/25',
  //   authorImageId: 'user-male-1',
  // },
];

const FilterIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V12C5 11.4696 5.21071 10.9609 5.58579 10.5858C5.96086 10.2107 6.46957 10 7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21V16C12 15.4696 12.2107 14.9609 12.5858 14.5858C12.9609 14.2107 13.4696 14 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 7C7 6.46957 7.21071 5.96086 7.58579 5.58579C7.96086 5.21071 8.46957 5 9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3V8C12 8.53043 11.7893 9.03914 11.4142 9.41421C11.0391 9.78929 10.5304 10 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V10C19 9.46957 18.7893 8.96086 18.4142 8.58579C18.0391 8.21071 17.5304 8 17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 5C17 4.46957 16.7893 3.96086 16.4142 3.58579C16.0391 3.21071 15.5304 3 15 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
)

export default function RecentPostsPage() {
  const router = useRouter();
  const crossIcon = findImage('delete-cross-icon');

  if (posts.length === 0) {
    return (
      <div className="flex flex-col h-screen bg-background text-foreground">
        <header className="p-4">
            <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10">
              <ChevronLeft className="h-6 w-6" />
            </Button>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pb-16">
            {crossIcon && (
                <Image
                    src={crossIcon.imageUrl}
                    alt={crossIcon.description}
                    width={150}
                    height={150}
                    className="mb-8"
                    data-ai-hint={crossIcon.imageHint}
                />
            )}
          
          <h1 className="text-xl font-bold text-primary mb-2">
            You do not have any posts yet.
          </h1>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Click the button below to start making your posts.
          </p>
        </main>
        <footer className="p-6">
            <Link href="/create-post" passHref>
                <Button className="w-full rounded-full" size="lg">
                    Add a Post <Plus className="w-5 h-5 ml-2" />
                </Button>
            </Link>
        </footer>
      </div>
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-background text-foreground">
        <header className="flex items-center justify-between p-4 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full border w-10 h-10">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold text-primary">Recent Posts</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full border w-10 h-10 text-primary">
                <FilterIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="top-40 w-[90vw] max-w-xs rounded-2xl bg-white p-0 shadow-lg">
              <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
                 <DialogTitle className="sr-only">Post Options</DialogTitle>
                 <span></span>
                 <DialogClose asChild>
                  <button>
                    <X className="w-5 h-5" />
                  </button>
                </DialogClose>
              </DialogHeader>
              <div className="flex flex-col text-base">
                <DialogClose asChild>
                  <Link href="/create-post" className="text-left p-4 border-b">New Post</Link>
                </DialogClose>
                <button className="text-left p-4 border-b">Drafts</button>
                <button className="text-left p-4 border-b">Select all</button>
                <button className="text-left p-4 text-red-500">Delete</button>
              </div>
            </DialogContent>
          </Dialog>
        </header>
        <main className="flex-grow overflow-y-auto px-4">
          <div className="divide-y divide-border">
            {posts.map((post) => {
              const authorImage = findImage(post.authorImageId);
              return (
                <Link href={`/post/${post.id}`} key={post.id} className="flex items-center gap-4 py-4">
                  <Image
                    src={authorImage.imageUrl}
                    alt={authorImage.description}
                    width={56}
                    height={56}
                    className="rounded-full object-cover w-14 h-14"
                    data-ai-hint={authorImage.imageHint}
                  />
                  <div className="flex-grow">
                    <h2 className="font-semibold text-primary">{post.title}</h2>
                    <p className="text-sm text-muted-foreground truncate">{post.preview}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
