/**
 * Plaster mixing math — pure, no I/O.
 *
 * Verified against the USG No. 1 Pottery Plaster mixing table at 70:100
 * consistency (the same table shown under "common mix ratios"):
 * 1 quart water + 2.85 lb plaster → 80 cu in of mix. The v1 implementation
 * used identical constants; the math carries over unchanged.
 */

/** Extra mix to allow for spills, leaks and uneven pours. */
const OVERAGE = 1.075;

/** Cubic inches of set mix produced per quart of water (USG 70 consistency). */
const CU_IN_PER_QUART = 80;

/** Pounds of plaster per quart of water (USG 70 consistency). */
const PLASTER_LBS_PER_QUART = 2.85;

/** Fluid ounces per US quart. */
const FL_OZ_PER_QUART = 32;

/** Weight (avoirdupois oz) of one fluid ounce of water at ~70 °F. */
const OZ_WEIGHT_PER_FL_OZ = 1.043;

export interface PlasterInput {
  /** Mold cavity dimensions in inches. */
  length: number;
  width: number;
  height: number;
}

export interface PlasterResult {
  /** Mold volume including the 7.5% overage, in cubic inches. */
  volume: number;
  /** Water needed, in quarts (handy for measuring by volume). */
  waterQuarts: number;
  /** Water needed, in ounces by weight (matches v1 and the saved records). */
  waterOz: number;
  /** Whole pounds of plaster. */
  plasterPounds: number;
  /** Remaining ounces of plaster (0–16). */
  plasterOunces: number;
}

export function isValidDimension(n: number): boolean {
  return Number.isFinite(n) && n > 0 && n <= 1000;
}

export function calcPlaster({
  length,
  width,
  height,
}: PlasterInput): PlasterResult {
  const volume = length * width * height * OVERAGE;
  const waterQuarts = volume / CU_IN_PER_QUART;
  const plasterTotalLbs = waterQuarts * PLASTER_LBS_PER_QUART;
  const plasterPounds = Math.floor(plasterTotalLbs);

  return {
    volume,
    waterQuarts,
    waterOz: waterQuarts * FL_OZ_PER_QUART * OZ_WEIGHT_PER_FL_OZ,
    plasterPounds,
    plasterOunces: (plasterTotalLbs - plasterPounds) * 16,
  };
}
