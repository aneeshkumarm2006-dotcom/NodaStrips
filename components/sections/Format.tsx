import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { FORMAT } from "@/lib/brand";

/**
 * 04 — The format, on Seed's model: a full-bleed photographic background
 * with a translucent card floating on it, carrying an annotated diagram of
 * the product and one hero statistic.
 *
 * Callout labels are anchored around the diagram with hairline connectors,
 * the same device Seed uses on the DS-01 capsule.
 */
export function Format() {
  const left = FORMAT.callouts.filter((c) => c.side === "left");
  const right = FORMAT.callouts.filter((c) => c.side === "right");

  return (
    <section className="relative isolate overflow-hidden py-20 lg:py-28">
      {/* Full-bleed photographic ground */}
      <div className="absolute inset-0 -z-20">
        <ArtSlot
          variant="dusk"
          brief="macro of the film, backlit"
          showCaption={false}
          showMark={false}
          className="h-full w-full"
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/25" />

      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal>
          <div className="rounded-3xl border border-bone/15 bg-brand-deep/70 p-8 text-bone backdrop-blur-xl lg:p-14">
            <h2 className="display max-w-2xl text-[clamp(1.9rem,3.6vw,3rem)]">
              {FORMAT.title}
            </h2>

            <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr_1fr] lg:gap-8">
              {/* Left callouts */}
              <ul className="flex flex-col gap-9">
                {left.map((c) => (
                  <li key={c.title} className="lg:text-right">
                    <h3 className="micro">{c.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-bone/65">
                      {c.body}
                    </p>
                    {/* Connector — hairline running toward the diagram */}
                    <span
                      aria-hidden="true"
                      className="mt-4 hidden h-px w-16 bg-bone/25 lg:ml-auto lg:block"
                    />
                  </li>
                ))}
              </ul>

              {/* The diagram */}
              <div className="relative">
                <ArtSlot
                  variant="macro"
                  onDark={false}
                  showCaption={false}
                  brief="cross-section of the strip"
                  className="aspect-square w-full rounded-full"
                />

                {/* Hero statistic */}
                <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-baseline gap-2 whitespace-nowrap rounded-full bg-ink px-7 py-3.5">
                  <span className="text-3xl leading-none">{FORMAT.stat.figure}</span>
                  <span className="micro">{FORMAT.stat.unit}</span>
                  <span className="micro ml-1 text-bone/55">
                    {FORMAT.stat.label}
                  </span>
                </div>
              </div>

              {/* Right callouts */}
              <ul className="flex flex-col gap-9">
                {right.map((c) => (
                  <li key={c.title}>
                    <h3 className="micro">{c.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-bone/65">
                      {c.body}
                    </p>
                    <span
                      aria-hidden="true"
                      className="mt-4 hidden h-px w-16 bg-bone/25 lg:block"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
