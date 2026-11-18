import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Minimal browser frame. Content fills a 16:10 viewport. */
export function BrowserMockup({
  address,
  children,
  className,
}: {
  address: ReactNode;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.25rem] bg-fill p-1.5 sm:rounded-[1.5rem] sm:p-2",
        className,
      )}
    >
      <div className="flex items-center gap-3 px-2.5 pb-2 pt-1 sm:px-3 sm:pb-2.5 sm:pt-1.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-ink/15 sm:size-2.5" />
          <span className="size-2 rounded-full bg-ink/15 sm:size-2.5" />
          <span className="size-2 rounded-full bg-ink/15 sm:size-2.5" />
        </div>
        <div className="flex min-w-0 flex-1 justify-center">
          <div className="truncate rounded-full bg-surface px-3 py-1 text-[11px] text-ink/50 sm:text-xs">
            {address}
          </div>
        </div>
        <div className="w-[38px] sm:w-[46px]" aria-hidden />
      </div>
      <div className="relative aspect-[1366/641] overflow-hidden rounded-[0.875rem] bg-paper sm:rounded-[1rem]">
        {children}
      </div>
    </div>
  );
}

/**
 * Neutral wireframe used until a real screenshot is supplied. Each variant
 * has a different layout so the crossfade between industries reads clearly.
 */
export function WireframeScreen({ variant, label }: { variant: number; label: string }) {
  const block = "rounded-md bg-ink/[0.06]";
  const layouts: ReactNode[] = [
    // 0: listings grid
    <div key="0" className="flex h-full flex-col gap-[4%] p-[5%]">
      <div className={cn(block, "h-[38%]")} />
      <div className="grid flex-1 grid-cols-3 gap-[3%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className={block} />
        ))}
      </div>
    </div>,
    // 1: split hero with booking card
    <div key="1" className="grid h-full grid-cols-[1.3fr_1fr] gap-[4%] p-[5%]">
      <div className="flex flex-col justify-center gap-[6%]">
        <div className={cn(block, "h-[14%] w-[90%]")} />
        <div className={cn(block, "h-[14%] w-[70%]")} />
        <div className={cn(block, "h-[8%] w-[50%]")} />
        <div className="h-[11%] w-[36%] rounded-full bg-brand/25" />
      </div>
      <div className={cn(block, "h-full")} />
    </div>,
    // 2: stacked info rows
    <div key="2" className="flex h-full flex-col gap-[4%] p-[5%]">
      <div className={cn(block, "h-[12%] w-[55%]")} />
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-1 gap-[3%]">
          <div className={cn(block, "w-[22%]")} />
          <div className={cn(block, "flex-1")} />
        </div>
      ))}
    </div>,
    // 3: big statement + case tiles
    <div key="3" className="flex h-full flex-col gap-[5%] p-[5%]">
      <div className={cn(block, "h-[18%] w-[80%]")} />
      <div className="grid flex-1 grid-cols-2 gap-[3%]">
        <div className={cn(block, "row-span-2")} />
        <div className={block} />
        <div className={block} />
      </div>
    </div>,
    // 4: full-bleed project image + badges
    <div key="4" className="flex h-full flex-col">
      <div className="h-[62%] bg-ink/[0.08]" />
      <div className="grid flex-1 grid-cols-4 gap-[3%] p-[5%]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={block} />
        ))}
      </div>
    </div>,
    // 5: inventory cards with action
    <div key="5" className="flex h-full flex-col gap-[4%] p-[5%]">
      <div className="flex items-center justify-between">
        <div className={cn(block, "h-5 w-[30%]")} />
        <div className="h-5 w-[18%] rounded-full bg-brand/25" />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-[3%]">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={block} />
        ))}
      </div>
    </div>,
  ];

  return (
    <div className="placeholder-surface absolute inset-0">
      {layouts[variant % layouts.length]}
      <div className="absolute inset-0 grid place-items-center p-4">
        <span className="placeholder-chip text-center text-[11px] sm:text-xs" data-placeholder="">
          {label}
        </span>
      </div>
    </div>
  );
}
