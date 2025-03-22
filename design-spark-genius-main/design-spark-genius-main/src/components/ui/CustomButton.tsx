
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
        
        // Variants
        variant === 'primary' && 'bg-black text-white hover:bg-black/90 focus:ring-black/30',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/30',
        variant === 'outline' && 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground focus:ring-primary/30',
        variant === 'ghost' && 'hover:bg-accent hover:text-accent-foreground focus:ring-primary/30',
        variant === 'link' && 'text-primary underline-offset-4 hover:underline focus:ring-primary/30',
        
        // Sizes
        size === 'sm' && 'h-9 px-3 text-xs',
        size === 'md' && 'h-10 px-4 py-2',
        size === 'lg' && 'h-12 px-8 text-lg',
        
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
