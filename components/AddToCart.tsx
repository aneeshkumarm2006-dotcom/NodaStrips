"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

/**
 * Add-to-cart. Confirms in place with a slow crossfade rather than a
 * toast — nothing should pop at the reader.
 */
export function AddToCart({
  slug,
  name,
  className = "",
  label = "Add to cart",
}: {
  slug: string;
  name: string;
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 2200);
    return () => clearTimeout(t);
  }, [justAdded]);

  return (
    <button
      type="button"
      onClick={() => {
        add({ slug, name });
        setJustAdded(true);
      }}
      className={[
        "micro relative inline-flex h-11 items-center justify-center border border-current px-6",
        "transition-colors duration-500 [transition-timing-function:var(--ease-quiet)]",
        "hover:bg-current/10",
        className,
      ].join(" ")}
    >
      {/* Both labels stacked so the button never changes width */}
      <span
        className="transition-opacity duration-500 [transition-timing-function:var(--ease-quiet)]"
        style={{ opacity: justAdded ? 0 : 1 }}
      >
        {label}
      </span>
      <span
        aria-hidden={!justAdded}
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 [transition-timing-function:var(--ease-quiet)]"
        style={{ opacity: justAdded ? 1 : 0 }}
      >
        Added
      </span>
    </button>
  );
}
