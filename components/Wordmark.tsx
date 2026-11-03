/**
 * The noda™ wordmark — the client's file, from the "NODA no BG" Drive
 * folder linked in the Nov 2026 doc ("Noda name. Use this file for the
 * name. We have a specific typography."). Originals, in black, purple and
 * white, are in Logos/NODA no BG (Nov 2026)/.
 *
 * public/brand/wordmark-noda-tm.png is BLACK.png trimmed to the artwork
 * and reduced to its alpha channel, then rendered as a CSS mask filled
 * with `currentColor` — so the one file reverses out over the hero, sits
 * dark on the white header and light on the green footer.
 *
 * Size it by height; the width follows the artwork (3.41:1).
 *   <Wordmark className="h-7" />
 */

const MASK = "url(/brand/wordmark-noda-tm.png)";

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
      className={`inline-block aspect-[1600/469] bg-current ${className}`}
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
