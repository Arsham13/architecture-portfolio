"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import { site } from "@/data/site";
import { EASE, DURATION } from "@/components/motion/motion";
import { Reveal } from "@/components/motion/Reveal";
import {
  CornerMarks,
  TechnicalLine,
  TechnicalAnnotation,
  Crosshair,
  SectionMarker,
  PlusMark,
} from "@/components/architecture";
import { ArrowRight, ArrowLeft } from "lucide-react";

/**
 * ProjectDetail
 * -------------
 * Full case-study view for a single project.
 *
 * Sections adapt to available content:
 *   - title + intro
 *   - large hero image (cover)
 *   - metadata block
 *   - architectural concept
 *   - design description
 *   - gallery (only if present)
 *   - plans (only if present)
 *   - sections (only if present)
 *   - renders (only if present)
 *   - closing statement
 *   - prev / next navigation
 *
 * In RTL, "next project" reads to the left (←), "prev" to the right (→).
 */
export function ProjectDetail({ slug }) {
  const prefersReduced = useReducedMotion();
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const { prev, next } = getAdjacentProjects(slug);

  const hasGallery = project.gallery && project.gallery.length > 0;
  const hasPlans = project.plans && project.plans.length > 0;
  const hasSections = project.sections && project.sections.length > 0;
  const hasRenders = project.renders && project.renders.length > 0;

  const meta = [
    { label: "دسته", value: project.category },
    { label: "سال", value: project.year },
    project.area && { label: "مساحت", value: project.area },
    project.location && { label: "موقعیت", value: project.location },
    project.status && { label: "وضعیت", value: project.status },
  ].filter(Boolean);

  return (
    <article className="relative">
      {/* ====== HEADER ====== */}
      <header className="relative mx-auto w-full max-w-[1400px] px-5 pt-10 lg:px-10 lg:pt-16">
        {/* breadcrumb */}
        <Reveal variant="fade">
          <nav
            aria-label="مسیر"
            className="flex items-center gap-2 text-sm text-foreground/60"
          >
            <Link href="/" className="hover:text-foreground focus-arch">
              خانه
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/projects" className="hover:text-foreground focus-arch">
              پروژه‌ها
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground/90">{project.title}</span>
          </nav>
        </Reveal>

        {/* title row */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal variant="fade">
              <TechnicalAnnotation
                label="پروژه"
                withLine
                lineLength={24}
                ariaHidden={false}
              />
            </Reveal>
            <Reveal variant="up" delay={0.06}>
              <h1 className="mt-3 display-2">{project.title}</h1>
            </Reveal>
            <Reveal variant="up" delay={0.12}>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/75">
                {project.shortDescription}
              </p>
            </Reveal>
          </div>

          {/* tags */}
          {project.tags && project.tags.length > 0 && (
            <Reveal variant="fade" delay={0.18} className="lg:col-span-4">
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="border border-[hsl(var(--line-strong)/0.5)] px-3 py-1 annotation"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* a long drawn guide line */}
        <TechnicalLine
          orientation="h"
          origin="right"
          thickness={1}
          length="100%"
          className="mt-10"
          delay={0.2}
        />
      </header>

      {/* ====== HERO IMAGE ====== */}
      <div className="relative mx-auto mt-10 w-full max-w-[1400px] px-5 lg:px-10">
        <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-[21/9]">
          <ImageRevealBlock
            src={project.cover}
            alt={`نمای اصلی پروژه ${project.title}`}
            priority
            sizes="(min-width: 1024px) 100vw, 100vw"
            cornerSize={28}
          />
          {/* plus mark at the top-right corner of the hero image frame */}
          <PlusMark corner="tr" size={12} delay={0.4} />
        </div>
      </div>

      {/* ====== METADATA + CONCEPT ====== */}
      <section className="mx-auto mt-20 w-full max-w-[1400px] px-5 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* metadata title block */}
          <div className="lg:col-span-4">
            <Reveal variant="up">
              <p className="annotation mb-4">اطلاعات پروژه</p>
              <dl className="divide-y divide-[hsl(var(--line)/0.5)] border-y border-[hsl(var(--line)/0.5)]">
                {meta.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between gap-4 py-3"
                  >
                    <dt className="annotation">{m.label}</dt>
                    <dd className="text-sm font-medium">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* concept */}
          {project.concept && (
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal variant="up" delay={0.1}>
                <TechnicalAnnotation
                  label="ایده معماری"
                  withLine
                  lineLength={20}
                  ariaHidden={false}
                />
                <h2 className="mt-4 display-3">مفهوم</h2>
                <p className="mt-5 text-lg leading-loose text-foreground/80">
                  {project.concept}
                </p>
              </Reveal>
            </div>
          )}
        </div>
      </section>

      {/* ====== DESIGN DESCRIPTION ====== */}
      {project.fullDescription && (
        <section className="mx-auto mt-24 w-full max-w-[1400px] px-5 lg:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <Reveal variant="fade">
                <SectionMarker letter="A" size={28} />
                <p className="annotation mt-4">توضیحات طراحی</p>
              </Reveal>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <Reveal variant="up" delay={0.1}>
                <p className="text-lg leading-loose text-foreground/85">
                  {project.fullDescription}
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ====== GALLERY ====== */}
      {hasGallery && (
        <section className="mx-auto mt-24 w-full max-w-[1400px] px-5 lg:px-10">
          <Reveal variant="fade">
            <div className="mb-8 flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
              <TechnicalAnnotation
                label="گالری تصاویر"
                withLine
                lineLength={20}
                ariaHidden={false}
              />
              <span className=" " dir="ltr">
                {project.gallery.length} تصویر
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.gallery.map((src, i) => (
              <ImageRevealBlock
                key={src}
                src={src}
                alt={`تصویر ${i + 1} از پروژه ${project.title}`}
                sizes="(min-width: 768px) 50vw, 100vw"
                delay={i * 0.05}
                className={
                  // first image spans both columns on md+
                  i === 0 ? "md:col-span-2" : ""
                }
                aspect={i === 0 ? "16/9" : "4/3"}
                cornerSize={20}
              />
            ))}
          </div>
        </section>
      )}

      {/* ====== PLANS ====== */}
      {hasPlans && (
        <section className="mx-auto mt-24 w-full max-w-[1400px] px-5 lg:px-10">
          <Reveal variant="fade">
            <div className="mb-8 flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
              <TechnicalAnnotation
                label="پلان‌ها"
                withLine
                lineLength={20}
                ariaHidden={false}
              />
              <span className=" " dir="ltr">
                {project.plans.length} پلان
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.plans.map((plan, i) => (
              <DrawingBlock
                key={plan.src}
                src={plan.src}
                label={plan.label || `پلان ${i + 1}`}
                alt={`پلان ${plan.label || i + 1} پروژه ${project.title}`}
                delay={i * 0.08}
                marker={String.fromCharCode(65 + i)} // A, B, C...
              />
            ))}
          </div>
        </section>
      )}

      {/* ====== SECTIONS ====== */}
      {hasSections && (
        <section className="mx-auto mt-24 w-full max-w-[1400px] px-5 lg:px-10">
          <Reveal variant="fade">
            <div className="mb-8 flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
              <TechnicalAnnotation
                label="برش‌ها"
                withLine
                lineLength={20}
                ariaHidden={false}
              />
              <span className=" " dir="ltr">
                {project.sections.length} برش
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6">
            {project.sections.map((sec, i) => (
              <DrawingBlock
                key={sec.src}
                src={sec.src}
                label={sec.label || `برش ${i + 1}`}
                alt={`برش ${sec.label || i + 1} پروژه ${project.title}`}
                delay={i * 0.08}
                marker={String.fromCharCode(65 + i)}
                wide
              />
            ))}
          </div>
        </section>
      )}

      {/* ====== RENDERS ====== */}
      {hasRenders && (
        <section className="mx-auto mt-24 w-full max-w-[1400px] px-5 lg:px-10">
          <Reveal variant="fade">
            <div className="mb-8 flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
              <TechnicalAnnotation
                label="رندرها"
                withLine
                lineLength={20}
                ariaHidden={false}
              />
              <span className=" " dir="ltr">
                {project.renders.length} رندر
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.renders.map((src, i) => (
              <ImageRevealBlock
                key={src}
                src={src}
                alt={`رندر ${i + 1} از پروژه ${project.title}`}
                sizes="(min-width: 768px) 50vw, 100vw"
                delay={i * 0.05}
                className={i === 0 ? "md:col-span-2" : ""}
                aspect={i === 0 ? "16/9" : "4/3"}
                cornerSize={20}
              />
            ))}
          </div>
        </section>
      )}

      {/* ====== CLOSING ====== */}
      <section className="mx-auto mt-32 w-full max-w-[1400px] px-5 lg:px-10">
        <Reveal variant="fade">
          <div className="relative border-y border-[hsl(var(--line-strong)/0.4)] py-10">
            <Crosshair
              size={14}
              className="absolute right-0 top-0"
              thickness={1}
            />
            <Crosshair
              size={14}
              className="absolute bottom-0 left-0"
              thickness={1}
            />
            <p className="text-center text-base text-foreground/70">
              پایان پرونده‌ی «{project.title}» — برای مشاهده پروژه‌های دیگر به
              آرشیو مراجعه کنید.
            </p>
            <div className="mt-6 text-center">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-[hsl(var(--brick))] focus-arch"
              >
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
                بازگشت به آرشیو پروژه‌ها
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ====== PREV / NEXT ====== */}
      <nav
        aria-label="پروژه‌های قبلی و بعدی"
        className="mx-auto mt-16 w-full max-w-[1400px] px-5 pb-8 lg:px-10"
      >
        <div className="grid grid-cols-1 gap-6 border-t border-[hsl(var(--line)/0.5)] pt-8 sm:grid-cols-2">
          {/* RTL: "next" reads to the left → place next first (right side) */}
          <ProjectNavCard project={next} kind="next" />
          <ProjectNavCard project={prev} kind="prev" />
        </div>
      </nav>
    </article>
  );
}

