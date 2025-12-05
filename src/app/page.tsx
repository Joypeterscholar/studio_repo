'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/layout/Logo';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/discover');
    }, 3000); // 3 second delay before redirecting

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-white/5 rounded-full"
            style={{
              width: `${(i + 1) * 25}vmin`,
              height: `${(i + 1) * 25}vmin`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center gap-16">
        <Logo isLinqUp={true} className="h-16" />
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full bounce-1"></div>
          <div className="w-3 h-3 bg-white rounded-full bounce-2"></div>
          <div className="w-3 h-3 bg-white rounded-full bounce-3"></div>
        </div>
      </div>
    </div>
  );
}
