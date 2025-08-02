
import React, { memo, useState, useEffect } from "react";
import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const ProductRating: React.FC<ProductRatingProps> = memo(({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  showValue = false,
  className = "",
  interactive = false,
  onRatingChange
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [animateStars, setAnimateStars] = useState(false);
  
  // تحديد حجم النجوم بناءً على الخيار المحدد
  const getStarSize = () => {
    switch(size) {
      case "sm": return "h-3 w-3";
      case "lg": return "h-6 w-6";
      default: return "h-4 w-4";
    }
  };

  const starSize = getStarSize();
  
  // تأثير الحركة عند تحميل المكون
  useEffect(() => {
    setAnimateStars(true);
    const timeout = setTimeout(() => setAnimateStars(false), 800);
    return () => clearTimeout(timeout);
  }, [rating]);
  
  const handleClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  const handleMouseEnter = (index: number) => {
    if (interactive) {
      setHoverRating(index + 1);
    }
  };
  
  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  // تنسيق أرقام التقييم للعرض
  const formatRating = (value: number) => {
    if (Number.isInteger(value)) {
      return value.toString();
    }
    return value.toFixed(1);
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div 
        className="flex" 
        onMouseLeave={handleMouseLeave}
        role={interactive ? "radiogroup" : undefined}
        aria-label={interactive ? "اختر تقييمك" : `تقييم ${formatRating(rating)} من ${maxRating}`}
      >
        {[...Array(maxRating)].map((_, i) => {
          const isActive = i < Math.floor(hoverRating ?? rating);
          const isHalf = !isActive && i < Math.ceil(hoverRating ?? rating);
          
          return (
            <Star 
              key={i} 
              className={`${starSize} ${
                isActive
                  ? 'fill-yellow-400 text-yellow-400' 
                  : isHalf
                    ? 'fill-yellow-400/50 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
              } ${interactive ? 'cursor-pointer transition-colors hover:text-yellow-500' : ''} ${
                animateStars ? `transform transition-transform duration-300 ease-bounce scale-110 delay-${i * 50}` : ''
              }`}
              onClick={interactive ? () => handleClick(i + 1) : undefined}
              onMouseEnter={interactive ? () => handleMouseEnter(i) : undefined}
              onKeyDown={interactive ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(i + 1);
                }
              } : undefined}
              tabIndex={interactive ? 0 : -1}
              role={interactive ? "radio" : undefined}
              aria-checked={interactive && i < (hoverRating ?? rating) ? "true" : "false"}
              aria-label={interactive ? `تقييم ${i + 1} من ${maxRating}` : undefined}
            />
          );
        })}
      </div>
      
      {showValue && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[2rem]">
          {formatRating(rating)}
        </span>
      )}
    </div>
  );
});

ProductRating.displayName = 'ProductRating';

export default ProductRating;
