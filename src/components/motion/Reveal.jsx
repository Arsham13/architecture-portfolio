"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { EASE, DURATION } from "./motion";

/**
 * Reveal
 * ------
 * The single scroll-triggered entrance primitive used across the site.
 * Wraps any content and animates it in once it enters the viewport.
 *
 * Variants:
 *   - "fade"     opacity 0→1
 *   - "up"       opacity + translateY(16px)→0
 *   - "down"     opacity + translateY(-16px)→0
 *   - "scale"    opacity + scale(0.96)→1
 *   - "clip"     clip-path wipe (RTL: from right to left)
 *
 * Respects prefers-reduced-motion: renders children statically.
 */
const variantToInitial = {
  fade: { opacity: 0 },
  up: { opacity: 0, y: 16 },
  down: { opacity: 0, y: -16 },
  scale: { opacity: 0, scale: 0.96 },
  clip: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
};

export function Reveal({
  children,
  as = "div",
  variant = "up",
  delay = 0,
  duration,
  once = true,
  margin = "0px 0px -10% 0px",
  className,
  style,
  ...rest
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });

  const MotionTag = motion[as] || motion.div;

  // Reduced motion → render plainly without any transform/opacity.
  if (prefersReduced) {
    const Tag = as;
    return (
      <Tag ref={ref} className={className} style={style} {...rest}>
        {children}
      </Tag>
    );
  }

  const d = duration ?? DURATION.base;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      initial={variantToInitial[variant] || variantToInitial.up}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1, clipPath: "inset(0 0% 0 0)" } : undefined}
      transition={{
        duration: d,
        ease: variant === "clip" ? EASE.draw : EASE.arch,
        delay,
      }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
