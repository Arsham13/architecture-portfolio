"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";

/**
 * PlusMark
 * --------
 * A small architectural "+" registration/construction marker.
 * Placed precisely on a corner or intersection of selected frames.
 *
 * IMPORTANT per the brief: NOT every box gets one. Variation is key.
 *
 * Props:
 *   corner  — which corner of the parent to anchor to.
 *             "tr" (top-right) | "tl" | "br" | "bl"
 *   size    — px, default 10 (small and precise)
 *   color   — "ink" (default) | "brick" (accent)
 *   delay   — reveal delay (s)
 *   hover   — if true, only appears on parent hover
 *   absolute — default true; set false to inline
 */
export function PlusMark({
  corner = "tr",
  size = 10,
  color = "ink",
  delay = 0,
  hover = false,
  className,
}) {
  const prefersReduced = useReducedMotion();
  const colorClass =
    color === "brick"
      ? "bg-[hsl(var(--brick))]"
      : "bg-[hsl(var(--muted-foreground))]";

  const cornerClass = {
    tr: "right-0 top-0 -translate-x-1/2 -translate-y-1/2",
    tl: "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
    br: "right-0 bottom-0 -translate-x-1/2 translate-y-1/2",
    bl: "left-0 bottom-0 translate-x-1/2 translate-y-1/2",
  }[corner];

  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute",
        cornerClass,
        hover && "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        className
      )}
      style={{ width: size, height: size }}
      initial={prefersReduced ? false : { opacity: 0, scale: 0 }}
      animate={{ opacity: hover ? 0 : 1, scale: 1 }}
      transition={{ duration: DURATION.fast, ease: EASE.arch, delay }}
    >
      {/* horizontal arm */}
      <span
        className={cn("absolute top-1/2 left-0 h-px w-full -translate-y-1/2", colorClass)}
      />
      {/* vertical arm */}
      <span
        className={cn("absolute left-1/2 top-0 h-full w-px -translate-x-1/2", colorClass)}
      />
    </motion.span>
  );
}
