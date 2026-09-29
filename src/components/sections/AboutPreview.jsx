"use client";

import Link from "next/link";
import Image from "next/image";
import { architect } from "@/data/architect";
import { site } from "@/data/site";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/architecture/ImageReveal";
import { TechnicalAnnotation } from "@/components/architecture/TechnicalAnnotation";
import { TechnicalLine } from "@/components/architecture/TechnicalLine";
import { ArrowLeft } from "lucide-react";

/**
 * AboutPreview
 * ------------
 * A concise introduction to the architect with a portrait and a
 * link to the full About page.
 */
export function AboutPreview() {
  return (
    <SectionShell
      index="۰۳"
      eyebrow="درباره من"
      title="معماری به‌مثابه خوانش فضا"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* portrait */}
        <div className="lg:col-span-5">
          <Reveal variant="up">
            <div className="relative aspect-[4/5] w-full max-w-md">
              <ImageReveal
                src="/images/about/portrait.jpg"
                alt={`پرتره ${architect.name}`}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                cornerSize={22}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <TechnicalAnnotation
                label={architect.basedIn}
                withLine
                lineLength={20}
                ariaHidden={false}
              />
              <span className=" ">پرتره</span>
            </div>
          </Reveal>
        </div>

        {/* text */}
        <div className="lg:col-span-7 lg:pl-8">
          <Reveal variant="up" delay={0.1}>
            <TechnicalAnnotation
              label="بیانیه"
              withLine
              lineLength={20}
              ariaHidden={false}
            />
            <h3 className="display-3 mt-3">{architect.name}</h3>
            <p className="mt-2 annotation">{architect.role}</p>

            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              {architect.intro}
            </p>

            <p className="mt-4 leading-relaxed text-foreground/70">
              {architect.philosophy}
            </p>

            {/* quick stats / focus */}
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[hsl(var(--line)/0.6)] pt-6">
              {architect.focus.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 inline-block h-px w-4 bg-[hsl(var(--line-strong))]"
                  />
                  <span className="text-sm text-foreground/75">{f}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/about"
                className="group inline-flex items-center gap-3 border border-[hsl(var(--ink))] px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background focus-arch"
              >
                درباره کامل
                <ArrowLeft
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}
