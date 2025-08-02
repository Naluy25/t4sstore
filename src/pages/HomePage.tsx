
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
// import FeaturedProducts from "@/components/home/FeaturedProducts";
// import PromoBanner from "@/components/home/PromoBanner";

const HomePage = () => {
  return (
    <MainLayout>
      {/* <HeroSection /> */}
      <CategoriesSection />
      {/* <FeaturedProducts /> */}
      {/* <PromoBanner /> */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ميزة 1 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                  <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                  <line x1="12" y1="20" x2="12" y2="20"></line>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">منتجات حصرية</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                اكتشف مجموعة متنوعة من المنتجات التي تلبي جميع احتياجاتك.
              </p>
            </div>
            
            {/* ميزة 2 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
              <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">تجربة تسوق سهلة</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                تصفح الموقع بسهولة، احصل على تفاصيل دقيقة، واطلب بثقة.
              </p>
            </div>
            
            {/* ميزة 3 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
              <div className="h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">نظام دفع آمن</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                اشترِ براحة تامة مع ضمان حماية بياناتك الشخصية.
              </p>
            </div>
            
            {/* ميزة 4 */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center">
              <div className="h-16 w-16 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                  <path d="M12 13v8"></path>
                  <path d="M12 3v3"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">خدمة عملاء استثنائية</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                فريقنا جاهز لخدمتك في أي وقت وتقديم الدعم الكامل.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
