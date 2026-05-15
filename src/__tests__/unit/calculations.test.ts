import { describe, it, expect } from 'vitest';
import { calculateMultiplication, calculateCAGR, getMultiplierBadgeColor } from '@/lib/utils/calculations';

describe('calculations utilities', () => {
  describe('calculateMultiplication', () => {
    it('calculates correct multiplication factor', () => {
      expect(calculateMultiplication(100, 10)).toBe(10);
      expect(calculateMultiplication(50, 10)).toBe(5);
      expect(calculateMultiplication(5.5, 1)).toBe(5.5);
    });

    it('returns null for missing inputs', () => {
      expect(calculateMultiplication(null, 10)).toBeNull();
      expect(calculateMultiplication(100, null)).toBeNull();
      expect(calculateMultiplication(undefined, undefined)).toBeNull();
    });

    it('returns null for zero or negative base price', () => {
      expect(calculateMultiplication(100, 0)).toBeNull();
      expect(calculateMultiplication(100, -10)).toBeNull();
    });

    it('returns null for negative current price', () => {
      expect(calculateMultiplication(-10, 10)).toBeNull();
    });
  });

  describe('calculateCAGR', () => {
    it('calculates correct CAGR', () => {
      // 100 to 200 in 1 year = 100% (1.0)
      expect(calculateCAGR(100, 200, 1)).toBeCloseTo(1.0);
      // 100 to 121 in 2 years = 10% (0.1)
      expect(calculateCAGR(100, 121, 2)).toBeCloseTo(0.1);
    });

    it('returns null for invalid inputs', () => {
      expect(calculateCAGR(null, 200, 1)).toBeNull();
      expect(calculateCAGR(100, null, 1)).toBeNull();
      expect(calculateCAGR(100, 200, null)).toBeNull();
      expect(calculateCAGR(0, 200, 1)).toBeNull();
      expect(calculateCAGR(100, 200, 0)).toBeNull();
    });
  });

  describe('getMultiplierBadgeColor', () => {
    it('returns correct color classes based on thresholds', () => {
      expect(getMultiplierBadgeColor(null)).toBe('accent-amber');
      expect(getMultiplierBadgeColor(4.9)).toBe('accent-amber');
      expect(getMultiplierBadgeColor(5)).toBe('accent-green');
      expect(getMultiplierBadgeColor(9.9)).toBe('accent-green');
      expect(getMultiplierBadgeColor(10)).toBe('accent-emerald');
      expect(getMultiplierBadgeColor(49.9)).toBe('accent-emerald');
      expect(getMultiplierBadgeColor(50)).toBe('accent-blue');
      expect(getMultiplierBadgeColor(100)).toBe('accent-blue');
    });
  });
});
