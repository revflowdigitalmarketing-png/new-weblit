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

export const Route = createFileRoute("/contact")({
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
    <main id="main" className="pb-16 pt-32 sm:pb-24 sm:pt-40">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-x-20 lg:gap-y-16">
        <div className="lg:col-start-1 lg:row-start-1">
          <Reveal>
            <h1 className="text-display-lg max-w-[16ch]">{contact.heading}</h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {contact.description}
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ContactForm />
        </Reveal>

        <Reveal delay={160} className="lg:col-start-1 lg:row-start-2">
          <aside className="flex flex-col gap-12">
            <div>
              <h2 className="font-display text-2xl tracking-[-0.03em]">{contact.nextHeading}</h2>
              <ol className="mt-6 flex flex-col">
                {contact.next.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-5 border-b border-ink/[0.07] py-4 text-lg leading-snug first:pt-0"
                  >
                    <span className="font-display text-brand" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex flex-col gap-4 rounded-[1.5rem] bg-fill p-6 text-ink/80 sm:flex-row sm:items-end sm:justify-between">
              <Nap />
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("ink", "md", "w-full sm:w-auto")}
              >
                <span>WhatsApp</span>
                <ButtonIcon variant="ink" size="md" external />
              </a>
            </div>
          </aside>
        </Reveal>
      </Container>
    </main>
  );
}

const field =
  "w-full rounded-2xl bg-white px-4 text-base text-ink outline-none ring-brand/40 transition-shadow placeholder:text-ink/35 focus:ring-2";

function ContactForm() {
  const id = useId();
  const [sent, setSent] = useState(false);

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
        className="flex min-h-[420px] flex-col justify-end rounded-[2rem] bg-brand p-8 text-white sm:p-12"
      >
        <span
          aria-hidden
          className="mb-auto grid size-12 place-items-center rounded-full bg-white/12"
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
        <p className="text-display-md max-w-[20ch] font-display tracking-[-0.03em]">
          {contact.success}
        </p>
      </div>
    );
  }

  const f = contact.fields;
  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-fill p-5 sm:p-8 lg:p-10">
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
            rows={5}
            placeholder={f.messagePlaceholder}
            className={cn(field, "resize-y py-4 leading-relaxed")}
          />
        </Field>
      </div>

      <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-5">
        <button
          type="submit"
          className={buttonClasses("primary", "lg", "w-full sm:w-auto sm:min-w-[240px]")}
        >
          <span>{contact.cta}</span>
          <ButtonIcon />
        </button>
        <p className="text-center text-sm text-muted-foreground sm:text-left">
          {contact.underButton}
        </p>
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
