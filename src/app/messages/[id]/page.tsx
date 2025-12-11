
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  Paperclip,
  Camera,
  Mic,
  Smile,
  Check,
  Video,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  type Message,
  type User,
  type Conversation,
} from '@/lib/data';
import { useParams } from 'next/navigation';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useCollection, useUser, useUserById } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';


const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const DoubleCheck = ({ className }: { className?: string }) => (
    <div className={cn("relative w-4 h-4", className)}>
        <Check className="absolute w-4 h-4 left-0" />
        <Check className="absolute w-4 h-4 -left-1.5" />
    </div>
)

export default function ConversationPage() {
  const params = useParams();
  const otherUserId = params.id as string;
  
  const { data: otherUser, loading: userLoading } = useUserById(otherUserId);
  const { data: loggedInUser, loading: loggedInUserLoading } = useUser();
  const firestore = useFirestore();

  const conversationId = useMemo(() => {
    if (!loggedInUser || !otherUserId) return null;
    return [loggedInUser.id, otherUserId].sort().join('_');
  }, [loggedInUser, otherUserId]);

  const messagesQuery = firestore && conversationId ? query(collection(firestore, `conversations/${conversationId}/messages`), orderBy('timestamp', 'asc')) : null;
  const { data: messages, loading: messagesLoading } = useCollection<Message>(messagesQuery);
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !otherUser || !loggedInUser) return;
    // In a real app, you would add the message to Firestore here.
    console.log("Sending message:", newMessage);
    setNewMessage('');
  };

  if (userLoading || loggedInUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-primary text-primary-foreground">
        <p>Loading...</p>
      </div>
    );
  }

  if (!otherUser || !loggedInUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-primary text-primary-foreground">
        <p>User not found.</p>
      </div>
    );
  }
  
  const loggedInUserImage = findImage(loggedInUser.image.id);
  const otherUserImage = findImage(otherUser.image.id);


  return (
    <div className="flex h-screen flex-col bg-primary text-primary-foreground">
      <header className="flex items-center justify-between p-4 pt-12">
        <Link href="/messages" passHref>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold">{otherUser.name}</h1>
        <Link href={`/video-call/${otherUser.id}`} passHref>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Video className="h-6 w-6" />
          </Button>
        </Link>
      </header>
      
      <div className="text-center text-xs text-primary-foreground/70 mb-4">
        Friday, 2025. 8:00
      </div>

      <div className="flex-grow overflow-y-auto rounded-t-[2.5rem] bg-background p-6">
        <div className="flex flex-col gap-4">
          {messagesLoading && Array.from({length: 5}).map((_, i) => <div key={i} className={`h-12 w-2/3 rounded-2xl bg-muted animate-pulse ${i % 2 === 0 ? 'self-start' : 'self-end'}`} />) }
          {messages.map((message) => {
            const isSender = message.senderId === loggedInUser.id;
            const userImage = isSender ? loggedInUserImage : otherUserImage;
            const userName = isSender ? loggedInUser.name : otherUser.name;
            const messageDate = new Date(message.timestamp);
            const timeString = `${messageDate.getHours().toString().padStart(2, '0')}:${messageDate.getMinutes().toString().padStart(2, '0')}`;

            return (
              <div
                key={message.id}
                className={cn('flex items-end gap-3', {
                  'flex-row-reverse': isSender,
                })}
              >
                <Image
                  src={userImage.imageUrl}
                  alt={userName}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                  data-ai-hint={userImage.imageHint}
                />
                <div
                  className={cn(
                    'max-w-[70%] rounded-2xl p-3 text-sm',
                    isSender
                      ? 'rounded-br-none bg-primary/10 text-foreground'
                      : 'rounded-bl-none bg-muted'
                  )}
                >
                  <p>{message.text}</p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                    <span>{timeString}</span>
                    {isSender && <DoubleCheck className="text-blue-500" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="bg-background p-4" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-muted p-2">
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <Smile className="text-muted-foreground" />
            </Button>
            <Input
              placeholder="Message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border-none bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="text-muted-foreground" />
            </Button>
            <Button type="button" variant="ghost" size="icon" className="rounded-full">
              <Camera className="text-muted-foreground" />
            </Button>
          </div>
          <Button type="submit" size="icon" className="h-12 w-12 flex-shrink-0 rounded-full bg-accent text-accent-foreground">
            <Mic className="h-6 w-6" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
