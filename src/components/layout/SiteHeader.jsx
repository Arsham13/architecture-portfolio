"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useInView } from "@/components/motion/useInView";
import { useRef } from "react";
import { site } from "@/data/site";
import { MainNav } from "@/components/navigation/MainNav";
import { TechnicalLine } from "@/components/architecture/TechnicalLine";
import { Crosshair } from "@/components/architecture/Crosshair";
import { EASE, DURATION } from "@/components/motion/motion";
import { cn } from "@/lib/utils";

/**
 * SiteHeader
 * ----------
 * A fixed-on-scroll header that begins transparent/overlay over
 * the hero, then condenses into a bordered bar once the user
 * scrolls past the hero. Carries the wordmark, primary nav and
 * theme toggle. Includes the architectural top "guide line".
 */
export function SiteHeader() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-colors duration-300",
        condensed
          ? "bg-background/85 backdrop-blur-md border-b border-[hsl(var(--line-strong)/0.4)]"
          : isHome
          ? "bg-transparent border-b border-transparent"
          : "bg-background border-b border-[hsl(var(--line-strong)/0.4)]"
      )}
    >
      {/* top architectural guide line — only when condensed */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 right-0 left-0 h-px bg-[hsl(var(--line-strong))]"
        initial={false}
        animate={{
          scaleX: condensed ? 1 : isHome ? 0.4 : 1,
          opacity: isHome && !condensed ? 0.4 : 1,
        }}
        transition={{ duration: DURATION.base, ease: EASE.arch }}
        style={{ transformOrigin: "right" }}
      />

      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 lg:px-10">
        {/* wordmark */}
        <Link
          href="/"
          className="group relative flex items-center gap-3 focus-arch"
          aria-label={`${site.name} — خانه`}
        >
          {/* a small architectural monogram drawn on the fly */}
          <span
            aria-hidden="true"
            className={cn(
              "relative inline-flex h-8 w-8 items-center justify-center",
              "border border-[hsl(var(--ink))] transition-colors"
            )}
          >
            <span className="absolute inset-1 border border-[hsl(var(--line-strong))]" />
            <span className="relative h-1.5 w-1.5 bg-[hsl(var(--brick))]" />
            <span className="absolute -top-px -right-px h-1 w-1 border-r border-t border-[hsl(var(--ink))]" />
          </span>

          <span className="flex flex-col leading-none">
            <motion.span
              className="text-base font-bold tracking-tight"
              key={site.name}
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.base, ease: EASE.arch }}
            >
              {site.name}
            </motion.span>
            <span className="annotation-mono mt-0.5 hidden sm:block">
              {site.role}
            </span>
          </span>
        </Link>

        <MainNav />
      </div>
    </header>
  );
}
