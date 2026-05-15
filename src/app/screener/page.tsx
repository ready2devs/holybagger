import React from 'react';
import { FilterPanel } from '@/components/screener/FilterPanel';
import { ResultsTable } from '@/components/screener/ResultsTable';

export const metadata = {
  title: 'Multibagger Screener | HolyBagger',
  description: 'Filter and discover multibagger stocks, ETFs, and cryptocurrencies.',
};

export default function ScreenerPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
          Multibagger <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-emerald to-accent-blue">Screener</span>
        </h1>
        <p className="text-text-secondary text-lg max-w-2xl">
          Discover high-performing assets that have multiplied their value significantly since their earliest recorded price. Filter by asset type, sector, exchange, and country.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <FilterPanel />
        </div>
        
        {/* Results Area */}
        <div className="lg:col-span-3 min-w-0">
          <ResultsTable />
        </div>
      </div>
    </div>
  );
}
