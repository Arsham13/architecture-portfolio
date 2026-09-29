"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";
import { EASE, DURATION } from "../motion/motion";
import { cn } from "@/lib/utils";

/**
 * MainNav
 * -------
 * Desktop primary nav + mobile drawer.
 *
 * Hover state (designed, not default):
 *   - a brick underline draws in from the right (scaleX, RTL)
 *   - a small accent tick appears at the start
 *   - the label color deepens
 *
 * Active state:
 *   - the underline is brick-colored and full-width
 *   - a small section marker (letter) appears
 *
 * Focus state:
 *   - uses .focus-arch for an architectural outline
 */
export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const prefersReduced = useReducedMotion();

  // Lock scroll while the drawer is open (mobile only).
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleNavClick = () => setOpen(false);

  return (
    <>
      {/* desktop nav */}
      <nav
        aria-label="ناوبری اصلی"
        className="hidden md:flex items-center gap-1"
      >
        {navItems.map((item, i) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative px-3 py-2 text-sm font-medium transition-colors focus-arch",
                active
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              <span className="relative inline-block">
                {item.label}

                {/* active underline — brick, full width, draws in */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 right-0 h-px w-full bg-[hsl(var(--brick))] origin-right transition-transform duration-300 ease-out",
                    active ? "scale-x-100" : "scale-x-0"
                  )}
                />

                {/* hover underline — draws in from the right (RTL) */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 right-0 h-px w-full bg-[hsl(var(--ink))]",
                    "origin-right scale-x-0 transition-transform duration-300 ease-out",
                    "group-hover:scale-x-100",
                    active && "opacity-0"
                  )}
                />

                {/* active "+" indicator — a small plus at the start (only when active) */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-3 top-1/2 transition-all duration-200",
                    active ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  )}
                  style={{ width: 8, height: 8, transform: "translateY(-50%)" }}
                >
                  <span className="absolute top-1/2 right-0 h-px w-full -translate-y-1/2 bg-[hsl(var(--brick))]" />
                  <span className="absolute top-0 right-1/2 h-full w-px translate-x-1/2 bg-[hsl(var(--brick))]" />
                </span>

                {/* hover accent tick — a small brick dot at the start */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-2.5 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[hsl(var(--brick))]",
                    "opacity-0 scale-0 transition-all duration-200 ease-out",
                    "group-hover:opacity-100 group-hover:scale-100"
                  )}
                />
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        {/* mobile drawer trigger */}
        <button
          type="button"
          aria-label="باز کردن منو"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center border border-[hsl(var(--line-strong)/0.6)] bg-background transition-colors hover:border-[hsl(var(--ink))] focus-arch"
        >
          <Menu className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden="true"
              className="md:hidden fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast, ease: EASE.arch }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="منوی موبایل"
              className="md:hidden fixed inset-y-0 right-0 z-50 w-[80%] max-w-sm bg-background border-l border-[hsl(var(--line-strong)/0.5)] flex flex-col"
              initial={prefersReduced ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={prefersReduced ? undefined : { x: "100%" }}
              transition={{ duration: DURATION.base, ease: EASE.arch }}
            >
              <div className="flex items-center justify-between border-b border-[hsl(var(--line-strong)/0.4)] px-5 py-4">
                <span className="annotation-mono">منو</span>
                <button
                  type="button"
                  aria-label="بستن منو"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center border border-[hsl(var(--line-strong)/0.6)] transition-colors hover:border-[hsl(var(--ink))] focus-arch"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <nav className="flex flex-col px-2 py-4" aria-label="ناوبری موبایل">
                {navItems.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={prefersReduced ? false : { opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: DURATION.base,
                        ease: EASE.arch,
                        delay: 0.06 + i * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={handleNavClick}
                        className={cn(
                          "group flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] py-4 px-3 text-lg font-medium transition-colors",
                          active
                            ? "text-[hsl(var(--brick))]"
                            : "text-foreground/80 hover:text-foreground"
                        )}
                      >
                        <span className="flex items-center gap-3">
                          {/* active marker — a drawn brick tick */}
                          <span
                            aria-hidden="true"
                            className={cn(
                              "h-3 w-px bg-[hsl(var(--brick))] transition-all duration-300",
                              active ? "h-4" : "h-0 group-hover:h-3 group-hover:bg-[hsl(var(--ink))]"
                            )}
                          />
                          {item.label}
                        </span>
                        <span className="annotation-mono text-foreground/40">
                          ۰{i + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="mt-auto px-5 py-4 border-t border-[hsl(var(--line-strong)/0.4)]">
                <p className="annotation-mono mb-2">تماس</p>
                <a
                  href={`mailto:${site.email}`}
                  className="block text-sm text-foreground/80 transition-colors hover:text-[hsl(var(--brick))]"
                  dir="ltr"
                >
                  {site.email}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
