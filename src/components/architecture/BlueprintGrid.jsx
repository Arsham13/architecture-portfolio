"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * BlueprintGrid
 * -------------
 * A global, fixed-position architectural square-grid background.
 *
 * Design goals (from the brief):
 *   - Square grid lines, very low opacity — "don't show up until you focus"
 *   - Moves very slowly and subtly (a background-position drift)
 *   - At random positions, individual cells "breathe" — their opacity
 *     goes low/high independently, so the grid feels alive
 *   - Never distracting; subliminal
 *
 * Implementation:
 *   - Layer 1: a CSS `background-image` square grid (48px) with a very
 *     slow `background-position` drift animation (90s loop)
 *   - Layer 2: a handful of absolutely-positioned "highlight" squares
 *     at fixed compositional positions, each with its own long
 *     opacity-breathing animation and delay — these are the "random
 *     places where opacity gets low/high"
 *
 * Everything is `pointer-events-none` and respects prefers-reduced-motion.
 */
export function BlueprintGrid({ className }) {
  const prefersReduced = useReducedMotion();

  // Pre-computed "breathing" cell positions — spread across the viewport
  // at architectural compositional points. Each has a different delay
  // and duration so they never sync up.
  const breathCells = [
    { top: "12%", left: "6%", size: 48, delay: "0s", dur: "11s" },
    { top: "28%", left: "72%", size: 48, delay: "3.5s", dur: "14s" },
    { top: "55%", left: "18%", size: 48, delay: "7s", dur: "9s" },
    { top: "68%", left: "84%", size: 48, delay: "2s", dur: "13s" },
    { top: "82%", left: "40%", size: 48, delay: "5.5s", dur: "10s" },
    { top: "42%", left: "50%", size: 48, delay: "8.5s", dur: "15s" },
    { top: "18%", left: "90%", size: 48, delay: "1s", dur: "12s" },
    { top: "88%", left: "8%", size: 48, delay: "6s", dur: "11s" },
  ];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className
      )}
    >
      {/* Layer 1: the square grid — very low opacity, slow drift */}
      {!prefersReduced && (
        <div
          className="absolute inset-[-10%] bp-grid-drift"
          style={{
            // backgroundImage:
            //   "linear-gradient(to right, hsl(var(--line) / 0.28) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--line) / 0.28) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}

      {/* Layer 2: breathing highlight cells — random positions, each
          pulses opacity independently. Very subtle. */}
      {!prefersReduced &&
        breathCells.map((cell, i) => (
          <span
            key={i}
            className="absolute bp-grid-breathe"
            style={{
              top: cell.top,
              left: cell.left,
              width: cell.size,
              height: cell.size,
              border: "1px solid hsl(var(--line-strong) / 0.25)",
              animationDelay: cell.delay,
              animationDuration: cell.dur,
            }}
          />
        ))}
    </div>
  );
}
