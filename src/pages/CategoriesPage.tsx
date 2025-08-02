import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { categories } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";

const CategoriesPage = () => {
  return (
    <MainLayout>
      <div className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          {/* رأس الصفحة */}
          <div className="mb-10 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-heading font-bold mb-4">تصنيفات المنتجات</h1>
            <p className="text-gray-600 dark:text-gray-400">
              تصفح مجموعتنا الواسعة من المنتجات المصنفة لتسهيل تجربة التسوق الخاصة بك
            </p>
          </div>
          
          {/* شبكة التصنيفات */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {categories.map((category) => (
              <Link 
                key={category.id}
                to={`/category/${category.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md overflow-hidden transition-all duration-300"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-heading font-bold mb-2">{
                    category.name === 'cars' ? 'سيارات' : 
                    category.name === 'loads' ? 'حمولات' :
                    category.name === 'hands' ? 'ايديهات' :
                    category.name === 'membership' ? 'بطاقات عضوية' :
                    category.name === 'packages' ? 'باكدجات' : category.name
                  }</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {category.productsCount} منتج متاح
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">تصفح المنتجات</span>
                    <ArrowLeft className="w-5 h-5 text-primary transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* قسم المميزات */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-16">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-3xl font-heading font-bold mb-4">لماذا تختار منتجاتنا</h2>
              <p className="text-gray-600 dark:text-gray-400">
                نحن نفخر بتقديم أفضل المنتجات بأسعار تنافسية وخدمة عملاء ممتازة
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">ضمان الجودة</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  جميع منتجاتنا أصلية 100% مع ضمان استرجاع خلال 14 يوم
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">أفضل الأسعار</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  أسعار تنافسية مع عروض وخصومات مستمرة على جميع المنتجات
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">خدمة العملاء</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  فريق دعم متخصص متاح على مدار الساعة لمساعدتك
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CategoriesPage;
