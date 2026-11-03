"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { COMMUNITY, type CommunityPost } from "@/lib/brand";

/**
 * Noda Community — replaces the "Stories from scientists…" mosaic, on the
 * structure of Arrae's "Trusted by Millions of Women Worldwide" (measured
 * off arrae.com): the heading set in the serif with its second half in the
 * italic, then a row of four 4:5 media cards at an 8px radius, 16px apart,
 * each with a quote in the serif and an uppercase handle beneath it.
 *
 * Per the client's Nov 2026 notes:
 *   · the fourth card is "this could be you" — a call-out for creators to
 *     get in touch, with the copy from the client's concept. The concept's
 *     look (gift icon, glossy beige) read as cheap, so this one is drawn
 *     as an empty camera frame waiting to be filled: viewfinder corners, a
 *     record light, the line in the italic;
 *   · an arrow beside the fourth card scrolls on to more posts;
 *   · clicking a post enlarges it, as Mondays' videos do — but on a light,
 *     frosted veil instead of their black screen, so it reads as the page
 *     opening up rather than a separate dark room.
 */
export function Community() {
  const { posts, ctaAt } = COMMUNITY;
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [open, setOpen] = useState<number | null>(null);

  const measure = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  // The posts with the creator card dropped in at its slot
  const row: ({ kind: "post"; post: CommunityPost; index: number } | { kind: "cta" })[] =
    posts.map((post, index) => ({ kind: "post" as const, post, index }));
  row.splice(Math.min(ctaAt, row.length), 0, { kind: "cta" });

  return (
    <section className="bg-bone py-20 lg:py-28" aria-labelledby="community-heading">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <h2
            id="community-heading"
            className="display text-[clamp(2.5rem,4vw,3.5rem)] text-ink"
          >
            {COMMUNITY.title.plain} <em>{COMMUNITY.title.italic}</em>
          </h2>
          <p className="micro text-ink-soft/70">{COMMUNITY.note}</p>
        </Reveal>

        <Reveal delay={120} className="relative mt-10 @container lg:mt-12">
          <ul
            ref={rail}
            onScroll={measure}
            // Bleeds to the screen edge on phones, so the next card peeks in
            className="-mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-pl-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {row.map((item) => (
              <li
                key={item.kind === "post" ? item.post.id : "cta"}
                className="w-[72vw] shrink-0 snap-start sm:w-[calc((100cqw_-_1rem)/2)] lg:w-[calc((100cqw_-_3rem)/4)]"
              >
                {item.kind === "post" ? (
                  <PostCard post={item.post} onOpen={() => setOpen(item.index)} />
                ) : (
                  <CreatorCard />
                )}
              </li>
            ))}
          </ul>

          {/* The arrows sit on the centre line of the media, over the
              edges of the row — "an arrow next to the fourth one". */}
          <RailArrow
            dir={-1}
            hidden={edges.start}
            onClick={() => nudge(-1)}
            className="left-0 -translate-x-1/2"
          />
          <RailArrow
            dir={1}
            hidden={edges.end}
            onClick={() => nudge(1)}
            className="right-0 translate-x-1/2"
          />
        </Reveal>
      </div>

      {open !== null && (
        <Lightbox
          posts={posts}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </section>
  );
}

/* ------------------------------------------------------------- the card */

