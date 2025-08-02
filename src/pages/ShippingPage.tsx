
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Link } from "react-router-dom";
import { ChevronLeft, Truck, Clock, PackageCheck, MapPin, CreditCard } from "lucide-react";

const ShippingPage = () => {
  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 py-12 font-tajawal">
        <div className="container">
          {/* رأس الصفحة */}
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">سياسة الشحن والتوصيل</h1>
            <p className="text-gray-600 dark:text-gray-400">
              كل ما تحتاج معرفته عن خدمات الشحن والتوصيل لدينا
            </p>
          </div>
          
          {/* ميزات الشحن */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
              <div className="text-primary flex justify-center mb-4">
                <Truck className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">شحن سريع</h3>
              <p className="text-gray-600 dark:text-gray-400">
                توصيل سريع لجميع الطلبات خلال 2-5 أيام عمل
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
              <div className="text-primary flex justify-center mb-4">
                <PackageCheck className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">تغليف آمن</h3>
              <p className="text-gray-600 dark:text-gray-400">
                تغليف محكم وآمن لضمان وصول منتجاتك بحالة ممتازة
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm text-center">
              <div className="text-primary flex justify-center mb-4">
                <MapPin className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold mb-2">تغطية واسعة</h3>
              <p className="text-gray-600 dark:text-gray-400">
                نوصل إلى جميع مناطق المملكة العربية السعودية ودول الخليج
              </p>
            </div>
          </div>
          
          {/* تفاصيل سياسة الشحن */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-4">طرق الشحن المتاحة</h2>
                <p>
                  نوفر العديد من خيارات الشحن لتناسب احتياجاتك:
                </p>
                <ul className="list-disc mr-6">
                  <li>
                    <strong>الشحن القياسي:</strong> يستغرق 3-5 أيام عمل ويكلف 20 ريالاً للطلبات التي تقل قيمتها عن 300 ريال. 
                    الشحن مجاني للطلبات التي تزيد قيمتها عن 300 ريال.
                  </li>
                  <li>
                    <strong>الشحن السريع:</strong> يستغرق 1-2 أيام عمل ويكلف 50 ريالاً.
                  </li>
                  <li>
                    <strong>الشحن في نفس اليوم:</strong> متاح في المدن الرئيسية فقط (الرياض، جدة، الدمام) ويكلف 75 ريالاً.
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">أوقات التوصيل</h2>
                <p>
                  تعتمد أوقات التوصيل على موقعك وطريقة الشحن التي اخترتها:
                </p>
                <ul className="list-disc mr-6">
                  <li>
                    <strong>المدن الرئيسية:</strong> 2-3 أيام عمل للشحن القياسي.
                  </li>
                  <li>
                    <strong>المدن الثانوية والمناطق الأخرى:</strong> 3-5 أيام عمل للشحن القياسي.
                  </li>
                  <li>
                    <strong>دول الخليج:</strong> 5-10 أيام عمل.
                  </li>
                  <li>
                    <strong>الدول العربية الأخرى:</strong> 10-15 يوم عمل.
                  </li>
                </ul>
                <p className="text-gray-500 text-sm mt-2">
                  * تبدأ أوقات التوصيل بعد 24 ساعة من تأكيد الطلب ودفعه.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">تتبع الشحنة</h2>
                <p>
                  بمجرد شحن طلبك، ستتلقى بريداً إلكترونياً يحتوي على رقم التتبع ورابط لتتبع شحنتك. 
                  يمكنك أيضاً تتبع طلبك من خلال حسابك على موقعنا في قسم "طلباتي".
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">سياسة استلام الطلبات</h2>
                <p>
                  عند استلام طلبك، يرجى التحقق من المنتجات قبل التوقيع على استلام الشحنة. 
                  في حالة وجود أي تلف أو نقص، يرجى الإبلاغ عن ذلك على الفور إلى مندوب التوصيل وخدمة العملاء لدينا.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">الشحن الدولي</h2>
                <p>
                  نوفر خدمات الشحن الدولي إلى معظم دول العالم. تختلف أسعار وأوقات الشحن حسب الوجهة. 
                  يرجى ملاحظة أن الرسوم الجمركية والضرائب قد تُطبق على الشحنات الدولية ويتحملها المستلم.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">التأخير في الشحن</h2>
                <p>
                  قد تحدث تأخيرات في الشحن بسبب عوامل خارجة عن إرادتنا مثل الظروف الجوية السيئة أو مشكلات النقل أو الازدحام خلال المواسم. 
                  في حالة حدوث تأخير متوقع، سنبذل قصارى جهدنا لإبلاغك في أقرب وقت ممكن.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">سياسة إعادة الشحن</h2>
                <p>
                  في حالة تعذر تسليم طلبك (على سبيل المثال، عنوان غير صحيح أو عدم وجود أحد في العنوان)، سيتم الاحتفاظ بالطلب لمدة 3 أيام أخرى قبل إعادته إلى مستودعنا. 
                  قد يتم تطبيق رسوم إعادة شحن إضافية على أي محاولات توصيل إضافية.
                </p>
                
                <h2 className="text-2xl font-bold mb-4 mt-8">اتصل بنا</h2>
                <p>
                  إذا كانت لديك أي أسئلة أو استفسارات حول شحن طلبك، يرجى الاتصال بفريق خدمة العملاء لدينا على shipping@martcart.com أو الاتصال على 800-123-4567.
                </p>
                
                <p className="text-gray-500 mt-8">
                  تاريخ آخر تحديث: 1 أبريل 2023
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

export default ShippingPage;
