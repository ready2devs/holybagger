import { describe, it, expect, vi } from 'vitest';
import { GET } from '@/app/api/asset/[symbol]/route';
import { NextRequest } from 'next/server';

// Mock the FMP API client
vi.mock('@/lib/api/fmp', () => ({
  getProfile: vi.fn().mockResolvedValue([{
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    description: 'Apple designs smartphones...',
    exchange: 'NASDAQ',
    industry: 'Consumer Electronics',
    sector: 'Technology',
    ceo: 'Tim Cook',
    website: 'https://apple.com',
    mktCap: 3000000000000,
    price: 150.0,
    country: 'US',
  }]),
  getKeyMetrics: vi.fn().mockResolvedValue([{
    peRatio: 25.5,
    pfcfRatio: 20.1,
    roic: 0.35,
    roe: 1.45,
    debtToEquity: 1.2,
  }]),
  getHistoricalPriceFull: vi.fn().mockResolvedValue({
    symbol: 'AAPL',
    historical: [
      { date: '2023-01-01', close: 140 },
      { date: '2022-01-01', close: 100 },
      { date: '2010-01-01', close: 10 },
    ]
  }),
}));

describe('Asset Detail API', () => {
  it('combines profile, metrics and chart data into a single payload', async () => {
    // We mock the params that Next.js passes to route handlers
    const req = new NextRequest('http://localhost:3000/api/asset/AAPL');
    const res = await GET(req, { params: { symbol: 'AAPL' } });
    
    expect(res.status).toBe(200);
    const json = await res.json();
    
    expect(json.profile.symbol).toBe('AAPL');
    expect(json.profile.companyName).toBe('Apple Inc.');
    expect(json.metrics.peRatio).toBe(25.5);
    expect(json.historical).toHaveLength(3);
    
    // Check if derived fields are calculated
    expect(json.derived.multiplication).toBe(15); // 150 / 10 = 15
    expect(json.derived.cagr).toBeDefined();
  });
  
  it('handles missing data gracefully', async () => {
    vi.mocked(await import('@/lib/api/fmp')).getProfile.mockResolvedValueOnce([]);
    
    const req = new NextRequest('http://localhost:3000/api/asset/UNKNOWN');
    const res = await GET(req, { params: { symbol: 'UNKNOWN' } });
    
    expect(res.status).toBe(404);
  });
});
