"use client";

import { Reveal } from "../motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * TechnicalAnnotation
 * -------------------
 * Small uppercase label with an optional short leader line,
 * like a callout on a technical drawing. Used to annotate parts
 * of a composition.
 *
 *   label — Persian text
 *   side  — which side the leader sits on, relative to label
 *
 * Purely decorative; hidden from screen readers (aria-hidden) when
 * used as a visual flourish, or exposed when it carries meaning.
 */
export function TechnicalAnnotation({
  label,
  side = "before", // before | after
  withLine = true,
  lineLength = 24,
  className,
  labelClassName,
  ariaHidden = true,
  delay = 0,
}) {
  const line = withLine ? (
    <span
      aria-hidden="true"
      className="inline-block align-middle bg-[hsl(var(--line-strong))]"
      style={{ width: lineLength, height: 1 }}
    />
  ) : null;

  return (
    <Reveal
      as="span"
      variant="fade"
      delay={delay}
      className={cn("inline-flex items-center gap-2", className)}
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {side === "before" && line}
      <span className={cn("annotation", labelClassName)}>{label}</span>
      {side === "after" && line}
    </Reveal>
  );
}
