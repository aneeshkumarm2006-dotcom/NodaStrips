/**
 * The NODA mark — the N alone, cut from the custom serif wordmark
 * (Logos/Black and White Minimalist Business Logo.png).
 *
 * The client retired the sunburst in Nov 2026 ("remove this logo from
 * everywhere… use the Noda image's N letter only"), so this is now the
 * only standalone mark — footer, favicon and share image all use it.
 *
 * Applied as a CSS mask filled with `currentColor`, so one file renders in
 * any colour. Size it by height; the width follows the letter (0.776:1).
 */

const MASK = "url(/brand/n-mark.png)";

export function Mark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`inline-block aspect-[1062/1368] shrink-0 bg-current ${className ?? ""}`}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
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
