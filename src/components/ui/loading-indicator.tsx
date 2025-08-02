
import React, { memo } from "react";

interface LoadingIndicatorProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "gray";
  className?: string;
  label?: string;
  type?: "spinner" | "dots" | "pulse";
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = memo(({
  size = "md",
  color = "primary",
  className = "",
  label,
  type = "spinner"
}) => {
  const getIndicatorSize = () => {
    switch (size) {
      case "sm": return "h-3 w-3 border-2";
      case "lg": return "h-8 w-8 border-3";
      default: return "h-5 w-5 border-2";
    }
  };

  const getIndicatorColor = () => {
    switch (color) {
      case "white": return "border-white/20 border-t-white";
      case "gray": return "border-gray-200 border-t-gray-500";
      default: return "border-primary/20 border-t-primary";
    }
  };

  const renderIndicator = () => {
    const sizeClass = getIndicatorSize();
    const colorClass = getIndicatorColor();
    
    switch (type) {
      case "dots":
        return (
          <div className="flex space-s-1">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className={`rounded-full ${
                  size === "sm" ? "h-1 w-1" : size === "lg" ? "h-2 w-2" : "h-1.5 w-1.5"
                } ${
                  color === "white" ? "bg-white" : 
                  color === "gray" ? "bg-gray-500" : "bg-primary"
                } opacity-70 animate-ping`}
                style={{ animationDelay: `${dot * 0.15}s`, animationDuration: '0.7s' }}
              />
            ))}
          </div>
        );
        
      case "pulse":
        return (
          <div className={`relative ${
              size === "sm" ? "h-4 w-4" : size === "lg" ? "h-10 w-10" : "h-6 w-6"
            }`}>
            <span className={`absolute inset-0 rounded-full ${
                color === "white" ? "bg-white/50" : 
                color === "gray" ? "bg-gray-300/50" : "bg-primary/50"
              } animate-ping`}
            />
            <span className={`relative block rounded-full ${
                size === "sm" ? "h-2 w-2" : size === "lg" ? "h-5 w-5" : "h-3 w-3"
              } ${
                color === "white" ? "bg-white" : 
                color === "gray" ? "bg-gray-500" : "bg-primary"
              }`}
            />
          </div>
        );
        
      default:
        return (
          <div
            className={`animate-spin rounded-full ${sizeClass} ${colorClass}`}
          />
        );
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {renderIndicator()}
      {label && <span className="mr-3 text-sm rtl:mr-0 rtl:ml-3">{label}</span>}
    </div>
  );
});

LoadingIndicator.displayName = 'LoadingIndicator';

export default LoadingIndicator;
