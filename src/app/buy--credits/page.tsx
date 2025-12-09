'use client';

import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  WalletCards,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';

export default function BuyCreditsPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="flex flex-col min-h-full bg-muted/50">
        <header className="flex items-center p-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10 border bg-white">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Button>
          <div className="flex-grow text-center">
            <h1 className="text-xl font-bold text-primary">Buy Credits</h1>
          </div>
          <div className="w-10"></div>
        </header>

        <main className="flex-grow px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <h2 className="font-semibold text-primary self-start mb-2">Choose amount to buy</h2>
            <Button
              variant="outline"
              className="w-full h-14 rounded-xl border-primary/30 bg-primary/5 text-primary text-base"
            >
              10LQ (1LQ = ₦1,000)
            </Button>
            
            <p className="text-xl font-bold text-primary my-8">
              Pay ₦10,000 for 10LQ
            </p>

            <Button size="lg" className="w-full rounded-full h-14 text-lg">
                <WalletCards className="w-6 h-6 mr-2" />
                Pay ₦10,000
            </Button>

            <div className="mt-6 bg-muted text-muted-foreground p-3 rounded-lg text-sm flex items-start gap-3 w-full">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <p>
                    Credit purchases is non-refundable and you agree to our <Link href="#" className="underline text-primary/80">Terms of service.</Link>
                </p>
            </div>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
