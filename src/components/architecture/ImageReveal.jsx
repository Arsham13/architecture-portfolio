"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";
import { CornerMarks } from "./CornerMarks";

/**
 * ImageReveal
 * -----------
 * An image that reveals itself via a "paper mask wipe" — a
 * background-colored overlay covers the image and wipes away
 * (scaleX 1→0 from the right, matching RTL reading direction)
 * when the frame scrolls into view.
 *
 * IMPORTANT design decision: the image itself is NEVER placed
 * inside a `clip-path` container. Clipped containers can prevent
 * the browser / Next.js from lazy-loading the underlying image.
 * Here the image loads via normal Next/Image lazy loading, and the
 * reveal is a purely visual overlay on top. This keeps the reveal
 * aesthetic AND guarantees the image actually loads.
 *
 * Reveal sequence:
 *   1. corner marks draw themselves
 *   2. the paper overlay wipes away (right → left)
 *   3. a thin border fades in
 *   4. (optional) a caption badge
 */
export function ImageReveal({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className,
  imgClassName,
  fill = false,
  delay = 0,
  withCornerMarks = true,
  cornerSize = 20,
  withBorder = true,
  once = true,
  showCaption,
  caption,
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "0px 0px -8% 0px" });
  const started = !prefersReduced ? inView : true;

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        fill ? "absolute inset-0" : "",
        className,
      )}
    >
      {/* the image — loads via normal Next/Image lazy loading,
          NEVER inside a clipped container */}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || "100vw"}
          priority={priority}
          className={cn("object-cover", imgClassName)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className={cn("h-full w-full object-cover", imgClassName)}
        />
      )}

      {/* subtle inner scale for the "settle" feel as the image reveals */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
        initial={prefersReduced ? false : { scaleX: 1.08 }}
        animate={{ scaleX: started ? 1 : 1.08 }}
        transition={{
          duration: DURATION.slow + 0.2,
          ease: EASE.settle,
          delay: delay + 0.1,
        }}
      >
        {/* this wrapper exists only to host the scale; the actual image
            above stays unscaled for crispness. We don't re-render the
            image here to avoid double-loading. */}
      </motion.div>

      {/* paper mask overlay — wipes away from right to left (RTL) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-background"
        style={{ transformOrigin: "left" }}
        initial={prefersReduced ? false : { scaleX: 1 }}
        animate={{ scaleX: started ? 0 : 1 }}
        transition={{
          duration: DURATION.slow,
          ease: EASE.draw,
          delay: delay + 0.15,
        }}
      />

      {/* thin border fades in just before the wipe completes */}
      {withBorder && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-[hsl(var(--line-strong)/0.5)]"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{
            duration: DURATION.base,
            ease: EASE.arch,
            delay: delay + 0.4,
          }}
        />
      )}

      {/* corner marks draw on top of the frame */}
      {withCornerMarks && (
        <CornerMarks size={cornerSize} inset={0} delay={delay} />
      )}

      {showCaption && caption && (
        <span className="absolute bottom-0 right-0 z-10 bg-background/90 px-2 py-1  ">
          {caption}
        </span>
      )}
    </div>
  );
}
