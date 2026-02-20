import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Header } from './components/Navigation/Header';
import { Footer } from './components/Layout/Footer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { ProfilePage } from './pages/ProfilePage';
import { OrdersPage } from './pages/OrdersPage';
import { ToastManager } from './components/Toast/ToastManager';
import { useToast } from './contexts/ToastContext';
import { useAuth } from './utils/authContext';
import { AuthModals } from './components/AuthModals';
import { useCart } from './contexts/CartContext';
import { useWishlist } from './contexts/WishlistContext';

const App: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const {
    showAuthModal,
    authMode,
    onOpenAuth,
    onCloseAuth,
    onAuthSuccess,
  } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleProfileDropdownToggle = (isOpen: boolean) => {
    setIsProfileDropdownOpen(isOpen);
  };

  const handleSearch = (query: string) => {
    navigate(`/category?search=${query}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ToastManager toasts={toasts} onRemove={removeToast} />
      <Header
        isLoggedIn={isLoggedIn}
        user={user}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onSearch={handleSearch}
        onNavigate={navigate}
        onOpenAuth={onOpenAuth}
        onLogout={logout}
        isProfileDropdownOpen={isProfileDropdownOpen}
        onProfileDropdownToggle={handleProfileDropdownToggle}
      />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:gender" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
      </main>
      <Footer />
      <AuthModals
        isOpen={showAuthModal}
        initialMode={authMode}
        onClose={onCloseAuth}
        onLoginSuccess={onAuthSuccess}
      />
    </div>
  );
};

export default App;
