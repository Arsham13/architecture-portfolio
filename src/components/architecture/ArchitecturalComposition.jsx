"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, DURATION } from "@/components/motion/motion";

/**
 * ArchitecturalComposition
 * ------------------------
 * An abstract architectural SVG composition — a plan/section hybrid
 * that replaces a photograph in the hero. No bitmap image; pure
 * blueprint geometry.
 *
 * The composition reads as:
 *   - a building section with a central double-height void
 *   - floor lines, a staircase, a roof line
 *   - axis centerlines (dashed)
 *   - dimension ticks
 *   - a section marker
 *
 * It has a subtle mouse parallax (reads --mx/--my via the
 * `.parallax-soft` class on the wrapper).
 *
 * Construction sequence: lines stroke-draw, then fills fade in.
 */
export function ArchitecturalComposition({ className }) {
  const prefersReduced = useReducedMotion();

  // viewBox is 400×460 — a portrait architectural sheet
  return (
    <div className={"relative " + (className || "")}>
      <svg
        viewBox="0 0 400 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ===== ground line ===== */}
        <motion.line
          x1="20" y1="400" x2="380" y2="400"
          stroke="hsl(var(--ink))"
          strokeWidth="1.5"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: 0.3 }}
        />
        {/* ground hatching */}
        <g stroke="hsl(var(--line-strong))" strokeWidth="0.5">
          {[30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370].map((x, i) => (
            <motion.line
              key={i}
              x1={x} y1="400" x2={x - 8} y2="412"
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: DURATION.base, delay: 0.6 + i * 0.02 }}
            />
          ))}
        </g>

        {/* ===== building envelope — outer walls ===== */}
        <motion.rect
          x="60" y="80" width="280" height="320"
          stroke="hsl(var(--ink))"
          strokeWidth="1.5"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: 0.4 }}
        />

        {/* ===== floor slabs ===== */}
        <motion.line x1="60" y1="200" x2="200" y2="200"
          stroke="hsl(var(--ink))" strokeWidth="1"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw * 0.7, ease: EASE.draw, delay: 0.6 }}
        />
        <motion.line x1="220" y1="200" x2="340" y2="200"
          stroke="hsl(var(--ink))" strokeWidth="1"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw * 0.7, ease: EASE.draw, delay: 0.65 }}
        />
        <motion.line x1="60" y1="300" x2="340" y2="300"
          stroke="hsl(var(--ink))" strokeWidth="1"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw * 0.7, ease: EASE.draw, delay: 0.7 }}
        />

        {/* ===== central double-height void (the "courtyard") ===== */}
        <motion.rect
          x="195" y="190" width="30" height="120"
          stroke="hsl(var(--brick))"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: DURATION.base, delay: 0.9 }}
        />
        {/* void label */}
        <motion.text
          x="210" y="255"
          fill="hsl(var(--brick))"
          fontSize="8"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.base, delay: 1.1 }}
        >
          VOID
        </motion.text>

        {/* ===== interior partition (ground floor) ===== */}
        <motion.line x1="140" y1="300" x2="140" y2="400"
          stroke="hsl(var(--line-strong))" strokeWidth="0.75"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.base, ease: EASE.draw, delay: 0.85 }}
        />
        <motion.line x1="260" y1="300" x2="260" y2="400"
          stroke="hsl(var(--line-strong))" strokeWidth="0.75"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.base, ease: EASE.draw, delay: 0.9 }}
        />

        {/* ===== staircase (diagonal zigzag) ===== */}
        <motion.path
          d="M 70 400 L 85 390 L 100 380 L 115 370 L 130 360"
          stroke="hsl(var(--ink))"
          strokeWidth="1"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.base, ease: EASE.draw, delay: 1.0 }}
        />

        {/* ===== roof line ===== */}
        <motion.line x1="55" y1="80" x2="345" y2="80"
          stroke="hsl(var(--ink))" strokeWidth="1.5"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: 0.5 }}
        />
        {/* roof overhang ticks */}
        <motion.line x1="55" y1="78" x2="55" y2="82" stroke="hsl(var(--ink))" strokeWidth="1"
          initial={prefersReduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: 0.6 }} />
        <motion.line x1="345" y1="78" x2="345" y2="82" stroke="hsl(var(--ink))" strokeWidth="1"
          initial={prefersReduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: 0.6 }} />

        {/* ===== axis centerlines (dashed) ===== */}
        <motion.line x1="210" y1="60" x2="210" y2="420"
          stroke="hsl(var(--line-strong))" strokeWidth="0.5"
          strokeDasharray="6 4"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE.draw, delay: 0.2 }}
        />
        <motion.line x1="40" y1="250" x2="380" y2="250"
          stroke="hsl(var(--line-strong))" strokeWidth="0.5"
          strokeDasharray="6 4"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.slow, ease: EASE.draw, delay: 0.25 }}
        />

        {/* ===== dimension line (left, vertical) ===== */}
        <motion.line x1="35" y1="80" x2="35" y2="400"
          stroke="hsl(var(--line-strong))" strokeWidth="0.5"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: 0.8 }}
        />
        <motion.line x1="32" y1="80" x2="38" y2="80" stroke="hsl(var(--line-strong))" strokeWidth="0.5"
          initial={prefersReduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: 0.9 }} />
        <motion.line x1="32" y1="400" x2="38" y2="400" stroke="hsl(var(--line-strong))" strokeWidth="0.5"
          initial={prefersReduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: 0.9 }} />

        {/* ===== dimension line (top, horizontal) ===== */}
        <motion.line x1="60" y1="60" x2="340" y2="60"
          stroke="hsl(var(--line-strong))" strokeWidth="0.5"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DURATION.draw, ease: EASE.draw, delay: 0.85 }}
        />
        <motion.line x1="60" y1="57" x2="60" y2="63" stroke="hsl(var(--line-strong))" strokeWidth="0.5"
          initial={prefersReduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: 0.95 }} />
        <motion.line x1="340" y1="57" x2="340" y2="63" stroke="hsl(var(--line-strong))" strokeWidth="0.5"
          initial={prefersReduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: 0.95 }} />

        {/* ===== section marker (circle with letter) ===== */}
        <motion.circle
          cx="40" cy="60" r="9"
          stroke="hsl(var(--ink))" strokeWidth="1"
          fill="hsl(var(--background))"
          initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: DURATION.base, ease: EASE.arch, delay: 1.2 }}
        />
        <motion.text
          x="40" y="63"
          fill="hsl(var(--ink))"
          fontSize="9"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontWeight="700"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.base, delay: 1.3 }}
        >
          A
        </motion.text>

        {/* ===== a few "door/window" openings (gaps in walls) ===== */}
        {/* door on ground floor */}
        <motion.line x1="100" y1="400" x2="120" y2="400"
          stroke="hsl(var(--background))" strokeWidth="3"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: 1.0 }}
        />
        {/* window on upper floor */}
        <motion.line x1="80" y1="140" x2="110" y2="140"
          stroke="hsl(var(--background))" strokeWidth="3"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: 1.05 }}
        />
        <motion.line x1="290" y1="140" x2="320" y2="140"
          stroke="hsl(var(--background))" strokeWidth="3"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.fast, delay: 1.1 }}
        />

        {/* ===== arrow indicating "north/sun" direction ===== */}
        <motion.g
          initial={prefersReduced ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE.arch, delay: 1.4 }}
        >
          <line x1="365" y1="100" x2="365" y2="70" stroke="hsl(var(--brick))" strokeWidth="1" />
          <polygon points="365,66 361,74 369,74" fill="hsl(var(--brick))" />
          <text x="370" y="90" fill="hsl(var(--brick))" fontSize="8" fontFamily="ui-monospace, monospace">N</text>
        </motion.g>
      </svg>
    </div>
  );
}
