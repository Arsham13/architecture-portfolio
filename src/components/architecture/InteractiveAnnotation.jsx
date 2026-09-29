"use client";

import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, animate } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";

/* ============================================================
 *  InteractiveAnnotation
 * ============================================================
 *
 * A small piece of an architectural drawing — construction lines,
 * an offset frame, dimension guides, intersection markers, and a
 * selected "+" at an intersection. NOT a UI widget.
 *
 * Two interaction modes:
 *
 * DESKTOP (pointer: fine):
 *   - A single rAF-throttled mousemove listener on the element
 *     tracks cursor position relative to the element's center.
 *   - Several individual guide lines react locally:
 *       • the horizontal guide extends toward the cursor
 *       • the vertical guide shifts slightly
 *       • an intersection marker follows the cursor a few px
 *       • a diagonal line rotates a tiny amount
 *       • a "+" marker's opacity reacts to proximity
 *   - All transforms are CSS-var / motion-value driven → no re-renders.
 *   - The element stays ANCHORED. Nothing moves the whole drawing.
 *
 * MOBILE / touch (pointer: coarse) or no-hover:
 *   - An autonomous slow construction loop plays continuously:
 *       guide line draws → another extends → intersection forms →
 *       marker appears → one section emphasizes → settles → repeats
 *   - Uses Motion's animate() on motion values with repeat.
 *
 * prefers-reduced-motion: the element is shown in its final resting
 * state, fully constructed, with no motion.
 */
