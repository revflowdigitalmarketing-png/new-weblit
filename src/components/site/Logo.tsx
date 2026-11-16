import { BUSINESS } from "@/config/business";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "green" | "white";
  className?: string | undefined;
};

export function Logo({ tone = "white", className }: LogoProps) {
  return (
    <img
      src={BUSINESS.logo[tone]}
      width={BUSINESS.logo.width}
      height={BUSINESS.logo.height}
      alt={BUSINESS.name}
      className={cn("h-auto w-[104px] select-none", className)}
      draggable={false}
    />
  );
}
