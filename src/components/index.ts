// Central component exports - use these for cleaner imports throughout the app

// Layout Components
export { Header } from './Navigation/Header';
export { Footer } from './Layout/Footer';
export { Breadcrumb } from './Breadcrumb/Breadcrumb';

// Page Components
export { HomePage } from './Pages/HomePage';

// Product Components
export { ProductCard } from './Product/ProductCard';
export { ProductGrid } from './Product/ProductGrid';
export { ProductDetailModal } from './Product/ProductDetailModal';

// Section Components
export { Hero } from './Sections/Hero';
export { FeaturedProducts } from './Sections/FeaturedProducts';
export { CategoryShowcase } from './Sections/CategoryShowcase';

// Feature Components
export { AllProducts } from './AllProducts';
export { default as CartPage } from './CartPage';
export { default as CategoryPage } from './CategoryPage';
export { default as WishlistPage } from './WishlistPage';
export { default as ProfilePage } from './ProfilePage';
export { AuthModals } from './AuthModals';
export { default as PersonalRecommendations } from './PersonalRecommendations';
export { default as ProductShowcase } from './ProductShowcase';
export { default as ExclusiveMemberOffers } from './ExclusiveMemberOffers';

// Utilities
export { ToastManager } from './Toast/ToastManager';
export { default as UserStatsCard } from './UserStatsCard';
export { Newsletter } from './Newsletter';
