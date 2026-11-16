import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
  id?: string;
  heading: string;
  description?: string;
  className?: string | undefined;
  tone?: "light" | "dark";
};

export function SectionIntro({
  id,
  heading,
  description,
  className,
  tone = "light",
}: SectionIntroProps) {
  return (
    <div className={cn("mx-auto max-w-[48rem] text-center", className)}>
      <Reveal>
        <h2 id={id} className="text-display-lg">
          {heading}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={80}>
          <p
            className={cn(
              "mx-auto mt-5 max-w-[36rem] text-base leading-relaxed sm:text-lg",
              tone === "light" ? "text-muted-foreground" : "text-ink/70",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
