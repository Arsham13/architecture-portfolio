"use client";

import { useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { TechnicalLine } from "@/components/architecture/TechnicalLine";
import { PlusMark } from "@/components/architecture/PlusMark";
import { cn } from "@/lib/utils";

/**
 * SectionShell
 * ------------
 * A consistent architectural section wrapper used across all pages.
 *
 * Visual language:
 *   - A thin top guide line draws across (right→left, RTL) when the
 *     section enters the viewport — "the section is being constructed"
 *   - The section number sits in brick accent at the right edge
 *   - The eyebrow + title reveal with a subtle fade-up
 *   - SELECTED sections get a PlusMark at the top-right corner
 *     (pass `withPlusMark` to opt in; default off for variation)
 *
 *   index   e.g. "۰۱" (Persian ordinal)
 *   eyebrow short label
 *   title   section title
 *   withPlusMark — whether this section's frame gets a "+" mark
 *                 (variation is intentional — NOT every section)
 */
export function SectionShell({
  index,
  eyebrow,
  title,
  children,
  align = "start",
  className,
  id,
  withTopLine = true,
  withPlusMark = false,
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "relative mx-auto w-full max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24",
        className
      )}
    >
      {withTopLine && (
        <TechnicalLine
          orientation="h"
          origin="right"
          thickness={1}
          length="100%"
          className="absolute right-0 top-0"
          delay={0}
        />
      )}

      {/* section header */}
      <div
        className={cn(
          "relative mb-12 flex flex-col gap-3 lg:mb-16",
          align === "center" && "items-center text-center"
        )}
      >
        {/* the header's own frame — only on sections with plus mark */}
        {withPlusMark && (
          <span aria-hidden="true" className="pointer-events-none absolute -inset-x-2 -inset-y-3 border border-[hsl(var(--line)/0.25)]" />
        )}
        {withPlusMark && <PlusMark corner="tr" size={10} delay={0.2} />}

        <Reveal variant="fade">
          <div
            className={cn(
              "flex items-center gap-3",
              align === "center" && "justify-center"
            )}
          >
            {index && (
              <span className="annotation-mono text-[hsl(var(--brick))]" dir="ltr">
                {index}
              </span>
            )}
            <span className="h-px w-6 bg-[hsl(var(--line-strong))]" />
            {eyebrow && (
              <span className="annotation">{eyebrow}</span>
            )}
          </div>
        </Reveal>

        {title && (
          <Reveal variant="up" delay={0.06}>
            <h2 className="display-3 max-w-3xl">{title}</h2>
          </Reveal>
        )}
      </div>

      {/* content */}
      <div>{children}</div>
    </section>
  );
}
