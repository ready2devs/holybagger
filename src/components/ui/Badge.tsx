import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
}

export function Badge({ className = '', variant = 'default', ...props }: BadgeProps) {
  let variantStyles = '';
  
  switch (variant) {
    case 'default':
      variantStyles = 'bg-hover text-text-primary';
      break;
    case 'success':
      variantStyles = 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30';
      break;
    case 'warning':
      variantStyles = 'bg-accent-amber/20 text-accent-amber border border-accent-amber/30';
      break;
    case 'error':
      variantStyles = 'bg-accent-red/20 text-accent-red border border-accent-red/30';
      break;
    case 'info':
      variantStyles = 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30';
      break;
    case 'outline':
      variantStyles = 'text-text-primary border border-border';
      break;
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${variantStyles} ${className}`}
      {...props}
    />
  );
}
