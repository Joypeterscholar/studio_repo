'use client';

import { useState } from 'react';
import {
  Bell,
  SoccerBall,
  Leaf,
  Surf,
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

const interests = [
  { name: 'Football', icon: <SoccerBall className="w-4 h-4" /> },
  { name: 'Nature', icon: <Leaf className="w-4 h-4" /> },
  { name: 'Surfing', icon: <Surf className="w-4 h-4" /> },
  { name: 'Photography', icon: <Camera className="w-4 h-4" /> },
  { name: 'Music', icon: <Music className="w-4 h-4" />, selected: true },
  { name: 'Writing', icon: <Pen className="w-4 h-4" /> },
  { name: 'Fashion', icon: <Gem className="w-4 h-4" /> },
  { name: 'Books', icon: <Book className="w-4 h-4" /> },
  { name: 'Kinky Interests', icon: <Heart className="w-4 h-4 fill-black" />, selected: true },
  { name: 'Serious Relationship', icon: <Gem className="w-4 h-4" /> },
  { name: 'Open to Adventure', icon: <Globe className="w-4 h-4" />, selected: true },
  { name: 'Sex', icon: '🔥🍑', selected: true },
  { name: 'PDA', icon: '💋', selected: true },
  { name: 'Deep Conversations', icon: <BrainCircuit className="w-4 h-4" /> },
  { name: 'Making New Friends', icon: '🤝', selected: false },
  { name: 'Group Hangouts', icon: <PartyPopper className="w-4 h-4" />, selected: true },
];

export default function InterestsPage() {
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
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex items-center justify-between p-4 md:p-6">
        <Logo isLinqUp className="w-28" />
        <Button variant="ghost" size="icon" className="rounded-full border w-10 h-10">
          <Bell className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-grow px-6 py-4 overflow-y-auto">
        <h1 className="text-3xl font-bold">Interest</h1>
        <p className="text-muted-foreground mt-1">Select at least one.</p>

        <div className="flex flex-wrap gap-3 mt-8">
          {interests.map(interest => (
            <Button
              key={interest.name}
              variant="outline"
              onClick={() => toggleInterest(interest.name)}
              className={cn(
                'rounded-full border-gray-300 flex items-center gap-2 transition-all duration-200',
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
        <Button className="w-full rounded-full" size="lg">
          Get on the Roll!
        </Button>
      </footer>
    </div>
  );
}
