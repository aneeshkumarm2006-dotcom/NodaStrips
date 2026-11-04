"use client";

import Link from "next/link";
import { useState } from "react";
import { ArtSlot } from "@/components/ArtSlot";
import { ClaimIcon } from "@/components/ClaimIcon";
import { Emphasised } from "@/components/Emphasised";
import { Reveal } from "@/components/Reveal";
import { WHY_STRIPS as W, type FormatItem } from "@/lib/brand";

/**
 * The Right Format — "Not every wellness need calls for the same format."
 * (Was "04 — The science of the strip"; renamed and un-numbered in the
 * Nov 2026 doc, which also supplied all of the copy.)
 *
 * Replaces the absorption chart on the main page, built to the client's
 * supplied layout. The chart moved, unchanged, to each product page.
 *
 *   LEFT   a hairline card: eyebrow, the headline with "need calls" in
 *          the italic, one paragraph, then a Sleep and an Energy & Focus
 *          card, each a photograph over an eyebrow, a title and copy.
 *   RIGHT  a two-way toggle — Why strips / Other formats — over three
 *          ruled rows, each a circled line icon, a title and either a
 *          sentence or, for the other formats, their trade-offs as points.
 *
 * Same deep green ground, hairlines and toggle as the chart it replaces,
 * so the page keeps its rhythm.
 *
 * Other formats, per the client's Nov 2026 notes: each format reads as a
 * "✓ Works well for" and a "– The trade-off", set a size down so all three
 * fit in one view, on a #F2EFE7 card in place of the green — that colour
 * is for this panel only.
 */
export function WhyStrips() {
  const [active, setActive] = useState(0);
  const tab = W.tabs[active];

  return (
    <section
      className="bg-brand-deep py-20 text-bone lg:py-28"
      aria-labelledby="why-strips-heading"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-5 lg:grid-cols-[1.12fr_1fr] lg:gap-16 lg:px-10">
        {/* ---------------------------------------------- the card */}
        <Reveal>
          <div className="rounded-3xl border border-bone/12 bg-bone/[0.04] p-6 sm:p-9 lg:p-11">
            <p className="micro text-bone/60">{W.eyebrow}</p>

            <h2
              id="why-strips-heading"
              className="display mt-6 text-[clamp(2.25rem,3.9vw,3.75rem)]"
            >
              <Emphasised text={W.title} />
            </h2>

            <p className="mt-6 max-w-[38rem] text-[1.0625rem] font-light leading-relaxed text-bone/80">
              {W.body}
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {W.moments.map((m) => (
                <li key={m.kicker}>
                  <Link
                    href={m.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-bone/12 transition-colors duration-500 hover:border-bone/30"
                  >
                    <ArtSlot
                      variant="dusk"
                      brief={m.brief}
                      showCaption={false}
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="aspect-[16/9] w-full rounded-2xl"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="micro text-bone/70">{m.kicker}</p>
                      <h3 className="display mt-3 text-[1.65rem] leading-tight">
                        {m.title}
                      </h3>
                      <p className="mt-3 font-light leading-relaxed text-bone/70">{m.body}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ------------------------------------------- the toggle */}
        <Reveal delay={120} className="lg:pt-12">
          <div
            role="tablist"
            aria-label="Format"
            className="inline-flex w-fit rounded-full border border-bone/25 p-1"
          >
            {W.tabs.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                id={`why-tab-${t.id}`}
                type="button"
                aria-selected={i === active}
                aria-controls="why-panel"
                onClick={() => setActive(i)}
                className={`micro rounded-full px-6 py-3 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] ${
                  i === active
                    ? "bg-bone text-brand-deep"
                    : "text-bone/65 hover:text-bone"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab.id === "other" ? (
            <OtherFormats id={tab.id} items={tab.items} />
          ) : (
            <dl
              id="why-panel"
              role="tabpanel"
              aria-labelledby={`why-tab-${tab.id}`}
              className="mt-12 border-t border-bone/15"
            >
              {tab.items.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-6 border-b border-bone/15 py-8"
                >
                  <ClaimIcon name={item.icon} className="h-14 w-14" />
                  <div>
                    <dt className="display text-[clamp(1.6rem,2.2vw,2rem)] leading-tight">
                      {item.title}
                    </dt>
                    {typeof item.body === "string" && (
                      <dd className="mt-3 max-w-md text-[1.0625rem] font-light leading-relaxed text-bone/70">
                        {item.body}
                      </dd>
                    )}
                  </div>
                </div>
              ))}
            </dl>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------- other formats panel */

/** Text on the #F2EFE7 card: brand green for what works, a warm clay for
    the trade-off (5:1 on the card, so it holds at label size). */
const TRADEOFF = "text-[#8a5a2e]";

function OtherFormats({ id, items }: { id: string; items: readonly FormatItem[] }) {
  return (
    <dl
      id="why-panel"
      role="tabpanel"
      aria-labelledby={`why-tab-${id}`}
      className="mt-8 rounded-3xl bg-[#F2EFE7] px-6 py-1 text-ink sm:px-8"
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-start gap-5 border-b border-ink/10 py-6 last:border-b-0"
        >
          <ClaimIcon name={item.icon} className="h-11 w-11 text-brand-deep" />
          <div className="min-w-0">
            <dt className="display text-[1.5rem] leading-tight">{item.title}</dt>
            {typeof item.body !== "string" && (
              <dd className="mt-3 flex flex-col gap-3">
                <Point mark="check" label="Works well for" tone="text-brand-deep">
                  {item.body.works}
                </Point>
                <Point mark="dash" label="The trade-off" tone={TRADEOFF}>
                  {item.body.tradeoff}
                </Point>
              </dd>
            )}
          </div>
        </div>
      ))}
    </dl>
  );
}

function Point({
  mark,
  label,
  tone,
  children,
}: {
  mark: "check" | "dash";
  label: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1rem_1fr] gap-x-3">
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={`mt-[0.1rem] h-3.5 w-3.5 ${tone}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {mark === "check" ? <path d="m3 8.4 3.2 3.1L13 4.6" /> : <path d="M3.5 8h9" />}
      </svg>
      <p className={`micro text-[0.6875rem] ${tone}`}>{label}</p>
      <p className="col-start-2 mt-1 text-[0.9375rem] font-light leading-relaxed text-ink-soft">
        {children}
      </p>
    </div>
  );
}
