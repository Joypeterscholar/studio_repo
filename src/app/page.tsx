"use client";

import Logo from "@/components/layout/Logo";

export default function SplashScreen() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#581C50] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/5"
            style={{
              width: `${(i + 1) * 20}rem`,
              height: `${(i + 1) * 20}rem`,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%)`,
            }}
          />
        ))}
      </div>
      <div className="z-10 flex flex-col items-center justify-center gap-16">
        <Logo isLinqUp={true} className="h-16" />
        <div className="flex items-center justify-center space-x-6">
           <div className="relative w-24 h-6">
              <div className="absolute left-0 w-6 h-6 rounded-full bg-white opacity-50" />
              <div className="absolute right-0 w-6 h-6 rounded-full bg-white opacity-50" />
              <div 
                className="absolute w-6 h-6 rounded-full bg-white"
                style={{ animation: 'loading-dots 1.5s cubic-bezier(0.6, 0.01, 0.4, 1) infinite' }}
              />
           </div>
        </div>
      </div>
    </div>
  );
}
