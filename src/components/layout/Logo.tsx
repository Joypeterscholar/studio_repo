import { cn } from "@/lib/utils";

export default function Logo({
  className,
  isLingup = false,
}: {
  className?: string;
  isLingup?: boolean;
}) {
  if (isLingup) {
    return (
      <svg
        viewBox="0 0 240 50"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-white", className)}
      >
        <text
          x="0"
          y="35"
          fontFamily="Arial, sans-serif"
          fontSize="36"
          fontWeight="bold"
          fill="currentColor"
        >
          LIN
        </text>
        <g transform="translate(100, 15)">
          <path
            d="M20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20C15.523 20 20 15.523 20 10Z"
            fill="#D946EF"
          />
          <path
            d="M13.5 6.5L16 10L13.5 13.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 13.5L4 10L6.5 6.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <text
          x="130"
          y="35"
          fontFamily="Arial, sans-serif"
          fontSize="36"
          fontWeight="bold"
          fill="currentColor"
        >
          UP
        </text>
      </svg>
    );
  }

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
