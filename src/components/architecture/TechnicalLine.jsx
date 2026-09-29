"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";

/**
 * TechnicalLine
 * -------------
 * A single hairline that "draws" itself.
 *
 * orientation: "h" (horizontal) or "v" (vertical)
 * origin: which end the draw starts from
 *   - h: "right" (RTL reading start) | "left"
 *   - v: "top" | "bottom"
 *
 * thickness in px. color defaults to the architectural line token.
 */
export function TechnicalLine({
  orientation = "h",
  origin,
  thickness = 1,
  length = "100%",
  delay = 0,
  duration = DURATION.draw,
  className,
  color = "hsl(var(--line-strong))",
  once = true,
  active = true,
  style,
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });

  const started = active && !prefersReduced ? inView : true;

  const isH = orientation === "h";
  const realOrigin =
    origin || (isH ? "right" : "top"); // RTL-aware default for h

  const drawTransform = isH
    ? { scaleX: started ? 1 : 0 }
    : { scaleY: started ? 1 : 0 };

  const transformOrigin = realOrigin;

  const sizeStyle = isH
    ? { height: thickness, width: length }
    : { width: thickness, height: length };

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={cn("block pointer-events-none", className)}
      style={{
        ...sizeStyle,
        background: color,
        transformOrigin,
        ...style,
      }}
      initial={{ scaleX: 0, scaleY: 0 }}
      animate={drawTransform}
      transition={{ duration, ease: EASE.draw, delay }}
    />
  );
}
