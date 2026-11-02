"use client";

import Link from "next/link";
import { useState } from "react";
import { ArtSlot } from "@/components/ArtSlot";
import { ClaimIcon } from "@/components/ClaimIcon";
import { Reveal } from "@/components/Reveal";
import { WHY_STRIPS as W } from "@/lib/brand";

/**
 * 04 — "Not every wellness need calls for the same format."
 *
 * Replaces the absorption chart on the main page, built to the client's
 * supplied layout. The chart moved, unchanged, to each product page.
 *
 *   LEFT   a hairline card: eyebrow, the headline with "need calls" set
 *          heavier, one paragraph, then a Sleep and an Energy card, each
 *          a photograph over an eyebrow, a title and a line of copy.
 *   RIGHT  a two-way toggle — Why strips / Other formats — over three
 *          ruled rows, each a circled line icon, a title and a sentence.
 *
 * Same deep green ground, hairlines and toggle as the chart it replaces,
 * so the page keeps its rhythm.
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
              className="display mt-6 text-[clamp(2.1rem,3.7vw,3.5rem)] font-normal leading-[1.06]"
            >
              <Emphasised text={W.title} />
            </h2>

            <p className="mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-bone/75">
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
                      <h3 className="display mt-3 text-[1.4rem] leading-tight">
                        {m.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-bone/65">{m.body}</p>
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
                  <dt className="display text-[clamp(1.4rem,2vw,1.75rem)] leading-tight">
                    {item.title}
                  </dt>
                  <dd className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-bone/65">
                    {item.body}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/** Renders **marked** words heavier, as the reference sets "need calls". */
function Emphasised({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
