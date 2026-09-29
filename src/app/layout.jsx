import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BlueprintGrid } from "@/components/architecture/BlueprintGrid";
import { MouseTracker } from "@/components/architecture/MouseTracker";
import { site } from "@/data/site";

export const metadata = {
  metadataBase: new URL("https://architect.example.com"),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "معمار",
    "پورتفولیو معماری",
    "طراحی معماری",
    site.name,
    "آرشام سراجی",
    "طراحی داخلی",
    "پروژه معماری",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F1EC" },
    { media: "(prefers-color-scheme: dark)", color: "#16181C" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  // Prevent theme flash: a tiny inline script decides the initial theme
  // before paint. Light Mode is the strict default — dark only if the
  // visitor has explicitly chosen it before. This is the ONLY system;
  // there is no next-themes to conflict with.
  const themeInit = `(function(){try{
    var stored = localStorage.getItem('theme');
    if (stored === 'dark') document.documentElement.classList.add('dark');
  }catch(e){}})();`;

  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        {/* Subtle animated architectural grid background + cursor tracking */}
        <BlueprintGrid />
        <MouseTracker />

        <SmoothScroll>
          <SiteHeader />
          <main className="flex-1 relative">{children}</main>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  );
}
