"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import { TechnicalAnnotation } from "@/components/architecture/TechnicalAnnotation";
import { TechnicalLine } from "@/components/architecture/TechnicalLine";
import { Crosshair } from "@/components/architecture/Crosshair";
import { Mail, Phone, MapPin, Instagram, Linkedin, Send, ArrowLeft } from "lucide-react";

/**
 * ContactPreview
 * --------------
 * A compact contact section at the bottom of the homepage:
 * email, phone, socials, general location, and a CTA to the
 * full contact page.
 */
export function ContactPreview() {
  const contact = [
    {
      label: "ایمیل",
      value: site.email,
      href: `mailto:${site.email}`,
      Icon: Mail,
      ltr: true,
    },
    {
      label: "تلفن",
      value: site.phone,
      href: `tel:${site.phone.replace(/\s/g, "")}`,
      Icon: Phone,
      ltr: true,
    },
    {
      label: "موقعیت",
      value: site.coordsLabel,
      href: null,
      Icon: MapPin,
      ltr: false,
    },
  ];

  return (
    <SectionShell
      index="۰۵"
      eyebrow="تماس"
      title="بیایید فضایی بسازیم"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* contact list */}
        <div className="lg:col-span-7">
          <ul className="divide-y divide-[hsl(var(--line)/0.5)] border-y border-[hsl(var(--line)/0.5)]">
            {contact.map((c, i) => {
              const Icon = c.Icon;
              const inner = (
                <>
                  <span className="annotation-mono text-[hsl(var(--brick))]" dir="ltr">
                    {String(i + 1).padStart(2, "0").replace(/\d/g, (d) =>
                      "۰۱۲۳۴۵۶۷۸۹"[d]
                    )}
                  </span>
                  <Icon className="h-4 w-4 text-foreground/60" strokeWidth={1.5} />
                  <span className="annotation">{c.label}</span>
                  <span
                    className="mr-auto text-base text-foreground/85"
                    dir={c.ltr ? "ltr" : undefined}
                  >
                    {c.value}
                  </span>
                  {c.href && (
                    <ArrowLeft
                      className="h-4 w-4 text-foreground/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[hsl(var(--brick))]"
                      strokeWidth={1.5}
                    />
                  )}
                </>
              );
              return (
                <Reveal key={c.label} variant="up" delay={i * 0.05}>
                  <li className="py-5">
                    {c.href ? (
                      <a
                        href={c.href}
                        className="group flex items-center gap-4 focus-arch"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{inner}</div>
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ul>

          {/* socials */}
          <Reveal variant="up" delay={0.15} className="mt-6">
            <p className="annotation mb-3">شبکه‌ها</p>
            <div className="flex flex-wrap gap-3">
              <SocialPill href={site.socials.instagram} label="اینستاگرام" Icon={Instagram} />
              <SocialPill href={site.socials.linkedin} label="لینکدین" Icon={Linkedin} />
              <SocialPill href={site.socials.telegram} label="تلگرام" Icon={Send} />
            </div>
          </Reveal>
        </div>

        {/* CTA card */}
        <div className="lg:col-span-5">
          <Reveal variant="up" delay={0.1}>
            <div className="relative flex h-full flex-col justify-between border border-[hsl(var(--line-strong)/0.5)] bg-background p-8">
              <TechnicalLine
                orientation="h"
                origin="right"
                thickness={1}
                length="100%"
                className="absolute right-0 top-0"
              />
              <Crosshair
                size={14}
                thickness={1}
                className="absolute right-2 top-2"
              />
              <div>
                <TechnicalAnnotation
                  label="شروع همکاری"
                  withLine
                  lineLength={20}
                  ariaHidden={false}
                />
                <p className="mt-4 text-2xl font-bold leading-snug">
                  پروژه‌ای در ذهن دارید؟
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  برای گفت‌وگو درباره پروژه‌های مسکونی، تجاری یا فرهنگی با من
                  در تماس باشید. پاسخگوی ایمیل‌ها در کوتاه‌ترین زمان ممکن.
                </p>
              </div>
              <Link
                href="/contact"
                className="group mt-8 inline-flex items-center justify-center gap-3 bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[hsl(var(--brick))] focus-arch"
              >
                صفحه تماس
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

function SocialPill({ href, label, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="group inline-flex items-center gap-2 border border-[hsl(var(--line-strong)/0.5)] px-4 py-2 text-sm text-foreground/75 transition-all hover:border-[hsl(var(--ink))] hover:text-foreground focus-arch"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
      {label}
    </a>
  );
}
