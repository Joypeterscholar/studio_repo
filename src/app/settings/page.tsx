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
  X,
  Search,
  ChevronUp,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { signOutUser } from '@/firebase/auth/auth-service';

const GenderIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 4C14.7614 4 17 6.23858 17 9C17 11.7614 14.7614 14 12 14C9.23858 14 7 11.7614 7 9C7 6.23858 9.23858 4 12 4Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 14V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 18H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
)

const NigeriaFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="18" rx="2" fill="white"/>
      <rect width="8" height="18" fill="#008751"/>
      <rect x="16" width="8" height="18" fill="#008751"/>
    </svg>
);

const ItalyFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="24" height="18" rx="2" fill="white"/>
      <rect width="8" height="18" fill="#009246"/>
      <rect x="16" width="8" height="18" fill="#CE2B37"/>
    </svg>
);

const AustraliaFlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="18" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <rect width="24" height="18" rx="2" fill="#00008B"/>
        <path d="M1.5 1.5H10.5V7.5H1.5V1.5Z" fill="#fff"/>
        <path d="M2.25 2.25V3.375H10.5V2.25H2.25ZM2.25 6.75V7.5H9.75V6.75H2.25ZM6 2.25V7.5H5.25V2.25H6Z" fill="#CF142B"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.125 4.5L2.25 5.68069L2.73031 3.69034L1.23031 2.43903L3.3075 2.31931L4.125 0.375L4.9425 2.31931L6.96969 2.43903L5.52031 3.69034L6 5.68069L4.125 4.5Z" fill="#CF142B"/>
        <path d="M1.5 4.875H10.5V5.625H1.5V4.875Z" fill="#fff"/>
        <path d="M6.375 1.5V8.25H5.625V1.5H6.375Z" fill="#fff"/>
        <path d="M12 12L10.9393 11.0607L12 10.1213L13.0607 11.0607L12 12Z" fill="white"/>
        <path d="M17 10L16.4697 9.53033L17 9.06066L17.5303 9.53033L17 10Z" fill="white"/>
        <path d="M15 14L14.4697 13.5303L15 13.0607L15.5303 13.5303L15 14Z" fill="white"/>
        `"M19 14L18.4697 13.5303L19 13.0607L19.5303 13.5303L19 14Z" fill="white"/>
        <path d="M17 16L16.4697 15.5303L17 15.0607L17.5303 15.5303L17 16Z" fill="white"/>
    </svg>
);


const countries = [
  { name: 'Nigeria', icon: <NigeriaFlagIcon /> },
  { name: 'Italy', icon: <ItalyFlagIcon /> },
  { name: 'Australia', icon: <AustraliaFlagIcon /> },
];

const interestOptions = ['Male', 'Female', 'Trans', 'Non-binary'];

export default function SettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [distancePreferenceEnabled, setDistancePreferenceEnabled] = useState(true);
  const [agePreferenceEnabled, setAgePreferenceEnabled] = useState(true);
  const [interestedIn, setInterestedIn] = useState(['Female']);
  const [searchCountry, setSearchCountry] = useState('');

  const filteredCountries = countries.filter(c => c.name.toLowerCase().includes(searchCountry.toLowerCase()));

  const handleInterestChange = (interest: string) => {
    setInterestedIn(prev => 
      prev.includes(interest) 
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  }

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/login');
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Could not log out. Please try again.",
      });
    }
  };

  return (
    <div className="bg-muted/50 text-foreground min-h-screen">
      <header className="flex items-center p-4 bg-white shadow-sm">
        <Button onClick={() => router.back()} variant="ghost" size="icon" className="w-10 h-10">
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
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between p-4 border-t cursor-pointer">
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
              </DialogTrigger>
              <DialogContent className="sm:max-w-md w-[90vw] bg-white rounded-2xl p-0 shadow-lg border-none bottom-0 translate-y-0 sm:bottom-auto sm:translate-y-[-50%]">
                  <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
                      <DialogTitle className="text-xl font-bold text-primary">Select Country</DialogTitle>
                      <DialogClose asChild>
                        <Button variant="ghost" size="icon">
                            <X className="w-5 h-5"/>
                        </Button>
                      </DialogClose>
                  </DialogHeader>
                  <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between border-2 border-primary rounded-lg p-3 cursor-pointer">
                          <div className="flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                             <span className="font-medium text-primary">Nigeria</span>
                          </div>
                          <ChevronUp className="w-5 h-5 text-primary"/>
                      </div>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                          placeholder="Search" 
                          className="pl-10 bg-muted border-none focus-visible:ring-primary"
                          value={searchCountry}
                          onChange={(e) => setSearchCountry(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2 h-[30vh] overflow-y-auto">
                        {filteredCountries.map(country => (
                            <button key={country.name} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted">
                                {country.icon}
                                <span className="text-primary">{country.name}</span>
                            </button>
                        ))}
                      </div>
                  </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center justify-between p-4 border-t cursor-pointer">
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
              </DialogTrigger>
              <DialogContent className="sm:max-w-md w-[90vw] bg-white rounded-2xl p-0 shadow-lg border-none bottom-0 translate-y-0 sm:bottom-auto sm:translate-y-[-50%]">
                <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
                  <DialogTitle className="text-xl font-bold text-primary">Select Language</DialogTitle>
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="w-5 h-5 text-muted-foreground" />
                    </Button>
                  </DialogClose>
                </DialogHeader>
                <div className="p-4">
                  <button className="flex items-center justify-between w-full rounded-lg border p-3 text-left">
                    <span className="text-primary font-medium">English</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </DialogContent>
            </Dialog>
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

        <Dialog>
          <DialogTrigger asChild>
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-3 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <GenderIcon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-semibold text-primary">Interested in</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-semibold text-primary">{interestedIn.join(', ')}</span>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md w-[90vw] bg-white rounded-2xl p-0 shadow-lg border-none bottom-0 translate-y-0 sm:bottom-auto sm:translate-y-[-50%]">
            <DialogHeader className="flex flex-row items-center justify-between p-4 border-b">
              <DialogTitle className="text-xl font-bold text-primary">Interested in</DialogTitle>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="w-5 h-5 text-muted-foreground" />
                </Button>
              </DialogClose>
            </DialogHeader>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between border rounded-lg p-3">
                  <span className="font-medium text-primary">Female</span>
                  <ChevronUp className="w-5 h-5 text-primary"/>
              </div>
              <div>
                <p className="font-semibold text-primary mb-3">Status</p>
                <div className="space-y-3">
                  {interestOptions.map(option => (
                    <div key={option} className="flex items-center space-x-3">
                      <Checkbox
                        id={option.toLowerCase()}
                        checked={interestedIn.includes(option)}
                        onCheckedChange={() => handleInterestChange(option)}
                      />
                      <Label htmlFor={option.toLowerCase()} className="font-medium text-primary text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>


        <Button onClick={handleLogout} variant="outline" className="w-full bg-white text-primary border-primary h-12 text-base">
            Logout
        </Button>
      </main>
    </div>
  );
}
