import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TrendingUp, Search, BarChart2, Shield } from 'lucide-react';
import { MultiplierSelector } from '@/components/screener/MultiplierSelector'; // We could reuse just the visual part, or build a custom hero visual

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-background z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 bg-accent-emerald blur-[120px] rounded-full pointer-events-none" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-accent-emerald/30 bg-accent-emerald/10 text-accent-emerald text-sm font-medium mb-4">
              <span className="flex h-2 w-2 rounded-full bg-accent-emerald mr-2 animate-pulse"></span>
              Data updated daily
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Find the next <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-emerald via-emerald-400 to-accent-blue">
                Multibagger
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
              The premier platform for discovering stocks, ETFs, and crypto that have multiplied x5, x10, or more.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto font-semibold">
                <Link href="/screener">
                  Launch Screener <TrendingUp className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href="#features">
                  How it works
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to find winners</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Our specialized platform focuses entirely on assets with proven explosive growth, filtering out the noise of average performers.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background border border-border p-8 rounded-2xl">
              <div className="h-12 w-12 bg-accent-emerald/20 rounded-xl flex items-center justify-center mb-6 text-accent-emerald">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Powerful Screener</h3>
              <p className="text-text-secondary leading-relaxed">
                Filter thousands of assets by multiplication factor, sector, country (ADRs), and exchange to pinpoint exact niches.
              </p>
            </div>
            
            <div className="bg-background border border-border p-8 rounded-2xl">
              <div className="h-12 w-12 bg-accent-blue/20 rounded-xl flex items-center justify-center mb-6 text-accent-blue">
                <BarChart2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deep Analysis</h3>
              <p className="text-text-secondary leading-relaxed">
                View comprehensive metrics including forward P/E, CAGR, ROIC, and analyst estimates in clean, intuitive charts.
              </p>
            </div>
            
            <div className="bg-background border border-border p-8 rounded-2xl">
              <div className="h-12 w-12 bg-accent-amber/20 rounded-xl flex items-center justify-center mb-6 text-accent-amber">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Institutional Grade</h3>
              <p className="text-text-secondary leading-relaxed">
                Powered by Financial Modeling Prep, giving you access to the same reliable data used by hedge funds and institutions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to find your x10?</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto text-lg">
            Stop guessing and start analyzing historical multibaggers to find patterns for future investments.
          </p>
          <Button asChild size="lg" className="px-8 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]">
            <Link href="/screener">
              Start Screening Now
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
