import { cn } from "@/lib/utils";

export default function Logo({
  className,
}: {
  className?: string;
  isLinqUp?: boolean; // Kept for prop compatibility, but not used for rendering logic
}) {
  return (
    <svg
      viewBox="0 0 240 50"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-white", className)}
    >
      <text
        x="0"
        y="35"
        className="linqup-text"
      >
        LINQ
      </text>
      <g transform="translate(100, 12.5)">
        <path
          d="M25 12.5C25 5.596 19.404 0 12.5 0C5.596 0 0 5.596 0 12.5C0 19.404 5.596 25 12.5 25C19.404 25 25 19.404 25 12.5Z"
          fill="#D946EF"
        />
        <path
          d="M16.875 8.125L20 12.5L16.875 16.875"
          stroke="white"
          strokeWidth="1.875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.125 16.875L5 12.5L8.125 8.125"
          stroke="white"
          strokeWidth="1.875"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x="135"
        y="35"
        className="linqup-text"
      >
        UP
      </text>
    </svg>
  );
}
