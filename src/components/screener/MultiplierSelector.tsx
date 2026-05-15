'use client';

import React from 'react';
import { useScreenerStore } from '@/lib/stores/screener-store';

const MULTIPLIERS = [
  { value: 5, label: 'x5+' },
  { value: 10, label: 'x10+' },
  { value: 20, label: 'x20+' },
  { value: 50, label: 'x50+' },
  { value: 100, label: 'x100+' },
];

export function MultiplierSelector() {
  const currentMultiplier = useScreenerStore((state) => state.filters.minMultiplier);
  const setFilter = useScreenerStore((state) => state.setFilter);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">Minimum Multibagger</h3>
      <div className="flex flex-wrap gap-2">
        {MULTIPLIERS.map((mult) => {
          const isActive = currentMultiplier === mult.value;
          return (
            <button
              key={mult.value}
              onClick={() => setFilter('minMultiplier', mult.value)}
              className={`
                px-3 py-1.5 rounded-full text-sm font-medium transition-colors border
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-background
                ${isActive 
                  ? 'bg-accent-emerald text-white border-accent-emerald' 
                  : 'bg-transparent text-text-secondary border-border hover:bg-hover hover:text-text-primary'}
              `}
            >
              {mult.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
