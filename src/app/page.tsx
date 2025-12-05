'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/layout/Logo';

export default function SplashScreen() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      router.push('/discover');
    }, 3000); // Navigate after 3 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-white relative overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-primary/10 rounded-full"
            style={{
              width: `${(i + 1) * 20}rem`,
              height: `${(i + 1) * 20}rem`,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%)`,
              animation: isMounted ? `pulse 8s ease-in-out infinite` : 'none',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>
      <div className="z-10 flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <Logo className="h-20 w-auto" isLinqUp={true} />
        </div>
        <div className="absolute bottom-20 flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-white/50 animate-pulse [animation-delay:-0.3s]"></div>
          <div className="h-3 w-3 rounded-full bg-white/50 animate-pulse [animation-delay:-0.15s]"></div>
          <div className="h-3 w-3 rounded-full bg-white/50 animate-pulse"></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
