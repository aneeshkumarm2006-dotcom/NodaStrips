"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LANGUAGES, NAV, type Language } from "@/lib/brand";
import { useCart } from "./CartProvider";
import { Wordmark } from "./Wordmark";

/**
 * Clean, minimal header modelled on Seed, carrying Cymbiotika's utilities:
 * country / language, account, cart. Deliberately no search.
 */
export function Header() {
  const pathname = usePathname();
  /** Over the full-colour hero the header floats; elsewhere it sits on bone. */
  const overHero = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const floating = overHero && !scrolled;

  /**
   * Frosted capsule over the hero photograph; a plain row once scrolled.
   * The capsule is desktop-only — on a phone the row is already full and
   * the extra padding pushes the CTA off the edge.
   */
  const group = [
    "flex items-center gap-3 transition-all duration-700 sm:gap-5",
    "[transition-timing-function:var(--ease-quiet)]",
    floating
      ? "sm:rounded-full sm:bg-bone/55 sm:px-5 sm:py-2 sm:backdrop-blur-xl"
      : "",
  ].join(" ");

  return (
    // Sticky, not fixed: the announcement bar above it scrolls away and only
    // the header follows, which is the behaviour on the reference site. The
    // hero pulls itself up underneath so the capsules float on the photo.
    <header className="sticky top-0 z-50">
      <div
        className={[
          "transition-[background-color,border-color,color] duration-700",
          "[transition-timing-function:var(--ease-quiet)]",
          // The hero photograph is high-key, so the header sits transparent
          // over it in dark type rather than reversing out of a colour band.
          floating
            ? "border-b border-transparent bg-transparent pt-3 text-brand-deep"
            : "border-b border-hairline bg-bone/85 text-ink backdrop-blur-md",
        ].join(" ")}
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-4 px-4 lg:px-6">
          {/* Over the photograph the two groups become frosted capsules, as
              the reference does; on a solid bar they are plain rows. */}
          <div className={group}>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="-ml-1 p-2 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M3 7h18M3 15h18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            <Link href="/" className="shrink-0" aria-label="NODA — home">
              <Wordmark className="text-[1.55rem] sm:text-[1.8rem] lg:text-[2rem]" />
            </Link>

            <nav className="hidden gap-8 lg:flex" aria-label="Main">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="micro link-quiet whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Utilities, then the one filled CTA. No search, by design. */}
          <div className={group}>
            {/* On a phone the locale lives in the drawer — the row is full */}
            <span className="hidden sm:block">
              <LanguageSelector />
            </span>
            <CartLink />
            <Link href="/account" className="micro link-quiet hidden sm:inline">
              Sign in
            </Link>
            <Link
              href="/shop"
              className="micro whitespace-nowrap rounded-full bg-brand-deep px-4 py-2.5 text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink sm:-mr-1.5 sm:px-5 sm:py-3"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function CartLink() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="micro link-quiet whitespace-nowrap">
      Cart <span aria-label={`${count} items in cart`}>({count})</span>
    </Link>
  );
}

function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Language>(LANGUAGES[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="micro flex items-center gap-1.5 whitespace-nowrap"
      >
        <span aria-hidden="true" className="text-sm leading-none">
          {current.flag}
        </span>
        {current.code}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Country and language"
          className="absolute right-0 top-[calc(100%+14px)] w-56 border border-hairline bg-bone py-2 text-ink shadow-[0_20px_50px_-20px_rgba(22,19,15,0.35)]"
        >
          {LANGUAGES.map((lang) => (
            <li key={`${lang.code}-${lang.country}`}>
              <button
                type="button"
                role="option"
                aria-selected={lang === current}
                onClick={() => {
                  setCurrent(lang);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-300 hover:bg-bone-deep"
              >
                <span aria-hidden="true">{lang.flag}</span>
                <span className="flex-1">{lang.country}</span>
                <span className="micro opacity-50">{lang.code}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={[
        "fixed inset-0 z-50 lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={[
          "absolute inset-0 bg-ink/30 transition-opacity duration-700",
          "[transition-timing-function:var(--ease-quiet)]",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
      <div
        className={[
          "absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-bone px-7 pb-10 pt-7",
          "transition-transform duration-700 [transition-timing-function:var(--ease-quiet)]",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-ml-2 mb-14 w-fit p-2"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        <nav className="flex flex-col gap-7" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="display text-[2.1rem]"
              tabIndex={open ? 0 : -1}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-start gap-5 pt-12">
          {/* The locale utility lives here on phones */}
          <LanguageSelector />
          <Link
            href="/account"
            className="micro"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
          >
            Sign in
          </Link>
          <Link
            href="/cart"
            className="micro"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
          >
            Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
