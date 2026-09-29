"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE, DURATION } from "@/components/motion/motion";

/* ============================================================
 *  Axonometric projection helpers
 * ============================================================
 *  iso(x, y, z) → 2D screen point.
 *  Standard 30° axonometric: x goes right-down, y goes left-down,
 *  z goes straight up. This gives the "architectural model" feel
 *  without any 3D engine.
 * ============================================================ */

const C30 = 0.866; // cos 30°
const S30 = 0.5; // sin 30°
const CX = 250; // viewBox center x
const CY = 250; // viewBox center y
const SC = 1.25; // scale

function iso(x, y, z) {
  const sx = CX + (x - y) * C30 * SC;
  const sy = CY + ((x + y) * S30 - z) * SC;
  return `${sx.toFixed(1)},${sy.toFixed(1)}`;
}

/* Build a polygon points string from 3D corners. */
function face(...corners) {
  return corners.map((c) => iso(c[0], c[1], c[2])).join(" ");
}

/* ============================================================
 *  ArchitecturalObject
 * ============================================================
 *
 * A large abstract architectural volume — a conceptual model.
 * NOT a photograph, NOT a literal building, NOT a floor plan.
 *
 * Composition (axonometric, layered):
 *   1. Contact shadow (soft ground shadow)
 *   2. Base slab (thin wide platform)
 *   3. Primary mass (stepped, the dominant volume)
 *   4. Upper offset mass (smaller, shifted, sits on primary)
 *   5. Cantilever (horizontal slab projecting from the upper
 *      mass — floating, the sculptural gesture)
 *   6. Vertical void (a dashed light shaft piercing the mass)
 *   7. Wireframe overlay (thin construction lines on edges)
 *   8. A few sparse annotations (section marker, axis ticks)
 *
 * Depth is achieved by shading each box's 3 visible faces
 * differently (top lightest, right darkest) — no 3D engine.
 *
 * Construction animation: shadow → base → primary → upper →
 * cantilever → void → wireframe. Each face stroke-draws + fills.
 */
