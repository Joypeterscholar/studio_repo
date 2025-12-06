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
      <main className="flex-grow">{children}</main>
      <nav className="sticky bottom-0 bg-white shadow-[0_-1px_10px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
        <div className="flex justify-around items-center h-24 max-w-md mx-auto px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            if (item.isCentral) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative -top-8 flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-lg"
                >
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </Link>
              );
            }
            return (
              <Link key={item.href} href={item.href} className="flex flex-col items-center justify-center text-muted-foreground">
                <item.icon className={cn('w-7 h-7 transition-colors', isActive && 'text-primary')} />
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
