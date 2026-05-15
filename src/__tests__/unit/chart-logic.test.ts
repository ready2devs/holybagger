import { describe, it, expect } from 'vitest';

describe('Chart formatting logic', () => {
  it('transforms FMP historical data to lightweight-charts format', () => {
    const mockFmpData = [
      { date: '2023-01-01', open: 140, high: 145, low: 139, close: 142, volume: 1000 },
      { date: '2023-01-02', open: 142, high: 148, low: 141, close: 147, volume: 1200 },
    ];
    
    const transformed = mockFmpData.map(d => ({
      time: d.date,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    })).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    
    expect(transformed[0].time).toBe('2023-01-01');
    expect(transformed[0].open).toBe(140);
  });
});
