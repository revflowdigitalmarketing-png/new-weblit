import { BUSINESS, telHref } from "@/config/business";
import { cn } from "@/lib/utils";

/**
 * Name, address and phone, rendered from the single BUSINESS config so it is
 * identical everywhere (footer, contact page, JSON-LD).
 */
export function Nap({
  className,
  tone = "light",
}: {
  className?: string | undefined;
  tone?: "light" | "dark";
}) {
  const link = tone === "dark" ? "hover:text-white" : "hover:text-brand";
  return (
    <address className={cn("not-italic leading-relaxed", className)}>
      <span className="block font-medium">{BUSINESS.name}</span>
      <span className="block">{BUSINESS.address}</span>
      {BUSINESS.phones.map((p) => (
        <a key={p} href={telHref(p)} className={cn("block transition-colors", link)}>
          {p}
        </a>
      ))}
    </address>
  );
}
