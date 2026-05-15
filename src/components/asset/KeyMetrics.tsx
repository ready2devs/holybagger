'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/Tooltip';
import { Skeleton } from '@/components/ui/Skeleton';
import { Info } from 'lucide-react';
import { formatLargeNumber, formatPercentage } from '@/lib/utils/formatters';

interface KeyMetricsProps {
  metrics: any;
  profile: any;
  cagr: number | null;
  isLoading: boolean;
}

export function KeyMetrics({ metrics, profile, cagr, isLoading }: KeyMetricsProps) {
  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-32" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const dataPoints = [
    {
      label: 'Market Cap',
      value: profile?.mktCap ? `$${formatLargeNumber(profile.mktCap)}` : 'N/A',
      tooltip: 'Total market value of a company\'s outstanding shares of stock.',
    },
    {
      label: 'CAGR',
      value: formatPercentage(cagr, true),
      tooltip: 'Compound Annual Growth Rate from the earliest recorded price to today.',
      highlight: true,
    },
    {
      label: 'P/E Ratio',
      value: metrics?.peRatio ? metrics.peRatio.toFixed(2) : 'N/A',
      tooltip: 'Price-to-Earnings ratio. A higher number indicates investors expect higher future growth.',
    },
    {
      label: 'PEG Ratio',
      value: metrics?.pegRatio ? metrics.pegRatio.toFixed(2) : 'N/A',
      tooltip: 'Price/Earnings-to-Growth ratio. A lower PEG may indicate an undervalued stock.',
    },
    {
      label: 'ROIC',
      value: formatPercentage(metrics?.roic, true),
      tooltip: 'Return on Invested Capital. Measures how efficiently a company allocates capital to profitable investments.',
      highlight: (metrics?.roic || 0) > 0.15,
    },
    {
      label: 'Debt to Equity',
      value: metrics?.debtToEquity ? metrics.debtToEquity.toFixed(2) : 'N/A',
      tooltip: 'A measure of a company\'s financial leverage calculated by dividing its total liabilities by stockholders\' equity.',
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Key Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
          <TooltipProvider>
            {dataPoints.map((point, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center text-sm text-text-secondary mb-1">
                  {point.label}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3.5 w-3.5 ml-1.5 opacity-50 hover:opacity-100 transition-opacity cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>{point.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className={`text-2xl font-mono font-semibold tracking-tight ${point.highlight ? 'text-accent-emerald' : 'text-text-primary'}`}>
                  {point.value}
                </div>
              </div>
            ))}
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
