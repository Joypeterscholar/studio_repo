import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    isLinqUp?: boolean;
}

export default function Logo({ className, isLinqUp = false }: LogoProps) {
  if (isLinqUp) {
    return (
      <svg
        viewBox="0 0 320 70"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-primary", className)}
      >
        <defs>
            <style>
            {`
                @import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@900&display=swap');
            `}
            </style>
        </defs>
        
        <text x="0" y="55" className="linqup-text">LINQUP</text>
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
