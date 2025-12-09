'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { getConversationsWithUserDetails } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const creditAmounts = ['10LQ', '20LQ', '50LQ', '100LQ', '200LQ', 'Custom'];
const conversations = getConversationsWithUserDetails();

const findImage = (id: string) => {
    const img = placeholderImages.find(p => p.id === id);
    return img || placeholderImages[0];
};

export default function SendCreditsPage() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState('10LQ');

  return (
    <div className="flex flex-col h-screen bg-muted/50">
        <header className="flex items-center p-4">
            <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10 border bg-white">
                <ChevronLeft className="h-6 w-6 text-primary" />
            </Button>
            <div className="flex-grow text-center">
                <h1 className="text-xl font-bold text-primary">Send Credits</h1>
            </div>
            <div className="w-10"></div>
        </header>

        <main className="flex-grow flex flex-col justify-between px-4 py-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="font-semibold text-primary mb-4">Choose Amount to send</h2>
                <div className="grid grid-cols-3 gap-3">
                    {creditAmounts.map(amount => (
                        <Button
                        key={amount}
                        variant={selectedAmount === amount ? 'default' : 'outline'}
                        onClick={() => setSelectedAmount(amount)}
                        className={cn(
                            "rounded-lg text-base h-12",
                            selectedAmount === amount ? 'bg-primary text-primary-foreground' : 'text-primary/70 border-border'
                        )}
                        >
                        {amount}
                        </Button>
                    ))}
                </div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button size="lg" className="w-full rounded-full mt-6">
                        Select Recipient
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md w-[90vw] bottom-0 translate-y-0 rounded-t-3xl rounded-b-none p-6 shadow-2xl">
                    <DialogHeader className="flex flex-row items-center justify-between text-left mb-4">
                        <DialogTitle className="text-xl font-bold text-primary">Select a match to send credits</DialogTitle>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <X className="w-5 h-5 text-muted-foreground"/>
                            </Button>
                        </DialogClose>
                    </DialogHeader>
                    <div className="space-y-2 max-h-[50vh] overflow-y-auto">
                        {conversations.map((convo) => {
                            const image = findImage(convo.user?.image.id || '');
                            return (
                                <div key={convo.id} className="flex items-center space-x-4 py-2 border-b last:border-b-0">
                                    <Image
                                        src={image.imageUrl}
                                        alt={image.description}
                                        width={56}
                                        height={56}
                                        className="rounded-full object-cover w-14 h-14"
                                        data-ai-hint={image.imageHint}
                                    />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-primary">{convo.user?.name}</h3>
                                        <p className="text-muted-foreground truncate text-sm">{convo.lastMessage.text}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    </div>
  );
}