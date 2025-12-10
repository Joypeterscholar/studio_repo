'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Plus, Users, MessageSquare, Code, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/discover', icon: Compass, label: 'Discover' },
  { href: '/create', icon: Plus, isCentral: true, label: 'Create' },
  { href: '/messages', icon: MessageSquare, label: 'Messages' },
  { href: '/profile', icon: Users, label: 'Profile' },
];

const devNavItems = [
    {href: '/block-user', label: 'Block User'},
    {href: '/buy-credits', label: 'Buy Credits'},
    {href: '/buy-credits-v1', label: 'Buy Credits (V1)'},
    {href: '/buy-credits-v2', label: 'Buy Credits (V2)'},
    {href: '/connections', label: 'Connections'},
    {href: '/delete-account', label: 'Delete Account'},
    {href: '/discover-from', label: 'Discover From'},
    {href: '/discover-map', label: 'Discover (Map)'},
    {href: '/likes', label: 'Likes'},
    {href: '/notifications', label: 'Notifications'},
    {href: '/recent-posts', label: 'Recent Posts'},
    {href: '/search', label: 'Search'},
    {href: '/search-suggestions', label: 'Search w/ Suggestions'},
    {href: '/send-credits', label: 'Send Credits'},
    {href: '/send-credits-v1', label: 'Send Credits (V1)'},
    {href: '/settings', label: 'Settings'},
    {href: '/video-call/1', label: 'Video Call'},
    {href: '/wallet', label: 'Wallet'},
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow pb-28">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-transparent">
        <div 
          className="relative max-w-md mx-auto h-24 flex items-center justify-around px-4"
        >
           <div className="absolute inset-x-2 bottom-0 h-20 bg-white/90 backdrop-blur-lg rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.1)]"></div>
           
            {/* Dev Menu Trigger */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="relative z-10 flex flex-col items-center justify-center text-muted-foreground transition-colors w-12 h-12">
                  <Code className="w-7 h-7" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md w-[90vw] bg-white rounded-2xl p-0 shadow-xl border-none">
                <DialogTitle className="p-4 border-b font-semibold text-primary">Dev Menu</DialogTitle>
                <div className="flex flex-col text-base text-primary font-medium max-h-[70vh] overflow-y-auto">
                    {devNavItems.sort((a, b) => a.label.localeCompare(b.label)).map(item => (
                       <DialogClose asChild key={item.href}>
                           <Link href={item.href} className="text-left p-4 border-b last:border-b-0">{item.label}</Link>
                       </DialogClose>
                    ))}
                </div>
              </DialogContent>
            </Dialog>


            {navItems.map((item) => {
              const isActive = pathname === item.href;

              if (item.isCentral) {
                return (
                  <Dialog key={item.href}>
                    <DialogTrigger asChild>
                      <button className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground shadow-lg -translate-y-4">
                        <Plus className="w-8 h-8" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md w-[90vw] bg-white rounded-2xl p-0 shadow-xl border-none bottom-28 translate-y-0 left-1/2 -translate-x-1/2">
                        <DialogTitle className="sr-only">Create New</DialogTitle>
                        <div className="flex flex-col text-base text-primary font-medium">
                            <DialogClose asChild>
                                <Link href="/create-status" className="text-left p-4 border-b">Status</Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/create-post" className="text-left p-4">Post</Link>
                            </DialogClose>
                        </div>
                    </DialogContent>
                  </Dialog>
                )
              }
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={cn(
                    "relative z-10 flex flex-col items-center justify-center text-muted-foreground transition-colors w-12 h-12",
                    isActive && 'text-accent'
                  )}
                >
                  <item.icon className={cn('w-7 h-7', isActive && item.href === '/messages' && 'fill-current text-accent')} />
                </Link>
              );
            }).filter(item => item !== null)}
        </div>
      </nav>
    </div>
  );
}