export function InteractiveAnnotation({ className, delay = 0 }) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef(null);

  // --- Desktop mouse reactivity (motion values → springs for smoothing) ---
  // dx, dy: cursor offset from element center, normalized -1..1
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const dxSmooth = useSpring(dx, { stiffness: 120, damping: 20, mass: 0.4 });
  const dySmooth = useSpring(dy, { stiffness: 120, damping: 20, mass: 0.4 });

  // Derived reactions (local, small):
  // horizontal guide extends toward cursor (scaleX grows slightly)
  const hGuideScale = useTransform(dxSmooth, [-1, 0, 1], [0.85, 1, 1.15]);
  // vertical guide shifts a few px
  const vGuideShift = useTransform(dxSmooth, [-1, 1], [-3, 3]);
  // diagonal line rotates a tiny amount
  const diagRotate = useTransform(dySmooth, [-1, 1], [-3, 3]);
  // intersection marker follows cursor (local, ~6px range)
  const markerX = useTransform(dxSmooth, [-1, 1], [-6, 6]);
  const markerY = useTransform(dySmooth, [-1, 1], [-6, 6]);
  // "+" marker opacity reacts to proximity (brighter when cursor near)
  const proximity = useTransform(
    [dxSmooth, dySmooth],
    ([x, y]) => 1 - Math.min(1, Math.sqrt(x * x + y * y))
  );
  const plusOpacity = useTransform(proximity, [0, 1], [0.3, 1]);

  // --- Determine interaction mode ---
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouch(coarse);
  }, []);

  // --- Desktop mouse listener (rAF-throttled, local to the element) ---
  useEffect(() => {
    if (prefersReduced || isTouch) return;
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    let lastX = 0;
    let lastY = 0;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      // cursor relative to element center, normalized -1..1
      const nx = ((lastX - rect.left) / rect.width) * 2 - 1;
      const ny = ((lastY - rect.top) / rect.height) * 2 - 1;
      // clamp
      dx.set(Math.max(-1.5, Math.min(1.5, nx)));
      dy.set(Math.max(-1.5, Math.min(1.5, ny)));
    };

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // listen on the whole section so the element reacts when the cursor
    // is NEAR it, not only directly over it
    const section = el.closest("section");
    const target = section || el;
    target.addEventListener("mousemove", onMove, { passive: true });

    // reset when cursor leaves
    const onLeave = () => {
      dx.set(0);
      dy.set(0);
    };
    if (section) section.addEventListener("mouseleave", onLeave);

    return () => {
      target.removeEventListener("mousemove", onMove);
      if (section) section.removeEventListener("mouseleave", onLeave);
    };
  }, [prefersReduced, isTouch, dx, dy]);

  // --- Mobile autonomous construction loop ---
  // A single motion value "phase" loops 0→1 continuously. Derived
  // transforms drive the line draws so the drawing visibly constructs
  // itself in a slow loop.
  const phase = useMotionValue(0);
  useEffect(() => {
    if (prefersReduced || !isTouch) {
      if (prefersReduced) phase.set(1);
      return;
    }
    const controls = animate(phase, [0, 1], {
      duration: 9,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      delay: delay + 0.5,
    });
    return () => controls.stop();
  }, [prefersReduced, isTouch, phase, delay]);

  // derived loop states (mobile): lines draw in sequence, settle, repeat
  const mGuideA = useTransform(phase, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const mGuideB = useTransform(phase, [0.15, 0.35, 0.8, 1], [0, 1, 1, 0]);
  const mMarker = useTransform(phase, [0.4, 0.55, 0.8, 1], [0, 1, 1, 0]);
  const mEmphasis = useTransform(phase, [0.6, 0.75, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative", className)}
      aria-hidden="true"
      initial={prefersReduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.base, ease: EASE.arch, delay: delay + 0.8 }}
    >
      <svg
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* the offset frame — a partial architectural rectangle.
            On desktop hover, its definition slightly increases (handled
            via the parent group's opacity below). */}
        {/* top + right edges (the "open" L-shape) */}
        <motion.line
          x1="20" y1="20" x2="140" y2="20"
          stroke="hsl(var(--ink) / 0.4)"
          strokeWidth="1"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: delay + 0.3 }}
        />
        <motion.line
          x1="140" y1="20" x2="140" y2="180"
          stroke="hsl(var(--ink) / 0.4)"
          strokeWidth="1"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: delay + 0.4 }}
        />
        {/* bottom edge — partial (gap) */}
        <motion.line
          x1="40" y1="180" x2="140" y2="180"
          stroke="hsl(var(--ink) / 0.4)"
          strokeWidth="1"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: delay + 0.5 }}
        />

        {/* horizontal guide — extends toward cursor on desktop.
            On desktop: scaleX reacts. On mobile: draws in loop. */}
        {!isTouch && !prefersReduced ? (
          <motion.line
            x1="20" y1="80" x2="120" y2="80"
            stroke="hsl(var(--brick))"
            strokeWidth="0.75"
            style={{ scaleX: hGuideScale, transformOrigin: "20px 80px" }}
          />
        ) : (
          <motion.line
            x1="20" y1="80" x2="120" y2="80"
            stroke="hsl(var(--brick))"
            strokeWidth="0.75"
            initial={false}
            style={{ pathLength: prefersReduced ? 1 : mGuideA, opacity: prefersReduced ? 0.7 : mGuideA }}
          />
        )}

        {/* vertical guide — shifts slightly on desktop */}
        {!isTouch && !prefersReduced ? (
          <motion.line
            x1="80" y1="20" x2="80" y2="130"
            stroke="hsl(var(--line-strong))"
            strokeWidth="0.5"
            style={{ x: vGuideShift }}
          />
        ) : (
          <motion.line
            x1="80" y1="20" x2="80" y2="130"
            stroke="hsl(var(--line-strong))"
            strokeWidth="0.5"
            initial={false}
            style={{ pathLength: prefersReduced ? 1 : mGuideB, opacity: prefersReduced ? 0.6 : mGuideB }}
          />
        )}

        {/* diagonal construction line — tiny rotation on desktop */}
        {!isTouch && !prefersReduced ? (
          <motion.line
            x1="40" y1="140" x2="120" y2="60"
            stroke="hsl(var(--ink) / 0.25)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            style={{ rotate: diagRotate, transformOrigin: "80px 100px" }}
          />
        ) : (
          <motion.line
            x1="40" y1="140" x2="120" y2="60"
            stroke="hsl(var(--ink) / 0.25)"
            strokeWidth="0.5"
            strokeDasharray="3 3"
            initial={false}
            style={{ pathLength: prefersReduced ? 1 : mGuideB, opacity: prefersReduced ? 0.4 : mGuideB }}
          />
        )}

        {/* intersection marker — follows cursor locally on desktop,
            appears in loop on mobile */}
        {!isTouch && !prefersReduced ? (
          <motion.g style={{ x: markerX, y: markerY }}>
            <circle cx="80" cy="100" r="3" stroke="hsl(var(--brick))" strokeWidth="1" fill="hsl(var(--background))" />
            <line x1="74" y1="100" x2="86" y2="100" stroke="hsl(var(--brick))" strokeWidth="0.75" />
            <line x1="80" y1="94" x2="80" y2="106" stroke="hsl(var(--brick))" strokeWidth="0.75" />
          </motion.g>
        ) : (
          <motion.g style={{ opacity: prefersReduced ? 1 : mMarker }}>
            <circle cx="80" cy="100" r="3" stroke="hsl(var(--brick))" strokeWidth="1" fill="hsl(var(--background))" />
            <line x1="74" y1="100" x2="86" y2="100" stroke="hsl(var(--brick))" strokeWidth="0.75" />
            <line x1="80" y1="94" x2="80" y2="106" stroke="hsl(var(--brick))" strokeWidth="0.75" />
          </motion.g>
        )}

        {/* "+" marker at a selected intersection — opacity reacts to
            cursor proximity on desktop, loops on mobile */}
        <motion.g
          style={{ opacity: prefersReduced ? 0.5 : isTouch ? mEmphasis : plusOpacity }}
          transform="translate(140 20)"
        >
          <line x1="-4" y1="0" x2="4" y2="0" stroke="hsl(var(--brick))" strokeWidth="0.75" />
          <line x1="0" y1="-4" x2="0" y2="4" stroke="hsl(var(--brick))" strokeWidth="0.75" />
        </motion.g>

        {/* dimension tick at the bottom */}
        <motion.line
          x1="20" y1="195" x2="140" y2="195"
          stroke="hsl(var(--line-strong) / 0.5)"
          strokeWidth="0.5"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: delay + 0.7 }}
        />
        <motion.line x1="20" y1="192" x2="20" y2="198" stroke="hsl(var(--line-strong) / 0.5)" strokeWidth="0.5"
          initial={prefersReduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: delay + 0.9 }} />
        <motion.line x1="140" y1="192" x2="140" y2="198" stroke="hsl(var(--line-strong) / 0.5)" strokeWidth="0.5"
          initial={prefersReduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: delay + 0.9 }} />

        {/* small annotation label */}
        <motion.text
          x="80" y="160"
          fill="hsl(var(--ink-soft))"
          fontSize="6"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: DURATION.base, delay: delay + 1.0 }}
        >
          DETAIL
        </motion.text>
      </svg>
    </motion.div>
  );
}
