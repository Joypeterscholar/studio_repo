'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Pencil, MapPin, Wallet, ArrowUp, Settings2, X } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useUser } from '@/firebase';

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const VerifiedIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.03 15.43l-4.5-4.5 1.41-1.41 3.09 3.08 7.07-7.07 1.41 1.41-8.48 8.49z"
      fill="#4A90E2"
    />
  </svg>
);

const menuItems = [
  { label: 'Matches', href: '/matches' },
  { label: 'My Posts', href: '/recent-posts' },
  { label: 'My Wallet', href: '/wallet' },
  { label: 'Settings', href: '/settings' },
  { label: 'Notifications', href: '/notifications' },
  { label: 'Blocked Users' },
  { label: 'Delete Account', isDestructive: true, href: '/delete-account' },
];

export default function ProfilePage() {
  const { data: user, loading } = useUser();
  
  if (loading) {
    return (
        <AppLayout>
            <div className="flex justify-center items-center h-full">Loading...</div>
        </AppLayout>
    )
  }

  if (!user) {
      return (
          <AppLayout>
              <div className="p-4">
                  <p>User not found. Please log in.</p>
                  <Link href="/login"><Button>Login</Button></Link>
              </div>
          </AppLayout>
      )
  }

  const mainPhoto = user.gallery?.length > 0 ? findImage(user.gallery[0].id) : findImage(user.image.id);
  const photo1 = user.gallery?.length > 1 ? findImage(user.gallery[1].id) : placeholderImages[1];
  const photo2 = user.gallery?.length > 2 ? findImage(user.gallery[2].id) : placeholderImages[2];
  const avatar = findImage(user.image.id);

  return (
    <AppLayout>
      <div className="bg-background min-h-screen">
        <header className="px-4 pt-8 pb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Image
                src={avatar.imageUrl}
                alt={user.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
                data-ai-hint={avatar.imageHint}
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-bold text-primary">{user.name}</h1>
                  <VerifiedIcon />
                </div>
                <button className="flex items-center gap-1 text-sm text-muted-foreground">
                  Change Profile Picture <Pencil className="w-3 h-3" />
                </button>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                >
                  <Settings2 className="w-6 h-6 text-primary" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl p-0">
                <DialogHeader className="p-4 flex flex-row items-center justify-between border-b">
                   <DialogTitle className="text-lg font-semibold text-primary">Menu</DialogTitle>
                   <DialogClose asChild>
                    <button>
                      <X className="w-6 h-6" />
                    </button>
                  </DialogClose>
                </DialogHeader>
                <div className="flex flex-col text-lg">
                  {menuItems.map((item) => {
                    const content = (
                      <button
                        key={item.label}
                        className={`text-left p-4 border-b w-full text-primary ${
                          item.isDestructive ? 'text-red-500' : ''
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                    if (item.href) {
                        return <Link href={item.href} key={item.label}>{content}</Link>
                    }
                    return content;
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="px-4">
          <div className="grid grid-cols-3 grid-rows-2 gap-2 h-80">
            <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden">
              <Image
                src={mainPhoto.imageUrl}
                alt={mainPhoto.description}
                fill
                className="object-cover"
                data-ai-hint={mainPhoto.imageHint}
              />
              <Button
                variant="secondary"
                className="absolute top-4 left-4 shadow-md"
              >
                My Photos <Pencil className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden">
              <Image
                src={photo1.imageUrl}
                alt={photo1.description}
                fill
                className="object-cover"
                data-ai-hint={photo1.imageHint}
              />
            </div>
            <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden">
              <Image
                src={photo2.imageUrl}
                alt={photo2.description}
                fill
                className="object-cover"
                data-ai-hint={photo2.imageHint}
              />
            </div>
          </div>

          <div className="flex justify-between items-center py-4 mt-2">
            <div className="flex gap-6">
              <div>
                <span className="font-bold text-accent">47</span>
                <span className="text-muted-foreground ml-1">Matches</span>
              </div>
              <div>
                <span className="font-bold text-accent">55</span>
                <span className="text-muted-foreground ml-1">Likes</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 font-bold text-primary text-lg">
                <span>500 LC</span>
                <Wallet className="w-5 h-5" />
              </div>
              <button className="flex items-center gap-1 text-sm text-muted-foreground">
                Top up Balance <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground mb-6">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
            <Pencil className="w-3 h-3 ml-1" />
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-bold text-primary text-lg">Bio</h2>
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                {user.bio}
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-bold text-primary text-lg">
                  I'm Looking for
                </h2>
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Serious Relationship with a man, Casual friendship, and Travel
                Partner that lives close by.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-bold text-primary text-lg">Interests</h2>
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.interests.map(interest => (
                    <div key={interest} className="bg-muted px-3 py-1 rounded-full text-sm">{interest}</div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
