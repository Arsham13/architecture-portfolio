// ===============================================================
//  Placeholder architectural image generator.
//  Run once: `bun run scripts/generate-images.mjs`
//
//  All images are saved locally under /public/images/...
//  They are intentionally easy to replace later with real
//  project photography. Prompts target an architectural,
//  editorial, warm-paper monochrome aesthetic.
//
//  API constraint: width/height must each be a multiple of 32,
//  in [512, 2880], max 2^22 pixels.
// ===============================================================
import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd());

const LAND = "1344x768"; // landscape (both ÷32 integer)
const SQ = "1024x1024"; // square
const PORT = "864x1152"; // portrait

const jobs = [
  // ---- Hero ----
  {
    out: "public/images/architecture/hero.jpg",
    size: LAND,
    prompt:
      "Architectural photograph of a minimalist contemporary concrete house at golden hour, long horizontal volume, exposed board-formed concrete and warm wood, large deep openings casting sharp shadows, warm off-white paper tone, editorial architectural photography, soft natural light, no people, calm precise composition, fine art, muted earth palette",
  },
  // ---- Project 1: Linear Villa ----
  {
    out: "public/images/projects/villa-ye-khati/cover.jpg",
    size: LAND,
    prompt:
      "Exterior architectural photograph of a linear modern villa set on a sloping terrain, long horizontal concrete volume with a central void break, exposed concrete and timber slats, large frameless glass, strong cast shadows at golden hour, warm paper-white tones, editorial architecture, no people",
  },
  {
    out: "public/images/projects/villa-ye-khati/gallery-1.jpg",
    size: SQ,
    prompt:
      "Architectural interior of a minimalist concrete villa, double-height living space, warm wood floor, deep south light shaft, exposed concrete walls, calm editorial composition, warm neutral tones, no people",
  },
  {
    out: "public/images/projects/villa-ye-khati/gallery-2.jpg",
    size: SQ,
    prompt:
      "Architectural detail of a concrete and timber staircase in a minimalist villa, sharp raking light, shadow play, warm off-white paper tone, editorial architectural photography, no people",
  },
  {
    out: "public/images/projects/villa-ye-khati/gallery-3.jpg",
    size: SQ,
    prompt:
      "Interior courtyard of a minimalist villa, small tree, concrete frame, raking afternoon light, reflective water feature, warm neutral architectural photography, no people",
  },
  {
    out: "public/images/projects/villa-ye-khati/render-1.jpg",
    size: LAND,
    prompt:
      "Architectural render of a linear concrete villa at dusk, warm interior glowing through frameless glass, exterior landscape, long shadows, photorealistic editorial render, warm paper tones",
  },

  // ---- Project 2: Central Courtyard House ----
  {
    out: "public/images/projects/khane-ye-hayat-markazi/cover.jpg",
    size: LAND,
    prompt:
      "Architectural photograph of a contemporary Iranian courtyard house, central courtyard with a tree and small pool, two-story concrete and plaster facade with vertical wood screens, warm afternoon light, editorial architectural photography, no people",
  },
  {
    out: "public/images/projects/khane-ye-hayat-markazi/gallery-1.jpg",
    size: SQ,
    prompt:
      "Central courtyard of a contemporary house, small rectangular pool, single tree, two-story facade wrapping around, warm plaster and concrete, raking light, editorial architectural photography, no people",
  },
  {
    out: "public/images/projects/khane-ye-hayat-markazi/gallery-2.jpg",
    size: SQ,
    prompt:
      "Interior corridor overlooking a central courtyard, vertical wood lattice screen casting shadow patterns on concrete floor, warm neutral architectural photography, no people",
  },

  // ---- Project 3: Old Apartment Renovation ----
  {
    out: "public/images/projects/baztarahi-aparteman-qadimi/cover.jpg",
    size: LAND,
    prompt:
      "Architectural photograph of a renovated apartment interior, open-plan living space with white microcement walls, light oak floor, large windows with sheer curtains, minimalist furniture, warm bright daylight, editorial interior photography, no people",
  },
  {
    out: "public/images/projects/baztarahi-aparteman-qadimi/gallery-1.jpg",
    size: SQ,
    prompt:
      "Renovated apartment kitchen, white microcement surfaces, light oak cabinetry, warm natural light, minimalist architectural interior, editorial photography, no people",
  },
  {
    out: "public/images/projects/baztarahi-aparteman-qadimi/gallery-2.jpg",
    size: SQ,
    prompt:
      "Renovated apartment living corner, white plaster walls, warm wood floor, soft raking daylight, minimalist architectural interior, editorial photography, no people",
  },
  {
    out: "public/images/projects/baztarahi-aparteman-qadimi/gallery-3.jpg",
    size: SQ,
    prompt:
      "Renovated apartment hallway, continuous white microcement, flush doors, warm recessed lighting, minimalist architectural detail, editorial photography, no people",
  },

  // ---- Project 4: Multi-purpose Cultural Complex ----
  {
    out: "public/images/projects/majmooe-farhangi/cover.jpg",
    size: LAND,
    prompt:
      "Architectural photograph of a contemporary cultural complex, cluster of offset volumes around a central plaza, exposed concrete and travertine, deep openings, large skylights, warm evening light, editorial architectural photography, no people",
  },
  {
    out: "public/images/projects/majmooe-farhangi/gallery-1.jpg",
    size: SQ,
    prompt:
      "Interior of a gallery space in a cultural complex, white walls, polished concrete floor, controlled skylight washing the wall with even light, minimalist, editorial architectural photography, no people",
  },
  {
    out: "public/images/projects/majmooe-farhangi/gallery-2.jpg",
    size: SQ,
    prompt:
      "Central plaza of a cultural complex between concrete volumes, water feature, warm sunset light, editorial architectural photography, no people",
  },
  {
    out: "public/images/projects/majmooe-farhangi/render-1.jpg",
    size: LAND,
    prompt:
      "Architectural render of a cultural complex at dusk, glowing volumes, exposed concrete and warm wood interior glow, plaza in foreground, photorealistic editorial render, warm tones",
  },
  {
    out: "public/images/projects/majmooe-farhangi/render-2.jpg",
    size: SQ,
    prompt:
      "Architectural render of a skylit gallery corridor, controlled daylight on a white wall, polished concrete floor, photorealistic editorial render, warm tones",
  },

  // ---- Project 5: Gallery & Commercial Space ----
  {
    out: "public/images/projects/gallery-tejari-moaser/cover.jpg",
    size: LAND,
    prompt:
      "Architectural photograph of a contemporary gallery and commercial space, long white volume with flush track lighting, polished concrete floor, movable white partitions, warm even lighting, editorial interior photography, no people",
  },
  {
    out: "public/images/projects/gallery-tejari-moaser/gallery-1.jpg",
    size: SQ,
    prompt:
      "Gallery interior with white walls and flush track lighting, polished concrete floor, minimalist display, warm controlled lighting, editorial architectural photography, no people",
  },
  {
    out: "public/images/projects/gallery-tejari-moaser/gallery-2.jpg",
    size: SQ,
    prompt:
      "Commercial space interior, white volumes, warm wood accent wall, minimalist, even lighting, editorial architectural photography, no people",
  },
  {
    out: "public/images/projects/gallery-tejari-moaser/render-1.jpg",
    size: SQ,
    prompt:
      "Architectural render of a flexible commercial gallery, white partitions on track, polished concrete floor, flush ceiling lighting, photorealistic editorial render, warm tones",
  },

  // ---- Project 6: Mountain Holiday House ----
  {
    out: "public/images/projects/khane-tatilat-kohestani/cover.jpg",
    size: LAND,
    prompt:
      "Architectural photograph of a mountain holiday house, three small offset volumes in local stone and timber, large windows facing a valley, dramatic mountain landscape, warm golden hour light, editorial architectural photography, no people",
  },
  {
    out: "public/images/projects/khane-tatilat-kohestani/gallery-1.jpg",
    size: SQ,
    prompt:
      "Interior of a mountain house, local stone wall, warm timber, large window framing a valley view, soft daylight, minimalist architectural interior, editorial photography, no people",
  },
  {
    out: "public/images/projects/khane-tatilat-kohestani/render-1.jpg",
    size: SQ,
    prompt:
      "Architectural render of a small mountain house at dusk, stone and timber volumes glowing, valley view, photorealistic editorial render, warm tones",
  },

  // ---- About portrait placeholder ----
  {
    out: "public/images/about/portrait.jpg",
    size: PORT,
    prompt:
      "Editorial black and white portrait of a male architect in his forties, standing in a minimalist concrete interior, soft side light, looking thoughtfully off-camera, fine grain, professional architectural portrait, no text",
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function genWithRetry(zai, prompt, size, outPath, maxAttempts = 4) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await zai.images.generations.create({
        prompt,
        size,
      });
      const b64 = res.data[0].base64;
      fs.writeFileSync(outPath, Buffer.from(b64, "base64"));
      return true;
    } catch (e) {
      const msg = String(e.message || "");
      if (msg.includes("429") || msg.includes("Too many requests")) {
        const wait = 5000 * attempt; // 5s, 10s, 15s, 20s
        console.log(`   ↳ rate-limited, waiting ${wait}ms…`);
        await sleep(wait);
        continue;
      }
      if (attempt < maxAttempts) {
        await sleep(2000);
        continue;
      }
      throw e;
    }
  }
  return false;
}

async function run() {
  const zai = await ZAI.create();
  let ok = 0;
  let fail = 0;
  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const outPath = path.join(ROOT, job.out);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 5000) {
      console.log(`[skip] ${job.out} (already exists)`);
      ok++;
      continue;
    }
    try {
      console.log(`[gen ] (${i + 1}/${jobs.length}) ${job.out}  (${job.size})`);
      await genWithRetry(zai, job.prompt, job.size, outPath);
      console.log(`[ ok ] ${job.out}  (${fs.statSync(outPath).size} bytes)`);
      ok++;
    } catch (e) {
      console.error(`[fail] ${job.out}: ${e.message}`);
      fail++;
    }
    // gentle pacing between jobs
    if (i < jobs.length - 1) await sleep(3000);
  }
  console.log(`\nDone. ok=${ok} fail=${fail}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
