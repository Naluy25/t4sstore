
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, User, ArrowRight, ChevronRight, ChevronLeft, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import CheckoutForm, { CheckoutFormData } from "@/components/checkout/CheckoutForm";
import EnhancedCheckoutForm from "@/components/checkout/EnhancedCheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import EnhancedOrderSummary from "@/components/checkout/EnhancedOrderSummary";
import LazyLoadSection from "@/components/common/LazyLoadSection";
import CheckoutProgress from "@/components/checkout/CheckoutProgress";
import PerformanceAnalytics from "@/components/common/PerformanceAnalytics";
import LoadingIndicator from "@/components/ui/loading-indicator";
import { sendPurchaseToDiscord } from "@/utils/webhookUtils";

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart, finalTotal, activePromoCode } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOrderNotification, setShowOrderNotification] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [cachedFormData, setCachedFormData] = useState<Partial<CheckoutFormData>>({});
  
  // حساب الخصم إذا كان هناك رمز ترويجي نشط
  const discount = activePromoCode ? subtotal * 0.25 : 0;
  
  // تمرير الصفحة إلى الأعلى عند تحميلها
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // محاولة استعادة بيانات النموذج المحفوظة مسبقًا
  useEffect(() => {
    const savedFormData = localStorage.getItem('checkoutFormData');
    if (savedFormData) {
      try {
        setCachedFormData(JSON.parse(savedFormData));
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);
  
  // إنشاء رسالة الواتساب بطريقة محسنة
  const createWhatsAppMessage = (customerData: CheckoutFormData) => {
    let message = `*طلب جديد*\n\n`;
    message += `*بيانات العميل:*\n`;
    message += `الاسم: ${customerData.name}\n`;
    message += `الجوال: ${customerData.phone}\n`;
    message += `العنوان: ${customerData.address}\n`;
    message += `المدينة: ${customerData.city}\n`;
    message += `طريقة الدفع: ${customerData.paymentMethod === 'cash' ? 'الدفع عند الاستلام' : 'تحويل بنكي'}\n`;
    
    if (customerData.notes) {
      message += `ملاحظات: ${customerData.notes}\n`;
    }
    
    message += `\n*المنتجات المطلوبة:*\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   السعر: ${item.product.price.toFixed(2)} ر.س\n`;
      message += `   الكمية: ${item.quantity}\n`;
      message += `   المجموع: ${(item.product.price * item.quantity).toFixed(2)} ر.س\n\n`;
    });
    
    message += `*ملخص الطلب:*\n`;
    message += `المجموع الفرعي: ${subtotal.toFixed(2)} ر.س\n`;
    
    if (discount > 0) {
      message += `الخصم: ${discount.toFixed(2)} ر.س\n`;
    }
    
    message += `الإجمالي النهائي: ${finalTotal.toFixed(2)} ر.س\n`;
    
    if (activePromoCode) {
      message += `\nكود الخصم المستخدم: ${activePromoCode}\n`;
    }
    
    return encodeURIComponent(message);
  };
  
  // التحقق من صحة بيانات النموذج
  const validateCartItems = () => {
    if (cartItems.length === 0) {
      toast({
        title: "السلة فارغة",
        description: "الرجاء إضافة منتجات إلى السلة قبل إتمام الطلب",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  // معالجة إرسال الطلب
  const handleSubmitOrder = async (formData: any) => {
    setIsSubmitting(true);
    try {
      // تجهيز بيانات الطلب
      const purchaseData = {
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          paymentMethod: formData.paymentMethod,
          notes: formData.notes,
          accountName: formData.accountName,
          characterName: formData.characterName,
          characterId: formData.characterId,
          discordId: formData.discordId,
        },
        orderInfo: {
          items: cartItems.map(item => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            total: item.product.price * item.quantity
          })),
          subtotal: subtotal,
          discount: discount,
          finalTotal: finalTotal,
          promoCode: activePromoCode,
          orderDate: new Date().toISOString()
        }
      };
      // إرسال البيانات إلى ديسكورد
      const success = await sendPurchaseToDiscord(purchaseData);
      if (success) {
        setShowOrderNotification(true);
        clearCart();
        setTimeout(() => {
          setShowOrderNotification(false);
          navigate("/");
        }, 5000);
      } else {
        toast({ title: "حدث خطأ", description: "لم نتمكن من إرسال طلبك، يرجى المحاولة مرة أخرى", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "حدث خطأ", description: "لم نتمكن من إرسال طلبك، يرجى المحاولة مرة أخرى", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // معالجة الانتقال بين خطوات إتمام الطلب
  const handleNextStep = () => {
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(1);
    window.scrollTo(0, 0);
  };
  
  return (
    <MainLayout>
      <PerformanceAnalytics />
      {/* إشعار نجاح الطلب - في منتصف الشاشة مع تغطية الخلفية */}
      {showOrderNotification && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* تغطية شبه شفافة للخلفية */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 border border-primary shadow-2xl rounded-2xl px-12 py-10 text-center animate-fade-in scale-105">
            <h2 className="text-2xl font-bold mb-4 text-primary">تم استلام طلبك</h2>
            <ul className="text-lg text-gray-700 dark:text-gray-200 list-disc list-inside">
              <li>توجه الى ديسكورد المدينه وأفتح تذكرة موقع</li>
              <li>وسيتم التواصل معك</li>
            </ul>
          </div>
        </div>
      )}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="container">
          {/* زر الرجوع */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            العودة
          </Button>
        
          {/* عنوان الصفحة */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">إتمام الطلب</h1>
            <p className="text-gray-600 dark:text-gray-400">
              أدخل بياناتك لإتمام عملية الشراء
            </p>
          </div>
          
          {/* شريط تقدم الخطوات */}
          <CheckoutProgress currentStep={currentStep} />
          
          {cartItems.length === 0 ? (
            <LazyLoadSection height={400}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className="mb-4">
                  <ShoppingCart className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">سلة التسوق فارغة</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  لم تقم بإضافة أي منتجات إلى سلة التسوق.
                </p>
                <Button 
                  onClick={() => navigate("/products")}
                  className="bg-primary text-white hover:bg-primary/90 transition duration-300 inline-flex items-center gap-2"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>تصفح المنتجات</span>
                </Button>
              </motion.div>
            </LazyLoadSection>
          ) : (
            currentStep === 1 ? (
              // الخطوة الأولى: مراجعة المنتجات
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="order-2 lg:order-1"
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      منتجات السلة
                    </h2>
                    
                    <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex gap-4 border-b border-gray-100 dark:border-gray-700 pb-4">
                          <div className="h-20 w-20 rounded-md overflow-hidden border border-gray-100 dark:border-gray-700">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-sm mb-1">{item.product.name}</h3>
                              <span className="text-primary font-semibold">{item.product.price.toFixed(2)} ر.س</span>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              الكمية: {item.quantity}
                            </div>
                            <div className="text-sm font-medium mt-1">
                              المجموع: {(item.product.price * item.quantity).toFixed(2)} ر.س
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">المجموع الفرعي:</span>
                        <span>{subtotal.toFixed(2)} ر.س</span>
                      </div>
                      
                      {activePromoCode && (
                        <div className="flex justify-between text-sm text-primary">
                          <span>الخصم:</span>
                          <span>- {discount.toFixed(2)} ر.س</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between font-bold pt-2 border-t border-gray-100 dark:border-gray-700">
                        <span>الإجمالي النهائي:</span>
                        <span className="text-primary">{finalTotal.toFixed(2)} ر.س</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        onClick={handleNextStep}
                        className="w-full bg-primary hover:bg-primary/90 transition-colors"
                        size="lg"
                      >
                        <span>المتابعة للدفع</span>
                        <ChevronLeft className="mr-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                  className="order-1 lg:order-2"
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      معلومات الشراء
                    </h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                        <h3 className="font-medium mb-2 text-primary">طرق الدفع المتاحة</h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <CreditCard className="h-4 w-4 text-purple-700" />
                            <span>تحويل بنكي</span>
                          </div>
                          <span>|</span>
                          <div className="flex items-center gap-1">
                            {/* أيقونة باي بال */}
                            <svg className="h-4 w-4 text-purple-500" viewBox="0 0 32 32" fill="currentColor"><path d="M23.5 6.5c-1.1-1.2-2.7-1.8-4.7-1.8h-7.2c-.7 0-1.3.5-1.4 1.2l-3.7 23.1c-.1.5.3 1 .8 1h5.2l1.1-7.1v.1c.1-.7.7-1.2 1.4-1.2h2.2c5.2 0 9.2-2.1 10.4-8.1.6-2.7.1-4.6-1.1-5.9zM21.2 15.7c-1.1 5.1-5.1 5.1-8.2 5.1h-1.2l1.2-7.7h1.2c2.1 0 4.2 0 5.1 1.1.6.7.7 1.7.4 2.5zm2.7-7.2c-1.1-1.2-2.7-1.8-4.7-1.8h-7.2c-.7 0-1.3.5-1.4 1.2l-3.7 23.1c-.1.5.3 1 .8 1h5.2l1.1-7.1v.1c.1-.7.7-1.2 1.4-1.2h2.2c5.2 0 9.2-2.1 10.4-8.1.6-2.7.1-4.6-1.1-5.9z"/></svg>
                            <span>باي بال</span>
                          </div>
                          <span>|</span>
                          <div className="flex items-center gap-1">
                            {/* أيقونة انستا باي */}
                            <svg className="h-4 w-4 text-pink-500" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff">IN</text></svg>
                            <span>انستا باي</span>
                          </div>
                          <span>|</span>
                          <div className="flex items-center gap-1">
                            {/* أيقونة ابل باي */}
                            <svg className="h-4 w-4 text-gray-900" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="16" height="16" rx="4" /><text x="12" y="16" textAnchor="middle" fontSize="10" fill="#fff"></text></svg>
                            <span>ابل باي</span>
                          </div>
                          <span>|</span>
                          <div className="flex items-center gap-1">
                            {/* أيقونة محفظة الكترونية */}
                            <svg className="h-4 w-4 text-green-600" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="7" width="20" height="10" rx="3" /><rect x="6" y="11" width="4" height="2" rx="1" fill="#fff"/></svg>
                            <span>محفظة الكترونية</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <h3 className="font-medium mb-2 text-amber-600 dark:text-amber-400">طريقة التسليم</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          يتم تسليم المنتج في حسابك بعد اتمام عملية الشراء
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              // الخطوة الثانية: إدخال البيانات
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* نموذج بيانات العميل */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <div className="mb-6 flex items-center">
                      <Button
                        variant="ghost"
                        onClick={handlePrevStep}
                        className="mr-2"
                        aria-label="الرجوع للخطوة السابقة"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <User className="h-5 w-5" />
                        بيانات العميل
                      </h2>
                    </div>
                    <EnhancedCheckoutForm 
                      onSubmit={handleSubmitOrder} 
                      isSubmitting={isSubmitting} 
                      initialValues={cachedFormData}
                    />
                  </div>
                </motion.div>
                
                {/* ملخص الطلب */}
                <EnhancedOrderSummary 
                  cartItems={cartItems} 
                  subtotal={subtotal} 
                  discount={discount}
                  total={finalTotal}
                />
              </div>
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
