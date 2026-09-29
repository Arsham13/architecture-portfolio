"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getAllProjects, getAllTags } from "@/data/projects";
import { ProjectFrame } from "@/components/architecture/ProjectFrame";
import { SectionShell } from "@/components/sections/SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { TechnicalLine } from "@/components/architecture/TechnicalLine";
import { Crosshair } from "@/components/architecture/Crosshair";
import { cn } from "@/lib/utils";

/**
 * ProjectsView
 * ------------
 * Client component for the projects listing page.
 *
 * - A simple category filter (All + unique categories).
 * - An editorial alternating layout (feature / compact rows).
 */
export function ProjectsView() {
  const all = useMemo(() => getAllProjects(), []);
  const categories = useMemo(() => {
    const set = new Set(all.map((p) => p.category));
    return ["همه", ...Array.from(set)];
  }, [all]);

  const [active, setActive] = useState("همه");
  const filtered =
    active === "همه" ? all : all.filter((p) => p.category === active);

  return (
    <SectionShell
      index="۰۱"
      eyebrow="آرشیو پروژه‌ها"
      title="پروژه‌ها"
      withTopLine={false}
    >
      {/* filter bar */}
      <div className="mb-12 flex flex-wrap items-center gap-2 border-y border-[hsl(var(--line)/0.5)] py-3">
        <span className="annotation-mono ml-2">فیلتر:</span>
        {categories.map((c) => {
          const isActive = active === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              aria-pressed={isActive}
              className={cn(
                "group relative px-3 py-1.5 text-sm transition-colors focus-arch",
                isActive
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              {c}
              <span
                className={cn(
                  "absolute -bottom-3 right-0 h-px bg-[hsl(var(--ink))] transition-all duration-300",
                  isActive ? "w-full" : "w-0"
                )}
                style={{ transformOrigin: "right" }}
              />
            </button>
          );
        })}
      </div>

      {/* project rows */}
      <div className="flex flex-col gap-20 lg:gap-28">
        {filtered.map((project, i) => (
          <div
            key={project.slug}
            className={i % 2 === 0 ? "lg:pl-[8%]" : "lg:pr-[8%]"}
          >
            <ProjectFrame
              project={project}
              variant="feature"
              index={i}
              priority={i < 2}
              // variation: every 3rd card gets a plus mark
              withPlusMark={i % 3 === 0}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-foreground/60">
          پروژه‌ای در این دسته یافت نشد.
        </p>
      )}
    </SectionShell>
  );
}
