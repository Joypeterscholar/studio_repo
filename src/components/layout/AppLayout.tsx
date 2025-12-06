'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Plus, Users, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home },
  { href: '/discover', icon: Compass },
  { href: '/create', icon: Plus, isCentral: true },
  { href: '/connections', icon: Users },
  { href: '/messages', icon: MessageSquare },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-28">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div 
          className="relative max-w-md mx-auto h-24 bg-white/90 backdrop-blur-lg rounded-[2.5rem] shadow-[0_0_20px_rgba(0,0,0,0.1)]"
        >
          <div className="flex justify-around items-center h-full">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              if (item.isCentral) {
                return null; // Skip central button in main map
              }
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "flex flex-col items-center justify-center text-muted-foreground transition-colors",
                    index > 1 && 'ml-12' // Add margin for items after the central button
                  )}
                >
                  <item.icon className={cn('w-7 h-7', isActive ? 'text-accent' : 'text-gray-400')} />
                </Link>
              );
            })}
          </div>
          {navItems.find(item => item.isCentral) && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Link
                  href="/create"
                  className={cn(
                    "flex items-center justify-center w-16 h-16 rounded-full bg-white transition-transform duration-300 ease-in-out",
                    pathname === '/create' ? 'bg-accent text-accent-foreground' : 'text-gray-500'
                  )}
                  style={{
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <Plus className="w-8 h-8" />
                </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
