'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronLeft,
  SlidersHorizontal,
  MapPin,
  Cake,
  VenetianMask,
  ArrowUp,
  Ruler,
  Music,
  Pen,
  Heart,
  MessageSquare,
  Globe,
  PartyPopper,
  Gem,
  Camera,
  Waves,
  Leaf,
  Users,
  Flame,
  BrainCircuit,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import { getUserById } from '@/lib/data';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const VerifiedIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.03 15.43l-4.5-4.5 1.41-1.41 3.09 3.08 7.07-7.07 1.41 1.41-8.48 8.49z"
      fill="#3B82F6"
    />
  </svg>
);

const SpiritualIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const userInterests = [
  { name: 'Interest', icon: <Flame className="w-4 h-4" /> },
  { name: 'Music', icon: <Music className="w-4 h-4" /> },
  { name: 'PDA', icon: '💋' },
  { name: 'Open to Adventure', icon: <Globe className="w-4 h-4" /> },
  { name: 'Group Hangouts', icon: <PartyPopper className="w-4 h-4" /> },
  { name: 'Writing', icon: <Pen className="w-4 h-4" /> },
  { name: 'Fashion', icon: <Gem className="w-4 h-4" /> },
  { name: 'Sex', icon: '🔥🍑' },
];

const accountInfo = [
  { label: 'Date Joined', value: 'March, 2024' },
  { label: 'Matched with', value: '3 Men' },
  { label: 'Changed username', value: '2 Times' },
  { label: 'Religion', value: 'Christianity' },
  { label: 'Interested in', value: 'Men' },
  { label: 'Uninterested in', value: 'Women, Lesbians' },
  { label: 'Hobbies', value: 'Reading, Eating' },
  { label: 'Education', value: 'Masters, Biochemistry' },
];

export default function UserProfilePage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const user = getUserById(userId);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        User not found.
      </div>
    );
  }

  const userImage = findImage(user.image.id);

  const menuItems = [
    { label: 'Add to Matches' },
    { label: 'Send Message' },
    { label: 'Mute User' },
    { label: 'Unblock User', isDestructive: true, href: '/block-user' },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="relative h-[60vh] w-full">
        <Image
          src={userImage.imageUrl}
          alt={user.name}
          fill
          className="object-cover"
          data-ai-hint={userImage.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />

        <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pt-12">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 text-white hover:bg-black/50"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-black/30 text-white hover:bg-black/50"
              >
                <SlidersHorizontal className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-[90vw] m-auto bg-white rounded-2xl p-0">
              <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
                <DialogTitle className="sr-only">User Actions</DialogTitle>
                <span></span>
                 <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-auto w-auto p-0">
                      <X className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </DialogClose>
              </DialogHeader>
              <div className="flex flex-col text-base">
                {menuItems.map((item) => {
                  const content = (
                    <button
                      key={item.label}
                      className={cn(
                        'text-left p-4 border-b text-primary',
                        item.isDestructive && 'text-red-500'
                      )}
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
        </header>

        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            className="rounded-full bg-accent/90 text-accent-foreground backdrop-blur-sm"
          >
            <Music className="w-4 h-4 mr-2" />
            Music
          </Button>
          <Button
            variant="secondary"
            className="rounded-full bg-white/90 text-foreground backdrop-blur-sm"
          >
            <Pen className="w-4 h-4 mr-2" />
            Writing
          </Button>
        </div>
      </div>

      <div className="relative -mt-8 rounded-t-3xl bg-background p-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary">
            {user.name}, {user.age}
          </h1>
          <VerifiedIcon />
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{user.location}</span>
        </div>

        <div className="my-6 grid grid-cols-5 items-center justify-items-center text-center text-muted-foreground text-sm gap-2">
          <div className="flex flex-col items-center gap-1">
            <Cake className="w-5 h-5" />
            <span>{user.age}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <VenetianMask className="w-5 h-5" />
            <span>Female</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 w-10 h-10 shadow-md"
            >
              <ArrowUp className="w-5 h-5 text-primary" />
            </Button>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Ruler className="w-5 h-5" />
            <span>5'3"</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <SpiritualIcon />
            <span>Spiritual</span>
          </div>
        </div>

        <div className="space-y-4 pb-28">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h2 className="font-bold text-primary text-lg mb-1">Bio</h2>
            <p className="text-muted-foreground text-sm">{user.bio}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h2 className="font-bold text-primary text-lg mb-1">
              I'm Looking for
            </h2>
            <p className="text-muted-foreground text-sm">
              Serious Relationship with a man, Casual friendship, and Travel
              Partner that lives close by.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h2 className="font-bold text-primary text-lg mb-1">Occupation</h2>
            <p className="text-muted-foreground text-sm">Odontologist</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h2 className="font-bold text-primary text-lg mb-3">
              My Interests
            </h2>
            <div className="flex flex-wrap gap-3">
              {userInterests.map((interest) => (
                <Button
                  key={interest.name}
                  variant="outline"
                  className="rounded-full bg-accent/20 border-accent/30 text-accent-foreground flex items-center gap-2 transition-all duration-200 text-sm h-9"
                >
                  {typeof interest.icon === 'string' ? (
                    <span className="text-base">{interest.icon}</span>
                  ) : (
                    interest.icon
                  )}
                  <span className="font-medium text-primary">
                    {interest.name}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <h2 className="font-bold text-primary text-lg mb-4">
              Account Information
            </h2>
            <div className="space-y-4">
              {accountInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-muted-foreground">{info.label}</span>
                  <span className="font-semibold text-primary">
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/block-user">
            <Button
              variant="destructive"
              className="w-full h-12 rounded-full text-lg"
            >
              Block User
            </Button>
          </Link>
        </div>
      </div>

      <footer
        className="fixed bottom-0 left-0 right-0 z-20 bg-background/80 backdrop-blur-sm p-4"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-center gap-4 max-w-md mx-auto">
          <Button
            variant="outline"
            size="icon"
            className="h-16 w-16 rounded-full border-accent text-accent bg-accent/10 shadow-lg"
          >
            <Heart className="w-8 h-8" />
          </Button>
          <Button className="h-16 rounded-full flex-grow text-lg font-bold shadow-lg">
            Send Message
            <MessageSquare className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
