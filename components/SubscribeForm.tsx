"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { SIGNUP } from "@/lib/brand";

/**
 * The sign-up — "Sign up & get a mystery discount", built on Arrae's form
 * (measured off arrae.com): an outlined box at a 24px radius with 24px of
 * padding, holding First Name, Email Address and Phone Number as 48px
 * underlined fields, then a pill Subscribe; the consent line sits under
 * the box in 14px light type, with the privacy link.
 *
 * Set for a dark ground — the footer and the journal's sign-up band.
 * Front end only: wire the submit handler to the list provider when one
 * is chosen.
 */
export function SubscribeForm({ className = "" }: { className?: string }) {
  const id = useId();
  const [done, setDone] = useState(false);

  const field =
    "h-12 w-full border-b-[0.8px] border-bone/60 bg-transparent py-2 text-base text-bone outline-none transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] placeholder:text-bone/85 focus:border-bone";

  return (
    <div className={`flex max-w-[29rem] flex-col gap-4 ${className}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.currentTarget.reset();
          setDone(true);
        }}
        className="flex flex-col gap-2 rounded-[24px] border-[0.8px] border-bone p-6"
      >
        <label htmlFor={`${id}-name`} className="sr-only">
          {SIGNUP.fields.name}
        </label>
        <input
          id={`${id}-name`}
          name="firstName"
          type="text"
          autoComplete="given-name"
          placeholder={SIGNUP.fields.name}
          className={field}
        />

        <label htmlFor={`${id}-email`} className="sr-only">
          {SIGNUP.fields.email}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={SIGNUP.fields.email}
          className={field}
        />

        <label htmlFor={`${id}-phone`} className="sr-only">
          {SIGNUP.fields.phone}
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder={SIGNUP.fields.phone}
          className={field}
        />

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            type="submit"
            className="h-10 rounded-full border-[0.8px] border-bone bg-bone px-5 text-sm font-light uppercase tracking-[0.04em] text-ink transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-transparent hover:text-bone"
          >
            {SIGNUP.action}
          </button>
          <p
            aria-live="polite"
            className="text-sm font-light transition-opacity duration-700 [transition-timing-function:var(--ease-quiet)]"
            style={{ opacity: done ? 0.85 : 0 }}
          >
            {done ? SIGNUP.done : ""}
          </p>
        </div>
      </form>

      <p className="max-w-[22rem] text-sm font-light leading-[1.3] text-bone/85">
        {SIGNUP.consent}{" "}
        <Link href={SIGNUP.privacy.href} className="underline underline-offset-2">
          {SIGNUP.privacy.label}
        </Link>
      </p>
    </div>
  );
}
