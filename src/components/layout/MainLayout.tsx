
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PerformanceOptimizer from "../common/PerformanceOptimizer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  // تمت إزالة تأثيرات التمرير والتحميل عند التنقل بين الصفحات
  // فقط الاحتفاظ بالمراقبة لأغراض التتبع
  React.useEffect(() => {
    // قياس أداء التنقل
    if (window.performance && window.performance.mark) {
      window.performance.mark('navigation-start');
      
      // قياس وقت الاكتمال بعد انتهاء التنقل
      setTimeout(() => {
        window.performance.mark('navigation-end');
        window.performance.measure('navigation-duration', 'navigation-start', 'navigation-end');
        
        const navigationMeasure = window.performance.getEntriesByName('navigation-duration', 'measure')[0];
        console.log(`Navigation completed in ${navigationMeasure.duration.toFixed(2)}ms`);
      }, 0); // تقليل وقت الانتظار إلى صفر
    }
  }, [location.pathname]);
  
  return (
    <PerformanceOptimizer>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </PerformanceOptimizer>
  );
};

export default MainLayout;
