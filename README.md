# پورتفولیو معماری — آرشام سراجی

پورتفولیوی شخصی معماری، کاملاً فارسی و راست‌چین (RTL)، با زبان بصری
«نقشه‌کشی فنی / بلوپرینت» و انیمیشن «ساخت‌و‌ساز رابط».

> محتوای این پورتفولیو (نام معمار، پروژه‌ها، تصاویر و اطلاعات) همگی
> جایگزین‌پذیر هستند و صرفاً نمونه‌ای واقع‌گرایانه برای ارائه هستند.

---

## ۱. تکنولوژی

- **Next.js 16** (App Router) — Server Components به‌صورت پیش‌فرض، Client Components فقط برای تعامل/انیمیشن
- **JavaScript فقط** — تمام فایل‌های جدید `.js` / `.jsx` هستند (بدون TypeScript برای کد پورتفولیو)
- **Tailwind CSS 4** + متغیرهای سفارشی معماری
- **Motion** برای انیمیشن‌های کنترل‌شده (transform / opacity / clip-path)
- **Lenis** برای اسکرول نرم دسکتاپ (روی موبایل غیرفعال می‌شود تا اسکرول بومی حفظ شود)
- **Estedad** — فونت فارسی، محلی از `/public/fonts` (بدون CDN خارجی)
- بدون باک‌اند، بدون دیتابیس، بدون CMS — داده‌ها از فایل‌های محلی JS

## ۲. صفحات

| مسیر | توضیح |
|------|-------|
| `/` | خانه (هیرو + پروژه‌های برگزیده + درباره + توانمندی‌ها + تماس) |
| `/projects` | آرشیو پروژه‌ها با فیلتر دسته |
| `/projects/[slug]` | صفحه جزئیات پروژه (مطالعه موردی) |
| `/about` | درباره معمار |
| `/contact` | تماس + فرم (نقطه ادغام آینده با باک‌اند) |

## ۳. ساختار پروژه

```text
src/
├── app/
│   ├── page.jsx                    # خانه
│   ├── projects/
│   │   ├── page.jsx                # لیست پروژه‌ها
│   │   └── [slug]/page.jsx         # جزئیات پروژه
│   ├── about/page.jsx
│   ├── contact/page.jsx
│   ├── layout.jsx                  # ریشه RTL فارسی + تم
│   ├── globals.css                 # سیستم رنگ معماری + فونت
│   ├── sitemap.js                 # SEO
│   ├── robots.js                   # SEO
│   └── not-found.jsx
├── components/
│   ├── architecture/               # اجزای بصری زبان نقشه‌کشی
│   │   ├── ArchitecturalFrame
│   │   ├── TechnicalLine
│   │   ├── DimensionLine
│   │   ├── Crosshair
│   │   ├── SectionMarker
│   │   ├── TechnicalAnnotation
│   │   ├── CornerMarks
│   │   ├── AxisGrid
│   │   ├── ImageReveal
│   │   └── ProjectFrame
│   ├── motion/
│   │   ├── motion.js               # توکن‌های انیمیشن
│   │   ├── Reveal.jsx              # wrapper انیمیشن ورود
│   │   ├── useInView.js            # hook سفارشی IntersectionObserver
│   │   └── SmoothScroll.jsx        # Lenis
│   ├── layout/                     # Header + Footer
│   ├── navigation/                 # MainNav + ThemeToggle
│   ├── sections/                   # بخش‌های صفحه
│   ├── projects/                   # ProjectDetail + ProjectsView
│   └── providers/ThemeProvider
├── data/
│   ├── site.js                     # پیکربندی سایت + ناوبری + تماس
│   ├── architect.js                # بیوگرافی معمار
│   └── projects.js                 # داده پروژه‌ها (افزودن پروژه جدید اینجا)
└── lib/utils.js

public/
├── fonts/Estedad-*.woff2          # فونت محلی
└── images/
    ├── architecture/              # تصاویر عمومی معماری
    ├── projects/<slug>/           # تصاویر هر پروژه
    │   ├── cover.jpg
    │   ├── gallery-N.jpg
    │   ├── plan-*.svg              # پلان (نقشه خطی SVG)
    │   ├── section-*.svg
    │   └── render-N.jpg
    └── about/portrait.jpg

scripts/
├── generate-images.mjs            # تولید تصاویر placeholder با AI
└── generate-drawings.mjs          # تولید نقشه‌های SVG (پلان/برش)
```

## ۴. افزودن پروژه جدید

۱. یک شیء جدید به `src/data/projects.js` اضافه کنید (با `slug` یکتا).
۲. پوشه `public/images/projects/<slug>/` بسازید و تصاویر را در آن بگذارید:
   - `cover.jpg` (الزامی)
   - `gallery-1.jpg`, `gallery-2.jpg`, ... (اختیاری)
   - `plan-*.svg`, `section-*.svg` (اختیاری — نقشه خطی)
   - `render-N.jpg` (اختیاری)
۳. صفحه جزئیات خودکار به محتوای موجود سازگار می‌شود (بخش‌های خالی مخفی می‌شوند).

## ۵. جایگزینی هویت

- `src/data/site.js` → نام، نقش، ایمیل، تلفن، شبکه‌های اجتماعی، ناوبری
- `src/data/architect.js` → بیوگرافی، فلسفه، تجربه، تحصیلات
- `src/data/projects.js` → پروژه‌ها
- `public/images/about/portrait.jpg` → پرتره معمار
- `public/images/architecture/hero.jpg` → تصویر هیرو

## ۶. حالت تیره

- حالت روشن پیش‌فرض است.
- کلید تبدیل تم در هدر؛ انتخاب در `localStorage` ذخیره می‌شود.
- اسکریپت inline در `layout.jsx` قبل از paint، تم ذخیره‌شده را اعمال می‌کند (بدون فلش).

## ۷. دسترس‌پذیری

- HTML معنایی، پیمایش کیبورد، focus states
- `prefers-reduced-motion` — انیمیشن‌های غیرضروری غیرفعال می‌شوند
- alt متن برای تصاویر
- سلسله‌مراتب هدینگ صحیح

## ۸. SEO

- عنوان و توضیحات متا فارسی برای هر صفحه
- Open Graph metadata
- `sitemap.xml` و `robots.txt` (از `src/app/sitemap.js` و `robots.js`)

## ۹. اسکریپت‌ها

```bash
bun run dev      # سرور توسعه (پورت ۳۰۰۰)
bun run lint     # بررسی کیفیت کد
bun run db:push  # (غیرمرتبط — پروژه باک‌اند ندارد)
```

## ۱۰. اعتبار تصاویر

تمام تصاویر placeholder با `z-ai-web-dev-sdk` (image generation) و نقشه‌های SVG
با اسکریپت `scripts/generate-drawings.mjs` تولید شده‌اند. برای جایگزینی با
عکس‌های واقعی پروژه، فایل‌ها را در مسیرهای مشابه در `public/images/` بگذارید.

---

© آرشام سراجی — پورتفولیو نمونه معماری.
