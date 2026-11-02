import Image from "next/image";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { FLASH_RELEASE as F } from "@/lib/brand";

/**
 * 03 — FlashRelease® technology. A replica of Seed's ViaCap® section,
 * built to measurements taken off seed.com:
 *
 *   SECTION    full-bleed photographic ground, 80px / 32px padding
 *   CARD       32px radius, rgba(87,94,85,0.35) veil, 37.5px backdrop blur,
 *              80px padding, two columns 32px apart
 *   LEFT       507px. Mono label 12px/300 caps with a dot; headline
 *              40/44 at weight 350, −0.4px; a 380px note box — 0.8px
 *              white/25 hairline, 16px radius, 32px padding — holding an
 *              18px line and a 32px light stat; a 12px footnote. 24px
 *              between each.
 *   RIGHT      677px. The capsule animation, 484px, centred; "Outer" top
 *              left and "Inner" lower right, each a 12px/500 caps heading
 *              and 12px copy in a 200px column, joined to the capsule by a
 *              70px dashed rule.
 *
 * Seed's capsule animation stands in as a placeholder, per the client
 * ("use their capsule illustration for right now"). It is Seed's artwork
 * and must be replaced with a strip animation before launch.
 */
export function FlashRelease() {
  return (
    <section
      className="relative isolate flex min-h-[720px] items-center overflow-hidden px-4 py-16 sm:px-8 lg:py-20"
      aria-labelledby="flash-heading"
    >
      <div className="absolute inset-0 -z-10">
        <ArtSlot
          variant="still"
          brief="flashrelease — floating strips"
          showCaption={false}
          sizes="100vw"
          className="h-full w-full"
        />
        {/* Seed's ground is a deep green render; ours is a pale one. A sage
            shade brings it down to the same depth so the cream type keeps
            Seed's contrast through the card. */}
        <div aria-hidden="true" className="absolute inset-0 bg-[rgba(52,62,48,0.38)]" />
      </div>

      <Reveal className="mx-auto w-full max-w-[1376px]">
        <div className="flex flex-col gap-8 rounded-[32px] bg-[rgba(87,94,85,0.35)] p-7 text-[rgb(252,252,247)] backdrop-blur-[37.5px] sm:p-12 lg:min-h-[560px] lg:flex-row lg:items-start lg:p-20">
          {/* ------------------------------------------------ left */}
          <div className="lg:w-[507px] lg:shrink-0">
            <p className="flex items-center gap-2 font-mono text-xs font-light uppercase leading-[18px]">
              <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-current" />
              {F.label}
            </p>

            <h2
              id="flash-heading"
              className="mt-6 text-[clamp(1.75rem,2.8vw,2.5rem)] font-[350] leading-[1.1] tracking-[-0.01em]"
            >
              {F.title}
            </h2>

            {/* The note box */}
            <div className="mt-6 flex w-full max-w-[380px] items-center justify-between gap-6 rounded-2xl border-[0.8px] border-white/25 p-8">
              <p className="max-w-[12rem] text-lg font-[350] leading-[1.3] tracking-[-0.01em]">
                {F.stat.label}
                <sup className="ml-0.5 text-[0.6em]">°</sup>
              </p>
              <p className="flex shrink-0 items-center gap-1.5 text-[2rem] font-light leading-[48px]">
                <span
                  aria-hidden="true"
                  className="flex h-[1.95rem] w-[1.95rem] items-center justify-center rounded-full bg-[rgb(252,252,247)] text-[rgb(70,76,68)]"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4">
                    <path
                      d="M8 13V3.4M3.8 7.4 8 3.2l4.2 4.2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>
                  {F.stat.figure}
                  {F.stat.unit}
                </span>
                <span className="sr-only">faster</span>
              </p>
            </div>

            <p className="mt-6 text-xs font-[350] leading-[1.4] tracking-[-0.003em]">
              {F.footnote}
            </p>
          </div>

          {/* ----------------------------------------------- right */}
          <div className="relative w-full lg:h-[400px] lg:flex-1">
            {/* The capsule — Seed's, as a placeholder */}
            <div className="relative mx-auto aspect-square w-full max-w-[22rem] lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[min(484px,100%)] lg:max-w-none lg:-translate-x-1/2 lg:-translate-y-1/2">
              <Image
                src="/photos/placeholder-viacap.gif"
                alt="Placeholder animation: a capsule opening to release its contents. To be replaced with a NODA strip animation."
                fill
                unoptimized
                sizes="484px"
                className="object-contain"
              />
            </div>

            {/* Outer — top left, rule running in toward the capsule */}
            <Callout
              title={F.outer.title}
              body={F.outer.body}
              className="mt-8 lg:absolute lg:left-0 lg:top-[17px] lg:mt-0"
              rule="after"
            />

            {/* Inner — lower right, rule running in from the capsule */}
            <Callout
              title={F.inner.title}
              body={F.inner.body}
              className="mt-8 lg:absolute lg:right-0 lg:top-[163px] lg:mt-0"
              rule="before"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Callout({
  title,
  body,
  className,
  rule,
}: {
  title: string;
  body: string;
  className: string;
  rule: "before" | "after";
}) {
  const line = (
    <span
      aria-hidden="true"
      className="hidden w-[70px] shrink-0 border-t-[0.8px] border-dashed border-[rgb(252,252,247)] lg:block"
    />
  );

  return (
    <div className={`flex items-center ${className}`}>
      {rule === "before" && line}
      <div className={`lg:w-[200px] ${rule === "before" ? "lg:pl-4" : ""}`}>
        <h3 className="text-xs font-medium uppercase leading-[1.1]">{title}</h3>
        <p className="mt-1 text-xs font-[350] leading-[1.4] tracking-[-0.003em]">{body}</p>
      </div>
      {rule === "after" && line}
    </div>
  );
}
