'use client';

import { useRouter } from 'next/navigation';
import { Camera, Send, Smile, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function CreateStatusPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col bg-background text-primary">
      <header className="flex items-center justify-end p-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex flex-grow items-center justify-center p-4">
        <Textarea
          placeholder="What's on your mind?"
          className="h-full w-full resize-none border-none bg-transparent text-center text-3xl font-medium text-primary placeholder:text-primary/50 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </main>

      <footer
        className="p-4"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-between rounded-full bg-white p-2 shadow-md">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground"
            >
              <Smile />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground"
            >
              <Camera />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 flex-shrink-0 rounded-full bg-accent text-accent-foreground"
          >
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
