"use client";

import { TechnicalLine } from "./TechnicalLine";
import { cn } from "@/lib/utils";

/**
 * DimensionLine
 * -------------
 * Architectural dimension line: a horizontal hairline with two
 * perpendicular end ticks and a centered value label.
 *
 * Purely decorative — do NOT use it to imply real metric scales.
 * Use it to mark a span (e.g. between two parts of a layout).
 */
export function DimensionLine({
  value,
  length = "100%",
  thickness = 1,
  tickSize = 8,
  className,
  valueClassName,
}) {
  return (
    <span
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: length }}
      aria-hidden="true"
    >
      {/* end ticks */}
      <span
        className="absolute top-1/2 right-0 -translate-y-1/2 bg-[hsl(var(--line-strong))]"
        style={{ width: thickness, height: tickSize }}
      />
      <span
        className="absolute top-1/2 left-0 -translate-y-1/2 bg-[hsl(var(--line-strong))]"
        style={{ width: thickness, height: tickSize }}
      />
      {/* the line itself */}
      <TechnicalLine
        orientation="h"
        origin="right"
        thickness={thickness}
        length="100%"
      />
      {/* optional value label */}
      {value && (
        <span
          className={cn("relative z-10 bg-background px-2  ", valueClassName)}
        >
          {value}
        </span>
      )}
    </span>
  );
}
