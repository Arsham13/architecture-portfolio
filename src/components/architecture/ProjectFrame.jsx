"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";
import { PlusMark } from "./PlusMark";

/**
 * ProjectFrame
 * ------------
 * The architectural presentation card for a single project.
 *
 * Visual language (per the brief — NOT generic cards):
 *   - An architectural border around the image
 *   - SELECTED cards get a PlusMark at one corner (variation)
 *   - Hover: a border segment constructs itself, a brick accent line
 *     draws across the bottom, a corner marker appears, a small
 *     technical annotation reveals
 *   - The image has a subtle internal parallax ONLY (no container
 *     movement around the page)
 *
 *   variant: "feature" (large) | "compact" (grid card)
 *   withPlusMark: whether THIS card gets a "+" corner mark.
 *                 Pass explicitly for variation (e.g. every 3rd card).
 */
export function ProjectFrame({
  project,
  variant = "compact",
  priority = false,
  index = 0,
  withPlusMark = false,
  className,
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const started = !prefersReduced ? inView : true;

  const delay = (index % 3) * 0.08;

  const meta = [
    project.category,
    project.year,
    project.area,
    project.location,
  ].filter(Boolean);

  return (
    <Link
      href={`/projects/${project.slug}`}
      ref={ref}
      className={cn(
        "group relative block focus-arch",
        variant === "feature" && "md:grid md:grid-cols-12 md:gap-8",
        className
      )}
      aria-label={`پروژه: ${project.title}`}
    >
      {/* ---- image / frame ---- */}
      <div
        className={cn(
          "relative overflow-hidden border border-[hsl(var(--line-strong)/0.3)]",
          variant === "feature"
            ? "md:col-span-8 aspect-[16/10]"
            : "aspect-[4/3]"
        )}
      >
        {/* the image — internal parallax only (no page movement) */}
        <motion.div
          className="absolute inset-0"
          initial={prefersReduced ? false : { scale: 1.08 }}
          animate={{ scale: started ? 1 : 1.08 }}
          transition={{ duration: DURATION.slow + 0.3, ease: EASE.settle, delay }}
        >
          <div className="relative h-full w-full">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={priority}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </div>
        </motion.div>

        {/* paper mask overlay — wipes away right → left (RTL) to reveal */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-background"
          style={{ transformOrigin: "left" }}
          initial={prefersReduced ? false : { scaleX: 1 }}
          animate={{ scaleX: started ? 0 : 1 }}
          transition={{ duration: DURATION.slow, ease: EASE.draw, delay }}
        />

        {/* a brick accent line that draws across the bottom on hover */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-px w-0 bg-[hsl(var(--brick))] transition-all duration-500 ease-out group-hover:w-full"
        />

        {/* a border segment that constructs on hover — top edge */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 right-0 h-px w-0 bg-[hsl(var(--ink))] transition-all duration-500 ease-out group-hover:w-full"
        />

        {/* corner markers that appear on hover — top-right + bottom-left */}
        <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r border-t border-[hsl(var(--brick))] opacity-0 transition-all duration-300 group-hover:opacity-100" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-[hsl(var(--brick))] opacity-0 transition-all duration-300 group-hover:opacity-100" />

        {/* PlusMark on SELECTED cards — only top-left corner */}
        {withPlusMark && <PlusMark corner="tl" size={10} color="ink" delay={delay + 0.1} />}

        {/* category chip on top-right — shifts to brick on hover */}
        <span className="absolute right-3 top-3 z-10 bg-background/85 px-2 py-1 annotation-mono backdrop-blur-[1px] transition-colors duration-300 group-hover:text-[hsl(var(--brick))]">
          {project.category}
        </span>

        {/* hover annotation — "مشاهده پروژه" reveals on hover */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-start p-4">
          <span className="translate-y-2 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 bg-background/90 px-3 py-1.5 backdrop-blur-[1px]">
              <span className="h-1.5 w-1.5 bg-[hsl(var(--brick))]" />
              <span className="text-xs font-medium">مشاهده پروژه</span>
              <span aria-hidden="true" className="text-xs">←</span>
            </span>
          </span>
        </div>
      </div>

      {/* ---- text block ---- */}
      <div
        className={cn(
          "relative pt-4",
          variant === "feature" && "md:col-span-4 md:pt-0 md:flex md:flex-col md:justify-between"
        )}
      >
        {/* a drawn line above the title — only on feature variant */}
        {variant === "feature" && (
          <motion.div
            className="mb-6 hidden h-px w-12 bg-[hsl(var(--brick))] md:block"
            initial={prefersReduced ? false : { scaleX: 0 }}
            animate={{ scaleX: started ? 1 : 0 }}
            transition={{ duration: DURATION.base, ease: EASE.draw, delay: delay + 0.3 }}
            style={{ transformOrigin: "right" }}
          />
        )}

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: started ? 1 : 0, y: started ? 0 : 12 }}
          transition={{ duration: DURATION.base, ease: EASE.arch, delay: delay + 0.2 }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <h3
              className={cn(
                "font-bold leading-tight transition-colors duration-300 group-hover:text-[hsl(var(--brick))]",
                variant === "feature" ? "text-3xl md:text-4xl" : "text-xl"
              )}
            >
              {project.title}
            </h3>
            <span className="annotation-mono shrink-0">{project.year}</span>
          </div>

          <p
            className={cn(
              "mt-3 text-foreground/75 leading-relaxed",
              variant === "feature" ? "text-base md:text-lg" : "text-sm"
            )}
          >
            {project.shortDescription}
          </p>

          {/* metadata strip — like a drawing title block */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {meta.map((m, i) => (
              <span key={i} className="annotation-mono flex items-center gap-2">
                {m}
                {i < meta.length - 1 && (
                  <span className="inline-block h-3 w-px bg-[hsl(var(--line-strong)/0.6)]" />
                )}
              </span>
            ))}
          </div>

          {/* hover affordance — arrow with a drawn line */}
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors group-hover:text-[hsl(var(--brick))]">
            <span
              aria-hidden="true"
              className="h-px w-0 bg-[hsl(var(--brick))] transition-all duration-300 group-hover:w-6"
            />
            مشاهده پروژه
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-x-1.5">←</span>
          </span>
        </motion.div>
      </div>
    </Link>
  );
}
