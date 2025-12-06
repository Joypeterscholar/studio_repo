'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronDown,
  Paperclip,
  Camera,
  Send,
  Smile,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { placeholderImages } from '@/lib/placeholder-images';

const FilterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V12C5 11.4696 5.21071 10.9609 5.58579 10.5858C5.96086 10.2107 6.46957 10 7 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21V16C12 15.4696 12.2107 14.9609 12.5858 14.5858C12.9609 14.2107 13.4696 14 14 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 7C7 6.46957 7.21071 5.96086 7.58579 5.58579C7.96086 5.21071 8.46957 5 9 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 3V8C12 8.53043 11.7893 9.03914 11.4142 9.41421C11.0391 9.78929 10.5304 10 10 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V10C19 9.46957 18.7893 8.96086 18.4142 8.58579C18.0391 8.21071 17.5304 8 17 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 5C17 4.46957 16.7893 3.96086 16.4142 3.58579C16.0391 3.21071 15.5304 3 15 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
  const [postContent, setPostContent] = useState('');
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
          className="rounded-full w-10 h-10"
        >
          <ChevronLeft className="h-6 w-6 text-primary" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border w-10 h-10 text-primary"
        >
          <FilterIcon />
        </Button>
      </header>

      <main className="flex-grow px-4 space-y-6">
        <div>
            <label className="text-lg font-semibold text-primary">Post Title</label>
             <Select>
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select Post Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                </SelectContent>
            </Select>
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
                            <Button size="icon" variant="ghost" onClick={() => removeImage(image.id)} className="absolute top-1 right-1 h-6 w-6 bg-black/50 hover:bg-black/70 text-white rounded-full">
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>

        <Input 
            placeholder="What's on your mind?"
            className="rounded-full h-12 px-4 bg-muted border-none"
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
              <Paperclip />
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
