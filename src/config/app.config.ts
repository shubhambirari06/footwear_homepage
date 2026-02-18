export const APP_CONFIG = {
  APP_NAME: 'UrbanSteps',
  APP_TAGLINE: 'Premium Footwear, Every Step',
  BRAND_COLOR: '#b45309', // Amber-700
  SECONDARY_COLOR: '#ee5f73', // Pink/Red
  FREE_SHIPPING_THRESHOLD: 499,
  MEMBER_DISCOUNT: 0.20,
};

export const ROUTE_PATHS = {
  HOME: '/',
  ALL_PRODUCTS: '/products',
  CART: '/cart',
  WISHLIST: '/wishlist',
  PROFILE: '/profile',
  CATEGORY: '/category',
  PRODUCT_DETAIL: '/product',
} as const;

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.urbansteps.com',
  PRODUCTS: '/products',
  ORDERS: '/orders',
  USERS: '/users',
} as const;

export const GENDER_CATEGORIES: Record<string, string[]> = {
  Men: ['Casual', 'Sports', 'Formal', 'Ethnic', 'Flip Flops', 'Sandals'],
  Women: ['Casual', 'Sports', 'Formal', 'Heels', 'Sandals', 'Flip Flops'],
  Kids: ['Casual', 'Sports', 'School Shoes', 'Ethnic', 'Flip Flops'],
};
