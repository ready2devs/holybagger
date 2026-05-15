import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '@/app/api/screener/route';
import { NextRequest } from 'next/server';
import prisma from '@/lib/db/prisma';

// Mock prisma
vi.mock('@/lib/db/prisma', () => ({
  default: {
    asset: {
      count: vi.fn(),
      findMany: vi.fn(),
    }
  }
}));

describe('Screener API Integration', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns paginated results successfully from DB', async () => {
    const mockAssets = [{ id: '1', symbol: 'AAPL', multiplication: 10 }];
    (prisma.asset.count as any).mockResolvedValue(1);
    (prisma.asset.findMany as any).mockResolvedValue(mockAssets);

    const req = new NextRequest('http://localhost:3000/api/screener?page=1&limit=10&minMultiplier=5');
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toEqual(mockAssets);
    expect(json.total).toBe(1);
    expect(json.page).toBe(1);
    expect(json.totalPages).toBe(1);
    expect(json.cached).toBe(true);

    expect(prisma.asset.findMany).toHaveBeenCalledWith({
      where: {
        isActive: true,
        multiplication: { gte: 5 }
      },
      orderBy: { multiplication: 'desc' },
      skip: 0,
      take: 10
    });
  });

  it('filters by parameters correctly', async () => {
    (prisma.asset.count as any).mockResolvedValue(1);
    (prisma.asset.findMany as any).mockResolvedValue([]);

    const req = new NextRequest('http://localhost:3000/api/screener?type=STOCK&sector=Technology&exchange=NASDAQ&country=US');
    await GET(req);

    expect(prisma.asset.count).toHaveBeenCalledWith({
      where: {
        isActive: true,
        multiplication: { gte: 5 },
        type: 'STOCK',
        sector: 'Technology',
        exchange: 'NASDAQ',
        country: 'US'
      }
    });
  });

  it('returns empty message when DB is empty', async () => {
    (prisma.asset.count as any).mockResolvedValue(0);

    const req = new NextRequest('http://localhost:3000/api/screener');
    const res = await GET(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.data).toEqual([]);
    expect(json.cached).toBe(false);
    expect(json.message).toContain('seed script');
  });
});
