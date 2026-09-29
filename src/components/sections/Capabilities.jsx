"use client";

import { site } from "@/data/site";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { TechnicalAnnotation } from "@/components/architecture/TechnicalAnnotation";
import { TechnicalLine } from "@/components/architecture/TechnicalLine";
import { Crosshair } from "@/components/architecture/Crosshair";
import { cn } from "@/lib/utils";

/**
 * Capabilities
 * ------------
 * A grid of the architect's expertise areas. Each cell is a small
 * technical block — title + description — with an index marker and
 * a top guide line, reading like a drawing legend.
 */
export function Capabilities() {
  const caps = site.capabilities;

  return (
    <SectionShell
      index="۰۴"
      eyebrow="حوزه‌های فعالیت"
      title="توانمندی‌ها"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {caps.map((cap, i) => (
          <Reveal
            key={cap.key}
            variant="up"
            delay={(i % 3) * 0.06}
            className={cn(
              "group relative flex flex-col gap-3 border-[hsl(var(--line)/0.5)] p-6",
              // build a clean grid by drawing right + bottom borders only,
              // and relying on the wrapper's overall border via the first row
              "border-r border-b",
              // last column on lg → no right border
              i % 3 === 2 && "lg:border-r-0",
              // last column on sm (2 cols) → no right border
              i % 2 === 1 && "sm:max-lg:border-r-0",
              // hide bottom border on last row
              i >= caps.length - (caps.length % 3 || 3) && "lg:border-b-0"
            )}
          >
            {/* index + crosshair */}
            <div className="flex items-center justify-between">
              <span className="annotation-mono text-[hsl(var(--brick))]" dir="ltr">
                {String(i + 1).padStart(2, "0").replace(/\d/g, (d) =>
                  "۰۱۲۳۴۵۶۷۸۹"[d]
                )}
              </span>
              <Crosshair size={12} thickness={1} delay={0.1 + i * 0.04} />
            </div>

            {/* title */}
            <h3 className="text-lg font-bold leading-tight">{cap.title}</h3>

            {/* a drawn underline that grows on hover */}
            <div className="relative h-px w-full bg-[hsl(var(--line-strong)/0.4)]">
              <span className="absolute right-0 top-0 h-px w-0 bg-[hsl(var(--brick))] transition-all duration-500 group-hover:w-full" />
            </div>

            <p className="text-sm leading-relaxed text-foreground/70">
              {cap.desc}
            </p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
