import Image from "next/image";
import Link from "next/link";
import { MapPin, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getNearbyUsers, getTodaysPicks, type User } from "@/lib/data";
import ProfileCard from "@/components/profile/ProfileCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { placeholderImages } from "@/lib/placeholder-images";

export default function DiscoverPage() {
  const todaysPicks = getTodaysPicks();
  const nearbyUsers = getNearbyUsers();
  const heroImage = placeholderImages.find(p => p.id === 'hero-1');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative mb-12 h-64 md:h-80 w-full overflow-hidden rounded-2xl shadow-lg">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-white shadow-2xl">
            Discover Your Spark
          </h1>
          <p className="mt-2 text-lg text-white/90 font-body max-w-lg">
            Connect with people who share your passions and values.
          </p>
        </div>
      </div>

      <section>
        <h2 className="font-headline text-3xl font-semibold mb-6">
          Today's Picks
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {todaysPicks.map((user) => (
            <ProfileCard key={user.id} user={user} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-headline text-3xl font-semibold mb-6 flex items-center gap-3">
          <MapPin className="text-accent" /> Nearby Singles
        </h2>
        <div className="relative">
          <ScrollArea>
            <div className="flex space-x-6 pb-4">
              {nearbyUsers.map((user) => (
                <Link href={`/users/${user.id}`} key={user.id} className="w-40 flex-shrink-0">
                  <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                    <CardContent className="p-0">
                      <div className="aspect-square relative w-full">
                        <Image
                          src={user.image.imageUrl}
                          alt={`Profile of ${user.name}`}
                          data-ai-hint={user.image.imageHint}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-headline font-semibold truncate">{user.name}, {user.age}</h3>
                        <p className="text-xs text-muted-foreground truncate">{user.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>
    </div>
  );
}
