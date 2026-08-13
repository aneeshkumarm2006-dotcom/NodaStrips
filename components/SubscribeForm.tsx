"use client";

import { useState } from "react";

/**
 * Subscription sign-up. Front end only — wire the submit handler to the
 * list provider when one is chosen.
 */
export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) return;
        setDone(true);
        setEmail("");
      }}
      className="max-w-md"
    >
      <label htmlFor="subscribe-email" className="micro opacity-60">
        First access
      </label>

      <div className="mt-5 flex items-center gap-4 border-b border-bone/30 pb-3 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] focus-within:border-bone">
        <input
          id="subscribe-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full bg-transparent text-[1.0625rem] outline-none placeholder:text-bone/40"
        />
        <button type="submit" className="micro shrink-0 whitespace-nowrap">
          Sign up →
        </button>
      </div>

      <p
        aria-live="polite"
        className="micro mt-4 h-4 opacity-60 transition-opacity duration-700 [transition-timing-function:var(--ease-quiet)]"
        style={{ opacity: done ? 0.6 : 0 }}
      >
        {done ? "Thank you — you're on the list." : ""}
      </p>
    </form>
  );
}
