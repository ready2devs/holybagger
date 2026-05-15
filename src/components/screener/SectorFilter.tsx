'use client';

import React from 'react';
import { useScreenerStore } from '@/lib/stores/screener-store';
import { GICS_SECTORS } from '@/lib/constants/sectors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export function SectorFilter() {
  const sector = useScreenerStore((state) => state.filters.sector);
  const type = useScreenerStore((state) => state.filters.type);
  const setFilter = useScreenerStore((state) => state.setFilter);

  // Disable sector filter if type is ETF or CRYPTO
  const isDisabled = type === 'ETF' || type === 'CRYPTO';

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Sector</h3>
      <Select 
        value={sector} 
        onValueChange={(val) => setFilter('sector', val)}
        disabled={isDisabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Sectors</SelectItem>
          {GICS_SECTORS.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isDisabled && (
        <p className="text-xs text-text-secondary">Sectors only apply to stocks.</p>
      )}
    </div>
  );
}
