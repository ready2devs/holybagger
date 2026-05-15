const FMP_BASE_URL = 'https://financialmodelingprep.com/api';

if (!process.env.FMP_API_KEY && process.env.NODE_ENV !== 'test') {
  console.warn('⚠️ FMP_API_KEY is not defined in environment variables.');
}

async function fetchFMP<T>(endpoint: string, version: 'v3' | 'v4' = 'v3'): Promise<T> {
  const API_KEY = process.env.FMP_API_KEY;
  if (!API_KEY) {
    throw new Error('FMP API key is missing');
  }

  const url = `${FMP_BASE_URL}/${version}/${endpoint}${endpoint.includes('?') ? '&' : '?'}apikey=${API_KEY}`;
  
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Default 1h cache, overridden below
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('FMP Rate limit exceeded');
      }
      throw new Error(`FMP API error: ${response.status}`);
    }

    const data = await response.json();
    
    // FMP sometimes returns { "Error Message": "..." } instead of standard error
    if (data && typeof data === 'object' && 'Error Message' in data) {
      throw new Error(`FMP API returned error: ${(data as any)['Error Message']}`);
    }

    return data as T;
  } catch (error) {
    console.error(`Failed to fetch FMP endpoint ${endpoint}:`, error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// Endpoint Wrappers
// -----------------------------------------------------------------------------

export async function getStockScreener(params: Record<string, string | number>) {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });
  
  return fetchFMP<any[]>(`stock-screener?${queryParams.toString()}`);
}

export async function getHistoricalPriceFull(symbol: string) {
  // FMP returns { symbol: string, historical: { date, close, adjClose, ... }[] }
  return fetchFMP<{ symbol: string; historical: any[] }>(`historical-price-full/${symbol}`);
}

export async function getProfile(symbol: string) {
  return fetchFMP<any[]>(`profile/${symbol}`);
}

export async function getKeyMetrics(symbol: string) {
  return fetchFMP<any[]>(`key-metrics/${symbol}?period=annual`);
}

export async function getIncomeStatement(symbol: string) {
  return fetchFMP<any[]>(`income-statement/${symbol}?period=annual&limit=5`);
}

export async function getAnalystEstimates(symbol: string) {
  return fetchFMP<any[]>(`analyst-estimates/${symbol}`);
}

export async function getStockNews(symbol?: string, limit = 20) {
  const symbolParam = symbol ? `tickers=${symbol}&` : '';
  return fetchFMP<any[]>(`stock_news?${symbolParam}limit=${limit}`);
}

export async function getEtfList() {
  return fetchFMP<any[]>('etf/list');
}
