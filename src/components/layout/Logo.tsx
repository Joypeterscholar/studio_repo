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
            viewBox="0 0 250 50"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("text-primary-foreground", className)}
        >
        <style>
          {`
            .linqup-text {
              font-family: 'Alegreya Sans SC', sans-serif;
              font-weight: 900;
              font-size: 40px;
              fill: currentColor;
            }
          `}
        </style>
        <text
          x="0"
          y="35"
          className="linqup-text"
        >
          LINQUP
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
