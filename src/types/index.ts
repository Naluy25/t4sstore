export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  tags?: string[];
  features?: string[];
  stockCount?: number;
  freeShipping?: boolean;
  offer?: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful?: number;
}
