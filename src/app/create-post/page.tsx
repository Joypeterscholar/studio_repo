'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Paperclip,
  Camera,
  Send,
  Smile,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { placeholderImages } from '@/lib/placeholder-images';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const addedImages = [
  { id: 'profile-side-1', hint: 'man suit' },
  { id: 'story-background', hint: 'food drink' },
  { id: 'profile-side-2', hint: 'man studying' },
];

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id);
};


export default function CreatePostPage() {
  const router = useRouter();
  const [images, setImages] = useState(addedImages);

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
  }

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-between p-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="icon"
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-primary"
            >
              <X className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="top-40 w-[90vw] max-w-sm rounded-2xl bg-white p-0 shadow-lg">
            <div className="flex flex-col text-base">
              <button className="text-left p-4 border-b">Publish Post</button>
              <button className="text-left p-4 border-b">Save as Draft</button>
              <button className="text-left p-4">My Posts</button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <main className="flex-grow px-4 space-y-6">
        <div>
            <Input 
                placeholder="Post Title"
                className="text-2xl font-bold border-none shadow-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                defaultValue="Food in Italy"
            />
             <Button variant="outline" className="mt-2 border-primary text-primary">
                Photography
             </Button>
        </div>

        <div>
            <label className="text-lg font-semibold text-primary">Add Images</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
                {images.map(imgInfo => {
                    const image = findImage(imgInfo.id);
                    if (!image) return null;
                    return (
                        <div key={image.id} className="relative aspect-square">
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="rounded-lg object-cover"
                                data-ai-hint={image.imageHint}
                            />
                            <Button size="icon" variant="ghost" onClick={() => removeImage(image.id)} className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70 text-white">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>

        <Input 
            placeholder="What's on your mind?"
            className="h-12 px-4 bg-muted border-none"
        />

      </main>

      <footer
        className="p-4"
        style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <Smile />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <Paperclip />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <Camera />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            className="h-12 w-12 flex-shrink-0 bg-accent text-accent-foreground"
          >
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
