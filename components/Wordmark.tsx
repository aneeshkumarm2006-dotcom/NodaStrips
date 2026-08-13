/**
 * The NODA wordmark — the supplied serif lockup, with the sunburst in the O.
 *
 * The artwork ships as a flattened PNG, so it is split into two masks
 * (letters and burst) that are stacked and filled with CSS colour. That keeps
 * the drawing exactly as supplied while letting the lockup sit on any
 * background and take any colourway — including a single colour, which the
 * brand direction requires.
 *
 * Size it by height; the width follows from the artwork's aspect ratio.
 *   <Wordmark className="h-6" />
 */

const maskStyle = (url: string) =>
  ({
    maskImage: `url(${url})`,
    WebkitMaskImage: `url(${url})`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  }) as React.CSSProperties;

export function Wordmark({
  className = "",
  /** Tailwind background colour for the sunburst */
  burstClassName = "bg-ignite",
  /** Draw the whole lockup in one colour */
  mono = false,
  label = "NODA",
}: {
  className?: string;
  burstClassName?: string;
  mono?: boolean;
  label?: string;
}) {
  return (
    <span
      className={`relative inline-block aspect-[1243/372] ${className}`}
      role="img"
      aria-label={label}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-current"
        style={maskStyle("/brand/lockup-text-mask.png")}
      />
      <span
        aria-hidden="true"
        className={`absolute inset-0 ${mono ? "bg-current" : burstClassName}`}
        style={maskStyle("/brand/lockup-burst-mask.png")}
      />
    </span>
  );
}
