import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface LogoProps {
    className?: string;
    isLinqUp?: boolean;
}

export default function Logo({ className, isLinqUp = false }: LogoProps) {
  if (isLinqUp) {
    return (
        <svg
            viewBox="0 0 240 50"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-white", className)}
        >
        <text x="0" y="35" className="linqup-text">
          LIN
        </text>
        <g transform="translate(105, 0)">
            <path
                d="M25,1.75a23.25,23.25,0,1,0,23.25,23.25A23.25,23.25,0,0,0,25,1.75Zm-4.37,21.56a1.5,1.5,0,0,1-2.12,0l-3.54-3.54a1.5,1.5,0,0,1,2.12-2.12l3.54,3.54a1.5,1.5,0,0,1,0,2.12Zm5.44-15.65,1.13,3.38,3.38,1.13a1.7,1.7,0,0,1,0,3.18l-3.38,1.13-1.13,3.38a1.7,1.7,0,0,1-3.18,0l-1.13-3.38-3.38-1.13a1.7,1.7,0,0,1,0-3.18l3.38-1.13,1.13-3.38a1.7,1.7,0,0,1,3.18,0Zm9,12.11a1.5,1.5,0,0,1,0-2.12l3.54-3.54a1.5,1.5,0,0,1,2.12,2.12l-3.54,3.54a1.5,1.5,0,0,1-2.12,0Z"
                fill="#E55C9C"
            />
            <path
                d="M17.47,20.69a1.5,1.5,0,0,1,2.12,0l3.54,3.54a1.5,1.5,0,0,1-2.12,2.12l-3.54-3.54a1.5,1.5,0,0,1,0-2.12Z"
                fill="#E55C9C"
            />
        </g>
        <text x="165" y="35" className="linqup-text">
          UP
        </text>
      </svg>
    );
  }

  return (
    <div className={cn("flex items-center justify-center rounded-lg bg-primary p-2", className)}>
        <Sparkles className="h-full w-full text-primary-foreground" />
    </div>
  );
}
