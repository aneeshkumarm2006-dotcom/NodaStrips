/**
 * The circled line icons beside the comparison claims.
 *
 * Hand-drawn paths rather than an icon package: four icons is not worth a
 * dependency, and these carry the brand's hairline weight exactly.
 */

export type ClaimIconName = "tongue" | "nowater" | "moon" | "leaf";

const PATHS: Record<ClaimIconName, React.ReactNode> = {
  // A strip settling onto an open tongue
  tongue: (
    <>
      {/* a drop settling onto an open tongue — simplified so it still
          reads at 25px */}
      <path d="M12 3.4c1.3 1.7 2.1 2.8 2.1 3.8a2.1 2.1 0 0 1-4.2 0c0-1 .8-2.1 2.1-3.8Z" />
      <path d="M7.2 11.2h9.6v4.4a4.8 4.8 0 0 1-9.6 0v-4.4Z" />
    </>
  ),
  // A drop, struck through
  nowater: (
    <>
      <path d="M12 4.8c2.4 2.8 4.1 5 4.1 7.2a4.1 4.1 0 0 1-8.2 0c0-2.2 1.7-4.4 4.1-7.2Z" />
      <path d="M5.6 18.4 18.4 5.6" />
    </>
  ),
  // Crescent
  moon: <path d="M12 3.6a6.2 6.2 0 0 0 8.8 8.8A8.4 8.4 0 1 1 12 3.6Z" />,
  leaf: (
    <>
      <path d="M11 19.4a6.6 6.6 0 0 1-1.1-13.1C15.2 5.3 16.6 4.8 18.4 2.6c.9 1.9 1.9 3.9 1.9 7.5 0 5.1-4.4 9.3-9.3 9.3Z" />
      <path d="M3.4 20.6c0-2.8 1.7-5 3.5-6.3" />
    </>
  ),
};

export function ClaimIcon({
  name,
  className = "h-12 w-12",
}: {
  name: ClaimIconName;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border border-current/30 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[52%] w-[52%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {PATHS[name]}
      </svg>
    </span>
  );
}
