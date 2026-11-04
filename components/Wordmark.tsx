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
 * public/brand/wordmark-noda.png is the same file with the ™ removed, for
 * setting the name inside a sentence (client, Nov 2026: "use the special
 * font we have without the TR sign"). Pass `mark={false}` for it.
 *
 * Size it by height; the width follows the artwork.
 *   <Wordmark className="h-7" />
 *   <Wordmark mark={false} className="h-[0.95em] align-baseline" />
 */

const FILES = {
  tm: { mask: "url(/brand/wordmark-noda-tm.png)", aspect: "aspect-[1600/469]" },
  plain: { mask: "url(/brand/wordmark-noda.png)", aspect: "aspect-[1587/469]" },
} as const;

export function Wordmark({
  className = "",
  label = "NODA",
  mark = true,
}: {
  className?: string;
  label?: string;
  /** Show the ™. Off for the name set inline in running text. */
  mark?: boolean;
}) {
  const file = FILES[mark ? "tm" : "plain"];
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-block bg-current ${file.aspect} ${className}`}
      style={{
        maskImage: file.mask,
        WebkitMaskImage: file.mask,
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

/**
 * Sets each `{name}` in a line of copy as the wordmark, without the ™ —
 * sized so its x-height sits at the cap height of the text around it,
 * and in the text's own colour.
 *   <WithWordmark text="Share your {name} experience…" />
 */
export function WithWordmark({ text }: { text: string }) {
  const parts = text.split("{name}");
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <Wordmark mark={false} className="mx-[0.05em] h-[0.92em] align-[-0.02em]" />
      )}
    </span>
  ));
}
