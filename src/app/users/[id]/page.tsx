import Image from "next/image";
import { notFound } from "next/navigation";
import { Heart, MapPin, X } from "lucide-react";
import { getUserById } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = getUserById(params.id);

  if (!user) {
    notFound();
  }

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
          {user.isOnline && (
            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-green-500/90 px-3 py-1 text-xs font-bold text-white">
              <div className="h-2 w-2 rounded-full bg-white" />
              Online
            </div>
          )}
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
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="default" className="text-sm px-4 py-2 bg-primary/80 text-primary-foreground hover:bg-primary">
                      {interest}
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
          <div className="mt-10 flex justify-center gap-6">
            <Button variant="outline" size="lg" className="rounded-full w-24 h-24 border-4 border-destructive/50 text-destructive hover:bg-destructive/10 hover:text-destructive">
              <X className="size-12" />
              <span className="sr-only">Pass</span>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full w-24 h-24 border-4 border-green-500/50 text-green-500 hover:bg-green-500/10 hover:text-green-500">
              <Heart className="size-12" fill="currentColor" />
              <span className="sr-only">Like</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
