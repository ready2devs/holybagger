'use client';

import React from 'react';
import { useScreenerStore } from '@/lib/stores/screener-store';
import { EXCHANGES } from '@/lib/constants/exchanges';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export function ExchangeFilter() {
  const exchange = useScreenerStore((state) => state.filters.exchange);
  const type = useScreenerStore((state) => state.filters.type);
  const setFilter = useScreenerStore((state) => state.setFilter);

  const isDisabled = type === 'CRYPTO';

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Exchange</h3>
      <Select 
        value={exchange} 
        onValueChange={(val) => setFilter('exchange', val)}
        disabled={isDisabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select exchange" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All US Exchanges</SelectItem>
          {EXCHANGES.map((e) => (
            <SelectItem key={e} value={e}>
              {e}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
