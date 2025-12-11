'use client';

import Image from 'next/image';
import {
  ChevronDown,
  MapPin,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { placeholderImages } from '@/lib/placeholder-images';
import type { User } from '@/lib/data';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUser, useUserById, useUsers } from '@/firebase';

const mapUsersPositions = [
  { top: '20%', left: '45%' },
  { top: '48%', left: '70%' },
  { top: '75%', left: '35%' },
];

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

const UserCard = ({ user, distance }: { user: User; distance: number }) => {
  const userImage = findImage(user.image.id);
  return (
    <Link href={`/user/${user.id}`} className="flex-shrink-0 w-40 relative">
      <Image
        src={userImage.imageUrl}
        alt={user.name}
        width={160}
        height={220}
        className="rounded-2xl object-cover w-full h-[220px]"
        data-ai-hint={userImage.imageHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
      <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        NEW
      </div>
      <div className="absolute bottom-2 left-2 right-2 text-white">
        <p className="text-xs bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 inline-block">
          {distance} km away
        </p>
        <p className="font-bold truncate mt-1">
          {user.name}, {user.age}
        </p>
        <p className="text-xs uppercase tracking-wider">{user.location}</p>
      </div>
    </Link>
  );
};

export default function DiscoverMapPage() {
  const mapImage = findImage('map-background');
  const { data: loggedInUser, loading } = useUser();
  const { data: users, loading: usersLoading } = useUsers();

  const newUsers = users.slice(0, 3);
  const mapUsers = users.slice(3, 6);

  if (loading || usersLoading) {
      return (
          <AppLayout>
              <div className="p-4">Loading...</div>
          </AppLayout>
      )
  }

  if (!loggedInUser) {
    return <AppLayout><div>Please log in</div></AppLayout>
  }

  const loggedInUserImage = findImage(loggedInUser.image.id);

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-muted/50 text-foreground">
        <header className="p-4 flex items-center justify-between">
          <button>
            <Image
              src={loggedInUserImage.imageUrl}
              alt="My Profile"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
              data-ai-hint={loggedInUserImage.imageHint}
            />
          </button>
          <div className="flex items-center gap-1 text-primary">
            <MapPin className="w-5 h-5" />
            <span className="font-bold">Lagos</span>
            <ChevronDown className="w-4 h-4" />
          </div>
          <Link href="/search-suggestions">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12"
            >
              <Search className="w-6 h-6" />
            </Button>
          </Link>
        </header>

        <main className="flex-grow overflow-y-auto px-4">
          <div>
            <h2 className="text-xl font-bold text-primary mb-3">New</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
              {newUsers.map((user) => {
                const distance = parseFloat((Math.random() * 15).toFixed(1));
                return (
                  <UserCard key={user.id} user={user} distance={distance} />
                );
              })}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-primary mb-3">Around me</h2>
            <div className="relative">
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                width={600}
                height={400}
                className="w-full h-auto rounded-3xl object-cover"
                data-ai-hint={mapImage.imageHint}
              />
              <div className="absolute inset-0">
                {mapUsers.map((user, index) => {
                  if (!user.image) return null;
                  const position = mapUsersPositions[index];
                  const userImage = findImage(user.image.id);
                  return (
                    <Link href={`/user/${user.id}`} key={user.id}>
                      <Image
                        src={userImage.imageUrl}
                        alt={user.name}
                        width={48}
                        height={48}
                        className="absolute object-cover border-2 border-white rounded-full"
                        style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
                        data-ai-hint={userImage.imageHint}
                      />
                    </Link>
                  );
                })}

                <Button
                  className="absolute bg-primary text-primary-foreground h-auto py-2 px-4"
                  style={{
                    top: '30%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <span className="text-xs mr-2">((•))</span> Connect with
                  Clara 👋
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
