import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Firebase Studio
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          This is a Next.js starter application.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button asChild>
            <Link href="/discover">Get Started</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#">Learn more &rarr;</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
