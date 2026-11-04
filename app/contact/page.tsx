import type { Metadata } from "next";
import { ArtSlot } from "@/components/ArtSlot";
import { ContactForm } from "@/components/ContactForm";
import { Emphasised } from "@/components/Emphasised";
import { Reveal } from "@/components/Reveal";
import { CONTACT, type ContactTopic } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact — NODA",
  description: CONTACT.intro,
};

/**
 * Contact — where "Contact us" on the Noda Community creator card lands
 * (it arrives with ?topic=creators), and the footer's "Contact" link.
 * Laid out like the sign-in page: the form on the left, a photograph on
 * the right.
 */
export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { topic } = await searchParams;
  const initialTopic: ContactTopic =
    CONTACT.topics.find((t) => t.id === topic)?.id ?? "other";

  return (
    <section id="contact-form" className="scroll-mt-20 bg-bone" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-start gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24 lg:px-10 lg:pb-28 lg:pt-20">
        <Reveal className="max-w-xl">
          <p className="micro text-ink-soft">{CONTACT.eyebrow}</p>
          <h1 id="contact-title" className="display mt-7 text-[clamp(2.5rem,5vw,4rem)]">
            <Emphasised text={CONTACT.title} />
          </h1>
          <p className="prose-quiet mt-6 max-w-md text-ink-soft">{CONTACT.intro}</p>

          <div className="mt-11">
            <ContactForm initialTopic={initialTopic} />
          </div>

          <p className="mt-10 border-t border-hairline pt-6 text-sm leading-relaxed text-ink-soft opacity-70">
            This form is presentational — nothing here is sent or stored yet.
            Connect it to the NODA inbox or help desk before launch.
          </p>
        </Reveal>

        <Reveal delay={120} className="hidden lg:sticky lg:top-24 lg:block">
          <ArtSlot
            variant="still"
            brief="the box, opened"
            showCaption={false}
            sizes="(max-width: 1024px) 0px, 45vw"
            className="aspect-4/5 w-full overflow-hidden rounded-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
