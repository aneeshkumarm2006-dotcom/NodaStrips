"use client";

import { useId, useState } from "react";
import { WithWordmark } from "@/components/Wordmark";
import { CONTACT, type ContactTopic } from "@/lib/brand";

/**
 * The contact form: a topic, then name, email and message — and, for
 * creators, their handle, under the "This could be you." note carried
 * over from the Noda Community card.
 *
 * Underlined fields, as the sign-in and sign-up forms use, on the white
 * page. Front end only: wire the submit handler to the inbox or help desk
 * before launch.
 */
export function ContactForm({ initialTopic }: { initialTopic: ContactTopic }) {
  const id = useId();
  const [topic, setTopic] = useState<ContactTopic>(initialTopic);
  const [done, setDone] = useState(false);
  const creators = topic === "creators";

  const field =
    "mt-3 w-full border-b border-hairline bg-transparent pb-3 text-[1.0625rem] outline-none transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] placeholder:text-ink-soft/50 focus:border-brand-deep";

  if (done) {
    return (
      <div aria-live="polite" className="rounded-3xl bg-bone-deep p-8 sm:p-10">
        <p className="display text-[2rem] leading-tight">{CONTACT.done}</p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="micro link-quiet mt-6 text-ink-soft"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex flex-col gap-8"
    >
      {/* Topic, as pills */}
      <fieldset>
        <legend className="micro text-ink-soft">What is it about?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {CONTACT.topics.map((t) => (
            <label
              key={t.id}
              className={`micro cursor-pointer rounded-full border-[0.8px] px-4 py-2.5 transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 ${
                topic === t.id
                  ? "border-brand-deep bg-brand-deep text-bone"
                  : "border-ink/25 text-ink hover:border-ink/60"
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={t.id}
                checked={topic === t.id}
                onChange={() => setTopic(t.id)}
                className="sr-only"
              />
              {t.label}
            </label>
          ))}
        </div>
      </fieldset>

      {creators && (
        <div className="rounded-2xl bg-bone-deep px-6 py-5">
          <p className="display text-[1.6rem] italic leading-tight">{CONTACT.creators.title}</p>
          <p className="mt-2 text-[0.9375rem] font-light leading-relaxed text-ink-soft">
            <WithWordmark text={CONTACT.creators.body} />
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="micro text-ink-soft">
            {CONTACT.fields.name}
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="micro text-ink-soft">
            {CONTACT.fields.email}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={field}
          />
        </div>
      </div>

      {creators && (
        <div>
          <label htmlFor={`${id}-handle`} className="micro text-ink-soft">
            {CONTACT.fields.handle}
          </label>
          <input
            id={`${id}-handle`}
            name="handle"
            type="text"
            placeholder="@yourhandle"
            className={field}
          />
        </div>
      )}

      <div>
        <label htmlFor={`${id}-message`} className="micro text-ink-soft">
          {CONTACT.fields.message}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          className={`${field} resize-y`}
        />
      </div>

      <div>
        <button
          type="submit"
          className="micro inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand-deep px-9 text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink"
        >
          {CONTACT.action}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
