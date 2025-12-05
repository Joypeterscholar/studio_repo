import Image from "next/image";
import { Heart, MapPin, X } from "lucide-react";
import { loggedInUser } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProfileImprovement from "@/components/profile/ProfileImprovement";

export default function MyProfilePage() {
  const user = loggedInUser;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card className="overflow-hidden shadow-2xl">
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src={user.image.imageUrl}
            alt={user.name}
            data-ai-hint={user.image.imageHint}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h1 className="font-headline text-5xl font-bold">{user.name}, {user.age}</h1>
            <div className="flex items-center gap-2 mt-2 text-white/90">
              <MapPin className="size-4" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <section>
                <h2 className="font-headline text-2xl font-semibold">About Me</h2>
                <p className="mt-2 text-foreground/80 font-body leading-relaxed">{user.bio}</p>
              </section>
              <section className="mt-8">
                <h2 className="font-headline text-2xl font-semibold">Interests</h2>
                <div className="flex flex-wrap gap-3 mt-4">
                  {(Array.isArray(user.interests) ? user.interests : user.interests.split(',')).map((interest) => (
                    <Badge key={interest.trim()} variant="default" className="text-sm px-4 py-2 bg-primary/80 text-primary-foreground hover:bg-primary">
                      {interest.trim()}
                    </Badge>
                  ))}
                </div>
              </section>
            </div>
            <div>
              <section>
                <h2 className="font-headline text-2xl font-semibold mb-4">Gallery</h2>
                <div className="grid grid-cols-2 gap-2">
                  {user.gallery.map((img) => (
                    <div key={img.id} className="aspect-square relative rounded-lg overflow-hidden">
                      <Image 
                        src={img.imageUrl} 
                        alt={img.description}
                        data-ai-hint={img.imageHint}
                        fill
                        className="object-cover" 
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
          <div className="mt-10 border-t pt-8">
            <ProfileImprovement currentUser={user} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
