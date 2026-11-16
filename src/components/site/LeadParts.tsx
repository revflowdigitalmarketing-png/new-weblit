import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Icon tile, used at the top of lead-magnet blocks. No stroke. */
export function IconTile({
  icon: Icon,
  className,
}: {
  icon: LucideIcon;
  className?: string | undefined;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-14 place-items-center rounded-[14px] bg-white/[0.08] text-white backdrop-blur-md sm:size-16",
        className,
      )}
    >
      <Icon className="size-6 sm:size-7" strokeWidth={1.5} />
    </span>
  );
}

/** Small label pill above a heading. No stroke. */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-lg bg-white/[0.08] px-3 py-1.5 text-sm text-white sm:text-[0.9375rem]">
      {children}
    </span>
  );
}

/** The blueprint PDF cover (page 1) in a glass frame. No shadow. */
export function BlueprintFrame({ className }: { className?: string | undefined }) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[880px] rounded-[1.25rem] border border-white/25 bg-white/[0.06] p-2 backdrop-blur-md sm:p-2.5",
        className,
      )}
    >
      <picture>
        <source srcSet="/brand/blueprint-cover.webp" type="image/webp" />
        <img
          src="/brand/blueprint-cover.jpg"
          width={1400}
          height={922}
          alt="The Converting Site Blueprint by WEBLIT, cover"
          className="block w-full rounded-xl"
        />
      </picture>
    </div>
  );
}
