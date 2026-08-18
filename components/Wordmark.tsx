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
      {/* Deliberately larger than the letterforms — it overhangs the cap
          height top and bottom. 0.72em then 0.95em both still read as too
          small, so the symbol now leads the lockup rather than sitting
          inside it. */}
      <Mark
        className={`ml-[0.2em] h-[1.25em] w-[1.25em] -translate-y-[0.06em] ${
          mono ? "" : markClassName
        }`}
      />
    </span>
  );
}
