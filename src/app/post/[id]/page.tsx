'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  ThumbsUp,
  MessageCircle,
  Send,
  Heart,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

// Dummy data, this would come from an API based on params.id
const post = {
  id: 'feed-1',
  question: 'If you could live anywhere in the world, where would you pick?',
  authorName: 'Miranda Kehlani',
  authorLocation: 'STUTTGART',
  authorImageId: 'user-7',
  backgroundImageId: 'feed-prague',
  body: [
    'Lorem ipsum dolor sit amet consectetur. Odio sapien ipsum molestie arcu quis sit tincidunt dignissim. Venenatis feugiat vitae amet aliquet. Quis mi fames odio felis. Tempus pretium non massa vitae.',
    'Neque lacus neque odio pharetra sed sit egestas tempus sit. Scelerisque diam malesuada nunc nulla risus congue volutpat. Integer risus ac lectus sed nulla. Fringilla suscipit a leo sit purus pharetra accumsan pellentesque. Lacus ultricies tristique id pellentesque.',
  ],
};

const comments = [
  {
    id: 'comment-1',
    authorName: 'Joy Peters',
    authorImageId: 'user-1',
    timestamp: '3d',
    text: 'Office ipsum you must be muted. Left on needle running discussion individual. Get dunder reality cc nail when eco-system speed anyway forward. We let or jumping kimono I.',
    likes: 32,
  },
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


export default function PostPage({ params }: { params: { id: string } }) {
  const authorImage = findImage(post.authorImageId);
  const bgImage = findImage(post.backgroundImageId);
  const commentAuthorImage = findImage(comments[0].authorImageId);

  return (
    <div className="bg-background min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm">
        <Link href="/home" passHref>
          <Button variant="ghost" size="icon" className="rounded-full border w-10 h-10">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border w-10 h-10 text-primary">
                  <FilterIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl p-0">
                <DialogHeader className="p-4 flex flex-row items-center justify-between border-b">
                    <DialogTitle className="sr-only">Post Options</DialogTitle>
                    <span></span>
                </DialogHeader>
                <div className="flex flex-col text-sm">
                    <button className="text-left p-4 border-b">View Profile</button>
                    <button className="text-left p-4 border-b">Follow Miranda</button>
                    <button className="text-left p-4 border-b text-red-500">Not Interested in this Post</button>
                    <button className="text-left p-4">Block Miranda</button>
                </div>
            </DialogContent>
        </Dialog>
      </header>

      <main className="pt-20 px-4 md:px-6 pb-8">
        <h1 className="text-2xl font-bold text-primary mb-4 leading-tight">
          {post.question}
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <Image
            src={authorImage.imageUrl}
            alt={authorImage.description}
            width={40}
            height={40}
            className="rounded-full object-cover"
            data-ai-hint={authorImage.imageHint}
          />
          <div>
            <p className="font-semibold text-primary">{post.authorName}</p>
            <p className="text-xs text-muted-foreground tracking-widest">
              {post.authorLocation}
            </p>
          </div>
        </div>

        <div className="relative mb-6">
          <Image
            src={bgImage.imageUrl}
            alt={bgImage.description}
            width={800}
            height={600}
            className="rounded-2xl object-cover w-full aspect-[4/3]"
            data-ai-hint={bgImage.imageHint}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-sky-400/80 hover:bg-sky-400 h-12 w-12 text-white"
            >
              <ThumbsUp />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/20 backdrop-blur-sm h-12 w-12 text-white hover:bg-black/40"
            >
              <MessageCircle />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/20 backdrop-blur-sm h-12 w-12 text-white hover:bg-black/40"
            >
              <Send />
            </Button>
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12">
            {comments.map((comment) => (
                <div key={comment.id} className="bg-gray-800 text-white rounded-2xl p-4">
                    <div className="flex gap-4">
                        <Image
                            src={commentAuthorImage.imageUrl}
                            alt={comment.authorName}
                            width={48}
                            height={48}
                            className="rounded-full object-cover w-12 h-12"
                            data-ai-hint={commentAuthorImage.imageHint}
                        />
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="font-bold">{comment.authorName}</span>
                                    <span className="text-gray-400 ml-2">- {comment.timestamp}</span>
                                </div>
                                <div className="flex flex-col items-center text-gray-400">
                                    <Heart className="w-5 h-5"/>
                                    <span className="text-xs">{comment.likes}</span>
                                </div>
                            </div>
                            <p className="mt-1 text-gray-300 text-sm">{comment.text}</p>
                            <button className="text-gray-400 text-sm font-semibold mt-2">Reply</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </main>
    </div>
  );
}
