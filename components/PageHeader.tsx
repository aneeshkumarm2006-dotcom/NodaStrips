import { Reveal } from "./Reveal";

/**
 * The opening block every interior page shares: a small index label, the
 * title, and an optional standfirst. Keeps the pages feeling like one site
 * rather than a set of one-offs.
 */
export function PageHeader({
  index,
  title,
  intro,
  tone = "bone",
}: {
  index: string;
  title: React.ReactNode;
  intro?: string;
  tone?: "bone" | "brand";
}) {
  const dark = tone === "brand";

  return (
    <section
      className={dark ? "bg-brand-deep text-bone" : "bg-bone text-ink"}
      aria-labelledby="page-title"
    >
      <div className="mx-auto max-w-[1600px] px-6 pb-16 pt-20 lg:px-10 lg:pb-24 lg:pt-28">
        <Reveal>
          <p className={`micro ${dark ? "text-bone/55" : "text-ink-soft"}`}>
            {index}
          </p>
          <h1
            id="page-title"
            className="display mt-7 max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)]"
          >
            {title}
          </h1>
          {intro && (
            <p
              className={`prose-quiet mt-8 max-w-xl ${
                dark ? "text-bone/70" : "text-ink-soft"
              }`}
            >
              {intro}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
