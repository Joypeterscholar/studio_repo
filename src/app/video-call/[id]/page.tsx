'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Mic,
  MicOff,
  Phone,
  Video,
  VideoOff,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { type User } from '@/lib/data';
import { placeholderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { useUserById } from '@/firebase';

const findImage = (id: string) => {
  return placeholderImages.find((p) => p.id === id) || placeholderImages[0];
};

export default function VideoCallPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const userId = params.id as string;
  const { data: otherUser } = useUserById(userId);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setHasCameraPermission(true);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        // In a real app, you would now establish the WebRTC connection
        // and set the remote stream to the remoteVideoRef
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description:
            'Please enable camera permissions in your browser settings.',
        });
      }
    };

    getCameraPermission();

    // Clean up stream on component unmount
    return () => {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [toast]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };


  const handleEndCall = () => {
    router.back();
  };

  const toggleMute = () => setIsMuted((prev) => !prev);
  const toggleCamera = () => setIsCameraOff((prev) => !prev);
  
  const remoteUserImage = otherUser ? findImage(otherUser.image.id) : placeholderImages[0];


  return (
    <div className="relative h-screen w-screen bg-black text-white">
      {/* Remote Video */}
      <div className="absolute inset-0">
        <Image 
            src={remoteUserImage.imageUrl}
            alt={remoteUserImage.description}
            fill
            className="object-cover"
            data-ai-hint={remoteUserImage.imageHint}
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>


      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pt-12">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-black/30 hover:bg-black/50"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <div className="text-center">
            <p className="font-bold">{otherUser?.name || 'Unknown User'}</p>
            <p className="text-sm opacity-80">{formatDuration(callDuration)}</p>
        </div>
        <div className="w-10"></div>
      </header>
      
      {/* Local Video */}
      <div className={cn(
          "absolute top-32 right-4 z-20 h-48 w-32 overflow-hidden rounded-2xl border-2 border-white/50 shadow-lg transition-all",
          isCameraOff && "hidden"
        )}
      >
        <video ref={localVideoRef} className="h-full w-full object-cover scale-x-[-1]" autoPlay muted playsInline />
         {!hasCameraPermission && (
             <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center p-2">
                <p className="text-xs">Enable camera to see yourself</p>
            </div>
         )}
      </div>

      {!hasCameraPermission && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm">
            <Alert variant="destructive">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                    This feature requires camera permission. Please enable it in your browser settings.
                </AlertDescription>
            </Alert>
          </div>
      )}


      {/* Controls */}
      <footer
        className="absolute bottom-0 left-0 right-0 z-10 p-6"
        style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-center gap-6 rounded-full bg-black/30 p-4 backdrop-blur-md max-w-sm mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-14 w-14 rounded-full text-white", !isMuted ? "bg-white/20" : "bg-white/40")}
            onClick={toggleMute}
          >
            {isMuted ? <MicOff className="h-7 w-7" /> : <Mic className="h-7 w-7" />}
          </Button>
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600"
            onClick={handleEndCall}
          >
            <Phone className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-14 w-14 rounded-full text-white", !isCameraOff ? "bg-white/20" : "bg-white/40")}
            onClick={toggleCamera}
          >
            {isCameraOff ? <VideoOff className="h-7 w-7" /> : <Video className="h-7 w-7" />}
          </Button>
        </div>
      </footer>
    </div>
  );
}
