// ===============================================================
//  Motion language — shared tokens so every animation across
//  the site speaks the same architectural dialect.
//
//  Guidance from the brief:
//   - micro interaction      ~150–250ms
//   - standard UI transition ~300–500ms
//   - major reveal           ~500–900ms
//   - precise, controlled, intentional. No bouncy springs.
// ===============================================================

export const EASE = {
  // architectural ease — starts precise, settles gently
  arch: [0.22, 0.61, 0.36, 1],
  // slightly more deceleration for big reveals
  settle: [0.16, 1, 0.3, 1],
  // construction draw — slow start, steady, soft end
  draw: [0.65, 0, 0.35, 1],
};

export const DURATION = {
  micro: 0.18, // hover / small UI
  fast: 0.32, // small component
  base: 0.5, // standard reveal
  slow: 0.7, // major reveal
  draw: 0.9, // frame draw
};

// Stagger between sibling technical elements within one frame
export const STAGGER = {
  tight: 0.05,
  normal: 0.08,
  loose: 0.14,
};
