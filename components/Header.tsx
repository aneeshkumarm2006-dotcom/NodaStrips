"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CURRENCIES, NAV, SECONDARY_NAV, type Currency } from "@/lib/brand";
import { useCart } from "./CartProvider";
import { Wordmark } from "./Wordmark";

/**
 * The header, laid out exactly as the client's mockup: the two product
 * links on the left, the custom NODA wordmark centred, and currency,
 * account and cart on the right.
 *
 * Behaviour is Arrae's, measured off their live site:
 *   · over the hero it is transparent, with cream type;
 *   · scrolling down slides it away (translateY(-100%));
 *   · scrolling back up brings it back as a solid cream bar —
 *     oklch(0.9959 0.0093 99.98) — with cocoa type;
 *   · transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), background and colour
 *     0.25s — their exact timings.
 *
 * Off the home page there is no hero to float over, so it starts solid.
 */
const ARRAE_TRANSITION =
  "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s, color 0.25s, border-color 0.25s";

export function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/";

  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 10);
      // A few pixels of slack so trackpad jitter doesn't flicker it
      if (y > lastY.current + 4 && y > 120) setHidden(true);
      else if (y < lastY.current - 4 || y < 120) setHidden(false);
      lastY.current = y;
    };
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

  const transparent = overHero && atTop;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50",
          transparent
            ? "bg-transparent text-cream"
            : "bg-cream text-cocoa",
        ].join(" ")}
        // Inline transform, not a translate utility: Tailwind v4 utilities
        // set the `translate` property, which Arrae's `transform` timing
        // would not animate.
        style={{
          transition: ARRAE_TRANSITION,
          transform: hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div className="mx-auto grid h-[4.5rem] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 lg:h-20 lg:px-10">
          {/* Left — the two product links */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="-ml-2 p-2 lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>

            <nav className="hidden items-center gap-11 lg:flex" aria-label="Main">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-caps link-quiet whitespace-nowrap"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centre — the wordmark */}
          <Link href="/" aria-label="NODA — home" className="justify-self-center">
            <Wordmark className="h-7 lg:h-9" />
          </Link>

          {/* Right — currency, account, cart */}
          <div className="flex items-center justify-end gap-5 lg:gap-9">
            <span className="hidden lg:block">
              <CurrencySelector />
            </span>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden opacity-90 transition-opacity hover:opacity-100 sm:block"
            >
              <AccountIcon />
            </Link>
            <CartLink onHero={transparent} />
          </div>
        </div>
      </header>

      {/* Off the home page the content starts below the bar, not under it */}
      {!overHero && <div aria-hidden="true" className="h-[4.5rem] lg:h-20" />}

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function AccountIcon() {
  return (
    <svg
      viewBox="0 0 28 28"
      className="h-[1.6rem] w-[1.6rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="12.6" />
      <circle cx="14" cy="11.2" r="4.1" />
      <path d="M6.6 22.4c1.5-3.3 4.3-5 7.4-5s5.9 1.7 7.4 5" />
    </svg>
  );
}

function CartLink({ onHero }: { onHero: boolean }) {
  const { count } = useCart();
  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="relative opacity-90 transition-opacity hover:opacity-100"
    >
      <svg
        viewBox="0 0 28 28"
        className="h-[1.65rem] w-[1.65rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5.2 9.4h17.6l-1.3 15.1H6.5L5.2 9.4Z" />
        <path d="M10.2 12V7.6a3.8 3.8 0 0 1 7.6 0V12" />
      </svg>
      {count > 0 && (
        <span className="absolute -right-2 -top-1.5 flex h-[1.05rem] min-w-[1.05rem] items-center justify-center rounded-full bg-current px-1 text-[0.625rem] leading-none tabular-nums">
          {/* Inverted against whichever colour the bar currently is */}
          <span className={onHero ? "text-cocoa" : "text-cream"}>{count}</span>
        </span>
      )}
    </Link>
  );
}

function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Currency>(CURRENCIES[0]);
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
        aria-label={`Currency: ${current}`}
        className="nav-caps flex h-10 min-w-[7.25rem] items-center justify-between gap-4 rounded-[4px] border border-current/45 px-4 tracking-[0.08em] transition-colors duration-300 hover:border-current"
      >
        {current}
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
          <path d="M2 4.2 6 8l4-3.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Currency"
          className="absolute right-0 top-[calc(100%+10px)] w-full overflow-hidden rounded-[4px] border border-cocoa/10 bg-cream py-1 text-cocoa shadow-[0_18px_40px_-18px_rgba(32,26,19,0.35)]"
        >
          {CURRENCIES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === current}
                onClick={() => {
                  setCurrent(code);
                  setOpen(false);
                }}
                className="nav-caps w-full px-4 py-2.5 text-left tracking-[0.08em] transition-colors duration-200 hover:bg-cocoa/5"
              >
                {code}
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
        "fixed inset-0 z-[60] lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      ].join(" ")}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={[
          "absolute inset-0 bg-cocoa/30 transition-opacity duration-700",
          "[transition-timing-function:var(--ease-quiet)]",
          open ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
      <div
        className={[
          "absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col bg-cream px-7 pb-10 pt-6 text-cocoa",
          "transition-transform duration-700 [transition-timing-function:var(--ease-quiet)]",
          open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="-ml-2 mb-12 w-fit p-2"
          tabIndex={open ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        <nav className="flex flex-col gap-6" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-serif text-[2.25rem] font-light uppercase leading-none tracking-[0.04em]"
              tabIndex={open ? 0 : -1}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className="mt-10 flex flex-col gap-4 border-t border-cocoa/10 pt-8" aria-label="More">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-caps"
              tabIndex={open ? 0 : -1}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-start gap-5 pt-12">
          <CurrencySelector />
          <Link
            href="/account"
            className="nav-caps"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
          >
            Account
          </Link>
        </div>
      </div>
    </div>
  );
}
