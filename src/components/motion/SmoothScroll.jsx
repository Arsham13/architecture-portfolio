"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll
 * ------------
 * Wraps children with a Lenis-powered smooth scroll on desktop.
 * On touch / reduced-motion / mobile we leave native scrolling alone
 * — native scroll is always the source of truth, Lenis only tweaks
 * the feel via a transform-free wheel/scroll listener. This keeps
 * accessibility, inputs and mobile scrolling fully intact.
 */
export function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Don't enable on touch / small screens to protect mobile UX.
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const isSmall = window.innerWidth < 1024;
    if (prefersReduced || isCoarse || isSmall) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      // we keep native scrollbar & anchors intact
      syncTouch: false,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Respect in-page anchor links
    const onClick = (e) => {
      const target = e.target.closest?.('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href").slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80, duration: 1.1 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
