'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const notifications = [
  {
    id: 1,
    title: 'Exploring Indiana in the midst of whatever',
    preview: 'What about that new jacket...',
    date: '04/25',
    isUnread: true,
  },
  {
    id: 2,
    title: 'You just earned 2LQ from your new referral...',
    preview: 'What about that new jacket i...',
    date: '04/25',
    isUnread: false,
  },
  {
    id: 3,
    title: 'Exploring Indiana in the midst of whatever',
    preview: 'What about that new jacket i...',
    date: '04/25',
    isUnread: false,
  },
  {
    id: 4,
    title: 'Exploring Indiana in the midst of whatever',
    preview: 'What about that new jacket i...',
    date: '04/25',
    isUnread: false,
  },
  {
    id: 5,
    title: 'Exploring Indiana in the midst of whatever',
    preview: 'What about that new jacket i...',
    date: '04/25',
    isUnread: false,
  },
  {
    id: 6,
    title: 'Exploring Indiana in the midst of whatever',
    preview: 'What about that new jacket i...',
    date: '04/25',
    isUnread: false,
  },
];

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center p-4">
        <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10">
          <ChevronLeft className="h-6 w-6 text-primary" />
        </Button>
        <div className="flex-grow text-center">
          <h1 className="text-xl font-bold text-primary">Notifications</h1>
        </div>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow px-4 overflow-y-auto">
        <div className="divide-y divide-border">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-4 py-4">
              <div className="relative">
                <Mail className="w-6 h-6 text-muted-foreground mt-1" />
                {notification.isUnread && (
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-grow">
                <p className="font-semibold text-primary leading-tight">{notification.title}</p>
                <p className="text-sm text-muted-foreground truncate">{notification.preview}</p>
              </div>
              <span className="text-sm text-muted-foreground pt-1">{notification.date}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
