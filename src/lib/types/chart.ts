export interface ChartDataPoint {
  time: string; // YYYY-MM-DD
  value: number; // Close or adjClose price
}

export interface OhlcvDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type TimeRange = '1m' | '3m' | '6m' | '1y' | '5y' | 'max';
