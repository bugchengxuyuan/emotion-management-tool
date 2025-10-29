import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'outlined';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'default', hover = false, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200/60 shadow-md hover:shadow-lg',
      glass: 'glass-effect shadow-lg hover:shadow-xl',
      gradient: 'bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/60 shadow-lg hover:shadow-xl',
      outlined: 'bg-white/60 border-2 border-gray-300 hover:border-primary-400',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl p-6 transition-all duration-200',
          variants[variant],
          hover && 'transform hover:-translate-y-0.5',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, icon, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mb-6 flex items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary-100 text-primary-600">
            {icon}
          </div>
        )}
        <div>{children}</div>
      </div>
      {action && <div>{action}</div>}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  subtitle?: string;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, subtitle, ...props }, ref) => (
    <div>
      <h3
        ref={ref}
        className={cn('text-xl font-semibold text-gray-900 tracking-tight', className)}
        {...props}
      >
        {children}
      </h3>
      {subtitle && (
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
      )}
    </div>
  )
);

CardTitle.displayName = 'CardTitle';

export default Card;
