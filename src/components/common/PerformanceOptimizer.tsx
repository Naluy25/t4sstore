
import React, { useEffect } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = ({ children }) => {
  useEffect(() => {
    // تحسين الأداء العام
    const optimizePerformance = () => {
      // تجنب تحميل الصور غير المرئية إلا عند الحاجة
      if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(img => {
          if (img.getAttribute('loading') !== 'eager' && !img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
          }
        });
      }

      // تحسين أداء الصور
      document.querySelectorAll('img').forEach(img => {
        // إضافة decoding=async لتحسين تحميل الصور
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
        
        // محاولة استخدام تنسيقات الصور الحديثة عند توفرها
        if (img.src.match(/\.(jpg|jpeg|png)$/i) && !img.srcset) {
          const src = img.src;
          const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          
          // تطبيق srcset فقط إذا كان المتصفح يدعم webp
          if ('HTMLPictureElement' in window) {
            const picture = document.createElement('picture');
            const source = document.createElement('source');
            source.srcset = webpSrc;
            source.type = 'image/webp';
            
            // استنساخ الصورة لاستخدامها في عنصر picture
            const clonedImg = img.cloneNode(true) as HTMLImageElement;
            
            // إضافة العناصر المنشأة إلى DOM
            picture.appendChild(source);
            picture.appendChild(clonedImg);
            
            if (img.parentNode) {
              img.parentNode.replaceChild(picture, img);
            }
          }
        }
      });

      // تحسين التفاعل مع الصفحة
      const debounce = (func: Function, wait: number) => {
        let timeout: number | null = null;
        return (...args: any[]) => {
          if (timeout) {
            window.clearTimeout(timeout);
          }
          timeout = window.setTimeout(() => {
            func(...args);
          }, wait);
        };
      };

      // تطبيق منع التكرار على أحداث التمرير
      const scrollHandler = debounce(() => {
        // تطبيق تحميل العناصر عند الظهور في الشاشة
        const lazyItems = document.querySelectorAll('.lazy-section:not(.loaded)');
        if (lazyItems.length > 0 && 'IntersectionObserver' in window) {
          const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const lazyItem = entry.target;
                lazyItem.classList.add('loaded');
                lazyObserver.unobserve(lazyItem);
              }
            });
          });
          
          lazyItems.forEach(item => {
            lazyObserver.observe(item);
          });
        }
      }, 50);

      window.addEventListener('scroll', scrollHandler, { passive: true });
      
      // إزالة الحدث عند إزالة المكون
      return () => {
        window.removeEventListener('scroll', scrollHandler);
      };
    };

    optimizePerformance();
    
    // تحسين أداء الموارد الخارجية
    const optimizeExternalResources = () => {
      // تأخير تحميل الموارد غير الحرجة
      setTimeout(() => {
        // أي موارد يمكن تحميلها لاحقًا (مثل الخطوط أو البرامج النصية غير المهمة)
        const fontLink = document.createElement('link');
        fontLink.rel = 'preconnect';
        fontLink.href = 'https://fonts.googleapis.com';
        document.head.appendChild(fontLink);
        
        const fontDomain = document.createElement('link');
        fontDomain.rel = 'preconnect';
        fontDomain.href = 'https://fonts.gstatic.com';
        fontDomain.setAttribute('crossorigin', '');
        document.head.appendChild(fontDomain);
      }, 1000);
    };
    
    optimizeExternalResources();
  }, []);

  return <>{children}</>;
};

export default PerformanceOptimizer;
