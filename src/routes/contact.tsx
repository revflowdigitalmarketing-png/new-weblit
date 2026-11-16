import { createFileRoute } from "@tanstack/react-router";
import { useId, useState, type FormEvent } from "react";
import { ButtonIcon, buttonClasses } from "@/components/site/ButtonLink";
import { Container } from "@/components/site/Container";
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
    <main id="main" className="relative overflow-x-clip pb-16 pt-32 sm:pb-24 sm:pt-40">
      <div
        aria-hidden
        className="glow glow-soft left-1/2 top-0 h-[50vh] w-[80vw] -translate-x-1/2"
      />
      <Container className="relative mx-auto max-w-[760px] text-center">
        <Reveal>
          <h1 className="text-display-lg mx-auto max-w-[18ch]">{contact.heading}</h1>
        </Reveal>
        <Reveal delay={80}>
          <p className="mx-auto mt-5 max-w-[34rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {contact.description}
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12 text-left">
          <ContactForm />
        </Reveal>

        <Reveal delay={160}>
          <section aria-labelledby="next-heading" className="mt-16">
            <h2 id="next-heading" className="font-display text-xl tracking-[-0.035em] sm:text-2xl">
              {contact.nextHeading}
            </h2>
            <ol className="mt-6 grid gap-3 sm:grid-cols-3">
              {contact.next.map((step, i) => (
                <li
                  key={step}
                  className="flex flex-col items-center gap-3 rounded-[1.25rem] bg-fill p-5 text-[0.9375rem] leading-snug"
                >
                  <span
                    aria-hidden
                    className="grid size-7 place-items-center rounded-full bg-brand font-display text-xs text-paper"
                  >
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-6 flex flex-col items-center gap-5 rounded-[1.25rem] bg-fill p-6 text-sm text-ink/80">
            <Nap />
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses("primary", "md", "w-full sm:w-auto sm:min-w-[200px]")}
            >
              <span>WhatsApp</span>
              <ButtonIcon variant="primary" size="md" external />
            </a>
          </div>
        </Reveal>
      </Container>
    </main>
  );
}

const field =
  "w-full rounded-2xl bg-surface px-4 text-base text-ink outline-none ring-brand/40 transition-shadow placeholder:text-ink/35 focus:ring-2";

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
      <div
        role="status"
        className="aurora-card flex min-h-[360px] flex-col justify-end rounded-[2rem] p-8 text-ink sm:p-12"
      >
        <span
          aria-hidden
          className="mb-auto grid size-12 place-items-center rounded-full bg-brand text-paper"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="text-display-md max-w-[20ch] font-display tracking-[-0.035em]">
          {contact.success}
        </p>
      </div>
    );
  }

  const f = contact.fields;
  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-fill p-5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label={f.name}>
          <input
            id={`${id}-name`}
            name="name"
            required
            autoComplete="name"
            className={cn(field, "h-14")}
          />
        </Field>
        <Field id={`${id}-business`} label={f.business}>
          <input
            id={`${id}-business`}
            name="business"
            required
            autoComplete="organization"
            className={cn(field, "h-14")}
          />
        </Field>
        <Field id={`${id}-email`} label={f.email}>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={cn(field, "h-14")}
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
            className={cn(field, "h-14")}
          />
        </Field>
        <Field id={`${id}-website`} label={f.website} className="sm:col-span-2">
          <input
            id={`${id}-website`}
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            className={cn(field, "h-14")}
          />
        </Field>
        <Field id={`${id}-message`} label={f.message} className="sm:col-span-2">
          <textarea
            id={`${id}-message`}
            name="message"
            required
            defaultValue={prefill}
            rows={5}
            placeholder={f.messagePlaceholder}
            className={cn(field, "resize-y py-4 leading-relaxed")}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <button
          type="submit"
          className={buttonClasses("primary", "lg", "w-full sm:w-auto sm:min-w-[240px]")}
        >
          <span>{contact.cta}</span>
          <ButtonIcon />
        </button>
        <p className="text-center text-sm text-muted-foreground">{contact.underButton}</p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  className,
  children,
}: {
  id: string;
  label: string;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="pl-1 text-sm font-medium text-ink/75">
        {label}
      </label>
      {children}
    </div>
  );
}
