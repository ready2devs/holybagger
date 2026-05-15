import React from 'react';
import Link from 'next/link';
import { TrendingUp, Search } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-accent-emerald" />
          <span className="font-bold text-lg tracking-tight">HolyBagger</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/screener" className="text-text-primary transition-colors hover:text-accent-emerald">
              Screener
            </Link>
            <Link href="#" className="text-text-secondary transition-colors hover:text-text-primary">
              Watchlist
            </Link>
          </nav>
          
          <div className="w-full max-w-sm ml-4 hidden md:flex items-center relative">
            <Search className="absolute left-2.5 h-4 w-4 text-text-secondary" />
            <input
              type="search"
              placeholder="Search ticker..."
              className="flex h-9 w-full rounded-md border border-border bg-card px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
