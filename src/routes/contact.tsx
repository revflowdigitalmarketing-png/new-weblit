import { createFileRoute } from "@tanstack/react-router";
import { useId, useState, type FormEvent } from "react";
import { Container } from "@/components/site/Container";
import { Logo } from "@/components/site/Logo";
import { Nap } from "@/components/site/Nap";
import { Reveal } from "@/components/site/Reveal";
import { whatsappHref } from "@/config/business";
import { contact } from "@/content/copy";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

type ContactSearch = { brief?: string; industry?: string };

export const Route = createFileRoute("/contact")({
  // The hero brief card passes what the visitor typed so the form starts prefilled.
  validateSearch: (search: Record<string, unknown>): ContactSearch => {
    const out: ContactSearch = {};
    if (typeof search["brief"] === "string" && search["brief"])
      out.brief = search["brief"].slice(0, 2000);
    if (typeof search["industry"] === "string" && search["industry"])
      out.industry = search["industry"].slice(0, 80);
    return out;
  },
  head: () =>
    pageHead({
      title: "Contact WEBLIT | Tell us about your business",
      description: contact.description,
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main id="main" className="pb-12 pt-24 sm:pb-20 sm:pt-28">
      <Container className="max-w-[1180px]">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <LightPanel />
          </Reveal>
          <Reveal delay={100} className="flex items-center">
            <div className="mx-auto w-full max-w-[460px] py-4 lg:py-10">
              <Logo className="w-[92px]" />
              <p className="mt-6 text-sm leading-relaxed text-ink/60 sm:text-[0.9375rem]">
                {contact.description}
              </p>
              <div className="my-7 h-px bg-ink/10" />
              <ContactForm />
              <div className="mt-10 flex flex-col gap-3 text-[0.8125rem] leading-relaxed text-ink/55 sm:flex-row sm:items-end sm:justify-between">
                <Nap />
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink/80 underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  WhatsApp ↗
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </main>
  );
}

/** Left panel: heading and next steps over rising green and white light bars. */
function LightPanel() {
  const bars = [
    { left: "0%", width: "13%", height: "46%", color: "oklch(0.99 0.01 150)" },
    { left: "12%", width: "13%", height: "58%", color: "oklch(0.9 0.09 152)" },
    { left: "24%", width: "13%", height: "64%", color: "oklch(0.718 0.16 153)" },
    { left: "36%", width: "13%", height: "50%", color: "oklch(0.634 0.147 152.1)" },
    { left: "48%", width: "13%", height: "40%", color: "oklch(0.5 0.13 151)" },
    { left: "60%", width: "12%", height: "28%", color: "oklch(0.38 0.1 148)" },
  ];
  return (
    <div className="relative isolate flex min-h-[440px] flex-col overflow-hidden rounded-[1.75rem] bg-[oklch(0.09_0.006_150)] p-7 sm:min-h-[420px] sm:p-10 lg:h-full lg:min-h-[640px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[38%] sm:h-[55%] lg:h-full"
      >
        {bars.map((b, i) => (
          <div
            key={i}
            className="absolute bottom-0 blur-[6px]"
            style={{
              left: b.left,
              width: b.width,
              height: b.height,
              background: `linear-gradient(to top, ${b.color} 0%, ${b.color} 25%, transparent 100%)`,
            }}
          />
        ))}
      </div>

      <h1 className="max-w-[16ch] text-[clamp(1.5rem,1.2rem+1.4vw,2.35rem)] font-medium leading-[1.12] text-ink">
        {contact.heading}
      </h1>

      <div className="mt-8">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/45">
          {contact.nextHeading}
        </h2>
        <ol className="mt-3 flex flex-col gap-1.5 text-sm text-ink/80">
          {contact.next.map((step, i) => (
            <li key={step} className="flex gap-3">
              <span aria-hidden className="tabular-nums text-ink/35">
                0{i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/**
 * Borderless fields: no stroke, ring or outline, even while typing. Focus is
 * shown by the fill getting lighter instead.
 */
const field =
  "w-full rounded-[10px] bg-white/[0.06] px-4 text-[0.9375rem] text-ink outline-none transition-colors duration-200 placeholder:text-ink/30 hover:bg-white/[0.08] focus:bg-white/[0.11] focus-visible:outline-none";

function ContactForm() {
  const id = useId();
  const [sent, setSent] = useState(false);
  const { brief, industry } = Route.useSearch();
  const prefill = [industry, brief].filter(Boolean).join("\n\n");

  // TODO: no backend yet, so answers aren't sent anywhere (see docs/todo.md).
  // Wire this to an email service or form endpoint.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <p
        role="status"
        className="py-10 text-xl font-medium leading-snug tracking-[-0.03em] text-ink sm:text-2xl"
      >
        {contact.success}
      </p>
    );
  }

  const f = contact.fields;
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field id={`${id}-name`} label={f.name}>
        <input
          id={`${id}-name`}
          name="name"
          required
          autoComplete="name"
          className={cn(field, "h-12")}
        />
      </Field>
      <Field id={`${id}-business`} label={f.business}>
        <input
          id={`${id}-business`}
          name="business"
          required
          autoComplete="organization"
          className={cn(field, "h-12")}
        />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${id}-email`} label={f.email}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={cn(field, "h-12")}
          />
        </Field>
        <Field id={`${id}-phone`} label={f.phone}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={cn(field, "h-12")}
          />
        </Field>
      </div>
      <Field id={`${id}-website`} label={f.website}>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          className={cn(field, "h-12")}
        />
      </Field>
      <Field id={`${id}-message`} label={f.message}>
        <textarea
          id={`${id}-message`}
          name="message"
          required
          defaultValue={prefill}
          rows={4}
          placeholder={f.messagePlaceholder}
          className={cn(field, "resize-none py-3 leading-relaxed")}
        />
      </Field>

      <button
        type="submit"
        className="mt-3 h-12 w-full rounded-[10px] bg-brand text-[0.9375rem] font-medium text-paper outline-none transition-colors duration-200 hover:bg-[oklch(0.78_0.16_153)] focus-visible:bg-[oklch(0.8_0.15_153)] focus-visible:outline-none active:scale-[0.99]"
      >
        {contact.cta}
      </button>
      <p className="text-center text-[0.8125rem] text-ink/50">{contact.underButton}</p>
    </form>
  );
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.8125rem] text-ink/55">
        {label}
      </label>
      {children}
    </div>
  );
}
