import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "inverse" | "ink";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-deep",
  inverse: "bg-white text-brand hover:bg-brand-soft",
  ink: "bg-ink text-white hover:bg-brand",
};

const iconWrap: Record<Variant, string> = {
  primary: "bg-white/12 text-white",
  inverse: "bg-brand text-white",
  ink: "bg-white/12 text-white",
};

const sizes: Record<Size, string> = {
  md: "h-11 pl-5 pr-1.5 text-[0.9375rem]",
  lg: "h-14 pl-7 pr-2 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", className?: string) {
  return cn(
    "group inline-flex select-none items-center justify-between gap-4 rounded-full font-medium tracking-[-0.01em] transition-[background-color,transform] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className,
  );
}

export function ButtonIcon({
  variant = "primary",
  size = "lg",
  external = false,
}: {
  variant?: Variant;
  size?: Size;
  external?: boolean;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <span
      aria-hidden
      className={cn(
        "grid place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 motion-reduce:transform-none",
        size === "lg" ? "size-10" : "size-8",
        iconWrap[variant],
      )}
    >
      <Icon className={size === "lg" ? "size-[18px]" : "size-4"} strokeWidth={1.75} />
    </span>
  );
}

type ButtonLinkProps = {
  to: string;
  id?: string | undefined;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string | undefined;
};

/** Pill CTA. Internal routes use the router; hash links fall back to <a>. */
export function ButtonLink({
  to,
  id,
  children,
  variant = "primary",
  size = "lg",
  className,
}: ButtonLinkProps) {
  const cls = buttonClasses(variant, size, className);
  const inner = (
    <>
      <span>{children}</span>
      <ButtonIcon variant={variant} size={size} />
    </>
  );
  if (to.includes("#")) {
    return (
      <a id={id} href={to} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link id={id} to={to} className={cls}>
      {inner}
    </Link>
  );
}
