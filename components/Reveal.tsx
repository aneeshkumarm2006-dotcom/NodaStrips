"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Slow, quiet entrance. Fade and a short lift, once, on first sight.
 * Honours prefers-reduced-motion via the .reveal rule in globals.css.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** ms */
  delay?: number;
  as?: "div" | "section" | "li" | "span" | "p" | "h2";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref type varies with the polymorphic tag
      ref={ref}
      data-shown={shown}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
