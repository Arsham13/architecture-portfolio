"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { TechnicalLine } from "@/components/architecture/TechnicalLine";
import { Crosshair } from "@/components/architecture/Crosshair";
import { TechnicalAnnotation } from "@/components/architecture/TechnicalAnnotation";
import { Reveal } from "@/components/motion/Reveal";
import { Instagram, Linkedin, Send, Mail, Phone, MapPin } from "lucide-react";

/**
 * SiteFooter
 * ----------
 * Minimal footer that continues the architectural language.
 * Wordmark + nav + contact + socials + a baseline technical line.
 * Sits flush to the bottom thanks to the flex-col root layout.
 */
export function SiteFooter() {
  const year = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
  }).format(new Date());

  return (
    <footer className="relative mt-24 border-t border-[hsl(var(--line-strong)/0.4)] bg-background">
      {/* a long construction line that draws across the top */}
      <TechnicalLine
        orientation="h"
        origin="right"
        thickness={1}
        length="100%"
        className="absolute right-0 top-0"
      />

      <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* identity */}
          <div className="md:col-span-5">
            <Reveal variant="up">
              <div className="flex items-baseline gap-3">
                <span className="h-2.5 w-2.5 bg-[hsl(var(--brick))]" />
                <h2 className="text-2xl font-bold">{site.name}</h2>
              </div>
              <p className="mt-2 annotation">{site.role}</p>
              <p className="mt-4 max-w-sm text-foreground/70 leading-relaxed">
                {site.tagline}
              </p>
            </Reveal>
          </div>

          {/* nav */}
          <div className="md:col-span-3">
            <Reveal variant="up" delay={0.05}>
              <p className="annotation mb-4">ناوبری</p>
              <ul className="space-y-2">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-sm text-foreground/75 transition-colors hover:text-foreground focus-arch"
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block h-px w-3 bg-[hsl(var(--line-strong))] transition-all duration-300 group-hover:w-5 group-hover:bg-[hsl(var(--brick))]"
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* contact */}
          <div className="md:col-span-4">
            <Reveal variant="up" delay={0.1}>
              <p className="annotation mb-4">تماس</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="inline-flex items-center gap-2 text-foreground/75 transition-colors hover:text-foreground focus-arch"
                    dir="ltr"
                  >
                    <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2 text-foreground/75 transition-colors hover:text-foreground focus-arch"
                    dir="ltr"
                  >
                    <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {site.phone}
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-foreground/75">
                  <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
                  {site.coordsLabel}
                </li>
              </ul>

              {/* socials */}
              <div className="mt-5 flex items-center gap-2">
                <SocialLink
                  href={site.socials.instagram}
                  label="اینستاگرام"
                  Icon={Instagram}
                />
                <SocialLink
                  href={site.socials.linkedin}
                  label="لینکدین"
                  Icon={Linkedin}
                />
                <SocialLink
                  href={site.socials.telegram}
                  label="تلگرام"
                  Icon={Send}
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* baseline */}
        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-[hsl(var(--line)/0.5)] pt-5 sm:flex-row sm:items-center">
          <p className=" ">
            © {year} — {site.name}. تمام حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-3">
            <Crosshair size={12} thickness={1} />
            <TechnicalAnnotation
              label="پورتفولیو معماری"
              side="after"
              withLine={false}
              ariaHidden={false}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center border border-[hsl(var(--line-strong)/0.5)] text-foreground/70 transition-all hover:border-[hsl(var(--ink))] hover:text-foreground focus-arch"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </a>
  );
}
