"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { ClaimIcon } from "@/components/ClaimIcon";
import { Reveal } from "@/components/Reveal";
import {
  COMPARISON,
  COMPARISON_CLAIMS,
  COMPARISON_FOOTNOTE,
} from "@/lib/brand";
import { getPhoto } from "@/lib/photos";

/**
 * 05 — How it compares.
 *
 * Built to match the client's supplied mockup: deep green ground, and each
 * bar a window onto a photograph of that format — strips, gummies, capsules,
 * tablets. Ours carries the accent tint; the comparators sit behind a green
 * wash so the emphasis reads instantly while the product stays recognisable.
 *
 * The dark ground is deliberate and was chosen over the earlier white — the
 * photo-filled bars only glow like this against a dark surface.
 *
 * Accessibility, kept deliberately:
 *   · every value is direct-labelled, so nothing is gated behind hover
 *   · a legend names the two roles, so identity is never colour-alone
 *   · each bar is focusable and its readout appears on focus as well as hover
 *   · a screen-reader table carries the full dataset
 *   · the fill photographs are decorative and hidden from assistive tech
 *
 * Comparators are formats, not brands. Naming competitors needs
 * substantiation; the argument lands just as hard without it.
 */

const DOMAIN_MAX = 100;
const GRID = [0, 60, 100];
const PLOT_HEIGHT = "clamp(300px, 34vw, 440px)";
/** Room above the plot so the tallest value label never clips. */
const HEADROOM = "3rem";

