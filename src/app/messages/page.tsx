'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import AppLayout from '@/components/layout/AppLayout';
import { getConversationsWithUserDetails } from '@/lib/data';

const recentMatches = [
  { id: 'likes', count: 32 },
  { id: 'user-1', name: 'Brianna' },
  { id: 'user-2', name: 'Alex' },
  { id: 'user-3', name: 'Carlos' },
  { id: 'user-4', name: 'Diana' },
];

const conversations = getConversationsWithUserDetails();

const findImage = (id: string) => {
    const img = placeholderImages.find(p => p.id === id);
    return img || placeholderImages[0];
};

export default function MessagesPage() {
  return (
    <AppLayout>
      <div className="bg-primary text-primary-foreground">
        <header className="flex items-center justify-between p-4 pt-12 max-w-md mx-auto">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Messages</h1>
          <div className="w-10"></div>
        </header>

        <div className="px-4 pb-6">
          <h2 className="text-lg font-semibold mt-4 mb-3 max-w-md mx-auto">Recent Matches</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2 -mx-4 px-4">
            {recentMatches.map((match, index) => {
                if (match.id === 'likes') {
                    return (
                        <div key={match.id} className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 bg-accent rounded-2xl text-accent-foreground">
                            <Heart className="w-8 h-8 fill-current" />
                            <span className="font-bold mt-1">{match.count}</span>
                        </div>
                    );
                }
                const image = findImage(match.id);
                return (
                    <div key={match.id} className="flex-shrink-0">
                         <Image
                            src={image.imageUrl}
                            alt={image.description}
                            width={96}
                            height={96}
                            className="rounded-2xl object-cover w-24 h-24"
                            data-ai-hint={image.imageHint}
                        />
                    </div>
                )
            })}
          </div>
        </div>
      </div>

      <div className="bg-background rounded-t-[2.5rem] -mt-8 pt-8 flex-grow">
        <div className="max-w-md mx-auto px-4">
            {conversations.map((convo) => {
                const image = findImage(convo.user?.image.id || '');
                const isUnread = !convo.lastMessage.isRead && convo.lastMessage.senderId !== '0';
                return (
                    <Link href={`/messages/${convo.userId}`} key={convo.id} className="flex items-center space-x-4 py-3">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            width={56}
                            height={56}
                            className="rounded-full object-cover w-14 h-14"
                            data-ai-hint={image.imageHint}
                        />
                        <div className="flex-grow">
                            <h3 className="font-bold">{convo.user?.name}</h3>
                            <p className="text-muted-foreground truncate text-sm">{convo.lastMessage.text}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                            <span className="text-xs text-muted-foreground">{new Date(convo.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            {isUnread && <div className="w-3 h-3 bg-pink-500 rounded-full"></div>}
                        </div>
                    </Link>
                )
            })}
        </div>
      </div>
    </AppLayout>
  );
}
