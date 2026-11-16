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
    <div className={cn("max-w-[56rem]", className)}>
      <Reveal>
        <h2 id={id} className="text-display-lg">
          {heading}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={80}>
          <p
            className={cn(
              "mt-6 max-w-[38rem] text-lg leading-relaxed sm:text-xl",
              tone === "light" ? "text-muted-foreground" : "text-white/70",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
