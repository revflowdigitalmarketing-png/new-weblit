import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string | undefined;
  delay?: number;
};

/**
 * Fade-up and unblur whenever content scrolls into view (replays both ways). Content is visible without JS (the hidden state
 * only applies under html.js), and reduced-motion users get no transform.
 */
export function Reveal({ as: Tag = "div", children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      // Toggle both ways so the blur-in replays every time content scrolls
      // back into view, from below or above.
      ([entry]) => {
        if (entry) setVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
