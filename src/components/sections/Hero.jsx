"use client";

import Link from "next/link";
import { motion, useReducedMotion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { EASE, DURATION } from "@/components/motion/motion";
import { PlusMark } from "@/components/architecture/PlusMark";
import { InteractiveAnnotation } from "@/components/architecture/InteractiveAnnotation";
import { cn } from "@/lib/utils";

/**
 * Hero — "True Stroke-to-Fill Architectural Composition"
 * --------------------------------------------------------
 * A rich, layered architectural editorial composition.
 *
 * THE FINAL STATIC STATE IS THE PRIORITY.
 * Disable all animations and the Hero is still a finished poster.
 *
 * LAYERS (all permanent after animation):
 *   01. Subtle square grid (global BlueprintGrid)
 *   02. Large construction axes (horizontal + vertical)
 *   03. Abstract geometric architectural form (offset rectangles + intersecting planes)
 *   04. Large OUTLINED typography (آرشام سراجی) — real HTML text with -webkit-text-stroke
 *   05. Architectural frames (offset drawing-sheet boundary + secondary partial frame)
 *   06. Technical guide lines (dimension lines, ticks)
 *   07. Small annotations (PORTFOLIO/01, location, معمار, axis labels)
 *   08. Selected "+" corner markers (on SOME frames only)
 *   09. Secondary typography (role, tagline, latin name ghost)
 *   10. Subtle accent-colored construction details (brick axis, brick edge)
 *
 * STROKE-TO-FILL TRANSITION (the signature animation):
 *   - The name starts as OUTLINE (text-stroke, transparent interior)
 *   - A FILL layer sits underneath, revealed via background-clip:text
 *   - Motion animates the CSS var --ts-fill-pos from 0% → 100%
 *   - The solid region of the gradient GROWS through the letters
 *     (right→left in RTL), so the user sees the fill TRAVEL through
 *     the outlined letterforms — not a fade.
 *   - After completion: filled name + subtle residual outline remain.
 *
 * Construction sequence:
 *   grid → axes → geometry/frames → stroke outline → details →
 *   fill travels through letters → final settles
 */
export function Hero() {
  const prefersReduced = useReducedMotion();

  // The fill position 0→100, driven by Motion. We animate this motion value
  // after the outline has appeared, so the fill travels through the letters.
  const fillPos = useMotionValue(0);
  // expose it as a CSS variable on the hero root so .ts-fill can read it
  const fillCss = useTransform(fillPos, (v) => `${v}%`);

  useEffect(() => {
    if (prefersReduced) {
      // reduced motion: jump straight to filled
      fillPos.set(100);
      return;
    }
    // start the fill travel after the outline + geometry have appeared
    const controls = animate(fillPos, 100, {
      duration: DURATION.slow + 0.6,
      ease: EASE.draw,
      delay: 1.3,
    });
    return () => controls.stop();
  }, [prefersReduced, fillPos]);

  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const t = setInterval(update, 30_000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.section
      style={{ "--ts-fill-pos": fillCss }}
      aria-labelledby="hero-title"
      className="relative mx-auto w-full max-w-[1400px] px-5 pt-6 lg:px-10 lg:pt-10"
    >
      {/* ===== top annotation strip (permanent) ===== */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, ease: EASE.arch, delay: 0.15 }}
        className="relative flex items-center justify-between border-b border-[hsl(var(--line)/0.45)] pb-3"
      >
        <div className="flex items-center gap-3">
          <span className="h-1 w-1 bg-[hsl(var(--brick))]" />
          <span className="annotation">پورتفولیو معماری</span>
        </div>
        <span className="annotation-mono" dir="ltr">{time || "--:--"}</span>
      </motion.div>

      {/* ===== main composition ===== */}
      <div className="relative min-h-[82vh] py-10 lg:py-14">
        {/* ---------- LAYER 02: construction axes (permanent) ---------- */}
        {/* horizontal axis — crosses the whole composition */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-[hsl(var(--line-strong)/0.3)] -mt-0.5"
          initial={prefersReduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE.draw, delay: 0.2 }}
          style={{ transformOrigin: "right" }}
        />
        {/* vertical axis — brick, through the composition */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute top-10 bottom-10 left-[24%] hidden w-px bg-[hsl(var(--brick)/0.4)] md:block"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE.draw, delay: 0.25 }}
          style={{ transformOrigin: "top" }}
        />

        {/* ---------- LAYER 05: architectural frames (permanent) ---------- */}
        {/* the main offset frame — drawing-sheet boundary */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-6 bottom-6 border border-[hsl(var(--ink)/0.18)] lg:inset-x-3"
          initial={prefersReduced ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: 0.35 }}
          style={{ transformOrigin: "right" }}
        />
        {/* secondary partial frame — upper right offset */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[6%] top-[12%] hidden h-28 w-36 border-l border-t border-[hsl(var(--ink)/0.22)] md:block"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.base, ease: EASE.arch, delay: 0.7 }}
        />
        {/* tertiary partial frame — lower left offset */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[4%] bottom-[14%] hidden h-20 w-24 border-l border-b border-[hsl(var(--ink)/0.18)] lg:block"
          initial={prefersReduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.base, ease: EASE.arch, delay: 0.8 }}
        />

        {/* ---------- LAYER 03: abstract geometric architectural form ---------- */}
        {/* a cluster of offset rectangles + intersecting planes —
            feels like an abstract floor-plan fragment / structural frame.
            Positioned in the lower-right negative space. */}
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 200 160"
          className="pointer-events-none absolute top-[13%] left-[7%] hidden h-32 w-40 lg:block"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.base, ease: EASE.arch, delay: 0.9 }}
        >
          {/* outer rectangle */}
          <rect x="10" y="10" width="120" height="100" stroke="hsl(var(--ink) / 0.3)" strokeWidth="0.75" fill="none" />
          {/* offset inner rectangle */}
          <rect x="30" y="30" width="120" height="100" stroke="hsl(var(--ink) / 0.2)" strokeWidth="0.5" fill="none" />
          {/* intersecting diagonal plane */}
          <line x1="10" y1="10" x2="150" y2="130" stroke="hsl(var(--brick) / 0.4)" strokeWidth="0.5" />
          {/* a small structural dot at the intersection */}
          <circle cx="80" cy="70" r="1.5" fill="hsl(var(--brick))" />
          {/* a dimension tick */}
          <line x1="10" y1="120" x2="130" y2="120" stroke="hsl(var(--line-strong))" strokeWidth="0.5" />
          <line x1="10" y1="116" x2="10" y2="124" stroke="hsl(var(--line-strong))" strokeWidth="0.5" />
          <line x1="130" y1="116" x2="130" y2="124" stroke="hsl(var(--line-strong))" strokeWidth="0.5" />
        </motion.svg>

        {/* ---------- LAYER 06: technical guide lines (permanent) ---------- */}
        {/* left vertical dimension line + ticks */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-2 top-14 bottom-14 hidden w-px bg-[hsl(var(--line-strong)/0.3)] lg:block"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE.draw, delay: 0.4 }}
          style={{ transformOrigin: "top" }}
        />
        <span aria-hidden="true" className="pointer-events-none absolute left-1.5 top-14 hidden h-2 w-px bg-[hsl(var(--line-strong))] lg:block" />
        <span aria-hidden="true" className="pointer-events-none absolute left-1.5 bottom-14 hidden h-2 w-px bg-[hsl(var(--line-strong))] lg:block" />
        {/* dimension annotation (rotated) */}
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute left-[-1.5rem] top-1/2 hidden -translate-y-1/2 -rotate-90 annotation-mono text-[hsl(var(--brick))] lg:block"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: DURATION.base, delay: 1.0 }}
        >
          ارتفاع
        </motion.span>

        {/* ---------- LAYER 08: plus markers on SELECTED frames ---------- */}
        {/* main frame: top-right + bottom-left only (variation) */}
        <PlusMark corner="tr" size={12} delay={1.4} className="!top-6 lg:!top-6" />
        <PlusMark corner="bl" size={12} delay={1.45} className="!bottom-6 lg:!bottom-6" />
        {/* secondary partial frame: one plus only */}
        {/* <PlusMark corner="tr" size={8} delay={1.5} className="!left-[80%] !top-[12%] hidden md:!block" /> */}

        {/* ---------- content + typography layer ---------- */}
        <div className="relative z-10 flex min-h-[82vh] flex-col justify-between px-8">
          {/* --- top: secondary annotations --- */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: DURATION.base, ease: EASE.arch, delay: 0.5 }}
            className="flex items-start justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[hsl(var(--brick))]" />
              <span className="annotation text-[hsl(var(--brick))]">معمار</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="annotation-mono" dir="ltr">PORTFOLIO / 01</span>
              <span className="annotation">{site.location}</span>
            </div>
          </motion.div>

          {/* --- center: the large typographic identity + interactive annotation --- */}
          {/* Typographic exclusion zone: generous padding above + below the name
              so glyphs (ascenders/descenders/diacritics) never get clipped by
              the latin ghost above or the baseline/role below. */}
          <div className="relative py-12 lg:py-16">
            {/* LAYER 09: latin name ghost — moved HIGHER with a clear gap so
                it never touches the Persian glyphs below. */}
            <motion.span
              aria-hidden="true"
              className="text-outline-residual pointer-events-none absolute -top-6 right-0 hidden select-none text-[clamp(2.5rem,8vw,7rem)] font-bold leading-none tracking-tight opacity-40 lg:block"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: DURATION.slow, ease: EASE.arch, delay: 0.6 }}
              dir="ltr"
            >
              {site.nameLatin}
            </motion.span>

            {/* the name + the interactive architectural annotation, side by side.
                RTL: name on the right, annotation to its left. A connecting
                guide line links them without overlapping the text. */}
            <div className="relative flex items-start gap-6 lg:gap-10">
              {/* the name block */}
              <div className="relative flex-1 min-w-0 p-2">
                {/* THE STROKE-TO-FILL NAME — three stacked HTML text layers. */}
                <div className="relative p-4">
                  {/* Layer 1 (bottom): the FILL */}
                  <h1
                    id="hero-title"
                    className="ts-fill display-1 p-3 pointer-events-none absolute inset-0 select-none"
                  >
                    {site.name}
                  </h1>

                  {/* Layer 2 (mid): the RESIDUAL outline */}
                  <span
                    aria-hidden="true"
                    className="ts-stroke-residual p-3 display-1 pointer-events-none absolute inset-0 select-none"
                  >
                    {site.name}
                  </span>

                  {/* Layer 3 (top): the STRONG initial stroke — fades out */}
                  {!prefersReduced && (
                    <motion.span
                      aria-hidden="true"
                      className="ts-stroke-display display-1 p-2 pointer-events-none absolute inset-0 select-none"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: DURATION.slow, ease: EASE.arch, delay: 1.3 }}
                    >
                      {site.name}
                    </motion.span>
                  )}

                  {/* accessibility spacer — keeps layout height */}
                  <span className="display-1 invisible select-none" aria-hidden="true">
                    {site.name}
                  </span>
                </div>
              </div>

              {/* the interactive architectural annotation — beside the name,
                  connected via a guide line. Anchored, never overlaps text. */}
              <div className="relative hidden shrink-0 md:block">
                {/* connecting guide line — links the annotation to the name.
                    A thin horizontal line that points toward the name (right). */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-12 right-full mr-2 hidden h-px w-10 bg-[hsl(var(--brick)/0.4)] lg:block"
                />
                {/* <InteractiveAnnotation
                  delay={1.2}
                  className="h-40 w-32 lg:h-48 lg:w-36"
                /> */}
              </div>
            </div>

            {/* baseline under the name — permanent, with extra top margin
                so it never crowds the glyphs above. */}
            <motion.div
              className="mt-8 h-px w-2/3 bg-[hsl(var(--ink))]"
              initial={prefersReduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DURATION.slow, ease: EASE.draw, delay: 1.2 }}
              style={{ transformOrigin: "right" }}
            />

            {/* role + tagline — with clear breathing space */}
            <motion.p
              className="mt-8 text-xl text-foreground/80 md:text-2xl"
              initial={prefersReduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, ease: EASE.arch, delay: 1.6 }}
            >
              {site.role}
            </motion.p>
            <motion.p
              className="mt-4 max-w-sm text-base leading-relaxed text-foreground/65"
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, ease: EASE.arch, delay: 1.7 }}
            >
              {site.tagline}
            </motion.p>
          </div>

          {/* --- bottom: CTAs + annotation strip --- */}
          <div>
            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, ease: EASE.arch, delay: 1.8 }}
            >
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-3 bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[hsl(var(--brick))] focus-arch overflow-hidden"
              >
                <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-[hsl(var(--paper)/0.15)] transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative">مشاهده پروژه‌ها</span>
                <span aria-hidden="true" className="relative transition-transform duration-300 group-hover:-translate-x-1">←</span>
              </Link>
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 border border-[hsl(var(--line-strong)/0.6)] px-6 py-3 text-sm font-medium text-foreground/80 transition-colors hover:border-[hsl(var(--ink))] hover:text-foreground focus-arch"
              >
                <PlusMark corner="tr" size={8} hover />
                تماس با من
              </Link>
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.base, ease: EASE.arch, delay: 1.9 }}
              className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[hsl(var(--line)/0.4)] pt-3"
            >
              <div className="flex items-center gap-4">
                <span className="annotation-mono text-[hsl(var(--brick))]">۰۱</span>
                <span className="h-3 w-px bg-[hsl(var(--line-strong)/0.5)]" />
                <span className="annotation">معرفی</span>
              </div>
              <span className="flex items-center gap-2 text-xs">
                <span aria-hidden="true" className="inline-block h-1.5 w-1.5 animate-bounce mt-0.5 bg-[hsl(var(--brick))]" />
                برای ادامه پایین بیایید
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
