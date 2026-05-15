/**
 * Calculates the multiplication factor of an asset
 * @param currentPrice The latest available price
 * @param earliestPrice The oldest available price (or IPO price)
 * @returns The multiplication factor (e.g., 5.5 means x5.5) or null if invalid inputs
 */
export function calculateMultiplication(currentPrice: number | null | undefined, earliestPrice: number | null | undefined): number | null {
  if (
    currentPrice === undefined || 
    currentPrice === null || 
    earliestPrice === undefined || 
    earliestPrice === null || 
    earliestPrice <= 0
  ) {
    return null;
  }

  // Ensure positive prices
  if (currentPrice < 0) return null;

  return currentPrice / earliestPrice;
}

/**
 * Calculates Compound Annual Growth Rate (CAGR)
 * @param startValue Initial value
 * @param endValue Final value
 * @param years Number of years
 * @returns CAGR as a decimal (e.g., 0.15 for 15%) or null if invalid inputs
 */
export function calculateCAGR(startValue: number | null, endValue: number | null, years: number | null): number | null {
  if (!startValue || !endValue || !years || startValue <= 0 || years <= 0) {
    return null;
  }

  return Math.pow(endValue / startValue, 1 / years) - 1;
}

/**
 * Determines the color token for a multiplier badge based on the value
 * @param multiplier The multiplication factor
 * @returns The Tailwind color token name
 */
export function getMultiplierBadgeColor(multiplier: number | null): string {
  if (!multiplier || multiplier < 5) return 'accent-amber';
  if (multiplier >= 50) return 'accent-blue';
  if (multiplier >= 10) return 'accent-emerald';
  return 'accent-green'; // 5 to 10
}
