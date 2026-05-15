import { NextRequest, NextResponse } from 'next/server';
import { getProfile, getKeyMetrics, getHistoricalPriceFull } from '@/lib/api/fmp';
import { calculateMultiplication, calculateCAGR } from '@/lib/utils/calculations';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ symbol: string }> }
) {
  const { symbol: rawSymbol } = await params;
  const symbol = rawSymbol.toUpperCase();

  try {
    // Fetch all required data in parallel
    const [profileData, metricsData, historicalData] = await Promise.all([
      getProfile(symbol).catch(() => []),
      getKeyMetrics(symbol).catch(() => []),
      getHistoricalPriceFull(symbol).catch(() => ({ symbol, historical: [] })),
    ]);

    if (!profileData || profileData.length === 0) {
      // Mock data fallback for demonstration purposes
      console.log(`Using mock data for ${symbol}`);
      
      const isUp = Math.random() > 0.5;
      const basePrice = 100 + Math.random() * 900;
      const mockHistory = [];
      let currentPriceIter = basePrice / (5 + Math.random() * 20); // starts low
      
      const now = new Date();
      for (let i = 0; i < 365 * 5; i += 7) { // 5 years of weekly data
        const date = new Date(now.getTime() - (365 * 5 * 24 * 60 * 60 * 1000) + (i * 24 * 60 * 60 * 1000));
        currentPriceIter = currentPriceIter * (1 + (Math.random() * 0.1 - 0.04)); // general upward trend
        mockHistory.push({
          date: date.toISOString().split('T')[0],
          open: currentPriceIter,
          high: currentPriceIter * 1.05,
          low: currentPriceIter * 0.95,
          close: currentPriceIter * 1.02,
          volume: 1000000 + Math.random() * 5000000
        });
      }

      return NextResponse.json({
        profile: {
          symbol,
          companyName: `${symbol} Mock Corporation`,
          description: `This is a mocked description for ${symbol}. The database is currently empty and the FMP API key might be missing. This placeholder text allows you to review the UI layout, typography, and functionality without actual data. The chart below is also populated with random walk generation to demonstrate the lightweight-charts integration.`,
          price: mockHistory[mockHistory.length - 1].close,
          exchange: 'NASDAQ',
          exchangeShortName: 'NASDAQ',
          industry: 'Technology',
          sector: 'Information Technology',
          country: 'US',
          ceo: 'Jane Doe',
          website: 'https://example.com',
          mktCap: 2500000000000,
        },
        metrics: {
          peRatio: 25 + Math.random() * 30,
          pegRatio: 1 + Math.random() * 2,
          roic: 0.15 + Math.random() * 0.20,
          debtToEquity: 0.5 + Math.random() * 1.5,
        },
        historical: mockHistory,
        derived: {
          multiplication: mockHistory[mockHistory.length - 1].close / mockHistory[0].close,
          cagr: calculateCAGR(mockHistory[0].close, mockHistory[mockHistory.length - 1].close, 5),
        }
      });
    }

    const profile = profileData[0];
    const metrics = metricsData && metricsData.length > 0 ? metricsData[0] : {};
    
    // Process historical data to calculate true multiplication and CAGR
    let multiplication = null;
    let cagr = null;
    
    const history = historicalData?.historical || [];
    if (history.length > 0) {
      // Sort history chronologically (oldest first)
      const sortedHistory = [...history].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      const earliestPrice = sortedHistory[0]?.close;
      const currentPrice = profile.price;
      
      multiplication = calculateMultiplication(currentPrice, earliestPrice);
      
      const years = (new Date().getTime() - new Date(sortedHistory[0]?.date).getTime()) / (1000 * 60 * 60 * 24 * 365);
      cagr = calculateCAGR(earliestPrice, currentPrice, years);
    }

    return NextResponse.json({
      profile,
      metrics,
      historical: history,
      derived: {
        multiplication,
        cagr,
      }
    });
  } catch (error) {
    console.error(`Error fetching asset data for ${symbol}:`, error);
    return NextResponse.json({ error: 'Failed to fetch asset data' }, { status: 500 });
  }
}
