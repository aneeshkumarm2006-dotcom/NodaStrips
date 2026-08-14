import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { PLANS, SUBSCRIPTION_FAQS, SUBSCRIPTION_STEPS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Subscription — NODA",
  description:
    "Thirty strips a month, delivered before you run out. Skip, pause or stop from your account.",
};

export default function SubscriptionPage() {
  return (
    <>
      <PageHeader
        index="Subscription"
        title="The ritual, handled."
        intro="A strip only works if it is still being taken in two months. The subscription exists to remove every reason it wouldn't be."
      />

      {/* How it works */}
      <section className="bg-bone pb-24 lg:pb-32" aria-labelledby="sub-how">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <Reveal>
            <h2 id="sub-how" className="sr-only">
              How the subscription works
            </h2>
          </Reveal>
          <ol className="grid grid-cols-1 gap-x-8 gap-y-12 border-t border-hairline pt-14 md:grid-cols-3">
            {SUBSCRIPTION_STEPS.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i * 110}>
                <span className="micro text-ink-soft">{step.n}</span>
                <h3 className="display mt-5 text-[1.5rem] leading-tight">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Plans */}
      <section className="bg-brand-deep py-24 text-bone lg:py-32" aria-labelledby="plans">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="micro text-bone/55">Plans</p>
            <h2 id="plans" className="display mt-7 text-[clamp(2rem,4vw,3rem)]">
              Choose how often it arrives
            </h2>
          </Reveal>

          <ul className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PLANS.map((plan, i) => (
              <Reveal as="li" key={plan.id} delay={i * 110}>
                <article
                  className={`flex h-full flex-col rounded-3xl p-8 ${
                    plan.featured
                      ? "bg-bone text-ink"
                      : "border border-bone/15 bg-bone/5 text-bone"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-[1.6rem]">{plan.name}</h3>
                    {plan.featured && (
                      <span className="micro rounded-full bg-ignite/15 px-3 py-1 text-ignite">
                        Most chosen
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-6 text-[2.5rem] leading-none ${
                      plan.featured ? "text-ink" : "text-bone"
                    }`}
                  >
                    {plan.price}
                  </p>
                  <p
                    className={`micro mt-2 ${
                      plan.featured ? "text-ink-soft" : "text-bone/55"
                    }`}
                  >
                    {plan.cadence}
                  </p>
                  <p
                    className={`mt-5 text-sm ${
                      plan.featured ? "text-ink-soft" : "text-bone/65"
                    }`}
                  >
                    {plan.note}
                  </p>

                  <ul className="mt-8 flex flex-1 flex-col gap-3">
                    {plan.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-3 text-sm">
                        <span
                          aria-hidden="true"
                          className={`mt-2 h-1 w-1 shrink-0 rounded-full ${
                            plan.featured ? "bg-ink-soft" : "bg-bone/50"
                          }`}
                        />
                        <span className={plan.featured ? "text-ink-soft" : "text-bone/70"}>
                          {perk}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/shop"
                    className={`micro mt-10 inline-flex h-12 items-center justify-center rounded-full transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] ${
                      plan.featured
                        ? "bg-brand-deep text-bone hover:bg-ink"
                        : "border border-bone/40 hover:border-bone"
                    }`}
                  >
                    Choose {plan.name.toLowerCase()}
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={350}>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-bone/45">
              Placeholder pricing. Nothing here is final, and none of it is a
              commitment — real plans depend on the commerce platform and the
              cost of goods.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone-deep py-24 lg:py-32" aria-labelledby="sub-faq">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
            <Reveal>
              <h2 id="sub-faq" className="display text-[clamp(2rem,4vw,3rem)]">
                Before you
                <br />
                sign up
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <dl className="border-t border-hairline">
                {SUBSCRIPTION_FAQS.map((faq) => (
                  <div key={faq.q} className="border-b border-hairline py-7">
                    <dt className="display text-[1.35rem] leading-snug">{faq.q}</dt>
                    <dd className="mt-3 max-w-xl leading-relaxed text-ink-soft">
                      {faq.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
