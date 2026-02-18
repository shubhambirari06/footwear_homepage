export enum ModalType {
  Login = 'login',
  Register = 'register',
  ForgotPassword = 'forgotPassword',
}

export enum ViewType {
  HOME = 'home',
  SEARCH = 'search',
  CART = 'cart',
  WISHLIST = 'wishlist',
  CATEGORY = 'category',
  PRODUCT_DETAIL = 'product-detail',
  PROFILE = 'profile',
  ORDERS = 'orders',
}

export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export enum UserRole {
  GUEST = 'guest',
  MEMBER = 'member',
  PREMIUM = 'premium',
}

export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export enum Gender {
  MEN = 'Men',
  WOMEN = 'Women',
  KIDS = 'Kids',
}

export enum ProductCategory {
  CASUAL = 'Casual',
  FORMAL = 'Formal',
  SPORTS = 'Sports',
  ETHNIC = 'Ethnic',
  FLIP_FLOPS = 'Flip Flops',
  SANDALS = 'Sandals',
}

export enum SortOption {
  NEWEST = 'newest',
  PRICE_LOW = 'price-low',
  PRICE_HIGH = 'price-high',
  RATING = 'rating',
}