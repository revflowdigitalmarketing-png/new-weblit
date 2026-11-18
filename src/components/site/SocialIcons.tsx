import { BUSINESS, whatsappHref } from "@/config/business";

const icons = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-[18px]"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[17px]">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm7 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.6 4.77 6v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91H10v-11Z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
      <path d="M12 2a10 10 0 0 0-8.64 15.03L2 22l5.1-1.33A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.03.79.81-2.95-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.6.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[15px]">
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z" />
    </svg>
  ),
};

const items = [
  { key: "instagram", label: "Instagram", href: BUSINESS.socials.instagram },
  { key: "linkedin", label: "LinkedIn", href: BUSINESS.socials.linkedin },
  { key: "whatsapp", label: "WhatsApp", href: whatsappHref },
  { key: "x", label: "X", href: BUSINESS.socials.x },
] as const;

export function SocialIcons() {
  return (
    <ul className="flex items-center gap-2">
      {items.map((it) => (
        <li key={it.key}>
          <a
            href={it.href || "#"}
            target={it.href ? "_blank" : undefined}
            rel={it.href ? "noopener noreferrer" : undefined}
            aria-label={it.label}
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-ink/75 transition-colors duration-300 hover:bg-white/[0.12] hover:text-ink"
          >
            {icons[it.key]}
          </a>
        </li>
      ))}
    </ul>
  );
}
