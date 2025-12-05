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
        <style>
          {`
            .lingup-text {
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
          className="lingup-text"
        >
          LIN
        </text>
        <g transform="translate(90, 12.5)">
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
          x="125"
          y="35"
          className="lingup-text"
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
