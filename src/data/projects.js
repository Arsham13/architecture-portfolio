// ===============================================================
//  Projects data — local, static, easily extensible.
//
//  To add a new project, copy one of the objects below, change the
//  `slug` and content, and drop the matching image files under
//  /public/images/projects/<slug>/.
//
//  All fields are OPTIONAL except: slug, title, category, year,
//  shortDescription, cover. Empty arrays hide their sections
//  automatically on the detail page.
// ===============================================================

/**
 * @typedef {Object} Project
 * @property {string} slug            — url-safe id, used in /projects/[slug]
 * @property {string} title           — project title (Persian)
 * @property {string} category       — high-level category (Persian)
 * @property {string} year           — completion year (Persian digits ok)
 * @property {string} location       — general location only
 * @property {string} [area]          — built area
 * @property {string} [status]        — e.g. "اجراشده", "طراحی"
 * @property {string} shortDescription
 * @property {string} [concept]      — architectural concept paragraph
 * @property {string} [fullDescription]
 * @property {string} cover          — cover image path
 * @property {string[]} [gallery]    — rendered photographs
 * @property {Array<{src:string,label?:string}>} [plans]
 * @property {Array<{src:string,label?:string}>} [sections]
 * @property {Array<{src:string,label?:string}>} [renders]
 * @property {string[]} [tags]
 * @property {boolean} [featured]    — show on homepage selection
 */

