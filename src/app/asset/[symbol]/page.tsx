'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AssetHeader } from '@/components/asset/AssetHeader';
import { PriceChart } from '@/components/asset/PriceChart';
import { KeyMetrics } from '@/components/asset/KeyMetrics';
import { CompanyProfile } from '@/components/asset/CompanyProfile';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AssetPage({ params }: { params: { symbol: string } }) {
  const symbol = params.symbol.toUpperCase();
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['asset', symbol],
    queryFn: async () => {
      const res = await fetch(`/api/asset/${symbol}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Asset not found');
        throw new Error('Failed to fetch data');
      }
      return res.json();
    },
  });

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold mb-4">Asset Not Found</h2>
        <p className="text-text-secondary mb-8">We couldn't find data for the symbol "{symbol}".</p>
        <Button asChild>
          <Link href="/screener">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Screener
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/screener" 
          className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Screener
        </Link>
      </div>

      <div className="space-y-6">
        <AssetHeader 
          profile={data?.profile} 
          multiplication={data?.derived?.multiplication} 
          isLoading={isLoading} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PriceChart 
              historicalData={data?.historical} 
              isLoading={isLoading} 
            />
          </div>
          <div className="lg:col-span-1">
            <KeyMetrics 
              metrics={data?.metrics} 
              profile={data?.profile} 
              cagr={data?.derived?.cagr} 
              isLoading={isLoading} 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1">
          <CompanyProfile 
            profile={data?.profile} 
            isLoading={isLoading} 
          />
        </div>
      </div>
    </div>
  );
}
