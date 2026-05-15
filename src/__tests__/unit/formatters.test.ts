import { describe, it, expect } from 'vitest';
import { 
  formatCurrency, 
  formatLargeNumber, 
  formatPercentage, 
  formatDate, 
  formatMultiplier 
} from '@/lib/utils/formatters';

describe('formatters utilities', () => {
  describe('formatCurrency', () => {
    it('formats numbers to USD currency', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
      expect(formatCurrency(-50.25)).toBe('-$50.25');
    });

    it('returns N/A for null/undefined', () => {
      expect(formatCurrency(null)).toBe('N/A');
      expect(formatCurrency(undefined)).toBe('N/A');
    });
  });

  describe('formatLargeNumber', () => {
    it('formats large numbers with suffixes', () => {
      expect(formatLargeNumber(1500000000000)).toBe('1.50T');
      expect(formatLargeNumber(2500000000)).toBe('2.50B');
      expect(formatLargeNumber(3500000)).toBe('3.50M');
      expect(formatLargeNumber(4500)).toBe('4.50K');
      expect(formatLargeNumber(500)).toBe('500.00');
      expect(formatLargeNumber(0)).toBe('0');
      expect(formatLargeNumber(-2500000000)).toBe('-2.50B');
    });

    it('returns N/A for null/undefined', () => {
      expect(formatLargeNumber(null)).toBe('N/A');
      expect(formatLargeNumber(undefined)).toBe('N/A');
    });
  });

  describe('formatPercentage', () => {
    it('formats raw percentages', () => {
      expect(formatPercentage(15.5)).toBe('+15.50%');
      expect(formatPercentage(-5.2)).toBe('-5.20%');
      expect(formatPercentage(0)).toBe('0.00%');
    });

    it('formats decimal percentages when flag is true', () => {
      expect(formatPercentage(0.155, true)).toBe('+15.50%');
      expect(formatPercentage(-0.052, true)).toBe('-5.20%');
    });

    it('returns N/A for null/undefined', () => {
      expect(formatPercentage(null)).toBe('N/A');
      expect(formatPercentage(undefined)).toBe('N/A');
    });
  });

  describe('formatDate', () => {
    it('formats ISO date strings', () => {
      expect(formatDate('2023-01-15T12:00:00')).toBe('Jan 15, 2023');
    });

    it('formats Date objects', () => {
      expect(formatDate(new Date('2023-01-15T12:00:00'))).toBe('Jan 15, 2023');
    });

    it('accepts custom format strings', () => {
      expect(formatDate('2023-01-15T12:00:00', 'yyyy-MM-dd')).toBe('2023-01-15');
    });

    it('returns N/A for null/undefined', () => {
      expect(formatDate(null)).toBe('N/A');
      expect(formatDate(undefined)).toBe('N/A');
    });

    it('returns Invalid Date for malformed strings', () => {
      expect(formatDate('not-a-date')).toBe('Invalid Date');
    });
  });

  describe('formatMultiplier', () => {
    it('formats multipliers with x prefix', () => {
      expect(formatMultiplier(5)).toBe('x5.0');
      expect(formatMultiplier(10.25)).toBe('x10.3');
    });

    it('returns N/A for null/undefined', () => {
      expect(formatMultiplier(null)).toBe('N/A');
      expect(formatMultiplier(undefined)).toBe('N/A');
    });
  });
});
