
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const FAQPage = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-12 font-tajawal">
        <div className="container">
          {/* Header */}
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">الأسئلة الشائعة</h1>
            <p className="text-gray-600 dark:text-gray-400">
              نجيب هنا على الأسئلة الأكثر شيوعاً لدى عملائنا الكرام
            </p>
          </div>
          
          {/* الأسئلة الشائعة */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">ما هي سياسة الإرجاع؟</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  يمكنك إرجاع أي منتج خلال 14 يومًا من تاريخ الاستلام مع ضمان استرداد كامل المبلغ إذا كان المنتج في حالته الأصلية. يجب الاحتفاظ بإيصال الشراء والتغليف الأصلي للمنتج. بعض المنتجات مثل الملابس الداخلية والمنتجات القابلة للتلف لا يمكن إرجاعها لأسباب صحية.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">كم تستغرق عملية التوصيل؟</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  يتم توصيل المنتجات عادةً خلال 2-5 أيام عمل داخل المدن الرئيسية، و5-7 أيام عمل للمناطق الأخرى. قد تتأخر عمليات التوصيل خلال المواسم المزدحمة أو بسبب ظروف خارجة عن إرادتنا مثل الظروف الجوية السيئة. يمكنك تتبع طلبك من خلال الرابط المرسل إلى بريدك الإلكتروني.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">هل توفرون خدمة ما بعد البيع؟</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نعم، نوفر خدمة ما بعد البيع لجميع منتجاتنا وفقًا للضمان المقدم من الشركة المصنعة. يرجى الاتصال بخدمة العملاء للحصول على المساعدة. فريق الدعم الفني متاح على مدار الساعة للإجابة على استفساراتكم وحل المشكلات التقنية التي قد تواجهكم.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">هل يمكنني تغيير أو إلغاء طلبي بعد تقديمه؟</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  يمكنك تغيير أو إلغاء طلبك في غضون ساعة واحدة من وقت تقديمه. بعد هذه الفترة، قد يكون طلبك قيد المعالجة أو الشحن ولا يمكن تغييره. يرجى الاتصال بخدمة العملاء في أقرب وقت ممكن إذا كنت ترغب في إجراء تغييرات على طلبك.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">ما هي طرق الدفع المتاحة؟</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نقبل مجموعة متنوعة من طرق الدفع بما في ذلك بطاقات الائتمان (فيزا، ماستركارد)، الدفع عند الاستلام، التحويل البنكي، ومحافظ الدفع الإلكترونية مثل Apple Pay. جميع المعاملات مشفرة وآمنة لضمان حماية بياناتك المالية.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold mb-3">هل تقدمون خصومات للطلبات الكبيرة؟</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  نعم، نقدم خصومات خاصة للطلبات الكبيرة والمشتريات المؤسسية. يرجى التواصل مع قسم المبيعات للحصول على عرض سعر مخصص لطلبك. كما نقدم عروض وخصومات موسمية لعملائنا، تابعنا على وسائل التواصل الاجتماعي للبقاء على اطلاع بأحدث العروض.
                </p>
              </div>
            </div>
          </div>
          
          {/* رابط العودة */}
          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-primary hover:underline">
              <ChevronLeft className="h-4 w-4 ml-1" />
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage;
