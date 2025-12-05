import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center rounded-lg bg-primary p-2", className)}>
        <Sparkles className="h-full w-full text-primary-foreground" />
    </div>
  );
}
