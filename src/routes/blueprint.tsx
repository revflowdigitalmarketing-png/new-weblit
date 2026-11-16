import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download, Hammer } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { Container } from "@/components/site/Container";
import { BlueprintFrame, IconTile, Pill } from "@/components/site/LeadParts";
import { Reveal } from "@/components/site/Reveal";
import { blueprintPage, leadMagnet } from "@/content/copy";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blueprint")({
  head: () =>
    pageHead({
      title: `${blueprintPage.title} | WEBLIT`,
      description: `${leadMagnet.subheading}. ${blueprintPage.description}`,
      path: "/blueprint",
    }),
  component: BlueprintPage,
});

function BlueprintPage() {
  const t = blueprintPage;
  const skip = t.skip;
  return (
    <main id="main" className="text-white">
      {/* The guide, in place of the reference's video */}
      <section className="pb-16 pt-28 sm:pb-24 sm:pt-36">
        <Container className="text-center">
          <Reveal>
            <h1 className="mx-auto max-w-[24ch] text-[clamp(1.75rem,1.25rem+2vw,3rem)] font-medium leading-[1.12]">
              <span className="font-semibold">{t.titleLead}</span> {t.title}
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="mx-auto mt-4 max-w-[36rem] text-base leading-relaxed sm:text-lg">
              {t.description}
            </p>
          </Reveal>
          <Reveal delay={140} className="mt-10 sm:mt-12">
            <BlueprintFrame />
          </Reveal>
          <Reveal delay={200} className="mt-10">
            <DownloadGate />
          </Reveal>
        </Container>
      </section>

      {/* Skip the work: simple and open, no card */}
      <section aria-labelledby="skip-heading" className="pb-24 pt-8 sm:pb-32">
        <Container className="flex flex-col items-center text-center">
          <Reveal>
            <IconTile icon={Hammer} />
          </Reveal>
          <Reveal delay={60} className="mt-8">
            <Pill>{skip.pill}</Pill>
          </Reveal>
          <Reveal delay={120}>
            <h2 id="skip-heading" className="text-display-lg mx-auto mt-5 max-w-[16ch]">
              {skip.heading}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-6 max-w-[34rem] text-lg leading-relaxed sm:text-xl">
              {skip.intro}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mx-auto mt-8 flex max-w-[34rem] flex-col gap-4 text-left text-lg sm:text-xl">
              {skip.points.map((p) => (
                <li key={p} className="flex gap-3.5">
                  <Check
                    className="mt-1.5 size-5 shrink-0 text-brand"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={240}>
            <p className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed sm:text-xl">
              {skip.closing}
            </p>
          </Reveal>
          <Reveal delay={280} className="mt-9 w-full sm:w-auto">
            <Link
              to="/contact"
              className="group inline-flex h-13 w-full items-center justify-center gap-2.5 rounded-full bg-brand px-8 text-base font-medium text-paper transition-colors duration-300 hover:bg-[oklch(0.78_0.16_153)] sm:w-auto"
            >
              {skip.cta}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
                aria-hidden
              />
            </Link>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}

/** Email step before the guide downloads. No strokes on the field or button. */
function DownloadGate() {
  const id = useId();
  const d = blueprintPage.download;
  const [done, setDone] = useState(false);

  // TODO: no backend yet, so the email isn't saved (see docs/todo.md).
  // Send it to your email list or CRM here, then start the download.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const a = document.createElement("a");
    a.href = leadMagnet.pdf;
    a.download = "WEBLIT-Converting-Site-Blueprint.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="mx-auto max-w-[30rem] text-lg leading-relaxed sm:text-xl">
        {d.done}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-[520px]">
      <p className="text-base sm:text-lg">{d.prompt}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          {d.label}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder={d.placeholder}
          className="h-12 w-full min-w-0 shrink-0 rounded-full sm:w-auto sm:flex-1 bg-white/[0.08] px-5 text-base text-white outline-none transition-colors duration-200 placeholder:text-white/40 hover:bg-white/[0.1] focus:bg-white/[0.13] focus-visible:outline-none"
        />
        <button
          type="submit"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-6 text-[0.9375rem] font-medium text-paper outline-none transition-colors duration-300 hover:bg-white/85 focus-visible:bg-white/85 focus-visible:outline-none"
        >
          <Download className="size-4" strokeWidth={2} aria-hidden />
          {d.cta}
        </button>
      </div>
    </form>
  );
}
