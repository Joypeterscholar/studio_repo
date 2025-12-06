'use client';

import {
  ChevronLeft,
  Pencil,
  Copy,
  Users,
  Leaf,
  Waves,
  Camera,
  Music,
  Pen,
  Gem,
  Book,
  Heart,
  Globe,
  Flame,
  Lipstick,
  BrainCircuit,
  PartyPopper,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const interests = [
  { name: 'Football', icon: <Users className="w-4 h-4" /> },
  { name: 'Nature', icon: <Leaf className="w-4 h-4" /> },
  { name: 'Surfing', icon: <Waves className="w-4 h-4" /> },
  { name: 'Photography', icon: <Camera className="w-4 h-4" /> },
  { name: 'Music', icon: <Music className="w-4 h-4" />, selected: true },
  { name: 'Writing', icon: <Pen className="w-4 h-4" /> },
  { name: 'Fashion', icon: <Gem className="w-4 h-4" /> },
  { name: 'Books', icon: <Book className="w-4 h-4" /> },
  { name: 'Kinky Interests', icon: <Heart className="w-4 h-4 fill-current" />, selected: true },
  { name: 'Serious Relationship', icon: <Gem className="w-4 h-4" /> },
  { name: 'Open to Adventure', icon: <Globe className="w-4 h-4" />, selected: true },
  { name: 'Sex', icon: '🔥🍑', selected: true },
  { name: 'PDA', icon: '💋', selected: true },
  { name: 'Deep Conversations', icon: <BrainCircuit className="w-4 h-4" /> },
  { name: 'Making New Friends', icon: '🤝', selected: false },
  { name: 'Group Hangouts', icon: <PartyPopper className="w-4 h-4" />, selected: true },
];

const accountInfo = [
    { label: 'Name', value: 'Adichy Jnr' },
    { label: 'Email', value: 'a•••••••e@gmail.com' },
    { label: 'Phone Number', value: '+234 810 123 4567' },
    { label: 'Password', value: '••••••••••••' },
]

export default function SettingsPage() {
  const referralImage = placeholderImages.find(p => p.id === 'refer-gift');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    interests.filter(i => i.selected).map(i => i.name)
  );

  const toggleInterest = (interestName: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestName)
        ? prev.filter(name => name !== interestName)
        : [...prev, interestName]
    );
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="flex items-center justify-between p-4">
        <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full border w-10 h-10">
                <ChevronLeft className="h-6 w-6" />
            </Button>
        </Link>
        <h1 className="text-xl font-bold text-primary">Settings</h1>
        <div className="w-10"></div>
      </header>

      <main className="px-4 pb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-primary">My Interests</h2>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                </Button>
            </div>
             <div className="flex flex-wrap gap-3">
              {interests.map(interest => (
                <Button
                  key={interest.name}
                  variant="outline"
                  onClick={() => toggleInterest(interest.name)}
                  className={cn(
                    'rounded-full border-gray-300 flex items-center gap-2 transition-all duration-200 text-xs h-8',
                    selectedInterests.includes(interest.name)
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'bg-white text-foreground'
                  )}
                >
                  {typeof interest.icon === 'string' ? <span className="text-sm">{interest.icon}</span> : interest.icon}
                  <span className="font-medium">{interest.name}</span>
                </Button>
              ))}
            </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-primary">Account Information</h2>
                <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Pencil className="w-4 h-4 text-muted-foreground" />
                </Button>
            </div>
            <div className="space-y-4">
                {accountInfo.map(info => (
                    <div key={info.label} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{info.label}</span>
                        <span className="font-semibold text-primary">{info.value}</span>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="bg-accent/10 p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
            {referralImage && (
                <Image 
                    src={referralImage.imageUrl} 
                    alt={referralImage.description}
                    width={80} 
                    height={80}
                    data-ai-hint={referralImage.imageHint}
                />
            )}
            <div className="flex-1">
                <h3 className="font-bold text-primary text-lg">Refer and Earn!</h3>
                <p className="text-muted-foreground text-sm mb-3">Copy your referral link & share it with your friends!</p>
                <div className="flex items-center gap-2">
                    <input type="text" value="https://Linqup.com/referral/..." readOnly className="flex-1 bg-white/50 rounded-md px-2 py-1 text-xs border border-primary/20"/>
                    <Button size="icon" className="w-8 h-8 bg-primary">
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>

        <Link href="/delete-account" passHref>
          <Button variant="destructive" className="w-full bg-red-100 text-red-600 hover:bg-red-200">
              Delete Account
          </Button>
        </Link>
      </main>
    </div>
  );
}