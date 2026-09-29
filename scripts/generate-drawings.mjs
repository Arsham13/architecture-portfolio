#!/usr/bin/env node
// ===============================================================
//  Generate architectural SVG placeholder drawings (plans + sections)
//  for each project. These are intentionally simple line drawings
//  on a paper background — easy to replace with real CAD exports
//  later. Run once: `bun run scripts/generate-drawings.mjs`
// ===============================================================
import fs from "fs";
import path from "path";
import { getAllProjects } from "../src/data/projects.js";

const ROOT = path.resolve(process.cwd());

// A library of plan/section generators. Each returns an SVG string.
// They share a paper background, fine grid, technical line color,
// a few dimension lines and section markers.

const W = 1200;
const H = 800;

const paperBg = "#F3F1EC";
const lineCol = "#7a7468";
const inkCol = "#1f1d18";
const accentCol = "#9c4a2e";

function head(title, subtitle) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Estedad, Tahoma, sans-serif">
  <rect width="${W}" height="${H}" fill="${paperBg}"/>
  <defs>
    <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${lineCol}" stroke-width="0.5" opacity="0.35"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <!-- outer frame -->
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" fill="none" stroke="${inkCol}" stroke-width="1"/>
  <!-- title block -->
  <text x="60" y="74" font-size="14" fill="${inkCol}" font-weight="700" letter-spacing="2">${title}</text>
  <text x="60" y="94" font-size="11" fill="${lineCol}" letter-spacing="1">${subtitle}</text>`;
}

const foot = `</svg>`;

function dim(x1, y1, x2, y2, label) {
  // a small dimension line with end ticks + label
  const tickLen = 8;
  return `
  <g stroke="${lineCol}" stroke-width="0.75" fill="none">
    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>
    <line x1="${x1}" y1="${y1 - tickLen / 2}" x2="${x1}" y2="${y1 + tickLen / 2}"/>
    <line x1="${x2}" y1="${y2 - tickLen / 2}" x2="${x2}" y2="${y2 + tickLen / 2}"/>
  </g>
  <text x="${(x1 + x2) / 2}" y="${y1 - 6}" font-size="10" fill="${lineCol}" text-anchor="middle" letter-spacing="1">${label}</text>`;
}

function sectionMarker(letter, x, y) {
  return `
  <g>
    <circle cx="${x}" cy="${y}" r="11" fill="none" stroke="${inkCol}" stroke-width="1"/>
    <text x="${x}" y="${y + 4}" font-size="11" fill="${inkCol}" text-anchor="middle" font-weight="700">${letter}</text>
  </g>`;
}

// ---- generators per slug ----

function linearVillaGround() {
  return head("ویلای خطی — پلان همکف", "طبقه همکف / مقیاس نمایشی")
    + `
  <!-- site -->
  <rect x="80" y="140" width="${W - 160}" height="420" fill="none" stroke="${lineCol}" stroke-width="0.5" stroke-dasharray="4 4"/>
  <!-- main volume -->
  <rect x="140" y="220" width="${W - 280}" height="160" fill="none" stroke="${inkCol}" stroke-width="1.5"/>
  <!-- central void break -->
  <rect x="${W / 2 - 40}" y="220" width="80" height="160" fill="${paperBg}" stroke="${inkCol}" stroke-width="1.5"/>
  <circle cx="${W / 2}" cy="300" r="18" fill="none" stroke="${accentCol}" stroke-width="1"/>
  <text x="${W / 2}" y="304" font-size="10" fill="${accentCol}" text-anchor="middle">حیاط</text>
  <!-- secondary wing -->
  <rect x="140" y="420" width="${W - 280}" height="100" fill="none" stroke="${inkCol}" stroke-width="1.5"/>
  <!-- labels -->
  <text x="220" y="310" font-size="11" fill="${inkCol}">پذیرایی</text>
  <text x="${W - 280}" y="310" font-size="11" fill="${inkCol}">آشپزخانه</text>
  <text x="220" y="480" font-size="11" fill="${inkCol}">خواب اصلی</text>
  <!-- entry -->
  <line x1="140" y1="540" x2="140" y2="580" stroke="${inkCol}" stroke-width="1"/>
  <text x="150" y="575" font-size="10" fill="${inkCol}">ورودی</text>
  ${dim(140, 600, W - 140, 600, "طول حجم اصلی")}
  ${dim(W - 120, 220, W - 120, 540, "عرض")}
  ${sectionMarker("A", 200, 220)}
  ${sectionMarker("A'", W - 200, 220)}
  ` + foot;
}

function linearVillaFirst() {
  return head("ویلای خطی — پلان طبقه اول", "طبقه اول / مقیاس نمایشی")
    + `
  <rect x="140" y="220" width="${W - 280}" height="280" fill="none" stroke="${inkCol}" stroke-width="1.5"/>
  <line x1="${W / 2}" y1="220" x2="${W / 2}" y2="500" stroke="${lineCol}" stroke-width="0.75" stroke-dasharray="4 4"/>
  <text x="220" y="320" font-size="11" fill="${inkCol}">خواب ۱</text>
  <text x="220" y="430" font-size="11" fill="${inkCol}">خواب ۲</text>
  <text x="${W - 320}" y="320" font-size="11" fill="${inkCol}">نشیمن</text>
  <text x="${W - 320}" y="430" font-size="11" fill="${inkCol}">مطالعه</text>
  ${dim(140, 540, W - 140, 540, "طول طبقه")}
  ` + foot;
}

function linearVillaSection() {
  return head("ویلای خطی — برش A-A", "برش طولی / نمایشی")
    + `
  <!-- ground line -->
  <line x1="100" y1="500" x2="${W - 100}" y2="500" stroke="${inkCol}" stroke-width="1.5"/>
  <g stroke="${lineCol}" stroke-width="0.5" stroke-dasharray="2 4">
    <line x1="100" y1="500" x2="100" y2="560"/>
    <line x1="${W - 100}" y1="500" x2="${W - 100}" y2="560"/>
  </g>
  <text x="120" y="540" font-size="10" fill="${lineCol}">سطح زمین</text>
  <!-- ground floor -->
  <rect x="160" y="380" width="${W - 320}" height="120" fill="none" stroke="${inkCol}" stroke-width="1.5"/>
  <!-- first floor -->
  <rect x="160" y="240" width="${W - 320}" height="140" fill="none" stroke="${inkCol}" stroke-width="1.5"/>
  <!-- central void (double height) -->
  <rect x="${W / 2 - 50}" y="240" width="100" height="260" fill="${paperBg}" stroke="${inkCol}" stroke-width="1"/>
  <!-- roof -->
  <line x1="160" y1="240" x2="${W - 160}" y2="240" stroke="${inkCol}" stroke-width="1.5"/>
  <!-- light arrow -->
  <line x1="${W / 2}" y1="180" x2="${W / 2}" y2="240" stroke="${accentCol}" stroke-width="1"/>
  <polygon points="${W / 2 - 6},234 ${W / 2 + 6},234 ${W / 2},246" fill="${accentCol}"/>
  <text x="${W / 2 + 12}" y="210" font-size="10" fill="${accentCol}">نور</text>
  ${dim(160, 580, W - 160, 580, "برش طولی")}
  ` + foot;
}

function courtyardGround() {
  return head("خانه حیاط مرکزی — پلان همکف", "طبقه همکف / مقیاس نمایشی")
    + `
  <!-- outer perimeter -->
  <rect x="120" y="160" width="${W - 240}" height="${H - 240}" fill="none" stroke="${inkCol}" stroke-width="1.5"/>
  <!-- central courtyard -->
  <rect x="${W / 2 - 110}" y="${H / 2 - 90}" width="220" height="180" fill="none" stroke="${inkCol}" stroke-width="1.5"/>
  <!-- pool -->
  <rect x="${W / 2 - 50}" y="${H / 2 - 20}" width="100" height="40" fill="${lineCol}" opacity="0.15" stroke="${lineCol}" stroke-width="0.75"/>
  <text x="${W / 2}" y="${H / 2 + 4}" font-size="10" fill="${lineCol}" text-anchor="middle">استخر</text>
  <!-- tree -->
  <circle cx="${W / 2 - 80}" cy="${H / 2 - 60}" r="14" fill="none" stroke="${inkCol}" stroke-width="0.75"/>
  <circle cx="${W / 2 + 80}" cy="${H / 2 + 60}" r="14" fill="none" stroke="${inkCol}" stroke-width="0.75"/>
  <!-- room labels -->
  <text x="160" y="240" font-size="11" fill="${inkCol}">پذیرایی</text>
  <text x="${W - 260}" y="240" font-size="11" fill="${inkCol}">آشپزخانه</text>
  <text x="160" y="${H - 200}" font-size="11" fill="${inkCol}">خواب مهمان</text>
  <text x="${W - 260}" y="${H - 200}" font-size="11" fill="${inkCol}">خدمات</text>
  <!-- entry -->
  <line x1="120" y1="${H / 2}" x2="100" y2="${H / 2}" stroke="${inkCol}" stroke-width="1.5"/>
  <text x="80" y="${H / 2 + 20}" font-size="10" fill="${inkCol}" text-anchor="end">ورودی</text>
  ${dim(120, H - 80, W - 120, H - 80, "عرض")}
  ${sectionMarker("A", W / 2 - 110, H / 2 - 90)}
  ${sectionMarker("A'", W / 2 - 110, H / 2 + 90)}
  ` + foot;
}

function renovationBeforeAfter() {
  return head("بازطراحی آپارتمان — پیش و پس", "مقایسه چیدمان / نمایشی")
    + `
  <!-- divider -->
  <line x1="${W / 2}" y1="120" x2="${W / 2}" y2="${H - 120}" stroke="${lineCol}" stroke-width="0.75" stroke-dasharray="6 6"/>
  <text x="${W / 4}" y="150" font-size="13" fill="${inkCol}" text-anchor="middle" font-weight="700">پیش از بازطراحی</text>
  <text x="${3 * W / 4}" y="150" font-size="13" fill="${inkCol}" text-anchor="middle" font-weight="700">پس از بازطراحی</text>
  <!-- before: many small rooms -->
  <g stroke="${lineCol}" stroke-width="1" fill="none">
    <rect x="120" y="200" width="${W / 2 - 200}" height="${H - 320}"/>
    <line x1="${W / 2 - 260}" y1="200" x2="${W / 2 - 260}" y2="${H - 120}"/>
    <line x1="120" y1="${(200 + H - 120) / 2}" x2="${W / 2 - 260}" y2="${(200 + H - 120) / 2}"/>
    <line x1="${W / 2 - 260}" y1="280" x2="${W / 2 - 120}" y2="280"/>
    <line x1="${W / 2 - 260}" y1="420" x2="${W / 2 - 120}" y2="420"/>
  </g>
  <!-- after: open plan -->
  <g stroke="${inkCol}" stroke-width="1.5" fill="none">
    <rect x="${W / 2 + 80}" y="200" width="${W / 2 - 200}" height="${H - 320}"/>
    <line x1="${W / 2 + 80}" y1="${(200 + H - 120) / 2}" x2="${W - 120}" y2="${(200 + H - 120) / 2}" stroke-dasharray="4 4"/>
  </g>
  <text x="${W / 4}" y="${(200 + H - 120) / 2}" font-size="10" fill="${lineCol}" text-anchor="middle">۴ اتاق مجزا</text>
  <text x="${3 * W / 4}" y="${(200 + H - 120) / 2}" font-size="10" fill="${inkCol}" text-anchor="middle">فضای باز پیوسته</text>
  ` + foot;
}

function culturalGround() {
  return head("مجموعه فرهنگی — پلان همکف", "طبقه همکف / مقیاس نمایشی")
    + `
  <!-- central plaza -->
  <rect x="${W / 2 - 160}" y="${H / 2 - 120}" width="320" height="240" fill="${lineCol}" opacity="0.1" stroke="${lineCol}" stroke-width="0.75" stroke-dasharray="4 4"/>
  <text x="${W / 2}" y="${H / 2}" font-size="11" fill="${inkCol}" text-anchor="middle">میدان مرکزی</text>
  <!-- offset volumes -->
  <g stroke="${inkCol}" stroke-width="1.5" fill="none">
    <rect x="120" y="180" width="280" height="180"/>
    <rect x="${W - 400}" y="180" width="280" height="220"/>
    <rect x="120" y="${H - 320}" width="320" height="160"/>
    <rect x="${W - 380}" y="${H - 360}" width="260" height="200"/>
  </g>
  <text x="180" y="260" font-size="11" fill="${inkCol}">گالری</text>
  <text x="${W - 340}" y="260" font-size="11" fill="${inkCol}">کارگاه</text>
  <text x="180" y="${H - 240}" font-size="11" fill="${inkCol}">کافه</text>
  <text x="${W - 320}" y="${H - 280}" font-size="11" fill="${inkCol}">فضای هم‌اندیشی</text>
  ${sectionMarker("B", W / 2 - 160, H / 2 - 120)}
  ${sectionMarker("B'", W / 2 - 160, H / 2 + 120)}
  ` + foot;
}

function culturalSecond() {
  return head("مجموعه فرهنگی — پلان طبقه دوم", "طبقه دوم / مقیاس نمایشی")
    + `
  <g stroke="${inkCol}" stroke-width="1.5" fill="none">
    <rect x="120" y="180" width="${W - 240}" height="200"/>
    <rect x="${W / 2 - 60}" y="180" width="120" height="200" fill="${paperBg}"/>
  </g>
  <text x="${W / 2}" y="290" font-size="10" fill="${lineCol}" text-anchor="middle">چاه نور</text>
  <text x="200" y="290" font-size="11" fill="${inkCol}">گالری شمالی</text>
  <text x="${W - 320}" y="290" font-size="11" fill="${inkCol}">گالری جنوبی</text>
  <rect x="120" y="${H - 260}" width="${W - 240}" height="120" fill="none" stroke="${inkCol}" stroke-width="1.5"/>
  <text x="200" y="${H - 190}" font-size="11" fill="${inkCol}">فضای نمایشگاهی</text>
  ` + foot;
}

function culturalSection() {
  return head("مجموعه فرهنگی — برش B-B", "برش طولی / نمایشی")
    + `
  <line x1="100" y1="520" x2="${W - 100}" y2="520" stroke="${inkCol}" stroke-width="1.5"/>
  <g stroke="${inkCol}" stroke-width="1.5" fill="none">
    <rect x="140" y="380" width="240" height="140"/>
    <rect x="${W - 380}" y="380" width="240" height="140"/>
    <rect x="140" y="240" width="${W - 280}" height="140"/>
  </g>
  <!-- skylight -->
  <polygon points="${W / 2 - 40},240 ${W / 2 + 40},240 ${W / 2},200" fill="${paperBg}" stroke="${inkCol}" stroke-width="1.5"/>
  <line x1="${W / 2}" y1="180" x2="${W / 2}" y2="200" stroke="${accentCol}" stroke-width="1"/>
  <polygon points="${W / 2 - 5},194 ${W / 2 + 5},194 ${W / 2},204" fill="${accentCol}"/>
  <text x="${W / 2 + 12}" y="190" font-size="10" fill="${accentCol}">نورگیر</text>
  ${dim(140, 560, W - 140, 560, "برش طولی")}
  ` + foot;
}

function galleryPlan() {
  // not used directly but kept for completeness
  return head("گالری تجاری — پلان", "نمایشی") + foot;
}

function mountainGround() {
  return head("خانه کوهستانی — پلان همکف", "سه بلوک با زاویه / مقیاس نمایشی")
    + `
  <!-- topography indication -->
  <g stroke="${lineCol}" stroke-width="0.5" fill="none">
    <path d="M 80 200 Q ${W / 2} 160 ${W - 80} 200"/>
    <path d="M 80 260 Q ${W / 2} 220 ${W - 80} 260"/>
    <path d="M 80 320 Q ${W / 2} 280 ${W - 80} 320"/>
  </g>
  <!-- three offset volumes -->
  <g stroke="${inkCol}" stroke-width="1.5" fill="none">
    <rect x="160" y="380" width="240" height="140" transform="rotate(-8 280 450)"/>
    <rect x="${W / 2 - 110}" y="380" width="220" height="140"/>
    <rect x="${W - 380}" y="380" width="240" height="140" transform="rotate(8 ${W - 260} 450)"/>
  </g>
  <text x="180" y="440" font-size="11" fill="${inkCol}">بلوک ۱</text>
  <text x="${W / 2 - 30}" y="440" font-size="11" fill="${inkCol}">بلوک ۲</text>
  <text x="${W - 320}" y="440" font-size="11" fill="${inkCol}">بلوک ۳</text>
  <!-- connector -->
  <line x1="400" y1="450" x2="${W / 2 - 110}" y2="450" stroke="${inkCol}" stroke-width="1" stroke-dasharray="4 4"/>
  <line x1="${W / 2 + 110}" y1="450" x2="${W - 380}" y2="450" stroke="${inkCol}" stroke-width="1" stroke-dasharray="4 4"/>
  <text x="${W / 2}" y="600" font-size="10" fill="${lineCol}" text-anchor="middle">چشم‌انداز دره</text>
  ${dim(160, 660, W - 160, 660, "طول کل")}
  ` + foot;
}

// map: project slug → drawing files to generate
const drawings = {
  "villa-ye-khati": {
    "plan-ground.svg": linearVillaGround,
    "plan-first.svg": linearVillaFirst,
    "section-aa.svg": linearVillaSection,
  },
  "khane-ye-hayat-markazi": {
    "plan-ground.svg": courtyardGround,
  },
  "baztarahi-aparteman-qadimi": {
    "plan-before-after.svg": renovationBeforeAfter,
  },
  "majmooe-farhangi": {
    "plan-ground.svg": culturalGround,
    "plan-second.svg": culturalSecond,
    "section-bb.svg": culturalSection,
  },
  "khane-tatilat-kohestani": {
    "plan-ground.svg": mountainGround,
  },
};

function main() {
  let count = 0;
  for (const [slug, files] of Object.entries(drawings)) {
    for (const [fname, gen] of Object.entries(files)) {
      const outPath = path.join(ROOT, "public/images/projects", slug, fname);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      if (fs.existsSync(outPath) && fs.statSync(outPath).size > 200) {
        console.log(`[skip] ${slug}/${fname}`);
        continue;
      }
      const svg = gen();
      fs.writeFileSync(outPath, svg, "utf8");
      console.log(`[ ok ] ${slug}/${fname}  (${svg.length} bytes)`);
      count++;
    }
  }
  console.log(`\nDone. ${count} drawings generated.`);
}

main();
