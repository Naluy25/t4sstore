
import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface WhatsAppContactProps {
  phoneNumber?: string;
  buttonText?: string;
  variant?: 'default' | 'outline' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const WhatsAppContact: React.FC<WhatsAppContactProps> = ({
  phoneNumber = "+201011342972",
  buttonText = 'تواصل معنا',
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  // تنسيق رقم الهاتف
  const formattedNumber = phoneNumber.replace(/\+/g, '').replace(/\s/g, '');
  const whatsappUrl = `https://wa.me/${formattedNumber}`;
  
  // تحديد الأنماط بناءً على الخيارات
  const getButtonClasses = () => {
    let baseClasses = 'flex items-center font-tajawal transition-all duration-300 ';
    
    // نوع الزر
    if (variant === 'default') {
      baseClasses += 'bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-sm hover:shadow ';
    } else if (variant === 'outline') {
      baseClasses += 'border border-green-500 text-green-600 hover:bg-green-50 rounded-lg ';
    } else if (variant === 'icon') {
      baseClasses += 'bg-green-500 hover:bg-green-600 text-white rounded-full ';
    }
    
    // حجم الزر
    if (size === 'sm') {
      baseClasses += variant === 'icon' ? 'p-2 ' : 'text-sm px-3 py-1.5 ';
    } else if (size === 'md') {
      baseClasses += variant === 'icon' ? 'p-3 ' : 'px-4 py-2 ';
    } else if (size === 'lg') {
      baseClasses += variant === 'icon' ? 'p-4 ' : 'text-lg px-6 py-3 ';
    }
    
    return baseClasses + className;
  };
  
  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={getButtonClasses()}
      aria-label="تواصل معنا عبر واتساب"
    >
      {variant === 'icon' ? (
        <MessageCircle className={size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'} />
      ) : (
        <>
          <MessageCircle className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'} ml-2`} />
          <span>{buttonText}</span>
        </>
      )}
    </a>
  );
};

export default WhatsAppContact;
