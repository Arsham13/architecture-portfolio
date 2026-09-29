import Link from "next/link";
import { site } from "@/data/site";

export const metadata = {
  title: "صفحه یافت نشد",
};

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[70vh] w-full max-w-[1400px] flex-col items-center justify-center px-5 py-20 text-center lg:px-10">
      <div className="relative">
        <span
          aria-hidden="true"
          className="absolute -right-4 -top-4 h-3 w-3 border-r border-t border-[hsl(var(--ink))]"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-4 -left-4 h-3 w-3 border-b border-l border-[hsl(var(--ink))]"
        />
        <h1 className="display-1">۴۰۴</h1>
      </div>
      <p className="annotation mt-6">خطای فنی — صفحه یافت نشد</p>
      <p className="mt-4 max-w-md text-foreground/70">
        صفحه‌ای که دنبال آن بودید وجود ندارد یا جابه‌جا شده است. به صفحه اصلی
        بازگردید یا آرشیو پروژه‌ها را ببینید.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[hsl(var(--brick))] focus-arch"
        >
          بازگشت به خانه
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 border border-[hsl(var(--line-strong)/0.6)] px-6 py-3 text-sm font-medium text-foreground/80 transition-colors hover:border-[hsl(var(--ink))] hover:text-foreground focus-arch"
        >
          مشاهده پروژه‌ها
        </Link>
      </div>
    </section>
  );
}
