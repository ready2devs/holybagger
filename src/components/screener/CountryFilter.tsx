'use client';

import React from 'react';
import { useScreenerStore } from '@/lib/stores/screener-store';
import { ADR_COUNTRIES } from '@/lib/constants/countries';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

export function CountryFilter() {
  const country = useScreenerStore((state) => state.filters.country);
  const type = useScreenerStore((state) => state.filters.type);
  const setFilter = useScreenerStore((state) => state.setFilter);

  const isDisabled = type === 'CRYPTO';

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Country (ADR)</h3>
      <Select 
        value={country} 
        onValueChange={(val) => setFilter('country', val)}
        disabled={isDisabled}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Countries</SelectItem>
          <SelectItem value="US">United States Only</SelectItem>
          <div className="my-1 h-px bg-border" />
          {ADR_COUNTRIES.map((c) => (
            <SelectItem key={c.code} value={c.code}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
