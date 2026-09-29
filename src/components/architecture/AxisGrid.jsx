"use client";

import { cn } from "@/lib/utils";

/**
 * AxisGrid
 * --------
 * Background architectural grid. Purely decorative — built with
 * CSS background-image (see .arch-grid / .arch-grid-fine in
 * globals.css) so it costs zero JS and no extra DOM nodes.
 *
 * variant:
 *   - "coarse"  48px grid
 *   - "fine"    24px grid
 *
 * Pass `className` to size/position the wrapper.
 */
export function AxisGrid({
  variant = "coarse",
  className,
  children,
  withFaintMask = true,
}) {
  const gridClass =
    variant === "fine" ? "arch-grid-fine" : "arch-grid";
  return (
    <div className={cn("relative", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0",
          gridClass,
          withFaintMask &&
            "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
        )}
      />
      {children}
    </div>
  );
}
