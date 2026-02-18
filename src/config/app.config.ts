import { Gender, ProductCategory } from '../enums';

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
  [Gender.MEN]: [
    ProductCategory.CASUAL,
    ProductCategory.SPORTS,
    ProductCategory.FORMAL,
    ProductCategory.ETHNIC,
    ProductCategory.FLIP_FLOPS,
    ProductCategory.SANDALS,
  ],
  [Gender.WOMEN]: [
    ProductCategory.CASUAL,
    ProductCategory.SPORTS,
    ProductCategory.FORMAL,
    ProductCategory.ETHNIC,
    ProductCategory.FLIP_FLOPS,
    ProductCategory.SANDALS,
  ],
  [Gender.KIDS]: [
    ProductCategory.CASUAL,
    ProductCategory.SPORTS,
    ProductCategory.FORMAL,
  ],
} as const;

export const WELCOME_MESSAGES = {
  LOGIN: {
    TITLE: 'Welcome Back!',
    MESSAGE: 'Great to see you again. Enjoy exclusive member benefits!',
    ICON: '👟',
  },
  REGISTER: {
    TITLE: 'Welcome to UrbanSteps!',
    MESSAGE: 'Your account is ready. Start exploring our premium collection!',
    ICON: '🎉',
  },
  LOGOUT: {
    TITLE: 'See You Soon!',
    MESSAGE: 'Thanks for shopping with us. Come back soon!',
    ICON: '👋',
  },
} as const;

export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

