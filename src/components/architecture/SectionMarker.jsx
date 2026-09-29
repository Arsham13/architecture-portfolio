"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";

/**
 * SectionMarker
 * -------------
 * A small circle with a letter inside — like an architectural
 * section callout (e.g. the "A" in "Section A-A").
 *
 * Used purely as a compositional technical accent. Do NOT use it
 * to imply real drawing numbers like "A-01".
 */
export function SectionMarker({
  letter = "A",
  size = 22,
  className,
  delay = 0,
  thickness = 1,
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  const started = !prefersReduced ? inView : true;

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "inline-flex items-center justify-center rounded-full  ",
        className,
      )}
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid hsl(var(--line-strong))`,
      }}
      initial={prefersReduced ? false : { opacity: 0, scale: 0.7 }}
      animate={{ opacity: started ? 1 : 0, scale: started ? 1 : 0.7 }}
      transition={{ duration: DURATION.fast, ease: EASE.arch, delay }}
    >
      {letter}
    </motion.span>
  );
}
