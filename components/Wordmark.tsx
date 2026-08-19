import { Mark } from "./Mark";

/**
 * The NODA wordmark: the name set in type, with the sunburst following it —
 * the lockup pattern on the reference site, rather than the mark sitting
 * inside the O.
 *
 * Size it with a font-size class; the mark scales from that in `em`, so the
 * pair always stays in proportion.
 *   <Wordmark className="text-[1.5rem]" />
 */
export function Wordmark({
  className = "",
  /** Tailwind text colour for the sunburst */
  markClassName = "text-ignite",
  /** Draw the mark in the same colour as the name */
  mono = false,
  label = "NODA",
}: {
  className?: string;
  markClassName?: string;
  mono?: boolean;
  label?: string;
}) {
  return (
    <span
      className={`display inline-flex items-center leading-none tracking-[-0.02em] ${className}`}
      role="img"
      aria-label={label}
    >
      <span aria-hidden="true">NODA</span>
      {/* Matched to the cap height of the letters, per the client: 0.6875em
          of a 32px lockup is 22px, which is exactly the height of the "A".
          The translate lifts it onto the cap-height centre rather than the
          line-box centre, which otherwise makes it sit low. */}
      <Mark
        className={`ml-[0.2em] h-[0.6875em] w-[0.6875em] -translate-y-[0.09em] ${
          mono ? "" : markClassName
        }`}
      />
    </span>
  );
}
