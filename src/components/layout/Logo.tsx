import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    isLinqUp?: boolean;
}

export default function Logo({ className, isLinqUp = false }: LogoProps) {
  if (isLinqUp) {
    return (
      <svg
        viewBox="0 0 290 60"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-primary-foreground", className)}
        style={{ letterSpacing: '0.05em' }}
      >
        <defs>
          <path id="q-outer" d="M20,1.5c10.23,0,18.5,8.27,18.5,18.5S30.23,38.5,20,38.5S1.5,30.23,1.5,20S9.77,1.5,20,1.5z" />
          <path id="q-inner" d="M20,6.85c7.26,0,13.15,5.89,13.15,13.15S27.26,33.15,20,33.15S6.85,27.26,6.85,20S12.74,6.85,20,6.85z" />
          <path id="female-symbol" d="M14.6,18.05v-5.4h2.7v-2.7h-2.7v-2.7h-2.7v2.7h-2.7v2.7h2.7v5.4c0,2.98,2.42,5.4,5.4,5.4h2.7v2.7h-2.7c-4.49,0-8.1-3.61-8.1-8.1Z" />
          <path id="male-symbol" d="m30.7,11.15l-4.05,4.05,2.7,2.7-4.05,4.05,1.89,1.89,4.05-4.05,2.7,2.7v-8.1Z" />
          <path id="refresh-arrow" d="M21.95,6.85c-1.49,0-2.86,0.59-3.89,1.62l-2.7-2.7v8.1h8.1l-2.7-2.7c0.5-0.5,1.17-0.81,1.89-0.81,1.49,0,2.7,1.22,2.7,2.7s-1.22,2.7-2.7,2.7h-5.4v2.7h5.4c2.98,0,5.4-2.42,5.4-5.4s-2.42-5.4-5.4-5.4Z" />
        </defs>
        
        <text fontFamily="Alegreya Sans SC, sans-serif" fontWeight="900" fontSize="48" fill="currentColor">
          <tspan x="0" y="45">LIN</tspan>
          <tspan x="200" y="45">UP</tspan>
        </text>

        <g transform="translate(115, 10)" fill="hsl(var(--accent))">
          <use href="#q-outer" stroke="hsl(var(--accent))" strokeWidth="3" fill="none"/>
          <use href="#q-inner" fill="hsl(var(--primary))"/>
          <g fill="hsl(var(--accent))">
            <use href="#female-symbol"/>
            <use href="#male-symbol"/>
            <use href="#refresh-arrow"/>
          </g>
        </g>
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
