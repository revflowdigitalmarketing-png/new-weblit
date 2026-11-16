import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** True when a copy string is a [bracketed] placeholder. */
export const isPlaceholder = (text: string) => /^\[.*\]$/.test(text.trim());

/**
 * Renders a clearly marked placeholder (striped amber chip).
 * Every placeholder on the site is listed in docs/todo.md.
 */
export function Placeholder({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <span className={cn("placeholder-chip", className)} data-placeholder="">
      {children}
    </span>
  );
}

/** Renders text normally, or as a Placeholder chip when it is [bracketed]. */
export function CopyText({ text, className }: { text: string; className?: string | undefined }) {
  return isPlaceholder(text) ? (
    <Placeholder className={className}>{text}</Placeholder>
  ) : (
    <span className={className}>{text}</span>
  );
}
