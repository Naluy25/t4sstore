
import { Review } from "@/types";

// نموذج للتقييمات المخزنة - سيتم استخدامه كقاعدة بيانات مصغرة
interface ReviewsDatabase {
  [productId: string]: Review[];
}

// بيانات التقييمات الأولية
let reviewsData: ReviewsDatabase = {
  "p1": [
    {
      id: "1",
      userId: "user1",
      userName: "محمد أحمد",
      userAvatar: "/placeholder.svg",
      rating: 5,
      comment: "منتج رائع جداً، الجودة ممتازة والشحن كان سريع. سأشتري منه مرة أخرى بالتأكيد.",
      date: "2023-12-10"
    },
    {
      id: "2",
      userId: "user2",
      userName: "سارة علي",
      userAvatar: "/placeholder.svg",
      rating: 4,
      comment: "منتج جيد بشكل عام، ولكن هناك بعض التفاصيل الصغيرة التي يمكن تحسينها. الخدمة كانت ممتازة والتوصيل سريع.",
      date: "2023-11-25"
    }
  ],
  "p2": [
    {
      id: "1",
      userId: "user3",
      userName: "خالد محمود",
      userAvatar: "/placeholder.svg",
      rating: 5,
      comment: "تجربة شراء ممتازة، المنتج مطابق للمواصفات المذكورة تماماً. سعيد جداً بالشراء وأنصح به.",
      date: "2023-11-15"
    }
  ]
};

// محاكاة تخزين البيانات في localStorage
try {
  // محاولة استرجاع البيانات المحفوظة سابقاً
  const savedData = localStorage.getItem('reviewsData');
  if (savedData) {
    reviewsData = JSON.parse(savedData);
  }
} catch (error) {
  console.error('Error loading reviews data from localStorage:', error);
}

// وظيفة لحفظ البيانات
const saveReviewsData = () => {
  try {
    localStorage.setItem('reviewsData', JSON.stringify(reviewsData));
  } catch (error) {
    console.error('Error saving reviews data to localStorage:', error);
  }
};

// الحصول على تقييمات منتج معين
export const getProductReviews = (productId: string): Review[] => {
  return reviewsData[productId] || [];
};

// إضافة تقييم جديد لمنتج
export const addProductReview = (productId: string, review: Omit<Review, 'id' | 'date'>): Review => {
  // إنشاء معرّف فريد للتقييم
  const id = `review-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  
  // إنشاء كائن التقييم الجديد
  const newReview: Review = {
    ...review,
    id,
    date: new Date().toISOString().split('T')[0]
  };
  
  // إضافة التقييم إلى قاعدة البيانات
  if (!reviewsData[productId]) {
    reviewsData[productId] = [];
  }
  
  reviewsData[productId].unshift(newReview); // إضافة التقييم في بداية المصفوفة
  
  // حفظ البيانات
  saveReviewsData();
  
  return newReview;
};

// تحديث تقييم موجود
export const updateProductReview = (productId: string, reviewId: string, updatedData: Partial<Review>): boolean => {
  if (!reviewsData[productId]) return false;
  
  const reviewIndex = reviewsData[productId].findIndex(r => r.id === reviewId);
  if (reviewIndex === -1) return false;
  
  // تحديث بيانات التقييم
  reviewsData[productId][reviewIndex] = {
    ...reviewsData[productId][reviewIndex],
    ...updatedData
  };
  
  // حفظ البيانات
  saveReviewsData();
  
  return true;
};

// زيادة عدد الإعجابات بتقييم
export const incrementHelpfulCount = (productId: string, reviewId: string): boolean => {
  return updateProductReview(productId, reviewId, {});
};

// حذف تقييم
export const deleteProductReview = (productId: string, reviewId: string): boolean => {
  if (!reviewsData[productId]) return false;
  
  const initialLength = reviewsData[productId].length;
  reviewsData[productId] = reviewsData[productId].filter(r => r.id !== reviewId);
  
  // التحقق مما إذا تم حذف التقييم بالفعل
  if (reviewsData[productId].length === initialLength) return false;
  
  // حفظ البيانات
  saveReviewsData();
  
  return true;
};

// حساب متوسط التقييمات لمنتج معين
export const getProductAverageRating = (productId: string): number => {
  const reviews = reviewsData[productId] || [];
  if (reviews.length === 0) return 0;
  
  const sum = reviews.reduce((total, review) => total + review.rating, 0);
  return sum / reviews.length;
};

// الحصول على توزيع التقييمات حسب عدد النجوم
export const getProductRatingDistribution = (productId: string): { rating: number; count: number; percentage: number }[] => {
  const reviews = reviewsData[productId] || [];
  const distribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(r => r.rating === rating).length;
    return {
      rating,
      count,
      percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0
    };
  });
  
  return distribution;
};

export default {
  getProductReviews,
  addProductReview,
  updateProductReview,
  incrementHelpfulCount,
  deleteProductReview,
  getProductAverageRating,
  getProductRatingDistribution
};
