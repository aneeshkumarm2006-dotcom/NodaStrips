import Link from "next/link";
import { ANNOUNCEMENT } from "@/lib/brand";

/**
 * The lime bar at the very top.
 *
 * Deliberately outside the header and in normal flow, so it scrolls away
 * and only the header follows — the behaviour on the reference site.
 */
export function Announcement() {
  return (
    <div className="bg-volt text-ink">
      <div className="mx-auto flex min-h-9 max-w-[1600px] items-center justify-center px-6 py-2">
        <Link href="/shop" className="micro link-quiet text-center opacity-90">
          {ANNOUNCEMENT}
        </Link>
      </div>
    </div>
  );
}
