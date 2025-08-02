import React from "react";
import { allProducts } from "@/lib/mockData";

interface ProductSpecsProps {
  productId: string;
  category: string;
}

const ProductSpecs: React.FC<ProductSpecsProps> = ({ productId, category }) => {
  // Find the specific product from allProducts
  const product = allProducts.find(p => p.id === productId);
  
  // Default specs if product not found
  const specs = [
    { name: "بلد المنشأ", value: "الصين" },
    { name: "المادة", value: "متعدد" },
    { name: "الضمان", value: "سنة واحدة" },
    { name: "التصنيف", value: "ممتاز" }
  ];
  
  // Default features if product not found
  const features = [
    { available: true, feature: "جودة عالية" },
    { available: true, feature: "سعر تنافسي" },
    { available: false, feature: "ضمان مدى الحياة" }
  ];
  
  // If product exists, use its features
  if (product && product.features) {
    // Convert product features to expected format
    const productFeatures = product.features.map(feature => ({
      available: true,
      feature: feature
    }));
    
    // Add one unavailable feature for contrast
    productFeatures.push({ 
      available: false, 
      feature: category === 'cars' ? "شحن لاسلكي" : 
               category === 'loads' ? "مقاوم للماء 100%" : 
               category === 'hands' ? "خدمة التركيب المجانية" : 
               category === 'membership' ? "خصم إضافي 50%" :
               "ضمان مدى الحياة"
    });
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 font-tajawal">المواصفات والمميزات</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-tajawal">
          {/* قسم المواصفات */}
          <div>
            <h3 className="text-xl font-semibold mb-4">المواصفات التقنية</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y">
                  {/* Product specific specs based on its category */}
                  {category === 'cars' && (
                    <>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">الشركة المصنعة</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">تيك برو</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">بلد المنشأ</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">ألمانيا</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">سنة الإنتاج</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">2024</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">مدة الضمان</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">3 سنوات</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">الأبعاد</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">450 × 185 × 140 سم</td>
                      </tr>
                    </>
                  )}
                  
                  {category === 'loads' && (
                    <>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">قدرة التحميل</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">5 أطنان</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">نوع المحرك</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">ديزل</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">بلد المنشأ</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">اليابان</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">نوع الوقود</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">ديزل</td>
                      </tr>
                    </>
                  )}
                  
                  {category === 'hands' && (
                    <>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">المادة</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">فولاذ مقاوم للصدأ</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">بلد المنشأ</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">ألمانيا</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">الضمان</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">مدى الحياة</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">الاستخدام</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">احترافي</td>
                      </tr>
                    </>
                  )}
                  
                  {category === 'membership' && (
                    <>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">نوع البطاقة</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">ذهبية/فضية</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">مدة الصلاحية</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">سنة/6 أشهر</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">نسبة الخصم</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">25%/15%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">الشحن المجاني</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">نعم</td>
                      </tr>
                    </>
                  )}
                  
                  {category === 'packages' && (
                    <>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">نوع الباكدج</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">عائلي/احترافي</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">عدد المنتجات</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">متعدد</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-900/50">
                        <td className="py-3 px-4 font-medium">نسبة الخصم</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">30%/25%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium">الضمان</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">شامل</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* قسم المميزات */}
          <div>
            <h3 className="text-xl font-semibold mb-4">المميزات</h3>
            <div className="space-y-3">
              {productFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                    feature.available 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                  {feature.available ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                  ) : (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    </div>
                  <span className={`text-sm ${feature.available ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}`}>
                    {feature.feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Return default specs if product not found
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 font-tajawal">المواصفات والمميزات</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-tajawal">
        {/* قسم المواصفات */}
        <div>
          <h3 className="text-xl font-semibold mb-4">المواصفات التقنية</h3>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y">
                {specs.map((spec, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900/50' : ''}>
                    <td className="py-3 px-4 font-medium">{spec.name}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* قسم المميزات */}
        <div>
          <h3 className="text-xl font-semibold mb-4">المميزات</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                  feature.available 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-red-100 text-red-600'
                }`}>
                {feature.available ? (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                  </div>
                <span className={`text-sm ${feature.available ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-500'}`}>
                  {feature.feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecs;
