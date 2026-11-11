// ============================================================
// Ring Carousel Geometry & Math
// Exact perspective calculations for 3D Ring Carousel
// ============================================================

export const N_PROJECTS = 6
export const N_BODIES = 12 // 6 projects + 6 clone bodies (N = n * ceil(8/n))

export function bodyAngle(i: number, N: number = N_BODIES): number {
  return (i / N) * Math.PI * 2
}

export function normalizeAngle(a: number): number {
  let r = a % (Math.PI * 2)
  if (r > Math.PI) r -= Math.PI * 2
  if (r < -Math.PI) r += Math.PI * 2
  return r
}

// Angular position of body i given carousel motionvalue `cur` (in project unit steps)
export function phi(cur: number, i: number, N: number = N_BODIES): number {
  const initialAngle = bodyAngle(i, N)
  // cur moves clockwise/counter-clockwise
  const rotation = -(cur % N) * (Math.PI * 2 / N)
  return initialAngle + rotation
}

// Perspective depth z from phi (-radiusZ to +radiusZ)
// When cos(phi) = 1 (front), z = +radiusZ (closest)
// When cos(phi) = -1 (back), z = -radiusZ (furthest)
export function zFromPhi(angle: number, radiusZ: number = 0.35): number {
  return Math.cos(angle) * radiusZ
}

// Horizontal slot on screen
export function xSlot(angle: number, ringW: number = 840): number {
  return Math.sin(angle) * (ringW / 2)
}

// Scale from depth: front is 1.0, back is 0.58
export function scaleFromZ(z: number): number {
  // z ranges from -0.35 to +0.35
  const norm = (z + 0.35) / 0.7 // 0 (back) to 1 (front)
  return 0.58 + norm * 0.42
}

// Blur from depth: front is 0px, back is up to 10px
export function blurFromZ(z: number): number {
  const norm = (z + 0.35) / 0.7 // 0 (back) to 1 (front)
  const inv = 1 - norm
  return Math.max(0, inv * inv * 10)
}

// Opacity from depth: front is 1.0, back is 0.35
export function opacityFromZ(z: number): number {
  const norm = (z + 0.35) / 0.7
  return 0.35 + norm * 0.65
}

// z-index: integer from 1 to 100
export function zIndexFromZ(z: number): number {
  const norm = (z + 0.35) / 0.7
  return Math.round(norm * 100) + 1
}

// Vertical baseline offset: keep bottoms aligned to the floor ground plane
export function yOffsetFromZ(z: number, maxHeight: number = 460): number {
  const s = scaleFromZ(z)
  // When scaled down, center of body drops; lift it up so feet stay anchored
  return (1 - s) * (maxHeight * 0.45)
}

// Map body index to project index (0..5)
export function projectIndex(i: number): number {
  return ((i % N_PROJECTS) + N_PROJECTS) % N_PROJECTS
}

export function isBodyAtFront(angle: number): boolean {
  return Math.abs(normalizeAngle(angle)) < Math.PI / N_BODIES
}

