"use client";

import { useSyncExternalStore } from "react";

/**
 * Says whether this device actually has the face installed, by measuring
 * a line set in it against the same line in the fallback — a licensed font
 * that isn't installed would otherwise just quietly fall back.
 */
const SAMPLE = "WELLNESS TAKES A NEW FORM";

function hasFont(name: string) {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) return false;
  return ["monospace", "serif"].some((base) => {
    ctx.font = `48px ${base}`;
    const without = ctx.measureText(SAMPLE).width;
    ctx.font = `48px "${name}", ${base}`;
    return ctx.measureText(SAMPLE).width !== without;
  });
}

const noop = () => () => {};

export function FontCheck({ installed, open }: { installed: string; open: boolean }) {
  const status = useSyncExternalStore(
    noop,
    () => (open ? "open" : hasFont(installed) ? "yes" : "no"),
    () => "checking",
  );

  if (status === "checking") return null;
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
        status === "no" ? "bg-[#fde8e6] text-[#a12a1f]" : "bg-[#e4efeb] text-[#0a4a43]"
      }`}
    >
      {status === "open"
        ? "Google Fonts"
        : status === "yes"
          ? "Installed on this device"
          : "Not installed here — showing a fallback"}
    </span>
  );
}
