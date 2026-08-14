import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { BUNDLE } from "@/lib/brand";

/**
 * 03 — The subscription offer, on Seed's model: copy and a filled pill on
 * the left, a large product image over a row of three lifestyle thumbnails
 * on the right.
 */
export function Bundle() {
  return (
    <section
      className="bg-bone-deep py-24 lg:py-32"
      aria-labelledby="bundle-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <Reveal>
            <span className="micro inline-block rounded-full bg-ignite/12 px-3.5 py-2 text-ignite">
              {BUNDLE.badge}
            </span>

            <h2
              id="bundle-heading"
              className="display mt-8 text-[clamp(2.25rem,4.5vw,3.5rem)]"
            >
              {BUNDLE.title}
            </h2>

            <p className="prose-quiet mt-7 max-w-md text-ink-soft">
              {BUNDLE.body}
            </p>

            <Link
              href={BUNDLE.href}
              className="micro mt-10 inline-flex items-center rounded-full bg-brand px-8 py-4 text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-brand-deep"
            >
              {BUNDLE.cta}
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <ArtSlot
              variant="still"
              onDark={false}
              brief="two boxes, straight on, bone ground"
              className="aspect-16/10 w-full rounded-2xl"
            />

            <ul className="mt-5 grid grid-cols-3 gap-5">
              {BUNDLE.thumbs.map((thumb, i) => (
                <li key={thumb}>
                  <ArtSlot
                    variant={i === 1 ? "macro" : "still"}
                    onDark={false}
                    showCaption={false}
                    brief={thumb}
                    className="aspect-4/3 w-full rounded-xl"
                  />
                  <p className="micro mt-3 text-[0.5rem] leading-tight text-ink-soft opacity-70">
                    {thumb}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
