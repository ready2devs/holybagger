import React, { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    let variantStyles = '';
    switch (variant) {
      case 'primary':
        variantStyles = 'bg-accent-emerald text-white hover:bg-emerald-600';
        break;
      case 'secondary':
        variantStyles = 'bg-hover text-text-primary hover:bg-gray-800';
        break;
      case 'outline':
        variantStyles = 'border border-border bg-transparent hover:bg-hover';
        break;
      case 'ghost':
        variantStyles = 'bg-transparent hover:bg-hover text-text-secondary hover:text-text-primary';
        break;
    }

    let sizeStyles = '';
    switch (size) {
      case 'sm':
        sizeStyles = 'h-8 px-3 text-sm';
        break;
      case 'md':
        sizeStyles = 'h-10 px-4 py-2';
        break;
      case 'lg':
        sizeStyles = 'h-12 px-8 text-lg';
        break;
      case 'icon':
        sizeStyles = 'h-10 w-10 justify-center';
        break;
    }

    const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 disabled:pointer-events-none disabled:opacity-50';

    return (
      <Comp
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
