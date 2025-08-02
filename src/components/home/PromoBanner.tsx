import React from "react";
import { Link } from "react-router-dom";

const PromoBanner = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* البانر الأول */}
          <div className="relative rounded-lg overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&q=80" 
              alt="أزياء نسائية" 
              className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8">
                <span className="bg-primary text-white px-3 py-1 text-sm rounded-full mb-3 inline-block">
                  خصم 30%
                </span>
                <h3 className="text-white text-2xl font-heading font-bold mb-2">
                  مجموعة الأزياء النسائية
                </h3>
                <p className="text-gray-200 mb-4 max-w-xs">
                  اكتشفي أحدث صيحات الموضة النسائية بأسعار مميزة
                </p>
                <Link 
                  to="/category/fashion" 
                  className="bg-white text-gray-900 px-5 py-2 rounded-md font-medium inline-block hover:bg-primary hover:text-white transition duration-300"
                >
                  تسوق الآن
                </Link>
              </div>
            </div>
          </div>
          
          {/* البانر الثاني */}
          <div className="relative rounded-lg overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=400&q=80" 
              alt="عروض خاصة" 
              className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="p-8">
                <span className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full mb-3 inline-block">
                  عروض خاصة
                </span>
                <h3 className="text-white text-2xl font-heading font-bold mb-2">
                  عروض حصرية داخل السيرفر!
                </h3>
                <p className="text-gray-200 mb-4 max-w-xs">
                  احصل على سيارات نادرة، عضويات VIP، وباكدجات عملة مميزة وفعّلها فورًا في حسابك داخل سيرفرنا على GTA V.
                </p>
                <Link 
                  to="/special-offers" 
                  className="bg-white text-blue-600 px-5 py-2 rounded-md font-medium inline-block hover:bg-blue-600 hover:text-white transition duration-300"
                >
                  استعرض عروض السيرفر
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* بانر عرضي كبير */}
        <div className="mt-6 relative rounded-lg overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=350&q=80" 
            alt="عروض خاصة" 
            className="w-full h-[200px] md:h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-blue-600/80 flex items-center justify-center text-center">
            <div className="p-8 max-w-2xl">
              <h3 className="text-white text-3xl font-heading font-bold mb-3">
                احصل على خصم 15% على طلبك الأول
              </h3>
              <p className="text-white/90 mb-6">
                استخدم كود: <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">FIRST15</span> عند الدفع
              </p>
              <Link 
                to="/products" 
                className="bg-white text-primary px-6 py-3 rounded-md font-medium inline-block hover:bg-gray-100 transition duration-300"
              >
                تسوق الآن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
