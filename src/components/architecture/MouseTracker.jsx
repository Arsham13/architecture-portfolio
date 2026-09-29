"use client";

import { useEffect } from "react";
import { useReducedMotion } from "motion/react";

/**
 * MouseTracker
 * ------------
 * A single, lightweight global mouse-position tracker.
 *
 * - Listens to ONE `mousemove` listener (rAF-throttled)
 * - Writes `--mx` and `--my` CSS custom properties on <html>
 *   (as percentages of viewport width/height)
 * - Any CSS rule can then react to the cursor via `var(--mx)` etc.
 *   without triggering React re-renders
 * - Completely disabled on touch devices and reduced-motion
 * - Renders nothing visible
 *
 * This is the backbone of the "interface is aware of your presence"
 * feeling — architectural lines, crosshairs, and parallax all read
 * from these CSS vars.
 */
export function MouseTracker() {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    if (typeof window === "undefined") return;

    // Skip on touch / coarse-pointer devices — protect mobile UX
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    let ticking = false;
    let lastX = 0;
    let lastY = 0;

    const update = () => {
      ticking = false;
      const root = document.documentElement;
      // Set raw numeric values (0–100) so CSS calc() can use them
      // for parallax transforms without triggering React re-renders.
      const x = (lastX / window.innerWidth) * 100;
      const y = (lastY / window.innerHeight) * 100;
      root.style.setProperty("--mx", x.toFixed(2));
      root.style.setProperty("--my", y.toFixed(2));
    };

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    // Set an initial value so CSS has something to work with
    const root = document.documentElement;
    root.style.setProperty("--mx", "50");
    root.style.setProperty("--my", "50");

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [prefersReduced]);

  return null;
}
