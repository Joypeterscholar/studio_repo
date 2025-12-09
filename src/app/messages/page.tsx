'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import AppLayout from '@/components/layout/AppLayout';
import { getConversationsWithUserDetails } from '@/lib/data';

const conversations = getConversationsWithUserDetails();

const findImage = (id: string) => {
    const img = placeholderImages.find(p => p.id === id);
    return img || placeholderImages[0];
};

export default function MessagesPage() {
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
            {conversations.map((convo) => {
                const image = findImage(convo.user?.image.id || '');
                const isUnread = !convo.lastMessage.isRead && convo.lastMessage.senderId !== '0';
                
                // Static time for hydration consistency
                const timeString = '10:00';

                return (
                    <Link href={`/messages/${convo.userId}`} key={convo.id} className="flex items-center space-x-4 p-3 rounded-2xl bg-white/10 border border-white/20">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            width={56}
                            height={56}
                            className="rounded-full object-cover w-14 h-14"
                            data-ai-hint={image.imageHint}
                        />
                        <div className="flex-grow">
                            <h3 className="font-bold text-white">{convo.user?.name}</h3>
                            <p className="text-white/70 truncate text-sm">{convo.lastMessage.text}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                            <span className="text-xs text-white/70">{timeString}</span>
                            {isUnread && <div className="w-3 h-3 bg-accent rounded-full"></div>}
                        </div>
                    </Link>
                )
            })}
            </div>
        </main>
      </div>
    </AppLayout>
  );
}
