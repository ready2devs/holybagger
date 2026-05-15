import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fmp from '@/lib/api/fmp';

// Setup mock for global fetch
const globalFetchMock = vi.fn();
global.fetch = globalFetchMock as any;

describe('FMP API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.FMP_API_KEY = 'test_key';
  });

  afterEach(() => {
    // Clean up if needed
  });

  describe('getStockScreener', () => {
    it('calls fetch with correct URL and parses response', async () => {
      const mockData = [{ symbol: 'AAPL', price: 150 }];
      globalFetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const result = await fmp.getStockScreener({ sector: 'Technology', limit: 10 });

      expect(globalFetchMock).toHaveBeenCalledWith(
        expect.stringContaining('https://financialmodelingprep.com/api/v3/stock-screener'),
        expect.any(Object)
      );
      expect(globalFetchMock).toHaveBeenCalledWith(
        expect.stringContaining('sector=Technology'),
        expect.any(Object)
      );
      expect(globalFetchMock).toHaveBeenCalledWith(
        expect.stringContaining('apikey=test_key'),
        expect.any(Object)
      );
      expect(result).toEqual(mockData);
    });

    it('ignores null/undefined query parameters', async () => {
      globalFetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await fmp.getStockScreener({ sector: 'Technology', country: '' });

      const url = globalFetchMock.mock.calls[0][0];
      expect(url).toContain('sector=Technology');
      expect(url).not.toContain('country=');
    });
  });

  describe('Error handling', () => {
    it('throws error when API key is missing', async () => {
      process.env.FMP_API_KEY = '';
      await expect(fmp.getProfile('AAPL')).rejects.toThrow('FMP API key is missing');
    });

    it('throws rate limit error on 429', async () => {
      globalFetchMock.mockResolvedValueOnce({
        ok: false,
        status: 429,
      });

      await expect(fmp.getProfile('AAPL')).rejects.toThrow('FMP Rate limit exceeded');
    });

    it('throws generic error on other non-ok status', async () => {
      globalFetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(fmp.getProfile('AAPL')).rejects.toThrow('FMP API error: 500');
    });

    it('throws error when response contains FMP Error Message format', async () => {
      globalFetchMock.mockResolvedValueOnce({
        ok: true, // Sometimes FMP returns 200 OK but with an error JSON
        json: async () => ({ 'Error Message': 'Invalid API KEY' }),
      });

      await expect(fmp.getProfile('AAPL')).rejects.toThrow('FMP API returned error: Invalid API KEY');
    });
  });
});
