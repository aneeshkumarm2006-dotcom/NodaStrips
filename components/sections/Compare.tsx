"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  COMPARISON,
  COMPARISON_CLAIMS,
  COMPARISON_FOOTNOTE,
} from "@/lib/brand";

/**
 * 05 — How it compares.
 *
 * An emphasis chart: one measure, ours in the accent, the comparators in a
 * muted step of the surface. The plot lives in a raised card so it reads as
 * a designed panel rather than marks floating on a colour field.
 *
 * Accessibility, kept deliberately:
 *   · every value is direct-labelled, so nothing is gated behind hover
 *   · a legend names the two roles, so identity is never colour-alone
 *   · each bar is focusable and its readout appears on focus as well as hover
 *   · a screen-reader table carries the full dataset
 *
 * Comparators are formats, not brands. Naming competitors needs
 * substantiation; the argument lands just as hard without it.
 */

const DOMAIN_MAX = 100;
const GRID = [0, 50, 100];
const PLOT_HEIGHT = "clamp(260px, 30vw, 380px)";
/** Room above the plot so the tallest value label never clips. */
const HEADROOM = "2.5rem";

export function Compare() {
  const [active, setActive] = useState(0);
  const tableId = useId();
  const data = COMPARISON[active];
  const floor = Math.min(...data.bars.map((b) => b.value));

  return (
    <section
      className="bg-brand-deep py-24 text-bone lg:py-32"
      aria-labelledby="compare-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          {/* ---------------------------------------------- the chart */}
          {/* On a phone the argument reads first and the chart supports it */}
          <Reveal className="order-2 lg:order-1">
            <figure className="m-0 rounded-3xl border border-bone/10 bg-bone/5 p-6 sm:p-8 lg:p-10">
              {/* Card header: what is plotted, and the legend */}
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                <figcaption className="micro text-bone/60">
                  {data.axis} ({data.unit})
                </figcaption>

                <ul className="flex items-center gap-5">
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-ignite" />
                    <span className="micro text-bone/80">Oral strip</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-bone/25" />
                    <span className="micro text-bone/50">Other formats</span>
                  </li>
                </ul>
              </div>

              <div className="mt-10 flex gap-4">
                {/* Y axis, aligned to the plot area rather than the headroom */}
                <div
                  className="relative w-8 shrink-0 sm:w-10"
                  style={{ height: PLOT_HEIGHT }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-x-0 bottom-0" style={{ top: HEADROOM }}>
                    {GRID.map((g) => (
                      <span
                        key={g}
                        className="micro absolute right-0 translate-y-1/2 tabular-nums text-bone/35"
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
                            g === 0 ? "bg-bone/25" : "bg-bone/10"
                          }`}
                          style={{ bottom: `${(g / DOMAIN_MAX) * 100}%` }}
                        />
                      ))}

                      <ul className="absolute inset-0 flex items-end justify-between gap-2 sm:gap-4">
                        {data.bars.map((bar) => {
                          const pct = (bar.value / DOMAIN_MAX) * 100;
                          const times = (bar.value / floor).toFixed(1);
                          return (
                            <li key={bar.format} className="relative h-full flex-1">
                              {/* The bar itself is the focus target, so the
                                  ring hugs the mark rather than the whole
                                  plot height. Value and readout anchor here
                                  too, and track the bar as it animates. */}
                              <div
                                tabIndex={0}
                                aria-label={`${bar.format}, ${bar.value}${data.unit}`}
                                className="group absolute inset-x-0 bottom-0 rounded-t-lg outline-offset-4 transition-[height] duration-700 [transition-timing-function:var(--ease-quiet)]"
                                style={{ height: `${pct}%` }}
                              >
                                <span
                                  aria-hidden="true"
                                  className={`block h-full w-full rounded-t-lg transition-colors duration-300 ${
                                    bar.ours
                                      ? "bg-ignite"
                                      : "bg-bone/12 group-hover:bg-bone/20 group-focus:bg-bone/20"
                                  }`}
                                />

                                {/* Value, always visible — never hover-gated */}
                                <span
                                  className={`micro absolute inset-x-0 -top-7 text-center tabular-nums ${
                                    bar.ours ? "text-bone" : "text-bone/50"
                                  }`}
                                >
                                  {bar.value}
                                  {data.unit}
                                </span>

                                {/* Readout adds the comparison the label can't */}
                                <span
                                  role="tooltip"
                                  className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-8 -translate-x-1/2 whitespace-nowrap rounded-lg border border-bone/15 bg-brand-deep px-3 py-2 text-xs opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100"
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
                  <ul className="mt-4 flex justify-between gap-2 sm:gap-4">
                    {data.bars.map((bar) => (
                      <li
                        key={bar.format}
                        className={`micro flex-1 text-center text-[0.5625rem] leading-tight tracking-[0.1em] sm:text-[0.625rem] ${
                          bar.ours ? "text-bone" : "text-bone/45"
                        }`}
                      >
                        {bar.format}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-10 border-t border-bone/10 pt-6 text-xs leading-relaxed text-bone/40">
                {COMPARISON_FOOTNOTE}
              </p>

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
              className="mt-9 inline-flex w-fit rounded-full border border-bone/20 p-1"
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
                <div key={claim.title} className="border-b border-bone/15 py-7">
                  <dt className="display text-[1.4rem] leading-tight">
                    {claim.title}
                  </dt>
                  <dd className="mt-2.5 max-w-md leading-relaxed text-bone/65">
                    {claim.body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
