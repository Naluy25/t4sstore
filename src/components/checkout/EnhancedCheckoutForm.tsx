import React, { useState, memo, useEffect } from "react";
import { User, Phone, MapPin, Building, AlertCircle, Send, CreditCard, Truck, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LoadingIndicator from "../ui/loading-indicator";
import { motion } from "framer-motion";
import { CheckoutFormData } from "./CheckoutForm";

interface EnhancedCheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
  initialValues?: Partial<CheckoutFormData>;
}

const EnhancedCheckoutForm: React.FC<EnhancedCheckoutFormProps> = memo(({ onSubmit, isSubmitting, initialValues }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    accountName: "",
    characterName: "",
    characterId: "",
    discordId: "",
  });
  
  const [errors, setErrors] = useState({
    accountName: undefined,
    characterName: undefined,
    characterId: undefined,
    discordId: undefined,
  });
  
  // استخدام القيم الأولية إذا كانت متوفرة
  useEffect(() => {
    if (initialValues) {
      setFormData(prev => ({
        ...prev,
        ...initialValues
      }));
    }
  }, [initialValues]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // إزالة رسائل الخطأ عند الكتابة
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handlePaymentMethodChange = (method: "cash" | "bank") => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };
  
  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.accountName.trim()) newErrors.accountName = "الرجاء إدخال اسم الحساب";
    if (!formData.characterName.trim()) newErrors.characterName = "الرجاء إدخال اسم الشخصية";
    if (!formData.characterId.trim()) newErrors.characterId = "الرجاء إدخال ايدي الشخصية";
    if (!formData.discordId.trim()) newErrors.discordId = "الرجاء إدخال ايدي حسابك بالديسكورد";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    onSubmit(formData);
  };

  // تحريك التركيز إلى أول حقل به خطأ
  useEffect(() => {
    const firstErrorField = Object.keys(errors)[0] as keyof typeof errors;
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }
    }
  }, [errors]);

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 pb-3 border-b">
        <User className="h-5 w-5 text-primary" />
        بيانات العميل
      </h2>
      <div className="space-y-6">
        <motion.div>
          <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">اسم الحساب <span className="text-red-500">*</span></label>
          <Input type="text" id="accountName" name="accountName" value={formData.accountName} onChange={handleInputChange} className={`pl-10 w-full ${errors.accountName ? 'border-red-300 dark:border-red-600 focus-visible:ring-red-500' : ''}`} placeholder="أدخل اسم الحساب" />
          {errors.accountName && <p className="mt-1 text-sm text-red-500">{errors.accountName}</p>}
        </motion.div>
        <motion.div>
          <label htmlFor="characterName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">اسم الشخصية <span className="text-red-500">*</span></label>
          <Input type="text" id="characterName" name="characterName" value={formData.characterName} onChange={handleInputChange} className={`pl-10 w-full ${errors.characterName ? 'border-red-300 dark:border-red-600 focus-visible:ring-red-500' : ''}`} placeholder="أدخل اسم الشخصية" />
          {errors.characterName && <p className="mt-1 text-sm text-red-500">{errors.characterName}</p>}
        </motion.div>
        <motion.div>
          <label htmlFor="characterId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ايدي الشخصية <span className="text-red-500">*</span></label>
          <Input type="text" id="characterId" name="characterId" value={formData.characterId} onChange={handleInputChange} className={`pl-10 w-full ${errors.characterId ? 'border-red-300 dark:border-red-600 focus-visible:ring-red-500' : ''}`} placeholder="أدخل ايدي الشخصية" />
          {errors.characterId && <p className="mt-1 text-sm text-red-500">{errors.characterId}</p>}
        </motion.div>
        <motion.div>
          <label htmlFor="discordId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ايدي حسابك بالديسكورد <span className="text-red-500">*</span></label>
          <Input type="text" id="discordId" name="discordId" value={formData.discordId} onChange={handleInputChange} className={`pl-10 w-full ${errors.discordId ? 'border-red-300 dark:border-red-600 focus-visible:ring-red-500' : ''}`} placeholder="أدخل ايدي حسابك بالديسكورد" />
          {errors.discordId && <p className="mt-1 text-sm text-red-500">{errors.discordId}</p>}
        </motion.div>
      </div>
      <Button type="submit" className="mt-8 w-full" disabled={isSubmitting}>إرسال الطلب</Button>
    </motion.form>
  );
});

EnhancedCheckoutForm.displayName = 'EnhancedCheckoutForm';

export default EnhancedCheckoutForm;
