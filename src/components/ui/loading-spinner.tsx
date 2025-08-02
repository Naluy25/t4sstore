
import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'white';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7'
  };

  const variantClasses = {
    default: 'border-gray-200 border-t-gray-500',
    primary: 'border-primary/20 border-t-primary',
    white: 'border-white/20 border-t-white'
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-2",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
      />
    </div>
  );
};

export default LoadingSpinner;
