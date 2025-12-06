'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { placeholderImages } from '@/lib/placeholder-images';
import { Camera, Send, Smile, X } from 'lucide-react';

export default function StoryPage() {
  const storyImage = placeholderImages.find(p => p.id === 'story-background');

  return (
    <div className="relative h-screen w-screen bg-background">
      {storyImage && (
        <Image
          src={storyImage.imageUrl}
          alt={storyImage.description}
          fill
          className="object-cover"
          data-ai-hint={storyImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      <header className="absolute top-0 right-0 p-4 pt-12">
        <Button variant="ghost" size="icon" className="rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white">
          <X className="h-6 w-6" />
        </Button>
      </header>
      
      <div className="absolute bottom-0 left-0 right-0 p-4" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <div className="flex items-center gap-2 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Smile className="text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Camera className="text-muted-foreground" />
          </Button>
          <Input 
            placeholder="Send a message..."
            className="flex-1 border-none bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button size="icon" className="rounded-full bg-pink-500 text-white w-10 h-10 flex-shrink-0">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