export const projects = [
  {
    slug: "villa-ye-khati",
    title: "ویلای خطی",
    category: "مسکونی",
    year: "۱۴۰۲",
    location: "تهران، ایران",
    area: "۴۸۰ مترمربع",
    status: "اجراشده",
    shortDescription:
      "ویلایی خطی در امتداد شیب زمین، با شکست حجمی برای عبور نور و نسیم به درون.",
    concept:
      "ایده‌ی پروژه شکل‌گیری حجمی خطی در امتداد شیب طبیعی زمین بود؛ خطی که خود را با زمین هم‌سو می‌کند اما از آن جدا می‌ماند. شکست حجمی در میانه‌ی حجم، عبور نور جنوب را به درون می‌آورد و هم یک حیاط درونی می‌سازد.",
    fullDescription:
      "ویلای خطی پاسخی است به زمینی با شیب ملایم و چشم‌انداز جنوبی. حجم اصلی پروژه به‌صورت یک نوار افقی امتداد یافته که در یک‌سوم میانه شکسته می‌شود؛ این شکست هم zonبندی نور طبیعی را در عمق فضا حل می‌کند و هم یک حیاط درونی خصوصی می‌سازد. متریال اصلی بتن اکسپوز با چوب به‌عنوان عنصر گرم‌کننده‌ی تماس انسان است.",
    cover: "/images/projects/villa-ye-khati/cover.jpg",
    gallery: [
      "/images/projects/villa-ye-khati/gallery-1.jpg",
      "/images/projects/villa-ye-khati/gallery-2.jpg",
      "/images/projects/villa-ye-khati/gallery-3.jpg",
    ],
    plans: [
      { src: "/images/projects/villa-ye-khati/plan-ground.svg", label: "طبقه همکف" },
      { src: "/images/projects/villa-ye-khati/plan-first.svg", label: "طبقه اول" },
    ],
    sections: [
      { src: "/images/projects/villa-ye-khati/section-aa.svg", label: "برش A-A" },
    ],
    renders: [
      "/images/projects/villa-ye-khati/render-1.jpg",
    ],
    tags: ["مسکونی", "بتن اکسپوز", "حیاط درونی", "نور طبیعی"],
    featured: true,
  },
  {
    slug: "khane-ye-hayat-markazi",
    title: "خانه حیاط مرکزی",
    category: "مسکونی",
    year: "۱۴۰۱",
    location: "اصفهان، ایران",
    area: "۳۲۰ مترمربع",
    status: "اجراشده",
    shortDescription:
      "خانه‌ای پیرامون حیاط مرکزی؛ بازخوانی نوع‌شناسی خانه‌ی ایرانی با زبان معاصر.",
    concept:
      "این پروژه بازخوانی نوع‌شناسی خانه‌ی حیاط‌مرکزی ایرانی است. حیاط در مرکز قرار گرفته و تمام فضاها پیرامون آن تنظیم شده‌اند. نور، آب و درختان حیاط، قلب تجربه‌ی سکونت را می‌سازند.",
    fullDescription:
      "خانه حیاط مرکزی تلاشی برای بازخوانی نوع‌شناسی کهن خانه‌ی ایرانی با زبان معاصر است. حیاط مرکزی قلب فضا و تنظیم‌کننده‌ی نور، هوا و جهت‌گیری است. فضاهای عمومی در طبقه همکف و فضاهای خصوصی در طبقه بالا پیرامون حیاط چیده شده‌اند. متریال‌های بومی با جزئیات معاصر ترکیب شده‌اند.",
    cover: "/images/projects/khane-ye-hayat-markazi/cover.jpg",
    gallery: [
      "/images/projects/khane-ye-hayat-markazi/gallery-1.jpg",
      "/images/projects/khane-ye-hayat-markazi/gallery-2.jpg",
    ],
    plans: [
      { src: "/images/projects/khane-ye-hayat-markazi/plan-ground.svg", label: "طبقه همکف" },
    ],
    sections: [],
    renders: [],
    tags: ["مسکونی", "حیاط مرکزی", "نوع‌شناسی ایرانی", "متریال بومی"],
    featured: true,
  },
  {
    slug: "baztarahi-aparteman-qadimi",
    title: "بازطراحی آپارتمان قدیمی",
    category: "بازسازی",
    year: "۱۴۰۲",
    location: "تهران، ایران",
    area: "۱۴۰ مترمربع",
    status: "اجراشده",
    shortDescription:
      "بازطراحی یک آپارتمان ۵۰ ساله با حفظ ساخت اصلی و بازتعریف تجربه‌ی سکونت.",
    concept:
      "ساختار اصلی آپارتمان حفظ شد اما چیدمان فضایی کاملاً بازتعریف شد. هدف ایجاد جریان فضایی آزاد و ورود حداکثر نور به عمق خانه بود.",
    fullDescription:
      "این پروژه بازطراحی یک آپارتمان ۵۰ ساله در مرکز شهر است. ساختار باربر حفظ شد اما تمام دیواره‌های غیرسازهای برداشته شدند و چیدمان جدیدی بر پایه‌ی جریان آزاد نور و حرکت شکل گرفت. متریال روشن و سطوح پیوسته حس وسعت را در مساحتی محدود ایجاد می‌کنند.",
    cover: "/images/projects/baztarahi-aparteman-qadimi/cover.jpg",
    gallery: [
      "/images/projects/baztarahi-aparteman-qadimi/gallery-1.jpg",
      "/images/projects/baztarahi-aparteman-qadimi/gallery-2.jpg",
      "/images/projects/baztarahi-aparteman-qadimi/gallery-3.jpg",
    ],
    plans: [
      { src: "/images/projects/baztarahi-aparteman-qadimi/plan-before-after.svg", label: "پیش و پس" },
    ],
    sections: [],
    renders: [],
    tags: ["بازسازی", "مسکونی", "حفظ ساختار", "نورپردازی"],
    featured: true,
  },
  {
    slug: "majmooe-farhangi",
    title: "مجموعه چندمنظوره فرهنگی",
    category: "فرهنگی",
    year: "۱۴۰۰",
    location: "شیراز، ایران",
    area: "۲٬۴۰۰ مترمربع",
    status: "طراحی",
    shortDescription:
      "مجموعه‌ای فرهنگی با گالری، کارگاه و فضای هم‌اندیشی پیرامون میدان مرکزی.",
    concept:
      "مجموعه پیرامون یک میدان مرکزی هم‌سطح شکل گرفته است. حجم‌ها با شکست و چرخش، به میدان پاسخ می‌دهند و مسیرهای عبور از میان مجموعه را ممکن می‌سازند.",
    fullDescription:
      "مجموعه چندمنظوره فرهنگی شامل گالری، کارگاه، فضای هم‌اندیشی و کافه است. حجم‌ها پیرامون یک میدان مرکزی هم‌سطح تنظیم شده‌اند که قلب عمومی مجموعه و نقطه‌ی اتصال شهری است. سقف‌های شیبدار و نورگیرهای شیبدار کنترل‌شده، فضا را برای نمایش آثار مناسب می‌سازند.",
    cover: "/images/projects/majmooe-farhangi/cover.jpg",
    gallery: [
      "/images/projects/majmooe-farhangi/gallery-1.jpg",
      "/images/projects/majmooe-farhangi/gallery-2.jpg",
    ],
    plans: [
      { src: "/images/projects/majmooe-farhangi/plan-ground.svg", label: "طبقه همکف" },
      { src: "/images/projects/majmooe-farhangi/plan-second.svg", label: "طبقه دوم" },
    ],
    sections: [
      { src: "/images/projects/majmooe-farhangi/section-bb.svg", label: "برش B-B" },
    ],
    renders: [
      "/images/projects/majmooe-farhangi/render-1.jpg",
      "/images/projects/majmooe-farhangi/render-2.jpg",
    ],
    tags: ["فرهنگی", "گالری", "میدان مرکزی", "نورگیر"],
    featured: true,
  },
  {
    slug: "gallery-tejari-moaser",
    title: "گالری و فضای تجاری معاصر",
    category: "تجاری",
    year: "۱۴۰۱",
    location: "تهران، ایران",
    area: "۲۲۰ مترمربع",
    status: "اجراشده",
    shortDescription:
      "فضای تجاری و نمایشگاهی با حجم منعطف و نورپردازی نمایشگاهی کنترل‌شده.",
    concept:
      "فضا به‌عنوان یک بوم خنثی برای نمایش محصول طراحی شد. سطوح خنثی، نور کنترل‌شده و چیدمان منعطف، اولویت اول طراحی بودند.",
    fullDescription:
      "این پروژه یک فضای تجاری و نمایشگاهی است که به‌عنوان بومی خنثی برای نمایش محصول طراحی شده است. دیواره‌های قابل‌جابجایی، سقف معلق با نورپردازی کنترل‌شده و کف پیوسته، امکان تغییر چیدمان را بدون تخریب فراهم می‌کند.",
    cover: "/images/projects/gallery-tejari-moaser/cover.jpg",
    gallery: [
      "/images/projects/gallery-tejari-moaser/gallery-1.jpg",
      "/images/projects/gallery-tejari-moaser/gallery-2.jpg",
    ],
    plans: [],
    sections: [],
    renders: [
      "/images/projects/gallery-tejari-moaser/render-1.jpg",
    ],
    tags: ["تجاری", "نمایشگاهی", "فضای منعطف", "نورپردازی"],
    featured: false,
  },
  {
    slug: "khane-tatilat-kohestani",
    title: "خانه تعطیلات کوهستانی",
    category: "مسکونی",
    year: "۱۴۰۰",
    location: "البرز، ایران",
    area: "۱۸۰ مترمربع",
    status: "طراحی",
    shortDescription:
      "خانه‌ای کوهستانی با حجمی چندگانه که به چشم‌انداز دره باز می‌شود.",
    concept:
      "حجم خانه از سه بلوک کوچک تشکیل شده که با زاویه‌ی متفاوت به چشم‌انداز دره باز می‌شوند. هر بلوک یک تجربه‌ی بصری متفاوت از طبیعت ارائه می‌دهد.",
    fullDescription:
      "خانه تعطیلات کوهستانی از سه بلوک کوچک تشکیل شده که با زوایای متفاوت به چشم‌انداز دره باز می‌شوند. بلوک‌ها با یک مسیر شفاف به هم متصل می‌شوند. متریال اصلی سنگ محلی و چوب است تا فضا با طبیعت پیرامون هم‌سو باشد.",
    cover: "/images/projects/khane-tatilat-kohestani/cover.jpg",
    gallery: [
      "/images/projects/khane-tatilat-kohestani/gallery-1.jpg",
    ],
    plans: [
      { src: "/images/projects/khane-tatilat-kohestani/plan-ground.svg", label: "طبقه همکف" },
    ],
    sections: [],
    renders: [
      "/images/projects/khane-tatilat-kohestani/render-1.jpg",
    ],
    tags: ["مسکونی", "کوهستانی", "چشم‌انداز", "سنگ و چوب"],
    featured: false,
  },
];

// ---------- helpers ----------

export function getAllProjects() {
  return projects;
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) || null;
}

export function getAdjacentProjects(slug) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  // RTL: "next project" visually points to the right→left.
  // We keep array order as the reading order; "next" = the project
  // that follows in array order, displayed with an RTL arrow.
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];
  return { prev, next };
}

export function getAllTags() {
  const set = new Set();
  projects.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
  return Array.from(set);
}
