"use client";

import Link from "next/link";
import { getFeaturedProjects } from "@/data/projects";
import { ProjectFrame } from "@/components/architecture/ProjectFrame";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { TechnicalLine } from "@/components/architecture/TechnicalLine";
import { ArrowLeft } from "lucide-react";

/**
 * SelectedProjects
 * ----------------
 * Curated selection of featured projects. Uses an editorial
 * asymmetric layout: alternating feature/compact rows so it
 * never reads like a generic grid.
 */
export function SelectedProjects() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <SectionShell
      index="۰۲"
      eyebrow="پروژه‌های برگزیده"
      title="گزیده‌ای از کارهای اخیر"
      withPlusMark
    >
      <div className="flex flex-col gap-16 lg:gap-24">
        {featured.map((project, i) => (
          // alternate feature/compact and the column order
          <div
            key={project.slug}
            className={
              // even index → feature, flipped layout; odd → standard
              i % 2 === 0
                ? "lg:pl-[8%]"
                : "lg:pr-[8%]"
            }
          >
            <ProjectFrame
              project={project}
              variant="feature"
              index={i}
              priority={i === 0}
              // variation: every other card gets a plus mark
              withPlusMark={i % 2 === 0}
            />
          </div>
        ))}
      </div>

      {/* view all link */}
      <Reveal variant="up" delay={0.1} className="mt-16 flex justify-center">
        <Link
          href="/projects"
          className="group relative inline-flex items-center gap-3 border border-[hsl(var(--ink))] px-8 py-4 text-sm font-medium transition-colors hover:bg-foreground hover:text-background focus-arch"
        >
          <TechnicalLine
            orientation="h"
            origin="right"
            thickness={1}
            length="100%"
            className="absolute right-0 top-0"
          />
          مشاهده همه پروژه‌ها
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
            strokeWidth={1.5}
          />
        </Link>
      </Reveal>
    </SectionShell>
  );
}