export function ArchitecturalObject({ className, showDetail = true }) {
  const prefersReduced = useReducedMotion();

  // Face fills — warm paper grays that adapt to theme via CSS vars.
  // Top is lightest, front medium, right darkest → depth illusion.
  const FILL_TOP = "hsl(var(--muted))";
  const FILL_FRONT = "hsl(var(--secondary))";
  const FILL_RIGHT = "hsl(var(--line) / 0.85)";
  const STROKE = "hsl(var(--ink) / 0.55)";
  const STROKE_THIN = "hsl(var(--ink) / 0.3)";

  /* ---- Volume definitions (3D bounds) ---- */
  // Base slab
  const base = { x0: -90, x1: 90, y0: -90, y1: 90, z0: 0, z1: 14 };
  // Primary mass (the dominant stepped volume)
  const primary = { x0: -60, x1: 60, y0: -60, y1: 60, z0: 14, z1: 90 };
  // Upper offset mass (smaller, shifted toward back-right)
  const upper = { x0: -25, x1: 55, y0: -25, y1: 25, z0: 90, z1: 130 };
  // Cantilever (projects to the right from the upper mass, floating)
  const cant = { x0: 35, x1: 105, y0: -18, y1: 18, z0: 108, z1: 128 };

  // helper to get the 3 visible faces of a box
  const faces = (b) => ({
    top: face(
      [b.x0, b.y0, b.z1],
      [b.x1, b.y0, b.z1],
      [b.x1, b.y1, b.z1],
      [b.x0, b.y1, b.z1]
    ),
    front: face(
      [b.x0, b.y1, b.z0],
      [b.x1, b.y1, b.z0],
      [b.x1, b.y1, b.z1],
      [b.x0, b.y1, b.z1]
    ),
    right: face(
      [b.x1, b.y0, b.z0],
      [b.x1, b.y1, b.z0],
      [b.x1, b.y1, b.z1],
      [b.x1, b.y0, b.z1]
    ),
    // top outline (for stroke-draw)
    topOutline: face(
      [b.x0, b.y0, b.z1],
      [b.x1, b.y0, b.z1],
      [b.x1, b.y1, b.z1],
      [b.x0, b.y1, b.z1]
    ),
  });

  const baseF = faces(base);
  const primaryF = faces(primary);
  const upperF = faces(upper);
  const cantF = faces(cant);

  // The vertical void — a dashed slot on the primary's top face
  const voidTop = face(
    [-15, -15, 90.5],
    [15, -15, 90.5],
    [15, 15, 90.5],
    [-15, 15, 90.5]
  );

  // Wireframe: thin lines extending key edges upward (construction guides)
  const wireLines = [
    // primary back-top vertical edge extended up
    [iso(-60, -60, 90), iso(-60, -60, 150)],
    [iso(60, -60, 90), iso(60, -60, 150)],
    // upper mass top edges extended
    [iso(-25, -25, 130), iso(-25, -25, 165)],
    [iso(55, -25, 130), iso(55, -25, 165)],
    // cantilever right edge extended
    [iso(105, 18, 128), iso(105, 18, 160)],
  ];

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ===== 1. contact shadow (soft ground shadow) ===== */}
      <motion.ellipse
        cx={CX}
        cy={iso(0, 0, 0).split(",")[1]}
        rx={120}
        ry={42}
        fill="hsl(var(--ink) / 0.08)"
        initial={prefersReduced ? false : { opacity: 0, scaleY: 0.4 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: DURATION.base, ease: EASE.arch, delay: 0.2 }}
        style={{ transformOrigin: "center" }}
      />

      {/* ===== 2. base slab ===== */}
      <Volume
        faces={baseF}
        fillTop={FILL_TOP}
        fillFront={FILL_FRONT}
        fillRight={FILL_RIGHT}
        stroke={STROKE}
        delay={0.35}
        prefersReduced={prefersReduced}
      />

      {/* ===== 3. primary mass ===== */}
      <Volume
        faces={primaryF}
        fillTop={FILL_TOP}
        fillFront={FILL_FRONT}
        fillRight={FILL_RIGHT}
        stroke={STROKE}
        delay={0.55}
        prefersReduced={prefersReduced}
      />

      {/* ===== 4. vertical void (dashed slot on primary top) ===== */}
      <motion.polygon
        points={voidTop}
        stroke="hsl(var(--brick))"
        strokeWidth="1"
        strokeDasharray="4 3"
        fill="none"
        initial={prefersReduced ? false : { opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.9, pathLength: 1 }}
        transition={{ duration: DURATION.base, ease: EASE.draw, delay: 0.9 }}
      />
      {/* void label */}
      <motion.text
        x={iso(0, 0, 90.5).split(",")[0]}
        y={Number(iso(0, 0, 90.5).split(",")[1]) - 6}
        fill="hsl(var(--brick))"
        fontSize="7"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: DURATION.base, delay: 1.1 }}
      >
        VOID
      </motion.text>

      {/* ===== 5. upper offset mass ===== */}
      <Volume
        faces={upperF}
        fillTop={FILL_TOP}
        fillFront={FILL_FRONT}
        fillRight={FILL_RIGHT}
        stroke={STROKE}
        delay={0.75}
        prefersReduced={prefersReduced}
      />

      {/* ===== 6. cantilever (floating slab) ===== */}
      <Volume
        faces={cantF}
        fillTop={FILL_TOP}
        fillFront={FILL_FRONT}
        fillRight={FILL_RIGHT}
        stroke={STROKE}
        delay={0.95}
        prefersReduced={prefersReduced}
      />
      {/* cantilever support lines (thin, dashed — shows it's floating) */}
      <motion.line
        x1={iso(35, 0, 128).split(",")[0]}
        y1={iso(35, 0, 128).split(",")[1]}
        x2={iso(35, 0, 108).split(",")[0]}
        y2={iso(35, 0, 108).split(",")[1]}
        stroke={STROKE_THIN}
        strokeWidth="0.5"
        strokeDasharray="2 2"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: DURATION.base, ease: EASE.draw, delay: 1.1 }}
      />

      {/* ===== 7. wireframe construction guides ===== */}
      {showDetail &&
        wireLines.map((line, i) => (
          <motion.line
            key={i}
            x1={line[0].split(",")[0]}
            y1={line[0].split(",")[1]}
            x2={line[1].split(",")[0]}
            y2={line[1].split(",")[1]}
            stroke={STROKE_THIN}
            strokeWidth="0.5"
            strokeDasharray="3 3"
            initial={prefersReduced ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{
              duration: DURATION.base,
              ease: EASE.draw,
              delay: 1.15 + i * 0.05,
            }}
          />
        ))}

      {/* ===== 8. construction axes (through the object) ===== */}
      {/* vertical axis — the shared axis with typography */}
      <motion.line
        x1={iso(0, 0, 0).split(",")[0]}
        y1={iso(0, 0, 0).split(",")[1]}
        x2={iso(0, 0, 170).split(",")[0]}
        y2={iso(0, 0, 170).split(",")[1]}
        stroke="hsl(var(--brick))"
        strokeWidth="0.5"
        strokeDasharray="6 5"
        opacity="0.4"
        initial={prefersReduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: DURATION.slow, ease: EASE.draw, delay: 0.15 }}
      />

      {/* ===== 9. section marker ===== */}
      {showDetail && (
        <motion.g
          initial={prefersReduced ? false : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION.base, ease: EASE.arch, delay: 1.3 }}
          style={{ transformOrigin: `${iso(-80, 80, 0)}` }}
        >
          <circle
            cx={Number(iso(-80, 80, 0).split(",")[0])}
            cy={Number(iso(-80, 80, 0).split(",")[1])}
            r="9"
            fill="hsl(var(--background))"
            stroke="hsl(var(--ink))"
            strokeWidth="1"
          />
          <text
            x={iso(-80, 80, 0).split(",")[0]}
            y={Number(iso(-80, 80, 0).split(",")[1]) + 3}
            fill="hsl(var(--ink))"
            fontSize="9"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontWeight="700"
          >
            A
          </text>
        </motion.g>
      )}

      {/* ===== 10. dimension tick (bottom) ===== */}
      {showDetail && (
        <motion.g
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: DURATION.base, delay: 1.35 }}
        >
          <line
            x1={iso(-90, 90, -1).split(",")[0]}
            y1={Number(iso(-90, 90, -1).split(",")[1]) + 18}
            x2={iso(90, 90, -1).split(",")[0]}
            y2={Number(iso(90, 90, -1).split(",")[1]) + 18}
            stroke="hsl(var(--line-strong))"
            strokeWidth="0.5"
          />
          <line
            x1={iso(-90, 90, -1).split(",")[0]}
            y1={Number(iso(-90, 90, -1).split(",")[1]) + 14}
            x2={iso(-90, 90, -1).split(",")[0]}
            y2={Number(iso(-90, 90, -1).split(",")[1]) + 22}
            stroke="hsl(var(--line-strong))"
            strokeWidth="0.5"
          />
          <line
            x1={iso(90, 90, -1).split(",")[0]}
            y1={Number(iso(90, 90, -1).split(",")[1]) + 14}
            x2={iso(90, 90, -1).split(",")[0]}
            y2={Number(iso(90, 90, -1).split(",")[1]) + 22}
            stroke="hsl(var(--line-strong))"
            strokeWidth="0.5"
          />
        </motion.g>
      )}
    </svg>
  );
}

/* A single axonometric volume — renders its 3 visible faces with
   a stroke-draw + fill-in animation. */
function Volume({
  faces,
  fillTop,
  fillFront,
  fillRight,
  stroke,
  delay,
  prefersReduced,
}) {
  const common = {
    stroke,
    strokeWidth: 1,
  };
  return (
    <g>
      {/* right face (darkest) */}
      <motion.polygon
        points={faces.right}
        fill={fillRight}
        {...common}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.base, ease: EASE.arch, delay: delay + 0.1 }}
      />
      {/* front face (medium) */}
      <motion.polygon
        points={faces.front}
        fill={fillFront}
        {...common}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.base, ease: EASE.arch, delay: delay + 0.05 }}
      />
      {/* top face (lightest) — drawn last so its outline is crisp */}
      <motion.polygon
        points={faces.top}
        fill={fillTop}
        {...common}
        initial={prefersReduced ? false : { opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{
          duration: DURATION.draw,
          ease: EASE.draw,
          delay,
        }}
      />
    </g>
  );
}
