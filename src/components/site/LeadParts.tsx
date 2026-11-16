import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Glass icon tile, used at the top of lead-magnet blocks. */
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
        "grid size-14 place-items-center rounded-[14px] border border-white/15 bg-white/[0.07] text-ink backdrop-blur-md sm:size-16",
        className,
      )}
    >
      <Icon className="size-6 sm:size-7" strokeWidth={1.5} />
    </span>
  );
}

/** Small label pill above a heading. */
export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-lg bg-white/[0.08] px-3 py-1.5 text-sm text-ink/85">
      {children}
    </span>
  );
}

/** The blueprint PDF cover (page 1) in a glass frame. No shadow. */
export function BlueprintFrame({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="group mx-auto block w-full max-w-[880px] rounded-[1.25rem] border border-white/25 bg-white/[0.06] p-2 backdrop-blur-md transition-colors duration-500 hover:border-white/40 sm:p-2.5"
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
    </a>
  );
}
