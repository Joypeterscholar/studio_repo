'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, AlertCircle, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';

export default function SendCreditPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('10');
  const recipientName = 'Alfredo'; // This would likely come from props or state

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-muted/50">
        <header className="flex items-center p-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10 border bg-white">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Button>
          <div className="flex-grow text-center">
            <h1 className="text-xl font-bold text-primary">Send Credit</h1>
          </div>
          <div className="w-10"></div>
        </header>

        <main className="flex-grow px-6 py-4 flex flex-col justify-between">
          <div>
            <label htmlFor="amount" className="font-semibold text-primary mb-2 block">
              Input amount to send
            </label>
            <Input
              id="amount"
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="h-14 text-lg rounded-xl border-primary/30 focus-visible:ring-primary"
              pattern="\d*"
            />
            
            <p className="text-center font-semibold text-primary my-6">
              Send {amount || 0}LQ to {recipientName}
            </p>

            <Button size="lg" className="w-full rounded-full h-14 text-lg">
              <WalletCards className="w-6 h-6 mr-2" />
              Send {amount || 0}LQ
            </Button>

            <div className="mt-4 bg-primary/5 text-muted-foreground p-3 rounded-lg text-sm flex items-start gap-3">
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
