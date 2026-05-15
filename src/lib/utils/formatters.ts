import { format, parseISO } from 'date-fns';

export function formatCurrency(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatLargeNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'N/A';
  if (value === 0) return '0';

  const absValue = Math.abs(value);
  
  if (absValue >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (absValue >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (absValue >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (absValue >= 1e3) return `${(value / 1e3).toFixed(2)}K`;
  
  return value.toFixed(2);
}

export function formatPercentage(value: number | null | undefined, isDecimal = false): string {
  if (value === null || value === undefined) return 'N/A';
  
  const percentageValue = isDecimal ? value * 100 : value;
  
  return `${percentageValue > 0 ? '+' : ''}${percentageValue.toFixed(2)}%`;
}

export function formatDate(dateString: string | Date | null | undefined, formatStr = 'MMM d, yyyy'): string {
  if (!dateString) return 'N/A';
  
  try {
    const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
    return format(date, formatStr);
  } catch (error) {
    return 'Invalid Date';
  }
}

export function formatMultiplier(value: number | null | undefined): string {
  if (value === null || value === undefined) return 'N/A';
  
  return `x${value.toFixed(1)}`;
}
