/**
 * The circled line icons beside the comparison claims.
 *
 * Hand-drawn paths rather than an icon package: four icons is not worth a
 * dependency, and these carry the brand's hairline weight exactly.
 */

export type ClaimIconName =
  | "tongue"
  | "nowater"
  | "moon"
  | "leaf"
  | "nosugar"
  | "dose"
  | "sun"
  | "bolt"
  | "layers"
  | "bag"
  | "pill"
  | "gummy"
  | "cup";

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
  // A sugar cube, struck through
  nosugar: (
    <>
      <path d="M6.4 6.4h11.2v11.2H6.4z" />
      <path d="M5.4 18.6 18.6 5.4" />
    </>
  ),
  // A small measure — a low dose
  dose: (
    <>
      <path d="M5 12h14" />
      <path d="M8.2 12v4.6a3.8 3.8 0 0 0 7.6 0V12" />
      <path d="M12 5.2v3.4" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 19.4a6.6 6.6 0 0 1-1.1-13.1C15.2 5.3 16.6 4.8 18.4 2.6c.9 1.9 1.9 3.9 1.9 7.5 0 5.1-4.4 9.3-9.3 9.3Z" />
      <path d="M3.4 20.6c0-2.8 1.7-5 3.5-6.3" />
    </>
  ),
  // A low sun — daytime, for Energy
  sun: (
    <>
      <circle cx="12" cy="12" r="3.6" />
      <path d="M12 3.4v2.2M12 18.4v2.2M3.4 12h2.2M18.4 12h2.2M5.9 5.9l1.6 1.6M16.5 16.5l1.6 1.6M5.9 18.1l1.6-1.6M16.5 7.5l1.6-1.6" />
    </>
  ),
  // Targeted support — a bolt
  bolt: <path d="M13.2 3.4 6.4 13.2h5.2l-1 7.4 6.8-9.8h-5.2l1-7.4Z" />,
  // A thin film, in layers
  layers: (
    <>
      <path d="m12 4.4 8 4.1-8 4.1-8-4.1 8-4.1Z" />
      <path d="m4 12 8 4.1 8-4.1" />
      <path d="m4 15.5 8 4.1 8-4.1" />
    </>
  ),
  // Portable — a small bag
  bag: (
    <>
      <path d="M5.2 8.6h13.6l-.9 10.6H6.1L5.2 8.6Z" />
      <path d="M9.2 8.6V7.2a2.8 2.8 0 0 1 5.6 0v1.4" />
    </>
  ),
  // A capsule
  pill: (
    <>
      <rect x="3.6" y="8.6" width="16.8" height="6.8" rx="3.4" transform="rotate(-35 12 12)" />
      <path d="m10.1 9.3 3.8 5.4" />
    </>
  ),
  // A gummy
  gummy: (
    <path d="M8.2 6.4c-1.6 0-2.6 1.3-2.4 2.7.1.8.5 1.3.5 1.8 0 .6-.9 1.3-.9 2.9 0 2.4 2.6 4.6 6.6 4.6s6.6-2.2 6.6-4.6c0-1.6-.9-2.3-.9-2.9 0-.5.4-1 .5-1.8.2-1.4-.8-2.7-2.4-2.7-1.3 0-1.9.9-3.8.9s-2.5-.9-3.8-.9Z" />
  ),
  // A glass to mix in
  cup: (
    <>
      <path d="M6.6 5.4h10.8l-1.4 13.2H8L6.6 5.4Z" />
      <path d="M7.2 10.2h9.6" />
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
