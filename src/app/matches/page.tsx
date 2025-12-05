import { getMatches } from "@/lib/data";
import ProfileCard from "@/components/profile/ProfileCard";
import { Heart } from "lucide-react";

export default function MatchesPage() {
  const matches = getMatches();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="size-8 text-accent" />
        <h1 className="font-headline text-4xl font-bold">Your Matches</h1>
      </div>
      
      {matches.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {matches.map((user) => (
            <ProfileCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 rounded-lg bg-card border border-dashed">
          <h2 className="font-headline text-2xl font-semibold">No Matches Yet</h2>
          <p className="mt-2 text-muted-foreground">Keep swiping to find your perfect match!</p>
        </div>
      )}
    </div>
  );
}
