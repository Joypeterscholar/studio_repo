'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ChevronLeft,
  WalletCards,
  AlertCircle,
  X,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { getConversationsWithUserDetails } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';

const creditAmounts = ['10LQ', '20LQ', '50LQ', '100LQ', '200LQ', 'Custom'];
const conversations = getConversationsWithUserDetails();
const findImage = (id: string) => {
    const img = placeholderImages.find(p => p.id === id);
    return img || placeholderImages[0];
};

export default function SendCreditsV1Page() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState('10LQ');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  return (
    <AppLayout>
      <div className="flex flex-col min-h-full bg-muted/50">
        <header className="flex items-center p-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10 border bg-white">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Button>
          <div className="flex-grow text-center">
            <h1 className="text-xl font-bold text-primary">Send Credits (V1)</h1>
          </div>
          <div className="w-10"></div>
        </header>

        <main className="flex-grow px-4 py-2 pb-24">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="font-semibold text-primary mb-4">Choose amount to send</h2>
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

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full rounded-full mt-6 flex items-center">
                  <WalletCards className="w-5 h-5 mr-2" />
                  Select Recipient
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md w-[90vw] bottom-0 translate-y-0 rounded-t-3xl rounded-b-none p-0 bg-background">
                  <DialogHeader className="flex flex-row items-center justify-between text-left p-4 border-b">
                      <DialogTitle className="text-xl font-bold text-primary">Select a Recipient</DialogTitle>
                      <DialogClose asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                              <X className="w-5 h-5 text-muted-foreground"/>
                          </Button>
                      </DialogClose>
                  </DialogHeader>
                  <div className="p-4 h-[50vh] overflow-y-auto">
                      {conversations.map((convo) => {
                          const image = findImage(convo.user?.image.id || '');
                          const isSelected = selectedUser === convo.userId;
                          
                          return (
                              <button 
                                onClick={() => setSelectedUser(convo.userId)}
                                key={convo.id} 
                                className={cn(
                                  "flex items-center space-x-4 py-3 px-2 rounded-lg w-full text-left relative transition-colors",
                                  isSelected && "bg-primary/10"
                                )}
                              >
                                  <Image
                                      src={image.imageUrl}
                                      alt={image.description}
                                      width={56}
                                      height={56}
                                      className="rounded-full object-cover w-14 h-14"
                                      data-ai-hint={image.imageHint}
                                  />
                                  <div className="flex-grow">
                                      <h3 className="font-bold">{convo.user?.name}</h3>
                                      <p className="text-muted-foreground truncate text-sm">{convo.user?.location}</p>
                                  </div>
                                  {isSelected && (
                                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                  )}
                              </button>
                          )
                      })}
                  </div>
                   <div className="p-4 border-t">
                      <Button size="lg" className="w-full rounded-full" disabled={!selectedUser}>
                          Send Credit
                      </Button>
                  </div>
              </DialogContent>
          </Dialog>

            <div className="mt-4 bg-muted text-muted-foreground p-3 rounded-lg text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <p>
                Money sent to another user is non-refundable and you agree to our <Link href="#" className="underline text-primary/80">Terms of service.</Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