function PostCard({ post, onOpen }: { post: CommunityPost; onOpen: () => void }) {
  return (
    <figure className="m-0">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Enlarge: ${post.quote}`}
        className="group relative block aspect-[4/5] w-full overflow-hidden rounded-[8px] bg-tan text-left"
      >
        <PostMedia post={post} sizes="(max-width: 640px) 72vw, (max-width: 1024px) 45vw, 360px" />

        {/* Arrae's control: a 40px frosted circle, bottom left */}
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/65 text-ink backdrop-blur-sm transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:scale-110"
        >
          <PlayIcon />
        </span>

        {/* Enlarge hint, top right, on hover */}
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/65 text-ink opacity-0 backdrop-blur-sm transition-opacity duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <ExpandIcon />
        </span>
      </button>

      <figcaption className="mt-6">
        <blockquote className="display text-[1.5rem] leading-[1.2] tracking-[-0.03em] text-ink-soft">
          “{post.quote}”
        </blockquote>
        <cite className="micro mt-5 block not-italic text-ink-soft">{post.handle}</cite>
      </figcaption>
    </figure>
  );
}

function PostMedia({
  post,
  sizes,
  muted = true,
}: {
  post: CommunityPost;
  sizes: string;
  muted?: boolean;
}) {
  if (post.video) {
    return (
      <video
        src={post.video}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }
  return (
    <ArtSlot
      variant="still"
      brief={post.brief}
      showCaption={false}
      sizes={sizes}
      className="absolute inset-0 h-full w-full"
    />
  );
}

/* ---------------------------------------------- "this could be you" */

function CreatorCard() {
  const { cta } = COMMUNITY;
  return (
    <figure className="m-0">
      <div className="relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden rounded-[8px] bg-bone-deep px-8 text-center">
        {/* Viewfinder corners — an empty frame, waiting for a creator */}
        {(["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "bottom-4 left-4 border-b border-l", "bottom-4 right-4 border-b border-r"] as const).map(
          (pos) => (
            <span
              key={pos}
              aria-hidden="true"
              className={`absolute h-6 w-6 border-ink/35 ${pos}`}
            />
          ),
        )}

        {/* The record light */}
        <span
          aria-hidden="true"
          className="absolute left-9 top-9 flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.12em] text-ink/55"
        >
          <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-ignite" />
          REC
        </span>
        <span
          aria-hidden="true"
          className="absolute right-9 top-9 text-[0.6875rem] font-medium tabular-nums tracking-[0.12em] text-ink/55"
        >
          00:00
        </span>

        <h3 className="display text-[clamp(2.25rem,3.2vw,2.75rem)] italic leading-[0.95] text-ink">
          {cta.title}
        </h3>
        <p className="mt-4 max-w-[17rem] text-[0.9375rem] font-light leading-relaxed text-ink-soft">
          {cta.body}
        </p>
        <Link
          href={cta.href}
          className="micro group mt-7 inline-flex items-center gap-2 rounded-full border-[0.8px] border-ink/70 px-6 py-3 text-ink transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink hover:text-bone"
        >
          {cta.action}
          <span
            aria-hidden="true"
            className="transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>

    </figure>
  );
}

/* ----------------------------------------------------------- the arrows */

function RailArrow({
  dir,
  hidden,
  onClick,
  className,
}: {
  dir: 1 | -1;
  hidden: boolean;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "More posts" : "Previous posts"}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden}
      // On the media's centre line: half of a 4:5 card's height. The card
      // is a quarter of the row (less the gaps) on desktop, a half on tablet.
      className={[
        "absolute z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink text-bone shadow-[0_10px_30px_-12px_rgba(22,19,15,0.6)] transition-[opacity,scale] duration-500 [transition-timing-function:var(--ease-quiet)] hover:scale-105 sm:flex",
        "top-[calc((100cqw_-_1rem)*0.3125)] lg:top-[calc((100cqw_-_3rem)*0.15625)]",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
        className,
      ].join(" ")}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
        <path
          d={dir === 1 ? "M3 8h10M9 4l4 4-4 4" : "M13 8H3M7 4 3 8l4 4"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* --------------------------------------------------------- the lightbox */

function Lightbox({
  posts,
  index,
  onIndex,
  onClose,
}: {
  posts: readonly CommunityPost[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);
  const [muted, setMuted] = useState(true);
  const touchX = useRef<number | null>(null);

  const count = posts.length;
  const go = useCallback(
    (dir: 1 | -1) => onIndex((index + dir + count) % count),
    [index, count, onIndex],
  );

  // Open: lock the page, focus inside; close: hand focus back
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const raf = requestAnimationFrame(() => setShown(true));
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      opener?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialog.current) {
        // Keep focus inside the dialog
        const nodes = dialog.current.querySelectorAll<HTMLElement>(
          'button:not([tabindex="-1"]), a[href]',
        );
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  const post = posts[index];
  const prev = posts[(index - 1 + count) % count];
  const next = posts[(index + 1) % count];

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`Noda Community, post ${index + 1} of ${count}`}
      className={[
        "fixed inset-0 z-[80] flex flex-col",
        "bg-white/70 backdrop-blur-2xl backdrop-saturate-150",
        "transition-opacity duration-500 [transition-timing-function:var(--ease-quiet)]",
        shown ? "opacity-100" : "opacity-0",
      ].join(" ")}
      onClick={(e) => {
        // A click on the veil itself — not on the media — closes it
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {/* Top bar */}
      <div className="pointer-events-none flex items-center justify-between px-5 pt-5 lg:px-10 lg:pt-7">
        <p className="micro text-ink-soft">
          {COMMUNITY.title.plain} {COMMUNITY.title.italic}
          <span className="ml-3 tabular-nums text-ink-soft/60">
            {index + 1} / {count}
          </span>
        </p>
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border-[0.8px] border-ink/25 bg-white/60 text-ink transition-colors duration-300 hover:bg-white"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>

      {/* Stage */}
      <div
        className="flex flex-1 items-center justify-center gap-4 px-4 pb-6 lg:gap-8"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Previous, as a dimmed preview */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => go(-1)}
          className="relative hidden aspect-[9/16] h-[min(52svh,500px)] shrink-0 overflow-hidden rounded-[12px] opacity-45 transition-opacity duration-500 hover:opacity-70 lg:block"
        >
          <PostMedia post={prev} sizes="280px" />
        </button>

        <StageArrow dir={-1} onClick={() => go(-1)} />

        <figure
          key={post.id}
          className={[
            "m-0 flex flex-col items-center",
            "transition-[opacity,scale] duration-500 [transition-timing-function:var(--ease-quiet)]",
            shown ? "scale-100 opacity-100" : "scale-[0.97] opacity-0",
          ].join(" ")}
        >
          <div className="relative aspect-[9/16] h-[min(66svh,680px)] max-w-[86vw] overflow-hidden rounded-[14px] bg-tan shadow-[0_40px_90px_-40px_rgba(22,19,15,0.55)]">
            <PostMedia post={post} sizes="(max-width: 640px) 86vw, 400px" muted={muted} />

            {post.video ? (
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Turn sound on" : "Turn sound off"}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/65 text-ink backdrop-blur-sm"
              >
                <SoundIcon muted={muted} />
              </button>
            ) : (
              <span className="micro absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/55 to-transparent px-5 pb-4 pt-10 text-bone/90">
                Creator video to follow
              </span>
            )}
          </div>

          <figcaption className="mt-5 w-[min(calc(min(66svh,680px)*0.5625),86vw)] text-center">
            <blockquote className="display text-[1.35rem] leading-[1.2] tracking-[-0.03em] text-ink">
              “{post.quote}”
            </blockquote>
            <cite className="micro mt-3 block not-italic text-ink-soft">{post.handle}</cite>
          </figcaption>
        </figure>

        <StageArrow dir={1} onClick={() => go(1)} />

        {/* Next, as a dimmed preview */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => go(1)}
          className="relative hidden aspect-[9/16] h-[min(52svh,500px)] shrink-0 overflow-hidden rounded-[12px] opacity-45 transition-opacity duration-500 hover:opacity-70 lg:block"
        >
          <PostMedia post={next} sizes="280px" />
        </button>
      </div>
    </div>,
    document.body,
  );
}

function StageArrow({ dir, onClick }: { dir: 1 | -1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Next post" : "Previous post"}
      className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border-[0.8px] border-ink/20 bg-white/80 text-ink shadow-[0_8px_24px_-12px_rgba(22,19,15,0.35)] transition-colors duration-300 hover:bg-white sm:flex"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
        <path
          d={dir === 1 ? "M6 3.5 10.5 8 6 12.5" : "M10 3.5 5.5 8 10 12.5"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/* ---------------------------------------------------------------- icons */

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" className="ml-0.5 h-3.5 w-3.5" aria-hidden="true">
      <path d="M4.5 2.8v10.4L13 8 4.5 2.8Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M9.5 2.5h4v4M6.5 13.5h-4v-4M13.5 2.5 9 7M2.5 13.5 7 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M2.5 6h2.2L8 3.2v9.6L4.7 10H2.5V6Z" />
      {muted ? (
        <path d="m10.5 6 3 4M13.5 6l-3 4" strokeLinecap="round" />
      ) : (
        <path d="M10.6 5.6a3.4 3.4 0 0 1 0 4.8M12.3 4a5.6 5.6 0 0 1 0 8" strokeLinecap="round" />
      )}
    </svg>
  );
}
