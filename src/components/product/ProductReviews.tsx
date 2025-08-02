
import React, { useState, useEffect, useCallback, memo } from "react";
import { User, ThumbsUp, Flag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import LazyLoadSection from "@/components/common/LazyLoadSection";
import ProductRating from "./ProductRating";
import { 
  getProductReviews, 
  addProductReview, 
  incrementHelpfulCount,
  getProductAverageRating,
  getProductRatingDistribution
} from "@/lib/reviewsData";
import { Review } from "@/types";

interface ReviewProps {
  productId: string;
}

// استخدام memo لمنع إعادة العرض غير الضروري
const ProductReviews: React.FC<ReviewProps> = memo(({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    userName: "",
    userId: `user-${Date.now()}`
  });
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState<{ rating: number; count: number; percentage: number }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // استرجاع التقييمات عند تحميل المكون أو تغيير معرف المنتج
  useEffect(() => {
    loadReviews();
  }, [productId]);
  
  // وظيفة تحميل التقييمات
  const loadReviews = useCallback(() => {
    // استرجاع تقييمات المنتج من "قاعدة البيانات"
    const productReviews = getProductReviews(productId);
    setReviews(productReviews);
    
    // حساب متوسط التقييم
    setAverageRating(getProductAverageRating(productId));
    
    // الحصول على توزيع التقييمات
    setRatingDistribution(getProductRatingDistribution(productId));
  }, [productId]);
  
  const handleRatingChange = useCallback((rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  }, []);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleSubmitReview = useCallback(async () => {
    if (!newReview.userName.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال اسمك",
        variant: "destructive"
      });
      return;
    }
    
    if (!newReview.comment.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء كتابة تعليق",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // إضافة التقييم إلى "قاعدة البيانات"
      await addProductReview(productId, {
        userId: newReview.userId,
        userName: newReview.userName,
        userAvatar: "/placeholder.svg",
        rating: newReview.rating,
        comment: newReview.comment
      });
      
      // إعادة تحميل التقييمات
      loadReviews();
      
      // إعادة تعيين النموذج
      setNewReview(prev => ({ 
        ...prev, 
        rating: 5, 
        comment: "" 
      }));
      setShowReviewForm(false);
      
      toast({
        title: "تم إضافة التقييم",
        description: "شكراً لمشاركة رأيك حول هذا المنتج",
      });
    } catch (error) {
      console.error("Error adding review:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إضافة التقييم، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [newReview, productId, loadReviews]);
  
  const handleHelpful = useCallback(async (reviewId: string) => {
    try {
      // زيادة عدد الإعجابات في "قاعدة البيانات"
      incrementHelpfulCount(productId, reviewId);
      
      // تحديث التقييمات في واجهة المستخدم
      setReviews(prev => prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: (review.helpful || 0) + 1 }
          : review
      ));
      
      toast({
        description: "شكراً لتقييمك",
      });
    } catch (error) {
      console.error("Error marking review as helpful:", error);
    }
  }, [productId]);
  
  const ReviewSummary = memo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
        <ProductRating rating={averageRating} size="lg" className="mb-2" />
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          بناءً على {reviews.length} مراجعة
        </p>
      </div>
      
      <div className="space-y-2">
        {ratingDistribution.map((item) => (
          <div key={item.rating} className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400 w-6">{item.rating}</span>
            <ProductRating rating={item.rating} maxRating={1} size="sm" />
            <Progress value={item.percentage} className="h-2 flex-1" />
            <span className="text-sm text-gray-600 dark:text-gray-400 w-8">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  ));
  
  ReviewSummary.displayName = 'ReviewSummary';
  
  return (
    <LazyLoadSection 
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
      height={400}
      fallback={
        <div className="h-[400px] rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 dark:text-gray-600">جاري تحميل التقييمات...</div>
        </div>
      }
    >
      <h2 className="text-2xl font-bold mb-6">تقييمات ومراجعات المنتج</h2>
      
      {/* ملخص التقييمات */}
      <ReviewSummary />
      
      {/* نموذج إضافة مراجعة جديدة */}
      {showReviewForm ? (
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-8 animate-fade-in">
          <h3 className="text-xl font-semibold mb-4">إضافة مراجعة جديدة</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="userName" className="block text-sm font-medium mb-1">الاسم</label>
              <Input 
                id="userName"
                name="userName"
                value={newReview.userName}
                onChange={handleInputChange}
                placeholder="أدخل اسمك"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">التقييم</label>
              <ProductRating 
                rating={newReview.rating} 
                size="lg" 
                interactive={true}
                onRatingChange={handleRatingChange}
              />
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-1">المراجعة</label>
              <Textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
                placeholder="اكتب مراجعتك هنا..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
              />
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowReviewForm(false)}
              >
                إلغاء
              </Button>
              <Button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'جاري الإرسال...' : 'إرسال المراجعة'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 text-center mb-8">
          <Button 
            onClick={() => setShowReviewForm(true)}
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition duration-300"
          >
            كتابة مراجعة
          </Button>
        </div>
      )}
      
      {/* قائمة المراجعات */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">المراجعات ({reviews.length})</h3>
        
        {reviews.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            لا توجد مراجعات بعد. كن أول من يقيم هذا المنتج!
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 last:border-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.userAvatar} alt={review.userName} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.userName}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString('ar-SA')}
                    </div>
                  </div>
                </div>
                <ProductRating rating={review.rating} />
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {review.comment}
              </p>
              <div className="flex items-center gap-3 text-sm">
                <button 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                  onClick={() => handleHelpful(review.id)}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>مفيد ({review.helpful || 0})</span>
                </button>
                <button className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors flex items-center gap-1">
                  <Flag className="h-4 w-4" />
                  <span>الإبلاغ</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </LazyLoadSection>
  );
});

ProductReviews.displayName = 'ProductReviews';

export default ProductReviews;
