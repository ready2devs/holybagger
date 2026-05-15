import { NextRequest, NextResponse } from 'next/server';

// Mock data for UI demonstration while DB is not seeded
const MOCK_ASSETS = [
  { id: '1', symbol: 'NVDA', name: 'NVIDIA Corporation', type: 'STOCK', sector: 'Information Technology', exchange: 'NASDAQ', country: 'US', currentPrice: 850.50, multiplication: 285.4, marketCap: 2100000000000, isActive: true },
  { id: '2', symbol: 'TSLA', name: 'Tesla Inc.', type: 'STOCK', sector: 'Consumer Discretionary', exchange: 'NASDAQ', country: 'US', currentPrice: 170.50, multiplication: 120.5, marketCap: 540000000000, isActive: true },
  { id: '3', symbol: 'BTCUSD', name: 'Bitcoin', type: 'CRYPTO', sector: 'Crypto', exchange: 'CRYPTO', country: 'GLOBAL', currentPrice: 65000.00, multiplication: 150.0, marketCap: 1300000000000, isActive: true },
  { id: '4', symbol: 'AMD', name: 'Advanced Micro Devices', type: 'STOCK', sector: 'Information Technology', exchange: 'NASDAQ', country: 'US', currentPrice: 165.20, multiplication: 85.2, marketCap: 265000000000, isActive: true },
  { id: '5', symbol: 'MELI', name: 'MercadoLibre Inc.', type: 'STOCK', sector: 'Consumer Discretionary', exchange: 'NASDAQ', country: 'AR', currentPrice: 1550.00, multiplication: 65.2, marketCap: 78000000000, isActive: true },
  { id: '6', symbol: 'AAPL', name: 'Apple Inc.', type: 'STOCK', sector: 'Information Technology', exchange: 'NASDAQ', country: 'US', currentPrice: 175.80, multiplication: 45.6, marketCap: 2700000000000, isActive: true },
  { id: '7', symbol: 'MSFT', name: 'Microsoft Corp.', type: 'STOCK', sector: 'Information Technology', exchange: 'NASDAQ', country: 'US', currentPrice: 420.30, multiplication: 35.8, marketCap: 3100000000000, isActive: true },
  { id: '8', symbol: 'QQQ', name: 'Invesco QQQ Trust', type: 'ETF', sector: 'Technology', exchange: 'NASDAQ', country: 'US', currentPrice: 440.20, multiplication: 15.5, marketCap: 250000000000, isActive: true },
  { id: '9', symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'STOCK', sector: 'Consumer Discretionary', exchange: 'NASDAQ', country: 'US', currentPrice: 185.60, multiplication: 220.0, marketCap: 1900000000000, isActive: true },
  { id: '10', symbol: 'ETHUSD', name: 'Ethereum', type: 'CRYPTO', sector: 'Crypto', exchange: 'CRYPTO', country: 'GLOBAL', currentPrice: 3500.00, multiplication: 4200.0, marketCap: 420000000000, isActive: true },
  { id: '11', symbol: 'BABA', name: 'Alibaba Group', type: 'STOCK', sector: 'Consumer Discretionary', exchange: 'NYSE', country: 'CN', currentPrice: 85.40, multiplication: 5.2, marketCap: 215000000000, isActive: true },
  { id: '12', symbol: 'TSM', name: 'Taiwan Semiconductor', type: 'STOCK', sector: 'Information Technology', exchange: 'NYSE', country: 'TW', currentPrice: 140.50, multiplication: 28.5, marketCap: 725000000000, isActive: true },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'ALL';
  const sector = searchParams.get('sector') || 'ALL';
  const exchange = searchParams.get('exchange') || 'ALL';
  const country = searchParams.get('country') || 'ALL';
  const minMultiplier = Number(searchParams.get('minMultiplier') || '5');
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || '20');
  const sortBy = searchParams.get('sortBy') || 'multiplication';
  const sortOrder = searchParams.get('sortOrder') || 'desc';

  try {
    // TODO: When DB is seeded, uncomment prisma import and DB-first logic.
    // For now, serve mock data to demonstrate the UI.

    let filtered = MOCK_ASSETS.filter(a => a.multiplication >= minMultiplier);

    if (type !== 'ALL') filtered = filtered.filter(a => a.type === type);
    if (sector !== 'ALL') filtered = filtered.filter(a => a.sector === sector);
    if (exchange !== 'ALL') filtered = filtered.filter(a => a.exchange === exchange);
    if (country !== 'ALL') filtered = filtered.filter(a => a.country === country);

    // Sort
    filtered.sort((a, b) => {
      const aVal = (a as any)[sortBy] ?? 0;
      const bVal = (b as any)[sortBy] ?? 0;
      return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
    });

    // Paginate
    const total = filtered.length;
    const start = (page - 1) * limit;
    const paged = filtered.slice(start, start + limit);

    return NextResponse.json({
      data: paged,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      cached: false,
      message: "Using mock data for demonstration. Run seed script for real data."
    });

  } catch (error) {
    console.error("Screener API error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
