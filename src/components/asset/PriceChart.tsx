'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatCurrency } from '@/lib/utils/formatters';

interface PriceChartProps {
  historicalData: any[];
  isLoading: boolean;
}

export function PriceChart({ historicalData, isLoading }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    if (isLoading || !historicalData || historicalData.length === 0 || !chartContainerRef.current) {
      return;
    }

    // Process data for lightweight-charts
    // Ensure chronological order and valid format
    const processedData = historicalData
      .map(d => ({
        time: d.date,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      }))
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

    if (processedData.length === 0) return;

    // Create chart
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8892b0', // text-secondary
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      rightPriceScale: {
        borderVisible: false,
      },
      timeScale: {
        borderVisible: false,
        timeVisible: true,
      },
      crosshair: {
        mode: 1, // Normal crosshair
        vertLine: {
          width: 1,
          color: 'rgba(16, 185, 129, 0.5)',
          style: 3,
        },
        horzLine: {
          width: 1,
          color: 'rgba(16, 185, 129, 0.5)',
          style: 3,
        },
      },
    });

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981', // accent-emerald
      downColor: '#ef4444', // accent-red
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    candlestickSeries.setData(processedData);
    chart.timeScale().fitContent();

    // Custom Tooltip Logic
    chart.subscribeCrosshairMove((param) => {
      if (!tooltipRef.current || !chartContainerRef.current) return;
      
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > chartContainerRef.current.clientWidth ||
        param.point.y < 0 ||
        param.point.y > chartContainerRef.current.clientHeight
      ) {
        tooltipRef.current.style.display = 'none';
        return;
      }

      const data = param.seriesData.get(candlestickSeries) as any;
      if (!data) return;

      tooltipRef.current.style.display = 'block';
      tooltipRef.current.style.left = param.point.x + 15 + 'px';
      tooltipRef.current.style.top = param.point.y + 15 + 'px';
      
      const isUp = data.close >= data.open;
      const colorClass = isUp ? 'text-accent-emerald' : 'text-accent-red';

      tooltipRef.current.innerHTML = `
        <div class="font-medium text-xs text-text-secondary mb-1">${data.time}</div>
        <div class="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
          <span class="text-text-secondary">O</span> <span class="font-mono ${colorClass}">${formatCurrency(data.open)}</span>
          <span class="text-text-secondary">H</span> <span class="font-mono ${colorClass}">${formatCurrency(data.high)}</span>
          <span class="text-text-secondary">L</span> <span class="font-mono ${colorClass}">${formatCurrency(data.low)}</span>
          <span class="text-text-secondary">C</span> <span class="font-mono font-bold ${colorClass}">${formatCurrency(data.close)}</span>
        </div>
      `;
    });

    setChartReady(true);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [historicalData, isLoading]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[400px] w-full rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div 
          ref={chartContainerRef} 
          className={`w-full transition-opacity duration-500 ${chartReady ? 'opacity-100' : 'opacity-0'}`} 
        />
        <div 
          ref={tooltipRef}
          className="absolute z-10 hidden p-3 rounded-lg border border-border bg-card/95 backdrop-blur-sm shadow-xl pointer-events-none"
        />
      </CardContent>
    </Card>
  );
}
