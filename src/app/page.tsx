'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Logo from '@/components/layout/Logo';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/onboarding');
    }, 2000); // Shortened for quicker access during testing
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
            style={{
              width: `${(i + 1) * 20}rem`,
              height: `${(i + 1) * 20}rem`,
              animation: `fade-in-and-scale 2s ease-in-out ${i * 0.4}s infinite alternate`
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-16">
        <Logo isLinqUp className="w-64" />
        <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 rounded-full bg-white/50"></div>
            <div className="h-4 w-4 rounded-full bg-white animate-loading-dots"></div>
            <div className="h-4 w-4 rounded-full bg-white/50"></div>
        </div>
      </div>
       <style jsx>{`
        @keyframes fade-in-and-scale {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
