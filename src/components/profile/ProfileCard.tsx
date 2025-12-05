import Image from "next/image";
import Link from "next/link";
import { User } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Link href={`/users/${user.id}`}>
      <Card className="overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
        <CardContent className="p-0 flex flex-col flex-grow">
          <div className="aspect-w-1 aspect-h-1 w-full relative">
            <Image
              src={user.image.imageUrl}
              alt={`Profile of ${user.name}`}
              data-ai-hint={user.image.imageHint}
              fill
              className="object-cover"
            />
            {user.isOnline && (
              <div className="absolute top-2 right-2 flex items-center justify-center bg-green-500 rounded-full h-3 w-3 border-2 border-background" title="Online"></div>
            )}
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-headline text-lg font-bold">
              {user.name}, {user.age}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-grow">
              {user.bio}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {user.interests.slice(0, 2).map((interest) => (
                <Badge key={interest} variant="secondary" className="bg-primary/20 text-primary-foreground">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
