'use client';

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  PlayCircle,
  Globe,
  Languages,
  Users,
  User,
  Cake,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

const GenderIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 4C14.7614 4 17 6.23858 17 9C17 11.7614 14.7614 14 12 14C9.23858 14 7 11.7614 7 9C7 6.23858 9.23858 4 12 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 14V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
)

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [distancePreferenceEnabled, setDistancePreferenceEnabled] = useState(true);
  const [agePreferenceEnabled, setAgePreferenceEnabled] = useState(true);
  const [interestedIn, setInterestedIn] = useState('Female');

  return (
    <div className="bg-muted/50 text-foreground min-h-screen">
      <header className="flex items-center p-4 bg-white shadow-sm">
        <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full w-10 h-10">
          <ChevronLeft className="h-6 w-6 text-primary" />
        </Button>
        <h1 className="text-xl font-bold text-primary mx-auto">Settings</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 space-y-4 pb-24">
        <div className="bg-white rounded-xl shadow-sm">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bell className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-primary">Notifications</span>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between p-4 border-t">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <PlayCircle className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-primary">Autoplay Videos/Gifs</span>
                </div>
                <Switch checked={autoplay} onCheckedChange={setAutoplay} />
            </div>
             <div className="flex items-center justify-between p-4 border-t">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-primary">Country</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Nigeria</span>
                    <ChevronRight className="w-5 h-5" />
                </div>
            </div>
            <div className="flex items-center justify-between p-4 border-t">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Languages className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-primary">Language</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span>English</span>
                    <ChevronRight className="w-5 h-5" />
                </div>
            </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
             <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-semibold text-primary">Distance Preference</span>
                    </div>
                    <span className="font-semibold text-primary">50km</span>
                </div>
                <Slider defaultValue={[50]} max={100} step={1} className="my-4" />
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Only show people in this range</span>
                    <Switch checked={distancePreferenceEnabled} onCheckedChange={setDistancePreferenceEnabled} />
                </div>
             </div>
        </div>

         <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
             <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Cake className="w-5 h-5 text-primary" />
                        </div>
                        <span className="font-semibold text-primary">Age Preference</span>
                    </div>
                    <span className="font-semibold text-primary">19-45</span>
                </div>
                <Slider defaultValue={[19, 45]} max={100} step={1} className="my-4" />
                <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Only show people in this range</span>
                    <Switch checked={agePreferenceEnabled} onCheckedChange={setAgePreferenceEnabled} />
                </div>
             </div>
             <p className="text-xs text-muted-foreground">By adjusting the range, you can tailor your search to suit your lifestyle and dating preferences.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <GenderIcon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-semibold text-primary">Interested in</span>
            </div>
            <div className="flex gap-2">
                {['Male', 'Female', 'Trans'].map(option => (
                    <Button 
                        key={option}
                        onClick={() => setInterestedIn(option)}
                        variant={interestedIn === option ? "default" : "outline"}
                        className={cn("rounded-lg flex-grow", interestedIn === option ? 'bg-primary text-primary-foreground' : 'bg-white text-primary border-border')}
                    >
                        {option}
                    </Button>
                ))}
            </div>
        </div>

        <Button variant="outline" className="w-full rounded-full bg-white text-primary border-primary h-12 text-base">
            Logout
        </Button>
      </main>
    </div>
  );
}
