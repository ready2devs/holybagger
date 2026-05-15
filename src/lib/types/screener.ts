export interface ScreenerFilters {
  type: 'ALL' | 'STOCK' | 'ETF' | 'CRYPTO';
  sector: string; // 'ALL' or specific GICS sector
  exchange: string; // 'ALL', 'NYSE', 'NASDAQ'
  country: string; // 'ALL' or specific country code
  minMultiplier: number; // 5, 10, 20, 50, 100
  page: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface ScreenerResponse {
  data: any[]; // Will be typed properly once Prisma models are in
  total: number;
  page: number;
  totalPages: number;
  cached: boolean;
}
