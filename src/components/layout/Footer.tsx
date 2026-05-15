import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-auto">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">HolyBagger</h3>
            <p className="text-sm text-text-secondary max-w-xs">
              Discover and analyze stocks, ETFs, and cryptocurrencies that have multiplied their price x5, x10, or more.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-4 uppercase tracking-wider text-text-secondary">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/screener" className="text-text-primary hover:text-accent-emerald transition-colors">Screener</a></li>
              <li><a href="#" className="text-text-primary hover:text-accent-emerald transition-colors">Documentation</a></li>
              <li><a href="#" className="text-text-primary hover:text-accent-emerald transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-4 uppercase tracking-wider text-text-secondary">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-text-primary hover:text-accent-emerald transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-text-primary hover:text-accent-emerald transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary gap-4">
          <p>© {new Date().getFullYear()} HolyBagger. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: HolyBagger is for informational purposes only and does not constitute financial advice. All data is provided "as is" and may be delayed.
          </p>
        </div>
      </div>
    </footer>
  );
}
