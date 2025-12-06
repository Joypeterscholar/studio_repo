import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    isLinqUp?: boolean;
}

export default function Logo({ className, isLinqUp = false }: LogoProps) {
  if (isLinqUp) {
    return (
      <svg
        viewBox="0 0 350 70"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-primary", className)}
      >
        <defs>
            <style>
            {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');
                .linqup-logo-text {
                    font-family: 'Poppins', sans-serif;
                    font-weight: 800;
                    font-size: 60px;
                    fill: currentColor;
                }
            `}
            </style>
        </defs>
        
        <text x="0" y="55" className="linqup-logo-text">LIN</text>
        
        <g transform="translate(145, 0)">
            <path 
                d="M56.3,21.9C56.3,21.9,56.3,21.9,56.3,21.9c-2.8-5.3-6.6-9.9-11.4-13.6c-9.6-7.5-22.4-9.6-33.5-5.2 C-1.8,9.4-11,25.5-9.4,38.7c1.3,10.6,8.8,19.9,18.8,24.1c4.9,2.1,10.1,2.9,15.2,2.7c5.1-0.2,10.1-1.6,14.6-4 c4.5-2.4,8.4-5.8,11.5-9.9c2.9-3.9,5-8.3,6.2-12.9c0.3-1,0.5-2,0.8-3c0-0.1-0.1-0.1-0.1-0.2c0.2-0.7,0.3-1.4,0.5-2.1 c0.3-1.4,0.6-2.8,0.7-4.2c0.1-0.9,0.2-1.8,0.2-2.7C63.2,28.8,60.2,25.2,56.3,21.9z M41.9,48.5c-2,2.3-4.5,4.1-7.2,5.5 c-5.4,2.7-11.5,3.5-17.5,1.7c-7.3-2.2-13-7.5-15.6-14.3c-2.6-6.8-1.5-14.4,2.9-20.4c4.4-6,11.2-9.6,18.7-9.4 c7.5,0.2,14.2,4,18.5,9.8c2.9,3.9,4.5,8.6,4.8,13.5c0,0.4,0,0.8-0.1,1.2c-0.1,0.8-0.3,1.6-0.5,2.4c-0.1,0.3-0.2,0.6-0.3,0.9 c-0.1,0.4-0.2,0.7-0.3,1.1c-0.1,0.2-0.2,0.5-0.3,0.7C44.7,46.1,43.5,47.3,41.9,48.5z"
                fill="currentColor"
            />
            <path 
                d="M41.7,28.1c-0.7-2.1-1.6-4.1-2.9-5.9c-3.1-4.4-7.5-7.6-12.7-8.8c-5.2-1.2-10.6,0-15,3.3 c-4.4,3.3-7.2,8.1-7.9,13.5c-0.7,5.4,0.8,10.9,4.1,15.2c3.3,4.4,8,7.3,13.4,8.1c5.4,0.7,10.9-0.7,15.4-4 c3.2-2.3,5.6-5.5,7.1-9.1C44.1,36.5,43.1,32.2,41.7,28.1z"
                fill="hsl(var(--accent))"
            />
             <path 
                d="M62.6,52.3c-2.7,4.2-6.5,7.6-11,9.9c-4.1,2.1-8.6,3.2-13.2,3.3c-0.1,0-0.2,0-0.3,0l-1.3-0.1 c-0.8-0.1-1.5-0.2-2.3-0.3c-5-0.8-9.6-2.8-13.6-5.9c-3.1-2.4-5.6-5.4-7.4-8.9c-0.2-0.4-0.4-0.8-0.6-1.2c-0.8-1.7-1.4-3.4-1.8-5.2 c-0.5-2-0.7-4-0.7-6c0-0.1,0-0.2,0-0.3c1.9,0.2,3.8,0.2,5.7,0.1c-0.1,0.8-0.1,1.7,0,2.5c0.4,4,1.8,7.8,4.1,11.2 c2.3,3.4,5.4,6.2,9.1,7.9c3.7,1.7,7.8,2.2,11.8,1.5c4-0.7,7.7-2.6,10.7-5.5c2.9-2.8,4.7-6.5,5.4-10.4c0.1-0.6,0.2-1.2,0.3-1.8 c0.1-0.8,0.2-1.7,0.2-2.5c0-1.1,0-2.2-0.1-3.3c-0.1-1.1-0.3-2.2-0.5-3.3c-0.3-1.3-0.6-2.6-1-3.8c0.8,0,1.7-0.1,2.5-0.2 c1.1-0.1,2.2-0.3,3.3-0.6c1-0.3,2-0.6,3-1c0.1,0.8,0.1,1.5,0.1,2.2c0.1,1.5,0,3-0.2,4.4c-0.2,1.2-0.5,2.4-0.9,3.6 C64.6,48.5,63.9,50.5,62.6,52.3z"
                fill="currentColor"
            />
        </g>

        <text x="235" y="55" className="linqup-logo-text">UP</text>
      </svg>
    );
  }

  // Fallback for other logo types, not used by splash screen
  return (
    <div className={cn("flex items-center justify-center rounded-lg bg-primary p-2", className)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-full w-full text-primary-foreground"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
    </div>
  );
}
