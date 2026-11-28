export interface CorridorInput {
  opposingSwings: number;
  hasCleanFvg: boolean;
  scaledEntries: number;
  riskPerEntryPct: number;
}

export interface CorridorResult {
  classification: 'Low-Resistance (LRLR)' | 'Moderate Resistance' | 'High-Resistance (HRLR)';
  clarityScore: number;
  combinedExposurePct: number;
  guidance: string;
}

export function evaluateLiquidityCorridor(input: CorridorInput): CorridorResult {
  const swings = Math.max(0, Math.min(8, input.opposingSwings));
  const entries = Math.max(1, Math.min(5, input.scaledEntries));
  const risk = Math.max(0.1, Math.min(5, input.riskPerEntryPct));
  const combinedExposurePct = Number((entries * risk).toFixed(2));

  let clarityScore = 85 - swings * 12 + (input.hasCleanFvg ? 15 : -15);
  clarityScore = Math.max(5, Math.min(100, clarityScore));

  let classification: CorridorResult['classification'] = 'Moderate Resistance';
  let guidance = 'Mixed path; wait for intermediate swing clearance before expecting smooth delivery.';
  if (swings <= 1 && input.hasCleanFvg) {
    classification = 'Low-Resistance (LRLR)';
    guidance = 'Unobstructed corridor with clean FVG displacement; watch combined exposure if scaling.';
  } else if (swings >= 4 || !input.hasCleanFvg) {
    classification = 'High-Resistance (HRLR)';
    guidance = 'Cluttered path with opposing structure; avoid aggressive pyramiding and wait for MSS.';
  }

  return {
    classification,
    clarityScore,
    combinedExposurePct,
    guidance,
  };
}
