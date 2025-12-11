'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import AppLayout from '@/components/layout/AppLayout';
import { useConversations, useUserById, useUser as useLoggedInUser } from '@/firebase';
import { type Conversation } from '@/lib/data';
import { useMemo } from 'react';

const findImage = (id: string) => {
    const img = placeholderImages.find(p => p.id === id);
    return img || placeholderImages[0];
};

const ConversationRow = ({ convo }: { convo: Conversation }) => {
    const { data: loggedInUser } = useLoggedInUser();
    const otherUserId = useMemo(() => {
        if (!loggedInUser || !convo.userIds) return null;
        return convo.userIds.find(id => id !== loggedInUser.id)
    }, [loggedInUser, convo.userIds]);
    
    const { data: user, loading } = useUserById(otherUserId || '');

    if (loading || !user) {
        return <div className="flex items-center space-x-4 p-3 rounded-2xl bg-white/10 border border-white/20 h-[88px] animate-pulse" />;
    }

    if (!user.image || !convo.lastMessage) return null;

    const image = findImage(user.image.id);
    const isUnread = !convo.lastMessage.isRead && convo.lastMessage.senderId !== loggedInUser?.id;
    const timeString = new Date(convo.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    return (
         <Link href={`/messages/${user.id}`} className="flex items-center space-x-4 p-3 rounded-2xl bg-white/10 border border-white/20">
            <Image
                src={image.imageUrl}
                alt={user.name}
                width={56}
                height={56}
                className="rounded-full object-cover w-14 h-14"
                data-ai-hint={image.imageHint}
            />
            <div className="flex-grow">
                <h3 className="font-bold text-white">{user.name}</h3>
                <p className="text-white/70 truncate text-sm">{convo.lastMessage.text}</p>
            </div>
            <div className="flex flex-col items-end space-y-1">
                <span className="text-xs text-white/70">{timeString}</span>
                {isUnread && <div className="w-3 h-3 bg-accent rounded-full"></div>}
            </div>
        </Link>
    )
}

export default function MessagesPage() {
  const { data: conversations, loading } = useConversations();

  return (
    <AppLayout>
      <div className="bg-primary text-primary-foreground min-h-screen">
        <header className="flex items-center justify-between p-4 pt-12 max-w-md mx-auto">
          <Link href="/home">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Messages</h1>
          <div className="w-10"></div>
        </header>

        <main className="max-w-md mx-auto px-4 mt-4">
            <div className="space-y-3">
              {loading && Array.from({length: 3}).map((_, i) => <div key={i} className="flex items-center space-x-4 p-3 rounded-2xl bg-white/10 border border-white/20 h-[88px] animate-pulse" />)}
              {!loading && conversations.map((convo: Conversation) => (
                  <ConversationRow key={convo.id} convo={convo} />
              ))}
            </div>
        </main>
      </div>
    </AppLayout>
  );
}
