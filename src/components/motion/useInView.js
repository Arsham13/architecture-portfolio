"use client";

import { useEffect, useState } from "react";

/**
 * useInView
 * ---------
 * A robust scroll/viewport-triggered "in view" detector.
 *
 * Why a custom hook instead of motion's `useInView`?
 * Motion's hook can fail to fire its initial IntersectionObserver
 * callback for elements that are ALREADY in the viewport on mount
 * (common in some headless / SSR-hydrated setups). This leaves
 * above-the-fold content stuck at its initial (hidden) state.
 *
 * This hook fixes that by ALSO doing a synchronous bounding-rect
 * check on mount (via requestAnimationFrame) — so elements already
 * in view are revealed immediately, while below-the-fold elements
 * still wait for the IntersectionObserver to fire on scroll.
 *
 * @param ref        element to observe
 * @param options    { once?: bool, margin?: "0px 0px -10% 0px" }
 */
export function useInView(ref, options = {}) {
  const { once = true, margin = "0px 0px -10% 0px" } = options;
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    // Parse the bottom rootMargin (we only support "0px 0px -X% 0px"
    // or "0px 0px -Xpx 0px" for simplicity — enough for our use).
    const parseBottomMargin = () => {
      const parts = margin.split(/\s+/);
      const bottom = parts[2] || "0px";
      if (bottom.endsWith("%")) {
        return (parseFloat(bottom) / 100) * window.innerHeight;
      }
      return parseFloat(bottom) || 0;
    };

    const checkInView = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const bottomMargin = parseBottomMargin();
      // Element is "in view" if its top is above the (viewport - margin)
      // line AND its bottom is below the top of the viewport.
      const visible = rect.top < vh - bottomMargin && rect.bottom > 0;
      if (visible) setInView(true);
    };

    // 1) immediate check after layout (next frame)
    const rafId = requestAnimationFrame(checkInView);

    // 2) IntersectionObserver for scroll-based detection
    let observer;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setInView(true);
              if (once) observer.disconnect();
            } else if (!once) {
              setInView(false);
            }
          }
        },
        { rootMargin: margin }
      );
      observer.observe(el);
    }

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [ref, once, margin]);

  return inView;
}
