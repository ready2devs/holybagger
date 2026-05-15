'use client';

import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { useScreenerStore } from '@/lib/stores/screener-store';
import { AssetType } from '@prisma/client';

export function AssetTypeFilter() {
  const type = useScreenerStore((state) => state.filters.type);
  const setFilter = useScreenerStore((state) => state.setFilter);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Asset Type</h3>
      <Tabs.Root 
        value={type} 
        onValueChange={(val) => setFilter('type', val as any)}
        className="flex w-full flex-col"
      >
        <Tabs.List className="grid w-full grid-cols-4 rounded-md bg-hover p-1">
          <Tabs.Trigger
            value="ALL"
            className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 data-[state=active]:bg-card data-[state=active]:text-text-primary data-[state=active]:shadow-sm text-text-secondary"
          >
            All
          </Tabs.Trigger>
          <Tabs.Trigger
            value="STOCK"
            className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 data-[state=active]:bg-card data-[state=active]:text-text-primary data-[state=active]:shadow-sm text-text-secondary"
          >
            Stocks
          </Tabs.Trigger>
          <Tabs.Trigger
            value="ETF"
            className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 data-[state=active]:bg-card data-[state=active]:text-text-primary data-[state=active]:shadow-sm text-text-secondary"
          >
            ETFs
          </Tabs.Trigger>
          <Tabs.Trigger
            value="CRYPTO"
            className="rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 data-[state=active]:bg-card data-[state=active]:text-text-primary data-[state=active]:shadow-sm text-text-secondary"
          >
            Crypto
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
}
