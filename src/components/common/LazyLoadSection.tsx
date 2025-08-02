
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LazyLoadSectionProps {
  children: React.ReactNode;
  className?: string;
  height?: number;
  threshold?: number;
  fallback?: React.ReactNode;
}

const LazyLoadSection: React.FC<LazyLoadSectionProps> = ({ 
  children, 
  className,
  height = 200,
  threshold = 0.1,
  fallback
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div
      ref={sectionRef}
      className={cn('overflow-hidden transition-all duration-500', className)}
      style={{ minHeight: !isLoaded ? height : undefined }}
    >
      {!isLoaded && fallback ? (
        fallback
      ) : (
        <div
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
        >
          {isVisible && children}
        </div>
      )}
    </div>
  );
};

export default LazyLoadSection;
