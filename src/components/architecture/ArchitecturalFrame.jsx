"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";

/**
 * ArchitecturalFrame
 * ------------------
 * A bordered frame whose four edges "draw" themselves into place
 * when scrolled into view, then the inner content fades up.
 *
 * The drawing is done with 4 absolutely-positioned hairlines animated
 * by transform: scaleX/scaleY (GPU-friendly, never animates layout).
 *
 * Pass `active={false}` to keep the frame static (no animation).
 *
 * The frame intentionally has NO background by default — it sits on
 * the architectural paper and just draws its own outline.
 */
export function ArchitecturalFrame({
  children,
  className,
  innerClassName,
  delay = 0,
  thickness = 1,
  drawDuration = DURATION.draw,
  once = true,
  active = true,
  // Optional label pinned to one of the frame edges
  label,
  labelPosition = "top-right", // top-right | top-left | bottom-right | bottom-left | top-center
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });

  const started = active && !prefersReduced ? inView : true;

  const sideBase = "absolute bg-[hsl(var(--line-strong))] pointer-events-none";

  // Each side draws with a transform-origin matching its direction.
  // We stagger so they form a continuous "construction" trace.
  const sides = [
    {
      key: "top",
      className: cn(sideBase, "top-0 left-0 h-px w-full"),
      style: {
        height: thickness,
        transformOrigin: "right", // RTL: start from the right (reading start)
      },
      animate: { scaleX: started ? 1 : 0 },
      transition: {
        duration: drawDuration * 0.6,
        ease: EASE.draw,
        delay: delay,
      },
    },
    {
      key: "left",
      className: cn(sideBase, "top-0 left-0 w-px h-full"),
      style: {
        width: thickness,
        transformOrigin: "top",
      },
      animate: { scaleY: started ? 1 : 0 },
      transition: {
        duration: drawDuration * 0.5,
        ease: EASE.draw,
        delay: delay + 0.18,
      },
    },
    {
      key: "bottom",
      className: cn(sideBase, "bottom-0 left-0 h-px w-full"),
      style: {
        height: thickness,
        transformOrigin: "left",
      },
      animate: { scaleX: started ? 1 : 0 },
      transition: {
        duration: drawDuration * 0.6,
        ease: EASE.draw,
        delay: delay + 0.3,
      },
    },
    {
      key: "right",
      className: cn(sideBase, "top-0 right-0 w-px h-full"),
      style: {
        width: thickness,
        transformOrigin: "bottom",
      },
      animate: { scaleY: started ? 1 : 0 },
      transition: {
        duration: drawDuration * 0.5,
        ease: EASE.draw,
        delay: delay + 0.48,
      },
    },
  ];

  const labelPosClass = {
    "top-right": "top-0 right-3 -translate-y-1/2",
    "top-left": "top-0 left-3 -translate-y-1/2",
    "bottom-right": "bottom-0 right-3 translate-y-1/2",
    "bottom-left": "bottom-0 left-3 translate-y-1/2",
    "top-center": "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }[labelPosition];

  return (
    <div ref={ref} className={cn("relative", className)}>
      {sides.map((s) => (
        <motion.span
          key={s.key}
          aria-hidden="true"
          className={s.className}
          style={s.style}
          initial={{ scaleX: 0, scaleY: 0 }}
          animate={s.animate}
          transition={s.transition}
        />
      ))}

      {label && (
        <span
          className={cn("absolute z-10 bg-background px-2  ", labelPosClass)}
        >
          {label}
        </span>
      )}

      <motion.div
        className={cn("relative z-0", innerClassName)}
        initial={prefersReduced ? false : { opacity: 0, y: 10 }}
        animate={
          prefersReduced
            ? undefined
            : { opacity: started ? 1 : 0, y: started ? 0 : 10 }
        }
        transition={{
          duration: DURATION.base,
          ease: EASE.arch,
          delay: delay + 0.35,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
