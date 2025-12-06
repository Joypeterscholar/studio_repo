'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/layout/Logo';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 7000); // 7-second delay before redirecting
    return () => clearTimeout(timer); // Cleanup the timer
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
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center gap-16">
        <Logo isLinqUp className="w-64" />
        <div className="relative flex h-8 w-24 items-center justify-center overflow-hidden">
            <div className="absolute flex gap-4 text-4xl font-bold text-white/50">
                <span className="-ml-1">.</span>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </div>
            <div className="absolute h-2 w-2 animate-loading-dots rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}
