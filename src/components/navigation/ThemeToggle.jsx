"use client";

import { useTheme } from "@/components/providers/useTheme";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ThemeToggle
 * -----------
 * A small architectural toggle: a square button whose glyph
 * swaps between sun and moon. Uses the clean `useTheme` hook
 * (no next-themes — that caused sync conflicts).
 *
 * The button itself has architectural corner ticks and a
 * designed hover state (the border draws + the accent appears).
 */
export function ThemeToggle({ className }) {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      aria-label={isDark ? "تغییر به حالت روشن" : "تغییر به حالت تیره"}
      aria-pressed={isDark}
      onClick={toggle}
      className={cn(
        "group relative inline-flex h-9 w-9 items-center justify-center",
        "border border-[hsl(var(--line-strong)/0.6)] bg-background",
        "transition-all duration-200",
        "hover:border-[hsl(var(--ink))]",
        "active:scale-[0.96]",
        "focus-arch",
        className
      )}
    >
      {/* corner ticks — architectural detail; the top-right one
          shifts to brick on hover to signal interactivity */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-1.5 w-1.5 border-r border-t border-[hsl(var(--ink))] transition-colors duration-200 group-hover:border-[hsl(var(--brick))]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-1.5 border-b border-l border-[hsl(var(--ink))] transition-colors duration-200 group-hover:border-[hsl(var(--brick))]"
      />

      {/* a drawn top line that appears on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-[hsl(var(--brick))] transition-all duration-300 group-hover:w-full"
      />

      {/* Moon shows in light mode (click → go dark) */}
      <span className="block [.dark_&]:hidden">
        <Moon className="h-4 w-4" strokeWidth={1.5} />
      </span>
      {/* Sun shows in dark mode (click → go light) */}
      <span className="hidden [.dark_&]:block">
        <Sun className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </button>
  );
}
