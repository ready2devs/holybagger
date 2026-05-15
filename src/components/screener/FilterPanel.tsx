'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AssetTypeFilter } from './AssetTypeFilter';
import { MultiplierSelector } from './MultiplierSelector';
import { SectorFilter } from './SectorFilter';
import { ExchangeFilter } from './ExchangeFilter';
import { CountryFilter } from './CountryFilter';
import { Button } from '@/components/ui/Button';
import { useScreenerStore } from '@/lib/stores/screener-store';

export function FilterPanel() {
  const resetFilters = useScreenerStore((state) => state.resetFilters);

  return (
    <Card className="sticky top-20 border-border/50 bg-background/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2 text-xs">
            Reset all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <AssetTypeFilter />
        </motion.div>
        
        <div className="h-px bg-border/50" />
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <MultiplierSelector />
        </motion.div>
        
        <div className="h-px bg-border/50" />
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <SectorFilter />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <ExchangeFilter />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <CountryFilter />
        </motion.div>
      </CardContent>
    </Card>
  );
}
