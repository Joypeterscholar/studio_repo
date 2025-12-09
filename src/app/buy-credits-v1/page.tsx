'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  WalletCards,
  AlertCircle,
  ShieldCheck,
  Plus,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const creditAmounts = ['10LQ', '20LQ', '50LQ', '100LQ', '200LQ', 'Custom'];
const paymentCards = [
  {
    id: '1',
    brand: 'visa',
    owner: 'Peter John',
    last4: '3384',
    isPrimary: true,
  },
  {
    id: '2',
    brand: 'mastercard',
    owner: 'Peter John',
    last4: '3384',
    isPrimary: false,
  },
];

const NigeriaFlagIcon = () => (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="18" fill="white"/>
      <rect width="8" height="18" fill="#008751"/>
      <rect x="16" width="8" height="18" fill="#008751"/>
    </svg>
  );

const VisaIcon = () => (
    <svg width="48" height="30" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-md">
        <rect width="48" height="30" rx="4" fill="#0057A0"/>
        <path d="M30.342 10.326H33.822L36.312 19.674H32.844L30.342 10.326ZM20.898 10.326L17.586 19.674H21.246L21.84 17.91H26.118L26.658 19.674H30.138L26.862 10.326H20.898ZM22.56 12.198L23.982 16.2H24.03L25.41 12.198H22.56ZM15.6373 13.086C15.6373 12.258 15.3553 11.598 14.8033 11.106C14.2633 10.602 13.4773 10.35 12.4453 10.35C11.3053 10.35 10.4293 10.632 9.81734 11.196C9.21734 11.748 8.91734 12.51 8.91734 13.482L8.92934 13.626C9.15734 11.97 10.2133 11.142 12.0853 11.142C12.8713 11.142 13.4833 11.352 13.9213 11.772C14.3713 12.18 14.5993 12.75 14.5993 13.482V19.674H11.2393L11.1733 18.846C10.5133 19.686 9.61334 20.106 8.47334 20.106C7.03334 20.106 5.92934 19.566 5.16134 18.486C4.40534 17.394 4.02734 15.93 4.02734 14.094C4.02734 12.15 4.47734 10.632 5.37734 9.54C6.28934 8.436 7.50134 7.884 8.99534 7.884C10.3993 7.884 11.4553 8.322 12.1633 9.198L12.5713 8.1H15.6973L15.6373 13.086Z" fill="white"/>
        <path d="M44.5322 10.326L41.1122 17.022L37.6922 10.326H34.0022L39.3902 19.674H42.7982L48.0002 10.326H44.5322Z" fill="white"/>
    </svg>
)

const MastercardIcon = () => (
    <svg width="48" height="30" viewBox="0 0 48 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="30" rx="4" fill="black"/>
        <circle cx="20" cy="15" r="7" fill="#EB001B"/>
        <circle cx="28" cy="15" r="7" fill="#F79E1B" fillOpacity="0.8"/>
    </svg>
)

export default function BuyCreditsV1Page() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState('10LQ');

  return (
    <AppLayout>
      <div className="flex flex-col min-h-full bg-muted/50">
        <header className="flex items-center p-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10 border bg-white">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Button>
          <div className="flex-grow text-center">
            <h1 className="text-xl font-bold text-primary">Buy Credits (V1)</h1>
          </div>
          <div className="w-10"></div>
        </header>

        <main className="flex-grow px-4 py-2 pb-24">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="font-semibold text-primary mb-4">Choose amount to buy</h2>
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
            <Button size="lg" className="w-full rounded-full mt-6 flex items-center">
                <WalletCards className="w-5 h-5 mr-2" />
                Buy Credits
            </Button>
            <div className="mt-4 bg-muted text-muted-foreground p-3 rounded-lg text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>
                    Credit purchases is non-refundable and you agree to our <Link href="#" className="underline text-primary/80">Terms of service.</Link>
                </p>
            </div>
          </div>

           <div>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-primary">Payment Cards</h2>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="text-primary font-semibold">
                                <Plus className="w-4 h-4 mr-1" />
                                Add Card
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md w-[90vw] bottom-0 translate-y-0 rounded-t-3xl rounded-b-none p-6">
                            <DialogHeader className="flex flex-row items-center justify-between text-left mb-4">
                                <DialogTitle className="text-xl font-bold text-primary">Add new card</DialogTitle>
                                <DialogClose asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <X className="w-5 h-5 text-muted-foreground"/>
                                    </Button>
                                </DialogClose>
                            </DialogHeader>
                            <form className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-primary mb-2">Personal Details</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <Label htmlFor="fullName" className="sr-only">Full name</Label>
                                            <Input id="fullName" placeholder="Full name" />
                                        </div>
                                        <div className="relative">
                                            <Label htmlFor="country" className="sr-only">Country</Label>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2">
                                               <NigeriaFlagIcon />
                                            </div>
                                            <Input id="country" defaultValue="Nigeria" className="pl-12"/>
                                             <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180 absolute right-3 top-1/2 -translate-y-1/2" />
                                        </div>
                                        <div>
                                            <Label htmlFor="streetAddress" className="sr-only">Street address</Label>
                                            <Input id="streetAddress" placeholder="Street address" />
                                        </div>
                                    </div>
                                </div>
                                 <div>
                                    <h3 className="font-semibold text-primary mb-2">Card details</h3>
                                    <div className="space-y-3">
                                        <Input placeholder="Card number" />
                                        <div className="grid grid-cols-2 gap-3">
                                            <Input placeholder="mm/yy" />
                                            <Input placeholder="cvc" />
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" size="lg" className="w-full rounded-full">
                                    Save card information
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="bg-white rounded-2xl shadow-sm">
                    {paymentCards.map((card, index) => (
                        <div key={card.id} className={cn("flex items-center p-4", index < paymentCards.length - 1 && "border-b")}>
                            {card.brand === 'visa' && <VisaIcon />}
                            {card.brand === 'mastercard' && <MastercardIcon />}
                            <div className="flex-grow ml-4">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-primary">{card.owner}</p>
                                  {card.isPrimary && (
                                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-md">Primary</span>
                                  )}
                                </div>
                                <p className="text-muted-foreground">**** {card.last4}</p>
                            </div>
                            <ChevronLeft className="w-6 h-6 text-muted-foreground rotate-180" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 bg-green-100 text-green-800 p-3 rounded-lg text-sm flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                <p>We are fully compliant with the payment card industry data security standards.</p>
            </div>
        </main>
      </div>
    </AppLayout>
  );
}
