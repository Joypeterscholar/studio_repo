'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Plus, MessageSquare, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';

const navItems = [
  { href: '/home', icon: Home },
  { href: '/discover', icon: Compass },
  { href: '/create', icon: Plus, isCentral: true },
  { href: '/messages', icon: Users },
  { href: '/profile', icon: MessageSquare },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const centralItemIndex = navItems.findIndex(item => item.isCentral);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow pb-28">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-transparent">
        <div 
          className="relative max-w-md mx-auto h-24 bg-white/90 backdrop-blur-lg rounded-[2.5rem] shadow-[0_0_20px_rgba(0,0,0,0.1)]"
        >
          <div className="flex justify-around items-center h-full px-4">
            {navItems.map((item, index) => {
              if (item.isCentral) return <div key="placeholder" className="w-16" />;
              
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "flex flex-col items-center justify-center text-muted-foreground transition-colors",
                  )}
                >
                  <item.icon className={cn('w-7 h-7', isActive ? 'text-accent' : 'text-gray-400')} />
                </Link>
              );
            })}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <button
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground transition-transform duration-300 ease-in-out",
                )}
                style={{
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                }}
              >
                <Plus className="w-8 h-8" />
              </button>
            </DialogTrigger>
             <DialogContent className="sm:max-w-md w-[90vw] bg-white rounded-2xl p-0 shadow-xl border-none bottom-24 translate-y-0 left-1/2 -translate-x-1/2">
                <div className="flex flex-col text-base text-primary font-medium">
                    <button className="text-left p-4 border-b">Status</button>
                    <button className="text-left p-4">Post</button>
                </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </div>
  );
}
