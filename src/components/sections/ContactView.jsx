"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { SectionShell } from "./SectionShell";
import { Reveal } from "@/components/motion/Reveal";
import {
  TechnicalAnnotation,
  TechnicalLine,
  Crosshair,
  PlusMark,
} from "@/components/architecture";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Send,
  ArrowLeft,
} from "lucide-react";

/**
 * ContactView
 * -----------
 * Contact page with:
 *   - direct contact channels (email, phone, socials, location)
 *   - a contact form that is explicitly marked as a future
 *     integration point (it does NOT actually send messages).
 *
 * The form is client-side only and shows a "prepared for future
 * integration" note so visitors understand the demo state.
 */
export function ContactView() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // Demo only — no backend. This is a documented future integration point.
    setSubmitted(true);
  };

  const channels = [
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
      label: "اینستاگرام",
      value: "@arshamseraji",
      href: site.socials.instagram,
      Icon: Instagram,
      ltr: true,
    },
    {
      label: "لینکدین",
      value: "arsham-seraji",
      href: site.socials.linkedin,
      Icon: Linkedin,
      ltr: true,
    },
    {
      label: "تلگرام",
      value: "@arshamseraji",
      href: site.socials.telegram,
      Icon: Send,
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
    <>
      {/* ===== Header ===== */}
      <section className="relative mx-auto w-full max-w-[1400px] px-5 pt-10 lg:px-10 lg:pt-16">
        <Reveal variant="fade">
          <div className="flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
            <TechnicalAnnotation
              label="تماس"
              withLine
              lineLength={24}
              ariaHidden={false}
            />
            <span className="annotation-mono">۰۱ / ارتباط</span>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal variant="up">
              <h1 className="display-1">بیایید گفت‌وگو کنیم</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
                برای همکاری در پروژه‌های مسکونی، تجاری، فرهنگی یا بازسازی،
                از راه‌های زیر در دسترس هستم. در اولین فرصت پاسخ می‌دهم.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end lg:justify-end">
            <Reveal variant="fade" delay={0.1}>
              <Crosshair size={20} thickness={1} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Channels ===== */}
      <SectionShell index="۰۲" eyebrow="راه‌های ارتباطی" title="کانال‌ها" withTopLine={false}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c, i) => {
            const Icon = c.Icon;
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-foreground/60" strokeWidth={1.5} />
                  <span className="annotation-mono text-[hsl(var(--brick))]" dir="ltr">
                    {String(i + 1).padStart(2, "0").replace(/\d/g, (d) =>
                      "۰۱۲۳۴۵۶۷۸۹"[d]
                    )}
                  </span>
                </div>
                <p className="annotation mt-4">{c.label}</p>
                <p
                  className="mt-1 text-base font-medium text-foreground/90"
                  dir={c.ltr ? "ltr" : undefined}
                >
                  {c.value}
                </p>
                {c.href && (
                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-foreground/50 transition-colors group-hover:text-[hsl(var(--brick))]">
                    ارتباط
                    <ArrowLeft
                      className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-1"
                      strokeWidth={1.5}
                    />
                  </span>
                )}
              </>
            );
            return (
              <Reveal key={c.label} variant="up" delay={(i % 3) * 0.05}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group block h-full border border-[hsl(var(--line-strong)/0.4)] p-5 transition-colors hover:border-[hsl(var(--ink))] focus-arch"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="h-full border border-[hsl(var(--line-strong)/0.4)] p-5">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </SectionShell>

      {/* ===== Form (future integration point) ===== */}
      <section className="mx-auto w-full max-w-[1400px] px-5 pb-16 lg:px-10">
        <Reveal variant="fade">
          <div className="mb-8 flex items-center justify-between border-b border-[hsl(var(--line)/0.5)] pb-3">
            <TechnicalAnnotation
              label="فرم تماس"
              withLine
              lineLength={20}
              ariaHidden={false}
            />
            <span className="annotation-mono">۰۳</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal variant="up">
              <div className="relative border border-[hsl(var(--line-strong)/0.4)] p-6 lg:p-8">
                <TechnicalLine
                  orientation="h"
                  origin="right"
                  thickness={1}
                  length="100%"
                  className="absolute right-0 top-0"
                />
                <Crosshair size={14} className="absolute right-2 top-2" thickness={1} />
                {/* plus mark at the top-left corner of the form panel */}
                <PlusMark corner="tl" size={10} delay={0.3} />

                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center border border-[hsl(var(--brick))]">
                      <span className="h-2 w-2 bg-[hsl(var(--brick))]" />
                    </div>
                    <h3 className="text-xl font-bold">پیام ثبت شد</h3>
                    <p className="mt-2 text-sm text-foreground/70">
                      این یک نسخه نمایشی است؛ پیام ارسال نشده است. برای پاسخ واقعی،
                      مستقیماً از ایمیل بالا استفاده کنید.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-6 inline-flex items-center gap-2 border border-[hsl(var(--ink))] px-5 py-2 text-sm transition-colors hover:bg-foreground hover:text-background focus-arch"
                    >
                      ارسال دوباره
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5" noValidate>
                    {/* demo note */}
                    <p className="annotation border border-[hsl(var(--line)/0.5)] bg-[hsl(var(--muted)/0.5)] px-3 py-2">
                      نکته: این فرم در حال حاضر ارسال واقعی انجام نمی‌دهد — نقطه
                      ادغام آینده با باک‌اند.
                    </p>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field label="نام و نام خانوادگی" htmlFor="name">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="نام شما"
                          className="arch-input"
                        />
                      </Field>
                      <Field label="ایمیل" htmlFor="email">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="email@example.com"
                          dir="ltr"
                          className="arch-input"
                        />
                      </Field>
                    </div>

                    <Field label="موضوع" htmlFor="subject">
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="موضوع پیام"
                        className="arch-input"
                      />
                    </Field>

                    <Field label="نوع پروژه" htmlFor="type">
                      <select
                        id="type"
                        name="type"
                        defaultValue=""
                        className="arch-input"
                      >
                        <option value="" disabled>
                          انتخاب کنید…
                        </option>
                        {site.capabilities.map((c) => (
                          <option key={c.key} value={c.title}>
                            {c.title}
                          </option>
                        ))}
                        <option value="other">سایر</option>
                      </select>
                    </Field>

                    <Field label="پیام" htmlFor="message">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="کوتاه درباره پروژه‌تان بنویسید…"
                        className="arch-input resize-none"
                      />
                    </Field>

                    <div className="flex items-center justify-between gap-4 pt-2">
                      <p className="annotation-mono">
                        * فیلدهای ضروری
                      </p>
                      <button
                        type="submit"
                        className="group inline-flex items-center gap-3 bg-foreground px-7 py-3 text-sm font-medium text-background transition-colors hover:bg-[hsl(var(--brick))] focus-arch"
                      >
                        ارسال پیام
                        <ArrowLeft
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                          strokeWidth={1.5}
                        />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* side info */}
          <div className="lg:col-span-5">
            <Reveal variant="up" delay={0.1}>
              <div className="border border-[hsl(var(--line-strong)/0.4)] p-6">
                <TechnicalAnnotation
                  label="اطلاعات کلی"
                  withLine
                  lineLength={20}
                  ariaHidden={false}
                />
                <dl className="mt-5 divide-y divide-[hsl(var(--line)/0.5)]">
                  <div className="flex items-center justify-between py-3">
                    <dt className="annotation">موقعیت</dt>
                    <dd className="text-sm">{site.coordsLabel}</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="annotation">ساعات پاسخ‌گویی</dt>
                    <dd className="text-sm">شنبه تا چهارشنبه</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="annotation">پاسخ معمول</dt>
                    <dd className="text-sm">کمتر از ۴۸ ساعت</dd>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <dt className="annotation">زبان</dt>
                    <dd className="text-sm">فارسی / انگلیسی</dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="annotation mb-2 block">{label}</span>
      {children}
    </label>
  );
}
