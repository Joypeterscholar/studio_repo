
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
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUser, usePostById, useUserById } from '@/firebase';
import { useParams } from 'next/navigation';
import { type Comment as CommentType } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

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

const Comment = ({ comment }: { comment: CommentType }) => {
  const { data: author, loading } = useUserById(comment.authorId);

  if (loading || !author) {
    return (
        <div className="flex gap-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-grow space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    );
  }
  const authorImage = findImage(author.image.id);
  return (
    <div className="flex gap-4">
      <Image
        src={authorImage.imageUrl}
        alt={author.name}
        width={comment.replies ? 48 : 32}
        height={comment.replies ? 48 : 32}
        className="rounded-full object-cover self-start"
        data-ai-hint={authorImage.imageHint}
      />
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-primary">{author.name}</span>
              <span className="text-muted-foreground text-sm">- {new Date(comment.timestamp).toLocaleDateString()}</span>
            </div>
            <p className="mt-1 text-foreground/80 text-sm">{comment.text}</p>
            <button className="text-muted-foreground text-sm font-semibold mt-2 text-left">Reply</button>
          </div>
          <div className="flex flex-col items-center text-muted-foreground shrink-0">
            <Heart className="w-5 h-5"/>
            <span className="text-sm">{comment.likes.length}</span>
          </div>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply: any) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


export default function PostPage() {
  const params = useParams();
  const postId = params.id as string;
  const { data: post, loading: postLoading } = usePostById(postId);
  const { data: author, loading: authorLoading } = useUserById(post?.authorId);
  const { data: loggedInUser, loading: userLoading } = useUser();

  if (postLoading || authorLoading || userLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }
  
  if (!post || !author || !loggedInUser) {
    return <div className="flex h-screen items-center justify-center">Post not found.</div>
  }

  const authorImage = findImage(author.image.id);
  const bgImage = post.images.length > 0 ? findImage(post.images[0].id) : placeholderImages[0];
  const loggedInUserImage = findImage(loggedInUser.image.id);


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
                    <button className="text-left p-4 border-b">Follow {author.name}</button>
                    <button className="text-left p-4 border-b text-red-500">Not Interested in this Post</button>
                    <button className="text-left p-4">Block {author.name}</button>
                </div>
            </DialogContent>
        </Dialog>
      </header>

      <main className="pt-20 px-4 md:px-6 pb-8">
        <h1 className="text-2xl font-bold text-primary mb-4 leading-tight">
          {post.title}
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
            <p className="font-semibold text-primary">{author.name}</p>
            <p className="text-xs text-muted-foreground tracking-widest">
              {author.location}
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
              className="rounded-full bg-black/20 backdrop-blur-sm h-12 w-12 text-white hover:bg-black/40"
            >
              <ThumbsUp />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black/20 backdrop-blur-sm h-12 w-12 text-white hover:bg-black/40"
                >
                  <MessageCircle />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md w-[90vw] bg-background rounded-t-3xl rounded-b-none p-6 shadow-lg border-none bottom-0 translate-y-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 flex flex-col h-[80vh]">
                  <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="sr-only">Comments</DialogTitle>
                    <DialogClose className="absolute top-4 right-4">
                      <X className="w-5 h-5 text-muted-foreground" />
                    </DialogClose>
                  </DialogHeader>
                  <div className="flex-grow overflow-y-auto -mx-6 px-6 space-y-6">
                      {post.comments && post.comments.map((comment) => (
                          <Comment key={comment.id} comment={comment} />
                      ))}
                      {(!post.comments || post.comments.length === 0) && (
                        <p className='text-center text-muted-foreground pt-10'>No comments yet.</p>
                      )}
                  </div>
                  <div className="flex-shrink-0 -mx-6 px-4 pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Image 
                        src={loggedInUserImage.imageUrl}
                        alt={loggedInUser.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        data-ai-hint={loggedInUserImage.imageHint}
                      />
                      <Input 
                        placeholder={`Comment as ${loggedInUser.name}`}
                        className="flex-1 border-none bg-transparent focus-visible:ring-0"
                      />
                       <Button
                          type="submit"
                          size="icon"
                          className="h-12 w-12 flex-shrink-0 rounded-full bg-accent text-accent-foreground"
                        >
                          <Send className="h-6 w-6" />
                        </Button>
                    </div>
                  </div>
              </DialogContent>
            </Dialog>

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
          <p>{post.content}</p>
        </div>
        
      </main>
    </div>
  );
}
