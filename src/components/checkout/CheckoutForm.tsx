import React, { useState, memo } from "react";
import { useEffect } from "react";
import { User, Phone, MapPin, Building, AlertCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cash' | 'bank';
  notes?: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isSubmitting }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: 'cash',
    notes: '',
  });
  const [showOrderToast, setShowOrderToast] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "الرجاء إدخال الاسم الكامل",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.phone.trim() || !/^\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      toast({
        title: "خطأ في البيانات",
        description: "الرجاء إدخال رقم هاتف صحيح",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    onSubmit(formData);
    setShowOrderToast(true);
  };

  useEffect(() => {
    if (showOrderToast) {
      const timer = setTimeout(() => setShowOrderToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showOrderToast]);




  return (
    <React.Fragment>
      {/* إشعار نجاح الطلب - أعلى كل شيء */}
      {showOrderToast && (
        <div className="fixed top-0 left-1/2 z-[9999] -translate-x-1/2 bg-white dark:bg-gray-900 border border-primary shadow-2xl rounded-xl px-8 py-6 text-center animate-fade-in">
          <h2 className="text-xl font-bold mb-2 text-primary">تم استلام طلبك</h2>
          <ul className="text-base text-gray-700 dark:text-gray-200 list-disc list-inside">
            <li>توجه الى ديسكورد المدينه وأفتح تذكرة موقع</li>
            <li>سيتم التواصل معك</li>
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* الاسم */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الاسم الكامل <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="pl-10 w-full"
                required
                placeholder="أدخل الاسم الكامل"
              />
              <User className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          {/* رقم الجوال */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              رقم الجوال <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="pl-10 w-full"
                required
                placeholder="أدخل رقم الجوال"
              />
              <Phone className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          {/* العنوان */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              العنوان
            </label>
            <div className="relative">
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white pl-10"
                placeholder="أدخل العنوان التفصيلي"
              ></textarea>
              <MapPin className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          {/* المدينة */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              المدينة
            </label>
            <div className="relative">
              <Input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="pl-10 w-full"
                placeholder="أدخل اسم المدينة"
              />
              <Building className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
        {/* تم حذف رسالة التحويل إلى واتساب بناءً على طلبك */}
        <div className="mt-8">
          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 transition duration-300 flex items-center justify-center gap-2"
            disabled={isSubmitting}
            size="lg"
          >
            <>
              <Send className="h-5 w-5" />
              <span>{isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}</span>
            </>
          </Button>
        </div>
      </form>
    </React.Fragment>
  );
}


const MemoizedCheckoutForm = memo(CheckoutForm);
MemoizedCheckoutForm.displayName = 'CheckoutForm';
export default MemoizedCheckoutForm;
