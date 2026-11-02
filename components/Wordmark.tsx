/**
 * The NODA wordmark — the client's custom serif lockup
 * (Logos/Black and White Minimalist Business Logo.png), "the middle Noda
 * file… a custom design, so use this one".
 *
 * The sunburst that sat in the O was retired in Nov 2026, so the O here is
 * drawn from the lockup's own D — its bowl, mirrored — to keep all four
 * letters in the one custom face. A drawn O from the designer should
 * replace it when available.
 *
 * Rendered as a single CSS mask in `currentColor`, so it reverses out to
 * cream over the hero and turns cocoa on the scrolled header.
 *
 * Size it by height; the width follows the artwork (3.47:1).
 *   <Wordmark className="h-7" />
 */

const MASK = "url(/brand/wordmark-noda.png)";

export function Wordmark({
  className = "",
  label = "NODA",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block aspect-[4746/1368] bg-current ${className}`}
      style={{
        maskImage: MASK,
        WebkitMaskImage: MASK,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}
