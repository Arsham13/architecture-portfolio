"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";

/**
 * Crosshair
 * ---------
 * A small axis marker (two crossed hairlines + a center dot).
 * Used at key intersections of the layout to read as a technical
 * drawing reference. Animates a tiny scale-in when visible.
 *
 * size = px square.  thickness in px.
 */
export function Crosshair({
  size = 14,
  thickness = 1,
  color = "hsl(var(--line-strong))",
  className,
  delay = 0,
  withDot = true,
  dotSize = 2,
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const started = !prefersReduced ? inView : true;

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={cn("inline-block relative", className)}
      style={{ width: size, height: size }}
      initial={prefersReduced ? false : { opacity: 0, scale: 0.6 }}
      animate={{ opacity: started ? 1 : 0, scale: started ? 1 : 0.6 }}
      transition={{ duration: DURATION.fast, ease: EASE.arch, delay }}
    >
      {/* horizontal */}
      <span
        className="absolute top-1/2 left-0 -translate-y-1/2"
        style={{ width: size, height: thickness, background: color }}
      />
      {/* vertical */}
      <span
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ width: thickness, height: size, background: color }}
      />
      {withDot && (
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width: dotSize, height: dotSize, background: color }}
        />
      )}
    </motion.span>
  );
}