export function Compare() {
  const [active, setActive] = useState(0);
  const tableId = useId();
  const data = COMPARISON[active];
  const floor = Math.min(...data.bars.map((b) => b.value));

  return (
    <section
      // overflow-x-clip, not hidden: the hover tooltips on the outer bars
      // extend past the card and were widening the page by a few px on a
      // phone. Clipping x only leaves the tooltips free to rise vertically.
      className="overflow-x-clip bg-brand-deep py-24 text-bone lg:py-32"
      aria-labelledby="compare-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* ---------------------------------------------- the chart */}
          {/* On a phone the argument reads first and the chart supports it */}
          <Reveal className="order-2 lg:order-1">
            <figure className="m-0 rounded-3xl border border-bone/12 bg-bone/[0.04] p-6 sm:p-8 lg:p-10">
              {/* Card header: what is plotted, and the legend */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                <figcaption className="micro text-bone/60">
                  {data.axis} ({data.unit})
                </figcaption>

                <ul className="flex items-center gap-5">
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ignite" />
                    <span className="micro text-bone">Oral strip</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-bone/35" />
                    <span className="micro text-bone/55">Other formats</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10 flex gap-4">
                {/* Y axis, aligned to the plot area rather than the headroom */}
                <div
                  className="relative w-8 shrink-0 sm:w-11"
                  style={{ height: PLOT_HEIGHT }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-x-0 bottom-0" style={{ top: HEADROOM }}>
                    {GRID.map((g) => (
                      <span
                        key={g}
                        className="absolute right-0 translate-y-1/2 text-[0.8125rem] tabular-nums text-bone/55"
                        style={{ bottom: `${(g / DOMAIN_MAX) * 100}%` }}
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="relative" style={{ height: PLOT_HEIGHT }}>
                    <div className="absolute inset-x-0 bottom-0" style={{ top: HEADROOM }}>
                      {/* Gridlines — solid hairlines, one step off the surface */}
                      {GRID.map((g) => (
                        <span
                          key={g}
                          aria-hidden="true"
                          className={`absolute inset-x-0 h-px ${
                            g === 0 ? "bg-bone/30" : "bg-bone/12"
                          }`}
                          style={{ bottom: `${(g / DOMAIN_MAX) * 100}%` }}
                        />
                      ))}

                      {/* Vertical axis rule, as the reference has */}
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 top-0 w-px bg-bone/25"
                      />

                      <ul className="absolute inset-0 flex items-end justify-between gap-2 pl-3 sm:gap-3.5 sm:pl-4">
                        {data.bars.map((bar) => {
                          const pct = (bar.value / DOMAIN_MAX) * 100;
                          const times = (bar.value / floor).toFixed(1);
                          const photo = getPhoto(bar.fill);
                          return (
                            <li key={bar.format} className="relative h-full flex-1">
                              {/* The bar is the focus target, so the ring hugs
                                  the mark. Value and readout anchor here too
                                  and track the bar as it animates. */}
                              <div
                                tabIndex={0}
                                aria-label={`${bar.format}, ${bar.value}${data.unit}`}
                                className="group absolute inset-x-0 bottom-0 rounded-t-xl outline-offset-4 transition-[height] duration-700 [transition-timing-function:var(--ease-quiet)]"
                                style={{ height: `${pct}%` }}
                              >
                                {/* The window onto the format photograph */}
                                <span
                                  aria-hidden="true"
                                  className={`relative block h-full w-full overflow-hidden rounded-t-xl ${
                                    bar.ours
                                      ? "ring-1 ring-ignite/60"
                                      : "ring-1 ring-bone/20"
                                  }`}
                                >
                                  {photo && (
                                    <Image
                                      src={photo.src}
                                      alt=""
                                      fill
                                      sizes="(max-width: 640px) 25vw, 180px"
                                      className={`object-cover object-bottom transition-[filter] duration-500 ${
                                        bar.ours
                                          ? ""
                                          : "saturate-[0.9] group-hover:saturate-100 group-focus:saturate-100"
                                      }`}
                                    />
                                  )}
                                  {/* Tint: accent for ours, a green wash for
                                      the rest — enough to recede, not enough
                                      to hide what the format is */}
                                  <span
                                    className={`absolute inset-0 ${
                                      bar.ours
                                        ? "bg-ignite/50 mix-blend-multiply"
                                        : "bg-brand/25"
                                    }`}
                                  />
                                  {/* Soft highlight along the top edge of our
                                      bar, as the reference has */}
                                  {bar.ours && (
                                    <span className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-bone/35 to-transparent" />
                                  )}
                                </span>

                                {/* Value, always visible — never hover-gated */}
                                <span
                                  className={`absolute inset-x-0 -top-9 text-center text-[1.35rem] tabular-nums ${
                                    bar.ours ? "text-bone" : "text-bone/65"
                                  }`}
                                >
                                  {bar.value}
                                  {data.unit}
                                </span>

                                {/* Readout adds the comparison the label can't */}
                                <span
                                  role="tooltip"
                                  className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-11 -translate-x-1/2 whitespace-nowrap rounded-lg border border-bone/20 bg-ink px-3 py-2 text-xs text-bone opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100"
                                >
                                  {bar.format} · {times}× the lowest
                                </span>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>

                  {/* X axis band — inside the card, never clipped */}
                  <ul className="mt-4 flex justify-between gap-2 pl-3 sm:gap-3.5 sm:pl-4">
                    {data.bars.map((bar) => (
                      <li
                        key={bar.format}
                        className={`micro flex-1 text-center text-[0.625rem] leading-tight tracking-[0.1em] sm:text-[0.6875rem] ${
                          bar.ours ? "text-bone" : "text-bone/45"
                        }`}
                      >
                        {bar.format}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Methodology, with the same icon treatment as the claims */}
              <div className="mt-10 flex items-start gap-5 border-t border-bone/12 pt-7 text-bone/55">
                <ClaimIcon name="leaf" className="h-10 w-10" />
                <p className="max-w-lg text-[0.8125rem] leading-relaxed">{COMPARISON_FOOTNOTE}</p>
              </div>

              {/* Table view — every value reachable without hover */}
              <table id={tableId} className="sr-only">
                <caption>
                  {data.axis} ({data.unit}), by format
                </caption>
                <tbody>
                  {data.bars.map((bar) => (
                    <tr key={bar.format}>
                      <th scope="row">{bar.format}</th>
                      <td>
                        {bar.value}
                        {data.unit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </figure>
          </Reveal>

          {/* ------------------------------------------- the argument */}
          <Reveal delay={120} className="order-1 flex flex-col justify-center lg:order-2">
            <p className="micro text-bone/55">
              05 — The same dose, delivered differently
            </p>

            <h2
              id="compare-heading"
              className="display mt-7 text-[clamp(2.25rem,4.2vw,3.5rem)]"
            >
              Absorption is the whole argument.
            </h2>

            {/* Dataset toggle */}
            <div
              role="tablist"
              aria-label="Comparison measure"
              className="mt-9 inline-flex w-fit rounded-full border border-bone/25 p-1"
            >
              {COMPARISON.map((set, i) => (
                <button
                  key={set.id}
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls={tableId}
                  onClick={() => setActive(i)}
                  className={`micro rounded-full px-5 py-2.5 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] ${
                    i === active
                      ? "bg-bone text-brand-deep"
                      : "text-bone/60 hover:text-bone"
                  }`}
                >
                  {set.label}
                </button>
              ))}
            </div>

            <dl className="mt-12 border-t border-bone/15">
              {COMPARISON_CLAIMS.map((claim) => (
                <div
                  key={claim.title}
                  className="flex items-start gap-6 border-b border-bone/15 py-7"
                >
                  <ClaimIcon name={claim.icon} />
                  <div>
                    <dt className="display text-[1.4rem] leading-tight">
                      {claim.title}
                    </dt>
                    <dd className="mt-2.5 max-w-md leading-relaxed text-bone/65">
                      {claim.body}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
