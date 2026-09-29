// ===============================================================
//  Site-wide configuration — placeholder identity.
//  Replace `name`, `role`, `contact`, and `socials` with the
//  real architect's information later.
// ===============================================================

export const site = {
  name: "آرشام سراجی",
  nameLatin: "Arsham Seraji",
  role: "معمار و طراح فضا",
  shortRole: "معمار",
  description:
    "پورتفولیوی پروژه‌های معماری آرشام سراجی؛ طراحی فضاهایی با نگاه به انسان، فرم و زمینه.",
  tagline: "طراحی فضاهایی متفاوت، با نگاه به انسان، فرم و زمینه.",
  location: "تهران، ایران",
  email: "studio@arshamseraji.example",
  phone: "+98 21 0000 0000",
  // generic location — never expose a private address
  coordsLabel: "تهران، ایران",
  socials: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    telegram: "https://telegram.org/",
  },
  nav: [
    { label: "خانه", href: "/" },
    { label: "پروژه‌ها", href: "/projects" },
    { label: "درباره من", href: "/about" },
    { label: "تماس", href: "/contact" },
  ],
  capabilities: [
    {
      key: "architecture",
      title: "طراحی معماری",
      desc: "طراحی فرم‌های فضایی از مفهوم تا اجرا، با توجه به زمینه، اقلیم و زیست‌انگاری.",
    },
    {
      key: "interior",
      title: "طراحی داخلی",
      desc: "ساخت فضاهای درونی منسجم؛ نور، متریال و تناسبات در خدمت تجربه ساکن.",
    },
    {
      key: "concept",
      title: "طراحی مفهومی",
      desc: "توسعه ایده اولیه، دیاگرام‌های فضایی و سناریوهای طراحی پیش از شکل‌گیری فرم.",
    },
    {
      key: "renovation",
      title: "بازطراحی و بازسازی",
      desc: "بازخوانی فضاهای موجود با حفظ هویت و ارتقای کارایی و تجربه سکونت.",
    },
    {
      key: "residential",
      title: "فضاهای مسکونی",
      desc: "طراحی خانه‌های خصوصی و مجموعه‌های مسکونی با تمرکز بر کیفیت زندگی روزانه.",
    },
    {
      key: "commercial",
      title: "فضاهای تجاری",
      desc: "طراحی فضاهای تجاری و فرهنگی با نگاه به تجربه کاربر و هویت برند.",
    },
  ],
};

export const navItems = site.nav;
