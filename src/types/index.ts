export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  gender: 'Men' | 'Women' | 'Kids';
  category: string;
  isNew?: boolean;
  rating?: number;
  stock?: number;
  sizes?: (string | number)[];
}

export interface CartItem extends Product {
  quantity: number;
  size?: string | number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate?: string;
  joinYear?: number;
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
}

export interface FilterOptions {
  genders: string[];
  categories: string[];
  priceRange: [number, number];
  searchQuery: string;
  sortBy: SortOption;
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface OrderTracking {
  orderId: string;
  status: 'Processing' | 'Shipped' | 'In Transit' | 'Delivered' | 'Returned';
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  updates: {
    date: string;
    status: string;
    location: string;
  }[];
}

export interface CategoryConfig {
  [key: string]: {
    name: string;
    color: string;
    subcategories: string[];
  };
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  duration?: number;
}
