
import React, { useEffect, useRef } from 'react';

interface ImageLoaderProps {
  selector: string;
  threshold?: number;
  rootMargin?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ 
  selector = 'img[loading="lazy"]', 
  threshold = 0.1,
  rootMargin = '200px'
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      // تنظيف المراقب السابق إن وجد
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      // إعداد مراقب جديد للعناصر
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // لما تكون الصورة مرئية، استبدل الـ src بالقيمة الحقيقية
              const img = entry.target as HTMLImageElement;
              const dataSrc = img.getAttribute('data-src');
              
              if (dataSrc) {
                img.src = dataSrc;
                img.removeAttribute('data-src');
                observerRef.current?.unobserve(img);
              }
            }
          });
        },
        {
          threshold,
          rootMargin
        }
      );

      // تطبيق المراقب على جميع الصور المعنية
      const images = document.querySelectorAll(selector);
      images.forEach(img => {
        observerRef.current?.observe(img);
      });
    } else {
      // في حالة عدم دعم IntersectionObserver ضع جميع الصور مباشرة
      const images = document.querySelectorAll(selector);
      images.forEach(img => {
        const dataSrc = img.getAttribute('data-src');
        if (dataSrc) {
          (img as HTMLImageElement).src = dataSrc;
        }
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [selector, threshold, rootMargin]);

  return null; // هذا المكون لا يتطلب واجهة مرئية
};

export default ImageLoader;
