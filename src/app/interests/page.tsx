'use client';

import { useState } from 'react';
import {
  Bell,
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
  Users,
  PartyPopper,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const interests = [
  { name: 'Football', icon: <Users className="w-4 h-4" /> },
  { name: 'Nature', icon: <Leaf className="w-4 h-4" /> },
  { name: 'Surfing', icon: <Waves className="w-4 h-4" /> },
  { name: 'Photography', icon: <Camera className="w-4 h-4" /> },
  { name: 'Music', icon: <Music className="w-4 h-4" /> },
  { name: 'Writing', icon: <Pen className="w-4 h-4" /> },
  { name: 'Fashion', icon: <Gem className="w-4 h-4" /> },
  { name: 'Books', icon: <Book className="w-4 h-4" /> },
  { name: 'Kinky Interests', icon: <Heart className="w-4 h-4 fill-black" /> },
  { name: 'Serious Relationship', icon: <Gem className="w-4 h-4" /> },
  { name: 'Open to Adventure', icon: <Globe className="w-4 h-4" /> },
  { name: 'Sex', icon: '🔥🍑' },
  { name: 'PDA', icon: '💋' },
  { name: 'Deep Conversations', icon: <BrainCircuit className="w-4 h-4" /> },
  { name: 'Making New Friends', icon: '🤝' },
  { name: 'Group Hangouts', icon: <PartyPopper className="w-4 h-4" /> },
];

export default function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interestName: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestName)
        ? prev.filter(name => name !== interestName)
        : [...prev, interestName]
    );
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 md:p-6">
        <Logo isLinqUp className="w-28 text-primary" />
        <Button variant="ghost" size="icon" className="border w-10 h-10">
          <Bell className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-grow px-6 py-4 overflow-y-auto">
        <h1 className="text-3xl font-bold text-primary">Interest</h1>
        <p className="text-muted-foreground mt-1">Select at least one.</p>

        <div className="flex flex-wrap gap-3 mt-8">
          {interests.map(interest => (
            <Button
              key={interest.name}
              variant="outline"
              onClick={() => toggleInterest(interest.name)}
              className={cn(
                'border-gray-300 flex items-center gap-2 transition-all duration-200',
                selectedInterests.includes(interest.name)
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-white text-foreground'
              )}
            >
              {typeof interest.icon === 'string' ? <span className="text-sm">{interest.icon}</span> : interest.icon}
              <span className="text-sm font-medium">{interest.name}</span>
            </Button>
          ))}
        </div>
      </main>

      <footer className="p-6">
        <Link href="/home" passHref>
          <Button className="w-full" size="lg">
            Get on the Roll!
          </Button>
        </Link>
      </footer>
    </div>
  );
}
