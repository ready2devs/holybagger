import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function ScreenerLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-4" />
        <Skeleton className="h-5 w-full max-w-2xl" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Skeleton className="h-[600px] w-full rounded-xl" />
        </div>
        
        <div className="lg:col-span-3">
          <Skeleton className="h-[800px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
