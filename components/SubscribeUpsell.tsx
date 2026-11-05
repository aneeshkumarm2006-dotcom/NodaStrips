"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MAX_QTY, useCart, type PlanId } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { SUBSCRIBE_UPSELL as U, SUBSCRIPTION_BENEFITS } from "@/lib/brand";
import { getPhoto } from "@/lib/photos";

/**
 * The subscribe pop-up, on Mondays' "Subscribe, Save + Sip More 12%"
 * drawer (client, Nov 2026: "when you click on 1 time purchase, we should
 * have this pop-up where we incentivize to subscribe").
 *
 * It slides in from the right when a 1 Time Purchase goes into the cart,
 * and from the cart's own "Subscribe & save" link on a one-time line:
 *
 *   · a bar in the carton's colour confirming what was added;
 *   · the offer, and the subscription benefits;
 *   · the line itself — the one-time price struck through beside the
 *     subscription price, a quantity stepper, and "Deliver every" for the
 *     cadence (monthly saves 20%, every three months 30%);
 *   · "Yes, save 20%" moves the line onto that subscription; "Take me to
 *     my cart" leaves it as it is.
 *
 * Escape, the veil and the close button all dismiss it; focus is held
 * inside while it is open and handed back afterwards.
 */

const CADENCES: PlanId[] = ["monthly", "quarterly"];

