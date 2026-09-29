"use client";

import Image from "next/image";
import Link from "next/link";
import { architect } from "@/data/architect";
import { site } from "@/data/site";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import {
  ImageReveal,
  TechnicalAnnotation,
  TechnicalLine,
  Crosshair,
  SectionMarker,
  PlusMark,
} from "@/components/architecture";

/**
 * AboutView
 * ---------
 * Detailed About page — biography, philosophy, approach, experience,
 * education, tools and focus. Personal, not corporate.
 */
export function AboutView() {
  return (
    <>
      {/* ===== Intro ===== */}
      <section className="relative mx-auto w-full max-w-[1400px] px-5 pt-10 lg:px-10 lg:pt-16">
        <Reveal variant="fade">
          <div className="flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
            <TechnicalAnnotation
              label="درباره"
              withLine
              lineLength={24}
              ariaHidden={false}
            />
            <span className="annotation-mono">۰۱ / معرفی</span>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* portrait */}
          <div className="lg:col-span-5">
            <Reveal variant="up">
              <div className="relative aspect-[4/5] w-full max-w-md">
                <ImageReveal
                  src="/images/about/portrait.jpg"
                  alt={`پرتره ${architect.name}`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  cornerSize={22}
                />
                {/* plus mark at one corner of the portrait frame */}
                <PlusMark corner="tr" size={11} delay={0.4} />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <TechnicalAnnotation
                  label={architect.basedIn}
                  withLine
                  lineLength={20}
                  ariaHidden={false}
                />
                <span className="annotation-mono">پرتره</span>
              </div>
            </Reveal>
          </div>

          {/* intro text */}
          <div className="lg:col-span-7 lg:pl-8">
            <Reveal variant="up" delay={0.1}>
              <TechnicalAnnotation
                label="معمار"
                withLine
                lineLength={20}
                ariaHidden={false}
              />
              <h1 className="mt-3 display-1">{architect.name}</h1>
              <p className="mt-3 text-xl text-foreground/75">
                {architect.role}
              </p>

              <p className="mt-6 text-lg leading-loose text-foreground/80">
                {architect.intro}
              </p>

              <p className="mt-4 leading-loose text-foreground/70">
                {architect.philosophy}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Approach ===== */}
      <SectionShell index="۰۲" eyebrow="رویکرد" title="چهار اصل طراحی">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {architect.approach.map((a, i) => (
            <Reveal key={a.title} variant="up" delay={(i % 2) * 0.06}>
              <div className="group relative h-full border border-[hsl(var(--line-strong)/0.4)] p-6 transition-colors hover:border-[hsl(var(--ink))]">
                <Crosshair
                  size={14}
                  className="absolute right-2 top-2"
                  thickness={1}
                />
                <div className="flex items-baseline justify-between">
                  <span className="annotation-mono text-[hsl(var(--brick))]" dir="ltr">
                    ۰{i + 1}
                  </span>
                  <SectionMarker letter={String.fromCharCode(65 + i)} size={20} />
                </div>
                <h3 className="mt-4 text-xl font-bold">{a.title}</h3>
                <div className="my-3 h-px w-full bg-[hsl(var(--line-strong)/0.4)]" />
                <p className="text-sm leading-relaxed text-foreground/75">
                  {a.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionShell>

      {/* ===== Experience + Education ===== */}
      <section className="mx-auto w-full max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* experience */}
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <div className="mb-8 flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
                <TechnicalAnnotation
                  label="تجربه کاری"
                  withLine
                  lineLength={20}
                  ariaHidden={false}
                />
                <span className="annotation-mono">۰۳</span>
              </div>
            </Reveal>

            <ol className="relative">
              {architect.experience.map((exp, i) => (
                <Reveal key={i} variant="up" delay={i * 0.05}>
                  <li className="relative grid grid-cols-1 gap-2 border-b border-[hsl(var(--line)/0.5)] py-6 md:grid-cols-12 md:gap-6">
                    {/* year */}
                    <div className="md:col-span-3">
                      <span className="annotation-mono" dir="ltr">
                        {exp.year}
                      </span>
                    </div>
                    {/* role + org + desc */}
                    <div className="md:col-span-9">
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      <p className="annotation mt-1">{exp.org}</p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                        {exp.desc}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* education */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal variant="fade">
              <div className="mb-8 flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
                <TechnicalAnnotation
                  label="تحصیلات"
                  withLine
                  lineLength={20}
                  ariaHidden={false}
                />
                <span className="annotation-mono">۰۴</span>
              </div>
            </Reveal>

            <ul className="space-y-6">
              {architect.education.map((edu, i) => (
                <Reveal key={i} variant="up" delay={i * 0.05}>
                  <li className="border border-[hsl(var(--line-strong)/0.4)] p-5">
                    <span className="annotation-mono" dir="ltr">
                      {edu.year}
                    </span>
                    <h3 className="mt-2 text-base font-bold">{edu.degree}</h3>
                    <p className="annotation mt-1">{edu.org}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Tools + Focus ===== */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pb-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* tools */}
          <div className="lg:col-span-7">
            <Reveal variant="fade">
              <div className="mb-8 flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
                <TechnicalAnnotation
                  label="ابزار و نرم‌افزار"
                  withLine
                  lineLength={20}
                  ariaHidden={false}
                />
                <span className="annotation-mono">۰۵</span>
              </div>
            </Reveal>
            <Reveal variant="up" delay={0.05}>
              <div className="flex flex-wrap gap-2">
                {architect.tools.map((t) => (
                  <span
                    key={t}
                    className="border border-[hsl(var(--line-strong)/0.5)] px-3 py-1.5 text-sm text-foreground/80"
                    dir="ltr"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* focus */}
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal variant="fade">
              <div className="mb-8 flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
                <TechnicalAnnotation
                  label="تمرکز حرفه‌ای"
                  withLine
                  lineLength={20}
                  ariaHidden={false}
                />
                <span className="annotation-mono">۰۶</span>
              </div>
            </Reveal>
            <Reveal variant="up" delay={0.05}>
              <ul className="space-y-3">
                {architect.focus.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-block h-px w-4 bg-[hsl(var(--line-strong))]"
                    />
                    <span className="text-sm text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto mt-16 w-full max-w-[1400px] px-5 pb-8 lg:px-10">
        <Reveal variant="fade">
          <div className="relative border-y border-[hsl(var(--line-strong)/0.4)] py-10 text-center">
            <Crosshair size={14} className="absolute right-0 top-0" thickness={1} />
            <Crosshair size={14} className="absolute bottom-0 left-0" thickness={1} />
            <p className="text-lg text-foreground/80">
              برای گفت‌وگو درباره پروژه‌ها، از صفحه تماس در دسترس باشید.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 border border-[hsl(var(--ink))] px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background focus-arch"
            >
              صفحه تماس
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
