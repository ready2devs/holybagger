export type AssetType = 'STOCK' | 'ETF' | 'CRYPTO';

export interface AssetMetrics {
  epsCurrentYear: number | null;
  epsNextYear: number | null;
  epsNext5Year: number | null;
  peForward: number | null;
  peg: number | null;
  cagrRevenue5Y: number | null;
  cagrRevenueFwd: number | null;
  revenue: number | null;
  roic: number | null;
  roe: number | null;
  debtToEquity: number | null;
}

export interface Asset {
  symbol: string;
  name: string;
  type: AssetType;
  exchange: string;
  sector: string | null;
  industry: string | null;
  country: string | null;
  ipoDate: string | null;
  marketCap: number | null;
  currentPrice: number | null;
  earliestPrice: number | null;
  multiplication: number | null;
  isActive: boolean;
  metrics?: AssetMetrics | null;
}
