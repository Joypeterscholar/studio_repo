'use client';

import {
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


const settingsItems = [
    { label: 'Phone number', value: '+234 804 934 9339' },
    { label: 'Name', value: 'Adichy Jnr' },
    { label: 'Username', value: 'adichyjnr' },
    { label: 'Email', value: 'adichyjnr@gmail.com' },
    { label: 'Change password', value: '**********' },
    { label: 'Gender', value: 'Male' },
    { label: 'Sexual Orientation', value: 'Heterosexual' },
    { label: 'Location preference', value: 'Use current location' },
]

const SettingsItem = ({ label, value }: { label: string, value: string }) => (
    <button className="flex items-center justify-between w-full text-left py-4 px-4">
        <div>
            <p className="font-semibold text-primary">{label}</p>
            <p className="text-muted-foreground">{value}</p>
        </div>
        <ChevronRight className="w-6 h-6 text-muted-foreground" />
    </button>
);

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="flex items-center p-4">
        <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10">
            <ChevronLeft className="h-6 w-6 text-primary" />
        </Button>
        <h1 className="text-xl font-bold text-primary mx-auto">Settings</h1>
        <div className="w-10"></div>
      </header>

      <main className="pb-8">
        <div className="divide-y divide-border bg-white">
            {settingsItems.map(item => (
                <SettingsItem key={item.label} label={item.label} value={item.value} />
            ))}
        </div>

        <div className="mt-6 px-4">
             <button className="flex items-center justify-between w-full text-left py-3 px-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-primary">Who can message me</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Anyone</span>
                    <ChevronRight className="w-6 h-6 text-muted-foreground" />
                </div>
            </button>
        </div>
      </main>
    </div>
  );
}
