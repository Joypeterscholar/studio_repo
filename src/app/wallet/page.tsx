'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft, Send, WalletCards } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import Link from 'next/link';

const earnings = [
  { description: 'Deposit', amount: '50LQ' },
  { description: 'Referrals', amount: '17LQ' },
  { description: 'Credits Received', amount: '150LQ' },
];

export default function WalletPage() {
  const router = useRouter();

  return (
    <AppLayout>
      <div className="flex flex-col h-full bg-muted/50">
        <header className="flex items-center p-4">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10 border bg-white">
            <ChevronLeft className="h-6 w-6 text-primary" />
          </Button>
          <div className="flex-grow text-center">
            <h1 className="text-xl font-bold text-primary">Wallet</h1>
          </div>
          <div className="w-10"></div>
        </header>
        
        <main className="flex-grow px-4 py-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center mb-8">
                <p className="text-muted-foreground">Your Balance</p>
                <p className="text-4xl font-bold text-primary my-2">217LQ</p>
                <div className="flex flex-col gap-3 mt-4">
                    <Button size="lg" className="w-full rounded-full bg-cyan-400 hover:bg-cyan-500 text-white">
                        <Send className="w-5 h-5 mr-2 -ml-2 rotate-[-45deg] translate-y-px" />
                        Send Credits
                    </Button>
                    <Link href="/buy-credits" passHref>
                        <Button size="lg" className="w-full rounded-full">
                            <WalletCards className="w-5 h-5 mr-2" />
                            Buy Credits
                        </Button>
                    </Link>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold text-primary mb-2">Earnings</h2>
                <div className="bg-white rounded-2xl shadow-sm">
                    {earnings.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-4 border-b last:border-b-0">
                            <p className="text-muted-foreground">{item.description}</p>
                            <p className="font-semibold text-primary">{item.amount}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
      </div>
    </AppLayout>
  );
}
