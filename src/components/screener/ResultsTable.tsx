'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useScreenerStore } from '@/lib/stores/screener-store';
import { formatCurrency, formatLargeNumber, formatMultiplier } from '@/lib/utils/formatters';
import { getMultiplierBadgeColor } from '@/lib/utils/calculations';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ResultsTable() {
  const filters = useScreenerStore((state) => state.filters);
  const setFilter = useScreenerStore((state) => state.setFilter);
  const setPage = useScreenerStore((state) => state.setPage);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['screener', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
      const res = await fetch(`/api/screener?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      return res.json();
    },
  });

  const handleSort = (column: string) => {
    if (filters.sortBy === column) {
      setFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setFilter('sortBy', column);
      setFilter('sortOrder', 'desc');
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (filters.sortBy !== column) return <ArrowUpDown className="ml-1 h-3 w-3 opacity-20" />;
    return filters.sortOrder === 'desc' 
      ? <ArrowDown className="ml-1 h-3 w-3 text-accent-emerald" />
      : <ArrowUp className="ml-1 h-3 w-3 text-accent-emerald" />;
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-xl bg-card">
        <p className="text-accent-red mb-2">Failed to load screener results</p>
        <Button variant="outline" onClick={() => window.location.reload()}>Try again</Button>
      </div>
    );
  }

  if (data?.data?.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-xl bg-card">
        <h3 className="text-lg font-medium mb-2">No results found</h3>
        <p className="text-text-secondary mb-4 max-w-md">{data.message || "Try adjusting your filters to see more results."}</p>
        <Button variant="outline" onClick={() => useScreenerStore.getState().resetFilters()}>Clear Filters</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-text-secondary uppercase bg-background border-b border-border">
              <tr>
                <th className="px-4 py-3 cursor-pointer hover:text-text-primary transition-colors" onClick={() => handleSort('symbol')}>
                  <div className="flex items-center">Symbol <SortIcon column="symbol" /></div>
                </th>
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3">Sector</th>
                <th className="px-4 py-3 cursor-pointer hover:text-text-primary transition-colors" onClick={() => handleSort('multiplication')}>
                  <div className="flex items-center">Multiplication <SortIcon column="multiplication" /></div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-text-primary transition-colors" onClick={() => handleSort('currentPrice')}>
                  <div className="flex items-center">Price <SortIcon column="currentPrice" /></div>
                </th>
                <th className="px-4 py-3 cursor-pointer hover:text-text-primary transition-colors" onClick={() => handleSort('marketCap')}>
                  <div className="flex items-center">Market Cap <SortIcon column="marketCap" /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="px-4 py-4"><Skeleton className="h-5 w-12" /></td>
                    <td className="px-4 py-4"><Skeleton className="h-5 w-32" /></td>
                    <td className="px-4 py-4"><Skeleton className="h-5 w-24" /></td>
                    <td className="px-4 py-4"><Skeleton className="h-6 w-16 rounded-full" /></td>
                    <td className="px-4 py-4"><Skeleton className="h-5 w-16" /></td>
                    <td className="px-4 py-4"><Skeleton className="h-5 w-16" /></td>
                  </tr>
                ))
              ) : (
                data?.data.map((asset: any) => (
                  <tr key={asset.id} className="border-b border-border/50 hover:bg-hover/50 transition-colors group">
                    <td className="px-4 py-4 font-bold text-text-primary">
                      <Link href={`/asset/${asset.symbol}`} className="hover:text-accent-blue transition-colors">
                        {asset.symbol}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-text-secondary">
                      <div className="font-medium truncate max-w-[200px]" title={asset.name}>{asset.name}</div>
                      <div className="text-xs opacity-70 flex items-center gap-1 mt-0.5">
                        <span className="px-1 py-0.5 rounded bg-background border border-border text-[10px]">{asset.exchange}</span>
                        {asset.country && asset.country !== 'US' && (
                          <span className="px-1 py-0.5 rounded bg-background border border-border text-[10px]">{asset.country} ADR</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-text-secondary">
                      {asset.sector ? (
                        <div className="truncate max-w-[150px]" title={asset.sector}>{asset.sector}</div>
                      ) : (
                        <span className="opacity-50">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={getMultiplierBadgeColor(asset.multiplication)}>
                        {formatMultiplier(asset.multiplication)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 font-mono text-text-primary">
                      {formatCurrency(asset.currentPrice)}
                    </td>
                    <td className="px-4 py-4 text-text-secondary">
                      {asset.marketCap ? `$${formatLargeNumber(asset.marketCap)}` : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3">
          <div className="text-sm text-text-secondary">
            Showing page <span className="font-medium text-text-primary">{data.page}</span> of{' '}
            <span className="font-medium text-text-primary">{data.totalPages}</span>
            {' '}({data.total} total assets)
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(data.page - 1)}
              disabled={data.page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(data.page + 1)}
              disabled={data.page === data.totalPages}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
