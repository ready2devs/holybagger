'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency, formatMultiplier } from '@/lib/utils/formatters';
import { getMultiplierBadgeColor } from '@/lib/utils/calculations';

interface AssetHeaderProps {
  profile: any;
  multiplication: number | null;
  isLoading: boolean;
}

export function AssetHeader({ profile, multiplication, isLoading }: AssetHeaderProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Skeleton className="h-10 w-48 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Skeleton className="h-10 w-32 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) return null;

  return (
    <Card className="overflow-hidden relative">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent-emerald/10 blur-[80px] rounded-full pointer-events-none" />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
                {profile.companyName || profile.name}
              </h1>
              <Badge variant="outline" className="text-lg px-3 py-1 font-mono">
                {profile.symbol}
              </Badge>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
              <span className="px-2 py-1 rounded bg-hover border border-border">
                {profile.exchangeShortName || profile.exchange}
              </span>
              {profile.sector && (
                <span className="px-2 py-1 rounded bg-hover border border-border">
                  {profile.sector}
                </span>
              )}
              {profile.country && (
                <span className="px-2 py-1 rounded bg-hover border border-border">
                  {profile.country} {profile.country !== 'US' ? 'ADR' : ''}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex flex-col items-end shrink-0">
            <div className="text-4xl font-mono font-bold text-text-primary tracking-tighter mb-2">
              {formatCurrency(profile.price)}
            </div>
            {multiplication && (
              <Badge className={`text-base px-3 py-1 font-bold ${getMultiplierBadgeColor(multiplication)}`}>
                {formatMultiplier(multiplication)} Return
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
