'use client';

import {
  ChevronLeft,
  Pencil,
  Music,
  Globe,
  PartyPopper,
  Pen,
  Flame,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import AppLayout from '@/components/layout/AppLayout';

const interests = [
  { name: 'Interest', icon: <Flame className="w-4 h-4" /> },
  { name: 'Music', icon: <Music className="w-4 h-4" /> },
  { name: 'PDA', icon: '💋' },
  { name: 'Open to Adventure', icon: <Globe className="w-4 h-4" /> },
  { name: 'Group Hangouts', icon: <PartyPopper className="w-4 h-4" /> },
  { name: 'Writing', icon: <Pen className="w-4 h-4" /> },
  { name: 'Fashion', icon: '👗' },
  { name: 'Sex', icon: '🔥🍑' },
];

const accountInfo = [
  { label: 'Date Joined', value: 'March, 2024' },
  { label: 'Religion', value: 'Christianity' },
  { label: 'Interested in', value: 'Men' },
  { label: 'Hobbies', value: 'Reading, Eating' },
  { label: 'Education', value: 'Masters, Biochemistry' },
];

const FilterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V12C5 11.4696 5.21071 10.9609 5.58579 10.5858C5.96086 10.2107 6.46957 10 7 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21V16C12 15.4696 12.2107 14.9609 12.5858 14.5858C12.9609 14.2107 13.4696 14 14 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 7C7 6.46957 7.21071 5.96086 7.58579 5.58579C7.96086 5.21071 8.46957 5 9 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 3V8C12 8.53043 11.7893 9.03914 11.4142 9.41421C11.0391 9.78929 10.5304 10 10 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V10C19 9.46957 18.7893 8.96086 18.4142 8.58579C18.0391 8.21071 17.5304 8 17 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 5C17 4.46957 16.7893 3.96086 16.4142 3.58579C16.0391 3.21071 15.5304 3 15 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const findImage = (id: string) => {
    return placeholderImages.find((p) => p.id === id);
};

export default function SettingsPage() {
  const referGiftImage = findImage('refer-gift');

  return (
    <AppLayout>
      <div className="bg-background min-h-screen">
        <header className="flex items-center justify-between p-4 pt-6 md:p-6">
          <div className="flex items-center gap-2">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ChevronLeft className="h-6 w-6" />
              </Button>
            </Link>
            <div>
                <p className="text-xl font-bold">Occupation</p>
                <p className="text-sm text-muted-foreground">Odontologist</p>
            </div>
          </div>
        </header>

        <main className="px-4 pb-8">
          <div className="bg-card p-4 rounded-2xl shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-primary text-lg">My Interests</h2>
              <div className="flex items-center gap-4">
                <Pencil className="w-5 h-5 text-muted-foreground" />
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-2">
                    <FilterIcon />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Button
                  key={interest.name}
                  className="rounded-full bg-accent/20 text-accent-foreground hover:bg-accent/30"
                >
                  {typeof interest.icon === 'string' ? (
                    <span className="text-sm">{interest.icon}</span>
                  ) : (
                    interest.icon
                  )}
                  <span>{interest.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-card p-4 rounded-2xl shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-primary text-lg">
                Account Information
              </h2>
              <Pencil className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {accountInfo.map((info) => (
                <div key={info.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{info.label}</span>
                  <span className="font-medium text-foreground">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-blue-50 p-4 rounded-2xl shadow-sm mb-6 overflow-hidden">
            <div className="relative z-10">
                <h3 className="font-bold text-blue-800 text-lg">Refer and Earn!</h3>
                <p className="text-blue-600 text-sm mt-1 mb-4">
                    Invite your friends and earn rewards. the more you share, the more
                    you gain
                </p>
                <div className="flex">
                    <Input
                    readOnly
                    value="www.link.293489aFd2/..."
                    className="bg-white/70 border-blue-200 rounded-r-none"
                    />
                    <Button className="rounded-l-none bg-blue-500 hover:bg-blue-600 text-white">Copy</Button>
                </div>
            </div>
            {referGiftImage && (
                <div className="absolute -right-8 -bottom-8 w-32 h-32 opacity-50">
                    <Image
                        src={referGiftImage.imageUrl}
                        alt={referGiftImage.description}
                        width={128}
                        height={128}
                        data-ai-hint={referGiftImage.imageHint}
                    />
                </div>
            )}
          </div>

          <Button variant="destructive" className="w-full bg-red-500 hover:bg-red-600 text-white rounded-full" size="lg">
            Delete Account
          </Button>
        </main>
      </div>
    </AppLayout>
  );
}
