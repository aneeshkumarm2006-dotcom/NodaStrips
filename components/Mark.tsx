/**
 * The NODA mark — the sunburst supplied by the brand team.
 *
 * The artwork is a PNG, so it is applied as a CSS mask and filled with
 * `currentColor`. That keeps the supplied geometry exactly as drawn while
 * still letting it render in one colour anywhere — bone on indigo, ink on
 * bone, or any category colour — from a single file.
 *
 * Where a fixed brand colour is wanted instead, the five colourways are in
 * public/brand/mark-*.png.
 */

const MASK = "url(/brand/mark.png)";

export function Mark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`inline-block shrink-0 bg-current ${className ?? ""}`}
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
