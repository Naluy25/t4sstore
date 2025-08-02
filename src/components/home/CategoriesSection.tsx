import React from "react";
import { Link } from "react-router-dom";
import { categories } from "@/lib/mockData";
import { ArrowLeft } from "lucide-react";

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">تسوق حسب الفئة</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            اكتشف مجموعتنا الواسعة من المنتجات المصنفة لتسهيل تجربة التسوق الخاصة بك
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="group bg-gray-100 dark:bg-gray-900 rounded-lg p-4 transition-all hover:shadow-md hover:scale-[1.02] duration-300"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white dark:bg-gray-800 flex items-center justify-center">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <h3 className="font-bold text-center flex items-center justify-center gap-1">
                {['cars','stores','fuelshops','mworkshop'].includes(category.id) ? (
                  <span className="font-bold text-black">
                    {category.id === 'cars' && 'سيارات'}
                    {category.id === 'stores' && 'المتاجر'}
                    {category.id === 'fuelshops' && 'محطات الوقود'}
                    {category.id === 'mworkshop' && 'ورش التعديل'}
                  </span>
                ) : (
                  <span className="font-bold text-black">
                    {category.id === 'trucks' ? 'حمولات' :
                    category.id === 'packages' ? 'باكدجات' :
                    category.id === 'vip-membership' ? 'بطاقات مميزة' :
                    category.id === 'other-services' ? 'خدمات اخرى' :
                    category.id === 'special-ids' ? 'ايديهات مميزة' : category.name}
                  </span>
                )}
              </h3>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            to="/products" 
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            عرض جميع الفئات
            <ArrowLeft className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