export function SubscribeUpsell({
  lineKey,
  context = "added",
  onClose,
}: {
  /** The one-time cart line to offer a subscription for */
  lineKey: string;
  /** "added" straight after add-to-cart; "cart" from the cart page */
  context?: "added" | "cart";
  onClose: () => void;
}) {
  const { lines, setQty, changePlan } = useCart();
  const { money } = useCurrency();
  const router = useRouter();
  const titleId = useId();

  const line = lines.find((l) => l.key === lineKey);
  const [cadence, setCadence] = useState<PlanId>("monthly");
  const [shown, setShown] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const dismiss = useCallback(
    (then?: () => void) => {
      setShown(false);
      // The cart is changed only once the drawer is out of sight, so the
      // line it shows doesn't vanish mid-slide
      window.setTimeout(() => {
        then?.();
        onClose();
      }, 450);
    },
    [onClose],
  );

  // Lock the page, focus inside, slide in; hand focus back on the way out
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => {
      setShown(true);
      closeBtn.current?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
      else if (e.key === "Tab" && panel.current) {
        const nodes = panel.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), select, a[href]",
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [dismiss]);

  // The line was removed (its last box taken out) — nothing left to offer
  useEffect(() => {
    if (!line) onClose();
  }, [line, onClose]);

  if (!line) return null;

  const { product, qty } = line;
  const sub = product.plans.find((p) => p.id === cadence)!;
  const once = product.plans.find((p) => p.id === "once")!;
  const best = Math.max(...product.plans.map((p) => p.savePct ?? 0));
  const photo = getPhoto(product.card);
  // A three-month delivery is three boxes, so its "before" price is three
  // one-time boxes — the same figure the purchase box strikes through.
  const before = (sub.compareAt ?? once.price) * qty;
  const after = sub.price * qty;
  const pct = sub.savePct ?? 0;

  const accept = () => {
    const key = line.key;
    dismiss(() => {
      changePlan(key, cadence);
      if (context === "added") router.push("/cart");
    });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[90]"
      style={{ "--accent": product.accent } as React.CSSProperties}
    >
      {/* The veil */}
      <div
        aria-hidden="true"
        onClick={() => dismiss()}
        className={`absolute inset-0 bg-ink/35 transition-opacity duration-500 [transition-timing-function:var(--ease-quiet)] ${
          shown ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[30rem] flex-col overflow-y-auto bg-white text-ink shadow-[-30px_0_80px_-40px_rgba(22,19,15,0.45)] transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] ${
          shown ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* The bar — what just happened */}
        <div className="flex items-center justify-between gap-4 bg-[var(--accent)] px-6 py-4 text-white">
          <p className="text-sm tracking-[0.01em]">
            {context === "added"
              ? U.added.replace("{product}", product.title)
              : `${product.title} — ${once.name}`}
          </p>
          <button
            ref={closeBtn}
            type="button"
            onClick={() => dismiss()}
            aria-label="Close"
            className="-mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/15"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col px-6 pb-8 pt-7 sm:px-8">
          <h2 id={titleId} className="display text-[2.35rem] leading-[1.02] text-ink">
            {U.title}
          </h2>
          <p className="mt-4 text-[0.9375rem] font-light leading-relaxed text-ink-soft">
            {U.intro.replace("{pct}", String(best))}
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {SUBSCRIPTION_BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-[0.9375rem] font-light">
                <svg
                  viewBox="0 0 16 16"
                  className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]"
                  aria-hidden="true"
                >
                  <path d="M3 8.4 6.3 11.5 13 4.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          {/* The line */}
          <div className="mt-7 border-t border-hairline pt-6">
            <div className="flex gap-4">
              <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-[8px] bg-tan">
                {photo && (
                  <Image src={photo.src} alt="" fill sizes="88px" className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[0.9375rem] font-semibold uppercase tracking-[0.04em]">
                      {product.title}
                    </p>
                    <p className="mt-0.5 text-sm font-light text-ink-soft">
                      {product.flavour.name} · {sub.short}
                    </p>
                  </div>
                  <div className="text-right text-sm tabular-nums">
                    <p>
                      <s className="text-ink-soft">{money(before)}</s>{" "}
                      <span className="font-semibold text-[var(--accent)]">{money(after)}</span>
                    </p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.06em] text-[var(--accent)]">
                      Saving {pct}%
                    </p>
                  </div>
                </div>

                <Stepper
                  qty={qty}
                  label={product.title}
                  onChange={(n) => setQty(line.key, n)}
                  className="mt-3"
                />
              </div>
            </div>

            <label className="mt-6 block">
              <span className="text-sm font-light text-ink-soft">{U.cadenceLabel}</span>
              <span className="relative mt-2 block">
                <select
                  value={cadence}
                  onChange={(e) => setCadence(e.target.value as PlanId)}
                  className="h-12 w-full appearance-none rounded-[8px] border-[0.8px] border-[#cfcbc4] bg-white pl-4 pr-10 text-[0.9375rem] outline-none transition-colors focus-visible:border-ink"
                >
                  {CADENCES.map((id) => {
                    const p = product.plans.find((x) => x.id === id)!;
                    return (
                      <option key={id} value={id}>
                        {id === "monthly" ? "Every month" : "Every 3 months"} — save {p.savePct}%
                      </option>
                    );
                  })}
                </select>
                <svg
                  viewBox="0 0 12 12"
                  className="pointer-events-none absolute right-4 top-1/2 h-3 w-3 -translate-y-1/2"
                  aria-hidden="true"
                >
                  <path d="M2 4.2 6 8l4-3.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            </label>
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <button
              type="button"
              onClick={accept}
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-sm font-medium uppercase tracking-[0.06em] text-white transition-[filter] duration-300 hover:brightness-110"
            >
              {U.accept.replace("{pct}", String(pct))}
            </button>
            <button
              type="button"
              onClick={() =>
                dismiss(context === "added" ? () => router.push("/cart") : undefined)
              }
              className="inline-flex h-12 w-full items-center justify-center rounded-full border-[0.8px] border-[var(--accent)]/40 px-6 text-sm uppercase tracking-[0.06em] text-[var(--accent)] transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--accent)_6%,white)]"
            >
              {context === "added" ? U.decline : "Keep one-time purchase"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/** − 1 + — shared by the pop-up and the cart */
export function Stepper({
  qty,
  label,
  onChange,
  className = "",
}: {
  qty: number;
  label: string;
  onChange: (qty: number) => void;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex h-10 items-center rounded-full border-[0.8px] border-[#cfcbc4] ${className}`}
    >
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label={qty === 1 ? `Remove ${label}` : `One fewer ${label}`}
        className="flex h-full w-10 items-center justify-center rounded-l-full transition-colors hover:bg-bone-deep"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M3 8h10" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>
      <span className="w-7 text-center text-sm tabular-nums" aria-live="polite">
        <span className="sr-only">Quantity </span>
        {qty}
      </span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        disabled={qty >= MAX_QTY}
        aria-label={`One more ${label}`}
        className="flex h-full w-10 items-center justify-center rounded-r-full transition-colors hover:bg-bone-deep disabled:opacity-35 disabled:hover:bg-transparent"
      >
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>
    </div>
  );
}