/* ----------------------------------------------------------------
 *  Sub-blocks
 * ----------------------------------------------------------------*/

function ImageRevealBlock({
  src,
  alt,
  sizes,
  priority,
  delay = 0,
  className,
  aspect = "16/10",
  cornerSize = 22,
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const started = !prefersReduced ? inView : true;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className || ""}`}
      style={{ aspectRatio: aspect }}
    >
      {/* The image — loads via normal Next/Image lazy loading.
          NEVER placed inside a clipped container, so lazy loading
          always works regardless of the reveal animation. */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes || "100vw"}
        priority={priority}
        className="object-cover"
      />

      {/* paper mask overlay — wipes away right → left (RTL) to reveal */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-background"
        style={{ transformOrigin: "left" }}
        initial={prefersReduced ? false : { scaleX: 1 }}
        animate={{ scaleX: started ? 0 : 1 }}
        transition={{
          duration: DURATION.slow,
          ease: EASE.draw,
          delay: delay + 0.1,
        }}
      />

      <CornerMarks size={cornerSize} inset={0} delay={delay} />

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-[hsl(var(--line-strong)/0.45)]"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{
          duration: DURATION.base,
          ease: EASE.arch,
          delay: delay + 0.3,
        }}
      />
    </div>
  );
}

function DrawingBlock({ src, label, alt, delay = 0, marker, wide }) {
  // Drawings (plans / sections) are SVG line drawings on a paper
  // background. We reveal them with a paper-mask wipe + a thin frame
  // and a section-marker letter.
  const prefersReduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const started = !prefersReduced ? inView : true;

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-[hsl(var(--muted)/0.4)]"
      style={{ aspectRatio: wide ? "21/9" : "4/3" }}
    >
      {/* plain <img> for SVG line drawings (no Next/Image optimization needed).
          SVGs are tiny (~2-3KB), so load eagerly — no lazy attribute. */}
      <img
        src={src}
        alt={alt}
        className="relative h-full w-full object-contain p-4"
      />

      {/* paper mask overlay — wipes away right → left (RTL) */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-background"
        style={{ transformOrigin: "left" }}
        initial={prefersReduced ? false : { scaleX: 1 }}
        animate={{ scaleX: started ? 0 : 1 }}
        transition={{ duration: DURATION.slow, ease: EASE.draw, delay }}
      />

      <CornerMarks size={20} inset={0} delay={delay} />

      {/* section marker + label */}
      <div className="absolute right-3 top-3 z-10 flex items-center gap-2 bg-background/85 px-2 py-1 backdrop-blur-[1px]">
        <SectionMarker letter={marker} size={18} delay={delay + 0.1} />
        <span className=" ">{label}</span>
      </div>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-[hsl(var(--line-strong)/0.45)]"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{
          duration: DURATION.base,
          ease: EASE.arch,
          delay: delay + 0.3,
        }}
      />
    </div>
  );
}

function ProjectNavCard({ project, kind }) {
  if (!project) return <div className="hidden sm:block" aria-hidden="true" />;
  const isNext = kind === "next";
  // RTL: next → arrow points left (←), placed on the right side of the row
  return (
    <Reveal variant="fade">
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block border border-[hsl(var(--line-strong)/0.4)] p-5 transition-colors hover:border-[hsl(var(--ink))] focus-arch"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="annotation">
            {isNext ? "پروژه بعدی" : "پروژه قبلی"}
          </span>
          {isNext ? (
            <ArrowLeft
              className="h-4 w-4 text-foreground/40 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
          ) : (
            <ArrowRight
              className="h-4 w-4 text-foreground/40 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          )}
        </div>
        <p className="mt-3 text-lg font-bold">{project.title}</p>
        <p className="mt-1  ">
          {project.category} — {project.year}
        </p>
      </Link>
    </Reveal>
  );
}
