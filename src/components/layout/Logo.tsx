import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
    >
      <path
        d="M12.38,8.42c-2.43-2.43-6.36-2.43-8.79,0c-2.43,2.43-2.43,6.36,0,8.79c2.43,2.43,6.36,2.43,8.79,0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.62,17.21c2.43,2.43,6.36,2.43,8.79,0c2.43-2.43,2.43-6.36,0-8.79c-2.43-2.43-6.36-2.43-8.79,0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
