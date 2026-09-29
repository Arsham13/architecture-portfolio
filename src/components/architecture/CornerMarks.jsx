"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";

/**
 * CornerMarks
 * -----------
 * Four L-shaped corner brackets that frame content — like the
 * viewfinder of a technical drawing. Each bracket draws itself.
 *
 * size     = length of each arm in px
 * thickness = px
 * inset     = distance from the parent edge in px (use 0 to touch the edge)
 */
export function CornerMarks({
  size = 18,
  thickness = 1,
  inset = 0,
  className,
  color = "hsl(var(--line-strong))",
  delay = 0,
  once = true,
  active = true,
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });
  const started = active && !prefersReduced ? inView : true;

  // Each corner is built from 2 small spans (the two arms).
  // We draw them by animating scaleX/scaleY with transform-origin
  // at the corner, so the arms "grow" outward from the corner.
  const armStyle = (w, h, origin) => ({
    width: w,
    height: h,
    background: color,
    transformOrigin: origin,
  });

  const corners = [
    // top-right corner (RTL reading start)
    {
      key: "tr",
      pos: { top: inset, right: inset },
      arms: [
        { style: { ...armStyle(size, thickness, "right"), top: 0, right: 0 }, animate: { scaleX: started ? 1 : 0 } },
        { style: { ...armStyle(thickness, size, "top"), top: 0, right: 0 }, animate: { scaleY: started ? 1 : 0 } },
      ],
      delays: [delay, delay + 0.06],
    },
    // bottom-right corner
    {
      key: "br",
      pos: { bottom: inset, right: inset },
      arms: [
        { style: { ...armStyle(size, thickness, "right"), bottom: 0, right: 0 }, animate: { scaleX: started ? 1 : 0 } },
        { style: { ...armStyle(thickness, size, "bottom"), bottom: 0, right: 0 }, animate: { scaleY: started ? 1 : 0 } },
      ],
      delays: [delay + 0.12, delay + 0.18],
    },
    // bottom-left corner
    {
      key: "bl",
      pos: { bottom: inset, left: inset },
      arms: [
        { style: { ...armStyle(size, thickness, "left"), bottom: 0, left: 0 }, animate: { scaleX: started ? 1 : 0 } },
        { style: { ...armStyle(thickness, size, "bottom"), bottom: 0, left: 0 }, animate: { scaleY: started ? 1 : 0 } },
      ],
      delays: [delay + 0.24, delay + 0.3],
    },
    // top-left corner
    {
      key: "tl",
      pos: { top: inset, left: inset },
      arms: [
        { style: { ...armStyle(size, thickness, "left"), top: 0, left: 0 }, animate: { scaleX: started ? 1 : 0 } },
        { style: { ...armStyle(thickness, size, "top"), top: 0, left: 0 }, animate: { scaleY: started ? 1 : 0 } },
      ],
      delays: [delay + 0.36, delay + 0.42],
    },
  ];

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      {corners.map((c) => (
        <span key={c.key} className="absolute" style={c.pos}>
          {c.arms.map((a, i) => (
            <motion.span
              key={i}
              className="absolute"
              style={a.style}
              initial={{ scaleX: 0, scaleY: 0 }}
              animate={a.animate}
              transition={{
                duration: DURATION.fast * 1.2,
                ease: EASE.draw,
                delay: c.delays[i],
              }}
            />
          ))}
        </span>
      ))}
    </span>
  );
}
