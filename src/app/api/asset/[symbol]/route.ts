import { NextRequest, NextResponse } from 'next/server';
import { getProfile, getKeyMetrics, getHistoricalPriceFull } from '@/lib/api/fmp';
import { calculateMultiplication, calculateCAGR } from '@/lib/utils/calculations';

export async function GET(
  request: NextRequest,
  { params }: { params: { symbol: string } }
) {
  const symbol = params.symbol.toUpperCase();

  try {
    // Fetch all required data in parallel
    const [profileData, metricsData, historicalData] = await Promise.all([
      getProfile(symbol).catch(() => []),
      getKeyMetrics(symbol).catch(() => []),
      getHistoricalPriceFull(symbol).catch(() => ({ symbol, historical: [] })),
    ]);

    if (!profileData || profileData.length === 0) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
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
